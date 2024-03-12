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