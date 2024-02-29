"use client";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/utils";
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
                        <RadioGroup>
                            {contacts.map((user: Contact, index: number) => (
                                <div
                                    className='flex items-center space-x-2 space-y-1 p-3 border-2 border-purple-100 dark:border-purple-950 rounded-lg'
                                    key={index}
                                    onClick={() => handleSelect(user)}
                                >
                                    <RadioGroupItem
                                        value={user.id}
                                        id={user.id}
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
                        </RadioGroup>
                    )}
                </div>
                <div className='w-1/2 max-lg:w-full flex flex-col gap-7'>
                    <Button>Start A New Chat</Button>
                </div>
            </div>
        </>
    );
};

export default Contacts;
