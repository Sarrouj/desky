"use client";

import { useEffect } from "react";
import { Spinner } from "@/Components/ui/spinner";

const ProcessGoogleSignIn = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleEmail = urlParams.get("email");
    const googlePassword = urlParams.get("password");
    let lg = JSON.parse(localStorage.getItem("lg"));

    if (googleEmail && googlePassword) {
      localStorage.setItem("email", googleEmail);
      localStorage.setItem("password", googlePassword);
      window.location.replace(`/${lg}/Sign-Up/Choose-Type`);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen">
      <Spinner size={"large"}/>
      <p className="text-2xl">Processing Google Sign-In...</p>
    </div>
  );
};

export default ProcessGoogleSignIn;
