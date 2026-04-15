"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import ScrollingBar from "@/components/sections/ScrollingBar";
import Preloader from "@/components/ui/Preloader";
import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const { mode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const animationDone = useRef(false);
  const assetsDone = useRef(false);

  const tryDismiss = useCallback(() => {
    if (animationDone.current && assetsDone.current) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const markAssetsDone = () => {
      assetsDone.current = true;
      document.body.style.cursor = "default";
      tryDismiss();
    };

    if (document.readyState === "complete") {
      markAssetsDone();
    } else {
      window.addEventListener("load", markAssetsDone, { once: true });
    }

    const safetyTimeout = setTimeout(() => {
      markAssetsDone();
    }, 3000);

    return () => clearTimeout(safetyTimeout);
  }, [tryDismiss]);

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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-[var(--foreground)]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            onComplete={() => {
              animationDone.current = true;
              tryDismiss();
            }}
          />
        )}
      </AnimatePresence>

      <div className={`relative w-full ${isLoading ? "invisible" : "visible"}`}>
        <CustomCursor />
        <Navbar />

        {/* Page Sections */}
        {/* Tech BG Video for Hero spanning full width */}
        <div className="absolute top-0 left-0 w-full h-[100vh] z-0 overflow-hidden">
          <video
            key={mode} // Using key to force re-render when mode changes
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80 dark:opacity-30"
          >
            <source
              src={mode === "light" ? "/tech-bg6.mp4" : "/tech-bg5.mp4"}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-80% to-[var(--background)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 md:px-12 border-b border-[var(--border)] overflow-hidden"
          >
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <Hero />
            </div>
          </section>

          <ScrollingBar />

          <section
            id="experience"
            className="px-4 py-16 md:py-24 md:px-12 border-b border-[var(--border)]"
          >
            <Experience />
          </section>

          <section
            id="education"
            className="px-4 py-16 md:py-24 md:px-12 border-b border-[var(--border)]"
          >
            <Education />
          </section>

          <section
            id="projects"
            className="px-4 py-16 md:py-24 md:px-12 border-b border-[var(--border)]"
          >
            <Projects />
          </section>

          <section
            id="publications"
            className="px-4 py-16 md:py-24 md:px-12 border-b border-[var(--border)]"
          >
            <Publications />
          </section>

          <section
            id="skills"
            className="px-4 py-16 md:py-24 md:px-12 border-b border-[var(--border)]"
          >
            <Skills />
          </section>

          <section id="contact" className="px-4 py-16 md:py-24 md:px-12">
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[var(--border)] mt-12">
          <div className="mx-auto max-w-[1600px] px-8 py-10 md:px-16 md:py-14">
            <h3 className="mb-6 font-display text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80">
              Contact &amp; Socials
            </h3>
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    Email
                  </p>
                </div>
                <a
                  href="mailto:himasara.warna@gmail.com"
                  className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors"
                >
                  himasara.warna@gmail.com
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    Phone
                  </p>
                </div>
                <p className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90">
                  +66 (0) 64 671 2502
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    LinkedIn
                  </p>
                </div>
                <a
                  href="https://linkedin.com/in/himaofficial"
                  target="_blank"
                  className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors"
                >
                  in/himaofficial
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-zinc-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <p className="text-[9px] font-bold uppercase tracking-widest">
                    GitHub
                  </p>
                </div>
                <a
                  href="https://github.com/Himaw"
                  target="_blank"
                  className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors"
                >
                  github/Himaw
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
