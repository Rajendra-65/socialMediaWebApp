"use client"
import { getLogInUser } from '@/service/user/userServiece';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import { toast } from "react-toastify";
import { UserTypes } from '@/types/user';
import { MessageCircleMore } from 'lucide-react';
import { pusherClient } from '@/lib/pusher';

const Navbar = () => {
    
    const [user, setUser] = useState<UserTypes>();
    const [realTimeNotification,setRealTimeNotification] = useState<boolean>(false)
    const pathName = usePathname();
    const router = useRouter()

    const handleLogOut = () => {
        window.localStorage.removeItem('authToken')
        console.log(window.localStorage.getItem('authToken'))
        toast.success("User LoggedOut Successfully",{position:'top-right'})
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
        if(pathName!='log-in'){
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
            {user ? (
                <div className={`top-0 fixed h-[66px] flex justify-between md:hidden w-full bg-zinc-950 ${pathName === "/sign-up" || pathName === "/log-in" ? 'hidden' : ''}`}>
                    <Image
                        src="/assets/images/logo.svg"
                        height={190}
                        width={190}
                        alt="Logo of the snapGram"
                    />
                    <div className='flex gap-2 mr-3'>
                        <Image
                            src="/assets/icons/logout.svg"
                            height={30}
                            width={30}
                            onClick={()=>{handleLogOut()}}
                            alt='Logout Logo'
                        />
                        <Image
                            src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                            height={50}
                            width={50}
                            style={{borderRadius:"50%"}}
                            alt="Profile Image placeholder"
                        />
                        <div className='flex place-content-center mt-[15px]'>
                            <div className='flex'>
                                <MessageCircleMore className='text-purple-600 h-[30px] w-[30px]'/>
                                {user.notification?.length || realTimeNotification ? (<div className="h-2 w-2 rounded-full bg-emerald-600 mt-[10px] ml-[-7px]"/>) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <PageLoader/>
            )}
        </>
    );
};

export default Navbar;
