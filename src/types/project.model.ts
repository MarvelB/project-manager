import { ProjectCategories } from "./categories.model";
import { WithID } from "./helper.model";
import { UserModelWithId } from "./user.model";
import firebase from "firebase/app";

export interface ProjectModelUser extends Omit<UserModelWithId, "signedIn"> {}

export interface ProjectCommentModel {
    userDisplayName: string;
    userPhotoURL: string;
    body: string;
    createdAt:  firebase.firestore.Timestamp;
    id: number;
}

export interface ProjectModel {
    name: string;
    details: string;
    dueDate:  firebase.firestore.Timestamp;
    category: ProjectCategories;
    assignedUsers: ProjectModelUser[];
    comments: ProjectCommentModel[];
    createdBy: ProjectModelUser;
    createdAt:  firebase.firestore.Timestamp;
}

export interface ProjectModelWithId extends WithID<ProjectModel>{}