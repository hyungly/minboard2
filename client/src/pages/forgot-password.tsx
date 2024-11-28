// client/src/pages/forgot-password.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Divider,
} from '@nextui-org/react';
import { Mail as MailIcon } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      if (response.status === 200) {
        setSuccess('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        setError('');
      }
    } catch (err) {
      setError('비밀번호 재설정 이메일 전송에 실패했습니다. 다시 시도해주세요.');
      setSuccess('');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">비밀번호 찾기</h1>
          <p className="text-sm text-default-500">
            이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
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
          {error && <p className="text-danger text-sm">{error}</p>}
          {success && <p className="text-success text-sm">{success}</p>}
          <Button color="primary" onPress={handleForgotPassword} className="w-full">
            비밀번호 재설정 링크 보내기
          </Button>
          <div className="flex justify-center mt-4">
            <Link href="/login" className="text-primary">
              로그인 화면으로 돌아가기
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default ForgotPassword;
