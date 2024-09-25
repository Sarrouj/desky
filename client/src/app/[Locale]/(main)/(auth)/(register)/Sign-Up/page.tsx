"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

// Internationalization
import { useTranslations } from "next-intl";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();

  //User Data
  const userType: string | null = session ? session.user?.role : null;

  // Content
  const SignUPContent = useTranslations("Auth.SignUp");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  useEffect(() => {
    if (status === "authenticated") {
      if (userType == "bidder") {
        window.location.href = `/${Language}/bidder-dashboard`;
      } else if (userType == "depositor") {
        window.location.href = `/${Language}/depositor-dashboard`;
      } else if (userType == "admin") {
        window.location.href = `/${Language}/dashboard-admin/offers-verification`;
      }
    }
  }, [status, Language, userType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BackendURL}/auth/register/tempUser`,
        {
          name,
          email,
          password,
        }
      );

      if (response && response.data && response.data.success) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setTimeout(() => {
          window.location.href = `/${Language}/sign-up/verify-email`;
        }, 1000);
      } else {
        setError(response.data.error);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("API Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
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
        <div className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16 pt-10 pb-16 sm:py-20 xl:py-0 xl:px-0 xl:w-7/12 gap-6 ">
          <div className="grid gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
              {SignUPContent("title")}
            </h1>
            <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
              {SignUPContent("Description")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs sm:text-sm md:text-base">
                {SignUPContent("FullName")}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Robinson"
                required
                className="text-xs sm:text-sm "
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm md:text-base"
              >
                {SignUPContent("Email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="text-xs sm:text-sm "
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {SignUPContent("Password")}
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                className="text-xs sm:text-sm md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs sm:text-sm">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-xs sm:text-sm">{success}</p>
            )}
            <Button
              type="submit"
              className="w-full text-white text-xs sm:text-sm"
            >
              {SignUPContent("CallToAction")}
            </Button>
          </form>
          <p className="text-center text-xs sm:text-sm">
            {SignUPContent("OR")}
          </p>
          <Button
            variant="outline"
            className="w-full text-xs sm:text-sm"
            onClick={handleGoogleSignIn}
          >
            {SignUPContent("RGoogle")}
          </Button>
          <div className="mt-4 text-center text-xs sm:text-sm">
            {SignUPContent("Already")}{" "}
            <Link href={`/${Language}/login`} className="underline">
              {SignUPContent("Login")}
            </Link>
          </div>
        </div>
        <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
          <p>{SignUPContent("CopyWrite")}</p>
        </div>
      </div>
      <div className="bg-muted  rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange hidden lg:flex flex-col justify-end items-end  ">
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

export default SignUp;
