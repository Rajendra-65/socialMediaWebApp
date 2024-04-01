import { NextResponse } from "next/server"
import { Conversation } from "@/models/Conversation"
import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        let flag = 0
        const objectId = new mongoose.Types.ObjectId(Id)
        const conversations = await Conversation.find({ participants: { $in: [Id] }})
        for(let i = 0; i < conversations.length ; i++){
            if(conversations[i].sender.toString() != Id){
                if(conversations[i].unreadMessages >= 1){
                    flag =1 
                    break
                }
            }
        }
        if(flag){
            return NextResponse.json({success:true,chat:true})
        }else{
            return NextResponse.json({success:true,chat:false})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}