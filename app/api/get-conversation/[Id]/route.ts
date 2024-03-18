import { Conversation } from "@/models/Conversation"
import { NextResponse } from "next/server"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        const {Id} = params
        const conversations = await Conversation.find({ participants: { $in: [Id] } });
        return NextResponse.json({success:true,conversations:conversations})
    }catch(e){
        console.log(e)
    }
}