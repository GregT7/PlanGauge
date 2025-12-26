import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import PasswordField from "./PasswordField";
import {login} from "./login"
import { ConfigContext } from "@/contexts/ConfigContext";
import { AuthContext } from "@/contexts/AuthContext";
import { buttonVariants } from "@/components/ui/button";
import resolveUser from "@/utils/resolveUser";
import styleData from "@/utils/styleData.json"


export default function LoginModal() {
  const config = useContext(ConfigContext)
  const { mode, setAuthLoaded, setMode, setUser } = useContext(AuthContext)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const url = config.flaskUrl.auth.login;

  const submitLogin = async (url, email, password) => {
    const respPromise = login(url, email, password)
    toast.promise(respPromise, {
      loading: 'Attempting login...',
      success: (resp) => `${resp.message}`,
      error: (resp) => `${resp.message}`
    })
    return respPromise
  }

  const handleOnClick = async () => {
    try {
      setDisabled(true)
      setAuthLoaded(false)
      const loginResp = await submitLogin(url, email, password);
      if (loginResp?.ok) {
        const mode = resolveUser(loginResp?.body?.user?.role)
        const user = loginResp?.body?.user
        setUser(user)
        setMode(mode)
      }
    } catch (error) {
      toast.error("Error: There was an error while logging in!")
    } finally {
      setDisabled(false)
      setAuthLoaded(true)
    }
  }

  const manageOnOpenChange = (isOpen) => {
    setOpen(isOpen)
    if (!isOpen) {
      setPassword("")
      setEmail("")
    }
  }

  const loginStyles = buttonVariants({
    variant: "default",
    size: "default",
    className: styleData.neutral.base + " " + styleData.neutral.hover
  });

  return (
    <Dialog
      open={open}
      onOpenChange={manageOnOpenChange}
    >
      <DialogTrigger className={loginStyles}>
        Login
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your email and password to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" disabled={disabled} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="grid gap-2">
            <PasswordField password={password} setPassword={setPassword} disabled={disabled}/>
          </div>

          <Button className="w-full" onClick={handleOnClick} disabled={disabled}>Log In</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

