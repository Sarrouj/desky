"use client";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const EmailVerification = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations("Auth.ForgotPassword.EmailVerification");

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  const email = localStorage.getItem("email");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/auth/forgetPassword", {
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="mx-auto grid gap-16 mt-28 w-full md:w-4/6 px-5 sm:px-32 md:px-0">
        <div className="grid gap-2 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {Content("title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {Content("Desc")} {email}.
          </p>
        </div>
        <div className="grid gap-4">
          <p className="text-xs md:text-sm lg:text-base">
            {Content("resendMsg")}
          </p>
          <Button
            onClick={handleSubmit}
            className="w-full text-white text-xs md:text-sm "
          >
            {Content("ResendEmail")}
          </Button>
          <Link href={`/${Language}/login`}>
            <Button
              variant="outline"
              className="w-full text-xs md:text-sm "
            >
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
