'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import React from 'react';

const projects = [
  {
    project: "impressions.one",
    url: "https://www.impressions.one",
    repo: "Private",
    descriptionTitle: "AI-driven WebApp",
    description: "that can be used for generating high quality YouTube Thumbnails, boosting video impressions and engagement.",
    image: "/img/impressions.png",
    stack: ["React", "Flask", "Supabase", "GCP"]
  },
  {
    project: "!Hajimaaaa",
    url: "https://github.com/Himaw/Hajimaaa-ELearning",
    repo: "Private",
    descriptionTitle: "E-Learning Platform",
    description: "for secure, accessible education representing a cutting-edge solution that leverages principles of decentralization.",
    image: "/img/Hajima.png",
    stack: ["JS", "PHP", "MySQL", "Git"]
  },
  {
    project: "Real-time IPS (CONN)",
    url: "https://conn-git-staging-conn.vercel.app",
    repo: "Private",
    descriptionTitle: "Indoor Positioning System",
    description: "for a real time Indoor positioning system, which visualizes the realtime location data.",
    image: "/img/conn.png",
    stack: ["NextJs", "Supabase", "Git"]
  },
  {
    project: "madhaweeprinters.lk",
    url: "https://madhaweeprinters.lk/",
    repo: "Private",
    descriptionTitle: "Official Website",
    description: "for a printing press, with a modern design that provides a fully responsive and user-friendly experience.",
    image: "/img/Madhawee.png",
    stack: ["JS", "HTML5", "CSS3", "PHP"]
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-sm transition-all duration-500 hover:border-primary/30"
    >
      <div className="flex flex-col sm:flex-row h-full min-h-[128px] md:min-h-[160px]">
        {/* Content Side */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-[6px] md:text-[8px] font-bold uppercase tracking-widest text-primary/80">
                {tech}
              </span>
            ))}
          </div>

          <div className="mb-2">
            <h3 className="font-display text-lg md:text-xl font-black uppercase leading-tight tracking-tighter text-[var(--foreground)]">
              {project.project}
            </h3>
            <p className="text-[6px] md:text-[8px] font-bold uppercase tracking-[0.2em] text-primary/80 mt-1">
              {project.descriptionTitle}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-[var(--muted)] line-clamp-2 md:line-clamp-3 mb-6">
            {project.description}
          </p>

          <div className="mt-auto flex items-center gap-4">
            <div className="flex gap-2">
              {project.repo === "Public" && (
                <a 
                  href={project.url}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--card)] text-[var(--foreground)] transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              <a 
                href={project.url}
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
           
          </div>
        </div>

        {/* Image Side */}
        <div className="relative w-full sm:w-2/5 min-h-[128px] md:min-h-[160px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.project}
            fill
            className="object-cover scale-100 transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
        </div>
      </div>
    </motion.div>
  );
}


export default function Projects() {
  return (
     <div className="flex h-full w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <div className="sticky top-0 z-10 backdrop-blur-md pb-4 md:pb-6 -mx-5 px-5 md:-mx-12 md:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Selected <span className="text-primary">Works</span>
        </motion.h2>
      </div>
      

      <div className="flex-1 pr-4 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 items-start">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


