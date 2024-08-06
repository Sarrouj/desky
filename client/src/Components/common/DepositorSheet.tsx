import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import {
  Home,
  Package,
  User,
  GanttChart,
  LayoutList,
  CircleCheck,
  LifeBuoy,
  LogOut,
  Menu
} from "lucide-react";

const DepositorSheet = ({
  Dashboard,
  Profile,
  ManageBids,
  MyOffers,
  Reviews,
  Offers,
  Support
}: {
  Dashboard: string;
  Profile: string;
  ManageBids: string;
  MyOffers: string;
  Reviews: string;
  Offers: string;
  Support: string;
}) => {
  const [Language, setLanguage] = useState("fr");
  const [LogedOut, setLogedOut] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") {
      setLogedOut(false);
      window.location.href = `/${Language}/`;
    } else if (status == "loading") {
    }
  }, [status, Language]);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, []);

  const Content = useTranslations("DepositorDashboard.ResponsiveMenuBar");

  return (
    <Sheet>
      <SheetTrigger asChild className="my-5">
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href={`/${Language}/`}
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <div className="text-white transition-all group-hover:scale-110">
              D
            </div>
          </Link>
          <Link
            href={`/${Language}/${Dashboard}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <Home className="h-5 w-5" />
            {Content("Dashboard")}
          </Link>
          <Link
            href={`/${Language}/${Profile}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <User className="h-5 w-5" />
            {Content("Profile")}
          </Link>
          <Link
            href={`/${Language}/${ManageBids}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <GanttChart className="h-5 w-5" />
            {Content("ManageBids")}
          </Link>
          <Link
            href={`/${Language}/${MyOffers}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <LayoutList className="h-5 w-5" />
            {Content("MyOffers")}
          </Link>
          <Link
            href={`/${Language}/${Reviews}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <CircleCheck className="h-5 w-5" />
            {Content("Reviews")}
          </Link>
          <Link
            href={`/${Language}/${Offers}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <Package className="h-5 w-5" />
            {Content("Offers")}
          </Link>
          <Link
            href={`/${Language}/${Support}/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <LifeBuoy className="h-5 w-5" />
            {Content("Support")}
          </Link>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-4 px-2.5 text-white mt-8"
          >
            <LogOut className="h-5 w-5" />
            {Content("LogOut")}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default DepositorSheet;
