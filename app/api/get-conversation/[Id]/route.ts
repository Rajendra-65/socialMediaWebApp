import { Conversation } from "@/models/Conversation"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        let users = []
        const conversations = await Conversation.find({ participants: { $in: [Id] }}).sort('timestamps');
        const Ids = conversations.map((conversation) => {
            return conversation.participants.filter((participant:any) => participant !== Id);
        }).flat()        
        for(let i=0;i<Ids.length;i++){
            try{
                const objectId = new mongoose.Types.ObjectId(Ids[i])
                const secondUser = await User.findOne({_id:objectId}).select({profileImage:1,userName:1})
                users.push(secondUser)
            }catch(e){
                console.log(e)
            }
        }
        return NextResponse.json({success:true,conversations:conversations,users:users,Ids:Ids})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}