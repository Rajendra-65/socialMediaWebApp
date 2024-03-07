"use client";
import { sidebarLinks } from "@/lib/constant";
import {
    Bookmark,
    CircleUserRound,
    Home,
    Images,
    Users,
    MessageSquareText,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const bottombarLinks = [
    {
        label: "Home",
        icon: Home,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/",
    },
    {
        label: "Chat",
        icon: MessageSquareText,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/chat",
    },
    {
        label: "people",
        icon: Users,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/explore",
    },
    {
        label: "Saved",
        icon: Bookmark,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/save",
    },
    {
        label: "Create",
        icon: Images,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/create-post",
    },
    {
        label: "Account",
        icon: CircleUserRound,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/account",
    },
];

const BottomBar = () => {
    const router = useRouter();
    const pathName = usePathname()
    return (
        <div className={`md:hidden bottom-0 fixed bg-zinc-950 w-full h-[66px] ${pathName === "/sign-up" || pathName === "/log-in" ? 'hidden':'null'}`}>
            <ul className="flex justify-between px-3 py-3 ">
                {bottombarLinks.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            router.push(`${item.href}`);
                        }}
                        className={`${pathName === item.href ? 'bg-purple-600 cursor-pointer':'null'}`}
                    >
                        <div className="flex flex-col gap-1 place-content-center align-middle">
                            <div className="flex place-content-center align-middle">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BottomBar;
