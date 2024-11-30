import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/stores/atoms/authAtom";
import axiosInstance from "@/utils/axiosInstance";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setAuth({ isAuthenticated: true, user: response.data });
      } catch (err) {
        setAuth({ isAuthenticated: false, user: null });
      }
    };

    fetchUser();
  }, [setAuth]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      setAuth({ isAuthenticated: true, user: response.data });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuth({ isAuthenticated: false, user: null });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { ...auth, login, logout };
};