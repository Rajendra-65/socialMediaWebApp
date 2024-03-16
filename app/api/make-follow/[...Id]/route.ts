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
            // Handle scenario where either user is not found
            console.log("User not found");
            return;
        }
        
        console.log('firstUser', firstUser);
        console.log('secondUser', secondUser);
        
        if (firstUser.following && firstUser.following.includes(followingId)) {
            firstUser.following.pull(followingId);
            if (!secondUser.followers) {
                secondUser.followers = []; // Ensure follower array exists
            }
            secondUser.followers.pull(userId);
        } else {
            if (!firstUser.following) {
                firstUser.following = []; // Ensure following array exists
            }
            firstUser.following.push(followingId);
            if (!secondUser.followers) {
                secondUser.followers = []; // Ensure follower array exists
            }
            secondUser.followers.push(userId);
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