"use client"
import { CldUploadButton } from "next-cloudinary";
import React, { useState } from "react";
import { UploadCloudIcon } from "lucide-react";
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
import { Textarea } from "./ui/textarea";
import { createUser } from "@/service/user/userServiece";
import { getUserId } from "@/service/token/tokenService";
import { createPost } from "@/service/post/postService";

const CreatePost = () => {
    
    const [imageUrl,setImageUrl] = useState<string>('')
    
    const handleUpload = (result) => {
        const imageUrl = result?.info?.secure_url
        setImageUrl(imageUrl)
        console.log("ImageUrl is",imageUrl)
    }

    const formSchema = z.object({
        user:z.string(),
        caption: z.string().max(100,{
            message:"Caption Must Not exceed 100 characters"
        }),
        location: z.string(),
        tags: z.string().max(100,{
            message:"UserName must not exceed 100 characters"
        }),
        imageUrl:z.string()
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.imageUrl = imageUrl
        const userId = await getUserId()
        console.log(userId)
        values.user = userId
        console.log(values)
        const response = await createPost(values)
        console.log(response.data)
        form.reset()
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            caption: "",
            location:"",
            tags:"",
            imageUrl:""
        },
    })

    return (
        <div className="flex flex-col gap-3 w-[450px]">
            <div className="flex gap-2">
                <h1 className="text-xl">Add Image:</h1>
                <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="xntzsiah"
                >
                    <UploadCloudIcon className="text-sky-500" />
                </CldUploadButton>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>caption:</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>location:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>tags:</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center flex-col">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreatePost;
