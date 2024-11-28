import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authState } from '@/stores/atoms';
import axiosInstance from '@/utils/axiosInstance';
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
} from '@nextui-org/react';
import {
  Mail as MailIcon,
  Lock as LockIcon,
  Home as HomeIcon,
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        alert(`로그인 성공: ${response.data.user.username}`);
        setAuth({ isAuthenticated: true, user: response.data.user });
        router.push('/home');
      }
    } catch (err) {
      setError('로그인 실패. 정보를 다시 확인해주세요.');
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-sm text-default-500">
            계정이 없으신가요?{' '}
            <Link href="/register" className="text-primary">
              회원가입
            </Link>
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <Input
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<MailIcon className="w-4 h-4 text-default-400" />}
            color={error && !email ? 'danger' : 'default'}
          />

          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<LockIcon className="w-4 h-4 text-default-400" />}
            endContent={
              <Button variant="light" isIconOnly onClick={toggleVisibility}>
                {isVisible ? '👁️' : '👁️‍🗨️'}
              </Button>
            }
            type={isVisible ? 'text' : 'password'}
            color={error && !password ? 'danger' : 'default'}
          />

          {error && <p className="text-danger text-sm">{error}</p>}

          <div className="flex justify-between items-center">
            <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
              로그인 상태 유지
            </Checkbox>
            <Link href="/forgot-password" size="sm">
              비밀번호 찾기
            </Link>
          </div>

          <Button color="primary" onPress={handleLogin} className="w-full">
            로그인
          </Button>

          <div className="relative">
            <Divider className="my-2" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-content1 px-2 text-sm text-default-400">
                또는
              </span>
            </div>
          </div>

          <Button
            variant="bordered"
            startContent={<FcGoogle className="w-5 h-5" />}
            onPress={() =>
              (window.location.href = 'http://localhost:5000/api/auth/google')
            }
            className="w-full"
          >
            Google로 계속하기
          </Button>

          <div className="flex justify-center">
            <Tooltip content="홈으로 돌아가기">
              <Link href="/">
                <Button isIconOnly variant="light" aria-label="홈으로 이동">
                  <HomeIcon className="w-6 h-6" />
                </Button>
              </Link>
            </Tooltip>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Login;
