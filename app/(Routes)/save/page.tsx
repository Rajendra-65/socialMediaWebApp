import SavedPostCard from '@/components/SavedPostCard'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl mb-2'>SavedPost Pages</h1>
      <div className='flex flex-wrap justify-center place-content-center items-start gap-5'>
        <SavedPostCard/>
        <SavedPostCard/>
        <SavedPostCard/>
        <SavedPostCard/>
        <SavedPostCard/>
      </div>
    </div>
  )
}

export default page