"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
          window.location.href = `/${Language}/Sign-Up/Choose-Type/Depositor-Type`;
        } else if (userType === "bidder") {
          window.location.href = `/${Language}/Sign-Up/Choose-Type/Bidder-Type`;
        }
      } else {
        setError(response.data.error);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("API Error");
      }
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className="bg-muted rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange hidden lg:flex flex-col justify-start items-start">
        <div className="h-2/4 p-8">
          <Link href="/">
            <h1 className="text-white text-2xl font-bold">Desky</h1>
          </Link>
        </div>
        <div className="h-2/4 flex justify-start px-8">
          <Image src="/authShape.svg" width={400} height={400} alt="shape" />
        </div>
      </div>
      <div className="flex flex-col py-0 lg:py-8 justify-between min-h-screen">
        <div className="mx-auto grid w-full px-5 sm:px-10 md:px-32 lg:px-14 xl:px-0 xl:w-7/12 gap-6 mt-32  xl:mt-48">
          <div className="grid gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
              {ChooseTypeContent("title")}
            </h1>
            <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
              {ChooseTypeContent("Desc")}
            </p>
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
                    className="depositorIcon  h-10 w-10 md:h-12 md:w-12"
                  />
                  <Image
                    src="/icons/HoverDepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="hover depositor icon"
                    className="hidden hoverDepositorIcon  h-10 w-10 md:h-12 md:w-12"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
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
                    className="depositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <Image
                    src="/icons/HoverDepositorIcon.svg"
                    width={50}
                    height={50}
                    alt="hover depositor icon"
                    className="hidden hoverDepositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
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
                    className="depositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <Image
                    src="/icons/HoverBidderIcon.svg"
                    width={50}
                    height={50}
                    alt="hover bidder icon"
                    className="hidden hoverDepositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
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
                    className="depositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <Image
                    src="/icons/HoverBidderIcon.svg"
                    width={50}
                    height={50}
                    alt="hover bidder icon"
                    className="hidden hoverDepositorIcon h-10 w-10 md:h-12 md:w-12"
                  />
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
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
        <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm mb-2">
          <p>{ChooseTypeContent("CopyWriteMSG")}</p>
        </div>
      </div>
    </div>
  );
};

export default Type;
