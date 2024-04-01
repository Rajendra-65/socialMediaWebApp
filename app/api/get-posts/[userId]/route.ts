import { Post } from "@/models/Post"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

interface ParamsType {
    userId:string
} 

export const GET = async (request:any,{ params }: { params: ParamsType }) => {
    try{
        await connectDb()
        const {userId} = params
        const ObjectId = new mongoose.Types.ObjectId(userId)
        const post = await Post.find({user:ObjectId})
        if(!post.length){
            return NextResponse.json({success:true,post:false})
        }
        return NextResponse.json({success:true, post:post})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}