"use client"
import React from 'react'
import Image from 'next/image'
import { BellRing } from 'lucide-react'

const page = () => {
  return (
    <>
      <h1 className='text-xl mb-4'>Your Members To Chat</h1>
      <div className='flex flex-col items-center justify-center place-content-center align-middle gap-3'>
        <div className='w-full bg-zinc-950 flex flex-col gap-7 overflow-y-auto'>
          <input className="px-2 py-4 border border-blue-600 rounded-md w-full bg-zinc-950 focus:border-blue-600 focus:outline-none" placeholder="Search an user here" />
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <Image
                src="/assets/icons/profile-placeholder.svg"
                height={60}
                width={60}
                alt="Profile Image of the User"
              />
              <div className='flex gap-2'>
                <div className='flex flex-col gap-1'>
                  <h1 className='font-bold'>UserName</h1>
                  <h1 className='font-bold'>2 new Messages</h1>
                </div>
                <div className='mt-7'>
                  <h1 className='text-base'>2 hours ago</h1>
                </div>
              </div>
            </div>
            <div>
              <BellRing className='text-blue-600 mr-2 mt-3' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <Image
                src="/assets/icons/profile-placeholder.svg"
                height={60}
                width={60}
                alt="Profile Image of the User"
              />
              <div className='flex gap-2'>
                <div className='flex flex-col gap-1'>
                  <h1 className='font-bold'>UserName</h1>
                  <h1 className='font-bold'>2 new Messages</h1>
                </div>
                <div className='mt-7'>
                  <h1 className='text-base'>2 hours ago</h1>
                </div>
              </div>
            </div>
            <div>
              <BellRing className='text-blue-600 mr-2 mt-3' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <Image
                src="/assets/icons/profile-placeholder.svg"
                height={60}
                width={60}
                alt="Profile Image of the User"
              />
              <div className='flex gap-2'>
                <div className='flex flex-col gap-1'>
                  <h1 className='font-bold'>UserName</h1>
                  <h1 className='font-bold'>2 new Messages</h1>
                </div>
                <div className='mt-7'>
                  <h1 className='text-base'>2 hours ago</h1>
                </div>
              </div>
            </div>
            <div>
              <BellRing className='text-blue-600 mr-2 mt-3' />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default page