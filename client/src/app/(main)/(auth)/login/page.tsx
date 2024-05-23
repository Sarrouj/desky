"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("SignIn Result: ", result);

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setSuccess("Login successful!");
      }
    } catch (err) {
      console.error("SignIn Error: ", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className="flex flex-col py-8 justify-between">
        <Link
          href={"/"}
          className="w-10/12 mx-auto text-primary font-bold text-2xl"
        >
          Desky
        </Link>
        <form onSubmit={handleSubmit} className="mx-auto grid w-7/12 gap-6 ">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to login
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/Forgot-Password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
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
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/choose-type" className="underline">
              Sign Up
            </Link>
          </div>
        </form>
        <p className="w-10/12 mx-auto text-sm">
          © 2024 Desky.ma. All Rights Reserved
        </p>
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

export default Login;
