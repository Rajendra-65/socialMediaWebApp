import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[
        {
            type:String
        }
    ],
    likedPost:[
        {
            type:String
        }
    ],
    savedPosts:[
        {
            type:String
        }
    ],
    followers:[
        {
            type:String
        }
    ],
    following:[
        {
            type:String
        }
    ],
    profileImage:{
        type:String
    },
})

export const User = mongoose.models?.User || mongoose.model('User',userSchema)