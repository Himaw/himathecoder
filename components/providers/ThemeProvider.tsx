'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Color = 'indigo' | 'emerald' | 'rose' | 'amber' | 'blue' | 'violet';

interface ThemeContextType {
  theme: Theme;
  primaryColor: Color;
  toggleTheme: () => void;
  setPrimaryColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorMap: Record<Color, string> = {
  indigo: '#6366f1',
  emerald: '#10b981',
  rose: '#f43f5e',
  amber: '#f59e0b',
  blue: '#3b82f6',
  violet: '#8b5cf6',
};

const colorRgbMap: Record<Color, string> = {
  indigo: '99, 102, 241',
  emerald: '16, 185, 129',
  rose: '244, 63, 94',
  amber: '245, 158, 11',
  blue: '59, 130, 246',
  violet: '139, 92, 246',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [primaryColor, setPrimaryColorState] = useState<Color>('indigo');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('primaryColor') as Color;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setPrimaryColorState(savedColor);
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Theme
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--background', '#09090b');
      root.style.setProperty('--foreground', '#fafafa');
      root.style.setProperty('--card', 'rgba(24, 24, 27, 0.4)');
      root.style.setProperty('--border', 'rgba(255, 255, 255, 0.05)');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--background', '#fafafa');
      root.style.setProperty('--foreground', '#09090b');
      root.style.setProperty('--card', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--border', 'rgba(0, 0, 0, 0.05)');
    }

    // Primary Color
    root.style.setProperty('--primary', colorMap[primaryColor]);
    root.style.setProperty('--primary-rgb', colorRgbMap[primaryColor]);
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('primaryColor', primaryColor);
  }, [theme, primaryColor, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setPrimaryColor = (color: Color) => {
    setPrimaryColorState(color);
  };

  return (
    <ThemeContext.Provider value={{ theme, primaryColor, toggleTheme, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
