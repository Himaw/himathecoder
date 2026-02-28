'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {
  return (
    <div className="relative flex min-h-0 h-full w-full flex-col items-center justify-center px-5 gap-2 md:flex-row md:gap-12 md:px-12 lg:gap-20">
      <div className="flex flex-col gap-3 md:gap-6 text-center md:text-left z-10 w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-primary text-sm font-bold uppercase tracking-[0.4em] md:text-sm">
            Software Engineer
          </h2>
        </motion.div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase text-[var(--foreground)]"
          >
            Himasara <br />
            <span className="text-[0.6em] text-[var(--muted)]">Warnakulasuriya</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-sm text-[var(--muted)] md:text-base lg:text-lg leading-relaxed"
        >
          I Turn Thoughts into Digital Realities. A passionate software developer excelling in problem-solving, full-stack innovation, and crafting immersive digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center md:justify-start"
        >
          <Magnetic>
            <a 
              href="https://linkedin.com/in/himaofficial" 
              target="_blank" 
              className="group relative overflow-hidden rounded-full bg-[var(--foreground)] px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--background)] transition-all hover:pr-12 md:px-10 md:py-5 md:text-sm"
            >
              <span className="relative z-10">Connect on LinkedIn</span>
              <div className="absolute inset-0 -z-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="relative mt-4 md:mt-0 w-full md:w-1/2 flex justify-center items-center"
      >
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative aspect-[3/4] w-full max-w-[220px] md:max-w-[400px] lg:max-w-[450px] max-h-[33vh] md:max-h-none overflow-hidden rounded-3xl border border-[var(--border)] glass shadow-2xl"
        >
          <Image
            src="/img/hima.jpg"
            alt="Himasara Profile"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-3 top-8 md:-right-8 md:top-20 rounded-xl bg-primary px-3 py-1.5 font-display text-[8px] md:text-sm font-bold uppercase tracking-widest text-[#ffffff] shadow-2xl md:px-6 md:py-3"
        >
          AI Enthusiast
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-3 bottom-8 md:-left-8 md:bottom-20 rounded-xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-md px-3 py-1.5 font-display text-[6px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] shadow-2xl md:px-6 md:py-3"
        >
          Full Stack Dev
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden md:flex"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">
          Scroll to explore
        </span>
        <div className="relative h-10 w-6 rounded-full border-2 border-[var(--border)]">
          <motion.div
            animate={{ 
              y: [4, 24, 4],
              opacity: [1, 0, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
}
