import { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import '@/styles/globals.css';
import { RecoilRoot } from 'recoil';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
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
            <Footer />
          </div>
        </NextUIProvider>
      </NextThemesProvider>
    </RecoilRoot>
  );
}
