"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Palette, Sun, Moon, Gamepad2 } from "lucide-react";
import { useTheme, themes } from "@/hooks/use-theme";
import Magnetic from "@/components/ui/Magnetic";

const navLinks = [
  { name: "Experience", id: "experience" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
  { name: "Publications", id: "publications" },
  { name: "Skills", id: "skills" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { theme: currentTheme, setTheme, mode, toggleMode } = useTheme();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 z-50 w-full px-4 py-4 md:px-12 md:py-6 backdrop-blur-xl bg-[var(--background)]/80 border-b border-[var(--border)]/50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              const el = document.getElementById("hero");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-display text-xl font-bold tracking-tighter uppercase text-[var(--foreground)]">
              HimaTheCoder
            </span>
          </Link>

          {/* Desktop Nav Links + Controls */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative px-4 py-2 text-[11px] font-medium uppercase tracking-widest text-[var(--foreground)]/50 transition-all duration-300 hover:text-[var(--foreground)]"
              >
                {link.name}
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </button>
            ))}

            <div className="flex items-center gap-3 border-l border-[var(--border)] pl-6 ml-2">
              {/* Mode Toggle */}
              <button
                onClick={toggleMode}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all hover:bg-[var(--foreground)]/10"
                aria-label="Toggle dark/light mode"
              >
                {mode === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Color Picker Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all hover:bg-[var(--foreground)]/10"
                  aria-label="Change theme color"
                >
                  <Palette className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {showColorPicker && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 top-full mt-4 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)]/90 p-3 backdrop-blur-xl shadow-2xl"
                    >
                      {Object.entries(themes).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key as any);
                            setShowColorPicker(false);
                          }}
                          className={`h-6 w-6 rounded-full transition-transform hover:scale-125 ${
                            currentTheme === key
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
                              : ""
                          }`}
                          style={{ backgroundColor: value.hex }}
                          title={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Game Page Toggle */}
              <Link
                href="/game"
                className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all hover:bg-[var(--foreground)]/10"
                aria-label="Play Game"
                title="Play Game"
              >
                <Gamepad2 className="h-5 w-5" />
              </Link>

              <Magnetic>
                <a
                  href="mailto:himasara.warna@gmail.com"
                  className="rounded-full bg-[var(--foreground)] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[var(--background)] transition-transform hover:scale-105 active:scale-95"
                >
                  Let&apos;s Talk
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="relative z-50 md:hidden text-[var(--foreground)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--background)]/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  onClick={() => scrollToSection(link.id)}
                  className="font-display text-3xl font-bold uppercase tracking-widest text-[var(--foreground)] transition-colors hover:text-primary"
                >
                  {link.name}
                </motion.button>
              ))}
              <button
                onClick={toggleMode}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all hover:bg-[var(--foreground)]/10"
                aria-label="Toggle dark/light mode"
              >
                {mode === "dark" ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>

              <div className="mt-4 flex gap-4">
                {Object.entries(themes).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`h-8 w-8 rounded-full transition-transform ${
                      currentTheme === key
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)] scale-110"
                        : ""
                    }`}
                    style={{ backgroundColor: value.hex }}
                  />
                ))}
              </div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                href="mailto:himasara.warna@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 rounded-full bg-[var(--foreground)] px-8 py-3 text-sm font-bold uppercase tracking-widest text-[var(--background)] transition-transform hover:scale-105 active:scale-95"
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
