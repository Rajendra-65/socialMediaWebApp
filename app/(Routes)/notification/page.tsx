import { BadgeAlert } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='flex place-content-center justify-center align-middle'>
        <div className='flex flex-col mt-2 w-full h-[350px] px-10  border'>
            <div className='flex place-content-center mt-2'>
                <div className="justify-center w-[150px] bg-yellow-600 border rounded-md flex gap-2 px-3 py-2 place-content-center">
                    <BadgeAlert className='w-8 h-8 text-white mt-1'/>
                    <h1 className='mt-1'>Attention</h1>
                </div>
            </div>
            <div className='px-2 py-4 border'>
                <div className='flex gap-2 px-5 py-5 place-content-center mt-4'>
                    <Image
                        src={"/assets/icons/profile-placeholder.svg"}
                        width={45}
                        height={45}
                        style={{borderRadius:"50%"}}
                        alt="profilePlaceholder"
                    />
                    <h1 className='font-semibold mt-2'>UserName started Following You</h1>
                    <Button>Follow</Button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default page