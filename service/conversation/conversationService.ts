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