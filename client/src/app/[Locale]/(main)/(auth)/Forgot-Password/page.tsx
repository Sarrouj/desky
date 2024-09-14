"use client";

import Link from "next/link";
import axios from "axios";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useEffect, useState } from "react";

// Internationalization
import { useTranslations } from "next-intl";

const ForgotPassword = () => {
  const [Language, setLanguage] = useState();
  const [email, setEmail] = useState<any>();

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);
  
  // Content
  const Content = useTranslations("Auth.ForgotPassword");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BackendURL}/auth/forgetPassword`,
        {
          email,
        }
      );
      if (response && response.data && response.data.success) {
        localStorage.setItem("email", email);
        setTimeout(() => {
          window.location.href = `/${Language}/Forgot-Password/Email-Verification`;
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16 pt-20 pb-16 sm:py-20 xl:pt-32 xl:px-0 xl:w-7/12 gap-6"
      >
        <div className="grid gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {Content("Title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {Content("Description")}
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">
              {Content("Email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="text-xs sm:text-sm md:text-base"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white text-xs sm:text-sm "
          >
            {Content("CallToAction")}
          </Button>
          <Link href={`/${Language}/login`}>
            <Button variant="outline" className="w-full text-xs sm:text-sm ">
              {Content("BackToLogin")}
            </Button>
          </Link>
        </div>
      </form>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{Content("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
