import mongoose from "mongoose";

export interface PostTypes {
    _id:mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    imageUrl?: string;
    caption?: string;
    location?: string;
    tags?: string;
    like?: number;
    likedBy?: mongoose.Types.ObjectId[];
    createdAt:Date;
    updatedAt:Date;
}

export interface EditPostTypes {
    _id?:string;
    caption?:string;
    location?:string;
    tags?:string;
}