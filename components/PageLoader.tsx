import React from 'react'
import { Loader } from 'lucide-react'
const PageLoader = () => {
  return (
    <div className='w-[200px] h-[200px]'>
        <Loader className='w-[200px] h-[200px] animate-spin'/>
    </div>
  )
}

export default PageLoader