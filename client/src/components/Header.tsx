import { useUser } from '@/components/UserContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const { user, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // 모바일 뷰가 아니면 메뉴를 닫기
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    if (isMobileView) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50">
      <Link href="/">
        <h1 className="text-xl cursor-pointer">Minboard</h1>
      </Link>
      <div className="flex items-center">
        {isMobileView && (
          <button
            className="md:hidden px-4 py-2 bg-blue-500 text-white rounded"
            onClick={toggleMenu}
          >
            ☰
          </button>
        )}
        <nav
          className={`fixed top-0 right-0 w-40 bg-gray-100 dark:bg-gray-900
          ${isMobileView ? (isMenuOpen ? 'block pt-16' : 'hidden') : 'flex items-center md:static md:w-auto md:bg-transparent'}`}
        >
          <div className="flex flex-col md:flex-row items-center">
            {user ? (
              <>
                <span className="mb-4 md:mb-0 md:mr-4">{user.username} 님</span>
                <Link href="/post">
                  <button className="px-4 py-2 bg-green-500 text-white rounded mb-4 md:mb-0 md:mr-4">
                    게시판
                  </button>
                </Link>
                <Link href="/profile">
                  <button className="px-4 py-2 bg-green-500 text-white rounded mb-4 md:mb-0 md:mr-4">
                    프로필 수정
                  </button>
                </Link>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded mb-4 md:mb-0 md:mr-4">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 bg-green-500 text-white rounded">
                    회원가입
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {isMenuOpen && isMobileView && (
        <button
          className="md:hidden px-4 py-2 bg-blue-500 text-white rounded fixed top-2 right-2"
          onClick={toggleMenu}
        >
          ☰
        </button>
      )}
    </header>
  );
};

export default Header;
