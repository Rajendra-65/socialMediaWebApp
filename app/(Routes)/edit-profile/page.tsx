"use client"
import { getUserId } from '@/service/token/tokenService'
import React, { useEffect, useState } from 'react'
import { editProfile } from '@/service/user/userServiece'
import mongoose from 'mongoose'
import EditProfile from '@/components/EditProfile'
import { UserEditTypes } from '@/types/user'
import PageLoader from '@/components/PageLoader'
const page = () => {
    const [user, setUser] = useState<UserEditTypes>()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = await getUserId()
                const response = await editProfile(userId)
                setUser(response.user)
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser()
    }, [])

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

export default page