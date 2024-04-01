import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
import { Conversation } from "@/models/Conversation"
import { NextResponse } from "next/server"

interface paramsType {
    Id:string[]
}

export const PUT = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const conversation = await Conversation.findOne({
            $and: [
                { participants: Id[0] },
                { participants: Id[1] }
            ]
        })
        if(conversation.user.toString() === Id[1]){
            conversation.unreadMessages = 0
            await conversation.save()
        }
        
        return NextResponse.json({success:true,conversation:conversation})
    }catch(e){
        return NextResponse.json({success:false})
    }
}