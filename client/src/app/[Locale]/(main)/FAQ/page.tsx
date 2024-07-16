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
  return (
    <>
      <Header
        NavbarContent={NavbarContent}
        HomePage={"hover:text-primary"}
        Offers={"hover:text-primary"}
        FAQ={"text-primary font-semibold"}
        AboutUS={"hover:text-primary"}
      />
      <main className="bg-neutralBg">
        <div className="flex flex-col gap-10 justify-around items-center p-10">
          <div className="flex flex-col justify-center align-middle gap-2 w-2/3">
            <h1 className="text-4xl font-semibold text-center">
              We Are Here To Answer All Your Questions
            </h1>
            <p className="text-center">
              if you are new to{" "}
              <span className="text-primary text-xl font-bold">DESKY</span> this
              session will help you to learn more about our services
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-1/2 bg-white rounded-lg"
          >
            <AccordionItem value="item-1" className="px-5">
              <AccordionTrigger>What is DESKY ?</AccordionTrigger>
              <AccordionContent>
                Desky is the first platform for private calls for bids
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-5">
              <AccordionTrigger>How to place a bid ?</AccordionTrigger>
              <AccordionContent>
                To place a bid, first go to the offers page, then choose the
                offer that you want to bid on, and click the &apos;Apply
                Now&apos; button.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-5">
              <AccordionTrigger>
                What happens once a bid is accepted?
              </AccordionTrigger>
              <AccordionContent>
                Once the bid is accepted the offer is no longer available for
                bids. then the bidder and the depositor can work together
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="px-5">
              <AccordionTrigger>
                Is there a feedback or rating system for calls and bids?
              </AccordionTrigger>
              <AccordionContent>
                Yes. When the depositor and the bidder finish working together,
                they can rate and review each other.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="px-5">
              <AccordionTrigger>
                How can users track their activity and success rates?
              </AccordionTrigger>
              <AccordionContent>
                Click on the menu bar in the top right corner, then select
                Dashboard. There, you can view all the analytics and activities
                of your account.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="px-5">
              <AccordionTrigger>
                How does the platform verify the identity of users?
              </AccordionTrigger>
              <AccordionContent>
                The platform verifies the identity of users by email and CR for
                companies, or an auto entrepreneur card for individuals.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="px-5">
              <AccordionTrigger>
                How does the platform verify the offers?
              </AccordionTrigger>
              <AccordionContent>
                The platform verify the offers based on the Platform&apos;s
                strict Terms and conditions.{" "}
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
