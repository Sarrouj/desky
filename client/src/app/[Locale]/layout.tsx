import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desky",
  description: "Desky is the game-changing solution designed to propel your business forward by making deals faster and more efficiently than ever.",
  icons : {
    icon : "/logos/DeskyFavicon.png"
  }
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const session = await getServerSession();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={lexendDeca.className}>
      <NextIntlClientProvider messages={messages}>
        <SessionProvider session={session}>
            <main>{children}</main>
        </SessionProvider>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
