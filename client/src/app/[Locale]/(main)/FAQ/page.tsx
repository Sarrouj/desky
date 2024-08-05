"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import Header from "@/Components/layout/Header";

import { useTranslations } from "next-intl";

const FAQ = () => {
  // Content
  const NavbarContent = useTranslations("NavBar");
  const Content = useTranslations("FAQ");
  return (
    <>
      <Header
        NavbarContent={NavbarContent}
        HomePage={"hover:text-primary"}
        Offers={"hover:text-primary"}
        FAQ={"text-primary font-semibold"}
        AboutUS={"hover:text-primary"}
      />
      <main className="bg-neutralBg text-secondaryDarkBlue border-t-2">
        <div className="flex flex-col gap-10 justify-around items-center p-5 md:p-10">
          <div className="flex flex-col justify-center align-middle gap-2 w-full lg:w-2/3 py-6 md:py-8 lg:py-12 xl:py-14">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-secondaryDarkBlue">
            {Content("Title")}
            </h1>
            <p className="text-center text-xs md:text-sm lg:text-base">
            {Content("Desc")}
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full lg:w-3/4 xl:w-2/3	 bg-white rounded-lg"
          >
            <AccordionItem value="item-1" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">{Content("Items.Item1.Title")}</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item1.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">{Content("Items.Item2.Title")}</AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item2.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">
              {Content("Items.Item3.Title")}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item3.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">
              {Content("Items.Item4.Title")}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item4.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">
              {Content("Items.Item5.Title")}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item5.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">
              {Content("Items.Item6.Title")}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item6.Desc")}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="px-5 text-center md:text-start">
              <AccordionTrigger className="text-sm md:text-base">
              {Content("Items.Item7.Title")}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm">
              {Content("Items.Item7.Desc")}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <footer />
    </>
  );
};

export default FAQ;
