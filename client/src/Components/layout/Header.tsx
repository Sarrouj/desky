"use client"

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

// Shadcn/UI

import {
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Package2
} from "lucide-react"
 
import { Button } from "@/Components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
} from "@/Components/ui/avatar"

interface Header {
  NavbarContent: any;
}

const Header: React.FC<Header>  = ({NavbarContent}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();

  // Language
  useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
  }, [Language])
  
  // User Data
  const userName : string | null = session ? session.user?.name : null;
  const userType : string | null = session ? session.user?.role : null;

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  const handleLogout = () => {
    signOut(Language);
  };


  return (
    <header className="flex items-center py-3  px-10 justify-between text-secondaryDarkBlue">
      <Link href={`/${Language}/offers`} className="text-2xl font-bold text-primaryOrange">Desky</Link>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href={`/${Language}`} className="text-primaryOrange font-bold">
          {NavbarContent("NavLinks.Home")}
        </Link>
        <Link href={`/${Language}/offers`} className="hover:text-primary ">{NavbarContent("NavLinks.Offers")}</Link>
        <Link href={"/"} className="hover:text-primary ">{NavbarContent("NavLinks.FAQ")}</Link>
        <Link href={`/${Language}/offers`} className="hover:text-primary ">{NavbarContent("NavLinks.AboutUs")}</Link>
      </nav>
      <nav className="flex gap-3 items-center text-sm font-medium">
        {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary ">
                  <Avatar className="w-9 h-9">
                    {/* <AvatarImage src={userImage} alt="@shadcn" /> */}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <h4 className="text-secondaryDarkBlue">{userName}</h4>
                    <p className="text-xs text-primary">{userType} {NavbarContent("User.Account")}</p>
                  </div>
                  <Image src={'/icons/arrow-down.svg'} width={18} height={18} alt="ArrowDown"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{NavbarContent("User.MyAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>{NavbarContent("User.Profil")}</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  {userType == "depositor" ? <Link href={`/${Language}/dashboard-d`}>
                    <DropdownMenuItem>
                        <Package2 className="mr-2 h-4 w-4" />
                        <span>{NavbarContent("User.Dashboard")}</span>
                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link> :  <Link href={`/${Language}/dashboard-b`}>
                    <DropdownMenuItem>
                        <Package2 className="mr-2 h-4 w-4" />
                        <span>{NavbarContent("User.Dashboard")}</span>
                        <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link> }
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>{NavbarContent("User.InviteUsers")}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>{NavbarContent("User.Email")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>{NavbarContent("User.Message")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>{NavbarContent("User.More")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{NavbarContent("User.Settings")}</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>{NavbarContent("User.Support")}</span>
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{NavbarContent("User.LogOut")}</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        
        ) : (
          <>
            <Link href={`/${Language}/login`}>
              <Button className="px-5 bg-white border text-secondaryDarkBlue hover:bg-neutralBg">{NavbarContent("Auth.Login")}</Button>
            </Link>
            <Link href={`/${Language}/Sign-Up`}>
                <Button className="text-white px-5">{NavbarContent("Auth.SignUp")}</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
