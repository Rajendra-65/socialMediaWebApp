import mongoose from "mongoose";

export interface savedTypes {
    profileImage ? : string;
    imageUrl : string;
    _id:mongoose.Types.ObjectId
}