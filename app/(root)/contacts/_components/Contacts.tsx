"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ContactsSkeleton from "./ContactsSkeleton";

type Contact = {
    id: string;
    name: string;
    email?: string;
    image?: string;
};

const Contacts = () => {
    const { data: session } = useSession();
    const currentUser = session?.user;
    const router = useRouter();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState("");

    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

    const {
        data: usersAll,
        error,
        isLoading,
    } = useSWR<Contact[]>(
        search !== "" ? `/api/users/search/${search}` : "/api/users",
        fetcher
    );

    useEffect(() => {
        if (usersAll && currentUser) {
            setContacts(
                usersAll.filter(
                    (user: Contact) => user.email !== currentUser!.email
                )
            );
        }
    }, [currentUser, usersAll]);

    const handleSelect = (contact: Contact) => {
        setSelectedContacts((prevSelectedContacts) =>
            prevSelectedContacts.includes(contact)
                ? prevSelectedContacts.filter((item) => item !== contact)
                : [...prevSelectedContacts, contact]
        );
    };

    const [groupName, setGroupname] = useState("");
    const isGroup = selectedContacts.length > 1;

    const createChat = async () => {
        const response = await fetch("http://localhost:3000/api/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentUser: currentUser?.email,
                members: selectedContacts.map((contact) => contact.id),
                isGroup: isGroup,
                gname: groupName,
                groupPhoto: "",
            }),
            cache: "no-store",
        });
        const chat = await response.json();

        if (response.ok) {
            router.push(`/chats/${chat.id}`);
        }
    };

    return (
        <>
            <Input
                placeholder='Search Contact'
                className=' my-2'
                onChange={(event) => setSearch(event.target.value)}
            />
            <div className='flex flex-row space-x-2'>
                <div className='w-1/2 max-lg:hidden'>
                    {isLoading ? (
                        <ContactsSkeleton />
                    ) : (
                        <div className='space-y-2'>
                            <p className='font-semibold text-lg px-3 mt-2'>
                                Select or Deselect to start...
                            </p>
                            {contacts.map((user: Contact, index: number) => (
                                <div
                                    className='flex items-center space-x-2 space-y-1 p-3 border-2 border-purple-100 dark:border-purple-950 rounded-lg'
                                    key={index}
                                >
                                    <Checkbox
                                        onClick={() => handleSelect(user)}
                                        value={user.id}
                                        id={user.id}
                                        className='w-5 h-5'
                                    />
                                    <Image
                                        className='rounded-full'
                                        src={
                                            user!.image || "/defaultperson.png"
                                        }
                                        width={35}
                                        height={40}
                                        alt={"Profile Photo"}
                                    />
                                    <Label
                                        htmlFor={user.id}
                                        className='text-lg'
                                    >
                                        {user.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='pl-2 w-1/2 max-lg:w-full flex flex-col gap-7'>
                    {isGroup && (
                        <>
                            <div className='flex flex-col gap-3'>
                                <p className='text-xl font-semibold tracking-tight'>
                                    Group Chat Name
                                </p>
                                <Input
                                    placeholder='Enter Group Chat Name...'
                                    value={groupName}
                                    onChange={(event) =>
                                        setGroupname(event.target.value)
                                    }
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className='text-xl font-semibold tracking-tight'>
                                    Members
                                </p>
                                <div className='flex flex-wrap gap-3'>
                                    {selectedContacts.map((contact, index) => (
                                        <Badge
                                            key={index}
                                            variant={"secondary"}
                                        >
                                            {contact.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <Button
                        onClick={createChat}
                        disabled={selectedContacts.length < 1}
                    >
                        Start A New Chat
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Contacts;
