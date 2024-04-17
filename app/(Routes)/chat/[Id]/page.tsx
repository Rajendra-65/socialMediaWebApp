"use client";

import {
    ArrowLeft,
    ArrowRight,
    Camera,
    Clock3,
    Phone,
    SendHorizonal,
    Video,
} from "lucide-react";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
    createMessage,
    getAllMessage,
    getChatUser,
} from "../../../../service/chat/chatServices";
import { UserTypes } from "@/types/user";
import { getActiveStatus, getLogInUser } from "@/service/user/userServiece";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import FetchFailed from "@/components/FetchFailed";
import { RemoveFromChat, pushToChat, seenConversation } from "@/service/conversation/conversationService";
import { usePathname, useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import PageLoader from "@/components/PageLoader";
import useUserActivity from "@/app/hooks/useUserActivity";
import { setUnActive } from "@/service/user/userServiece";

interface paramsType {
    Id: string;
}

const Page = ({ params }: { params: paramsType }) => {
    const [pending, setPending] = useState<boolean>(false)
    const [recent, setRecent] = useState<boolean>(false)
    const [realTime, setRealTime] = useState<boolean>(false)
    const [fetched, setFetched] = useState<boolean>(false);
    const [activeNow, setActiveNow] = useState<boolean>(false)
    const [lastActive, setLastActive] = useState(Date)
    const [receiverId, setReceiverId] = useState<string>()
    const [prevMessages, setPrevMessages] = useState([]);
    const [recentMessages, setRecentMessages] = useState([])
    const [realTimeMessages, setRealTimeMessages] = useState([])
    const [message, setMessage] = useState<string>();
    const [currentUser, setCurrentUser] = useState<UserTypes>();
    const [chatUser, setChatUser] = useState<UserTypes>()
    const router = useRouter()
    const isActive = useUserActivity()
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const pathName = usePathname()
    const { Id } = params;

    const handleArrowClick = async () => {
        try {
            await RemoveFromChat(Id)
            router.push(`/chat`)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!isActive) {
          // User is inactive, call setUnActivity function
          setUnActive()
        }
      }, [isActive]); 

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { Id } = params;
                const response = await getLogInUser();
                setCurrentUser(response.user);
                await pushToChat(Id)
                const chatUserResponse = await getChatUser(Id)
                setChatUser(chatUserResponse.user)
                const messageResponse = await getAllMessage(Id);
                // @ts-ignore
                setPrevMessages((prevMessages) => [
                    ...prevMessages,
                    messageResponse.message,
                ]);
                if (Id) {
                    const activeResponse = await getActiveStatus(Id)
                    if (activeResponse.time) {
                        setLastActive(activeResponse.time)
                    }
                }
                setFetched(true);

            } catch (e) {
                console.log(e);
            }
        };
        fetchCurrentUser();

    }, []);

    useEffect(() => {
        const id = Id
        setRealTime(false)

        const messageHandler = (message: any) => {
            setRealTime(true)
            setReceiverId(message.receiver)
            setRealTimeMessages((current: any) => {
                if (find(current, { id: message.sender })) {
                    return current
                }
                return [...current, message.content]
            })

        }

        const ActiveStatusHandler = (data: any) => {
            if (!data) {
                setActiveNow(true)
            } else {
                setActiveNow(false)
                setLastActive(data)
            }
        }

        pusherClient.subscribe(id)
        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('active:status', ActiveStatusHandler)
        return () => {
            pusherClient.unsubscribe(id)
            pusherClient.unbind('active:status', ActiveStatusHandler)
            pusherClient.unbind('messages:new', messageHandler)
        }
    }, [Id])

    useEffect(() => {
        return () => {
            seenConversation(Id)
        }
    }, [router, Id])

    useEffect(() => {
        const handleBeforeUnload = async () => {
            await RemoveFromChat(Id);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [pathName, router, Id])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [realTimeMessages, prevMessages, recentMessages, realTime, chatContainerRef.current]);

    const sendClick = async () => {
        const content = message;
        setMessage("");
        setRealTime(false)
        // @ts-ignore
        setRecentMessages((prevMessages) => [...prevMessages, content]);
        setPending(true)
        try {
            const response = await createMessage(Id, content as string);
            // @ts-ignore
            if (response.message) {
                setPending(false)
            }
        } catch (e) {
            console.log(e);
        }
        setRecent(false)
    };

    return (
        <>
            {fetched && chatUser ? (
                <div className="w-full bg-zinc-950 border rounded-md h-[74vh] md:h-[94vh] ">
                    <div className="flex w-full border px-2 py-2 gap-2 justify-between top-0">
                        <div className="flex">
                            <div>
                                <ArrowLeft
                                    className="w-8 h-8 text-white mt-[9px] cursor-pointer"
                                    onClick={() => { handleArrowClick() }}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Image
                                    src={chatUser.profileImage || "/assets/icons/profile-placeholder.svg"}
                                    width={50}
                                    height={50}
                                    alt="ProfilePlaceholder"
                                    style={{borderRadius:"50%"}}
                                    className="cursor-pointer"
                                />
                                <div>
                                    <h1 className="font-bold">{chatUser.userName}</h1>
                                    <h1 className="font-normal">
                                        {
                                            activeNow ? (
                                                <div className="flex gap-1">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-600 mt-2" />
                                                    <h1 className='text-xs mt-1'>Active Now</h1>
                                                </div>
                                            ) : (
                                                <div className="flex gap-1">
                                                    <h1>Active</h1>
                                                    {formatDistanceToNow(new Date(lastActive), { addSuffix: true })}
                                                </div>
                                            )
                                        }
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-[11px]">
                            <Phone className="w-8 h-8 text-white cursor-pointer" onClick={()=>{alert('we will activate this phone call soon')}}/>
                            <Video className="w-8 h-8 text-white cursor-pointer"  onClick={()=>{alert('we will activate this video call soon')}}/>
                        </div>
                    </div>
                    <div className="w-full border mb-[66px] h-[56vh] md:h-[76vh] overflow-y-auto " ref={chatContainerRef}>
                        <div className="mt-4 " ref={chatContainerRef}>
                            <>
                                {
                                    // @ts-ignore
                                    prevMessages[0].map((message: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex p-1 rounded-lg w-full pb-[15px] ${message.sender === currentUser?._id ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className="border border-gray-100 p-[10px] rounded-md">{message.content}</div>
                                        </div>
                                    ))
                                }
                                {
                                    recentMessages ? recentMessages.map((message: any, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-1 rounded-lg w-full pb-[15px] justify-end`}
                                        >
                                            <div className="border border-gray-100 p-[10px] rounded-md flex gap-1">
                                                <div>{message}</div>
                                                <div className="text-center align-center mt-[-7px]">
                                                    {pending && index === recentMessages.length - 1 ? (
                                                        <Clock3 className="w-6 h-6 text-white text-center" />
                                                    ) : (
                                                        index === recentMessages.length - 1 ? (<ArrowRight className="w-6 h-6 text-white text-center mt-2" />) : null
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )) : null
                                }
                                {
                                    realTime && receiverId?.toString() === currentUser?._id.toString() ? realTimeMessages.map((message: any, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-1 rounded-lg w-full pb-[15px] justify-start`}
                                        >
                                            <div className="border border-gray-100 p-[10px] rounded-md flex gap-1">
                                                <div>{message}</div>
                                            </div>
                                        </div>)) : null
                                }
                            </>
                            <div className={`flex border px-2 py-2 rounded-md absolute mb-[65px] md:mb-[16px] lg:mb-[20px] bottom-0 justify-between bg-zinc-950`} style={{ width: '-webkit-fill-available', marginRight: '41px' }}>
                                <div className="flex w-fit gap-[8px]">
                                    <Camera className="w-8 h-8 text-white cursor-pointer" />
                                    <input
                                        className="rounded-md w-[60vw] md:w-[50vw]"
                                        placeholder="Message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <SendHorizonal
                                        className="w-8 h-8 text-blue-700 cursor-pointer"
                                        onClick={() => {
                                            sendClick();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : fetched && !chatUser ? <FetchFailed /> : <PageLoader />}
        </>
    );
};

export default Page;
