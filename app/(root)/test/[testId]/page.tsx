import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import ChatListPageTest from "../_components/ChatListPageTest";
import ChatDetailsPageTest from "../_components/ChatDetailsPageTest";

interface pageProps {
    params: { testId: string };
}

const TestIdPage = async ({ params }: pageProps) => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const currentUser = session.user;

    if (currentUser && params.testId) {
        try {
            await fetch(`/api/chats/${params.testId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
                <ChatListPageTest testId={params.testId} />
            </div>
            <div className='w-2/3 max-lg:w-full p-1'>
                <ChatDetailsPageTest testId={params.testId} />
            </div>
        </div>
    );
};

export default TestIdPage;
