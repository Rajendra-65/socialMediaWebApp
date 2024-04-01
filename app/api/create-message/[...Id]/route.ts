import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { Message } from "@/models/Message"
import { connectDb } from "@/utils/connectDb"
import { Conversation } from "@/models/Conversation"
import { pusherServer } from "@/lib/pusher"

interface paramsType {
    Id:string[]
}

export const POST = async (request:any,{params}:{params:paramsType}) => {
    try{
        
        await connectDb()
        const {Id} = params
        
        const data = await request.json()
        const senderId = new mongoose.Types.ObjectId(Id[0])
        const receiverId = new mongoose.Types.ObjectId(Id[1])
        
        const conversation = await Conversation.findOne({
            $and: [
                { participants: Id[0] },
                { participants: Id[1] }
            ]
        })

        const message = await new Message({
            sender:senderId,
            receiver:receiverId,
            content:data
        })

        if(conversation){
            conversation.sender = senderId
            conversation.receiver = receiverId
        }

        if(!conversation){
            const newConversation = await new Conversation({
                sender:senderId,
                receiver:receiverId,
                participants:[Id[0],Id[1]],
                user:senderId,
                unreadMessages:1,
                lastMessage:data
            })
            await newConversation.save()
            await pusherServer.trigger(Id[0],'messages:new',message)
            await pusherServer.trigger(Id[1],'conversation:update',conversation._id)
            await pusherServer.trigger(Id[1],'chat:update',Id[1])
            return NextResponse.json({message:message,success:true})
        }

        if(conversation){
            if(conversation.inChat.length < 2){
                conversation.unreadMessages = conversation.unreadMessages + 1
            }
            conversation.user = Id[0]
            conversation.lastMessage = data
            conversation.lastMessageTime = Date.now()
        }
        await pusherServer.trigger(Id[0],'messages:new',message)
        await pusherServer.trigger(Id[1],'conversation:update',conversation._id)
        await pusherServer.trigger(Id[1],'chat:update',Id[1])
        await message.save()
        if(conversation){
            await conversation.save()
        }
        return NextResponse.json({message:message,success:true})
    
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}