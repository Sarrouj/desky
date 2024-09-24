"use client"

import Link from "next/link";
import { useState, useEffect} from "react";
import { redirect } from 'next/navigation';
import { Button } from "../ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import ResponsiveHomeMenu from "@/Components/common/ResponsiveHomeMenu";

interface HomeNavbarProps {
    NavbarContent: any;
}

const HomeNavbar: React.FC<HomeNavbarProps>  = ({NavbarContent}) => {
    let [selectedValue, setSelectedValue] = useState<string>();
    let [currentLang, setCurrentLang] = useState<string>("French");
    let [rout, setRoute] = useState<string>('fr');

    const changeSelectedValue = (value : string) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        if(selectedValue !== ""){
            if(selectedValue == 'French' || selectedValue == 'Français'){
                localStorage.setItem('lang', JSON.stringify('French'));
                redirect('/fr');
            }else if(selectedValue == 'English' || selectedValue == 'Anglais'){
                localStorage.setItem('lang', JSON.stringify('English'));
                redirect('/en');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if(lang){
            let langValue = JSON.parse(lang);
            setCurrentLang(langValue);
        }

        if(currentLang == "French" || currentLang == 'Français'){
            setRoute("fr");
            localStorage.setItem('lg', JSON.stringify("fr"));
        }else if(currentLang == "English" || currentLang == "Anglais"){
            setRoute("en");
            localStorage.setItem('lg', JSON.stringify('en'));
        }

    }, [currentLang])


  return (
    <header className="flex items-center py-3 px-5 md:px-12 lg:px-18 xl:px-20 justify-between text-secondaryDarkBlue ">
      <Link href={"/"} className="text-xl lg:text-2xl font-bold text-primaryOrange">Desky</Link>
      <ResponsiveHomeMenu Language={rout}/>
      <nav className="hidden lg:flex gap-4 lg:gap-8 xl:gap-10 text-sm font-medium lg:ml-20 xl:ml-44">
        <Link href={"/"} className="text-primaryOrange font-bold text-xs lg:text-sm ">
          {NavbarContent("NavLinks.Home")}
        </Link>
        <Link href={`/${rout}/offers`} className="hover:text-primary text-xs lg:text-sm ">{NavbarContent("NavLinks.Offers")}</Link>
        <Link href={`/${rout}/About-Us`} className="hover:text-primary text-xs lg:text-sm ">{NavbarContent("NavLinks.AboutUs")}</Link>
        <Link href={`/${rout}/Contact-Us`} className="hover:text-primary text-xs lg:text-sm ">{NavbarContent("NavLinks.ContactUs")}</Link>
        <Link href={`/${rout}/FAQ`} className="hover:text-primary text-xs lg:text-sm ">{NavbarContent("NavLinks.FAQ")}</Link>
      </nav>
      <div className="items-center gap-2 hidden lg:flex">
        <Link href={`/${rout}/login`}>
            <Button className="px-5 bg-white border text-secondaryDarkBlue hover:bg-neutralBg text-xs lg:text-sm ">{NavbarContent("Auth.Login")}</Button>
        </Link>
        <Link href={`/${rout}/Sign-Up`}>
            <Button className="text-white px-5 text-xs lg:text-sm">{NavbarContent("Auth.SignUp")}</Button>
        </Link>
        <Select onValueChange={changeSelectedValue}>
            <SelectTrigger className="w-[90px] border-none focus:ring-0 focus:ring-white text-xs lg:text-sm">
                <SelectValue placeholder={currentLang}/>
            </SelectTrigger>
            <SelectContent className="text-xs lg:text-sm">
                <SelectGroup>
                    <SelectItem value="French" className={currentLang == "French" || currentLang == 'Français' ? "bg-neutralBg" : "bg-white"}>{NavbarContent("Languages.French")}</SelectItem>
                    <SelectItem value="English" className={currentLang == "English" || currentLang == "Anglais" ? "bg-neutralBg" : "bg-white"}>{NavbarContent("Languages.English")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default HomeNavbar;
