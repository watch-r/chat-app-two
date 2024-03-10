// import { Chat, User } from "./ChatList";
import { cn } from "@/lib/utils";
import { Chat, currentUser } from "@/types/allTypes";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PageProps {
    chat: Chat;
    currentUser: currentUser;
}

const ChatCard = ({ chat, currentUser }: PageProps) => {
    const router = useRouter();
    const members = chat.members
        ? chat.members.filter((member) => member?.id !== currentUser?.id)
        : undefined;

    let lastMessage;
    if (chat?.messages && chat?.messages!.length > 0) {
        const len = chat?.messages!.length - 1;
        lastMessage = chat?.messages?.[len];
    }

    const seen = lastMessage?.seenBy?.find(
        (member) => member.id === currentUser?.id
    );
    const handleclick = () => {
        router.push(`/chats/${chat.id}`);
    };
    return (
        <>
            <div className={`flex justify-between `} onClick={handleclick}>
                <div className='flex space-x-5'>
                    {chat.isGroup ? (
                        <Image
                            priority
                            className='rounded-full'
                            width={50}
                            height={50}
                            src={
                                chat.groupPhoto
                                    ? chat.groupPhoto
                                    : "/defaultgroup.jpg"
                            }
                            alt={"Photo of the group"}
                        />
                    ) : (
                        <Image
                            priority
                            className='rounded-full'
                            width={50}
                            height={50}
                            src={
                                members?.[0]?.image
                                    ? (members[0].image as string)
                                    : "/defaultperson.png"
                            }
                            alt={"Photo of the person"}
                        />
                    )}
                    <div className='flex flex-col'>
                        {chat.isGroup ? (
                            <p className='font-semibold'>{chat.gname}</p>
                        ) : (
                            <p className='font-semibold'>
                                {members?.[0]?.name}
                            </p>
                        )}
                        {!lastMessage && (
                            <p className='font-light text-sm'>Started A Chat</p>
                        )}
                        {lastMessage?.photo ? (
                            lastMessage.senderId === currentUser?.id ? (
                                <p>You Sent a Photo</p>
                            ) : (
                                <p
                                    className={cn(
                                        seen
                                            ? "font-light text-sm"
                                            : "font-semibold text-sm"
                                    )}
                                >
                                    You Received a Photo
                                </p>
                            )
                        ) : (
                            <p
                                className={`w-[110px] sm:w-[200px] ${
                                    seen ? "text-sm" : "text-sm font-semibold"
                                }`}
                            >
                                {lastMessage?.senderId === currentUser?.id ? (
                                    <>You: {lastMessage?.text}</>
                                ) : (
                                    <>{lastMessage?.text}</>
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <div className='items-end'>
                    <p className='font-light text-sm'>
                        {!lastMessage
                            ? format(new Date(chat?.createdAt), "p")
                            : format(new Date(chat?.lastMessageAt), "p")}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ChatCard;
