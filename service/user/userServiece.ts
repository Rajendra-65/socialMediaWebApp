import axios from "axios"
import { getUserId } from "../token/tokenService";
import mongoose from "mongoose";
import { UserEditTypes } from "@/types/user";

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

export const editProfile = async (userId:string) => {
    try{
        console.log(userId, typeof userId)
        const response = await axios.get(`/api/edit-profile/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const updateUser = async (values:UserEditTypes) => {
    try{
        const Id = await getUserId()
        const response = await axios.put(`/api/update-user/${Id}`,JSON.stringify(values))
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getAllUsers = async (userId:string) => {
    try{
        const response = await axios.get(`/api/get-all-users/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const makeFollow = async (followingId:string) => {
    try{
        const userId = await getUserId()
        const response = await axios.put(`/api/make-follow/${userId}/${followingId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getSearchUser = async (term:string) =>{
    try{
        const response = await axios.get(`/api/get-search-user/${term}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const getActiveStatus = async (secondUserId:string) => {
    try{
        const response = await axios.get(`/api/get-active-status/${secondUserId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const setActive = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.put(`/api/set-active/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}

export const setUnActive = async () => {
    try{
        const userId = await getUserId()
        const response = await axios.put(`/api/set-un-active/${userId}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}