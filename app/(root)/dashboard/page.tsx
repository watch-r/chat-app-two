import { getFriendsById } from "@/helpers/getFriendsbyId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth/authOptions";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Friends from "./_components/Friends";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const friends = await getFriendsById(session.user.id);

    
    // console.log(friends);

    return <Friends />;
};

export default DashboardPage;
