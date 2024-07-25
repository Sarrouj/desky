"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
  StarIcon,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import Aside from "@/Components/common/Aside";
import { useBoundStore } from "@/lib/store";
import { Skeleton } from "@/Components/ui/skeleton";

const DepositorReviews = () => {
  const reviewsContent = useTranslations("DepositorDashboard.reviews");
  const DropDownMenu = useTranslations("DepositorDashboard.DropDownMenu");
  const BreadcrumbListContent = useTranslations(
    "DepositorDashboard.BreadcrumbList"
  );
  const SideBarContent = useTranslations("DepositorDashboard.SideBar");

  const [Language, setLanguage] = useState("fr");
  const { data: session } = useSession();
  const user_id: any = session ? session.user?.id : null;
  const user_role = session ? session.user?.role : null;

  const userName: string | null = session ? session.user?.name : null;
  const LetterFullName = userName
    ?.split(" ")
    .map((n: any) => n[0].toUpperCase())
    .join("");

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      return interval === 1
        ? `${reviewsContent("date.yearAgo")}`
        : `${interval} ${reviewsContent("date.yearsAgo")}`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1
        ? `${reviewsContent("date.monthAgo")}`
        : `${interval} ${reviewsContent("date.monthsAgo")}`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1
        ? `${reviewsContent("date.dayAgo")}`
        : `${interval} ${reviewsContent("date.daysAgo")}`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1
        ? `${reviewsContent("date.hourAgo")}`
        : `${interval} ${reviewsContent("date.hoursAgo")}`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1
        ? `${reviewsContent("date.minuteAgo")}`
        : `${interval} ${reviewsContent("date.minutesAgo")}`;
    }
    return `${reviewsContent("date.justNow")}`;
  };

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, []);

  useEffect(() => {
    if (user_role !== "depositor" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
  }, [user_role]);

  const getDepositorID = useBoundStore((state) => state.getDepositorID);
  const fetchDepositorReview = useBoundStore(
    (state) => state.fetchDepositorReview
  );
  const DepositorReview = useBoundStore((state) => state.DepositorReview);

  useEffect(() => {
    if (user_id) {
      getDepositorID(user_id);
      fetchDepositorReview();
    }
  }, [user_id]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg min-h-screen">
      <Aside
        Language={Language}
        Dashboard=""
        CreateOffer=""
        MyOffers=""
        ManageBids=""
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
                <Link href={`/${Language}/Reviews-D`}>
                  {BreadcrumbListContent("Reviews")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden sm:block">
          <DropDownDepositor content={DropDownMenu} Language={Language} />
        </div>
      </header>
      {DepositorReview?.length !== 0 ? (
        <main className="flex-1 py-6 px-6 md:px-12 lg:px-24">
          <section className="mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-secondaryDarkBlue">
              {reviewsContent("title")}
            </h2>
            <div className="grid gap-4 lg:gap-6 xl:gap-8">
              {!DepositorReview ? (
                <>
                  <Skeleton className="h-36 w-full bg-gray-200" />
                  <Skeleton className="h-36 w-full bg-gray-200" />
                  <Skeleton className="h-36 w-full bg-gray-200" />
                </>
              ) : (
                DepositorReview?.map((review: any, i: any) => (
                  <div key={i} className="bg-card p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage />
                          <AvatarFallback className="text-primary">
                            {review.bidder_name
                              .split(" ")
                              .map((n: any) => n[0].toUpperCase())
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-secondaryDarkBlue">
                            {review.bidder_name
                              .split(" ")
                              .map(
                                (word: any) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </h3>
                          {review.reviews.map((rev: any, i: any) => (
                            <time
                              key={i}
                              className="text-xs md:text-sm text-muted-foreground"
                            >
                              {formattedDate(String(rev.date))}
                            </time>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {review.reviews.map((rev: any, reviewIndex: any) => (
                          <React.Fragment key={reviewIndex}>
                            {[...Array(rev.rating)].map((_, index) => (
                              <StarIcon
                                key={index}
                                className="w-3 h-3 md:w-4 md:h-4 fill-primary stroke-primary"
                              />
                            ))}
                            {[...Array(5 - rev.rating)].map((_, index) => (
                              <StarIcon
                                key={`empty-${index}`}
                                className="w-3 h-3 md:w-4 md:h-4 fill-white stroke-primary"
                              />
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm leading-loose">
                      <h2 className="font-semibold text-sm md:text-base lg:text-xl text-secondaryDarkBlue">
                        {review.offer_title}
                      </h2>
                      {review.reviews.map((rev: any, i: any) => (
                        <p
                          key={i}
                          className="text-muted-foreground text-xs sm:text-sm lg:text-base"
                        >
                          {rev.text}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      ) : (
        <div className="container mx-auto px-4 py-36 text-center md:pr-5 lg:pr-10 xl:pr-20">
          <h2 className="text-2xl font-bold mb-1 text-secondaryDarkBlue">
            {reviewsContent("NoAvailable")}
          </h2>
          <p className="text-gray-600 ">{reviewsContent("NoAvailableDesc")}</p>
          <div className="flex gap-2 items-center justify-center mt-8 ">
            <Link href={`/${Language}/Create-Offer`}>
              <Button className="text-white">
                {reviewsContent("CallToAction")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositorReviews;
