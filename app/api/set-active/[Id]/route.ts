import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

interface ParamsType{
    Id:string;
}

export const PUT = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user  = await User.findById(objectId)
        user.active = true
        user.save()
        await pusherServer.trigger(Id,'active:status',false)
        return NextResponse.json({success:true,active:user.active})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}