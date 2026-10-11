import { create } from "zustand";
import { User } from "@/types/user";
interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (newUser: User) => void;
  clearIsAuthenticated: () => void;
}
const defaultUser: User = {
  email: "youremail@gmail.com",
  username: "username23719",
  avatar: "/default-avatar.svg",
};
const noUser: User = {
  email: "",
  username: "",
  avatar: "",
};
export const useAuthStore = create<AuthStore>()((set) => ({
  user: defaultUser,
  isAuthenticated: false,
  setUser: (newUser) => {
    set({ user: newUser, isAuthenticated: true });
  },
  clearIsAuthenticated: () => {
    set({ user: noUser, isAuthenticated: false });
  },
}));
