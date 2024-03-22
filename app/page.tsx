"use client"
import BottomBar from "@/components/BottomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostFeed from "@/components/PostFeed";
import isAuth from "@/components/isAuth";

const page = () => {
  return (
    <div>
      <Navbar/>
      <BottomBar/>
      <LeftSideBar/>
      <PostFeed/>
    </div>
  );
}

export default isAuth(page)