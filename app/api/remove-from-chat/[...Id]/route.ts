import { Conversation } from "@/models/Conversation"
import { connectDb } from "@/utils/connectDb"
import { NextResponse } from "next/server"

interface ParamsType {
    Id:string[]
}

export const GET = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const senderId = Id[0]
        const receiverId = Id[1]
        const conversation = await Conversation.findOne({
            $and: [
                { participants: Id[0] },
                { participants: Id[1] }
            ]
        });
        if(!conversation){
            return NextResponse.json({success:true,noConversation:true})
        }
        conversation.inChat.pull(senderId)
        await conversation.save()
        return NextResponse.json({success:true,data:conversation})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}