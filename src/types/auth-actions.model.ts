export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    AUTH_IS_READY = "AUTH_IS_READY",
}

export interface AuthAction {
    type: AuthActionType;
    payload: any;
}