import mongoose from "mongoose"
import { User } from "@/models/User"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

export const PUT = async (request:any) => {
    try{
        await connectDb()
        const data = await request.json()
        console.log(data)
        const user = await User.findOne({email:data.email})
        if(user){
            user.password = data.NewPassword
            await user.save()
            return NextResponse.json({success:true,user:user})
        }else{
            return NextResponse.json({success:false,user:false})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}