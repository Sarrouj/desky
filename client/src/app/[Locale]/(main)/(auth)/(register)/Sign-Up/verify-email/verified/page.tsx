"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";

import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
const ResetPassword = () => {
  const [Language, setLanguage] = useState();
  const [token, setToken] = useState<any>();
  const Content = useTranslations("Auth.EmailVerification.verified");
  
  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (urlParams) {
      const token = urlParams.get("token");
      if (token) setToken(token);
    }
  }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`https://desky-2.onrender.com/auth/verify/${token}`);
      } catch (error) {
        console.error("There was an error verifying the token:", error);
      }
    };

    verifyToken();
    localStorage.removeItem("name");
  }, [token]);

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="mx-auto grid  w-full lg:w-7/12 gap-16 mt-20 lg:mt-32 xl:mt-56 px-5 sm:px-10 md:px-32 lg:px-0">
        <div className="grid gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src={"/icons/success.svg"}
              width={80}
              height={80}
              alt="shape"
              className=""
            />
            <h1 className="text-base md:text-lg lg:text-xl font-bold">
              {Content("title")}
            </h1>
          </div>
          <Link href={`/${Language}/Sign-Up/Choose-Type`}>
            <Button
              type="submit"
              className="w-full text-white text-xs sm:text-sm"
            >
              {Content("CallToAction")}
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

export default ResetPassword;
