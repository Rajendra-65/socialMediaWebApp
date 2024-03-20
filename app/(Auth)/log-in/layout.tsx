import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Log-in | SnapGram",
    description: "team-snapGram",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='mt-[68px] md:mt-0 md:ml-[287px] px-5 py-5'>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                    >
                        {children}
                    </ThemeProvider>
                </div>
            </body>
        </html>
    );
}
