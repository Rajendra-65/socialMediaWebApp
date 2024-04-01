"use client"
import BottomBar from "@/components/BottomBar";
import LeftSideBar from "@/components/LeftSideBar";
import Navbar from "@/components/Navbar";
import PostFeed from "@/components/PostFeed";
import isAuth from "@/components/isAuth";
import { setActive } from "@/service/user/userServiece";
import { setUnActive } from "@/service/user/userServiece";
import { useEffect,useState } from "react";

const page = () => {
  const [mounted,setIsMounted] = useState(false)
  const token = window.localStorage.getItem('authToken')
  
  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    const setUserActive = async () => {
        await setActive()
    }
    setUserActive()
  },[token])

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
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