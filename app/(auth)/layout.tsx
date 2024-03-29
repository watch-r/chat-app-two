import "@/app/globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans_Cham as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
export const metadata: Metadata = {
    title: "Authentication page",
    description: "Sign In or Sign Up to get Started",
};

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main
            className={cn(
                "min-h-screen bg-background font-sans antialiased h-screen flex items-center justify-center p-10",
                fontSans.variable
            )}
        >
            <div className=' text-white flex items-center justify-center flex-col rounded-md'>
                {children}
                <p className='mt-4 text-xs dark:text-slate-200 text-slate-600'>
                    @2024 All rights reserved
                </p>
            </div>
        </main>
    );
}
