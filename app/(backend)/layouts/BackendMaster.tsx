import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import React from "react";
import BackendClientLayout from "./BackendClientLayout";

const robotoFlex = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-roboto-flex",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SWASTI | Backend Dashboard",
    description: "Dashboard management for SWASTI",
};

export default function BackendLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${robotoFlex.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 font-sans`}
                suppressHydrationWarning
            >
                <BackendClientLayout>
                    {children}
                </BackendClientLayout>
            </body>
        </html>
    );
}
