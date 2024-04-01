import { Post } from "@/models/Post"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const PUT = async (request:any) => {
    try{
        
        const data = await request.json()
        const Id = new mongoose.Types.ObjectId(data.id)
        const updatedPost = await Post.findByIdAndUpdate(Id,{
                caption:data.caption,
                tags:data.tags,
                location:data.location
            },{new:true})
        return NextResponse.json({success:true,data:updatedPost})

    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}