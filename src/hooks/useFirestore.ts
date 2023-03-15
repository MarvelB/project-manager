import firebase from "firebase/app"
import { projectFirestore } from "firebase/config";
import { useEffect, useReducer, useState } from "react";
import { UseFirestoreState } from "types/use-firestore-state.model";

const enum UseFirestoreActionType {
    IS_LOADING = "IS_LOADING",
    DOCUMENT_ADDED = "DOCUMENT_ADDED",
    ERROR = "ERROR",
    DOCUMENT_DELETED = "DOCUMENT_DELETED",
    UPDATED_DOCUMENT = "UPDATED_DOCUMENT"
}

interface UseFirestoreAction {
    type: UseFirestoreActionType;
    payload: any;
}

const initialState: UseFirestoreState = {
    document: null,
    error: "",
    success: null,
    isLoading: false
}

const firestoreReducer = (state: UseFirestoreState, action: UseFirestoreAction) => {
    let newState = {...state};

    switch(action.type) {
        case UseFirestoreActionType.IS_LOADING:
            newState = {document: null, error: "", success: false,isLoading: true};
            break;
        case UseFirestoreActionType.DOCUMENT_ADDED:
            newState = {isLoading: false, document: action.payload, success: true, error: ""};
            break;
        case UseFirestoreActionType.ERROR:
            newState = {isLoading: false, success: false, error: action.payload, document: null};
            break;
        case UseFirestoreActionType.DOCUMENT_DELETED:
            newState = {isLoading: false, success: true, error: "", document: null};
            break;
        case UseFirestoreActionType.UPDATED_DOCUMENT:
            newState = {isLoading: false, success: true, error: "", document: action.payload};
            break;
    }

    return newState;
}

export interface UseFirestoreType<T> {
    addDocument: (document: T) => Promise<void>;
    deleteDocument: (id: string) => Promise<void>;
    updateDocument: (id: string, updates: Partial<T>) => Promise<void>
    response: UseFirestoreState;
}

export const useFirestore = <T>(collection: string): UseFirestoreType<T> => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState<boolean>(false);

    // collection ref
    const ref = projectFirestore.collection(collection);

    const dispatchIfNotCancelled = (action: UseFirestoreAction) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    const addDocument = async (document: T) => {
        dispatch({type: UseFirestoreActionType.IS_LOADING, payload: null});

        try {
            const addedDocument = await ref.add(document as firebase.firestore.DocumentData);

            dispatchIfNotCancelled({type: UseFirestoreActionType.DOCUMENT_ADDED, payload: addedDocument});
            
        } catch (err: any) {
            dispatchIfNotCancelled({type: UseFirestoreActionType.ERROR, payload: err.message});
        }
    }

    const deleteDocument = async (id: string) => {
        dispatch({type: UseFirestoreActionType.IS_LOADING, payload: null});

        try {
            await ref.doc(id).delete();

            dispatchIfNotCancelled({ type: UseFirestoreActionType.DOCUMENT_DELETED, payload: null });
        } catch (err: any) {
            dispatchIfNotCancelled({type: UseFirestoreActionType.ERROR, payload: err.message});
        }
    }

    const updateDocument = async (id: string, updates: Partial<T>) => {
        dispatch({type: UseFirestoreActionType.IS_LOADING, payload: null})

        try {

            const updatedDocument = await ref.doc(id).update({...updates});

            dispatchIfNotCancelled({ type: UseFirestoreActionType.UPDATED_DOCUMENT, payload: updatedDocument });
            
        } catch (err: any) {
            dispatchIfNotCancelled({type: UseFirestoreActionType.ERROR, payload: err.message});
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { addDocument, deleteDocument, updateDocument, response }
}