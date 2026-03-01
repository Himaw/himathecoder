'use client';

import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const languages = ['Java', 'JavaScript', 'TypeScript', 'Python', 'MATLAB', 'C++', 'PHP', 'Go', 'SQL', 'HTML5', 'CSS3'];
const technologies = [
  'React', 'React Native', 'NextJS', 'NodeJS', 'VueJS', 'GraphQL', 
  'Angular', 'Flask', 'Spring Boot', 'MongoDB', 'ExpressJs', 
  'Supabase', 'Git', 'Docker', 'Google Cloud', 'Microsoft Azure'
];

export default function Skills() {
  return (
    <div className="flex h-full w-full flex-col px-5 py-6 md:px-12 md:py-10">
      {/* Fixed Header */}
      <div className="shrink-0 z-10 backdrop-blur-md pb-4 md:pb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Technical <span className="text-primary">Capabilities</span>
        </motion.h2>
      </div>

      {/* Scrollable Middle Content */}
      <div className="flex-1 pr-4 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 font-display text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Languages I love to work with
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary text-[var(--foreground)]"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-8 font-display text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Technologies I love to build with
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary text-[var(--foreground)]"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="shrink-0 mt-4 md:mt-8 border-t border-[var(--border)] pt-4 md:pt-6 pb-8 md:pb-2">
        <h3 className="mb-6 font-display text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80">
          Contact & Socials
        </h3>
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-600">
              <Mail className="h-3 w-3" />
              <p className="text-[9px] font-bold uppercase tracking-widest">Email</p>
            </div>
            <a href="mailto:himasara.warna@gmail.com" className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors">
              himasara.warna@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-600">
              <Phone className="h-3 w-3" />
              <p className="text-[9px] font-bold uppercase tracking-widest">Phone</p>
            </div>
            <p className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90">
              +66 (0) 64 671 2502
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-600">
              <Linkedin className="h-3 w-3" />
              <p className="text-[9px] font-bold uppercase tracking-widest">LinkedIn</p>
            </div>
            <a href="https://linkedin.com/in/himasara" target="_blank" className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors">
              in/himaofficial
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-600">
              <Github className="h-3 w-3" />
              <p className="text-[9px] font-bold uppercase tracking-widest">GitHub</p>
            </div>
            <a href="https://github.com/Himaw" target="_blank" className="font-display text-sm font-bold uppercase text-[var(--foreground)]/90 hover:text-primary transition-colors">
              github/Himaw
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
