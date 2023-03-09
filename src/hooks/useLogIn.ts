import { projectAuth } from "firebase/config";
import { useEffect, useState } from "react";
import { AuthActionType } from "types/auth-actions.model";
import { useAuthContext } from "./useAuthContext";

export interface UseLoginType {
    login:  (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    error: string;
}

export const useLogIn = (): UseLoginType => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setError("");
        setIsLoading(true);

        // Signing user out
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            dispatch({type: AuthActionType.LOGIN, payload: res.user});

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

    return { error, isLoading, login }
}