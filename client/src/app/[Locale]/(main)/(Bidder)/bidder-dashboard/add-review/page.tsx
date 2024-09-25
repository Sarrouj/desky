"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import BidderSheet from "@/Components/common/BidderSheet";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import BidderAside from "@/Components/common/BidderAside";
import BidderClosedBidsList from "@/Components/common/BidderClosedBidsList";
import NotFoundDataBidder from "@/Components/common/NotFoundDataBidder";
import AddReviewSkeleton from "@/Components/common/AddReviewSkeleton";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

const AddReview = () => {
  // Content
  const SideBarContent = useTranslations("BidderDashboard.SideBar");
  const BreadcrumbListContent = useTranslations(
    "BidderDashboard.BreadcrumbList"
  );
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");
  const AddReviewContent = useTranslations("BidderDashboard.AddReview");
  const NotFoundContent = useTranslations("BidderDashboard.NotFound");

  // Language
  const [Language, setLanguage] = useState<any>();

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  // Auth
  const { data: session, status } = useSession();
  const user_id = session ? session.user?.id : null;
  const user_role: string | null = session ? session.user?.role : null;

  useEffect(() => {
    if (user_role !== "bidder" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
  }, [user_role, Language]);

  // Data
  const [bids, setBids] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id !== null) {
        const bids = await axios.get(
          `${process.env.NEXT_PUBLIC_BackendURL}/bidder/dashboard/${user_id}`
        );
        setBids(bids.data.success);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-secondaryDarkBlue">
      <BidderAside Language={Language} Content={SideBarContent} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <BidderSheet
            Dashboard={"bidder-dashboard"}
            Profile={"bidder-profile"}
            MyBids={"bidder-dashboard/my-bids"}
            AddReview={"bidder-dashboard/add-review"}
            Reviews={"bidder-reviews"}
            Offers={"offers"}
            Support={"contact-us"}
          />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/bidder-dashboard`}>
                    {BreadcrumbListContent("Dashboard")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/bidder-dashboard/add-review`}>
                    {BreadcrumbListContent("AddReview")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DropDownDepositor
            content={DropDownMenuContent}
            Language={Language}
          />
        </header>
        <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            {bids !== null ? (
              bids.totalBidsAccepted !== 0 ? (
                <BidderClosedBidsList
                  bids={bids.detailedBids}
                  content={AddReviewContent}
                />
              ) : (
                <NotFoundDataBidder
                  Language={Language}
                  content={NotFoundContent}
                />
              )
            ) : (
              <AddReviewSkeleton Content={AddReviewContent} amount={6} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddReview;
// Routing to Lower Case