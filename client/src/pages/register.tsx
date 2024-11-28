import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Divider,
  Checkbox,
  Tooltip,
} from "@nextui-org/react";
import {
  Mail as MailIcon,
  Lock as LockIcon,
  User as UserIcon,
} from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
// 인증번호 발송 함수
const sendVerificationCode = async (): Promise<void> => {
  if (!validateEmail(email)) {
    setError("유효한 이메일을 입력해주세요.");
    return;
  }
  try {
    await axios.post("/api/auth/send-code", { email });
    alert("인증번호가 발송되었습니다.");
  } catch (err) {
    setError("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
  }
};

// 인증번호 확인 함수
const verifyCode = async (): Promise<void> => {
  try {
    const response = await axios.post("/api/auth/verify-code", { email, verificationCode });
    if (response.status === 200) {
      setIsVerified(true);
      alert("이메일이 인증되었습니다.");
    }
  } catch (err) {
    setError("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
  }
};

// 회원가입 처리 함수
const handleRegister = async (): Promise<void> => {
  if (!name || !email || !password || !confirmPassword) {
    setError("모든 필드를 입력해주세요.");
    return;
  }
  if (password !== confirmPassword) {
    setError("비밀번호가 일치하지 않습니다.");
    return;
  }
  if (!isVerified) {
    setError("이메일을 인증해주세요.");
    return;
  }

  try {
    const response = await axios.post("/api/auth/register", { name, email, password });
    if (response.status === 200) {
      alert("회원가입 성공");
      router.push("/login");
    }
  } catch (err) {
    setError("회원가입 실패. 정보를 다시 확인해주세요.");
  }
};

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-sm text-default-500">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary">
              로그인
            </Link>
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <Input
            label="이름"
            placeholder="이름을 입력하세요"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startContent={<UserIcon className="w-4 h-4 text-default-400" />}
            color={error && !name ? "danger" : "default"}
          />

          <Input
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<MailIcon className="w-4 h-4 text-default-400" />}
            endContent={
              <Button
                variant="light"
                onClick={sendVerificationCode}
              >
                인증번호 발송
              </Button>
            }
            color={error && !validateEmail(email) ? "danger" : "default"}
          />

          {isVerified ? (
            <p className="text-success text-sm">이메일이 인증되었습니다.</p>
          ) : (
            <div className="flex gap-2">
              <Input
                label="인증번호"
                placeholder="인증번호를 입력하세요"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                color={error && !verificationCode ? "danger" : "default"}
              />
              <Button onClick={verifyCode} variant="light">
                인증 확인
              </Button>
            </div>
          )}

          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<LockIcon className="w-4 h-4 text-default-400" />}
            endContent={
              <Button
                variant="light"
                isIconOnly
                onClick={toggleVisibility}
              >
                {isVisible ? "👁️" : "👁️‍🗨️"}
              </Button>
            }
            type={isVisible ? "text" : "password"}
            color={error && !password ? "danger" : "default"}
          />

          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            startContent={<LockIcon className="w-4 h-4 text-default-400" />}
            type={isVisible ? "text" : "password"}
            color={error && confirmPassword !== password ? "danger" : "default"}
          />

          {error && (
            <p className="text-danger text-sm">{error}</p>
          )}

          <Button
            color="primary"
            onPress={handleRegister}
            className="w-full"
          >
            회원가입
          </Button>

          <div className="flex justify-center mt-4">
            <Tooltip content="로그인 화면으로 돌아가기">
              <Link href="/login">
                <Button
                  isIconOnly
                  variant="light"
                  aria-label="로그인 화면으로 이동"
                >
                  <UserIcon className="w-6 h-6" />
                </Button>
              </Link>
            </Tooltip>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Register;
