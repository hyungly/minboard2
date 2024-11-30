import { atom } from "recoil";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  likesCount: number;
  status: string;
}

export const postState = atom<Post[]>({
  key: "postState",
  default: [],
});
