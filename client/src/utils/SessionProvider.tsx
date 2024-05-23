"use client";
import react from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
