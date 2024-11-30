import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/stores/atoms/authAtom";
import axiosInstance from "@/utils/axiosInstance";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      setAuth({ isAuthenticated: false, user: null });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { label: "게시판", href: "/post" },
    ...(auth.isAuthenticated ? [{ label: "회원정보", href: "/profile" }] : []),
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      classNames={{
        menu: "top-[calc(56px)] h-[calc(50vh)] max-h-[200px] rounded-b-xl shadow-xl overflow-hidden",
        menuItem: "py-3 px-4",
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "닫기" : "메뉴 열기"}
          onChange={() => setIsMenuOpen(!isMenuOpen)}
        />
      </NavbarContent>

      <NavbarBrand>
        <Link href="/" aria-current="page" className="flex items-center">
          <img src="/mblogo.png" alt="Minboard Logo" className="h-8 mr-2" />
          <p className="font-bold text-inherit">MINBOARD</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {auth.isAuthenticated ? (
          <NavbarItem>
            <Button color="secondary" variant="flat" onPress={handleLogout}>
              로그아웃
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">로그인</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                회원가입
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
