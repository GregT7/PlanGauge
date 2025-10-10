import { spawn } from "child_process";
import path from "node:path";
import fs from "node:fs";

// C:\Users\Grego\Desktop\Coding\Projects\plan_tool\src\frontend
const FRONTEND_DIR = process.cwd();                  // you're running: node src/utils/test-boot.js from frontend/
const BACKEND_DIR  = path.resolve(FRONTEND_DIR, "..", "backend"); // C:\Users\Grego\Desktop\Coding\Projects\plan_tool\src\backend
const FRONTEND_ENV_PATH = path.resolve(FRONTEND_DIR, ".env.test");
const BACKEND_ENV_PATH  = path.resolve(BACKEND_DIR,  ".env.test");


const ACTIVATE = path.join("venv", "Scripts", "activate.bat");
// const ACTIVATE = path.join(BACKEND_DIR, "venv", "Scripts", "activate.bat");

async function main() {
  // const venv = spawn("cmd", [".\venv\Scripts\activate"], {
  //   cwd: BACKEND_DIR,
  //   windowsHide: false
  // })

  // venv.stdout.on("data", data => console.log(`stdout: ${data}`))
  // venv.stderr.on("data", data => console.log(`stderr: ${data}`))
  // venv.on("close", data => console.log(`close: ${data}`))
  // venv.on("exit", data => console.log(`exit: ${data}`))

  // const child = spawn(PYTHON, ["-V"], {
  //   cwd: BACKEND_DIR,
  //   stdio: "inherit",
  //   windowsHide: false,
  //   shell: true
  // });
  // child.on("exit", (code) => console.log("exit:", code));

  const flask_child = spawn(`call "${ACTIVATE}" && python run.py`, {
    cwd: BACKEND_DIR,
    shell: true,
    stdio: "inherit"
  })

  const HEALTH_URL = "http://127.0.0.1:5001/api/health"
  // 2) Wait for Flask to be ready using wait-on (CLI)
  const waiter = spawn('npx', ['wait-on', HEALTH_URL, '-t', '60000', '-i', '500'], {
    shell: true,        // lets Windows users run npx easily
    stdio: 'inherit',   // prints wait-on output to the same terminal
  });

  waiter.on("exit", code => {
    const react_child = spawn("npm", ["run", "dev"], {
      cwd: FRONTEND_DIR,
      shell: true,
      stdio: "inherit"
    })
    console.log("api reached")
  })

  setTimeout(() => {flask_child.kill()}, 6000)

}

await main()
// async function main() {
//   // const proc = spawn("python", ["-c", "print('hello world')"])
//   const proc = spawn("cmd", ["/c", "cd"], {
//     cwd: FRONTEND_DIR
//   })

//   proc.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`)
//   });

//   proc.stderr.on("data", (data) => {
//     console.log(`stderr: ${data}`)
//   })

//   proc.on("exit", (data) => {
//     console.log(`exit: ${data}`)
//   })

//   proc.on("close", (data) => {
//     console.log("closing...!")
//   })
// }