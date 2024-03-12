"use client";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { Chat, currentUser } from "@/types/allTypes";
import { useEffect, useState } from "react";
import ChatCardTest from "./ChatCardTest";
interface pageProps {
    testId?: string;
    currentUser?: currentUser;
}
const ChatListPageTest = ({ testId, currentUser }: pageProps) => {
    const [search, setSearch] = useState("");
    const [chats, setChats] = useState<Chat[]>();
    const [isLoading, setLoading] = useState(true);

    const getTheChats = async () => {
        try {
            const data = await fetch(
                search !== ""
                    ? `/api/users/${currentUser?.id}/searchChat/${search}`
                    : `/api/users/${currentUser?.id}`,
                { cache: "no-store", method: "GET" }
            ).then((response) => response.json());
            setChats(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentUser) getTheChats();
    });
    return (
        <div className='px-2'>
            <Input
                placeholder='Search Chats'
                className='my-2'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {isLoading ? (
                <Spinner />
            ) : (
                chats?.map((chat, index) => (
                    <div
                        key={index}
                        className={`p-2 hover:bg-opacity-15 hover:bg-slate-500 hover:rounded-md ${
                            chat.id === testId
                                ? "bg-opacity-15 bg-slate-500 rounded-md"
                                : ""
                        }`}
                    >
                        <p>{chat.id}</p>
                        <ChatCardTest chat={chat} currentUser={currentUser} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatListPageTest;
