import { Message, currentUser } from "@/types/allTypes";
import { format } from "date-fns";
import Image from "next/image";

interface pageProps {
    message: Message;
    currentUser?: currentUser;
}

const MessageCard = ({ message, currentUser }: pageProps) => {
    return message.senderId !== currentUser?.id ? (
        <div className='flex items-start gap-2'>
            <Image
                className='rounded-full '
                priority
                src={(message?.sender?.image as string) || "/defaultperson.png"}
                alt={`Photo of ${message?.sender?.name}`}
                width={40}
                height={40}
            />
            <div>
                <p className='text-xs font-bold flex items-center'>
                    {message?.sender?.name} &#160; &#183;&#160;{" "}
                    <p className='text-gray-600 font-light'>
                        {format(new Date(message?.createdAt), "p")}
                    </p>
                </p>
                {message.text ? (
                    <p className='w-fit bg-slate-400 p-1.5 px-3 rounded-md text-base'>
                        {message.text}
                    </p>
                ) : (
                    <Image
                        src={message.photo as string}
                        alt={`Photo sent By ${message?.sender?.name}`}
                        width='180'
                        height='180'
                    />
                )}
            </div>
        </div>
    ) : (
        <div className='flex items-start gap-3 justify-end'>
            <div className='flex flex-col items-end gap-1'>
                <p className='text-gray-600 text-xs font-light'>
                    {format(new Date(message?.createdAt), "p")}
                </p>
                {message.text ? (
                    <p className='w-fit bg-purple-500 text-gray-100 p-1.5 px-3 rounded-md text-base'>
                        {message.text}
                    </p>
                ) : (
                    <Image
                        src={message.photo as string}
                        alt={"Photo sent by You"}
                        width={180}
                        height={180}
                    />
                )}
            </div>
        </div>
    );
};

export default MessageCard;
