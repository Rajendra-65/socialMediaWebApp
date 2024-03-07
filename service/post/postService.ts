import axios from "axios"
import { getUserId } from "../token/tokenService"

interface createPostTypes {
    user?:String,
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