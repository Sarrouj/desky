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
      <main className="bg-neutralBg space-y-8 px-12 pt-10 text-center">
        <div className="flex flex-col gap-3 items-center ">
          <h1 className="text-4xl font-bold text-primary">Contact Us</h1>
          <span>Any questions or remarks? Just write us a message!</span>
        </div>
        <div className="w-full grid grid-cols-2">
          <div className=" bg-muted rounded-lg m-5 bg-primary w-3/4">
            <div className="h-2/4 text-white p-10">
              <h3 className="text-3xl font-semibold mb-4">
                Contact information
              </h3>

              <span className="font-light">
                feel free to contact our team for any information
              </span>
              <div className="flex flex-col gap-8 mt-24">
                <div className="flex gap-4">
                  <Phone />
                  <span>+123 456 7890</span>
                </div>
                <div className="flex gap-4">
                  <Mail />
                  <span>email@example.com</span>
                </div>
                <div className="flex gap-4">
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
            className="flex flex-col justify-center align-middle w-3/4"
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
