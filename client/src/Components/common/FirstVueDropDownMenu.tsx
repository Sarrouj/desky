import React from "react";

import { LifeBuoy, LogOut, User, Package2 } from "lucide-react";

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

import { Button } from "@/Components/ui/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

// Skeleton
import { Skeleton } from "@/Components/ui/skeleton";
import { CircleCheck } from "lucide-react";

const FirstVueDropDownMenu = ({
  content,
  Language,
}: {
  content: any;
  Language: String | undefined;
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

  // Depositor Switch to French Language
  useEffect(() => {
    if (Language == "fr" && userType == "depositor") {
      setuserTypeSwitch("Déposant");
    } else if (Language == "fr" && userType == "bidder") {
      setuserTypeSwitch("Soumissionnaire");
    } else if (Language == "en" && userType == "bidder") {
      setuserTypeSwitch("Bidder");
    } else if (Language == "en" && userType == "depositor") {
      setuserTypeSwitch("Depositor");
    } else if (Language == "en" && userType == "admin") {
      setuserTypeSwitch("Admin");
    } else if (Language == "fr" && userType == "admin") {
      setuserTypeSwitch("Administrateur");
    }
  }, [Language, userType]);

  useEffect(() => {
    if (status == "unauthenticated") {
      setLogedOut(false);
    }
  }, [status, Language]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {status !== "unauthenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="focus-visible:ring-white focus:ring-white focus:border-white focus-visible:border-white focus:outline-white focus-visible:ring-offset-0"
          >
            <Button className="border-0 flex bg-white items-center gap-2 hover:bg-white hover:text-primary focus-visible:ring-white focus:ring-white focus-visible:ring-offset-0">
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
              <div className="hidden lg:flex flex-col justify-start items-start ">
                {status !== "loading" && userName ? (
                  <>
                    <h4 className="text-secondaryDarkBlue">{userName}</h4>
                    <p className="text-xs text-primary">
                      {userTypeSwitch} {content("User.Account")}
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
                  className="hidden lg:block"
                />
              ) : (
                <Skeleton className="h-4 w-2 rounded-full bg-gray-200 hidden lg:block" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 mr-10 lg:mr-0 lg:w-56">
            <DropdownMenuLabel>{content("User.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userType == "depositor" ? (
                <>
                  <Link href={`/${Language}/Profile-D`}>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>{content("User.Profile")}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/${Language}/dashboard-d`}>
                    <DropdownMenuItem>
                      <Package2 className="mr-2 h-4 w-4" />
                      <span>{content("User.Dashboard")}</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : userType == "bidder" ? (
                <>
                  <Link href={`/${Language}/Profile-B`}>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>{content("User.Profile")}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/${Language}/Dashboard-B`}>
                    <DropdownMenuItem>
                      <Package2 className="mr-2 h-4 w-4" />
                      <span>{content("User.Dashboard")}</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <Link href={`/${Language}/Dashboard-A/Offers-verification`}>
                  <DropdownMenuItem>
                    <Package2 className="mr-2 h-4 w-4" />
                    <span>{content("User.Dashboard")}</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/${Language}/Contact-Us`}>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>{content("User.Support")}</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{content("User.LogOut")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href={`/${Language}/login`}>
            <Button className="px-3 md:px-5 bg-white border text-secondaryDarkBlue hover:bg-neutralBg text-xs lg:text-sm xl:text-md">
              {content("Auth.Login")}
            </Button>
          </Link>
          <Link href={`/${Language}/Sign-Up`}>
            <Button className="text-white px-3 md:px-5 text-xs lg:text-sm xl:text-md">
              {content("Auth.SignUp")}
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default FirstVueDropDownMenu;
