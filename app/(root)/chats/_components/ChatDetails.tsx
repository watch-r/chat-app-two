"use client";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { pusherClient } from "@/lib/pusher";
import { Chat, Message, User } from "@/types/allTypes";
import { ImagePlusIcon, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";

interface myPageProps {
    chatId: string;
}

export const ChatDetails = ({ chatId }: myPageProps) => {
    const { data: session } = useSession();
    const currentUser = session?.user;

    const [text, setText] = useState("");

    const [chat, setChat] = useState<Chat>();
    const [members, setmembers] = useState<User[]>();
    const [isLoading, setLoading] = useState(true);

    async function getChatDetails() {
        try {
            const response = await fetch(`/api/chats/${chatId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });
            const data = await response.json();
            setChat(data);
            setmembers(
                data?.members?.filter(
                    (member: User) => member.id !== currentUser?.id
                )
            );
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendText() {
        try {
            const response = await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify({
                    chatId,
                    currentUserId: currentUser?.id,
                    text,
                }),
            });
            if (response.ok) setText("");
        } catch (error) {
            console.log(error);
        }
    }

    async function sendPhoto(result: any) {
        try {
            await fetch("/api/messages", {
                method: "POST",
                body: JSON.stringify({
                    chatId,
                    currentUserId: currentUser?.id,
                    photo: result.info.secure_url,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (currentUser && chatId) getChatDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId, currentUser]);

    useEffect(() => {
        pusherClient.subscribe(chatId as string);

        const handleMessage = async (newMessage: Message) => {
            setChat((prevChat: any) => {
                return {
                    ...prevChat,
                    messages: [...prevChat?.messages!, newMessage],
                };
            });
        };
        pusherClient.bind("new-message", handleMessage);

        return () => {
            pusherClient.unsubscribe(chatId as string);
            pusherClient.unbind("new-message", handleMessage);
        };
    }, [chatId]);

    const bottomRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);

    return isLoading ? (
        <Spinner />
    ) : (
        <div className='h-screen flex flex-col'>
            <div id='chat Header' className='flex items-center p-3 gap-3'>
                {chat?.isGroup ? (
                    <>
                        <Link href={`${chatId}/group-details`}>
                            <Image
                                priority
                                className={"rounded-3xl"}
                                src={chat.groupPhoto || "/defaultgroup.jpg"}
                                alt={"Group Photo"}
                                width={40}
                                height={40}
                            />
                        </Link>
                        <div className='flex items-center'>
                            <p className='font-semibold text-xl'>
                                {chat.gname}
                            </p>
                            &#160; &#183; &#160;
                            <p className='text-sm text-gray-400'>
                                {chat.members.length} members
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <Image
                            priority
                            className={"rounded-full"}
                            src={
                                (members?.[0].image as string) ||
                                "/defaultperson.png"
                            }
                            alt={"Profile Picture of  " + members?.[0]?.name}
                            width={40}
                            height={50}
                        />
                        <p className='font-semibold text-xl'>
                            {members?.[0]?.name}
                        </p>
                    </>
                )}
            </div>
            <div
                id='chat body'
                className='p-6 h-screen bg-gray-300 bg-opacity-15 rounded-md m-1 gap-5 flex flex-col overflow-y-scroll'
            >
                {chat?.messages?.map((message, index) => (
                    <MessageCard
                        message={message}
                        key={index}
                        currentUser={currentUser}
                    />
                ))}
                <div ref={bottomRef}></div>
            </div>
            <div
                id='chat input'
                className='w-full flex items-center justify-between space-x-2 p-x-2'
            >
                <CldUploadButton
                    onUpload={sendPhoto}
                    options={{
                        maxFiles: 1,
                        sources: ["local"],
                        resourceType: "image",
                    }}
                    uploadPreset='kxyf6lgq'
                >
                    <ImagePlusIcon />
                </CldUploadButton>
                <Input
                    className={"rounded-lg w-full"}
                    placeholder='Write Message'
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    required
                />
                <Send onClick={() => sendText()} />
            </div>
        </div>
    );
};
