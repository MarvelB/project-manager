import { projectAuth, projectFirestore } from "firebase/config";
import { useEffect, useState } from "react";
import { UserModel } from "types";
import { AuthActionType } from "types/auth-actions.model";
import { useAuthContext } from "./useAuthContext";

export interface UseLogoutType {
    logout:  () => Promise<void>;
    isLoading: boolean;
    error: string;
}

export const useLogout = (): UseLogoutType => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch, user } = useAuthContext();

    const logout = async () => {
        setError("");
        setIsLoading(true);

        // Signing user out
        try {
            await projectFirestore.collection("users").doc(user?.uid).update({ signedIn: false } as Partial<UserModel>);

            await projectAuth.signOut();

            dispatch({type: AuthActionType.LOGOUT, payload: null});

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

    return { error, isLoading, logout }
}