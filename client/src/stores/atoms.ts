import { atom } from "recoil";

const uniqueKey = `authState${Math.random().toString(36).substring(2)}`;

export const authState = atom({
  key: uniqueKey,
  default: {
    isAuthenticated: false,
  },
});
