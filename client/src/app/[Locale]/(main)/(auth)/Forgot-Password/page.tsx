"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useEffect, useState } from "react";

// Internationalization
import { useTranslations } from "next-intl";

const ForgotPassword = () => {
  const [Language, setLanguage] = useState();
  const [email, setEmail] = useState();

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  // Content
  const Content = useTranslations("Auth.ForgotPassword");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/forgetPassword", {
        email,
      });
      if (response && response.data && response.data.success) {
        localStorage.setItem("email", email);
        setTimeout(() => {
          window.location.href = `/${Language}/Forgot-Password/Email-Verification`;
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-7/12 gap-16 mt-28"
      >
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{Content("Title")}</h1>
          <p className="text-balance text-muted-foreground">
            {Content("Description")}
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("Email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full text-white">
            {Content("CallToAction")}
          </Button>
          <Link href={`/${Language}/login`}>
            <Button variant="outline" className="w-full">
              {Content("BackToLogin")}
            </Button>
          </Link>
        </div>
      </form>
      <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
    </div>
  );
};

export default ForgotPassword;
