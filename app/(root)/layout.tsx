import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/lib/auth/Provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Noto_Sans_Cham as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

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
                {children}
            </main>
        </AuthProvider>
    );
}
