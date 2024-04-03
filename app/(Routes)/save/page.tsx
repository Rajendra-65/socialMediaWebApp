"use client"
import SavedPostCard from '@/components/SavedPostCard'
import React,{useEffect,useState} from 'react'
import { UserTypes } from '@/types/user'
import { savedTypes } from '@/types/saved'
import { getSavedPost } from '@/service/post/postService'
import isAuth from '@/components/isAuth'

const Page = () => {
  const [allSaved, setAllSaved] = useState<savedTypes[]>([])
  const [mounted,setIsMounted] = useState(false)
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await getSavedPost()
        setAllSaved(response.allSaved)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    setIsMounted(true)
  })

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl mb-2'>SavedPost Pages</h1>
      <div className='flex flex-wrap justify-center place-content-center items-start gap-5'>
        {
          allSaved.map((saved,index)=>(
            <SavedPostCard
              saved={saved}
              key={index}
            />
          ))
        }
        
      </div>
    </div>
  )
}

export default isAuth(Page)