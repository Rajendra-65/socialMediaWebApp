"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { PostTypes } from '@/types/post'
import { UserTypes } from '@/types/user'
import { formatDistanceToNow } from 'date-fns'
import mongoose, { ObjectId } from 'mongoose'
import { savePost } from '@/service/post/postService'
import { likePost } from '@/service/post/postService'
import { Loader2 } from 'lucide-react'

interface PostUserTypes {
    _id:string,
    userName:string;
    profileImage:string;
}

const PostCard = ({
    post,
    user,
    currentUser
}: {
    post: PostTypes;
    user: PostUserTypes;
    currentUser:UserTypes;
}) => {

    const [mounted, setIsMounted] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [currentSave, setCurrentSave] = useState<boolean>(false);
    const [reChange, setReChange] = useState<boolean>(false);
    const [currentLike, setCurrentLike] = useState<boolean>(false)
    const [initial, setInitial] = useState<boolean>(true)
    const [likeCount, setLikeCount] = useState<number>(0)

    useEffect(() => {
        setIsMounted(true)
        setInitial(true)
    }, [])

    const handleSave = async (Id: mongoose.Types.ObjectId) => {
        try {
            setSaveLoading(true);
            setInitial(!initial)
            const response = await savePost(Id);
            if (response.success) {
                setSaveLoading(false);
                setCurrentSave(!currentSave);
                setReChange(!reChange);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleLike = async (postId: mongoose.Types.ObjectId) => {
        setCurrentLike(!currentLike)
        const userId = currentUser._id;
        const response = await likePost(userId, postId);
        setLikeCount(likeCount + 1)
    };

    const handleUnLike = async (postId: mongoose.Types.ObjectId) => {
        setCurrentLike(!currentLike)
        const userId = currentUser._id;
        const response = await likePost(userId, postId);
        setLikeCount(likeCount - 1)
    };

    useEffect(() => {
        const setCurrent = async () => {
            if (currentUser.savedPosts.includes(post._id)) {
                setCurrentSave(true);
            } else {
                setCurrentSave(false);
            }
            setLikeCount(post.like as number)
        };
        setCurrent();
    }, [])

    return (
        <div className='flex justify-center place-content-center align-middle'>
            <div className='h-[490px] w-[450px] border rounded-md bg-zinc-950'>
                <div className='px-3 py-3 flex flex-col'>
                    <div className='flex'>
                        <Image
                            src={user.profileImage || '/assets/icons/profile-placeholder.svg'}
                            width={45}
                            height={45}
                            alt="profileImage of the User"
                        />
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-base'>{user.userName}</h1>
                            <div className='flex gap-1'>
                                <h1 className='text-sm'>{formatDistanceToNow(post.createdAt,{addSuffix:true})}</h1>
                                <h1 className='text-sm'>. {post.location}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <h1 className='text-base'>{post.caption}</h1>
                        <h1 className='text-sm'>{post.tags}</h1>
                    </div>
                    <div className='w-[440px] h-[450px]  mt-1'>
                        <Image
                            src={post.imageUrl!}
                            width={420}
                            height={520}
                            style={{ borderRadius: "10px", backgroundSize: "cover" }}
                            alt='postImage'
                        />
                        <div className='flex justify-between mt-2 mr-1 px-1'>
                        <div className="flex ">
                                {
                                    post.likedBy?.includes(currentUser._id) ? (
                                        currentLike ? (
                                            <Image
                                                src="/assets/icons/like.svg"
                                                width={28}
                                                height={28}
                                                alt="like Image"
                                                onClick={() => {
                                                    handleLike(post._id);
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src="/assets/icons/liked.svg"
                                                width={28}
                                                height={28}
                                                alt="like Image"
                                                onClick={() => {
                                                    handleUnLike(post._id);
                                                }}
                                            />
                                        )
                                    ) : (
                                        currentLike ? (<Image
                                            src="/assets/icons/liked.svg"
                                            width={28}
                                            height={28}
                                            alt="like Image"
                                            onClick={() => {
                                                handleUnLike(post._id);
                                            }}
                                        />) : (
                                            <Image
                                                src="/assets/icons/like.svg"
                                                width={28}
                                                height={28}
                                                alt="like Image"
                                                onClick={() => {
                                                    handleLike(post._id);
                                                }}
                                            />
                                        )
                                    )
                                }
                                <h1 className="text-lg ml-1">{likeCount}</h1>
                            </div>
                            <div>
                                {
                                    currentUser.savedPosts.includes(post._id) ? (
                                        currentSave ? saveLoading ? (
                                            <Loader2 className="w-7 h-7 mr-3 mt-2 animate-spin"/>
                                        ) : (<Image
                                            src={"/assets/icons/saved.svg"}
                                            width={28}
                                            height={28}
                                            className="mr-3"
                                            alt="Save Image"
                                            onClick={() => {
                                                handleSave(post._id);
                                            }}
                                        />) : (
                                            saveLoading ? (
                                                <Loader2 className="w-7 h-7 mr-3 mt-2 animate-spin"/>
                                            ) : (<Image
                                                src={"/assets/icons/save.svg"}
                                                width={28}
                                                height={28}
                                                className="mr-3"
                                                alt="Save Image"
                                                onClick={() => {
                                                    handleSave(post._id);
                                                }}
                                            />)
                                        )
                                    ) : (
                                        currentSave ? (saveLoading ? (
                                            <Loader2 className="w-7 h-7 mr-3 mt-2 animate-spin"/>
                                        ) : (<Image
                                            src={"/assets/icons/saved.svg"}
                                            width={28}
                                            height={28}
                                            className="mr-3"
                                            alt="Save Image"
                                            onClick={() => {
                                                handleSave(post._id);
                                            }}
                                        />)) : (
                                            saveLoading ? (
                                                <Loader2 className="w-7 h-7 mr-3 mt-2 animate-spin"/>
                                            ) : (<Image
                                                src={"/assets/icons/save.svg"}
                                                width={28}
                                                height={28}
                                                className="mr-3"
                                                alt="Save Image"
                                                onClick={() => {
                                                    handleSave(post._id);
                                                }}
                                            />)
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostCard