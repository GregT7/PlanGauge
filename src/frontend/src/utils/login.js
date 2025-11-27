export default async function login(email, password) {
const resp = await fetch("http://localhost:5000/auth/login", {
  method: "POST",
  credentials: "include",
  body: JSON.stringify({ email, password }),
  headers: { "Content-Type": "application/json" }
});
console.log(await resp);
}
