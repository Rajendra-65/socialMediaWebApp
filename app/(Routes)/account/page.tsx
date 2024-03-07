"use client";
import AccountPostCard from "@/components/AccountPostCard";
import React, { useEffect, useState } from "react";
import { UserTypes } from "../../../types/user";
import { PostTypes } from "../../../types/post";
import { getLogInUser } from "@/service/user/userServiece";
import { getPost } from "@/service/post/postService";
import PageLoader from "@/components/PageLoader";
import FetchFailed from "@/components/FetchFailed";

const page = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [user, setUser] = useState<UserTypes | null>();
  const [posts, setPosts] = useState<PostTypes[]>();
  const [fetched, setFetched] = useState<boolean>(false);

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
    fetched && user && posts ? (
        posts.map((post,index) => (
            <AccountPostCard
                key={index} // Assuming each post has a unique identifier
                post={post}
                user={user}
            />
        ))
    ) : fetched && (!user || !posts) ? (
        <FetchFailed />
    ) : (
        <PageLoader />
    )
}
    </div>
  );
};

export default page;
