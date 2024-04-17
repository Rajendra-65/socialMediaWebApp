"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getSearchUser } from "@/service/user/userServiece";
import { UserTypes } from "@/types/user";
import { getConversations } from "@/service/conversation/conversationService";
import PageLoader from "@/components/PageLoader";
import { getUserId } from "@/service/token/tokenService";
import { formatDistanceToNow } from 'date-fns';
import { pusherClient } from "@/lib/pusher";
import isAuth from "@/components/isAuth";
import { setUnActive } from "@/service/user/userServiece";
import useUserActivity from "@/app/hooks/useUserActivity";
interface ConversationUsersType {
    _id:string;
    userName:string;
    profileImage:string;
}

interface ConversationTypes {
  _id:string
  user:string;
  lastMessage:string;
  lastMessageTime:Date;
  unreadMessages:Number;
  createdAt:string;
  updatedAt:string;
}

const Page = () => {
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const [fetched,setFetched] = useState<boolean>(false)
  const [mounted,setIsMounted] = useState(false)
  const [currentUserId,setCurrentUserId] = useState<string>()
  const [realTime,setRealTime] = useState<boolean>(false)
  const [realTimeChatId,setRealTimeChatId] = useState()
  const [messageNumber,setMessageNumber] = useState<number>(0)
  const [updatedAtDate, setUpdatedAtDate] = useState<Date | null>(null)
  const [searchedUsers,setSearchedUsers] = useState<UserTypes[]>([])
  const [conversations,setConversations] = useState<ConversationTypes[]>([])
  const [users,setUsers] = useState<ConversationUsersType[]>([])
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()
  const isActive = useUserActivity()
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const termLength:string | null = params.get('query')
  
  const LiveConversationUpdate = async (data:any) => {
    setRealTime(true)
    setMessageNumber(prevNumber => prevNumber + 1)
    const newDate = new Date();
    setUpdatedAtDate(newDate);
    setRealTimeChatId(data)
  }
  
  useEffect(() => {
    setSearchResult(true);
  }, []);

  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    const fetchConversation = async () => {
      try{
        const userId = await getUserId()
        setCurrentUserId(userId)
        const response = await getConversations()
        setConversations(response.conversations)
        setUsers(response.users)
        setFetched(true)
      }catch(e){
        console.log(e)
      }
    }
    fetchConversation()
  },[])

  useEffect(()=>{
    if(currentUserId){
      pusherClient.subscribe(currentUserId!)
      pusherClient.bind('conversation:update',LiveConversationUpdate)
    }
    return () => {
      if(currentUserId){
        pusherClient.unsubscribe(currentUserId!)
        pusherClient.unbind('conversation:update', LiveConversationUpdate)
      }
  }
  },[currentUserId,fetched])

  useEffect(() => {
    if (!isActive) {
      // User is inactive, call setUnActivity function
      setUnActive()
    }
  }, [isActive]); 

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

  }, 700);

  const handleMessageClick = async (userId:any) => {
    router.push(`chat/${userId}`)
  }

  return (
    <>
      <h1 className="text-xl mb-4">Your Members To Chat</h1>
      <div className="flex flex-col items-center justify-center place-content-center align-middle gap-3">
        <div className="w-full bg-zinc-950 flex flex-col gap-7 overflow-y-auto">
          <input
            className="px-2 py-4 border border-blue-600 rounded-md w-full bg-zinc-950 focus:border-blue-600 focus:outline-none"
            placeholder="Search an user here"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
          {searchResult && termLength ? (
            <div className="w-full flex flex-col gap-3 border rounded-md px-[10px] py-[10px]">
              {
                searchedUsers.map((user:UserTypes,index)=>(
                  <div 
                    className="flex justify-between"
                    key={index}
                  >
                <div className="flex gap-3">
                  <Image
                    src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
                    height={60}
                    width={60}
                    style={{borderRadius:"50%"}}
                    alt="Profile Image of the User"
                  />
                  <div>
                    <h1 className="font-bold mt-4">{user.userName}</h1>
                  </div>
                </div>
                <div>
                  <Button 
                    className="bg-blue-600 mt-2"
                    onClick={()=>{handleMessageClick(user._id)}}
                  >Message</Button>
                </div>
              </div>
                ))
              }
            </div>
          ) : null}
          {fetched ? (conversations.map((conversation:ConversationTypes,index)=>(
            <div className="flex justify-between cursor-pointer" onClick={()=>{
              router.push(`/chat/${users[index]._id}`)
            }}
              key={conversation._id}
            >
              <div className="flex gap-3">
                <Image
                  src={users[index].profileImage || "/assets/icons/profile-placeholder.svg"}
                  height={60}
                  width={60}
                  alt="Profile Image of the User"
                />
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold">{users[index].userName}</h1>
                    <h1 className="font-bold">{conversation.user === currentUserId ? "message sent" : conversation.unreadMessages === 0 && !realTime ? 'message Received' :conversation._id.toString() === realTimeChatId && realTime ? `${messageNumber} new messages` :`${conversation.unreadMessages} new Message` }</h1>
                  </div>
                  <div className="mt-7">
                    <h1 className="text-base">{conversation._id.toString() === realTimeChatId && realTime ? (formatDistanceToNow(updatedAtDate! , { addSuffix: true })) : (formatDistanceToNow(new Date(conversation.lastMessageTime) , { addSuffix: true }))}</h1>
                  </div>
                </div>
              </div>
              <div>
                <BellRing className="text-blue-600 mr-2 mt-3" />
              </div>
            </div>
          ))) : (<PageLoader/>)}
        </div>
      </div>
    </>
  );
};

export default isAuth(Page);
