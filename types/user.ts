import mongoose from "mongoose"

export interface UserTypes{
    _id:mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    posts: mongoose.Types.ObjectId[];
    likedPost: mongoose.Types.ObjectId[];
    savedPosts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    profileImage: string | null
}

export interface UserEditTypes{
    profileImage?:string;firstName:string;lastName:string;userName:string;
}