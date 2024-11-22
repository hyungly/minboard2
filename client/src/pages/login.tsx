import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        alert(`로그인 성공: ${response.data.user.username}`);
        router.push("/home"); // 로그인 후 이동할 페이지
      }
    } catch (err) {
      setError("로그인 실패. 정보를 다시 확인해주세요.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl mb-4">로그인</h1>
      <form
        className="flex flex-col gap-4 w-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="이메일"
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          로그인
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            router.push("/api/auth/google"); // 구글 로그인 엔드포인트
          }}
        >
          구글로 로그인
        </button>
      </form>
      <div className="flex gap-4 mt-4">
        <Link href="/register">
          <button className="btn btn-secondary">이메일로 회원가입</button>
        </Link>
      </div>
      <Link href="/">
        <button className="mt-4 btn btn-danger">홈으로</button>
      </Link>
    </main>
  );
};

export default Login;
