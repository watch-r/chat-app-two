"use client";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ChatCard from "./ChatCard";
import { Chat } from "@/types/allTypes";

const ChatListPage = () => {
    const { data: session } = useSession();
    const currentUser = session?.user;

    const [search, setSearch] = useState("");
    const [chats, setChats] = useState<Chat[]>();
    const { data: userChats, isLoading } = useSWR<Chat[]>(
        search !== ""
            ? `/api/users/${currentUser?.id}/searchChat/${search}`
            : `/api/users/${currentUser?.id}`,
        fetcher
    );

    useEffect(() => {
        if (currentUser) {
            setChats(userChats);
        }
    }, [currentUser, userChats]);
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
                        className='p-2 hover:bg-opacity-15 hover:bg-slate-500 hover:rounded-md'
                    >
                        <ChatCard chat={chat} currentUser={currentUser} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatListPage;
