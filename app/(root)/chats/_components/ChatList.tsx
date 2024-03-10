"use client";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ChatCard from "./ChatCard";
import { Chat } from "@/types/allTypes";

interface PageProps {
    chatId?: string | string[];
}

const ChatListPage = ({ chatId }: PageProps) => {
    const { data: session } = useSession();
    const currentUser = session?.user;

    const [search, setSearch] = useState("");
    const [chats, setChats] = useState<Chat[]>();
    const [isLoading, setLoading] = useState(true);

    // const { data: userChats, isLoading } = useSWR<Chat[]>(fetcher);

    const getChats = async () => {
        try {
            const response = await fetch(
                search !== ""
                    ? `/api/users/${currentUser?.id}/searchChat/${search}`
                    : `/api/users/${currentUser?.id}`,
                { cache: "no-store" }
            );
            const data = await response.json();
            setChats(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            getChats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, search]);
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
                            chat.id === chatId
                                ? "bg-opacity-15 bg-slate-500 rounded-md"
                                : ""
                        }`}
                    >
                        <ChatCard chat={chat} currentUser={currentUser} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatListPage;
