import { User } from "@/models/User"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

export const GET = async (request:any,{params}) => {
    try{
        const {Id} = params
        console.log(Id,typeof Id)
        await connectDb()
        const currentUser = await User.findById(Id)
        return NextResponse.json({user:currentUser,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}