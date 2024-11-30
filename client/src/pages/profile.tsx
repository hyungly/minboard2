// client/src/pages/profile.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authState } from '@/stores/atoms/authAtom';
import axiosInstance from '@/utils/axiosInstance';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
  Divider,
} from '@nextui-org/react';
import {
  User as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
} from 'lucide-react';

const Profile = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/login');
    } else {
      setName(auth.user.name);
      setEmail(auth.user.email);
    }
  }, [auth, router]);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    if (password && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axiosInstance.put('/api/auth/profile', {
        name,
        email,
        password: password || undefined,
      });
      if (response.status === 200) {
        alert('프로필 업데이트 성공');
        setAuth({ isAuthenticated: true, user: response.data.user });
        setSuccess('프로필이 업데이트되었습니다.');
        setError('');
      }
    } catch (err) {
      setError('프로필 업데이트 실패. 정보를 다시 확인해주세요.');
      setSuccess('');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">프로필</h1>
          <p className="text-sm text-default-500">
            회원정보를 열람 및 수정할 수 있습니다.
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
            color={error && !name ? 'danger' : 'default'}
          />

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
            label="새 비밀번호 (선택)"
            placeholder="새 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<LockIcon className="w-4 h-4 text-default-400" />}
            type="password"
            color={error && !password ? 'danger' : 'default'}
          />

          <Input
            label="새 비밀번호 확인 (선택)"
            placeholder="새 비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            startContent={<LockIcon className="w-4 h-4 text-default-400" />}
            type="password"
            color={error && confirmPassword !== password ? 'danger' : 'default'}
          />

          {error && <p className="text-danger text-sm">{error}</p>}
          {success && <p className="text-success text-sm">{success}</p>}

          <Button color="primary" onPress={handleUpdateProfile} className="w-full">
            프로필 업데이트
          </Button>

          <div className="flex justify-center mt-4">
            <Link href="/home" className="text-primary">
              홈으로 돌아가기
            </Link>
          </div>
        </CardBody>
      </Card>
    </main>
  );
};

export default Profile;
