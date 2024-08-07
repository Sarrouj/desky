import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
  Home,
  AlignJustify,
  User,
  Package2,
  Package,
  LifeBuoy,
  LogIn,
  UserRoundPlus,
  LogOut,
  MessagesSquare,
  Info,
} from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const FirstVueResponsiveMenu = ({ Language }: { Language: any }) => {
  const [LogedOut, setLogedOut] = useState(true);
  const { data: session, status } = useSession();
  const userType: string | null = session ? session.user?.role : null;

  useEffect(() => {
    if (status == "unauthenticated") {
      setLogedOut(false);
    } else if (status == "loading") {
    }
  }, [status, Language]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {status !== "unauthenticated" ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <AlignJustify className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href={`/${Language}/`}
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <p className="text-white">D</p>
              </Link>
              {userType == "depositor" ? (
                <>
                  <Link
                    href={`/${Language}/dashboard-d`}
                    className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary "
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href={`/${Language}/Profile-D`}
                    className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                </>
              ) : userType == "bidder" ? (
                <>
                  <Link
                    href={`/${Language}/Dashboard-B`}
                    className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href={`/${Language}/Profile-B`}
                    className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                </>
              ) : (
                <Link
                  href={`/${Language}/Dashboard-A/Offers-verification`}
                  className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
              )}
              <Link
                href={`/${Language}/`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Package2 className="h-5 w-5" />
                Home
              </Link>
              <Link
                href={`/${Language}/offers`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Package className="h-5 w-5" />
                Offers
              </Link>
              <Link
                href={`/${Language}/About-Us`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Info className="h-5 w-5" />
                About Us
              </Link>
              <Link
                href={`/${Language}/FAQ`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <MessagesSquare className="h-5 w-5" />
                FAQ
              </Link>
              <Link
                href={`/${Language}/Contact-Us`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <LifeBuoy className="h-5 w-5" />
                Support
              </Link>
              <Link
                href="#"
                className="flex items-center  justify-center gap-4 py-1.5 px-3 text-white w-full bg-primary rounded-lg text-sm"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <AlignJustify className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href={`/${Language}/`}
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <p className="text-white">D</p>
              </Link>
              <Link
                href={`/${Language}/`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Package2 className="h-5 w-5" />
                Home
              </Link>
              <Link
                href={`/${Language}/offers`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Package className="h-5 w-5" />
                Offers
              </Link>
              <Link
                href={`/${Language}/About-Us`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <Info className="h-5 w-5" />
                About Us
              </Link>
              <Link
                href={`/${Language}/FAQ`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <MessagesSquare className="h-5 w-5" />
                FAQ
              </Link>
              <Link
                href={`/${Language}/Contact-Us`}
                className="flex items-center gap-4 px-2.5 text-secondaryDarkBlue hover:text-primary"
              >
                <LifeBuoy className="h-5 w-5" />
                Support
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href={`/${Language}/login`}
                  className="flex items-center justify-center gap-4 py-1.5 px-3 text-white w-full bg-primary rounded-lg text-sm"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
                <Link
                  href={`/${Language}/Sign-Up`}
                  className="flex items-center  justify-center gap-4 py-1.5 px-3 text-white w-full bg-primary rounded-lg text-sm"
                >
                  <UserRoundPlus className="h-5 w-5" />
                  Sign Up
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default FirstVueResponsiveMenu;
