import { create } from "zustand";
import { User } from "@/types/user";
interface AuthStore {
  user: User;
  isAuthenticated: boolean;
  setUser: (newUser: User) => void;
  clearIsAuthenticated: () => void;
}
const initialUser : User = {
  email: "youremail@gmail.com",
  username: "username23719",
  avatar: '/public/default-avatar.svg',
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: initialUser,
  isAuthenticated: false,
  setUser: (newUser) => {
    set({ user: newUser, isAuthenticated: true });
  },
  clearIsAuthenticated: () => {
    set({ user: initialUser, isAuthenticated: false });
  },
}));
