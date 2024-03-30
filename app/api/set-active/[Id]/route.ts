import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface ParamsType{
    Id:string;
}

export const GET = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user  = await User.findById(objectId)
        user.active = !user.active
        const date = new Date()
        user.lastActiveTime = date
        await user.save()
        return NextResponse.json({user:user,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}