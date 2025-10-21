import { spawn } from "child_process";
import path from "node:path";
import open from "open"; // npm install open

const FRONTEND_DIR = process.cwd();                  // assume running from /frontend
const BACKEND_DIR  = path.resolve(FRONTEND_DIR, "..", "backend");
const ACTIVATE = path.join("venv", "Scripts", "activate.bat");

async function main() {
  // Start Flask backend
  const flask_child = spawn(`call "${ACTIVATE}" && python run.py`, {
    cwd: BACKEND_DIR,
    shell: true,
    stdio: "inherit"
  });

  const HEALTH_URL = "http://127.0.0.1:5000/api/health";

  // Wait for Flask to be ready
  const waiter = spawn('npx', ['wait-on', HEALTH_URL, '-t', '60000', '-i', '500'], {
    shell: true,
    stdio: 'inherit'
  });

  waiter.on("exit", async (code) => {
    console.log("✅ Flask API reached. Launching frontend...");

    // Start Vite frontend
    const react_child = spawn("npm", ["run", "dev"], {
      cwd: FRONTEND_DIR,
      shell: true,
      stdio: "inherit"
    });

    // Wait a moment for Vite to start, then open browser
    setTimeout(async () => {
      console.log("🌐 Opening browser to http://localhost:5173/");
      await open("http://localhost:5173/");
    }, 8000); // adjust delay if needed
  });

  // optional: kill Flask after certain time
  // setTimeout(() => { flask_child.kill() }, 60000);
}

await main();