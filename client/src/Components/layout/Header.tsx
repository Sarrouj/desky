"use client"

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import FirstVueDropDownMenu from "../common/FirstVueDropDownMenu";
import FirstVueResponsiveMenu from "../common/FirstVueResponsiveMenu";
import { useTranslations } from "next-intl";


interface Header {
  NavbarContent: any;
  HomePage : String;
  Offers : String;
  FAQ : String;
  AboutUS : String;
}

const Header: React.FC<Header>  = ({NavbarContent , HomePage, Offers, FAQ, AboutUS}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();

  // Language
  useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
  }, [Language])
  

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);


  let DropDownMenuContent = useTranslations("NavBar");

  return (
    <header className="flex items-center py-3 px-4 sm:px-6 md:px-8 lg:px-10 justify-between text-secondaryDarkBlue">
      <Link href={`/${Language}/`} className="text-xl lg:text-2xl font-bold text-primaryOrange">Desky</Link>
      <nav className="gap-4 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-medium hidden md:flex lg:ml-20">
        <Link href={`/${Language}`} className={`${HomePage}`}>
          {NavbarContent("NavLinks.Home")}
        </Link>
        <Link href={`/${Language}/offers`} className={`hover:text-primary ${Offers}`}>{NavbarContent("NavLinks.Offers")}</Link>
        <Link href={`/${Language}/FAQ`} className={`hover:text-primary ${FAQ}`}>{NavbarContent("NavLinks.FAQ")}</Link>
        <Link href={`/${Language}/About-Us`} className={`hover:text-primary ${AboutUS}`}>{NavbarContent("NavLinks.AboutUs")}</Link>
      </nav>
      <FirstVueResponsiveMenu
        Language={Language}
      />
      <nav className="hidden md:flex gap-3 items-center text-sm font-medium">
        <FirstVueDropDownMenu 
            content={DropDownMenuContent}
            Language={Language}
        />
      </nav>
    </header>
  );
};

export default Header;
