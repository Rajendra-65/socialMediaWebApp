import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
import { Message } from "@/models/Message"
import { NextResponse } from "next/server"

interface ParamsType {
    Id:string[]
}

export const GET =async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const senderId = new mongoose.Types.ObjectId(Id[0])
        const receiverId = new mongoose.Types.ObjectId(Id[1])
        
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).select({ sender: 1, receiver: 1, content: 1 })
        
        return NextResponse.json({message:messages,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}