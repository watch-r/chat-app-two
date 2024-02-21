import type { Metadata } from "next";
import { Noto_Sans_Cham as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
export const metadata: Metadata = {
    title: "Chat App",
    description: "An WebApplication for chatting with Friends",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
