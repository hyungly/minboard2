import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useUser();

  const handleLogin = () => {
    if (username) {
      login(username);
      alert(`Logged in as ${username}`);
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl mb-4">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"  /* 공통 클래스와 추가 클래스 사용 */
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <div className="flex gap-4 mt-4">
        <Link href="/register">
          <button className="btn btn-secondary">Register</button>  {/* 다른 스타일 적용 */}
        </Link>
      </div>
      <Link href="/">
        <button className="mt-4 btn btn-danger">Back to Home</button>  {/* 다른 스타일 적용 */}
      </Link>
    </main>
  );
};

export default Login;
