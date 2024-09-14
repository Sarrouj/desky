"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Content
import { useTranslations } from "next-intl";

// Components
import BidsList from "@/Components/common/BidsList";
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import Aside from "@/Components/common/Aside";
import BidsListSkeleton from "@/Components/common/BidsListSkeleton";
import { useBoundStore } from "@/lib/store";
import DepositorSheet from "@/Components/common/DepositorSheet";

const MyBids = () => {
  // Content
  let Content = useTranslations("DepositorDashboard.bidsListAll");
  let notFoundContent = useTranslations("DepositorDashboard.NoAvailableDate");
  let DropDownMenu = useTranslations("DepositorDashboard.DropDownMenu");
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
  const [dBids, setDBids] = useState<any>(null);
  const [dOffers, setDOffers] = useState<any>(null);
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
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <Aside
        Language={Language}
        Dashboard={""}
        CreateOffer={""}
        MyOffers={""}
        ManageBids={"bg-primary text-white hover:text-white"}
        Content={SideBarContent}
      />
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <DepositorSheet
          Dashboard={"dashboard-d"}
          Profile={""}
          ManageBids={"dashboard-d/manage-bids"}
          MyOffers={"dashboard-d/my-offers"}
          Reviews={"dashboard-d/my-reviews"}
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
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/dashboard-d/manage-bids`}>
                  {BreadcrumbListContent("ManageBids")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden sm:block">
          <DropDownDepositor content={DropDownMenu} Language={Language} />
        </div>
      </header>
      <main className="gap-4 p-4 lg:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {totalBidsReceived !== null ? (
          openBids.length !== 0 ? (
            <>
              <div className="flex sm:hidden gap-2 w-full items-end justify-end">
                <Link href={`/${Language}/Create-Offer`}>
                  <Button size={"sm"} className="text-xs text-white">
                    {Content("AddOffer")}
                  </Button>
                </Link>
              </div>
              <BidsList
                Content={Content}
                seeMore={false}
                limit={false}
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
          <BidsListSkeleton Content={Content} amount={9} />
        )}
      </main>
    </div>
  );
};

export default MyBids;
