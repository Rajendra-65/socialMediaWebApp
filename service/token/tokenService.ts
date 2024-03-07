import { jwtDecode } from "jwt-decode"
import mongoose from "mongoose"

export const getUserId = async () => {
    try{
        const token = window.localStorage.getItem('authToken')
        const decodedToken = jwtDecode(token)
        const Id = decodedToken._id
        console.log('decodedId from token is',Id)
        return Id 
    }catch(e){
        console.log(e)
    }
}