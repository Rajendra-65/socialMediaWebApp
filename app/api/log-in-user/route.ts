import { User } from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { connectDb } from "@/utils/connectDb"
import jwt from "jsonwebtoken"

export const POST = async (request: any) => {
    try {
        await connectDb()
        const data = await request.json()
        const user = await User.find({ email: data.email }).select({ _id: 1, userName: 1, password: 1 })
        console.log("founded User is ", user)
        if (user.length) {
            const verified = await bcrypt.compare(data.password, user[0].password)
            console.log(process.env.jWT_KEY)
            if (verified) {
                const token = jwt.sign(
                    {
                        _id: user[0]._id,
                    }
                    , process.env.JWT_KEY
                )
                console.log(token)
                return NextResponse.json({ success: true, logIn: true, user: user[0], token: token })
            }
            if (!verified) {
                return NextResponse.json({ success: false, logIn: false })
            }
        }else{
            return NextResponse.json({found:false})
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false })
    }
}