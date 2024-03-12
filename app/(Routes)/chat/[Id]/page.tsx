"use client"

import { ArrowBigLeft, ArrowLeft, Camera, Phone, SendHorizonal, Video } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import {createMessage} from "../../../../service/chat/chatServices"

interface paramsType {
    Id: string
}

const page = ({ params }: { params: paramsType }) => {
    const [recentMessage,setRecentMessage] = useState<string[]>([])
    const [message,setMessage] = useState<string>()
    const { Id } = params
    const sendClick = async () => {
        const content = message
        setMessage('')
        console.log(content)
        try{
            const response = await createMessage(Id,content as string)
            console.log(response.data)
        }catch(e){

        }
    }
    return (
        <div className='w-full bg-zinc-950 border rounded-md h-[74vh] md:h-[96vh]'>
            <div className='flex w-full border px-2 py-2 gap-2 justify-between top-0'>
                <div className='flex'>
                    <div>
                        <ArrowLeft className='w-8 h-8 text-white mt-[9px]'/>
                    </div>
                    <div className='flex gap-2'>
                        <Image
                            src={"/assets/icons/profile-placeholder.svg"}
                            width={50}
                            height={50}
                            alt="ProfilePlaceholder"
                        />
                        <div>
                            <h1 className='font-bold'>UserName</h1>
                            <h1 className='font-normal'>2 Active Now</h1>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 mt-[11px]'>
                    <Phone className='w-8 h-8 text-white'/>
                    <Video className='w-8 h-8 text-white'/>
                </div>
            </div>
            <div className='w-full border mb-[66px] h-[54vh]'></div>
            <div className='flex  border px-2 py-2 rounded-md absolute mb-[68px]  w-[93vw] bottom-0 justify-between'>
                <div className='flex w-[86vw] gap-[8px]'>
                    <Camera className='w-8 h-8 text-white'/>
                    <input 
                        className='rounded-md w-[79vw]' 
                        placeholder='Message...'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <SendHorizonal className='w-8 h-8 text-blue-700' onClick={()=>{sendClick()}}/>
                </div>
            </div>
        </div>
    )
}

export default page