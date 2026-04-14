'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import TetrisGame from '@/components/sections/TetrisGame';
import Navbar from '@/components/layout/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';

// Deterministic array to avoid Hydration mismatches while providing random-looking placements
const fallingShapes = [
  { shape: [[1,1,1,1]], color: '#0ea5e9', left: '5%', duration: 25, delay: 0, rotate: 360 },
  { shape: [[0,1,0],[1,1,1]], color: '#a855f7', left: '15%', duration: 22, delay: -5, rotate: -360 },
  { shape: [[1,1],[1,1]], color: '#eab308', left: '25%', duration: 28, delay: -12, rotate: 360 },
  { shape: [[0,1],[0,1],[1,1]], color: '#f59e0b', left: '85%', duration: 20, delay: -2, rotate: -360 },
  { shape: [[1,1,0],[0,1,1]], color: '#ef4444', left: '75%', duration: 30, delay: -18, rotate: 360 },
  { shape: [[1,0],[1,0],[1,1]], color: '#3b82f6', left: '90%', duration: 24, delay: -8, rotate: -360 },
  { shape: [[0,1,1],[1,1,0]], color: '#22c55e', left: '65%', duration: 26, delay: -15, rotate: 360 },
  { shape: [[1,1,1,1]], color: '#0ea5e9', left: '35%', duration: 21, delay: -20, rotate: -360 },
  { shape: [[0,1,0],[1,1,1]], color: '#a855f7', left: '55%', duration: 29, delay: -7, rotate: 360 },
  { shape: [[1,1],[1,1]], color: '#eab308', left: '45%', duration: 23, delay: -25, rotate: -360 },
  { shape: [[0,1],[0,1],[1,1]], color: '#f59e0b', left: '95%', duration: 27, delay: -11, rotate: 360 },
  { shape: [[1,1,0],[0,1,1]], color: '#ef4444', left: '10%', duration: 32, delay: -3, rotate: -360 }
];

export default function GamePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const enforceDesktopOnly = () => {
      if (window.innerWidth < 1024) {
        router.replace('/');
      }
    };
    
    enforceDesktopOnly();
    window.addEventListener('resize', enforceDesktopOnly);
    return () => window.removeEventListener('resize', enforceDesktopOnly);
  }, [router]);

  // Background Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const moveX = useTransform(springX, [0, 2000], [-100, 100]);
  const moveY = useTransform(springY, [0, 2000], [-100, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-[100dvh] bg-[var(--background)] overflow-hidden text-[var(--foreground)] flex flex-col transition-colors duration-300">
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader words={["Lets play TETRIS!"]} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className={`relative flex flex-col pt-32 pb-12 w-full h-full flex-1 ${isLoading ? 'invisible' : 'visible'}`}>
        <CustomCursor />
        
        <nav className="absolute z-50 pointer-events-auto w-full top-0">
           <Navbar />
        </nav>

        {/* Unique Wider Tetris Window Container with Glow */}
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8 flex-1 flex flex-col justify-center relative z-10 transition-all duration-500">
          <div className="relative w-full rounded-2xl md:rounded-3xl border border-[var(--primary)]/30 bg-[var(--card)]/40 p-4 md:p-8 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(var(--primary-rgb),0.3)] overflow-hidden">
            
            {/* Falling Tetris Blocks Animation */}
            <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40 z-0">
              {fallingShapes.map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: item.left, top: '-150px' }}
                  animate={{ 
                    y: ['0vh', '150vh'],
                    rotate: [0, item.rotate] 
                  }}
                  transition={{ 
                    duration: item.duration, 
                    repeat: Infinity, 
                    delay: item.delay, 
                    ease: 'linear' 
                  }}
                >
                  <div className="flex flex-col gap-[2px]">
                    {item.shape.map((row, r) => (
                      <div key={r} className="flex gap-[2px]">
                        {row.map((cell, c) => (
                          <div 
                            key={c} 
                            className={`w-4 h-4 md:w-8 md:h-8 rounded-[2px] ${cell ? '' : 'opacity-0'}`}
                            style={{ backgroundColor: cell ? item.color : 'transparent' }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Game Board (z-10 ensures it renders above the falling blocks) */}
            <div className="relative z-10 w-full">
              <TetrisGame />
            </div>

            {/* Subtle inner glow accents */}
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-80" />
            <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-80" />
          </div>
        </div>

        {/* Persistent Interactive Background to match Home */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--background)] transition-colors duration-500">
          <motion.div 
            style={{ x: moveX, y: moveY }}
            className="absolute inset-[-20%] opacity-60"
          >
            <div className="absolute top-1/4 left-1/3 h-[50vw] w-[50vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)' }} />
            <div className="absolute bottom-1/4 right-1/3 h-[60vw] w-[60vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
