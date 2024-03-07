"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

const PeopleCard = () => {
  return (
    <div className='w-[200px] h-[200px] border border-b-4 border-r-4 rounded-md border-b-white border-r-white place-content-center justify-center align-middle'>
      <div className='flex flex-col items-center place-content-center justify-between mt-5 '>
        <Image
          src="/assets/icons/profile-placeholder.svg"
          height={42}
          width={42}
          alt="ProfileImage of the User"
        />
        <h1 className='mt-2'>Alexander</h1>
        <h1 className='mt-1 text-sm'>@Alexander</h1>
        <Button className='bg-purple-600 text-center mt-2'>Follow</Button>
      </div>
    </div>
  )
}

export default PeopleCard