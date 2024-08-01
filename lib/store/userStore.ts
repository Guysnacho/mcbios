import { createStore } from "zustand";

export interface UserState {
  id: string | undefined;
}

export interface UserActions {
  setId: (id?: string) => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: undefined,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setId: (id?: string) => set(() => ({ id })),
  }));
};
