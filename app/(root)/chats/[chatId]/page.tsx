import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ChatDetails } from "../_components/ChatDetails";
import ChatListPage from "../_components/ChatList";
import { notFound, useParams } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { checkEnvironment } from "@/lib/environment";

interface pageProps {
    params: { chatId: string };
}

const ChatDetailsPage = async ({ params }: pageProps) => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const currentUser = session.user;
    
    if (currentUser && params.chatId) {
        try {
            // This will throw() an error if the URL is not valid
            await fetch(`${checkEnvironment()}/api/chats/${params.chatId}`, {
                method: "POST",
                body: JSON.stringify({
                    currentUserId: currentUser?.id,
                }),
            });
        } catch (error) {
            console.log(`Found Error: ${error}`);
        }
    }

    return (
        <div className='flex'>
            <div className='w-1/3 max-lg:hidden p-1'>
                <ChatListPage chatId={params.chatId} />
            </div>
            <div className='w-2/3 max-lg:w-full p-1'>
                <ChatDetails chatId={params.chatId as string} />
            </div>
        </div>
    );
};

export default ChatDetailsPage;
