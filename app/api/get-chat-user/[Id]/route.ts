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
        const objectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findById(objectId)
        return NextResponse.json({user:user,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}