"use client"
import React from 'react'
import Image from "next/image"
import LogInForm from "@/components/LogInForm"
import { usePathname } from 'next/navigation'
import ChangePassForm from '@/components/ChangePassForm'

const Page = () => {
    const pathName = usePathname()
    return (
        <div className={`flex items-center align-middle justify-center place-content-center mt-[75px] flex-col ${pathName==='/change-password' ? 'md:mr-[190px]':'null'}`}>
            <Image
                src="/assets/images/logo.svg"
                className='mb-4'
                width={250}
                height={250}
                alt="Logo of the snapGram"
            />
            <h1 className='font-bold text-2xl mb-2'>Change Your Password Here</h1>
            <h1 className="text-xs mt-1">To change Password , please enter details below</h1>
            <ChangePassForm/>
        </div>
    )
}


export default Page