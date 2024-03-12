import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { Message } from "@/models/Message"
import { connectDb } from "@/utils/connectDb"
import { Conversation } from "@/models/Conversation"
// import { connectDb } from "@/utils/connectDb"
interface paramsType {
    Id:string[]
}

export const POST = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const data = await request.json()
        console.log("data",data)
        const senderId = new mongoose.Types.ObjectId(Id[0])
        const receiverId = new mongoose.Types.ObjectId(Id[1])
        const conversation = await Conversation.findOne({
            $and: [
                { participants: Id[0] },
                { participants: Id[1] }
            ]
        });
        if(!conversation){
            const newConversation = await new Conversation({
                sender:senderId,
                receiver:receiverId,
                participants:[Id[0],Id[1]],
                user:senderId,
                lastMessage:data
            })
            await newConversation.save()
        }

        if(conversation){
            if(conversation.inChat.length < 2){
                conversation.unreadMessage = conversation.unreadMessages + 1
            }
            conversation.user = Id[0]
            conversation.lastMessage = data
        }

        const message = await new Message({
            sender:senderId,
            receiver:receiverId,
            content:data
        })
        
        await message.save()
        return NextResponse.json({message:message,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}