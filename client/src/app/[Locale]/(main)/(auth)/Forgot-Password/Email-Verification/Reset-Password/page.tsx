"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ResetPassword = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations("Auth.ForgotPassword.ResetPassword");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  const email = localStorage.getItem("email");
  const [password, setPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [error, setError] = useState<any>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password and Confirm Password do not match");
    }
    try {
      const response = await axios.put(
        "http://localhost:3001/auth/changePassword",
        {
          email,
          password,
        }
      );
      if (response && response.data && response.data.success) {
        window.location.href = `/${Language}/Forgot-Password/Email-Verification/Reset-Password/Success`;
        localStorage.removeItem("email");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16 pt-10 pb-16 sm:py-20 xl:py-32 xl:px-0 xl:w-7/12 gap-6">
        <div className="grid gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {Content("title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {Content("Description")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">
              {Content("NewPassword")}
            </Label>
            <Input
              id="Password"
              type="Password"
              className="text-xs sm:text-sm md:text-base"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">
              {Content("ConfirmPassword")}
            </Label>
            <Input
              id="Password"
              type="Password"
              className="text-xs sm:text-sm md:text-base"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full text-white text-xs sm:text-sm">
            {Content("ResetPassword")}
          </Button>
        </form>
      </div>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{Content("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
