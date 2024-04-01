import { User } from "@/models/User"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

interface ParamsType {
    Id:string
}

export const PUT = async (request:any,{params}:{params:ParamsType}) => {
    try{
        const {Id} = params
        const objectId = new mongoose.Types.ObjectId(Id)
        const user = await User.findById(objectId)
        if(user){
            user.notification = []
            user.notificationDp = []
            user.userNotificationId = []
        }
        await user.save()
        return NextResponse.json({user:user,seen:true,success:true})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}