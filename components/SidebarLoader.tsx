"use client"
import React from 'react'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Skeleton } from './ui/skeleton'
const SidebarLoader = () => {
  const pathName = usePathname()
  return (
    <div className={pathName === '/log-in' || pathName === '/sign-up' || pathName === '/change-password' ? 'hidden' : 'w-[200px] h-[200px]'}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}

export default SidebarLoader