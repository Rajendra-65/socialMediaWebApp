import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDb } from "@/utils/connectDb";

interface paramsType {
    term: string;
}

export const GET = async (request: any, { params }: { params: paramsType }) => {
    try {
        await connectDb();
        const { term } = params;
        const matchedUser = await User.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query: term,
                        path: "userName",
                    },
                },
            },
        ]);
        if(matchedUser.length){
            return NextResponse.json({ user: matchedUser, success: true,available:false });
        }else{
            return NextResponse.json({success:true,available:true})
        }
        
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false });
    }
};
