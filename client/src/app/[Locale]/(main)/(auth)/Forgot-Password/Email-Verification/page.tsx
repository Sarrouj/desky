import Link from "next/link"

import { Button } from "@/Components/ui/Button"

const emailVerification = () => {
  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid gap-16 mt-28 ">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Check your Email</h1>
              <p className="text-balance text-muted-foreground ">
                We have sent an email with password reset information to <br />
                n****e@e***e.com.
              </p>
            </div>
            <div className="grid gap-4">
              <p>Didn’t receive the email? Check spam or promotion folder or</p>
              <Link href={"/Forgot-Password/Email-Verification/Reset-Password"}>
                <Button type="submit" className="w-full text-white ">
                  Resend Email
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

export default emailVerification