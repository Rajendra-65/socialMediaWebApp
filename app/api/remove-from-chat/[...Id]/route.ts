import { Conversation } from "@/models/Conversation"
import { connectDb } from "@/utils/connectDb"
import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"

interface ParamsType {
    Id:string[]
}

export const PUT = async (request:any,{params}:{params:ParamsType}) => {
    try{
        console.log("RemoveFrom the chat Reached...")
        await connectDb()
        const {Id} = params
        const senderId = Id[0]
        const receiverId = Id[1]
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if(!conversation){
            return NextResponse.json({success:true,noConversation:true})
        }
        if(conversation.inChat.includes(senderId)){
            conversation.inChat.pull(senderId)
            await conversation.save()
            await pusherServer.trigger(Id[0], 'inTheChat', false);
        }
        return NextResponse.json({success:true,data:conversation})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}