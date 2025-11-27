import { Button } from "@/components/ui/button";
import login from "@/utils/login"

const test = async () => {
const res = await fetch("http://localhost:5000/auth/me", {
  credentials: "include"
});
console.log(await res.json());
}

const logout = async () => {
const res = await fetch("http://localhost:5000/auth/logout", {
  credentials: "include",
  method: "POST"
});
console.log(await res.json());
}



export default function LoginButton() {
    return (<Button onClick={logout}>
    {/* return (<Button onClick={test}>  */}
    {/* return (<Button onClick={login}> */}
        Login
    </Button>);
}