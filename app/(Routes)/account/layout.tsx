import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Account | SnapGram",
    description: "team-snapGram",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
        >
            <div className='px-5 py-5'>
                {children}
            </div>
        </ThemeProvider>
    );
}
