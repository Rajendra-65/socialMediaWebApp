import { connectDb } from "@/utils/connectDb"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { Post } from "@/models/Post"
import { PostTypes } from "@/types/post"
import { UserTypes } from "@/types/user"

interface ParamsTypes {
    Id:string
}

export const GET = async (request:any,{params}:{params:ParamsTypes}) => {
    try{
        await connectDb()
        const {Id} = params
        let AllPosts:PostTypes[] = []
        let Users:UserTypes[] = [] 
        const objectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findOne({_id:objectId})
        const following = user.following
        if(!following.length){
            return NextResponse.json({success:true,following:false})
        }else{
            for (let i = 0; i < user.following.length; i++) {
                const objectId = user.following[i];
                const posts = await Post.find({ user: objectId }).sort('timestamps');
                AllPosts = AllPosts.concat(posts);
                for (let j = 0 ;j< posts.length;j++){
                    const user = await User.findOne({_id:posts[j].user}).select({profileImage:1,userName:1})
                    Users.push(user)
                }
            }
            return NextResponse.json({success:true,following:true,AllPosts:AllPosts,users:Users})
        }
    }catch(e){
            console.log(e)
            return NextResponse.json({success:false})
    }
}