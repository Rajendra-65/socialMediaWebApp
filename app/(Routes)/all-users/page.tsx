"use client"
import FetchFailed from '@/components/FetchFailed'
import PageLoader from '@/components/PageLoader'
import PeopleCard from '@/components/PeopleCard'
import { getUserId } from '@/service/token/tokenService'
import { getAllUsers } from '@/service/user/userServiece'
import { UserTypes } from '@/types/user'
import { getLogInUser } from '@/service/user/userServiece'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [allUsers, setAllUsers] = useState<UserTypes[]>([])
  const [currentUser, setCurrentUser] = useState<UserTypes>()
  const [fetched, setFetched] = useState<boolean>(false)
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const userId = await getUserId()
        const currentUserResponse = await getLogInUser()
        setCurrentUser(currentUserResponse.user)
        const response = await getAllUsers(userId as string)
        console.log(response)
        setAllUsers(response.users)
        setFetched(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllUser()
  }, [])
  return (
    <div className='flex flex-col place-content-center justify-center align-middle m-auto'>
      <h1 className='text-xl mb-5'>All Users</h1>
      <div className='flex flex-wrap items-start gap-6 place-content-center'>
        {
          fetched ? (fetched && !allUsers ? (<FetchFailed />) : (allUsers.map((user: UserTypes, index) => (
            <PeopleCard
              user={user as UserTypes}
              currentUser={currentUser as UserTypes}
              key={index}
            />
          )))) : (<PageLoader/>)
        }
      </div>
    </div>
  )
}

export default page