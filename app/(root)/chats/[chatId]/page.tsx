"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ChatDetails } from "../_components/ChatDetails";
import ChatListPage from "../_components/ChatList";
import { useParams } from "next/navigation";

const ChatDetailsPage = () => {
    const { chatId } = useParams();
    const { data: session } = useSession();
    const currentUser = session?.user;

    const seenMessages = async () => {
        try {
            await fetch(`/api/chats/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentUserId: currentUser?.id,
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentUser && chatId) {
            seenMessages();
        }
    });

    return (
        <div className='flex'>
            <div className='w-1/3 max-lg:hidden p-1'>
                <ChatListPage chatId={chatId} />
            </div>
            <div className='w-2/3 max-lg:w-full p-1'>
                <ChatDetails chatId={chatId as string} />
            </div>
        </div>
    );
};

export default ChatDetailsPage;
