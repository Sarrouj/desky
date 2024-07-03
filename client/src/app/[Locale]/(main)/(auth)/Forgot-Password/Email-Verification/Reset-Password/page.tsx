"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ResetPassword = () => {
  const [Language, setLanguage] = useState();
  const Content = useTranslations("Auth.ForgotPassword.ResetPassword");

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  const email = localStorage.getItem("email");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();

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
    <div className="flex flex-col py-8 justify-between">
      <div className="mx-auto grid w-7/12 gap-16 mt-28">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{Content("title")}</h1>
          <p className=" text-muted-foreground">{Content("Description")}</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("NewPassword")}</Label>
            <Input
              id="Password"
              type="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("ConfirmPassword")}</Label>
            <Input
              id="Password"
              type="Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full text-white">
            {Content("ResetPassword")}
          </Button>
        </form>
      </div>
      <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
    </div>
  );
};

export default ResetPassword;
