"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./style.css";

// Internationalization
import { useTranslations } from "next-intl";

const BidderType = () => {
  const [Language, setLanguage] = useState();

  const ChooseTypeContent = useTranslations("Auth.BidderType");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="w-10/12 mx-auto text-xs text-end">
        <p className="text-gray-400">{ChooseTypeContent("Step")}</p>
        <p className="font-semibold">{ChooseTypeContent("LegalInfo")}</p>
      </div>
      <div className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16  pb-16 sm:py-20 xl:py-0 xl:px-0 xl:w-7/12 gap-6">
        <div className="grid gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {ChooseTypeContent("Title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {ChooseTypeContent("Description")}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <Link
            href={`/${Language}/Sign-Up/Choose-Type/Bidder-Type/AutoEntrepreneur-Info`}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/bidderIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon h-10 w-10 md:h-12 md:w-12"
              />
              <Image
                src={"/icons/HoverBidderIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon h-10 w-10 md:h-12 md:w-12"
              />
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  {ChooseTypeContent("AutoEntrepreneur")}
                </h3>
                <p className="text-xs">
                  {ChooseTypeContent("AutoDescription")}
                </p>
              </div>
            </div>
            <Image
              src={"/icons/arrow-right.svg"}
              width={25}
              height={25}
              alt="shape"
              className="arrowRight hidden"
            />
          </Link>
          <Link
            href={`/${Language}/Sign-Up/Choose-Type/Bidder-Type/Company-Info`}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/companyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon h-10 w-10 md:h-12 md:w-12"
              />
              <Image
                src={"/icons/HoverCompanyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon h-10 w-10 md:h-12 md:w-12"
              />
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  {ChooseTypeContent("Company")}
                </h3>
                <p className="text-xs">
                  {ChooseTypeContent("CompanyDescription")}
                </p>
              </div>
            </div>
            <Image
              src={"/icons/arrow-right.svg"}
              width={25}
              height={25}
              alt="shape"
              className="arrowRight hidden"
            />
          </Link>
        </div>
      </div>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{ChooseTypeContent("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default BidderType;
