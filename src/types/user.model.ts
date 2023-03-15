import { WithID } from "./helper.model";

export interface UserModel {
    photoURL: string;
    displayName: string;
    signedIn: boolean;
}

export interface UserModelWithId extends WithID<UserModel> {}