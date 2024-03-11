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
        console.log(term)

        const matchedUser = await User.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query: term,
                        path: "userName",
                        fuzzy: { maxEdits: 2, prefixLength: 2 },
                    },
                },
            },
        ]);

        console.log(matchedUser)
        return NextResponse.json({ user: matchedUser, success: true });
        
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false });
    }
};
