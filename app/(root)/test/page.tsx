import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { database } from "@/lib/db";
// import AddFriend from "../chats/_components/AddFriend";

const TestingComponents = async () => {
    // await database.set("hello", "world");
    return (
        <>
            <Popover>
                <PopoverTrigger className='h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md'>
                    open
                </PopoverTrigger>
                <PopoverContent>{/* <AddFriend /> */}</PopoverContent>
            </Popover>
        </>
    );
};

export default TestingComponents;
