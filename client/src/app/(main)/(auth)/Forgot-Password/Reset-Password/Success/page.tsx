import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"


const ResetPassword = () => {
  return (
    <div className="flex flex-col py-8 justify-between">
        <div className="mx-auto grid w-7/12 gap-16 mt-56">
          <div className="grid gap-8">
            <div className="flex flex-col justify-center items-center gap-8">
              <Image src={"/icons/success.svg"} width={80} height={80} alt="shape" className=""/>
              <h1 className="text-xl font-bold">Password Reset Successfully</h1>
            </div>
            <Link href={"/login"}>
              <Button type="submit" className="w-full text-white">
                  Login
              </Button>
            </Link>
          </div>
        </div>
      <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
    </div>
  )
}

export default ResetPassword
