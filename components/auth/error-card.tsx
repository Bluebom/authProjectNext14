import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
    return (
        <div>
            <CardWrapper
                headerLabel="Oops! Something went wrong!"
                backButtonHref="/auth/login"
                backButtonLabel="Go back to login"
            >
                <div className="w-full flex justify-center">
                    <ExclamationTriangleIcon width={30} height={30} className="text-destructive" />
                </div>
            </CardWrapper>
        </div>
    );
}
