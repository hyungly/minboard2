import { useRecoilState } from "recoil";
import { postState } from "@/stores/atoms/postAtom";
import axiosInstance from "@/utils/axiosInstance";

export const usePosts = () => {
  const [posts, setPosts] = useRecoilState(postState);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const createPost = async (newPost: { title: string; content: string }) => {
    try {
      const response = await axiosInstance.post("/posts", newPost);
      setPosts(prevPosts => [...prevPosts, response.data]);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return { posts, fetchPosts, createPost, deletePost };
};
