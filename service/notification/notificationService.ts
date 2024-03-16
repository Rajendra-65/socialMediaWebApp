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