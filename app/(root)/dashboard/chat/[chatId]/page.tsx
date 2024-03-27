import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface PageProps {
    params: { chatId: string };
}
const ChatPage = async ({ params }: PageProps) => {
    const { chatId } = params;

    const session = await getServerSession(authOptions);
    if (!session) notFound();
    const { user } = session;

    const [userOne, userTwo] = chatId.split("--");
    

    return <div>ChatPage of : {chatId}</div>;
};

export default ChatPage;
