import { atom } from "recoil";

export interface SidebarState {
    tab: string;
}

const defaultSidebarState: SidebarState = {
    tab: ""
};

export const sidebarState = atom<SidebarState>({
    key: 'SidebarState',
    default: defaultSidebarState,
});