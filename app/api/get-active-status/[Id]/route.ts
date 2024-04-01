import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

interface ParamsType{
    Id:string;
}

export const GET = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user  = await User.findOne({_id:objectId})
        if(user.active){
            return NextResponse.json({success:true,active:true})
        }else{
            return NextResponse.json({active:false,time:user.lastActiveTime})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}