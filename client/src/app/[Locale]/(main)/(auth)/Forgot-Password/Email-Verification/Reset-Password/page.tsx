"use client"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useState, useEffect } from "react"
import {useTranslations} from 'next-intl';



const ResetPassword = () => {
const [Language, setLanguage] = useState();
const Content = useTranslations('Auth.ForgotPassword.ResetPassword');

// Language
useEffect(()=>{
  let lg = JSON.parse(localStorage.getItem('lg'));
  setLanguage(lg);
}, [Language])


  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid w-7/12 gap-16 mt-28">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">{Content("title")}</h1>
              <p className=" text-muted-foreground">
              {Content("Description")}
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{Content("NewPassword")}</Label>
                <Input
                  id="Password"
                  type="Password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{Content("ConfirmPassword")}</Label>
                <Input
                  id="Password"
                  type="Password"
                  required
                />
              </div>
              <Link href={"/Forgot-Password/Email-Verification/Reset-Password/Success"}>
                <Button type="submit" className="w-full text-white">
                  {Content("ResetPassword")}
                </Button>
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
      </div>
  )
}

export default ResetPassword
