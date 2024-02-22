"use client";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { NewVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token");
            return;
        }

        NewVerification(token).then((data) => {
            if (data.success) {
                setSuccess(data.success);
            }
            if (data.error) {
                setError(data.error);
            }
        }).catch(() => {
            setError("Something went wrong");
        });
    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])
    return (
        <CardWrapper
            headerLabel="Confirming your verfication"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error &&
                    (
                        <BeatLoader />
                    )
                }
                <FormSuccess message={success} />
                {
                    !success && (
                        <FormError message={error} />
                    )
                }
            </div>
        </CardWrapper>
    );
}
