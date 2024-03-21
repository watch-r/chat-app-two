import React from "react";
import FriendRequests from "../_components/FriendRequests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";

const RequestsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const incomingSenderIds = (await fetchRedis(
        `smembers`,
        `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const sender = (await fetchRedis(
                "get",
                `user:${senderId}`
            )) as string;
            const senderParsed = JSON.parse(sender) as User;

            return {
                senderId,
                senderEmail: senderParsed.email,
            };
        })
    );
    return (
        <>
            <p className='text-3xl font-semibold'>Add a Friend</p>
            <FriendRequests
                incomingFriendRequests={incomingFriendRequests}
                sessionId={session.user.id}
            />
        </>
    );
};

export default RequestsPage;
