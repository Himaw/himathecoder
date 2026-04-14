'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTheme, themes } from '@/hooks/use-theme';

export default function Preloader({ 
  onComplete, 
  words = ["Hello", "Bonjour", "Ciao", "Olà", "नमस्ते", "สวัสดี", "မင်္ဂလာပါ", "ආයුබෝවන්", "안녕하세요", "こんにちは", "مرحبا", "Jambo", "你好", "Hallå", "Guten Tag", "Selamat", "Hallo", "Kumusta", "Welcome"]
}: { 
  onComplete?: () => void;
  words?: string[];
}) {
  const { mode, theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    let delay = 150;
    if (index === 0) {
      delay = 1000;
    } else if (index === words.length - 1) {
      delay = 1000;
    }

    const timeout = setTimeout(() => {
      if (index < words.length - 1) {
        setIndex(index + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, onComplete, words.length]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve: any = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] overflow-hidden"
    >
      {dimension.width > 0 && (
        <>
          {/* Background Glows to match the theme */}
          <div className="absolute top-1/4 left-1/3 h-[50vw] w-[50vw] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/3 h-[60vw] w-[60vw] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <div className="flex items-center text-[var(--foreground)] text-[32px] md:text-[42px] font-display font-black tracking-tighter uppercase">
              {words[index]}
            </div>
            
            <div className="h-[2px] w-24 overflow-hidden rounded-full bg-[var(--foreground)]/10">
              <motion.div 
                className="h-full bg-[var(--primary)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
