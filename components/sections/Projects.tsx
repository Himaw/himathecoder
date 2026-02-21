'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    project: "impressions.one",
    url: "https://www.impressions.one",
    repo: "Private",
    descriptionTitle: "AI-driven WebApp",
    description: "that can be used for generating high quality YouTube Thumbnails, boosting video impressions and engagement.",
    image: "/img/impressions.png",
    stack: ["React", "Flask", "Supabase/Postgresql", "Google Cloud Platform", "Git"]
  },
  {
    project: "!Hajimaaaa",
    url: "https://github.com/Himaw/Hajimaaa-ELearning",
    repo: "Private",
    descriptionTitle: "E-Learning Platform",
    description: "for secure, accessible education representing a cutting-edge solution that leverages principles of decentralization.",
    image: "/img/Hajima.png",
    stack: ["JavaScript", "HTML5", "CSS3", "PHP", "MySQL", "Git"]
  },
  {
    project: "Conn(Indoor Positioning System)",
    url: "https://conn-git-staging-conn.vercel.app",
    repo: "Private",
    descriptionTitle: "WebApp",
    description: "for a real time Indoor positioning system, which visualizes the realtime location data.",
    image: "/img/conn.png",
    stack: ["NextJs", "Supabase/Postgresql", "Git"]
  },
  {
    project: "madhaweeprinters.lk",
    url: "https://madhaweeprinters.lk/",
    repo: "Private",
    descriptionTitle: "Official Website",
    description: "for a printing press, with a modern design that provides a fully responsive and user-friendly experience for thier users.",
    image: "/img/Madhawee.png",
    stack: ["JavaScript", "HTML5", "CSS3", "PHP", "MySQL", "Git"]
  }
  
];

export default function Projects() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-20 md:px-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mb-12 font-display text-4xl font-black uppercase tracking-tighter md:text-6xl"
      >
        Featured <span className="text-indigo-500">Projects</span>
      </motion.h2>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
            >
              <div className="relative aspect-video overflow-hidden cursor-pointer">
                <Image
                  src={project.image}
                  alt={project.project}
                 fill
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="flex gap-4">
                    {project.repo === "Public" && (
                      <a 
                        href={project.url}
                        target="_blank"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    <a 
                      href={project.url}
                      target="_blank"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white transition-transform hover:scale-110"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  {project.project}
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-widest text-neutral-500">
                  {project.descriptionTitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
