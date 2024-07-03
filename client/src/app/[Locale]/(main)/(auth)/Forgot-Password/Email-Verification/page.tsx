"use client";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/Components/ui/Button";
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
    <div className="flex flex-col py-8 justify-between">
      <div className="mx-auto grid gap-16 mt-28 w-4/6">
        <div className="grid gap-2 w-full">
          <h1 className="text-3xl font-bold">{Content("title")}</h1>
          <p className="text-balance text-muted-foreground w-full">
            {Content("Desc")} {email}.
          </p>
        </div>
        <div className="grid gap-4">
          <p>{Content("resendMsg")}</p>
          <Button onClick={handleSubmit} className="w-full text-white ">
            {Content("ResendEmail")}
          </Button>
          <Link href={`/${Language}/login`}>
            <Button variant="outline" className="w-full">
              {Content("BackToLogin")}
            </Button>
          </Link>
        </div>
      </div>
      <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
    </div>
  );
};

export default EmailVerification;
