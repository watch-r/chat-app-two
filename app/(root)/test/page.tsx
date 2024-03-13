import { getServerSession } from "next-auth";
import ChatListPageTest from "./_components/ChatListPageTest";
import { authOptions } from "@/lib/auth/authOptions";
// import AddFriend from "../chats/_components/AddFriend";

const TestingComponents = async () => {
    const session = await getServerSession(authOptions);
    const currentUser = session?.user;
    return (
        <>
            <div className='flex flex-row'>
                <div className='w-1/3 max-lg:w-1/2 max-md:w-full'>
                    <ChatListPageTest currentUser={currentUser} />
                </div>
                <div className='w-2/3 max-lg:w-1/2 max-md:hidden'>
                    {/* <Contacts />   */} Contacts
                </div>
            </div>
        </>
    );
};

export default TestingComponents;
