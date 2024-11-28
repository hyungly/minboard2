import { Navbar, NavbarContent } from "@nextui-org/react";
import { Sun as LucideSun, Moon as LucideMoon } from 'lucide-react';
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export default function Footer() {
  const { theme, setTheme } = useNextTheme();

  return (
    <>
      <div className="pb-16"> {/* 이 div에 패딩을 추가합니다 */}
        {/* 여기에 페이지의 다른 콘텐츠가 들어갑니다 */}
      </div>
      <div className="fixed bottom-0 left-0 right-0 w-full">
        <Navbar className="w-full">
          <NavbarContent justify="center" className="w-full max-w-md mx-auto">
            {/* 테마 스위치 */}
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <LucideSun
                className={`w-5 h-5 ${theme === "light" ? "text-yellow-500" : "text-gray-400"}`}
              />
              <Switch
                aria-label="테마 전환"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                color="secondary"
              />
              <LucideMoon
                className={`w-5 h-5 ${theme === "dark" ? "text-blue-500" : "text-gray-400"}`}
              />
            </div>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
}
