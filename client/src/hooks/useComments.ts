import { useRecoilState } from "recoil";
import { commentState } from "@/stores/atoms/commentAtom";
import axiosInstance from "@/utils/axiosInstance";

export const useComments = (postId: number) => {
  const [comments, setComments] = useRecoilState(commentState);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const addComment = async (content: string) => {
    try {
      const response = await axiosInstance.post(`/posts/${postId}/comments`, {
        content,
      });
      setComments(prevComments => [...prevComments, response.data]);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return { comments, fetchComments, addComment, deleteComment };
};
