import { User } from "@/models/User"
import { connectDb } from "@/utils/connectDb"
import { NextResponse } from "next/server"

export const POST = async (request:any) => {
    try{
        await connectDb()
        const data = await request.json()
        const user = await User.create(data)
        const existingUser = await User.findOne({ userName: data.userName })
        if (existingUser) {
            return NextResponse.json({ success: false, duplicate: true });
        }else{
            user.save()
            return NextResponse.json({success:true,data:user})
        }
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}