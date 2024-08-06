"use client";

import Header from "@/Components/layout/Header";
import { useTranslations } from "next-intl";
function AboutUs() {
  const NavbarContent = useTranslations("NavBar");
  const Content = useTranslations("AboutUs");
  return (
    <>
      <Header
        NavbarContent={NavbarContent}
        HomePage={"hover:text-primary"}
        Offers={"hover:text-primary"}
        FAQ={"hover:text-primary"}
        AboutUS={"text-primary font-semibold"}
      />
      <div className="bg-neutralBg text-secondaryDarkBlue min-h-screen w-full flex flex-col justify-center items-center text-center">
        <p className="text-lg md:text-xl lg:text-2xl font-bold mb-16">{Content('Title')}</p>
      </div>
    </>
  );
}

export default AboutUs;
