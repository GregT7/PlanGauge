// test-boot.js
import { spawn } from "child_process";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "node:path";
import killTree from "tree-kill";            // npm i tree-kill
import waitOn from "wait-on";                // npm i wait-on

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envPath = path.resolve(__dirname, "../../../.env");
  config({ path: envPath });

  const FRONTEND_DIR = process.cwd();                 // assume running from /frontend
  const BACKEND_DIR  = path.resolve(FRONTEND_DIR, "..", "backend");

  // --- Start Flask backend (run venv python directly; no "activate", no shell) ---
  const PYTHON = path.join(BACKEND_DIR, "venv", "Scripts", "python.exe"); // on Windows
  const flask = spawn(PYTHON, ["run.py"], {
    cwd: BACKEND_DIR,
    stdio: "inherit",
    shell: false
  });

  // Build frontend (blocking until finish)
  await new Promise((resolve, reject) => {
    const build = spawn("npm", ["run", "build"], {
      cwd: FRONTEND_DIR,
      stdio: "inherit",
      shell: true
    });
    build.on("exit", code => code === 0 ? resolve() : reject(new Error(`Build failed (${code})`)));
  });

  // Start preview server
  const preview = spawn("npm", ["run", "preview"], {
    cwd: FRONTEND_DIR,
    stdio: "inherit",
    shell: true
  });

  // Wait for preview to be reachable
  const PREVIEW_URL = process.env.VITE_BASE_ROUTE + process.env.VITE_DEFAULT_PORT;
  await waitOn({
    resources: [PREVIEW_URL],
    timeout: 60_000,
    interval: 500
  });

  // Run Playwright tests
  const exitCode = await new Promise(resolve => {
    const tests = spawn("npx", ["playwright", "test", "--ui"], {
      cwd: FRONTEND_DIR,
      stdio: "inherit",
      shell: true
    });
    tests.on("exit", code => resolve(code ?? 1));
  });

  // --- Teardown (kill process trees, then exit) ---
  await Promise.all([
    new Promise(res => { try { killTree(flask.pid,  'SIGINT', () => res()); } catch { res(); } }),
    new Promise(res => { try { killTree(preview.pid, 'SIGINT', () => res()); } catch { res(); } }),
  ]);

  process.exit(exitCode);
}

main().catch(err => {
  console.error("Boot script failed:", err);
  process.exit(1);
});
