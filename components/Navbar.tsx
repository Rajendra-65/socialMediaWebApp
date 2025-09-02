"use client"
import { getLogInUser, setUnActive } from '@/service/user/userServiece';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageLoader from './SidebarLoader';
import { toast } from "react-toastify";
import { UserTypes } from '@/types/user';
import { MessageCircleMore } from 'lucide-react';
import { pusherClient } from '@/lib/pusher';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Navbar = () => {

    const [user, setUser] = useState<UserTypes>();
    const [realTimeNotification, setRealTimeNotification] = useState<boolean>(false)
    const pathName = usePathname();
    const router = useRouter()
    const handleLogOut = async () => {
        window.localStorage.removeItem('authToken')
        toast.success("User LoggedOut Successfully", { position: 'top-right' })
        await setUnActive()
        router.push(`/log-in`)
    }

    const NotificationHandler = () => {
        setRealTimeNotification(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getLogInUser();
                setUser(userData.user);
            } catch (error) {
                console.log(error);
            }
        };
        if (pathName != 'log-in') {
            fetchData();
        }
    }, []);

    useEffect(() => {
        const userId: string = `${user?._id}`
        pusherClient.subscribe(userId)
        pusherClient.bind('notification:new', NotificationHandler)
    }, [user])

    return (
        <>
            {user ? (
                <div className={`top-0 fixed h-[66px] flex justify-between md:hidden w-full bg-zinc-950 bg-no-repeat ${pathName === "/sign-up" || pathName === "/log-in" || pathName === '/change-password' ? 'hidden' : ''}`}>
                    <Image
                        src="/assets/images/logo.svg"
                        height={190}
                        width={190}
                        className='cursor-pointer'
                        alt="Logo of the snapGram"
                        onClick={() => { router.push(`/`) }}
                    />
                    <div className='flex gap-2 mr-3'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Image
                                        src="/assets/icons/logout.svg"
                                        height={30}
                                        width={30}
                                        className='cursor-pointer'
                                        onClick={() => { handleLogOut() }}
                                        alt='Logout Logo'
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="start">
                                    <p className='p-1'>LogOut</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Image
                                        src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                                        height={50}
                                        width={50}
                                        style={{ borderRadius: "50%" }}
                                        onClick={() => { router.push(`/edit-profile`) }}
                                        alt="Profile Image placeholder"
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="start">
                                    <p className='p-1'>Edit-profile</p>
                                    <p className='p-1'>@{user.userName}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className='flex place-content-center mt-[15px]'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className='flex' onClick={() => { router.push('/notification') }}>
                                            <MessageCircleMore className='text-purple-600 h-[30px] w-[30px]' />
                                            {user.notification?.length || realTimeNotification ? (<div className="h-2 w-2 rounded-full bg-emerald-600 mt-[10px] ml-[-7px]" />) : (null)}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side='bottom' align='start'>
                                        <p className='p-1'>Notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            ) : (
                <PageLoader />
            )}
        </>
    );
};

export default Navbar;
