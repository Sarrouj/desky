"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "./style.css";

// Internationalization
import { useTranslations } from "next-intl";

const Type = () => {
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState<string>();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Content
  const ChooseTypeContent = useTranslations("Auth.ChooseType");

  // Language
  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg") || "null");
    setLanguage(lg);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = `/${Language}`;
    }
  }, [status, Language]);

  const handleTypeChoosing = async (userType: string) => {
    setDisable(true);
    setSuccess("");
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register/user",
        {
          email,
          userType,
        }
      );

      if (response && response.data && response.data.success) {
        if (userType === "depositor") {
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            setError(result.error);
          } else if (result) {
            setSuccess("Registered successfully");
            localStorage.removeItem("email");
            localStorage.removeItem("password");
            window.location.href = `/${Language}/dashboard-d`;
          }
        } else if (userType === "bidder") {
          window.location.href = `/${Language}/Sign-Up/choose-type/bidder-Type`;
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        setDisable(false);
      } else {
        setError("API Error");
        setDisable(false);
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className="bg-muted lg:block rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange flex flex-col justify-end items-end">
        <div className="h-2/4 p-8">
          <Link href="/">
            <h1 className="text-white text-2xl font-bold">Desky</h1>
          </Link>
        </div>
        <div className="h-2/4 flex justify-start px-8">
          <Image src="/authShape.svg" width={400} height={400} alt="shape" />
        </div>
      </div>
      <div className="flex flex-col py-8 justify-between">
        <div className="w-10/12 mx-auto text-sm text-end"></div>
        <div className="mx-auto grid w-7/12 gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">{ChooseTypeContent("title")}</h1>
            <p className="text-muted-foreground">{ChooseTypeContent("Desc")}</p>
          </div>
          <div className="flex flex-col gap-5">
            {disable == true ? (
              <div className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer">
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/DepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="depositor icon"
                    className="depositorIcon"
                  />
                  <Image
                    src="/icons/HoverDepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="hover depositor icon"
                    className="hidden hoverDepositorIcon"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {ChooseTypeContent("Depositor")}
                    </h3>
                    <p className="text-xs">
                      {ChooseTypeContent("DespositorActionDesc")}
                    </p>
                  </div>
                </div>
                <Image
                  src="/icons/arrow-right.svg"
                  width={25}
                  height={25}
                  alt="arrow right"
                  className="arrowRight hidden"
                />
              </div>
            ) : (
              <div
                className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer"
                onClick={() => handleTypeChoosing("depositor")}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/DepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="depositor icon"
                    className="depositorIcon"
                  />
                  <Image
                    src="/icons/HoverDepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="hover depositor icon"
                    className="hidden hoverDepositorIcon"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {ChooseTypeContent("Depositor")}
                    </h3>
                    <p className="text-xs">
                      {ChooseTypeContent("DespositorActionDesc")}
                    </p>
                  </div>
                </div>
                <Image
                  src="/icons/arrow-right.svg"
                  width={25}
                  height={25}
                  alt="arrow right"
                  className="arrowRight hidden"
                />
              </div>
            )}
            {disable == true ? (
              <div className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer">
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/bidderIcon.svg"
                    width={50}
                    height={50}
                    alt="bidder icon"
                    className="depositorIcon"
                  />
                  <Image
                    src="/icons/HoverBidderIcon.svg"
                    width={50}
                    height={50}
                    alt="hover bidder icon"
                    className="hidden hoverDepositorIcon"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {ChooseTypeContent("Bidder")}
                    </h3>
                    <p className="text-xs">
                      {ChooseTypeContent("BidderActionDesc")}
                    </p>
                  </div>
                </div>
                <Image
                  src="/icons/arrow-right.svg"
                  width={25}
                  height={25}
                  alt="arrow right"
                  className="arrowRight hidden"
                />
              </div>
            ) : (
              <div
                className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer"
                onClick={() => handleTypeChoosing("bidder")}
              >
                <div className="flex items-center gap-5">
                  <Image
                    src="/icons/bidderIcon.svg"
                    width={50}
                    height={50}
                    alt="bidder icon"
                    className="depositorIcon"
                  />
                  <Image
                    src="/icons/HoverBidderIcon.svg"
                    width={50}
                    height={50}
                    alt="hover bidder icon"
                    className="hidden hoverDepositorIcon"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {ChooseTypeContent("Bidder")}
                    </h3>
                    <p className="text-xs">
                      {ChooseTypeContent("BidderActionDesc")}
                    </p>
                  </div>
                </div>
                <Image
                  src="/icons/arrow-right.svg"
                  width={25}
                  height={25}
                  alt="arrow right"
                  className="arrowRight hidden"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
          </div>
        </div>
        <p className="w-10/12 mx-auto text-sm">
          {ChooseTypeContent("CopyWriteMSG")}
        </p>
      </div>
    </div>
  );
};

export default Type;
