import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Great_Vibes, Cinzel_Decorative, Inter } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
});

const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${greatVibes.variable} ${cinzel.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
