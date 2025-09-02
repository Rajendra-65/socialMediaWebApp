"use client"
import { getUserId } from '@/service/token/tokenService'
import React, { useEffect, useState } from 'react'
import { editProfile } from '@/service/user/userServiece'
import mongoose from 'mongoose'
import EditProfile from '@/components/EditProfile'
import { UserEditTypes } from '@/types/user'
import PageLoader from '@/components/SidebarLoader'
import isAuth from '@/components/isAuth'
import useUserActivity from '@/app/hooks/useUserActivity'
import { setUnActive } from '@/service/user/userServiece'
const Page = () => {
    const [user, setUser] = useState<UserEditTypes>()
    const [mounted,setIsMounted] = useState(false)
    const isActive = useUserActivity()
    useEffect(() => {
        if (!isActive) {
          // User is inactive, call setUnActivity function
          setUnActive()
        }
      }, [isActive]); 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = await getUserId()
                const response = await editProfile(userId)
                setUser(response.user)
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser()
    }, [])
    useEffect(()=>{
        setIsMounted(true)
    },[])
    return (
        <>
            {
                user ? (
                    <div className='flex items-center justify-center place-content-center align-middle mt-[80px] md:mt-[0px] mb-[80px] md:mb-0' >
                        <EditProfile
                            user={user}
                        />
                    </div >
                ) : (<PageLoader />)
            }
        </>
    )
}

export default isAuth(Page)