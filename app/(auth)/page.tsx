import LoginForm from "@/components/LoginForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInpage = async () => {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/chats");
    return <LoginForm />;
};

export default SignInpage;
