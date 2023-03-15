import { projectFirestore } from "firebase/config";
import { useEffect, useState } from "react";

export interface UseDocumentType<T> {
    document: T | null;
    error: string;
}

export const useDocument = <T>(collection: string, documentId: string): UseDocumentType<T> => {

    const [document, setDocument] = useState<T | null>(null);
    const [error, setError] = useState<string>("");

    // get realtime data
    useEffect(() => {
        const docRef = projectFirestore.collection(collection).doc(documentId);

        const unsubscribe = docRef.onSnapshot((snapshot) => {

            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id} as T);
                setError("");
            } else {
                setError("Document does not exist");
            }

        }, error => {
            console.log(error);
            setError(error.message);
        });

        return () => unsubscribe();

    }, [collection, documentId]);

    return {document, error}
}