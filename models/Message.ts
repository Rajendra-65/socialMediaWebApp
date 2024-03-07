import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    content:{
        type:String
    }
},{timestamps:true})

export const Message = mongoose.models?.Message || mongoose.model('Message',messageSchema)