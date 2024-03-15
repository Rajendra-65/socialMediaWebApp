import { User } from "@/models/User"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
interface ParamsType {
    Id:string
}

export const GET = async (request:any,{ params } : { params : ParamsType }) => {
    try{
        const {Id} = params
        console.log(Id,typeof Id)
        await connectDb()
        const userObjectId = new mongoose.Types.ObjectId(Id)
        const currentUser = await User.findById(userObjectId)
        return NextResponse.json({user:currentUser,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}