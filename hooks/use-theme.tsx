'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export const themes = {
  indigo: { hex: '#6366f1', rgb: '99, 102, 241' },
  emerald: { hex: '#10b981', rgb: '16, 185, 129' },
  rose: { hex: '#f43f5e', rgb: '244, 63, 94' },
  amber: { hex: '#f59e0b', rgb: '245, 158, 11' },
  cyan: { hex: '#06b6d4', rgb: '6, 182, 212' },
  violet: { hex: '#8b5cf6', rgb: '139, 92, 246' },
} as const;

export type ThemeColor = keyof typeof themes;
export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeColor>('indigo');
  const [mode, setModeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    // Load saved theme color
    const savedTheme = localStorage.getItem('theme-color') as ThemeColor;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      applyThemeColor(savedTheme);
    }

    // Load saved theme mode
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setModeState(savedMode);
      applyThemeMode(savedMode);
    } else {
      // Default to dark mode
      applyThemeMode('dark');
    }
  }, []);

  const applyThemeColor = (color: ThemeColor) => {
    const { hex, rgb } = themes[color];
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-rgb', rgb);
  };

  const applyThemeMode = (newMode: ThemeMode) => {
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    localStorage.setItem('theme-color', newTheme);
    applyThemeColor(newTheme);
  };

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setModeState(newMode);
    localStorage.setItem('theme-mode', newMode);
    applyThemeMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
