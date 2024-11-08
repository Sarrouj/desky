import React from "react";

import {
  LifeBuoy,
  LogOut,
  Package,
  Package2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/Components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

import { Button } from "@/Components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// Skeleton
import { Skeleton } from "@/Components/ui/skeleton";

const DropDownAdmin = ({
  content,
  Language,
}: {
  content: any;
  Language: any;
}) => {
  const [LogedOut, setLogedOut] = useState(true);
  const { data: session, status } = useSession();
  let [userTypeSwitch, setuserTypeSwitch] = useState<string>("");

  const userName: string | null = session ? session.user?.name : null;
  const userType: string | null = session ? session.user?.role : null;
  const LetterFullName = userName
    ?.split(" ")
    .map((n: any) => n[0].toUpperCase())
    .join("");

  // Admin Switch to French Language
  useEffect(() => {
    if (Language == "fr" && userType == "admin") {
      setuserTypeSwitch("Administrateur");
    } else if (Language == "en" && userType == "admin") {
      setuserTypeSwitch("Admin");
    }
  }, [Language, userType]);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-neutralBg focus:ring-neutralBg focus:border-neutralBg focus-visible:border-neutralBg focus:outline-neutralBg focus-visible:ring-offset-0 "
      >
        <Button className="border-0 flex bg-neutralBg items-center gap-2 hover:bg-neutralBg hover:text-primary focus-visible:ring-neutralBg focus:ring-neutralBg focus-visible:ring-offset-0">
          {status !== "loading" && LetterFullName !== "" ? (
            <>
              <Avatar className="w-9 h-9 border">
                <AvatarImage src={"/"} alt="@shadcn" />
                <AvatarFallback>{LetterFullName}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Skeleton className="w-9 h-9 rounded-full bg-gray-200" />
          )}
          <div className="flex flex-col justify-start items-start">
            {status !== "loading" && userName ? (
              <>
                <h4 className="text-secondaryDarkBlue">{userName}</h4>
                <p className="text-xs text-primary">
                  {userTypeSwitch} {content("Account")}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="h-2 w-28 bg-gray-200" />
                <Skeleton className="h-2 w-24 bg-gray-200 mt-1" />
              </>
            )}
          </div>
          {status !== "loading" && userName ? (
            <Image
              src={"/icons/arrow-down.svg"}
              width={18}
              height={18}
              alt="ArrowDown"
            />
          ) : (
            <Skeleton className="h-4 w-2 rounded-full bg-gray-200" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{content("title")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${Language}`}>
            <DropdownMenuItem>
              <Package2 className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/${Language}/offers`}>
            <DropdownMenuItem>
              <Package className="mr-2 h-4 w-4" />
              <span>{content("Marketplace")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${Language}/contact-us`}>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>{content("Support")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{content("LogOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownAdmin;
