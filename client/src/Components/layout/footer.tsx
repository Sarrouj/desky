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
    <footer className="px-10 py-5">
        <div className="flex flex-col md:flex-row  gap-5 md:gap-0 justify-between items-center border-b border-secondaryDarkBlue pb-8 md:pb-10">
            <div>
                <h1 className="font-bold text-3xl text-primaryOrange">Desky</h1>
            </div>
            <ul className="flex gap-16 md:gap-20 text-sm font-semibold text-secondaryDarkBlue">
                <li><Link href={`/${Language}/`}>Home</Link></li>
                <li><Link href={""}>About</Link></li>
                <li><Link href={`/${Language}/About-Us`}>Contact</Link></li>
                <li><Link href={`/${Language}/FAQ`}>FAQ</Link></li>
            </ul>
        </div>
        <div className="flex justify-between items-center pt-8 md:pt-10">
            <p className="text-xs sm:text-sm">All rights reserved ® Desky.ma  | Terms and conditions apply!</p>
            <ul className="flex gap-3">
                <Image src={"/icons/instagram.svg"} alt={""} width={30} height={30} />
                <Image src={"/icons/flickr.svg"} alt={""} width={30} height={30} />
                <Image src={"/icons/twitter.svg"} alt={""} width={30} height={30} />
            </ul>
        </div>
    </footer>
  )
}

export default Footer
