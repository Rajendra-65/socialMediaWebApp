import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        const {Id} = params
        const objectId =new  mongoose.Types.ObjectId(Id)
        const allUsers = await User.find({ _id: { $ne: objectId } }).select({profileImage:1,userName:1,_id:1})
        return NextResponse.json({success:true,users:allUsers})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}