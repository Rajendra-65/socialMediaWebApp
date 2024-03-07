import PeopleCard from '@/components/PeopleCard'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col place-content-center justify-center align-middle m-auto'>
      <h1 className='text-xl mb-5'>All Users</h1>
      <div className='flex flex-wrap items-start gap-6'>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
      </div>
    </div>
  )
}

export default page