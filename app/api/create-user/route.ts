import { User } from "@/models/User"
import { connectDb } from "@/utils/connectDb"
import { NextResponse } from "next/server"

export const POST = async (request:any) => {
    try{
        console.log("api route Reached...")
        await connectDb()
        const data = await request.json()
        console.log(data)
        const user = await User.create(data)
        user.save()
        console.log(user)
        return NextResponse.json({success:true,data:user})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false})
    }
}