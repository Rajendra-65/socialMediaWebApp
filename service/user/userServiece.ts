import axios from "axios"
import { getUserId } from "../token/tokenService";

interface receivedValues {
    firstName:string,
    lastName:string,
    userName:string,
    email:string,
    password:string
}

interface receivedLoggedInValues{
    email:string,
    password:string
}

export const createUser = async (values:receivedValues) =>{
        try {
            const response = await axios.post('/api/create-user', JSON.stringify(values), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            console.error('Error creating user:', error);
        }
}

export const logInUser = async(values:receivedLoggedInValues) => {
    try{
        const fetchedUser  = await axios.post('/api/log-in-user',JSON.stringify(values),{headers:{
            "Content-Type":"application/json"
        }})
        return fetchedUser.data
    }catch(e){
        console.log(e)
    }
}

export const getLogInUser = async () => {
    try{
        const userId = await getUserId()
        console.log(userId)
        const response = await axios.get(`/api/get-user/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}