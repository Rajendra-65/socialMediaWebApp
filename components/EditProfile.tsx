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
import { useDebouncedCallback } from "use-debounce";
import { getAvailableName } from "@/service/user/userServiece";

const EditProfile = ({user}:{user:UserEditTypes}) => {
    
    const [imageUrl,setImageUrl] = useState<string>()
    const [loading,setLoading] = useState<boolean>(false)
    const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);
    const [search, setSearch] = useState(false)
    const router = useRouter()
    const formSchema = z.object({
        firstName: z.string().min(2, {
            message: "firstName must be at least 2 characters.",
        }).max(12,{
            message:"firstName must not exceed 12 characters"
        }),
        lastName: z.string().min(2, {
            message: "firstName must be at least 2 characters.",
        }).max(12,{
            message:"firstName must not exceed 12 characters"
        }),
        userName: z.string().min(3,{
            message:"UserName must be of 3 characters"
        }).max(12,{
            message:"UserName must not exceed 12 characters"
        }),
        imageUrl:z.string()
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName:user.lastName,
            userName:user.userName,
            imageUrl:user.profileImage || ""
        },
    })

    const handleUpload = (result:any) => {
        const imageUrl = result?.info?.secure_url
        setImageUrl(imageUrl)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        values.imageUrl = imageUrl as string
        const response = await updateUser(values)
        if(response.success){
            toast.success("profile updated successFully",{position:"top-right"})
            setLoading(false)
            router.push(`/account`)
        }else{
            setLoading(false)
        }
    }

    const handleSearch = useDebouncedCallback(async (term) => {

        if (!term.length) {
            setSearch(false)
            setIsUserNameAvailable(false)
        }

        if (term.length) {
            const response = await getAvailableName(term)
            if (response.available) {
                setIsUserNameAvailable(true)
                setSearch(true)
            } else {
                setIsUserNameAvailable(false)
            }
        }
    }, 200);

    return <div className="w-full border bg-zinc-950 overflow-y-auto rounded-md px-5 py-5 flex flex-col gap-3">
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className=" items-start flex gap-2">
                        <Image
                            src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                            width={60}
                            height={60}
                            style={{borderRadius:"50%"}}
                            alt="Profile Image"
                        />
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onSuccess={handleUpload}
                            uploadPreset="xntzsiah"
                        >
                            <h1 className="text-sm text-blue-700 mt-4">Change ProfileImage</h1>
                        </CldUploadButton>
                    </div>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>firstName</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>lastName</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>userName</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        value={field.value} 
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            handleSearch(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage
                                    className={
                                        isUserNameAvailable ? "text-green-500" : "text-red-500"
                                    }
                                >
                                    {search ? (isUserNameAvailable
                                        ? "Username is available"
                                        : "Username is not available") : null}
                                </FormMessage>
                            </FormItem>
                        )}
                    />                   
                    <div className="flex justify-center flex-col">
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin align-middle"/>
                        ): (<Button type="submit">Submit</Button>)}
                    </div>
                </form>
        </Form>
    </div>;
};

export default EditProfile;
