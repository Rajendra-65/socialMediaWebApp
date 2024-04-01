import { getUserId } from "../token/tokenService"
import axios from "axios"

export const createMessage = async (receiverId:string,content:string) => {
    try{
        const userId = await getUserId()
        const response = await axios.post(`/api/create-message/${userId}/${receiverId}`,JSON.stringify(content),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getAllMessage = async (receiverId:string) => {
    try{
        const userId = await getUserId()
        const response = await axios.get(`/api/get-all-messages/${userId}/${receiverId}`)
        const returnableArray = response.data
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getChatUser = async (chatId:string) => {
    try{
        const response = await axios.get(`/api/get-chat-user/${chatId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const haveChat = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.get(`/api/have-chat/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}