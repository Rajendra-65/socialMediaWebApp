"use client";

import {
    ArrowBigLeft,
    ArrowLeft,
    ArrowRight,
    Camera,
    Clock3,
    Phone,
    SendHorizonal,
    Video,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    createMessage,
    getAllMessage,
    getChatUser,
} from "../../../../service/chat/chatServices";
import { UserTypes } from "@/types/user";
import { getLogInUser } from "@/service/user/userServiece";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import FetchFailed from "@/components/FetchFailed";
import { seenConversation } from "@/service/conversation/conversationService";
import { useRouter } from "next/router";

interface paramsType {
    Id: string;
}

const page = ({ params }: { params: paramsType }) => {
    const [prevMessages, setPrevMessages] = useState([]);
    const [pending, setPending] = useState<boolean>(false)
    const [recentMessages, setRecentMessages] = useState([])
    const [recent, setRecent] = useState<boolean>(false)
    const [realTimeMessages, setRealTimeMessages] = useState([])
    const [realTime, setRealTime] = useState<boolean>(false)
    const [message, setMessage] = useState<string>();
    const [currentUser, setCurrentUser] = useState<UserTypes>();
    const [chatUser,setChatUser] = useState<UserTypes>()
    const [fetched, setFetched] = useState<boolean>(false);
    const router = useRouter()
    
    const { Id } = params;

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { Id } = params;
                const response = await getLogInUser();
                setCurrentUser(response.user);
                const chatUserResponse = await getChatUser(Id)
                setChatUser(chatUserResponse.user)
                const messageResponse = await getAllMessage(Id);
                // @ts-ignore
                setPrevMessages((prevMessages) => [
                    ...prevMessages,
                    messageResponse.message,
                ]);
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
            setRealTimeMessages((current: any) => {
                if (find(current, { id: message.sender })) {
                    return current
                }
                return [...current, message.content]
            })
        }
        pusherClient.subscribe(id)
        pusherClient.bind('messages:new', messageHandler)
        return () => {
            pusherClient.unsubscribe(id)
            pusherClient.unbind('messages:new', messageHandler)
        }
    }, [Id])

    useEffect(()=>{
        return()=>{
            seenConversation(Id)
        }
    },[router,Id])

    const sendClick = async () => {
        const content = message;
        setMessage("");
        setRealTime(false)
        // @ts-ignore
        setRecentMessages((prevMessages) => [...prevMessages, content]);
        setPending(true)
        console.log(content);
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
                                <ArrowLeft className="w-8 h-8 text-white mt-[9px]" />
                            </div>
                            <div className="flex gap-2">
                                <Image
                                    src={chatUser.profileImage || "/assets/icons/profile-placeholder.svg"}
                                    width={50}
                                    height={50}
                                    alt="ProfilePlaceholder"
                                />
                                <div>
                                    <h1 className="font-bold">{chatUser.userName}</h1>
                                    <h1 className="font-normal">2 Active Now</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-[11px]">
                            <Phone className="w-8 h-8 text-white" />
                            <Video className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <div className="w-full border mb-[66px] h-[56vh] md:h-[76vh] overflow-y-auto">
                        <div className="mt-4 ">
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
                                    !realTime ? recentMessages.map((message: any, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-1 rounded-lg w-full pb-[15px] justify-end`}
                                        >
                                            <div className="border border-gray-100 p-[10px] rounded-md flex gap-1">
                                                <div>{message}</div>
                                                <div className="text-center align-center mt-[-7px]">
                                                    {pending ? (
                                                        <Clock3 className="w-6 h-6 text-white text-center" />
                                                    ) : (
                                                        <ArrowRight className="w-6 h-6 text-white text-center mt-2" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )) : realTimeMessages.map((message: any, index) => (
                                        <div
                                            key={index}
                                            className={`flex p-1 rounded-lg w-full pb-[15px] justify-start`}
                                        >
                                            <div className="border border-gray-100 p-[10px] rounded-md flex gap-1">
                                                <div>{message}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        </div>
                    </div>
                    <div className="flex  border px-2 py-2 rounded-md absolute mb-[89px] md:mb-[20px]  md:w-[62vw] w-[94vw] bottom-0 justify-between bg-zinc-950">
                        <div className="flex w-[85vw] gap-[8px]">
                            <Camera className="w-8 h-8 text-white" />
                            <input
                                className="rounded-md w-[60vw] md:w-[50vw]"
                                placeholder="Message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div>
                            <SendHorizonal
                                className="w-8 h-8 text-blue-700"
                                onClick={() => {
                                    sendClick();
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : fetched && !chatUser ? <FetchFailed/> : null }
        </>
    );
};

export default page;
