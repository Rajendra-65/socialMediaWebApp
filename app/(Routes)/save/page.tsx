"use client"
import SavedPostCard from '@/components/SavedPostCard'
import React,{useEffect,useState} from 'react'
import { UserTypes } from '@/types/user'
import { savedTypes } from '@/types/saved'
import { getSavedPost } from '@/service/post/postService'

const page = () => {
  const [allSaved, setAllSaved] = useState<savedTypes[]>([])
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await getSavedPost()
        console.log(response.allSaved)
        setAllSaved(response.allSaved)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl mb-2'>SavedPost Pages</h1>
      <div className='flex flex-wrap justify-center place-content-center items-start gap-5'>
        {
          allSaved.map((saved)=>(
            <SavedPostCard
              saved={saved}
            />
          ))
        }
        
      </div>
    </div>
  )
}

export default page