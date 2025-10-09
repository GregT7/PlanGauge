// Node 18+
// Starts Flask (test mode) and Vite preview, waits for both to be live,
// then runs `playwright test`. Works on Windows CMD too.

import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import http from "http";

const FRONTEND_PORT = 4173;
const BACKEND_PORT = 5001;
const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;
const BACKEND_URL  = `http://localhost:${BACKEND_PORT}/api/health`;

function waitFor(url, label, timeoutMs = 30000, intervalMs = 500) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const req = http.get(url, res => {
        if (res.statusCode && res.statusCode < 500) {
          console.log(`[ready] ${label}: ${url} (${res.statusCode})`);
          res.resume();
          resolve();
        } else {
          res.resume();
          retry();
        }
      });
      req.on("error", retry);
      function retry() {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for ${label} at ${url}`));
        } else {
          setTimeout(tick, intervalMs);
        }
      }
    };
    tick();
  });
}

function run(cmd, args, opts = {}) {
  const p = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
  p.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[proc] ${cmd} exited with ${code}`);
    }
  });
  return p;
}

(async () => {
  // Load envs for both apps
  const backTestPath = "@/src/backend/.env.test"
  const frontTestPath = "@/src/frontend/.env.test"
  const backendEnv = fs.existsSync(backTestPath)
    ? Object.fromEntries(fs.readFileSync(backTestPath,"utf8")
        .split(/\r?\n/).filter(Boolean).map(l => l.split("=").map(x=>x.trim()))
        .map(([k,...v]) => [k, v.join("=")]))
    : {};
  const frontendEnv = fs.existsSync(frontTestPath)
    ? Object.fromEntries(fs.readFileSync(frontTestPath,"utf8")
        .split(/\r?\n/).filter(Boolean).map(l => l.split("=").map(x=>x.trim()))
        .map(([k,...v]) => [k, v.join("=")]))
    : {};

  // Start Flask (test mode)
  console.log("[boot] starting Flask test server…");
  const flask = run("python", [
    "-m","flask","run",
    "-p", String(BACKEND_PORT)
  ], {
    cwd: "@/src/backend",
    env: { ...process.env, ...backendEnv, TEST_MODE: "true", FLASK_APP: "app.py" }
  });

  // Build & preview frontend
  console.log("[boot] building frontend…");
  const build = run("npm", ["run", "build"], { cwd: "@/src/frontend" });
  await new Promise((r, j) => build.on("exit", c => c===0 ? r() : j(new Error("vite build failed"))));

  console.log("[boot] starting Vite preview…");
  const vite = run("npm", ["run", "preview:test"], {
    cwd: "@/src/frontend",
    env: { ...process.env, ...frontendEnv }
  });

  // Wait until both are live
  await waitFor(BACKEND_URL, "Flask");
  await waitFor(`${FRONTEND_URL}`, "Vite preview");

  console.log("[boot] Both servers are ready. Starting Playwright…");
  // Evidence log:
  console.log(`[evidence] BACKEND: ${BACKEND_URL}`);
  console.log(`[evidence] FRONTEND: ${FRONTEND_URL}`);

  // Run Playwright
  const pw = run("npx", ["playwright", "test"], {
    env: { ...process.env, E2E_BASE_URL: frontendEnv.VITE_E2E_BASE_URL || FRONTEND_URL }
  });

  pw.on("exit", (code) => {
    // Tear down servers
    try { process.kill(flask.pid); } catch {}
    try { process.kill(vite.pid); } catch {}
    process.exit(code ?? 1);
  });
})().catch(err => {
  console.error(err);
  process.exit(1);
});
