import Image from "next/image"

import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/Components/ui/input-otp"
  


const page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
        <div className=" bg-muted lg:block rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange flex flex-col justify-end items-end ">
          <div className="h-2/4 text-custom-yellow">r</div>
          <div className="h-2/4 flex justify-end px-8">
            <Image src={"/authShape.svg"} width={400} height={400} alt="shape" className=""/>
        </div>
        </div>
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
                <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
                </InputOTP>
              </div>
              <Link href={"/Forgot-Password/Email-Verification"}>
                <Button type="submit" className="w-full text-white">
                  Send
                </Button>
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
        </div>
      </div> 
  )
}

export default page
