// boot.js (robust version)
import { spawn } from "child_process";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "node:path";
import killTree from "tree-kill";
import waitOn from "wait-on";
import open from "open";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env (same as before)
config({ path: path.resolve(__dirname, "../../../.env") });

// Track child PIDs for teardown
const children = new Set();
const add = (cp) => cp && cp.pid && children.add(cp);
const killAll = () =>
  Promise.all(
    Array.from(children).map(
      (cp) =>
        new Promise((res) => {
          try {
            killTree(cp.pid, "SIGINT", () => res());
          } catch {
            res();
          }
        })
    )
  );

let exiting = false;
async function safeExit(code = 0) {
  if (exiting) return;
  exiting = true;
  await killAll();
  console.log("All child processes terminated.");
  process.exit(code);
}

function onFatal(err, code = 1) {
  if (err) console.error(err instanceof Error ? err.stack ?? err.message : err);
  safeExit(code);
}

function getArgFlag(name) {
  return process.argv.slice(2).includes(name);
}

async function main() {
  const isDemo = getArgFlag("-demo");

  const FRONTEND_DIR = process.cwd(); // assume /frontend
  const BACKEND_DIR = path.resolve(FRONTEND_DIR, "..", "backend");

  // Ports & args based on mode
  const FLASK_PORT = isDemo
    ? process.env.VITE_FLASK_TESTING_PORT
    : process.env.VITE_FLASK_DEFAULT_PORT;
  const REACT_PORT = isDemo
    ? process.env.VITE_TESTING_PORT
    : process.env.VITE_DEFAULT_PORT;

  const HEALTH_URL =
    process.env.VITE_FLASK_BASE_ROUTE +
    FLASK_PORT +
    process.env.VITE_FLASK_HEALTH_ROUTE;

  const REACT_URL = process.env.VITE_BASE_ROUTE + REACT_PORT;

  // --- Start Flask without activating shell (avoids orphan shells on Windows)
  const PYTHON = path.join(BACKEND_DIR, "venv", "Scripts", "python.exe"); // Windows
  const runArgs = isDemo ? ["run.py", "-demo"] : ["run.py"];
  const flask = spawn(PYTHON, runArgs, {
    cwd: BACKEND_DIR,
    stdio: "inherit",
    shell: false,
  });
  add(flask);

  flask.on("exit", (code) => {
    // If Flask dies early, bail and cleanup
    console.error(`Flask exited with code ${code}`);
    onFatal(null, code ?? 1);
  });

  // --- Wait for Flask to be reachable
  try {
    await waitOn({ resources: [HEALTH_URL], timeout: 60_000, interval: 500 });
    console.log("✅ Flask API reached.");
  } catch (e) {
    console.error("❌ Flask API did not become ready in time.");
    return onFatal(e, 1);
  }

  // --- Start Vite
  const viteArgs = isDemo ? ["vite", "--port", REACT_PORT, "--mode", "demo"] : ["vite", "--port", REACT_PORT];
  const vite = spawn("npx", viteArgs, {
    cwd: FRONTEND_DIR,
    stdio: "inherit",
    shell: true,
  });
  add(vite);

  vite.on("exit", (code) => {
    console.log(`Vite exited with code ${code}`);
    // If vite closes (e.g., the user closed it), exit and cleanup
    safeExit(code ?? 0);
  });

  // --- Wait for Vite to be reachable, then open browser
  try {
    await waitOn({ resources: [REACT_URL], timeout: 60_000, interval: 500 });
    console.log(`🌐 Opening browser: ${REACT_URL}`);
    await open(REACT_URL);
  } catch (e) {
    console.error("⚠️ Frontend did not become ready in time.");
    // Still exit—tests or dev can retry; we clean up nicely
    return onFatal(e, 1);
  }
}

// Global safety nets
process.on("SIGINT", () => safeExit(130));   // Ctrl-C
process.on("SIGTERM", () => safeExit(143)); // kill
process.on("uncaughtException", (err) => onFatal(err, 1));
process.on("unhandledRejection", (reason) => onFatal(reason, 1));

main().catch(onFatal);
