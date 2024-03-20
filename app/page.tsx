"use client"
import BottomBar from "@/components/BottomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostFeed from "@/components/PostFeed";
import { getFeedPost } from "@/service/post/postService";
import { PostTypes } from "@/types/post";
import Image from "next/image";
import { useEffect,useState } from "react";
import PageLoader from "@/components/PageLoader";
import { UserTypes } from "@/types/user";
import { getLogInUser } from "@/service/user/userServiece";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <BottomBar/>
      <LeftSideBar/>
      <PostFeed/>
    </div>
  );
}
