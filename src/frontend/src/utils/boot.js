import { spawn } from "child_process";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "node:path";
import open from "open"; // npm install open

async function main() {
    // parse argument values to differentiate between default and testing mode
    const args = process.argv.slice(2); // skip node + script path
    const isDemo = args.includes("-demo")

    // resolve the directory of the current file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.resolve(__dirname, "../../../.env");
    config({ path: envPath });

    const FRONTEND_DIR = process.cwd();                  // assume running from /frontend
    const BACKEND_DIR  = path.resolve(FRONTEND_DIR, "..", "backend");

    let RUN, FLASK_PORT, REACT_PORT, REACT_ARGS
    if (isDemo) {
        RUN = "run.py -demo"
        FLASK_PORT = process.env.VITE_FLASK_TESTING_PORT
        REACT_PORT = process.env.VITE_TESTING_PORT
        REACT_ARGS = ["vite", "--port", REACT_PORT, "--mode", "demo"]
    } else {
        RUN = "run.py"
        FLASK_PORT = process.env.VITE_FLASK_DEFAULT_PORT
        REACT_PORT = process.env.VITE_DEFAULT_PORT
        REACT_ARGS = ["vite", "--port", REACT_PORT]
    }
    
    // Start Flask backend
    const ACTIVATE = path.join("venv", "Scripts", "activate.bat");
    const flask_child = spawn(`call "${ACTIVATE}" && python ${RUN}`, {
        cwd: BACKEND_DIR,
        shell: true,
        stdio: "inherit"
    });

    // Wait for Flask to be ready
    const HEALTH_URL = process.env.VITE_FLASK_BASE_ROUTE + FLASK_PORT + process.env.VITE_FLASK_HEALTH_ROUTE

    const waiter = spawn('npx', ['wait-on', HEALTH_URL, '-t', '60000', '-i', '500'], {
        shell: true,
        stdio: 'inherit'
    });
    waiter.on("exit", async (code) => {
        console.log("✅ Flask API reached. Launching frontend...");

        const viteProcess = spawn("npx", REACT_ARGS, {
            cwd: FRONTEND_DIR,
            stdio: "inherit",
            shell: true
        });

        viteProcess.on("close", (code) => {
            console.log(`Vite exited with code ${code}`);
        });

        // Wait a moment for Vite to start, then open browser
        const REACT_ROUTE = process.env.VITE_BASE_ROUTE + REACT_PORT
        setTimeout(async () => {
        console.log(`🌐 Opening browser to ${REACT_ROUTE}`);
        await open(REACT_ROUTE);
        }, 8000); // adjust delay if needed
    });
}

await main();