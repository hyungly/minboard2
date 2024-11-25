import Link from 'next/link';
import { Button } from "@nextui-org/react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Minboard에 오신 것을 환영합니다!</h1>
      <p className="text-lg mb-6 text-center max-w-lg">
        Minboard에서 다양한 소식들을 공유해보세요.
      </p>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default Home;