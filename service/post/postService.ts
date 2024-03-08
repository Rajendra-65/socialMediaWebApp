import axios from "axios"
import { getUserId } from "../token/tokenService"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

interface createPostTypes {
    user:String,
    caption:String,
    location:String,
    tags:String,
    imageUrl:String
}

export const createPost = async (data:createPostTypes) => {
    try {
        const response = await axios.post('/api/create-post', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (e) {
        console.log(e)
        return false
    }
}

export const getPost = async () => {
    try{
        const userId = await getUserId()
        const AllPosts = await axios.get(`/api/get-posts/${userId}`)
        return AllPosts.data
    }catch(e){
        console.log(e)
    }
}

export const savePost = async  (postId:mongoose.Types.ObjectId) => {
    try{
        const userId = await getUserId()
        const convertedId = new mongoose.Types.ObjectId(userId)
        // console.log(postId,typeof postId,userId,typeof convertedId)
        const response = await axios.get(`/api/save-post/${convertedId}/${postId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const likePost = async (userId:any,postId:any) => {
    try{
        console.log(typeof userId, typeof postId)
        const response = await axios.post(`/api/like-post/${userId}/${postId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}