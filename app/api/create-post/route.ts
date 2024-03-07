import { Post } from "@/models/Post"
import { NextResponse } from "next/server"
import {connectDb} from "@/utils/connectDb"
import mongoose from "mongoose"

export const POST = async (request:any) => {
    try{
        await connectDb()
        const data = await request.json()
        const Id =new  mongoose.Types.ObjectId(data.user)
        console.log(Id,typeof Id)
        data.user = Id
        console.log(data)
        const createdPost = await Post.create(data)
        await createdPost.save()
        console.log(createdPost)
        return NextResponse.json({data:createdPost,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}