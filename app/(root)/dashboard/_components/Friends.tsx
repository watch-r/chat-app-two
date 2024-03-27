"use client";
import { Input } from "@/components/ui/input";
import { chatHrefConstructor, fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
// import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";

type Friend = {
    id: string;
    name: string;
    email?: string;
    image?: string;
};

const Friends = () => {
    const { data: session } = useSession();
    // if (!session) notFound();

    const currentUser = session?.user;

    const router = useRouter();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);

    const [search, setSearch] = useState("");
    const {
        data: usersAll,
        error,
        isLoading,
    } = useSWR<Friend[]>(
        search !== "" ? `/api/friends/search/${search}` : "/api/friends",
        fetcher
    );
    const handleSelect = (friend: Friend) => {
        setSelectedFriends((prevSelectedFriends) =>
            prevSelectedFriends.includes(friend)
                ? prevSelectedFriends.filter((item) => item !== friend)
                : [...prevSelectedFriends, friend]
        );
    };
    const handleChat = async () =>
        router.push(
            `/dashboard/chat/${chatHrefConstructor(
                session?.user?.id as string,
                selectedFriends[0].id
            )}`
        );

    useEffect(() => {
        if (usersAll && currentUser) {
            setFriends(usersAll);
        }
    }, [currentUser, usersAll]);

    return (
        <div>
            <Input
                placeholder='Search Contact'
                className=' my-2'
                onChange={(event) => setSearch(event.target.value)}
            />
            <div className='flex flex-row space-x-2'>
                <div className='w-1/2 max-lg:w-full'>
                    {friends.map(
                        (friend: Friend, index: number) =>
                            friend && (
                                <div
                                    key={index}
                                    className='flex items-center space-x-2 space-y-1 p-3 mb-2 border-2 border-purple-100 dark:border-purple-950 rounded-lg'
                                >
                                    <Checkbox
                                        onClick={() => handleSelect(friend)}
                                        value={friend.id}
                                        id={friend.id}
                                        className='w-5 h-5'
                                    />
                                    <Image
                                        className='rounded-full'
                                        src={
                                            friend!.image ||
                                            "/defaultperson.png"
                                        }
                                        width={35}
                                        height={40}
                                        alt={"Profile Photo"}
                                    />
                                    <Label
                                        htmlFor={friend.id}
                                        className='text-lg'
                                    >
                                        {friend.name}
                                    </Label>
                                </div>
                            )
                    )}
                </div>
                <div className='pl-2 w-1/2 max-lg:flex flex-col gap-7'>
                    <Button
                        onClick={handleChat}
                        disabled={selectedFriends.length != 1}
                    >
                        Start A New Chat
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Friends;
