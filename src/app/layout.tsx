"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { RootLayout } from "@/components/RootLayout";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const navItems = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Study Room", href: "/study-room" },
  { label: "Planner", href: "/planner" },
  { label: "Doubt", href: "/doubt" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Unfiltered CA</title>
        <meta name="description" content="CA Student Study Platform" />
      </head>
      <body className="min-h-screen bg-white">
        <AuthProvider>
          <RootLayout navItems={navItems}>
            {children}
          </RootLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
