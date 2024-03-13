import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Contacts from "./_components/Contacts";
// import delay from "delay";
const ContactsPage = async () => {
    // await delay(3000);
    const session = await getServerSession(authOptions);
    const currentUser = session?.user;
    return (
        <div>
            <Contacts currentUser={currentUser} />
        </div>
    );
};

export default ContactsPage;
