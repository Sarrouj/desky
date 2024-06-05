"use client"

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import CallToAction from "../common/CallToAction";
import Image from "next/image";

// Shadcn/UI

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
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
  AvatarImage,
} from "@/Components/ui/avatar"


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage isLoggedIn state using useState
  const { data: session, status } = useSession();
  console.log(session)
  // User Data
  const userName = session ? session.user?.name : null;
  const userImage : string | null | undefined= session ? session.user?.image : null ;

  console.log(userName)
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="flex items-center py-3 px-10 justify-between text-secondaryDarkBlue">
      <Link href={"/"} className="text-2xl font-bold text-primaryOrange">Desky</Link>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href={"/"} className="text-primaryOrange font-bold">
          Home
        </Link>
        <Link href={"/"} className="hover:text-primary ">FAQ</Link>
        <Link href={"/"} className="hover:text-primary ">About Us</Link>
        <Link href={"/offers"} className="hover:text-primary ">Offers</Link>
      </nav>
      <nav className="flex gap-5 items-center text-sm font-medium">
        {isLoggedIn ? (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary ">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={userImage} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <h4 className="text-secondaryDarkBlue">{userName}</h4>
                    <p className="text-xs text-primary">Depositor Account</p>
                  </div>
                  <Image src={'/icons/arrow-down.svg'} width={18} height={18} alt="ArrowDown"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <CallToAction href={"/Sign-Up"} value={"Sign Up"} />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
