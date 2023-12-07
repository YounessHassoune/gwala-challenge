import { getItem, removeItem, setItem } from "@/utils/storage";
import { create } from "zustand";

export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type TokenType = {
  access: string;
  refresh: string;
};

interface AuthState {
  token: TokenType | null;
  status: "idle" | "signOut" | "signIn";
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const TOKEN = "token";

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "idle",
  token: null,
  signIn: (token) => {
    setItem(TOKEN, token);
    set({ status: "signIn", token });
  },
  signOut: () => {
    removeItem(TOKEN);
    set({ status: "signOut", token: null });
  },
  hydrate: () => {
    try {
      const userToken = getItem<TokenType>(TOKEN);
      console.log({ userToken });
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      get().signOut();
    }
  },
}));

export const hydrateAuth = () => useAuthStore.getState().hydrate();
