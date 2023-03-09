import { projectAuth } from "firebase/config";
import { useEffect, useState } from "react";
import { AuthActionType } from "types/auth-actions.model";
import { useAuthContext } from "./useAuthContext";

export interface UseSignUpType {
    signup:  (email: string, password: string, displayName: string) => Promise<void>;
    isLoading: boolean;
    error: string;
}

const useSignup = (): UseSignUpType => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string, displayName: string) => {
        setError("");
        setIsLoading(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error("Could not complete signup");
            }

            // Adding displayName to user

            await res.user?.updateProfile({displayName});

            // Dispatching login action
            dispatch({ type: AuthActionType.LOGIN, payload: res.user });

            if (!isCancelled) {
                // Update state
                setError("");
                setIsLoading(false);
            }

        } catch (err: any) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        // Cleanup function
        return () => setIsCancelled(true);
    }, []);

    return { error, isLoading, signup }
}

export default useSignup;