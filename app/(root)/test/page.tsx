import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import ChatListPageTest from "./_components/ChatListPageTest";
// import AddFriend from "../chats/_components/AddFriend";

const TestingComponents = () => {
    return (
        <>
            return (
        <div className='flex flex-row'>
            <div className='w-1/3 max-lg:w-1/2 max-md:w-full'>
                <ChatListPageTest /> 
            </div>
            <div className='w-2/3 max-lg:w-1/2 max-md:hidden'>
                {/* <Contacts />   */} Contacts
            </div>
        </div>
    );
        </>
    );
};

export default TestingComponents;
