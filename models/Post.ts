import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    imageUrl:{
        type:String,
    },
    caption:{
        type:String,
    },
    location:{
        type:String,
    },
    tags:{
        type:String,
    },
    like:{
        type:Number,
        default:0
    },
    likedBy:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ],
},{
    timestamps:true
})

export const Post = mongoose.models?.Post || mongoose.model('Post',postSchema)