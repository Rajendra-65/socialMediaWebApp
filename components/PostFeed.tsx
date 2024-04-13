"use client"
import React, { useState, useEffect } from 'react'
import PostCard from './PostCard'
import { PostTypes } from '@/types/post'
import { UserTypes } from '@/types/user'
import { getFeedPost } from '@/service/post/postService'
import { getLogInUser } from '@/service/user/userServiece'
import PageLoader from './PageLoader'
import { useRouter } from 'next/navigation'

interface PostUserTypes {
    _id: string,
    userName: string;
    profileImage: string;
}

const PostFeed = () => {
    const [isFollowing, setIsFollowing] = useState<boolean>(true)
    const [fetched, setFetched] = useState<boolean>(false)
    const [AllPosts, setAllPosts] = useState<PostTypes[]>([])
    const [postUsers, setPostUsers] = useState<PostUserTypes[]>([])
    const [currentUser, setCurrentUser] = useState<UserTypes>()
    const router = useRouter()
    useEffect(() => {
        const fetchFeedPost = async () => {
            try {
                const response = await getFeedPost()
                if (!response.following) {
                    setIsFollowing(false)
                } else {
                    setAllPosts(response.AllPosts)
                    setPostUsers(response.users)
                }
                const userResponse = await getLogInUser()
                setCurrentUser(userResponse.user)
                setFetched(true)
            } catch (e) {
                console.log(e)
            }
        }
        fetchFeedPost()
    }, [])
    return (
        <div className="mt-[80px] md:mt-5 md:ml-[300px] flex flex-col gap-6">
            {fetched ? (
                !isFollowing ? (
                    <div className="ml-[18px] md:ml-0 w-[95%] border px-5 py-5 place-content-center">
                        You have not followed anyone yet. Go to the{" "}
                        <span
                            className="text-blue-600 underline cursor-pointer"
                            onClick={() => {
                                router.push(`/all-users`);
                            }}
                        >
                            people
                        </span>{" "}
                        page and follow them to see their posts.
                    </div>
                ) : AllPosts.length ? (
                    AllPosts.map((post: PostTypes, index) => (
                        <PostCard
                            key={post && String(post._id)}
                            post={post}
                            user={postUsers[index]!}
                            currentUser={currentUser!}
                        />
                    ))
                ) : (
                    <div className="ml-[18px] md:ml-0 w-[95%] border px-5 py-5 place-content-center">
                        The People You followed are not posting anything Yet the posts are updated Here 
                    </div>
                )
            ) : (
                !fetched && <PageLoader />
            )}
        </div>

    )
}

export default PostFeed
