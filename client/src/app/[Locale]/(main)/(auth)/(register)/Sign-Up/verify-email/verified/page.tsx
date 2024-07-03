"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";

import { Button } from "@/Components/ui/Button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
const ResetPassword = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations("Auth.EmailVerification.verified");

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:3001/auth/verify/${token}`);
      } catch (error) {
        console.error("There was an error verifying the token:", error);
      }
    };

    verifyToken();
    localStorage.removeItem("name");
  }, [token]);

  return (
    <div className="flex flex-col py-8 justify-between">
      <div className="mx-auto grid w-7/12 gap-16 mt-56">
        <div className="grid gap-8">
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src={"/icons/success.svg"}
              width={80}
              height={80}
              alt="shape"
              className=""
            />
            <h1 className="text-xl font-bold">{Content("title")}</h1>
          </div>
          <Link href={`/${Language}/Sign-Up/choose-type`}>
            <Button type="submit" className="w-full text-white">
              {Content("CallToAction")}
            </Button>
          </Link>
        </div>
      </div>
      <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
    </div>
  );
};

export default ResetPassword;
