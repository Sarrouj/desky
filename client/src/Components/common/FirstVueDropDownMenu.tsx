import React from "react";

import { Settings, LifeBuoy, LogOut, User, Package2 } from "lucide-react";

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
    } else if (status == "loading") {
    }
  }, [status, Language]);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    console.log(userType);
  }, [userType]);
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
              <div className="flex flex-col justify-start items-start">
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
                />
              ) : (
                <Skeleton className="h-4 w-2 rounded-full bg-gray-200" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{content("User.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{content("User.Profile")}</span>
              </DropdownMenuItem>
              {userType == "depositor" ? (
                <Link href={`/${Language}/dashboard-d`}>
                  <DropdownMenuItem>
                    <Package2 className="mr-2 h-4 w-4" />
                    <span>{content("User.Dashboard")}</span>
                  </DropdownMenuItem>
                </Link>
              ) : userType == "bidder" ? (
                <Link href={`/${Language}/Dashboard-B`}>
                  <DropdownMenuItem>
                    <Package2 className="mr-2 h-4 w-4" />
                    <span>{content("User.Dashboard")}</span>
                  </DropdownMenuItem>
                </Link>
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{content("User.Settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>{content("User.Support")}</span>
              </DropdownMenuItem>
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
            <Button className="px-5 bg-white border text-secondaryDarkBlue hover:bg-neutralBg">
              {content("Auth.Login")}
            </Button>
          </Link>
          <Link href={`/${Language}/Sign-Up`}>
            <Button className="text-white px-5">
              {content("Auth.SignUp")}
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default FirstVueDropDownMenu;
