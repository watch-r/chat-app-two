import ChatDetailsPage from "../_components/ChatDetailsPage";
interface Props {
    params: { chatId: string };
}

const ChatDPage = ({ params }: Props) => {
    return <ChatDetailsPage chatId={params.chatId} />;
};

export default ChatDPage;
