import firebase from "firebase/app";
import { projectFirestore } from "firebase/config";
import { useEffect, useRef, useState } from "react";

export interface UseCollectionType<T> {
    documents: T[];
    error: string;
}

export const useCollection = <T>(
    collection: string, 
    query?: [string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, any],
    orderBy?: [fieldPath: string | firebase.firestore.FieldPath, directionStr?: firebase.firestore.OrderByDirection]
): UseCollectionType<T> => {

    const [documents, setDocuments] = useState<T[]>([]);
    const [error, setError] = useState<string>("");

    // Next line is necessary otherwise this hook will enter an infinte loop
    // const query = useRef(_query).current;
    // const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        let ref: firebase.firestore.Query<firebase.firestore.DocumentData> = projectFirestore.collection(collection);

        if (query) {
            ref = ref.where(...query);
        }

        if (orderBy) {
            ref = ref.orderBy(...orderBy);
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results: T[] = [];

            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id} as T);
            });

            setDocuments(results);
            setError("");
        }, (err) => {
            console.log(err);
            setError("Could not fetch the data");
        });

        // Cleanup function
        return () => unsubscribe();

    }, [collection, query, orderBy]);

    return { documents, error }
}