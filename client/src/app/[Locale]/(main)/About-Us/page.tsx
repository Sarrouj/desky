"use client";

import Header from "@/Components/layout/Header";
import { useTranslations } from "next-intl";
function AboutUs() {
  const NavbarContent = useTranslations("NavBar");
  return (
    <>
      <Header
        NavbarContent={NavbarContent}
        HomePage={"hover:text-primary"}
        Offers={"hover:text-primary"}
        FAQ={"text-primary font-semibold"}
        AboutUS={"hover:text-primary"}
      />
      <div>AboutUs</div>
    </>
  );
}

export default AboutUs;
