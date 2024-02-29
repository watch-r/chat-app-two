"use client";
import { fetcher } from "@/lib/utils";
// import { get } from "http";
import React from "react";
import useSWR from "swr";

type Contact = {
    id: string;
    name: string;
    email?: string;
    image?: string;
};
const Test = () => {
    // const { data, error } = useSWR("/api/users");
    const { data, error } = useSWR("/api/users", fetcher);
    return <div>{error}</div>;
};

export default Test;
