'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import { ChevronUp, ChevronDown } from 'lucide-react';

const slides = [
  { id: 'hero', component: Hero },
  { id: 'experience', component: Experience },
  { id: 'education', component: Education },
  { id: 'projects', component: Projects },
  { id: 'skills', component: Skills },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const moveX = useTransform(springX, [0, 2000], [-100, 100]);
  const moveY = useTransform(springY, [0, 2000], [-100, 100]);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (isAnimating) return;

    if (e.deltaY > 50) {
      if (currentSlide < slides.length - 1) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (e.deltaY < -50) {
      if (currentSlide > 0) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev - 1);
      }
    }
  }, [currentSlide, isAnimating]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isAnimating) return;

    if (e.key === 'ArrowDown') {
      if (currentSlide < slides.length - 1) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (currentSlide > 0) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev - 1);
      }
    }
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown, mouseX, mouseY]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide || index < 0 || index >= slides.length) return;
    setIsAnimating(true);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];
  const Component = slide?.component;

  return (
    <main className="relative h-screen w-screen overflow-hidden text-white">
      <CustomCursor />
      <Navbar onNavigate={goToSlide} />

      {/* Persistent Interactive Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#09090b]">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="absolute inset-[-20%] opacity-60"
        >
          <div className="absolute top-1/4 left-1/3 h-[50vw] w-[50vw] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[60vw] w-[60vw] rounded-full bg-blue-600/5 blur-[150px]" />
          
          {/* Dot Grid that moves with mouse and drifts */}
          <div className="absolute inset-0 h-full w-full opacity-50 bg-drift" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #6366f1 1.2px, transparent 1.2px)', 
              backgroundSize: '40px 40px',
              animation: 'drift 30s linear infinite'
            }} 
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">
        <Navbar onNavigate={goToSlide} />

        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-6">
          {slides.map((slideItem, index) => (
            <button
              key={slideItem.id}
              onClick={() => goToSlide(index)}
              className="group relative flex items-center justify-end"
            >
              {/* Slide Name Tooltip */}
              <span className="mr-6 absolute right-full opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-display text-[10px] font-black uppercase tracking-widest text-indigo-400 whitespace-nowrap pointer-events-none">
                {slideItem.id}
              </span>

              <div className={`h-2 w-2 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'scale-150 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                  : 'bg-white/20 hover:bg-white/50'
              }`} />
            </button>
          ))}
        </div>

        {/* Slide Controls (Mobile) */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 md:hidden">
          <button 
            onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          <button 
            onClick={() => currentSlide < slides.length - 1 && goToSlide(currentSlide + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-[100] h-1 w-full bg-indigo-500 origin-left"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentSlide}
            initial={{ y: '20%', opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: '-20%', opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex h-full w-full items-center justify-center pt-16 md:pt-20"
          >
            <div className="h-full w-full max-w-[1600px]">
              {Component && <Component />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
  </main>
);
}
