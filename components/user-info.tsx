import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { use } from "react";
import { Badge } from "./ui/badge";

interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
    const info = [
        {
            label: "ID",
            content: user?.id
        },
        {
            label: "Name",
            content: user?.name
        },
        {
            label: "Email",
            content: user?.email
        },
        {
            label: "Role",
            content: user?.role
        },
        {
            label: "Two Factor Authentication",
            content: user?.isTwoFactorEnabled ? "ON" : "OFF",
            hasVariant: true
        },
    ]
    return (
        <Card className="w-[600px] shadow-sm">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {info.map((item, index) => (
                    <div key={index} className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm">
                            {item.label}
                        </p>
                        <Badge variant={!!item?.hasVariant ? item.content == "ON" ? "success" : "destructive" : "secondary"}>
                            {item.content}
                        </Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

