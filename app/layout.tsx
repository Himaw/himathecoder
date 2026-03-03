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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/coin-indigo.svg" />
        <link rel="apple-touch-icon" href="/favicon/coin-indigo.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#6366f1" id="theme-color-meta" />
        
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

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-color') || 'indigo';
                  const mode = localStorage.getItem('theme-mode') || 'dark';
                  
                  const themes = {
                    indigo: { hex: '#6366f1', rgb: '99, 102, 241' },
                    emerald: { hex: '#10b981', rgb: '16, 185, 129' },
                    rose: { hex: '#f43f5e', rgb: '244, 63, 94' },
                    amber: { hex: '#f59e0b', rgb: '245, 158, 11' },
                    cyan: { hex: '#06b6d4', rgb: '6, 182, 212' },
                    violet: { hex: '#8b5cf6', rgb: '139, 92, 246' },
                  };

                  const themeData = themes[theme] || themes.indigo;
                  document.documentElement.style.setProperty('--primary', themeData.hex);
                  document.documentElement.style.setProperty('--primary-rgb', themeData.rgb);
                  
                  // Update favicon and theme-color meta tag instantly
                  const favicon = document.querySelector("link[rel*='icon']");
                  if (favicon) favicon.href = "/favicon/coin-" + theme + ".svg";
                  
                  const appleIcon = document.querySelector("link[rel='apple-touch-icon']");
                  if (appleIcon) appleIcon.href = "/favicon/coin-" + theme + ".svg";
                  
                  const themeMeta = document.getElementById('theme-color-meta');
                  if (themeMeta) themeMeta.setAttribute('content', themeData.hex);

                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
