import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
import { Conversation } from "@/models/Conversation"
import { NextResponse } from "next/server"

interface paramsType {
    Id:string[]
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        // const objectId = new mongoose.Types.ObjectId(Id)
        const conversation = await Conversation.findOne({
            $and: [
                { participants: Id[0] },
                { participants: Id[1] }
            ]
        })
        const objectId = new mongoose.Types.ObjectId(Id[1])
        console.log(typeof objectId)
        console.log(typeof conversation.user)
        console.log(objectId,conversation.user)
        if(conversation.user === objectId){
            conversation.unreadMessages = 0
            await conversation.save()
        }
        
        return NextResponse.json({success:true,conversation:conversation})
    }catch(e){
        return NextResponse.json({success:false})
    }
}