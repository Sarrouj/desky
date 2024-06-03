"use client"

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CallToAction from "../common/CallToAction";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage isLoggedIn state using useState
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  return (
    <header className="flex items-center py-3 px-10 justify-between text-secondaryDarkBlue">
      <div className="text-2xl font-bold text-primaryOrange">Desky</div>
      <nav className="flex gap-8 text-sm font-medium">
        <Link href={"/"} className="text-primaryOrange font-bold">
          Home
        </Link>
        <Link href={"/"}>FAQ</Link>
        <Link href={"/"}>About Us</Link>
        <Link href={"/offers"}>Offers</Link>
      </nav>
      <nav className="flex gap-5 items-center text-sm font-medium">
        {isLoggedIn ? (
          <Link href={"/profile"}>Profile</Link>
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
