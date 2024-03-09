import mongoose from "mongoose"
import { User } from "@/models/User"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

interface paramsType {
    Id:string
}

export const PUT = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const data = await request.json()
        console.log(data)
        const ObjectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findByIdAndUpdate(ObjectId,{
            firstName:data.firstName,
            lastName:data.lastName,
            userName:data.userName,
            profileImage:data.profileImage
        },{new:true})
        return NextResponse.json({success:true,user:user})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}