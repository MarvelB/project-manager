import { projectAuth } from "firebase/config";
import { createContext, useEffect, useReducer } from "react";
import { AuthContextModel } from "types";
import { AuthAction, AuthActionType } from "types/auth-actions.model";

const initialState: AuthContextModel = {
    user: null,
    isAuthReady: false,
    dispatch: () => {}
}

export const AuthContext = createContext<AuthContextModel>(initialState);

export const authReducer = (state: AuthContextModel, action: AuthAction) => {
    let newState = {...state};

    switch (action.type) {
        case AuthActionType.LOGIN:
            newState = { ...newState, user: action.payload };
            break;
        case AuthActionType.LOGOUT:
            newState = { ...newState, user: null };
            break;
        case AuthActionType.AUTH_IS_READY:
            newState = { ...newState, user: action.payload, isAuthReady: true };
            break;
    }

    return newState;
}

interface AuthContextProviderProps {
    children: JSX.Element[] | JSX.Element;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const unsubscribe = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: AuthActionType.AUTH_IS_READY, payload: user });

            unsubscribe();
        });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    );
}