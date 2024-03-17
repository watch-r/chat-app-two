import RegisterForm from "@/components/RegisterForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/dashboard");
    return <RegisterForm />;
};

export default SignUpPage;
