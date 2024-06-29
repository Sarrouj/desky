"use client"

import Link from "next/link";
import { useState, useEffect} from "react";
import { redirect } from 'next/navigation';
import { Button } from "../ui/Button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

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
    <header className="flex items-center py-3 px-10 justify-between text-secondaryDarkBlue ">
      <Link href={"/"} className="text-2xl font-bold text-primaryOrange">Desky</Link>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href={"/"} className="text-primaryOrange font-bold">
          {NavbarContent("NavLinks.Home")}
        </Link>
        <Link href={`/${rout}/offers`} className="hover:text-primary ">{NavbarContent("NavLinks.Offers")}</Link>
        <Link href={"/"} className="hover:text-primary ">{NavbarContent("NavLinks.FAQ")}</Link>
        <Link href={"/"} className="hover:text-primary ">{NavbarContent("NavLinks.AboutUs")}</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link href={`/${rout}/login`}>
            <Button className="px-5 bg-white border text-secondaryDarkBlue hover:bg-neutralBg">{NavbarContent("Auth.Login")}</Button>
        </Link>
        <Link href={`/${rout}/Sign-Up`}>
            <Button className="text-white px-5">{NavbarContent("Auth.SignUp")}</Button>
        </Link>
        <Select onValueChange={changeSelectedValue}>
            <SelectTrigger className="w-[90px] border-none focus:ring-0 focus:ring-white">
                <SelectValue placeholder={currentLang}/>
            </SelectTrigger>
            <SelectContent>
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
