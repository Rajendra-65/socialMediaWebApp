import axios from "axios"
import { getUserId } from "../token/tokenService"

export const getConversations = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.get(`/api/get-conversation/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const seenConversation = async (receiverId:string) => {
    try{
        const userId = await getUserId()
        const response= await axios.put(`/api/mark-read/${userId}/${receiverId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const pushToChat = async (receiverId:string) => {
    try{
        const userId = await getUserId()
        const response= await axios.put(`/api/push-to-chat/${userId}/${receiverId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const RemoveFromChat = async (receiverId:string) => {
    try{
        const userId = await getUserId()
        const response= await axios.put(`/api/remove-from-chat/${userId}/${receiverId}`)
        return response.data
    }catch(e){

    }
} 