"use client"
import AccountPostCard from '@/components/AccountPostCard'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [mounted,setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])
  return (
    <div className='flex place-content-center justify-center flex-col gap-6'>
      <AccountPostCard/>
      <AccountPostCard/>
      <AccountPostCard/>
      <AccountPostCard/>
      <AccountPostCard/>
    </div>
  )
}

export default page