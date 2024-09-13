"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./style.css";

// Internationalization
import { useTranslations } from "next-intl";

const BidderType = () => {
  const [Language, setLanguage] = useState();

  // Content
  const ChooseTypeContent = useTranslations("Auth.BidderType");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  return (
    <div className="flex flex-col py-8 justify-between">
      <div className="w-full text-xs text-end flex justify-between px-5">
        <Link className="flex items-center gap-2" href={`/${Language}/Profile-D`}>
          <Image
            src={"/icons/arrowBack.svg"}
            width={13}
            height={13}
            alt="shape"
            className=""
          />
          <p className="font-semibold">{ChooseTypeContent("Back")}</p>
        </Link>
        <div>
          <p className="text-gray-400">{ChooseTypeContent("Step")}</p>
          <p className="font-semibold">{ChooseTypeContent("LegalInfo")}</p>
        </div>
      </div>
      <div className="mx-auto grid w-7/12 gap-6 mb-10">
        <div className="grid gap-2">
          <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">{ChooseTypeContent("Title")}</h1>
          <p className="text-muted-foreground">
            {ChooseTypeContent("Description")}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <Link
            href={`/${Language}/Profile-D/Add-Info/AutoEntrepreneur-Info`}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/bidderIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon"
              />
              <Image
                src={"/icons/HoverBidderIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon"
              />
              <div>
                <h3 className="font-semibold">
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
            href={`/${Language}/Profile-D/Add-Info/Company-Info`}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/companyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon"
              />
              <Image
                src={"/icons/HoverCompanyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon"
              />
              <div>
                <h3 className="font-semibold">
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
      <p className="w-10/12 mx-auto text-sm">
        {ChooseTypeContent("CopyWrite")}
      </p>
    </div>
  );
};

export default BidderType;
