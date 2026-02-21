'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import Magnetic from '@/components/ui/Magnetic';

const navLinks = [
  { name: 'Experience', index: 1 },
  { name: 'Education', index: 2 },
  { name: 'Projects', index: 3 },
  { name: 'Skills', index: 4 },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 z-50 w-full px-6 py-8 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-display text-xl font-bold tracking-tighter uppercase">HimaTheCoder</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Magnetic>
            <a 
              href="mailto:himasara@himathecoder.com"
              className="rounded-full bg-white px-6 py-2 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
            >
              Let&apos;s Talk
            </a>
          </Magnetic>
        </div>

        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </motion.nav>
  );
}
