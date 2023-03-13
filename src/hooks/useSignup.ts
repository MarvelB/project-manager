import { projectAuth, projectFirestore, projectStorage } from "firebase/config";
import { useEffect, useState } from "react";
import { UserModel } from "types";
import { AuthActionType } from "types/auth-actions.model";
import { useAuthContext } from "./useAuthContext";

export interface UseSignUpType {
    signup:  (email: string, password: string, displayName: string, image: File) => Promise<void>;
    isLoading: boolean;
    error: string;
}

const useSignup = (): UseSignUpType => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string, displayName: string, image: File) => {
        setError("");
        setIsLoading(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error("Could not complete signup");
            }

            // Uploading user profile picture
            const folderPath = `profilePictures/${res.user?.uid}/${image.name}`;

            const imageRes = await projectStorage.ref(folderPath).put(image);
            const photoURL = await imageRes.ref.getDownloadURL();

            // Adding displayName to user
            await res.user?.updateProfile({displayName, photoURL});

            // Creating a user document
            await projectFirestore.collection("users").doc(res.user?.uid).set({
                displayName,
                photoURL,
                signedIn: true
            } as UserModel);

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