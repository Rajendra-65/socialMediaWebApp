import { Post } from "@/models/Post"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) =>{
    try{
        await connectDb()
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const post = await Post.findOne({_id:objectId}).select({caption:1,location:1,tags:1})
        console.log(post)
        return NextResponse.json({success:true,post:post})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}