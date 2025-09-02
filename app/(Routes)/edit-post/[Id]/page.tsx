"use client"
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserEditTypes } from "@/types/user";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { updateUser } from "@/service/user/userServiece";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { EditPostTypes } from "@/types/post";
import { getPostDetails, updatePost } from "@/service/post/postService";
import EditPost from "@/components/EditPost";
import PageLoader from "@/components/SidebarLoader";
import FetchFailed from "@/components/FetchFailed";
import isAuth from "@/components/isAuth";
import useUserActivity from "@/app/hooks/useUserActivity";
import { setUnActive } from "@/service/user/userServiece";
interface ParamsTypes {
    Id: string
}

const Page = ({ params }: { params: ParamsTypes }) => {
    const [post, setPost] = useState<EditPostTypes>()
    const [fetched, setFetched] = useState<boolean>(false)
    const [mounted,setIsMounted] = useState(false)
    const isActive = useUserActivity()

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { Id } = params
                const response = await getPostDetails(Id)
                setPost(response.post)
                setFetched(true)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPost()
    }, [])

    useEffect(() => {
        if (!isActive) {
          // User is inactive, call setUnActivity function
          setUnActive()
        }
      }, [isActive]); 

    return (
        <div className='flex items-center justify-center place-content-center align-middle mt-[80px] md:mt-[0px] mb-[80px] md:mb-0 bg-zinc-950 border rounded-md w-full'>
            {fetched ? (fetched && !post ? (<FetchFailed />) : (<EditPost
                post={post as EditPostTypes}
            />)) : (<PageLoader />)}
        </div>
    )
}

export default isAuth(Page)