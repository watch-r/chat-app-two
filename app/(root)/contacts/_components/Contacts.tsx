import { prisma } from "@/prisma/client";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import ContactsList from "./ContactsList";

type Contact = {
    id: string;
    name: string;
    email?: string;
    image?: string;
};

const Contacts = async () => {
    const session = await getServerSession(authOptions);
    let contacts;
    if (session) {
        const users = await prisma.user.findUnique({
            where: { email: session?.user!.email || undefined },
        });
        const allUsers: Contact[] = await fetch(
            "http://localhost:3000/api/users"
        ).then((response) => response.json());
        contacts = allUsers.filter((user: Contact) => user.id !== users!.id);
    }
    return (
        <div>
            {contacts && <ContactsList contactlist={contacts}/>}
            
        </div>
    );
};

export default Contacts;
