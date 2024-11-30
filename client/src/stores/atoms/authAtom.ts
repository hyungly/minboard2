import { atom } from "recoil";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  id: number;
  username: string;
  email: string;
  nickname?: string;
  profileImage?: string;
  role: string;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    user: null,
  },
});
