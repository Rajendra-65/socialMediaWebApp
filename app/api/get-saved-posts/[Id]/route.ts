import { Post } from "@/models/Post"
import { User } from "@/models/User"
import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

interface savedParams {
    Id:string
}

export const GET = async (request:any,{params}:{params:savedParams}) => {
    try{
        await connectDb()
        let saved = []
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findOne({_id:objectId})
        const savedIds = user.savedPosts
        for (let i=0;i<savedIds.length;i++){
            try{
                const post = await Post.findById({_id:savedIds[i]}).select({profileImage:1,imageUrl:1,_id:1})
                saved.push(post)
            }catch(e){
                console.log(e)
            }
        }
        return NextResponse.json({success:true,allSaved:saved})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}