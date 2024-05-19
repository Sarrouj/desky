import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"


const SignUp = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className="flex flex-col py-8 justify-between">
        <Link href={"/"} className="w-10/12 mx-auto text-primary font-bold text-2xl">Desky</Link>
          <div className="mx-auto grid w-7/12 gap-6 ">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information to create an account
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
                </div>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Link href={"/choose-type/Sign-Up/bidder-Type"}>
                <Button type="submit" className="w-full text-white">
                  Register
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Register with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              already have an account?{" "}
              <Link href="/login" className="underline">
                Sign In
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
      </div>
      <div className=" bg-muted lg:block rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange flex flex-col justify-end items-end ">
        <div className="h-2/4 text-custom-yellow">r</div>
        <div className="h-2/4 flex justify-end px-8">
          <Image src={"/authShape.svg"} width={400} height={400} alt="shape" className=""/>
        </div>
      </div>
    </div> 
  )
}

export default SignUp
