"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { UserTypes } from '@/types/user'
import { PostTypes } from '@/types/post'
import { savePost } from '@/service/post/postService'
import mongoose, { trusted } from 'mongoose'
import SubmitButtonLoader from './SubmitButtonLoader'
import { Loader2 } from 'lucide-react'
// import { Image } from 'next/image'

const AccountPostCard = ({ post, user }: { post: PostTypes, user: UserTypes }) => {
    const [mounted, setIsMounted] = useState<boolean>(false)
    const [saveLoading,setSaveLoading] = useState<boolean>(false)
    const [currentSave,setCurrentSave] = useState<boolean>(false)
    const [reChange,setReChange] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(()=>{
        const setCurrent = async () => {
            if(user.savedPosts.includes(post._id)){
                setCurrentSave(true)
            }else{
                setCurrentSave(false)
            }
        }
        setCurrent()
    },[])

    const handleSave = async (Id:mongoose.Types.ObjectId) => {
        try{
            setSaveLoading(true)
            const response = await savePost(Id)
            console.log(response.user)
            if(response.success){
                setSaveLoading(false)
                setCurrentSave(!currentSave)
                setReChange(!reChange)
            }
        }catch(e){
            console.log(e)
        }    
    }

    return (
        <div className='flex justify-center place-content-center align-middle'>
            <div className='h-[450px] w-[450px] border rounded-md bg-zinc-950'>
                <div className='px-3 py-3 flex flex-col'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <Image
                                    src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                                    width={45}
                                    height={45}
                                    alt="profileImage of the User"
                                />
                                <div className='flex flex-col gap-1'>
                                    <h1 className='text-base'>@{user.userName}</h1>
                                    <div className='flex gap-1'>
                                        <h1 className='text-sm'>@{user.userName}</h1>
                                        <h1 className='text-sm'>{post.location}</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Image
                                    src="/assets/icons/edit.svg"
                                    width={28}
                                    height={28}
                                    className='mr-2 mt-2'
                                    alt="Edit Post Image"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <h1 className='text-base'>{post.caption}</h1>
                            <h1 className='text-sm'>{post.tags}</h1>
                        </div>
                    </div>
                    <div className='w-[440px] h-[550px]  mt-1'>
                        <Image
                            src={post.imageUrl as string}
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
                                {
                                    saveLoading ? (<Loader2 className = 'w-7 h-7 mr-3 mt-2 animate-spin'/>) : (user.savedPosts.includes(post._id) || currentSave ? (
                                        reChange ? (
                                            <Image
                                                src={"/assets/icons/save.svg"}
                                                width={28}
                                                height={28}
                                                className='mr-3'
                                                alt='Save Image'
                                                onClick={() => {handleSave(post._id)}}
                                            />
                                        ) : (
                                            <Image
                                            src={"/assets/icons/saved.svg"}
                                            width={28}
                                            height={28}
                                            className='mr-3'
                                            alt='Save Image'
                                            onClick={() => {handleSave(post._id)}}
                                        />
                                        )
                                    ) : (
                                        user.savedPosts.includes(post._id) ? (
                                            <Image
                                                src={"/assets/icons/saved.svg"}
                                                width={28}
                                                height={28}
                                                className='mr-3'
                                                alt='Save Image'
                                                onClick={() => {handleSave(post._id)}}
                                            />
                                        ) : (
                                            <Image
                                                src={"/assets/icons/save.svg"}
                                                width={28}
                                                height={28}
                                                className='mr-3'
                                                alt='Save Image'
                                                onClick={() => {handleSave(post._id)}}
                                            />
                                        )
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPostCard