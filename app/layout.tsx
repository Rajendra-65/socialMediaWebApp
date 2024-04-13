import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import BottomBar from "@/components/BottomBar";
import { ToastContainer } from "../components/NextToast";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LeftSideBar />
          <Navbar />
          <BottomBar />
          <ToastContainer />
          <div className="mt-[68px] md:mt-0 md:ml-[287px] px-5 py-5">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
