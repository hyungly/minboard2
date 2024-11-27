import { atom } from 'recoil';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface User {
  username: string;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
  },
});
