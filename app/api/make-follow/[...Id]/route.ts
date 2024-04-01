import { User } from "@/models/User"
import { connectDb } from "@/utils/connectDb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

interface ParamsType {
    Id:string[]
}

export const PUT = async (request:any,{params}:{params:ParamsType}) => {
    try{
        await connectDb()
        const { Id } = params;
        const userId = Id[0];
        const followingId = Id[1];
        const firstUserObjectId = new mongoose.Types.ObjectId(userId);
        const secondUserObjectId = new mongoose.Types.ObjectId(followingId);
        
        const firstUser = await User.findById(firstUserObjectId);
        const secondUser = await User.findById(secondUserObjectId);
        
        if (!firstUser || !secondUser) {
            return;
        }
        
        if (firstUser.following && firstUser.following.includes(followingId)) {
            firstUser.following.pull(followingId);
            if (!secondUser.followers) {
                secondUser.followers = []; 
            }
            secondUser.followers.pull(userId);
        } else {
            if (!firstUser.following) {
                firstUser.following = []; 
            }
            firstUser.following.push(followingId);
            if (!secondUser.followers) {
                secondUser.followers = []; 
            }
            secondUser.followers.push(userId);
            await firstUser.save()
            await secondUser.save()
            return NextResponse.json({success:true,notification:true})
        }
        
        await firstUser.save();
        await secondUser.save();
        return NextResponse.json({firstUser:firstUser,secondUser:secondUser,success:true,notification:false})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}