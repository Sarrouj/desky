import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
  AlignJustify,
  Package2,
  Package,
  LifeBuoy,
  LogIn,
  UserRoundPlus,
  MessagesSquare,
  Info,
} from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/Button";
import { useSession, signOut } from "next-auth/react";

const ResponsiveHomeMenu = ({ Language }: { Language: any }) => {
  const { data: session, status } = useSession();
  const userType: string | null = session ? session.user?.role : null;

  return (
    <>
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
    </>
  );
};

export default ResponsiveHomeMenu;
