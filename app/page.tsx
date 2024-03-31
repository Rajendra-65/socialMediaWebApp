"use client"
import BottomBar from "@/components/BottomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostFeed from "@/components/PostFeed";
import isAuth from "@/components/isAuth";
import { setActive } from "@/service/user/userServiece";
import { setUnActive } from "@/service/user/userServiece";
import { useEffect } from "react";

const page = () => {
  const token = window.localStorage.getItem('authToken')
  
  useEffect(()=>{
    const setUserActive = async () => {
        await setActive()
    }
    setUserActive()
  },[token])

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        console.log('unActive event triggered....')
        await setUnActive();
      } catch (error) {
        console.error("Error setting user inactive:", error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [token])

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