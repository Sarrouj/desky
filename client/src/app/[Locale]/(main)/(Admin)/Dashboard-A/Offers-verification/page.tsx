"use client";

import Link from "next/link";
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
import AdminAside from "@/Components/common/AdminAside";

// Components
import OffersList from "@/Components/common/OffersList";
import NotFoundDataOffer from "@/Components/common/NotFoundDataOffer";
import DropDownAdmin from "@/Components/common/DropDownAdmin";
import AdminOffersListSkeleton from "@/Components/common/AdminOfferListSkeleton";

// Content
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import axios from "axios";

function OffersVerification() {
  // Content
  let DropDownMenuContent = useTranslations("AdminDashboard.DropDownMenu");
  let NotFoundContent = useTranslations("AdminDashboard.NotFound");
  let BreadcrumbContent = useTranslations("AdminDashboard.Breadcrumb");
  let OffersVerificationSkeleton = useTranslations('AdminDashboard.OffersVerificationSkeleton');
  let OffersVerification = useTranslations("AdminDashboard.OffersVerification");

  // Language
  const [Language, setLanguage] = useState("en");

  // Data
  const { data: session } = useSession();
  const user_id = session ? session.user.id : null;
  const user_role = session ? session.user.role : null;
  const [offers, setOffers] = useState<any>(null);

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, []);

  useEffect(() => {
    if (user_role !== "admin" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/offers");
        const fetchedOffers = [];
        for (const offer of result.data.success) {
          if (offer.offer_state === "pending") {
            const depositor = await axios.get(
              `http://localhost:3001/depositor/${offer.depositor_id}`
            );
            fetchedOffers.push({
              ...offer,
              depositor_name: depositor.data.success.depositor_name,
            });
          }
        }
        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <AdminAside Language={Language}  OffersVerification={"bg-primary text-white"} UsersVerification={"hover:text-secondaryDarkBlue"} />
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
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/Dashboard-A/Offers-verification`}>
                  {BreadcrumbContent('Dashboard')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/Dashboard-A/Offers-verification`}>
                  {BreadcrumbContent('OffersVerification')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden sm:block">
          <DropDownAdmin content={DropDownMenuContent} Language={Language} />
        </div>
      </header>
      <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {offers?.length !== 0 && offers !== null ? (
          <OffersList Content={OffersVerification} offers={offers} user_id={user_id} />
        ) :  offers == null ?
          <AdminOffersListSkeleton Content={OffersVerificationSkeleton}/> :
        (
          <NotFoundDataOffer Content={NotFoundContent} />
        )}
      </main>
    </div>
  );
}

export default OffersVerification;
