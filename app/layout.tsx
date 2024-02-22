import type { Metadata } from "next";
import { Noto_Sans_Cham as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/lib/auth/Provider";

const fontSans = FontSans({
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
                <AuthProvider>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                    >
                        <main className='container mx-auto'>
                            <NavBar />
                            {children}
                        </main>
                        <Toaster />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
