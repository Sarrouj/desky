"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { userType } = params;

    try {
      let response;
      if (userType === "Depositor") {
        response = await axios.post(
          "http://localhost:3001/auth/register/depositor",
          {
            depositor_name: name,
            depositor_email: email,
            depositor_password: password,
          }
        );
      } else if (userType === "Bidder") {
        response = await axios.post(
          "http://localhost:3001/auth/register/bidder",
          {
            bidder_name: name,
            bidder_email: email,
            bidder_password: password,
          }
        );
      }

      if (response && response.data && response.data.success) {
        setError("");
        setSuccess(response.data.success);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (response && response.data && response.data.success) {
        setError(response.data.error);
        setSuccess("");
      } else {
        setError("Failed to register. Please try again.");
        setSuccess("");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("API Error:", error);
        setError("Failed to register. Please try again.");
      }
      setSuccess("");
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
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Robinson"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
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
              Register
            </Button>
            <Button variant="outline" className="w-full">
              Register with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link href="/login" className="underline">
              Sign In
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

export default SignUp;
