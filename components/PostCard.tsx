"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const PostCard = () => {

    const [mounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className='flex justify-center place-content-center align-middle'>
            <div className='h-[450px] w-[450px] border rounded-md bg-zinc-950'>
                <div className='px-3 py-3 flex flex-col'>
                    <div className='flex'>
                        <Image
                            src="/assets/icons/profile-placeholder.svg"
                            width={45}
                            height={45}
                            alt="profileImage of the User"
                        />
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-base'>UserName</h1>
                            <div className='flex gap-1'>
                                <h1 className='text-sm'>8 hours ago</h1>
                                <h1 className='text-sm'>. Odisha</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <h1 className='text-base'>Here is the captions</h1>
                        <h1 className='text-sm'>Here is the hashtags</h1>
                    </div>
                    <div className='w-[440px] h-[550px]  mt-1'>
                        <Image
                            src="/assets/images/mountain.jpg"
                            width={420}
                            height={520}
                            style={{ borderRadius: "10px", backgroundSize: "cover" }}
                            alt='postImage'
                        />
                        <div className='flex justify-between mt-2 mr-1 px-1'>
                            <div className='flex '>
                                <Image
                                    src="/assets/icons/like.svg"
                                    width={28}
                                    height={28}
                                    alt='like Image'
                                />
                                <h1 className='text-lg ml-1'>0</h1>
                            </div>
                            <div>
                                <Image
                                    src="/assets/icons/save.svg"
                                    width={28}
                                    height={28}
                                    className='mr-3'
                                    alt='Save Image'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostCard