import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"


const ResetPassword = () => {
  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid w-7/12 gap-16 mt-28">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter the email you used to create your account so we can send you instructions on how to reset your password.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">New Password</Label>
                <Input
                  id="Password"
                  type="Password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  id="Password"
                  type="Password"
                  required
                />
              </div>
              <Link href={"/Forgot-Password/Email-Verification/Reset-Password/Success"}>
                <Button type="submit" className="w-full text-white">
                  Reset Password
                </Button>
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
      </div>
  )
}

export default ResetPassword
