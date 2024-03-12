import mongoose from "mongoose";
import { Schema } from "mongoose";

const conversationSchema = new Schema({
    sender:{
        type:mongoose.Schema.ObjectId
    },
    receiver:{
        type:mongoose.Schema.ObjectId
    },
    participants:[
        {
            type:String
        }
    ],
    inChat:[
        {
            type:String
        }
    ],
    unreadMessages:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    lastMessage:{
        type:String
    }
},{timestamps:true})

export const Conversation = mongoose.models?.Conversation || mongoose.model('Conversation',conversationSchema)