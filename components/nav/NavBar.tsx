import Image from "next/image";
import Link from "next/link";
import { ToggleTheme } from "@/components/ToggleTheme";
import AuthStatus from "@/components/nav/AuthStatus";
import NavLinks from "@/components/nav/NavLinks";

const NavBar = () => {
    return (
        <nav className='border-b-2 px-4 mb-5 py-3'>
            <div className='flex flex-row items-center justify-between'>
                <Link
                    href={"/chats"}
                    className='flex flex-row space-x-1 items-center'
                >
                    <Image
                        src={"/chatlogo.svg"}
                        alt='Chat logo'
                        height={30}
                        width={30}
                    />
                    <p className='text-sm md:text-base font-extrabold'>
                        Chat App
                    </p>
                </Link>
                <div className='flex space-x-2 items-center'>
                    <NavLinks />
                    <ToggleTheme />
                    {/* <AuthStatus /> */}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
