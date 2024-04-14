"use client"
import { getLogInUser, setUnActive } from '@/service/user/userServiece';
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
    const handleLogOut = async () => {
        window.localStorage.removeItem('authToken')
        toast.success("User LoggedOut Successfully",{position:'top-right'})
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
                <div className={`top-0 fixed h-[66px] flex justify-between md:hidden w-full bg-zinc-950 bg-no-repeat ${pathName === "/sign-up" || pathName === "/log-in" ? 'hidden' : ''}`}>
                    <Image
                        src="/assets/images/logo.svg"
                        height={190}
                        width={190}
                        className='cursor-pointer'
                        alt="Logo of the snapGram"
                        onClick={()=>{router.push(`/`)}}
                    />
                    <div className='flex gap-2 mr-3'>
                        <Image
                            src="/assets/icons/logout.svg"
                            height={30}
                            width={30}
                            className='cursor-pointer'
                            onClick={()=>{handleLogOut()}}
                            alt='Logout Logo'
                        />
                        <Image
                            src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                            height={50}
                            width={50}
                            style={{borderRadius:"50%"}}
                            onClick={()=>{router.push(`/edit-profile/${user._id}`)}}
                            alt="Profile Image placeholder"
                        />
                        <div className='flex place-content-center mt-[15px]'>
                            <div className='flex' onClick={()=>{router.push('/notification')}}>
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
