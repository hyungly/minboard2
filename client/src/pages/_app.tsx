import { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { UserProvider } from '@/components/UserContext';
import '@/styles/globals.css';
import { RecoilRoot } from 'recoil';
import Header from '@/components/Header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <UserProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
            light: 'light',
            dark: 'dark',
          }}
        >
          <NextUIProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="container mx-auto p-4">
                <Component {...pageProps} />
              </main>
            </div>
          </NextUIProvider>
        </NextThemesProvider>
      </UserProvider>
    </RecoilRoot>
  );
}
