import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

import {
  Package,
  User,
  GanttChart,
  LifeBuoy,
  LogOut,
  Menu
} from "lucide-react";

const AdminSheet = () => {
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
      <SheetContent side="left" className="sm:max-w-xs">
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
            href={`/${Language}/Dashboard-A/Offers-verification/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <GanttChart className="h-5 w-5" />
            New Offers
          </Link>
          <Link
            href={`/${Language}/Dashboard-A/Users-verification/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <User className="h-5 w-5" />
            New Users
          </Link>
          <Link
            href={`/${Language}/offers/`}
            className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
          >
            <Package className="h-5 w-5" />
            {Content("Offers")}
          </Link>
          <Link
            href={`/${Language}/Contact-Us/`}
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

export default AdminSheet;
