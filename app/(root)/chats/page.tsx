import { Metadata } from "next";
import React from "react";
import ChatList from "./_components/ChatList";
import Contacts from "../contacts/_components/Contacts";

export const metadata: Metadata = {
    title: "Chats: Chat App",
    description: "An WebApplication for chatting with Friends",
};

const ChatsPage = () => {
    return (
        <div className='flex flex-row'>
            <div className='w-1/3 max-lg:w-1/2 max-md:w-full'>
                <ChatList />
            </div>
            <div className='w-2/3 max-lg:w-1/2 max-md:hidden'>
                <Contacts />
            </div>
        </div>
    );
};

export default ChatsPage;
