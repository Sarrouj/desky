"use client";

import Header from "@/Components/layout/Header";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/Button";

import { useTranslations } from "next-intl";
import { useState } from "react";

import axios from "axios";

const ContactUs = () => {
  const NavbarContent = useTranslations("NavBar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/user/send-email", {
      name,
      email,
      message,
    });
    response.data && response.data.success
      ? setSuccess(response.data.success)
      : setError(response.data.error);
  };
  return (
    <>
      <Header
        NavbarContent={NavbarContent}
        HomePage={"hover:text-primary"}
        Offers={"hover:text-primary"}
        FAQ={"hover:text-primary"}
        AboutUS={"hover:text-primary"}
      />
      <main className="bg-neutralBg space-y-8 px-4 md:px-6 lg:px-8 xl:px-12   pt-10 text-center border-t-2">
        <div className="flex flex-col gap-3 items-center ">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-secondaryDarkBlue">
            Contact Us
          </h1>
          <span className="text-secondaryDarkBlue text-xs md:text-sm lg:text-base">
            Any questions or remarks? Just write us a message!
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          <div className=" bg-muted rounded-lg  bg-primary w-full hidden md:block">
            <div className="h-2/4 text-white p-4  md:p-6 lg:p-8 xl:p-10">
              <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold lg:mb-2 xl:mb-4">
                Contact information
              </h3>
              <span className="font-light text-xs md:text-sm lg:text-base">
                Feel free to contact our team for any information
              </span>
              <div className="flex flex-col gap-4 lg:gap-8 md:mt-20 lg:mt-28">
                <div className="flex gap-4 text-xs md:text-sm lg:text-base">
                  <Phone />
                  <span>+212 614 599 198</span>
                </div>
                <div className="flex gap-4 text-xs md:text-sm lg:text-base">
                  <Mail />
                  <span>zaydssh500@gmail.com</span>
                </div>
                <div className="flex gap-4 text-xs md:text-sm lg:text-base">
                  <MapPin />
                  <span>123 somewhere street 12345</span>
                </div>
              </div>
            </div>
            <div className="h-2/4 flex justify-end px-8">
              <Image
                src={"/authShape.svg"}
                width={250}
                height={250}
                alt="shape"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center align-middle w-full md:px-5 lg:px-10"
          >
            <div className="flex flex-col gap-2 text-start pt-6 ">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="your name"
                required
              />
            </div>
            <div className="flex flex-col gap-2 text-start pt-6 ">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2 text-start pt-6 ">
              <Label htmlFor="message">Message</Label>
              <Textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="ring-0 border-input focus:ring-0 focus-visible:ring-white focus-visible:ring-1"
                id="message"
                placeholder={"your message"}
                maxLength={2000}
                required
              />
            </div>

            <div className="flex flex-col gap-3 pt-6">
              {success ? (
                <span className="text-green-500"> {success} </span>
              ) : (
                ""
              )}
              {error ? <span className="text-red-500"> {error} </span> : ""}
              <Button type="submit" className="text-white w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ContactUs;
