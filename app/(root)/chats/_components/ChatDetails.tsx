import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { Chat, User } from "@/types/allTypes";
import { ImagePlusIcon, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import MessageCard from "./MessageCard";

interface myPageProps {
    chatId: string | string[];
}

export const ChatDetails = ({ chatId }: myPageProps) => {
    const { data: session } = useSession();
    const currentUser = session?.user;

    const [text, setText] = useState("");

    const [chat, setChat] = useState<Chat>();
    const [members, setmembers] = useState<User[]>();
    const { data: chats, isLoading } = useSWR<Chat>(
        `/api/chats/${chatId}`,
        fetcher
    );

    useEffect(() => {
        if (currentUser && chatId) {
            setChat(chats as Chat);
            setmembers(
                chats?.members?.filter((member) => member.id !== currentUser.id)
            );
        }
    }, [chatId, chats, currentUser]);

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

    return isLoading ? (
        <Spinner />
    ) : (
        <div className='h-screen flex flex-col'>
            <div id='chat Header' className='flex items-center p-3 gap-3'>
                {chat?.isGroup ? (
                    <>
                        <Link href={`${chatId}/group-details`}>
                            <Image
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
            </div>
            <div
                id='chat input'
                className='w-full flex items-center justify-between space-x-2 p-x-2'
            >
                <CldUploadButton
                    onUpload={sendPhoto}
                    options={{
                        maxFiles: 1,
                        cropping: true,
                        sources: ["local"],
                        resourceType: "image",
                    }}
                    uploadPreset='ffsyomdz'
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
