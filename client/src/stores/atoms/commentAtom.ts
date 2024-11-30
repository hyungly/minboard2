import { atom } from "recoil";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
}

export const commentState = atom<Comment[]>({
  key: "commentState",
  default: [],
});
