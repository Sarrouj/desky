"use client";

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useEffect, useState } from "react"

// Internationalization
import {  useTranslations } from 'next-intl'

const ForgotPassword = () => {
  const [Language, setLanguage] = useState();
  // Language
  useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
  }, [Language])

  // Content
  const Content = useTranslations('Auth.ForgotPassword');

  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid w-7/12 gap-16 mt-28">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">{Content('Title')}</h1>
              <p className="text-balance text-muted-foreground">
                {Content('Description')}
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{Content('Email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Link href={`/${Language}/Forgot-Password/Email-Verification`}>
                <Button type="submit" className="w-full text-white">
                  {Content('CallToAction')}
                </Button>
              </Link>
              <Link href={`/${Language}/login`}>
                <Button variant="outline" className="w-full">
                  {Content('BackToLogin')}
                </Button>
              </Link>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">{Content('CopyWrite')}</p>
      </div>
  )
}

export default ForgotPassword
