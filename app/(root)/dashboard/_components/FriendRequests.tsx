"use client";
import { Button } from "@/components/ui/button";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { UserCheckIcon, UserMinus2, UserPlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageProps {
    incomingFriendRequests: IncomingFriendRequest[];
    sessionId: string;
}

const FriendRequests = ({ incomingFriendRequests, sessionId }: PageProps) => {
    // console.log(sessionId);
    const router = useRouter();
    const [friendRequests, setFriendRequests] = useState<
        IncomingFriendRequest[]
    >(incomingFriendRequests);

    const acceptFriend = async (senderId: string) => {
        await axios.post("/api/friends/accept", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();
    };

    const denyFriend = async (senderId: string) => {
        await axios.post("/api/friends/deny", { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();
    };

    useEffect(() => {
        pusherClient.subscribe(
            toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        );

        const friendRequestHandler = ({
            senderId,
            senderEmail,
        }: IncomingFriendRequest) => {
            setFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
        };

        pusherClient.bind("incoming_friend_requests", friendRequestHandler);

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            );
            pusherClient.unbind(
                "incoming_friend_requests",
                friendRequestHandler
            );
        };
    }, [sessionId]);

    return (
        <>
            {friendRequests.length === 0 ? (
                <p className='text-gray-500 text-lg'>
                    No Friend Requests to Show
                </p>
            ) : (
                friendRequests.map((request) => (
                    <div
                        key={request.senderId}
                        className='flex flex-row items-center space-x-3 pt-5'
                    >
                        <UserPlus2 className='outline-1 outline rounded-full' />
                        <p>{request.senderEmail}</p>
                        <Button onClick={() => acceptFriend(request.senderId)}>
                            <UserCheckIcon />
                        </Button>
                        <Button
                            variant={"destructive"}
                            onClick={() => denyFriend(request.senderId)}
                        >
                            <UserMinus2 />
                        </Button>
                    </div>
                ))
            )}
        </>
    );
};

export default FriendRequests;
