import firebase from "firebase/app"

export interface UseFirestoreState {
    document: any;
    isLoading: boolean;
    error: string;
    success: boolean | null;
}