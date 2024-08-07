import { createStore } from "zustand";

export interface UserState {
  id: string | undefined;
  role: "student" | "postdoctorial" | "professional" | undefined;
}

export interface UserActions {
  setId: (id?: string) => void;
  setRole: (role: "student" | "postdoctorial" | "professional") => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: undefined,
  role: undefined,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setId: (id?: string) => set(() => ({ id })),
    setRole: (role: "student" | "postdoctorial" | "professional") =>
      set(() => ({ role: role })),
  }));
};
