"use client"

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

interface LogoutButtonProps {
    children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const signOutHandler = () => {
        logout();
    }
    return (
        <span onClick={signOutHandler} className="cursor-pointer">
            {children}
        </span>
    )
}