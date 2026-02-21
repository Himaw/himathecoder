'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import React, { useRef } from 'react';

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
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full min-h-0 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-colors duration-500 hover:border-indigo-500/30"
    >
      <div className="flex h-full flex-col p-4" style={{ transform: "translateZ(20px)" }}>
        <div className="relative mb-3 aspect-video h-32 overflow-hidden rounded-lg bg-black/20 group mx-auto">
          <Image
            src={project.image}
            alt={project.project}
            fill
            className="object-contain scale-90 transition-all duration-700 group-hover:scale-100 group-hover:brightness-110"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-indigo-400">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="truncate font-display text-lg font-black uppercase leading-tight tracking-tighter text-white py-0.5">
          {project.project}
        </h3>
        <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-indigo-500/80">
          {project.descriptionTitle}
        </p>
        <p className="mt-2 text-[11px] leading-snug text-zinc-400 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex gap-2">
            {project.repo === "Public" && (
              <a 
                href={project.url}
                target="_blank"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition-all hover:bg-white hover:text-black"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            <a 
              href={project.url}
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest text-white/20">
            Case Study
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-6 md:px-12">
      <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-black uppercase tracking-tighter md:text-5xl">
            Selected <span className="text-indigo-500">Works</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex-1 pr-4 min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 h-full">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


