import { atom } from "recoil";

export interface AuthModalState {
    open: boolean;
    view: "login" | "signup" | "resetPassword" | "wallet";
}

const defaultModalState: AuthModalState = {
    open: false,
    view: "wallet"
};

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: defaultModalState,
});