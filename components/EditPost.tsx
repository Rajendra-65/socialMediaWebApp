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
import { useRouter } from "next/navigation";
import { EditPostTypes } from "@/types/post";
import { toast } from "react-toastify";
import { updatePost } from "@/service/post/postService";
import { Loader } from "lucide-react";

const EditPost = ({post}:{post:EditPostTypes}) => {
    
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const formSchema = z.object({
        id: z.string(),
        caption: z.string().max(100, {
            message: "Caption Must Not exceed 100 characters"
        }),
        location: z.string(),
        tags: z.string().max(100, {
            message: "UserName must not exceed 100 characters"
        }),
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: post._id,
            caption: post.caption,
            location: post.location,
            tags: post.tags
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        const response = await updatePost(values)
        if (response.success) {
            toast.success("post updated successFully", { position: "top-right" })
            setLoading(false)
            router.push('/account')
        } else {
            setLoading(false)
            toast.success("updationFailed please try again later", { position: "top-right" })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full px-3 py-2">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>caption</FormLabel>
                            <FormControl>
                                <Input className="w-full" {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
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
                            <FormLabel>location</FormLabel>
                            <FormControl>
                                <Input className="w-full" {...field} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
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
                            <FormLabel>tags</FormLabel>
                            <FormControl>
                                <Input {...field} className="w-full" value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center flex-col place-content-center">
                    {loading ? (
                        <div className="flex align-middle text-center justify-center place-content-center">
                            <Loader className="w-10 h-10 animate-spin " />
                        </div>
                    ) : (<Button type="submit">Submit</Button>)}
                </div>
            </form>
        </Form>
    )
}

export default EditPost