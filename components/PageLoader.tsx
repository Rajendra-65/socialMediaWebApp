"use client"
import React from 'react'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'
const PageLoader = () => {
  const pathName = usePathname()
  return (
    <div className={pathName === '/log-in' || pathName === '/sign-up' ? 'hidden':'w-[200px] h-[200px]'}>
      <Loader
        className ='h-[90px] w-[90px] md:w-[200px] md:h-[200px] animate-spin'
      />
    </div>
  )
}

export default PageLoader