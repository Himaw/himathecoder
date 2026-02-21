'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import Magnetic from '@/components/ui/Magnetic';

const navLinks = [
  { name: 'Experience', index: 1 },
  { name: 'Education', index: 2 },
  { name: 'Projects', index: 3 },
  { name: 'Skills', index: 4 },
];

interface NavbarProps {
  onNavigate?: (index: number) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate?.(index);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 z-50 w-full px-6 py-8 md:px-12"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button onClick={() => handleNavigate(0)} className="group flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-indigo-500 transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-display text-xl font-bold tracking-tighter uppercase">HimaTheCoder</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <Magnetic>
              <a 
                href="mailto:himasara.warna@gmail.com"
                className="rounded-full bg-white px-6 py-2 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
              >
                Let&apos;s Talk
              </a>
            </Magnetic>
          </div>

          <button
            className="relative z-50 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  onClick={() => handleNavigate(link.index)}
                  className="font-display text-3xl font-bold uppercase tracking-widest text-white transition-colors hover:text-indigo-400"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                href="mailto:himasara.warna@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
