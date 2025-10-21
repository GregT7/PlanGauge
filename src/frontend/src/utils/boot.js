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
    
    // Start Flask backend
    const ACTIVATE = path.join("venv", "Scripts", "activate.bat");
    const flask_child = spawn(`call "${ACTIVATE}" && python run.py`, {
        cwd: BACKEND_DIR,
        shell: true,
        stdio: "inherit"
    });


    const HEALTH_URL = process.env.FLASK_BASE_URL + process.env.FLASK_DEFAULT_PORT + process.env.FLASK_HEALTH_ROUTE
    console.log(HEALTH_URL)
    // Wait for Flask to be ready
    const waiter = spawn('npx', ['wait-on', HEALTH_URL, '-t', '60000', '-i', '500'], {
        shell: true,
        stdio: 'inherit'
    });
    waiter.on("exit", async (code) => {
        console.log("✅ Flask API reached. Launching frontend...");

        const react_args = isDemo ? ["run", "dev:demo"] : ["run", "dev"]
        const react_child = spawn("npm", react_args, {
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



}

await main();