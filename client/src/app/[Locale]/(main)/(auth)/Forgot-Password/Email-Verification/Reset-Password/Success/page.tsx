"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/Components/ui/Button";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ResetPassword = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations("Auth.ForgotPassword.RessetSuccessful");

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="mx-auto grid w-full px-5 sm:px-10 md:px-32 lg:px-0  lg:w-7/12 gap-16 mt-20 lg:mt-32 xl:mt-56">
        <div className="grid gap-8">
          <div className="flex flex-col justify-center items-center gap-8 text-center">
            <Image
              src={"/icons/success.svg"}
              width={80}
              height={80}
              alt="shape"
              className=""
            />
            <h1 className="text-lg md:text-xl font-bold">{Content("title")}</h1>
          </div>
          <Link href={`/${Language}/login`}>
            <Button type="submit" className="w-full text-white text-xs sm:text-sm">
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
