'use client';

import { motion } from 'motion/react';

const skillsData = {
  languages: [
    { language: "JavaScript" },
    { language: "TypeScript" },
    { language: "Java" },
    { language: "Python" },
    { language: "Go" },
    { language: "PHP" },
    { language: "SQL" },
    { language: "HTML" },
    { language: "CSS" },
    { language: "MATLAB" }
  ],
  frontend: [
    { tech: "React" },
    { tech: "Next.js" },
    { tech: "Vue.js" },
    { tech: "Angular" },
    { tech: "React Native" }
  ],
  backend: [
    { tech: "Node.js" },
    { tech: "Spring Boot" },
    { tech: "Flask" },
    { tech: "MongoDB" },
    { tech: "Redis" },
    { tech: "PostgreSQL" },
    { tech: "GraphQL" },
    { tech: "REST APIs" },
    { tech: "Nginx" }
  ],
  cloud: [
    { tech: "Google Cloud Platform" },
    { tech: "Amazon Web Services" },
    { tech: "Microsoft Azure" },
    { tech: "Firebase" },
    { tech: "Supabase" }
  ],
  devops_tools: [
    { tool: "Git" },
    { tool: "Docker" },
    { tool: "Kubernetes" },
    { tool: "Helm" },
    { tool: "Azure DevOps" },
    { tool: "Vitest" },
    { tool: "JUnit" },
    { tool: "Cypress" }
  ]
};

const skillCategories = [
  { title: "Languages", items: skillsData.languages.map(i => i.language) },
  { title: "Frontend", items: skillsData.frontend.map(i => i.tech) },
  { title: "Backend", items: skillsData.backend.map(i => i.tech) },
  { title: "Cloud", items: skillsData.cloud.map(i => i.tech) },
  { title: "DevOps & Tools", items: skillsData.devops_tools.map(i => i.tool) },
];

export default function Skills() {
  return (
    <div className="flex w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 md:mb-14"
      >
        Technical <span className="text-primary">Capabilities</span>
      </motion.h2>

      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="mb-4 font-display text-xs md:text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary text-[var(--foreground)]"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
