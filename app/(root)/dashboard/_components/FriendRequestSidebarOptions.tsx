"use client";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface FriendRequestSidebarOptionsProps {
    sessionId: string;
    initialUnseenRequestCount: number;
}

const FriendRequestSidebarOptions = ({
    sessionId,
    initialUnseenRequestCount,
}: FriendRequestSidebarOptionsProps) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
        initialUnseenRequestCount
    );

    useEffect(() => {
        pusherClient.subscribe(
            toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        );
        pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

        const friendRequestHandler = () => {
            setUnseenRequestCount((prev) => prev + 1);
        };

        const addedFriendHandler = () => {
            setUnseenRequestCount((prev) => prev - 1);
        };

        pusherClient.bind("incoming_friend_requests", friendRequestHandler);
        pusherClient.bind("new_friend", addedFriendHandler);

        return () => {
            pusherClient.unsubscribe(
                toPusherKey(`user:${sessionId}:incoming_friend_requests`)
            );
            pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

            pusherClient.unbind("new_friend", addedFriendHandler);
            pusherClient.unbind(
                "incoming_friend_requests",
                friendRequestHandler
            );
        };
    }, [sessionId]);

    return (
        <Link
            href='/dashboard/requests'
            className='flex flex-row items-center space-x-2'
        >
            <div className='rounded-full'>
                <UserCircleIcon className='h-4 w-4' />
            </div>
            <p className='truncate'>Friend requests</p>

            {unseenRequestCount > 0 ? (
                <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center'>
                    {unseenRequestCount}
                </div>
            ) : null}
        </Link>
    );
};

export default FriendRequestSidebarOptions;
