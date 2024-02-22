import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link href={"/"}><Image src={"/chatlogo.svg"} alt='Chat logo' height={"50"} width={52} /></Link>
    );
};

export default Logo;
