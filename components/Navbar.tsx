"use client"
import { getLogInUser } from '@/service/user/userServiece';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import { toast } from "react-toastify";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const pathName = usePathname();
    const router = useRouter()

    const handleLogOut = () => {
        window.localStorage.removeItem('authToken')
        console.log(window.localStorage.getItem('authToken'))
        toast.success("User LoggedOut Successfully",{position:'top-right'})
        router.push('/log-in')
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
                            src="/assets/icons/profile-placeholder.svg"
                            height={30}
                            width={30}
                            alt="Profile Image placeholder"
                        />
                    </div>
                </div>
            ) : (
                <PageLoader/>
            )}
        </>
    );
};

export default Navbar;
