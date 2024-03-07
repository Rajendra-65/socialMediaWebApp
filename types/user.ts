import mongoose from "mongoose"

export interface UserTypes{
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
