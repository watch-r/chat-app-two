"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type Contact = {
    id: string;
    name: string;
    email?: string;
    image?: string;
};
type PageProps = {
    contactlist: Contact[];
};
const ContactsList = ({ contactlist }: PageProps) => {
    const [selectedContacts, setSelectedContacts] = useState([]);

    // const handleSelect = (contact: Contact) => {
    //     if (selectedContacts.includes(contact)) {
    //         setSelectedContacts((prevSelectedContacts) =>
    //             prevSelectedContacts.filter((item) => item !== contact)
    //         );
    //     } else {
    //         setSelectedContacts((prevSelectedContacts) => [
    //             ...prevSelectedContacts,
    //             contact,
    //         ]);
    //     }
    // };
    return (
        <div>
            <RadioGroup>
                {contactlist.map((user: Contact, index: number) => (
                    <div
                        className='flex items-center space-x-2'
                        key={index}
                        // onClick={handleSelect(user)}
                    >
                        <RadioGroupItem value={user.id} id={user.id} />
                        <Image
                            className='rounded-full'
                            src={user!.image || "/defaultperson.png"}
                            width={35}
                            height={40}
                            alt={""}
                        />
                        <Label htmlFor={user.id} className='text-lg'>
                            {user.name}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default ContactsList;
