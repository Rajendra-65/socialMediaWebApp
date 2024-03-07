import { Post } from "@/models/Post"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (request:any,{params}) => {
    try{
        const {userId} = params
        const ObjectId = new mongoose.Types.ObjectId(userId)
        const post = await Post.find({_id:ObjectId})
        console.log(post)
        return NextResponse.json({success:true, data:post})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}