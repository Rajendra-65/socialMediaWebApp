import { Post } from "@/models/Post"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"

interface ParamsType {
    Id:string[]
}

export const POST  = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        console.log(params)
        const {Id} = params
        const userId = Id[0]
        const postId = Id[1]
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const postObjectId = new mongoose.Types.ObjectId(postId)
        const user = await User.findOne({_id:userObjectId})
        console.log(user)
        const post = await Post.findOne({_id:postObjectId})
        console.log(post)
        if(user.likedPost.includes(postId)){
            user.likedPost.pull(postId)
            await user.save()
            post.like = post.like - 1
            post.likedBy.pull(userId)
            await post.save()
        }else{
            user.likedPost.push(postId)
            await user.save()
            post.like = post.like + 1
            post.likedBy.push(userId)
            await post.save()
        }
        return NextResponse.json({success:true,user:user,post:post})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}