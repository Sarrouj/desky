"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const [Language, setLanguage] = useState("fr");

  // Language
  const Content = useTranslations("Footer");

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr";
    setLanguage(language);
  }, [Language]);
  return (
    <footer className="px-4 md:px-6 lg:px-8 xl:px-10 py-5">
      <div className="flex flex-col lg:flex-row  gap-5 lg:gap-0 justify-between items-center border-b border-secondaryDarkBlue pb-4 md:pb-8 lg:pb-10">
        <div>
          <h1 className="font-bold text-xl md:text-2xl xl:text-3xl text-primaryOrange">
            Desky
          </h1>
        </div>
        <ul className="flex gap-8 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20 text-xs md:text-sm font-semibold text-secondaryDarkBlue">
          <li>
            <Link href={`/${Language}/`}>{Content('Home')}</Link>
          </li>
          <li>
            <Link href={`/${Language}/about-us`}>{Content('About')}</Link>
          </li>
          <li>
            <Link href={`/${Language}/contact-us`}>{Content('Contact')}</Link>
          </li>
          <li>
            <Link href={`/${Language}/faq`}>{Content('FAQ')}</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row text-center justify-center items-center lg:justify-between pt-6 md:pt-10 gap-4">
        <ul className="gap-2 lg:gap-5 text-xs sm:text-sm text-secondaryDarkBlue justify-center flex lg:hidden">
          <Link href={`/${Language}/terms`}>
            <li>{Content('Terms')}</li>
          </Link>
          <li>|</li>
          <Link href={`/${Language}/privacy`}>
            <li>{Content('Privacy')}</li>
          </Link>
        </ul>
        <p className="text-xs sm:text-sm text-secondaryDarkBlue">
          {Content('RightReserver')}
        </p>
        <ul className="gap-2 lg:gap-5 text-xs sm:text-sm text-secondaryDarkBlue justify-center hidden lg:flex">
          <Link href={`/${Language}/terms`}>
            <li>{Content('Terms')}</li>
          </Link>
          <li>|</li>
          <Link href={`/${Language}/privacy`}>
            <li>{Content('Privacy')}</li>
          </Link>
        </ul>
        <ul className="flex gap-2 md:gap-3 justify-center">
          <li className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-primary hover:bg-orange-400 text-white transition ease-in-out rounded-full flex justify-center items-center cursor-pointer">
            <Instagram size={20} className="text-white w-3 h-3 lg:w-4 lg:h-4" />
          </li>
          <li className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-slate-900 hover:bg-secondaryDarkBlue text-white transition ease-in-out rounded-full flex justify-center items-center cursor-pointer gap-0.5">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-slate-100 rounded-full"></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-slate-100 rounded-full"></div>
          </li>
          <li className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-primary hover:bg-orange-400 text-white transition ease-in-out rounded-full flex justify-center items-center cursor-pointer">
            <Image
              width={28}
              height={28}
              src={"/logos/TweeterLogo.png"}
              className="text-white w-3 h-3 lg:w-4 lg:h-4"
              alt="Icon"
            />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
