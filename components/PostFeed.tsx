import React from 'react'
import PostCard from './PostCard'

const PostFeed = () => {
    return (
        <div className='mt-[80px] md:mt-5 md:ml-[300px] flex flex-col gap-6'>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    )
}

export default PostFeed