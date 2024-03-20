"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    Bookmark,
    CircleUserRound,
    Home,
    Images,
    MessageSquareText,
    Users,
    Wallpaper,
} from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import { getLogInUser } from '@/service/user/userServiece';
import { toast } from 'react-toastify';
import PageLoader from './PageLoader';
import { UserTypes } from '@/types/user';
import { MessageCircleMore } from 'lucide-react';
import { pusherClient } from '@/lib/pusher';

const leftSideBarLinks = [
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

const LeftSideBar = () => {
    
    const pathName = usePathname()
    const router = useRouter()
    const [user, setUser] = useState<UserTypes>()
    const [realTimeNotification,setRealTimeNotification] = useState<boolean>(false)

    const handleLogOut = () => {
        window.localStorage.removeItem('authToken')
        console.log(window.localStorage.getItem('authToken'))
        toast.success("User LoggedOut Successfully", { position: 'top-right' })
        router.push('/log-in')
    }

    const NotificationHandler = () => {
        setRealTimeNotification(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getLogInUser();
                console.log(userData);
                setUser(userData.user);
            } catch (error) {
                console.log(error);
            }
        };
        if (pathName != 'log-in') {
            fetchData();
        }
    }, []);

    useEffect(()=>{
        const userId:string = `${user?._id}`
        pusherClient.subscribe(userId)
        pusherClient.bind('notification:new',NotificationHandler)
    },[user])

    return (
        <>
            {
                user ? (<div className={`hidden md:block flex flex-col mb-2 bg-zinc-950 left-0 fixed top-0 w-[285px] h-full px-3 ${pathName === "/sign-up" || pathName === "/log-in" ? 'md:hidden' : 'md:block'}`}>
                    <Image
                        src="/assets/images/logo.svg"
                        width={200}
                        height={200}
                        className='mt-2 mb-3'
                        alt="Logo of the snapGram"
                    />
                    <div className="flex gap-2 mb-5">
                        <Image
                            src="/assets/icons/profile-placeholder.svg"
                            width={38}
                            height={38}
                            alt="Image of the user"
                        />
                        <div className=" flex flex-col">
                            <h1 className="text-base mb-1">@{user.userName}</h1>
                            <h1 className="text-xs">@{user.userName}</h1>
                        </div>
                    </div>
                    <ul className='flex flex-col gap-8 ml-2'>
                        {
                            leftSideBarLinks.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        router.push(`${item.href}`);
                                    }}
                                    className={`cursor-pointer ${pathName === item.href ? 'bg-purple-600 border  rounded-md' : 'null'}`}
                                >
                                    <div className="flex gap-4 h-8 mt-1">
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                        {item.label}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="fixed bottom-12 flex gap-2 ml-2" onClick={() => { handleLogOut() }}>
                        <Image
                            src="/assets/icons/logout.svg"
                            width={22}
                            height={22}
                            alt="Logout Svg"
                        />
                        <h1 className="ml-[10px]">Logout</h1>
                    </div>
                    <div 
                        className='fixed bottom-2 flex gap-2 ml-2' 
                        onClick={()=>{router.push(`/edit-profile/${user._id}`)}}
                    >
                        <MessageCircleMore className='text-purple-600 h-[30px] w-[30px]'/>
                        {user?.notification?.length ? (<div className="h-2 w-2 rounded-full bg-emerald-600 mt-[10px] ml-[-24px]"/>) : (null)}
                        <h1 className={`${user?.notification?.length ? "ml-[10px]" : "ml-0" }`}>Notification</h1>
                    </div>
                </div>) : (<PageLoader />)
            }
        </>
    )
}

export default LeftSideBar