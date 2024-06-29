"use client";
import Link from "next/link"
import { Button } from "@/Components/ui/Button"
import { useState, useEffect } from "react"
import {useTranslations} from 'next-intl';
import React from "react";


const EmailVerification = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations('Auth.EmailVerification');

    // Language
    useEffect(()=>{
      let lg = JSON.parse(localStorage.getItem('lg'));
      setLanguage(lg);
    }, [Language])

  return (
      <div className="flex flex-col py-8 justify-between">
          <div className="mx-auto grid gap-16 mt-28 w-4/6">
            <div className="grid gap-2 w-full">
              <h1 className="text-3xl font-bold">{Content('title')}</h1>
              <p className="text-muted-foreground w-full">
              {Content('Desc')} n****e@e***e.com.
              </p>
            </div>
            <div className="grid gap-4">
              <p>{Content('resendMsg')}</p>
              <Link href={`/${Language}/`}>
                <Button type="submit" className="w-full text-white ">
                  {Content('ResendEmail')}
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

export default EmailVerification