import { create } from "zustand";
import { User } from "@/types/user";
interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (newUser: User) => void;
  clearIsAuthenticated: () => void;
}

const noUser: User = {
  email: "",
  username: "",
  avatar: "",
};
export const useAuthStore = create<AuthStore>()((set) => ({
  user: noUser,
  isAuthenticated: false,
  setUser: (newUser) => {
    set({ user: newUser, isAuthenticated: true });
  },
  clearIsAuthenticated: () => {
    set({ user: noUser, isAuthenticated: false });
  },
}));
