"use client";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import React from "react";

const EmailVerification = () => {
  const [Language, setLanguage] = useState();
  const [name, setName] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const Content = useTranslations("Auth.EmailVerification");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setName(name);
    const email = localStorage.getItem("email");
    if (email) setEmail(email);
    const password = localStorage.getItem("password");
    if (password) setPassword(password);
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("https://desky-2.onrender.com/auth/register/tempUser", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="mx-auto grid gap-16 mt-28 w-full px-5 sm:px-10 md:px-32 lg:px-0 lg:w-4/6">
        <div className="grid gap-2 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {Content("title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base w-full">
            {Content("Desc")} {email}.
          </p>
        </div>
        <div className="grid gap-4">
          <p className="text-xs sm:text-sm md:text-base">
            {Content("resendMsg")}
          </p>
          <Button
            onClick={handleSubmit}
            className="w-full text-white  text-xs sm:text-sm"
          >
            {Content("ResendEmail")}
          </Button>
          <Link href={`/${Language}/login`}>
            <Button variant="outline" className="w-full text-xs sm:text-sm">
              {Content("BackToLogin")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{Content("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default EmailVerification;
