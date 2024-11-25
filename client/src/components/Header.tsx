import { useRecoilState } from "recoil";
import { authState } from "@/stores/atoms";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme as useNextTheme } from "next-themes";
// import { AcmeLogo } from "@/AcmeLogo";

export default function Header() {
  const { theme, setTheme } = useNextTheme();
  const [auth, setAuth] = useRecoilState(authState); // 로그인 상태

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null }); // 로그아웃 처리
    // 추가적으로 로그아웃 API 호출이 필요할 수 있음
  };

  return (
    <Navbar shouldHideOnScroll>
      {/* 브랜드 로고 및 이름 */}
      <NavbarBrand>
        <img src="/tslogo.svg" alt="Minboard Logo" />
        <Link href="/" aria-current="page">
          <p className="font-bold text-inherit ml-2">Minboard</p>
        </Link>
      </NavbarBrand>

      {/* 중앙 네비게이션 메뉴 */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {auth.isAuthenticated && ( // 로그인한 사용자만 게시판, 프로필 링크 표시
          <>
            <NavbarItem>
              <Link color="foreground" href="/post">
                Bulletin Board
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/profile">
                Profile
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* 우측 메뉴 (로그인, 회원가입, 테마 전환 스위치) */}
      <NavbarContent justify="end">
        <NavbarItem>
          {/* flex-row로 변경하고 간격 조정 */}
          <div className="flex flex-row items-center gap-2">
            <SunIcon
              className={`w-5 h-5 ${theme === "light" ? "text-yellow-500" : "text-gray-400"}`}
            />
            <Switch
              checked={theme === "dark"}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
            <MoonIcon
              className={`w-5 h-5 ${theme === "dark" ? "text-blue-500" : "text-gray-400"}`}
            />
          </div>
        </NavbarItem>
        {auth.isAuthenticated ? (
          <>
            {/* 로그아웃 버튼 */}
            <NavbarItem>
              <Button
                color="secondary"
                variant="flat"
                onPress={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            {/* 로그인 및 회원가입 버튼 */}
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
