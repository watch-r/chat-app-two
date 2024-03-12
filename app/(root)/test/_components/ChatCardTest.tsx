import { Chat, currentUser } from "@/types/allTypes";
import React from "react";

interface PageProps {
    chat: Chat;
    currentUser: currentUser;
}
const ChatCardTest = ({ chat, currentUser }: PageProps) => {
    return <div>ChatCardTest</div>;
};

export default ChatCardTest;
