import "@/app/globals.css";
import NavBar from "@/components/nav/NavBar";
import AuthProvider from "@/lib/auth/Provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans_Cham as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";
import LeftSideBar from "./_components/LeftSideBar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
export const metadata: Metadata = {
    title: "Chat App",
    description: "An WebApplication for chatting with Friends",
};

export default function Layout({ children }: PropsWithChildren) {
    return (
        <AuthProvider>
            <main
                className={cn(
                    "min-h-screen bg-background font-sans antialiased container mx-auto",
                    fontSans.variable
                )}
            >
                <NavBar />
                <div className='flex flex-row'>
                    <div className='w-1/3 max-lg:w-1/2 max-md:w-full'>
                        <LeftSideBar />
                    </div>
                    <div className='w-2/3 max-lg:w-1/2 max-md:hidden'>
                        {children}
                    </div>
                </div>
            </main>
        </AuthProvider>
    );
}
