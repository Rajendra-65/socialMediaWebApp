"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import bcrypt from "bcryptjs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { changePassword } from '@/service/user/userServiece'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { EyeIcon,EyeOffIcon } from 'lucide-react'

const ChangePassForm = () => {

    const [submitLoading, setSubmitLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const formSchema = z.object({
        email: z.string(),
        NewPassword: z.string().min(8, {
            message: "Password must be of 8 characters"
        }).max(15, {
            message: "Password must be under 15 characters"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            NewPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitLoading(true)
        const hashedPassword = await bcrypt.hash(values.NewPassword, 10)
        values.NewPassword = hashedPassword
        const response = await changePassword(values)
        if (response.user) {

            // @ts-ignore
            toast.success("password Changed", { position: 'top-right' })
            setSubmitLoading(false)
            router.push(`/log-in`)
        } else {
            setSubmitLoading(false)
            toast.error("Fail to change try again", { position: 'top-right' })
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                        name="NewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className="flex relative">
                                        <Input {...field} type={showPassword ? "text" : "password"} />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="focus:outline-none absolute right-4 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center flex-col">
                        {submitLoading ? (<Loader2 className="h-4 w-4 animate-spin text-center m-auto" />) : (<Button type="submit">Submit</Button>)}
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ChangePassForm