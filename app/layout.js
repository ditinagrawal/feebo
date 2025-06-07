import { Kanit } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const kanit = Kanit({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Build what users really want",
  description:
    "Feebo lets you collect feedback from your customers, prioritize features, and build a product users love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kanit.className} antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TanstackProvider>
              <Toaster />
              {children}
            </TanstackProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
