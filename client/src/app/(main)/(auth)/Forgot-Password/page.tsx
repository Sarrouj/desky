import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"


const ForgotPassword = () => {
  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid w-7/12 gap-16 mt-28">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter the email you used to create your account so we can send you instructions on how to reset your password.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Link href={"/Forgot-Password/Email-Verification"}>
                <Button type="submit" className="w-full text-white">
                  Send
                </Button>
              </Link>
              <Link href={"/login"}>
                <Button variant="outline" className="w-full">
                        Back to Login
                </Button>
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
      </div>
  )
}

export default ForgotPassword
