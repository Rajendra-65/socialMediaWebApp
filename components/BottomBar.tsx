"use client";
import { sidebarLinks } from "@/lib/constant";
import { haveChat } from "@/service/chat/chatServices";
import { getLogInUser } from "@/service/user/userServiece";
import { UserTypes } from "@/types/user";
import { pusherClient } from "@/lib/pusher";
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
import React,{useEffect, useState} from "react";

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
        href: "/all-users",
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
    const [messages,setMessages] = useState<boolean>(false)
    const [indicator,setIndicator] = useState<boolean>(true)
    const [user,setUser] = useState<UserTypes>()

    const listItemClick = async (route:string) => {
        if(route === 'Chat'){
            setIndicator(false)
        }
        router.push(route)
    }
    const LiveConversationUpdate = () => {
        setMessages(true)
    }

    useEffect(()=>{
        const fetchChat = async () => {
            try{
                const userResponse = await getLogInUser()
                setUser(userResponse.user)
                const response = await haveChat()
                if(response.chat){
                    setMessages(true)
                }else{
                    setMessages(false)
                }
            }catch(e){
                console.log(e)
            }
        }
        fetchChat()
    },[])

    useEffect(() => {
        const userId: string = `${user?._id}`
        pusherClient.subscribe(userId)
        pusherClient.bind('conversation:update',LiveConversationUpdate)
        return () => {
            if (userId) {
                pusherClient.unsubscribe(userId!)
                pusherClient.unbind('conversation:update', LiveConversationUpdate)
            }
        }
    }, [user])

    return (
        <div className={`md:hidden bottom-0 fixed bg-zinc-950 w-full h-[66px] ${pathName === "/sign-up" || pathName === "/log-in" ? 'hidden':'null'}`}>
            <ul className="flex justify-between px-3 py-3 ">
                {bottombarLinks.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            listItemClick(item.href);
                        }}
                        className={`${pathName === item.href ? 'bg-purple-600 cursor-pointer':'null'}`}
                    >
                        <div className="flex flex-col gap-1 place-content-center align-middle">
                            <div className="flex place-content-center align-middle">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                {item.label === 'Chat' ? (messages && indicator ? <div className="h-2 w-2 rounded-full bg-emerald-600 mt-[10px] ml-[-24px]"/> : null) : null}
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
