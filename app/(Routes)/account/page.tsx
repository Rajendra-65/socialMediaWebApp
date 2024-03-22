"use client";
import AccountPostCard from "@/components/AccountPostCard";
import React, { useEffect, useState } from "react";
import { UserTypes } from "../../../types/user";
import { PostTypes } from "../../../types/post";
import { getLogInUser } from "@/service/user/userServiece";
import { getPost } from "@/service/post/postService";
import PageLoader from "@/components/PageLoader";
import FetchFailed from "@/components/FetchFailed";
import isAuth from "@/components/isAuth";
import { useRouter } from "next/navigation";

const page = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [user, setUser] = useState<UserTypes | null>();
  const [posts, setPosts] = useState<PostTypes[]>();
  const [fetched, setFetched] = useState<boolean>(false);
  const router = useRouter()
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchUserAndPost = async () => {
      try {
        const userResponse = await getLogInUser();
        console.log(userResponse.user);
        setUser(userResponse.user);
        const postResponse = await getPost();
        setPosts(postResponse.post);
        setFetched(true);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserAndPost();
  }, []);

  return (
    <div className="flex place-content-center justify-center flex-col gap-6">
      {
        fetched && user  ? (
          posts?.length ? (posts.map((post, index) => (
            <AccountPostCard
              key={index} 
              post={post}
              user={user}
            />
          ))) : (<div className='ml-[18px] md:ml-0 w-[95%] border px-5 py-5 place-content-center m-auto'>
            You haven't Post Yet HeadOver to the 
            <span      
              className='text-blue-600 underline cursor-pointer'
              onClick={() => { router.push('/all-users') }}
            >create-post</span> Page and createOne
          </div>)
        ) : fetched && (!user || !posts) ? (
          <FetchFailed />
        ) : (
          <PageLoader />
        )
      }
    </div>
  );
};

export default isAuth(page);
