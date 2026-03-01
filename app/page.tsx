'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Preloader from '@/components/ui/Preloader';
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
  const [isLoading, setIsLoading] = useState(true);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const preloadHeroImage = () =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block forever on error
        img.src = '/img/hima.jpg';
      });

    const handleLoad = async () => {
      // Wait for the hero image to load
      await preloadHeroImage();
      // We don't set setIsLoading(false) here anymore. 
      // Instead, we wait for Preloader to finish its sequence.
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const moveX = useTransform(springX, [0, 2000], [-100, 100]);
  const moveY = useTransform(springY, [0, 2000], [-100, 100]);

  const isEmbeddedScroll = (target: HTMLElement | null, deltaY?: number): boolean => {
    let current = target;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    while (current && current !== document.body) {
      const isScrollable = current.classList.contains('custom-scrollbar') || 
                           window.getComputedStyle(current).overflowY === 'auto' || 
                           window.getComputedStyle(current).overflowY === 'scroll';
      
      if (isScrollable && current.scrollHeight > current.clientHeight) {
        // On mobile, always block slide transitions if we're over a scrollable area
        if (isMobile) return true;

        // On desktop, only block if there's actual room to scroll in that direction
        if (deltaY !== undefined) {
          if (deltaY > 0) { // Scrolling Down
            const canScrollDown = current.scrollTop + current.clientHeight < current.scrollHeight - 2;
            if (canScrollDown) return true;
          } else if (deltaY < 0) { // Scrolling Up
            const canScrollUp = current.scrollTop > 2;
            if (canScrollUp) return true;
          }
        } else {
          // If no deltaY provided (e.g. TouchStart), assume it's embedded
          return true;
        }
      }
      current = current.parentElement;
    }
    return false;
  };

  const handleScroll = useCallback((e: WheelEvent) => {
    if (isAnimating) return;
    
    // Check if scrolling inside a scrollable child, passing deltaY for boundary detection
    if (isEmbeddedScroll(e.target as HTMLElement, e.deltaY)) return;

    const threshold = 80;
    if (e.deltaY > threshold) {
      if (currentSlide < slides.length - 1) {
        setIsAnimating(true);
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (e.deltaY < -threshold) {
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

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartY.current === null || isAnimating) return;
    
    // Check if touching inside a scrollable child (deltaY not applicable here simple swipe)
    if (isEmbeddedScroll(e.target as HTMLElement)) {
      touchStartY.current = null;
      return;
    }

    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const threshold = 100; // Increased for better deliberate swipes
    if (deltaY > threshold && currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setCurrentSlide((prev) => prev + 1);
    } else if (deltaY < -threshold && currentSlide > 0) {
      setIsAnimating(true);
      setCurrentSlide((prev) => prev - 1);
    }
    touchStartY.current = null;
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleScroll, handleKeyDown, handleTouchStart, handleTouchEnd, mouseX, mouseY]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide || index < 0 || index >= slides.length) return;
    setIsAnimating(true);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];
  const Component = slide?.component;

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden text-[var(--foreground)] touch-none">
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div className={`relative w-full h-full ${isLoading ? 'invisible' : 'visible'}`}>
        <CustomCursor />
        <Navbar onNavigate={goToSlide} />

      {/* Persistent Interactive Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[var(--background)] transition-colors duration-500">
        <motion.div 
          style={{ x: moveX, y: moveY }}
          className="absolute inset-[-20%] opacity-60"
        >
          <div className="absolute top-1/4 left-1/3 h-[50vw] w-[50vw] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 h-[60vw] w-[60vw] rounded-full bg-blue-600/5 blur-[150px]" />
          
          {/* Dot Grid that moves with mouse and drifts */}
          <div className="absolute inset-0 h-full w-full opacity-30 dark:opacity-50 bg-drift" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, var(--primary) 1.2px, transparent 1.2px)', 
              backgroundSize: '40px 40px',
              animation: 'drift 30s linear infinite'
            }} 
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">

        {/* Navigation Dots */}
        <div className="fixed right-8 top-1/2 z-50 hidden md:flex -translate-y-1/2 flex-col gap-6">
          {slides.map((slideItem, index) => (
            <button
              key={slideItem.id}
              onClick={() => goToSlide(index)}
              className="group relative flex items-center justify-end"
            >
              {/* Slide Name Tooltip */}
              <span className="mr-6 absolute right-full opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-display text-[10px] font-black uppercase tracking-widest text-primary/80 whitespace-nowrap pointer-events-none">
                {slideItem.id}
              </span>

              <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'scale-125 bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' 
                  : 'bg-foreground/20 hover:bg-foreground/40'
              }`} />
            </button>
          ))}
        </div>

        {/* Slide Indicator (Mobile) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 md:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'h-2 w-6 bg-primary'
                  : 'h-2 w-2 bg-foreground/20'
              }`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons (Tactile Up/Down) */}
        <div className="fixed right-6 bottom-8 z-50 flex md:hidden flex-col gap-4">
          <button
            onClick={() => currentSlide > 0 && goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full border transition-all duration-300 ${
              currentSlide === 0 
                ? 'opacity-10 scale-90 border-primary/20 text-primary/20' 
                : 'bg-[var(--background)]/80 backdrop-blur-md border-primary/50 text-primary hover:bg-primary hover:text-white active:scale-90 shadow-lg shadow-primary/10'
            }`}
            aria-label="Previous Slide"
          >
            <ChevronUp size={24} />
          </button>
          <button
            onClick={() => currentSlide < slides.length - 1 && goToSlide(currentSlide + 1)}
            disabled={currentSlide === slides.length - 1}
            className={`p-3 rounded-full border transition-all duration-300 ${
              currentSlide === slides.length - 1 
                ? 'opacity-10 scale-90 border-primary/20 text-primary/20' 
                : 'bg-[var(--background)]/80 backdrop-blur-md border-primary/50 text-primary hover:bg-primary hover:text-white active:scale-90 shadow-lg shadow-primary/10'
            }`}
            aria-label="Next Slide"
          >
            <ChevronDown size={24} />
          </button>
        </div>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-[100] h-1 w-full bg-primary origin-left"
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
            className="absolute inset-0 flex h-full w-full items-center justify-center pt-12 md:pt-20"
          >
            <div className="h-full w-full max-w-[1280px] md:max-w-[1600px]">
              {Component && <Component />}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
