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
    <div className="flex h-full w-full flex-col px-6 py-20 md:px-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mb-12 font-display text-4xl font-black uppercase tracking-tighter md:text-6xl"
      >
        Technical <span className="text-indigo-500">Capabilities</span>
      </motion.h2>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar flex flex-col">
        <div className="flex-1">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h3 className="mb-8 font-display text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">
                Languages I love to work with
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-widest transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-500"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-8 font-display text-xs font-bold uppercase tracking-[0.3em] text-indigo-500">
                Technologies I love to build with
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-widest transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-500"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-10 pb-4">
          <h3 className="mb-6 font-display text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500/80">
            Contact & Socials
          </h3>
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-600">
                <Mail className="h-3 w-3" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Email</p>
              </div>
              <a href="mailto:himasara.warna@gmail.com" className="font-display text-sm font-bold uppercase text-white/90 hover:text-indigo-500 transition-colors">
                himasara.warna@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-600">
                <Phone className="h-3 w-3" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Phone</p>
              </div>
              <p className="font-display text-sm font-bold uppercase text-white/90">
                +66 (0) 64 671 2502
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-600">
                <Linkedin className="h-3 w-3" />
                <p className="text-[9px] font-bold uppercase tracking-widest">LinkedIn</p>
              </div>
              <a href="https://linkedin.com/in/himasara" target="_blank" className="font-display text-sm font-bold uppercase text-white/90 hover:text-indigo-500 transition-colors">
                in/himaofficial
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-zinc-600">
                <Github className="h-3 w-3" />
                <p className="text-[9px] font-bold uppercase tracking-widest">GitHub</p>
              </div>
              <a href="https://github.com/Himaw" target="_blank" className="font-display text-sm font-bold uppercase text-white/90 hover:text-indigo-500 transition-colors">
                github/Himaw
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
