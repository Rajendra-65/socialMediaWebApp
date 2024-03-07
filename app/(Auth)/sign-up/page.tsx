"use client"
import Image from 'next/image'
import React from 'react'
import SignUpForm from '@/components/SignUpForm'
import { usePathname } from 'next/navigation'

const page = () => {
  const pathName= usePathname()
  return (
    <div className={`flex items-center align-middle justify-center place-content-center mt-[75px] flex-col ${pathName==='/sign-up' ? 'md:mr-[190px]':'null'}`}>
        <Image
            src="/assets/images/logo.svg"
            className='mb-4'
            width={250}
            height={250}
            alt ="Logo of the snapGram"
        />
        <h1 className='font-bold text-2xl mb-2'>Create A New Account</h1>
        <h1 className="text-xs mt-1">To use SnapGram , please enter details below</h1>
        <SignUpForm/>
    </div>
  )
}

export default page