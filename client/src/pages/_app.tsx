import { AppProps } from 'next/app';
import { UserProvider } from '@/components/UserContext';
import '@/styles/globals.css';
import Header from '@/components/Header'; 
import Footer from '@/components/Footer'; // 다크모드 토글 버튼 포함

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto p-4">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}
