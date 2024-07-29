"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
// Internationalization
import { useTranslations } from "next-intl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();
  // Content
  const LoginContent = useTranslations("Auth.Login");
  //User Data
  const userType: string | null = session ? session.user?.role : null;

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  useEffect(() => {
    if (status === "authenticated") {
      if (userType == "bidder") {
        window.location.href = `/${Language}/Dashboard-B`;
      } else if (userType == "depositor") {
        window.location.href = `/${Language}/dashboard-d`;
      } else if (userType == "admin") {
        window.location.href = `/${Language}/Dashboard-A/Offers-verification`;
      }
    }
  }, [status, Language, userType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result) {
      setSuccess("Login successful!");
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { redirect: false });

    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      if (result.url.includes("choose-type")) {
        window.location.href = `/${Language}/(main)/(register)/Sign-Up/Choose-Type`;
      } else {
        if (status === "authenticated") {
          if (userType == "bidder") {
            window.location.href = `/${Language}/dashboard-b`;
          } else if (userType == "depositor") {
            window.location.href = `/${Language}/dashboard-d`;
          } else if (userType == "admin") {
            window.location.href = `/${Language}/Dashboard-A/Offers-verification`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className="flex flex-col py-8 justify-between">
        <Link
          href={`/${Language}`}
          className="w-full text-center md:text-start md:w-10/12 mx-auto"
        >
          <p className="text-primary font-bold text-2xl sm:text-xl md:text-2xl">
            Desky
          </p>
        </Link>
        <div className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16 pt-10 pb-16 sm:py-20 xl:py-0 xl:px-0 xl:w-7/12 gap-6">
          <div className="grid gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
              {LoginContent("title")}
            </h1>
            <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
              {LoginContent("Description")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm md:text-base"
              >
                {LoginContent("Email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
                className="text-xs sm:text-sm md:text-base"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className=" text-xs sm:text-sm md:text-base"
                >
                  {LoginContent("Password")}
                </Label>
                <Link
                  href={`/${Language}/Forgot-Password`}
                  className="ml-auto inline-block  text-xs sm:text-sm underline"
                >
                  {LoginContent("Forgot")}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-xs sm:text-sm md:text-base"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs md:text-sm ">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-xs md:text-sm">{success}</p>
            )}
            <Button
              type="submit"
              className="w-full text-white text-xs sm:text-sm"
            >
              {LoginContent("CallToAction")}
            </Button>
          </form>
          <p className="text-center  text-xs sm:text-sm ">
            {" "}
            {LoginContent("OR")}{" "}
          </p>
          <Button
            variant="outline"
            className="w-full text-xs sm:text-sm "
            onClick={handleGoogleSignIn}
          >
            {LoginContent("LGGoogle")}
          </Button>
          <div className="mt-4 text-center text-xs sm:text-sm">
            {LoginContent("Dont")}{" "}
            <Link href={`/${Language}/Sign-Up`} className="underline">
              {LoginContent("SignUP")}
            </Link>
          </div>
        </div>
        <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
          <p>{LoginContent("CopyWrite")}</p>
        </div>
      </div>
      <div className="bg-muted rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange hidden lg:flex flex-col justify-end items-end">
        <div className="h-2/4 text-custom-yellow"></div>
        <div className="h-2/4 flex justify-end px-8">
          <Image
            src={"/authShape.svg"}
            width={400}
            height={400}
            alt="shape"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
