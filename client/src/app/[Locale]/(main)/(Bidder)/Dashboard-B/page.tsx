"use client";

import {
  Home,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
  Star,
  Blocks,
  CopyPlus,
  CircleCheckBig,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import BidderAside from "@/Components/common/BidderAside";
import DashboardCard from "@/Components/common/DashboardCard";
import BidderBidsList from "@/Components/common/BidderBidsList";
import NotFoundDataBidder from "@/Components/common/NotFoundDataBidder";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

const BidderDashboard = () => {
  // Content
  const SideBarContent = useTranslations("BidderDashboard.SideBar");
  const BreadcrumbListContent = useTranslations(
    "BidderDashboard.BreadcrumbList"
  );
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");
  const StatisticContent = useTranslations("BidderDashboard.Statistic");
  const BidsListContent = useTranslations("BidderDashboard.BidsList");
  const NotFoundContent = useTranslations("BidderDashboard.NotFound");

  // Language
  const [Language, setLanguage] = useState<any>();

  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
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
        const dashboard = await axios.get(
          `http://localhost:3001/bidder/dashboard/${user_id}`
        );
        setBids(dashboard.data.success);
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
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/Dashboard-B`}>
                    {" "}
                    {BreadcrumbListContent("Dashboard")}
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
            <div className="flex items-center gap-5 h-30">
              <DashboardCard
                Logo={Blocks}
                Content={StatisticContent("TotalBids")}
                Value={bids !== null ? bids.totalBids : 0}
              />
              <DashboardCard
                Logo={CopyPlus}
                Content={StatisticContent("WaitingBids")}
                Value={bids !== null ? bids.totalBidsWaiting : 0}
              />
              <DashboardCard
                Logo={CircleCheckBig}
                Content={StatisticContent("AcceptedBids")}
                Value={bids !== null ? bids.totalBidsAccepted : 0}
              />
              <DashboardCard
                Logo={Star}
                Content={StatisticContent("AccountRating")}
                Value={bids !== null ? bids.averageRating : "N/A"}
              />
            </div>

            {bids !== null ? (
              bids.totalBidsWaiting !== 0 ? (
                <BidderBidsList
                  seeMore={true}
                  limit={true}
                  bids={bids.detailedBids}
                  content={BidsListContent}
                />
              ) : (
                <NotFoundDataBidder
                  Language={Language}
                  content={NotFoundContent}
                />
              )
            ) : (
              // <BidsListSkeleton Content={Content} seeMore={true} amount={6} />
              <div>skeleton</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BidderDashboard;
