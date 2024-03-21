import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import { getFriendsById } from "@/helpers/getFriendsbyId";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth/authOptions";
import { SideBarOption } from "@/types/typings";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import FriendRequestSidebarOptions from "./FriendRequestSidebarOptions";

const sideBarOptions: SideBarOption[] = [
    {
        id: 1,
        name: "Add Friend",
        href: "/dashboard/add",
        Icon: "UserPlus",
    },
];

const LeftSideBar = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const friends = await getFriendsById(session!.user!.id);
    const unseenRequestCount = (
        (await fetchRedis(
            `smembers`,
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length;

    return (
        <div>
            <h2 className='text-2xl font-semibold mr-3'>
                Your Chats
                <Separator />
            </h2>

            {friends.length > 0 ? (
                <li>SideBarChatList</li>
            ) : (
                <p className='text-sm text-gray-500 my-1'>Nothing to show</p>
            )}
            <div className='text-lg font-semibold py-2'>OverView</div>

            <ul role='list' className='mr-2 mt-2 space-y-1'>
                {sideBarOptions.map((option) => {
                    const Icon = Icons[option.Icon];
                    return (
                        <li
                            key={option.id}
                            className='py-2 pl-3 rounded-md hover:bg-opacity-20 hover:bg-slate-500'
                        >
                            <Link
                                href={option.href}
                                className='flex flex-row items-center space-x-2'
                            >
                                <span className='rounded-full'>
                                    <Icon className='h-4 w-4' />
                                </span>
                                <span className='truncate'>{option.name}</span>
                            </Link>
                        </li>
                    );
                })}

                <li className='py-2 pl-2.5 rounded-md hover:bg-opacity-20 hover:bg-slate-500'>
                    <FriendRequestSidebarOptions
                        sessionId={session.user.id}
                        initialUnseenRequestCount={unseenRequestCount}
                    />
                </li>
            </ul>
        </div>
    );
};

export default LeftSideBar;
