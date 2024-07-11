"use client";

import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/Button";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

// Content
import { useTranslations } from "next-intl";

// Components
import BidsList from "@/Components/common/BidsList";
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import Aside from "@/Components/common/Aside";
import BidsListSkeleton from "@/Components/common/BidsListSkeleton";

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

  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  // Data
  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
  const [dBids, setDBids] = useState<any>(null);
  const [dOffers, setDOffers] = useState<any>(null);
  const totalBidsReceived = dOffers ? dOffers.reduce((acc, offer) => acc + offer.offer_apply.length, 0) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (user_id !== null) {
        try {
          const offers = await axios.post(
            "http://localhost:3001/depositor/offers",
            {
              user_id,
            }
          );
          const Bidders: any = {};
          for (const offer of offers.data.success) {
            if (offer.offer_apply.length > 0 && offer.offer_state === "open") {
              const bidderPromises = offer.offer_apply.map((apply: any) =>
                axios.get(`http://localhost:3001/bidder/${apply.bidder_id}`)
              );
              const bidderResponses = await Promise.all(bidderPromises);
              Bidders[offer.offer_title] = bidderResponses.map(
                (response, index) => ({
                  bid_id: offer.offer_apply[index]._id,
                  offerTitle: offer.offer_title,
                  applyDate: offer.offer_apply[index].date,
                  estimate: offer.offer_apply[index].estimate,
                  bidder: response.data.success,
                })
              );
            }
          }
          setDOffers(offers.data.success);
          setDBids(Bidders);
        } catch (error) {
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

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
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb className="hidden md:flex">
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
        <DropDownDepositor content={DropDownMenu} Language={Language} />
      </header>
      <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      {totalBidsReceived !== null ? (
              totalBidsReceived !== 0 ? 
              <BidsList Content={Content} seeMore={true} limit={false} dBids={dBids} /> :
              <NotFoundDataDepositor
                Language={Language}
                Content={notFoundContent}
              />
            ) : (
              <BidsListSkeleton Content={Content} seeMore={true} amount={9} /> 
            )}
      </main>
    </div>
  );
};

export default MyBids;
