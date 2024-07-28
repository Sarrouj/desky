"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import "./style.css";

// Internationalization
import { useTranslations } from "next-intl";

const DepositorType = () => {
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState<string>();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Content
  const ChooseTypeContent = useTranslations("Auth.BidderType");

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

  const handleIndividual = async () => {
    try {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col py-8 justify-between">
      <div className="w-10/12 mx-auto text-xs text-end">
        <p className="text-gray-400">{ChooseTypeContent("Step")}</p>
        <p className="font-semibold">{ChooseTypeContent("LegalInfo")}</p>
      </div>
      <div className="mx-auto grid w-7/12 gap-6 mb-10">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{ChooseTypeContent("Title")}</h1>
          <p className="text-muted-foreground">
            {ChooseTypeContent("Description")}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg hover:cursor-pointer"
            onClick={handleIndividual}
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/DepositorIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon"
              />
              <Image
                src={"/icons/HoverDepositorIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon"
              />
              <div>
                <h3 className="font-semibold">
                  {ChooseTypeContent("individual")}
                </h3>
                <p className="text-xs">
                  {ChooseTypeContent("individualDescription")}
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
          </div>
          <Link
            href={`/${Language}/Sign-Up/Choose-Type/Depositor-Type/AutoEntrepreneur-Info`}
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
            href={`/${Language}/Sign-Up/Choose-Type/Depositor-Type/Company-Info`}
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </div>
      </div>
      <p className="w-10/12 mx-auto text-sm">
        {ChooseTypeContent("CopyWrite")}
      </p>
    </div>
  );
};

export default DepositorType;
