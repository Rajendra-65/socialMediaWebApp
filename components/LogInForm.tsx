"use client"
import React from 'react'
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
import Link from "next/link"
import { logInUser } from '@/service/user/userServiece'
import jwt from "jsonwebtoken"
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


const LogInForm = () => {
    const router = useRouter()
    const formSchema = z.object({
        email: z.string(),
        password: z.string().min(8, {
            message: "Password must be of 8 characters"
        }).max(15, {
            message: "Password must be under 15 characters"
        })
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const response = await logInUser(values)
        const user = response.user
        if(response.logIn){
            const token = response.token
            console.log(token)
            window.localStorage.setItem('authToken',token)
            const decodedToken = jwtDecode(token)
            console.log(decodedToken)
            console.log("userId is",decodedToken._id)
            console.log("Saved token is",window.localStorage.getItem('authToken'))
            toast.success("log-in successFul",{position:'top-right'})
            router.push('/')
        }else{
            toast.error("login False",{position:'top-right'})
        }
        console.log(response)
    }

    return (
        <div className='px-5 py-5 flex flex-col sm:w-[420px] w-full gap-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input {...field} type='password'/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center flex-col">
                        <Button type="submit">Submit</Button>
                        <div className="flex mt-3">
                            <h1>New to snapGram ? </h1>
                            <Link href="/sign-up" className='text-blue-600 ml-1'> sign-up </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LogInForm