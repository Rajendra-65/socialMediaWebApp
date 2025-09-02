"use client"
import FetchFailed from '@/components/FetchFailed'
import PageLoader from '@/components/SidebarLoader'
import PeopleCard from '@/components/PeopleCard'
import { getUserId } from '@/service/token/tokenService'
import { getAllUsers, makeFollow } from '@/service/user/userServiece'
import { UserTypes } from '@/types/user'
import { getLogInUser } from '@/service/user/userServiece'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { getSearchUser,setUnActive } from '@/service/user/userServiece'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import isAuth from '@/components/isAuth'
import useUserActivity from '@/app/hooks/useUserActivity'
import { CardLoader } from '@/components/CardLoader'

const Page = () => {
  const [allUsers, setAllUsers] = useState<UserTypes[]>([])
  const [currentUser, setCurrentUser] = useState<UserTypes>()
  const [fetched, setFetched] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<UserTypes[]>([])
  const [currentFollow, setCurrentFollow] = useState<boolean>(false)
  const [mounted,setIsMounted] = useState(false)
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isActive = useUserActivity()
  const params = new URLSearchParams(searchParams);
  const termLength: string | null = params.get('query')
  useEffect(() => {
    if (!isActive) {
      // User is inactive, call setUnActivity function
      setUnActive()
    }
  }, [isActive]); 
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const userId = await getUserId()
        const currentUserResponse = await getLogInUser()
        setCurrentUser(currentUserResponse.user)
        const response = await getAllUsers(userId as string)
        setAllUsers(response.users)
        setFetched(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchAllUser()
  }, [mounted])

  useEffect(()=>{
    setIsMounted(true)
  },[])

  const handleSearch = useDebouncedCallback(async (term) => {
    
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
    const userName = params.get('query')
    const response = await getSearchUser(term)
    setSearchedUsers(response.user)
    setSearchResult(true)

  }, 700);

  const handleFollowClick = async (userId: any) => {
    setCurrentFollow(!currentFollow)
    const response = await makeFollow(userId)
  }

  return (
    <div className='flex flex-col place-content-center justify-center align-middle m-auto mb-[76px]'>
      <h1 className='text-xl mb-5'>All Users</h1>
      <input
        className="px-2 py-4 border border-blue-600 rounded-md w-full bg-zinc-950 focus:border-blue-600 focus:outline-none"
        placeholder="Search an user here"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      {searchResult && termLength ? (
        <div className="w-full flex flex-col gap-3 border rounded-md px-[10px] py-[10px] mb-2 mt-2">
          {
            searchedUsers
              .filter(user => user._id !== currentUser?._id)
              .map((user: UserTypes, index) => (
                <div className="flex justify-between" key={index}>
                  <div className="flex gap-3">
                    <Image
                      src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                      height={60}
                      width={60}
                      alt="Profile Image of the User"
                    />
                    <div>
                      <h1 className="font-bold mt-4">{user.userName}</h1>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="bg-blue-600 mt-2"
                      onClick={() => { handleFollowClick(user._id) }}
                    >
                      {currentUser?.following.includes(user._id) ? (currentFollow ? "follow" : "following") : (currentFollow ? "following" : "follow")}
                    </Button>
                  </div>
                </div>
              ))
          }
        </div>
      ) : null}
      <div className='flex flex-wrap items-start gap-6 place-content-center mt-[20px]'>
        {
          fetched ? (fetched && !allUsers ? (<FetchFailed />) : (allUsers.map((user: UserTypes, index) => (
            <PeopleCard
              user={user as UserTypes}
              currentUser={currentUser as UserTypes}
              key={index}
            />
          )))) : (<CardLoader/>)
        }
      </div>
    </div>
  )
}

export default isAuth(Page)