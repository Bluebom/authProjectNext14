"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        label: "Server",
        href: "/server"
    },
    {
        label: "Client",
        href: "/client"
    },
    {
        label: "Admin",
        href: "/admin"
    },
    {
        label: "Settings",
        href: "/settings"
    },
]

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                {
                    links.map((link, index) => (
                        <Button key={index} asChild
                            variant={pathname == link.href ? "default" : "outline"}
                        >
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </Button>
                    ))
                }
            </div>
            <UserButton />
        </nav>
    )
}