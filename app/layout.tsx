import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";

import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/server/client";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Collect feedbacks with ease",
  description:
    "With feebo, you can collect feedbacks from your users with ease. Plug and play in your website.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${ebGaramond.variable} ${inter.className} antialiased`}
        >
          <NextTopLoader color="#d97757" />
          <Toaster />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
