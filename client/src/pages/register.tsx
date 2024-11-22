import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const router = useRouter();

  const handleEmailVerification = async () => {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/send-verification-code", { email });
      setVerificationCode(response.data.code);
      alert("인증번호가 이메일로 발송되었습니다.");
    } catch (err) {
      console.error(err);
      setError("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerificationCodeCheck = () => {
    if (inputCode === verificationCode) {
      setIsVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } else {
      setError("인증번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password || !name) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (!isVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }
  
    try {
      await axios.post("/api/auth/register", { email, password, name });
      alert("회원가입이 완료되었습니다.");
      router.push("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl mb-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={handleEmailVerification}
          className="btn btn-secondary w-full"
        >
          인증번호 발송
        </button>
        <input
          type="text"
          placeholder="인증번호 입력"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={handleVerificationCodeCheck}
          className="btn btn-secondary w-full"
        >
          인증번호 확인
        </button>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          회원가입
        </button>
        <button
        onClick={() => router.push("/login")}
        className="mt-4 btn btn-danger w-full"
      >
        로그인 페이지로
      </button>
      </form>
    </div>
  );
};

export default Register;
