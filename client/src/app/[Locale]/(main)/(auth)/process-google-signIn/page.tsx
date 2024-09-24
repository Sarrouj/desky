"use client";

import { useEffect } from "react";
import { Spinner } from "@/Components/ui/spinner";

const ProcessGoogleSignIn = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleEmail = urlParams.get("email");
    const googlePassword = urlParams.get("password");
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value

    if (googleEmail && googlePassword) {
      localStorage.setItem("email", googleEmail);
      localStorage.setItem("password", googlePassword);
      window.location.replace(`/${language}/Sign-Up/choose-type`);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutralBg">
      <Spinner size={"medium"} />
    </div>
  );
};

export default ProcessGoogleSignIn;
