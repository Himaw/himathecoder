'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Magnetic from '@/components/ui/Magnetic';

export default function Hero() {
  return (
    <div className="relative flex min-h-0 h-full w-full flex-col items-center justify-center px-6 md:flex-row md:gap-12 md:px-12 lg:gap-20">
      <div className="flex flex-col gap-6 text-center md:text-left z-10 w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-indigo-500 text-xs font-bold uppercase tracking-[0.4em] md:text-sm">
            Software Engineer @ Alstom
          </h2>
        </motion.div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black leading-[0.9] tracking-tighter uppercase text-white"
          >
            Himasara <br />
            <span className="text-[0.6em] text-zinc-500">Warnakulasuriya</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-base text-zinc-400 md:text-lg lg:text-xl leading-relaxed"
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
              href="https://linkedin.com/in/himasara" 
              target="_blank" 
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:pr-12 md:px-10 md:py-5 md:text-sm"
            >
              <span className="relative z-10">Connect on LinkedIn</span>
              <div className="absolute inset-0 -z-0 bg-indigo-500 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="relative mt-8 md:mt-0 w-full md:w-1/2 flex justify-center items-center"
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
          className="relative aspect-[3/4] w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] overflow-hidden rounded-3xl border border-white/10 glass shadow-2xl"
        >
          <Image
            src="https://picsum.photos/seed/hima-portrait/900/1200"
            alt="Himasara Profile"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-10 md:-right-8 md:top-20 rounded-xl bg-indigo-500 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-widest text-white shadow-2xl md:px-6 md:py-3 md:text-xs"
        >
          HimaTheCoder
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-4 bottom-10 md:-left-8 md:bottom-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 font-display text-[8px] font-bold uppercase tracking-widest text-white shadow-2xl md:px-6 md:py-3 md:text-[10px]"
        >
          Full Stack Dev
        </motion.div>
      </motion.div>
    </div>
  );
}
