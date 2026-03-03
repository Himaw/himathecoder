import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Himasara | Portfolio',
  description: 'Portfolio of Himasara Warnakulasuriya, a high-end, immersive software engineer.',
};

import { ThemeProvider } from '@/hooks/use-theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/coin-indigo.svg" />
        <link rel="apple-touch-icon" href="/favicon/coin-indigo.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#6 marginal366f1" id="theme-color-meta" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://himathecoder.com/" />
        <meta property="og:title" content="Himasara | Portfolio" />
        <meta property="og:description" content="I Turn Thoughts into Digital Realities. Immersive Portfolio of Himasara Warnakulasuriya." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://himathecoder.com/" />
        <meta property="twitter:title" content="Himasara | Portfolio" />
        <meta property="twitter:description" content="I Turn Thoughts into Digital Realities. Immersive Portfolio of Himasara Warnakulasuriya." />
      </head>
      <body className="antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
