"use client"

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
import React from 'react'
import Link from "next/link"
import { createUser } from "@/service/user/userServiece"
import bcrypt from "bcryptjs"
import { usePathname } from "next/navigation"
const SignUpForm = () => {
    const pathName = usePathname()
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
        email:z.string(),
        password:z.string().min(8,{
            message:"Password must be of 8 characters"
        }).max(15,{
            message:"Password must be under 15 characters"
        })
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName:"",
            userName:"",
            email:"",
            password:"",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const hashedPassword = await bcrypt.hash(values.password, 10)
        values.password = hashedPassword
        const response = await createUser(values)
        console.log(response)
        console.log(response.data)
        if(response.success){
            alert('UserCreated SuccessFully')
        }
    }


    return (
        <div className={`px-5 py-5 flex flex-col sm:w-[420px] w-full gap-3 ${pathName==='/sign-up' ? 'ml-0' : 'null'}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>firstName</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} />
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
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    <Input {...field} type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center flex-col">
                        <Button type="submit">Submit</Button>
                        <div className="flex mt-3">
                            <h1>Already have an account ? </h1>
                            <Link href="/log-in" className='text-blue-600 ml-1'> log-in</Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SignUpForm