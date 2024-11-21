import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-semibold mb-4">민보드에 오신것을 환영합니다!</h1>
      <p className="text-lg mb-6 text-center max-w-lg">
        민보드에서 다양한 소식들을 공유해보세요.
      </p>
      <Link href="/login">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
