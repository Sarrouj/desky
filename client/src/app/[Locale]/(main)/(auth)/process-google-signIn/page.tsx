"use client";

import { useEffect } from "react";


const ProcessGoogleSignIn = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleEmail = urlParams.get("email");
    const googlePassword = urlParams.get("password");
    let lg = JSON.parse(localStorage.getItem("lg"));

    if (googleEmail && googlePassword) {
      localStorage.setItem("email", googleEmail);
      localStorage.setItem("password", googlePassword);
      window.location.replace(`/${lg}/Sign-Up/choose-type`);
    }
  }, []);

  return <div>Processing Google Sign-In...</div>;
};

export default ProcessGoogleSignIn;
