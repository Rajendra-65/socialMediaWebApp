import axios from "axios"
import { getUserId } from "../token/tokenService"

export const createNotification = async (followerId : string) => {
    try{
        const userId = await getUserId()
        const response  = await axios.put(`/api/create-notification/${userId}/${followerId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getNotification = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.get(`/api/get-notification/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const seenNotification = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.put(`/api/seen-notification/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}