import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { object } from "zod"

interface paramsTypes {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsTypes}) => {
    try{
        const {Id} = params
        console.log(typeof Id)
        if(typeof Id === "string"){
            const objectId = new mongoose.Types.ObjectId(Id)
            const user = await User.findOne({_id:objectId}).select({profileImage:1,firstName:1,lastName:1,userName:1,email:1})
            return NextResponse.json({success:true,user:user,string:true})
        }else{
            const user = await User.findOne({_id:Id}).select({profileImage:1,firstName:1,lastName:1,userName:1,email:1})
            return NextResponse.json({success:true,user:user,string:false})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}