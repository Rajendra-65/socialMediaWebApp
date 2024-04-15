"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createUser, getAvailableName } from "@/service/user/userServiece";
import bcrypt from "bcryptjs";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { EyeOffIcon } from "lucide-react";
import { getSearchUser } from "@/service/user/userServiece";

const SignUpForm = () => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [mounted, setIsMounted] = useState(false);
    const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);
    const [search, setSearch] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const pathName = usePathname();
    const router = useRouter();

    const formSchema = z.object({
        firstName: z
            .string()
            .min(2, {
                message: "firstName must be at least 2 characters.",
            })
            .max(12, {
                message: "firstName must not exceed 12 characters",
            }),
        lastName: z
            .string()
            .min(2, {
                message: "firstName must be at least 2 characters.",
            })
            .max(12, {
                message: "firstName must not exceed 12 characters",
            }),
        userName: z
            .string()
            .min(3, {
                message: "UserName must be of 3 characters",
            })
            .max(12, {
                message: "UserName must not exceed 12 characters",
            }),
        email: z.string(),
        password: z
            .string()
            .min(8, {
                message: "Password must be of 8 characters",
            })
            .max(15, {
                message: "Password must be under 15 characters",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitLoading(true);
        const hashedPassword = await bcrypt.hash(values.password, 10);
        values.password = hashedPassword;
        const response = await createUser(values);
        if (response.success || response.data) {
            toast.success("User Created SuccessFully", { position: "top-right" });
            setSubmitLoading(false);
            router.push("/log-in");
            form.reset();
        } else {
            form.reset();
            setSubmitLoading(false);
            toast.error("userCreation Failed", { position: "top-right" });
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

    return (
        <div
            className={`px-5 py-5 flex flex-col sm:w-[420px] w-full gap-3 ${pathName === "/sign-up" ? "ml-0" : "null"
                }`}
        >
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
                                    <Input
                                        {...field}
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
                        {submitLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-center m-auto" />
                        ) : (
                            <Button type="submit" disabled={!isUserNameAvailable}>Submit</Button>
                        )}
                        <div className="flex mt-3">
                            <h1>Already have an account ? </h1>
                            <Link href="/log-in" className="text-blue-600 ml-1">
                                {" "}
                                log-in
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;
