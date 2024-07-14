"use client"

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";


import FirstVueDropDownMenu from "../common/FirstVueDropDownMenu";
import { useTranslations } from "next-intl";

interface Header {
  NavbarContent: any;
  Home : String;
  Offers : String;
  FAQ : String;
  AboutUS : String;
}

const Header: React.FC<Header>  = ({NavbarContent , Home, Offers, FAQ, AboutUS}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();

  // Language
  useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
  }, [Language])
  
  // User Data
  const userName : string | null = session ? session.user?.name : null;
  const userType : string | null = session ? session.user?.role : null;

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  const handleLogout = () => {
    signOut(Language);
  };

  let DropDownMenuContent = useTranslations("NavBar");

  return (
    <header className="flex items-center py-3  px-10 justify-between text-secondaryDarkBlue">
      <Link href={`/${Language}/offers`} className="text-2xl font-bold text-primaryOrange">Desky</Link>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href={`/${Language}`} className={`${Home}`}>
          {NavbarContent("NavLinks.Home")}
        </Link>
        <Link href={`/${Language}/offers`} className={`hover:text-primary ${Offers}`}>{NavbarContent("NavLinks.Offers")}</Link>
        <Link href={"/"} className={`hover:text-primary ${FAQ}`}>{NavbarContent("NavLinks.FAQ")}</Link>
        <Link href={`/${Language}/offers`} className={`hover:text-primary ${AboutUS}`}>{NavbarContent("NavLinks.AboutUs")}</Link>
      </nav>
      <nav className="flex gap-3 items-center text-sm font-medium">
        <FirstVueDropDownMenu 
            content={DropDownMenuContent}
            Language={Language}
        />
      </nav>
    </header>
  );
};

export default Header;
