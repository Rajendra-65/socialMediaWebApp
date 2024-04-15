"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { UserTypes } from "@/types/user";
import { PostTypes } from "@/types/post";
import { likePost, savePost } from "@/service/post/postService";
import mongoose, { trusted } from "mongoose";
import SubmitButtonLoader from "./SubmitButtonLoader";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AccountPostCard = ({

    post,
    user,

}: {

    post: PostTypes;
    user: UserTypes;

}) => {
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [currentSave, setCurrentSave] = useState<boolean>(false);
    const [reChange, setReChange] = useState<boolean>(false);
    const [currentLike, setCurrentLike] = useState<boolean>(false)
    const [initial, setInitial] = useState<boolean>(true)
    const [likeCount, setLikeCount] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        setInitial(true)
    }, []);

    useEffect(() => {
        const setCurrent = async () => {
            if (user.savedPosts.includes(post._id)) {
                setCurrentSave(true);
            } else {
                setCurrentSave(false);
            }
            setLikeCount(post.like as number)
        };
        setCurrent();
    }, []);

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
        const userId = user._id;
        const response = await likePost(userId, postId);
        setLikeCount(likeCount + 1)
    };

    const handleUnLike = async (postId: mongoose.Types.ObjectId) => {
        setCurrentLike(!currentLike)
        const userId = user._id;
        const response = await likePost(userId, postId);
        setLikeCount(likeCount - 1)
    };

    const handleEditClick = async (postId:any) => {
        router.push(`/edit-post/${postId}`)
    }

    return (
        <div className="flex justify-center place-content-center align-middle">
            <div className="h-[480px] w-[450px] border rounded-md bg-zinc-950">
                <div className="px-3 py-3 flex flex-col">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex">
                                <Image
                                    src={
                                        user.profileImage || "/assets/icons/profile-placeholder.svg"
                                    }
                                    width={60}
                                    height={60}
                                    style={{borderRadius:"50%"}}
                                    alt="profileImage of the User"
                                />
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-base">@{user.userName}</h1>
                                    <div className="flex gap-1">
                                        <h1 className="text-sm">@{user.userName}</h1>
                                        <h1 className="text-sm">{post.location}</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Image
                                    src="/assets/icons/edit.svg"
                                    width={28}
                                    height={28}
                                    className="mr-2 mt-2 cursor-pointer"
                                    alt="Edit Post Image"
                                    onClick= {()=>{
                                        handleEditClick(post._id)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <h1 className="text-base">{post.caption}</h1>
                            <h1 className="text-sm">{post.tags}</h1>
                        </div>
                    </div>
                    <div className="w-[440px] h-[570px]  mt-1">
                        <Image
                            src={post.imageUrl as string}
                            width={420}
                            height={520}
                            style={{ borderRadius: "10px", backgroundSize: "cover" }}
                            alt="postImage"
                        />
                        <div className="flex justify-between mt-2 mr-1 px-1">
                            <div className="flex ">
                                {post.likedBy?.includes(user._id) ? (
                                    currentLike ? (
                                        <Image
                                            src="/assets/icons/like.svg"
                                            width={28}
                                            height={28}
                                            alt="like Image"
                                            onClick={() => {
                                                handleLike(post._id);
                                            }}
                                            className="cursor-pointer"
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
                                            className="cursor-pointer"
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
                                        className="cursor-pointer"
                                    />) : (
                                        <Image
                                            src="/assets/icons/like.svg"
                                            width={28}
                                            height={28}
                                            alt="like Image"
                                            onClick={() => {
                                                handleLike(post._id);
                                            }}
                                            className="cursor-pointer"
                                        />
                                    )
                                )}
                                <h1 className="text-lg ml-1">{likeCount}</h1>
                            </div>
                            <div>
                                {
                                    user.savedPosts.includes(post._id) ? (
                                        currentSave ? saveLoading ? (
                                            <Loader2 className="w-7 h-7 mr-3 mt-2 animate-spin"/>
                                        ) : (<Image
                                            src={"/assets/icons/saved.svg"}
                                            width={28}
                                            height={28}
                                            className="mr-3 cursor-pointer"
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
                                                className="mr-3 cursor-pointer"
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
                                            className="mr-3 cursor-pointer"
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
                                                className="mr-3 cursor-pointer"
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
    );
};

export default AccountPostCard;
