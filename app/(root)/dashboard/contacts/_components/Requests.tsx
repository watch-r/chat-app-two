import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Requests = async () => {
    const session = await getServerSession(authOptions);
    return <div>Requests</div>;
};

export default Requests;
