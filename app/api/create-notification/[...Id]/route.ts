import { connectDb } from "@/utils/connectDb"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { pusherServer } from "@/lib/pusher"

interface paramsType {
    Id:string[]
}

export const PUT = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const currentUserId = new mongoose.Types.ObjectId(Id[0])
        const secondUserId = new mongoose.Types.ObjectId(Id[1])
        const currentUser = await User.findById(currentUserId).select({userName:1,profileImage:1})
        const msg = `${currentUser.userName} is started following You`
        const secondUser = await User.findById(secondUserId)
        secondUser.notification.push(msg)
        secondUser.userNotificationId.push(currentUser._id)
        if(currentUser.profileImage){
            secondUser.notificationDp.push(currentUser.profileImage)
        }else{
            secondUser.notificationDp.push('')
        }
        await pusherServer.trigger(Id[1],'notification:new','')
        await secondUser.save()
        return NextResponse.json({user:secondUser,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}