import mongoose from "mongoose"

export interface UserTypes{
    _id:mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    active:boolean;
    lastActiveTime:Date;
    posts: mongoose.Types.ObjectId[];
    likedPost: mongoose.Types.ObjectId[];
    savedPosts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    profileImage: string | null;
    notification:string[] | null;
    notificationDp:string[] | null;
    userNotificationId:string[] | null;
}

export interface UserEditTypes{
    profileImage?:string;
    firstName:string;
    lastName:string;
    userName:string;
}

export interface AllUsersTypes{
    _id:string;
    profileImage?:string;
    userName:string;
}