'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Chats", href: "/chats" },
        { label: "Contacts", href: "/contacts" },
    ];
    return (
        <ul className='flex space-x-2'>
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={cn(
                            "font-semibold text-sm md:font-bold md:text-lg",
                            {
                                "dark:!text-violet-800 text-violet-400":
                                    link.href === currentPath,
                            }
                        )}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;
