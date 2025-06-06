import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { getMessages } from "next-intl/server";

import { NextIntlClientProvider } from "next-intl";
import ThemeProvider from "@/components/theme/theme-provider";
import ReactQueryProvider from "./ReactQueryProvider";
import AuthProvider from "./AuthProvider";
import ScreenQueryInfo from "@/components/screen-query-info";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ReactQueryProvider>
                {children}
                <ScreenQueryInfo
                  size="lg"
                  position={{ x: "left", y: "bottom" }}
                />
              </ReactQueryProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
