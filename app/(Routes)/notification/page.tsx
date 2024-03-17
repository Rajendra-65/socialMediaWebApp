"use client"
import { BadgeAlert } from 'lucide-react'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getNotification, seenNotification } from '@/service/notification/notificationService'
import { useState } from 'react'
import PageLoader from '@/components/PageLoader'
import { useRouter } from 'next/navigation'
import { makeFollow } from '@/service/user/userServiece'

const page = () => {

    const [fetched, setFetched] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [notificationDp, setNotificationDp] = useState([])
    const [userNotificationIds, setUserNotificationIds] = useState([])
    const [isNotification , setIsNotification ] = useState(false)
    const [isFollowed,setIsFollowed] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const getUserNotification = async () => {
            try {
                const response = await getNotification()
                console.log(response)
                setNotifications(response.notifications)
                setNotificationDp(response.notificationDp)
                setUserNotificationIds(response.userNotificationId)
                if(response.message){
                    setIsNotification(true)
                }
                setFetched(true)
            } catch (e) {
                console.log(e)
            }
        }
        getUserNotification()
        
        return () => {
            seenNotification()
        }

    }, [router])

    const handleButtonClick = async (userId:string) => {
        console.log(userId)
        setIsFollowed(true)
        await makeFollow(userId)
    }

    return (
        fetched ? (
            <div className='flex place-content-center justify-center align-middle'>
                <div className='flex flex-col mt-2 w-full h-fit-content px-10 border'>
                    <div className='flex place-content-center mt-2'>
                        <div className="justify-center w-[150px] bg-yellow-600 border rounded-md flex gap-2 px-3 py-2 place-content-center">
                            <BadgeAlert className='w-8 h-8 text-white mt-1' />
                            <h1 className='mt-1'>Attention</h1>
                        </div>
                    </div>
                    <div className='px-2 py-4 border mt-2'>
                        <div className='flex px-5 py-5 place-content-center mt-4'>
                            <div className='flex w-full place-content-center h-fit-content gap-5 m-auto border border-b-2 border-r-2 border-b-white border-r-white lg:w-[50%] px-5 py-5 overflow-y-auto flex-col'>
                                {
                                    isNotification  ? (notifications.map((notification, index) => (
                                        <div className='flex place-content-center gap-2'>
                                            <Image
                                                src={notificationDp[index] || "/assets/icons/profile-placeholder.svg"}
                                                width={45}
                                                height={45}
                                                style={{ borderRadius: "50%" }}
                                                alt="profilePlaceholder"
                                            />
                                            <h1 className='font-semibold mt-2'>{notification}</h1>
                                            <Button className='mt-2 sm:mt-0' onClick={() => {handleButtonClick(userNotificationIds[index])}}>{isFollowed ? "Following" : "Follow"}</Button>
                                        </div>
                                    ))) : (<div className='border px-2 py-2 place-content-center'>
                                        <h1 className='m-auto'>No New Message Yet Message Will be Notified Here</h1>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className='pb-12' />
                </div>
            </div>
        ) : (
            <PageLoader />
        )
    );
}

export default page