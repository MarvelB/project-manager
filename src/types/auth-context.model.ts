import firebase from "firebase/app"
import { AuthAction } from "./auth-actions.model";

export interface AuthContextModel {
    user: firebase.User | null;
    isAuthReady: boolean;
    dispatch: React.Dispatch<AuthAction>
}