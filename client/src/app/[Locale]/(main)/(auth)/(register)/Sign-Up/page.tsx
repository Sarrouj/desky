"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/Components/ui/Button";
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
  const userType : string | null = session ? session.user?.role : null;

  // Content
  const SignUPContent = useTranslations("Auth.SignUp");

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  useEffect(() => {
    if (status === "authenticated") {
      if(userType == "bidder"){
        window.location.href = `/${Language}/dashboard-b`;
      }else if(userType == "depositor"){
        window.location.href = `/${Language}/dashboard-d`;
      }
    }
  }, [status, Language, userType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register/tempUser",
        {
          name,
          email,
          password,
        }
      );

      if (response && response.data && response.data.success) {
        setSuccess(response.data.success);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setTimeout(() => {
          window.location.href = `/${Language}/Sign-Up/choose-type`;
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
          className="w-10/12 mx-auto text-primary font-bold text-2xl"
        >
          Desky
        </Link>
        <div className="mx-auto grid w-7/12 gap-6 ">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">{SignUPContent("title")}</h1>
            <p className="text-balance text-muted-foreground">
              {SignUPContent("Description")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{SignUPContent("FullName")}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Robinson"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{SignUPContent("Email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{SignUPContent("Password")}</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full text-white">
              {SignUPContent("CallToAction")}
            </Button>
          </form>
          <p className="text-center">{SignUPContent("OR")}</p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            {SignUPContent("RGoogle")}
          </Button>
          <div className="mt-4 text-center text-sm">
            {SignUPContent("Already")}{" "}
            <Link href={`/${Language}/login`} className="underline">
              {SignUPContent("Login")}
            </Link>
          </div>
        </div>
        <p className="w-10/12 mx-auto text-sm">{SignUPContent("CopyWrite")}</p>
      </div>
      <div className=" bg-muted lg:block rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange flex flex-col justify-end items-end ">
        <div className="h-2/4 text-custom-yellow">r</div>
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
