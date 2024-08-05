"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";

const Footer = () => {
const [Language, setLanguage] = useState("fr");

// Language
useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  return (
    <footer className="px-4 md:px-6 lg:px-8 xl:px-10 py-5">
        <div className="flex flex-col md:flex-row  gap-5 md:gap-0 justify-between items-center border-b border-secondaryDarkBlue pb-4 md:pb-10">
            <div>
                <h1 className="font-bold text-xl md:text-2xl xl:text-3xl text-primaryOrange">Desky</h1>
            </div>
            <ul className="flex gap-8 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20 text-xs md:text-sm font-semibold text-secondaryDarkBlue">
                <li><Link href={`/${Language}/`}>Home</Link></li>
                <li><Link href={`/${Language}/About-Us`}>About</Link></li>
                <li><Link href={`/${Language}/Contact-Us`}>Contact</Link></li>
                <li><Link href={`/${Language}/FAQ`}>FAQ</Link></li>
            </ul>
        </div>
        <div className="flex sm:justify-between items-center pt-4 md:pt-10 ">
            <p className="text-xs sm:text-sm">All rights reserved ® Desky.ma  | Terms and conditions apply!</p>
            <ul className="hidden sm:flex gap-2 md:gap-3">
                <Image src={"/icons/instagram.svg"} alt={""} width={30} height={30} className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"/>
                <Image src={"/icons/flickr.svg"} alt={""} width={30} height={30} className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"/>
                <Image src={"/icons/twitter.svg"} alt={""} width={30} height={30} className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"/>
            </ul>
        </div>
    </footer>
  )
}

export default Footer
