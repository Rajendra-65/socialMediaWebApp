import type { Metadata } from "next";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider"


export const metadata: Metadata = {
    title: "Chat | SnapGram",
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
            <div className=' px-5 '>
                {children}
            </div>
        </ThemeProvider>
    );
}
