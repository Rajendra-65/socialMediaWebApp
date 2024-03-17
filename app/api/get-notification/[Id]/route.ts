import { connectDb } from "@/utils/connectDb"
import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

interface paramsType {
    Id:string
}

export const GET = async (request:any,{params}:{params:paramsType}) => {
    try{
        await connectDb()
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findById(objectId)
        const notifications = user.notification
        const notificationDp = user.notificationDp
        const userNotificationId  = user.userNotificationId
        if(user.notification.length){
            return NextResponse.json({user:user,notifications:notifications,notificationDp:notificationDp,userNotificationId:userNotificationId,success:true,message:true})
        }else{
            return NextResponse.json({user:user,success:true,message:false})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}