import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/stores/atoms";
import axios from "axios";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me"); // 서버의 인증된 사용자 정보 가져오기
        setAuth({ isAuthenticated: true, user: response.data });
      } catch (err) {
        setAuth({ isAuthenticated: false, user: null });
      }
    };

    fetchUser();
  }, [setAuth]);

  return auth;
};
