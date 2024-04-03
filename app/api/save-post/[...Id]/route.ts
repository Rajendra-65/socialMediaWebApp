import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { UserTypes } from "@/types/user"
import { connectDb } from "@/utils/connectDb"

interface ParamsType{
    Id:string
}

export const GET = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const userId = Id[0]
        const postId = Id[1]
        const postObjectId = new mongoose.Types.ObjectId(postId)
        const user = await User.findOne({_id:userId})
        if(user.savedPosts.includes(postObjectId)){
            user.savedPosts.pull(postObjectId)
        }else{
            user.savedPosts.push(postObjectId)
        }
        await user.save()
        return NextResponse.json({user:user,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}