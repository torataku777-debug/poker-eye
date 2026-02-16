import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poker Eye",
  description: "Global Poker Tournament Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CurrencyProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 140px)', paddingBottom: '20px' }}>
            {children}
          </main>
          <BottomNavigation />
        </CurrencyProvider>
      </body>
    </html>
  );
}
