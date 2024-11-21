import { useUser } from '@/components/UserContext';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Link href="/">
        <h1 className="text-xl cursor-pointer">Minboard</h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <>
            <span>{user.username}</span>
            <Link href="/post">
              <button className="px-4 py-2 bg-green-500 text-white rounded">게시판</button>
            </Link>
            <Link href="/profile">
              <button className="px-4 py-2 bg-green-500 text-white rounded">프로필 수정</button>
            </Link>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : ( <> 
        <Link href="/login">
         <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
         </Link> <Link href="/register"> <button className="px-4 py-2 bg-green-500 text-white rounded">회원가입</button> </Link> </> )}
      </div>
    </header>
  );
};

export default Header;
