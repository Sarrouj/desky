"use client";

import Link from "next/link";
import { Blocks, CopyPlus, CircleCheckBig, Star } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";

// Components
import BidsList from "@/Components/common/BidsList";
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import DashboardCard from "@/Components/common/DashboardCard";
import Aside from "@/Components/common/Aside";
import BidsListSkeleton from "@/Components/common/BidsListSkeleton";
import DepositorSheet from "@/Components/common/DepositorSheet";

// Content
import { useTranslations } from "next-intl";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useBoundStore } from "@/lib/store";

const DepositorDashboard = () => {
  // Content
  let Content = useTranslations("DepositorDashboard.bidsList");
  let notFoundContent = useTranslations("DepositorDashboard.NoAvailableDate");
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");
  let StatContent = useTranslations("DepositorDashboard.Statistic");
  let BreadcrumbListContent = useTranslations(
    "DepositorDashboard.BreadcrumbList"
  );
  let SideBarContent = useTranslations("DepositorDashboard.SideBar");

  // Language
  const [Language, setLanguage] = useState("fr");
  const { data: session } = useSession();
  const user_id: any = session ? session.user?.id : null;
  const user_role = session ? session.user?.role : null;

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  useEffect(() => {
    if (user_role !== "depositor" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  // Data
  const [dInfo, setDInfo] = useState<any>(null);
  const [dOffers, setDOffers] = useState<any>(null);
  const [dBids, setDBids] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id !== null) {
        try {
          const [info, offers] = await Promise.all([
            axios.post("https://desky-2.onrender.com/depositor", {
              user_id,
            }),
            axios.post("https://desky-2.onrender.com/depositor/offers", {
              user_id,
            }),
          ]);

          setDInfo(info.data.success);
          setDOffers(offers.data.success);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const totalOffersClosed = dBids ? dBids.totalOffersClosed : null;
  const totalOffersPosted = dBids ? dBids.totalOffersPosted : null;
  const averageRating = dInfo?.depositor_review
    ? (
        dInfo.depositor_review.reduce(
          (acc: any, review: any) => acc + review.rating,
          0
        ) / dInfo.depositor_review.length
      ).toFixed(1)
    : null;

  // Data
  const [openBids, setOpenBids] = useState<any>([]);

  // Global State Manager
  let getDepositorManageBidsID = useBoundStore(
    (state) => state.getDepositorManageBidsID
  );
  let DepositorManageBidsData = useBoundStore(
    (state) => state.DepositorManageBidsData
  );
  let fetchDepositorManageBidsData = useBoundStore(
    (state) => state.fetchDepositorManageBidsData
  );
  let DepositorManageBidsID = useBoundStore(
    (state) => state.DepositorManageBidsID
  );
  let totalBidsReceived = dBids ? dBids.totalBidsReceived : null;

  useEffect(() => {
    getDepositorManageBidsID(user_id);
  }, [user_id]);

  useEffect(() => {
    if (DepositorManageBidsID) {
      fetchDepositorManageBidsData();
    }
  }, [DepositorManageBidsID]);

  useEffect(() => {
    if (DepositorManageBidsData) {
      setDBids(DepositorManageBidsData);
    }
  }, [DepositorManageBidsData]);

  useEffect(() => {
    if (dBids) {
      const OpenBids = dBids.detailedBids.filter(
        (B: any) => B.offer_state == "open"
      );
      setOpenBids(OpenBids);
    }
  }, [dBids]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-secondaryDarkBlue">
      <Aside
        Language={Language}
        Dashboard={"bg-primary text-white hover:text-white"}
        CreateOffer={""}
        MyOffers={""}
        ManageBids={""}
        Content={SideBarContent}
      />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
        <header className="sticky top-0 z-30 flex justify-end sm:justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <DepositorSheet
            Dashboard={"dashboard-d"}
            Profile={"Profile-D"}
            ManageBids={"dashboard-d/manage-bids"}
            MyOffers={"dashboard-d/my-offers"}
            Reviews={"Reviews-D"}
            Offers={"offers"}
            Support={"Contact-Us"}
          />
          <Breadcrumb className="hidden sm:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/dashboard-d`}>
                    {BreadcrumbListContent("Dashboard")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <div className="hidden sm:block">
            <DropDownDepositor
              content={DropDownMenuContent}
              Language={Language}
            />
          </div>
        </header>
        <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-6 xl:gap-8 lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-5 h-30">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 w-full">
                <DashboardCard
                  Logo={Blocks}
                  Content={StatContent("OffersPosted")}
                  Value={totalOffersPosted}
                />
                <DashboardCard
                  Logo={CopyPlus}
                  Content={StatContent("BidsReceived")}
                  Value={totalBidsReceived}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-5 w-full">
                <DashboardCard
                  Logo={CircleCheckBig}
                  Content={StatContent("OffersClosed")}
                  Value={totalOffersClosed}
                />
                <DashboardCard
                  Logo={Star}
                  Content={StatContent("AccountRating")}
                  Value={averageRating !== null ? averageRating : "N/A"}
                />
              </div>
            </div>
            <div className="">
              {totalBidsReceived !== null ? (
                openBids.length !== 0 ? (
                  <>
                    <div className="flex sm:hidden gap-2 w-full items-end justify-end mt-2">
                      <Link href={`/${Language}/Create-Offer`}>
                        <Button size={"sm"} className="text-xs text-white">
                          {Content("AddOffer")}
                        </Button>
                      </Link>
                      <Link href={`/${Language}/dashboard-d/manage-bids`}>
                        <Button size={"sm"} className="text-xs text-white">
                          {Content("SeeMore")}
                        </Button>
                      </Link>
                    </div>
                    <BidsList
                      Content={Content}
                      seeMore={true}
                      limit={true}
                      dBids={dBids.detailedBids}
                    />
                  </>
                ) : (
                  <NotFoundDataDepositor
                    Language={Language}
                    Content={notFoundContent}
                  />
                )
              ) : (
                <BidsListSkeleton Content={Content} seeMore={true} amount={6} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepositorDashboard;
