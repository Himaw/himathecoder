'use client';

import { motion } from 'motion/react';

const experiences = [
  {
    company: 'Alstom',
    period: 'May 2024 - Present',
    location: 'Bangkok, Thailand',
    role: 'Software Engineer',
    type: 'Full-Time',
    description: 'Developing and maintaining software solutions for rail transport systems. Designing, coding, testing, and deploying applications that enhance efficiency and safety.',
    skills: ['VueJs', 'Spring Boot', 'GraphQL', 'Cypress', 'Azure DevOps'],
  },
  {
    company: 'SIIT, Thammasat University',
    period: 'Aug 2022 - May 2024',
    location: 'Pathumthani, Thailand',
    role: 'Teaching Assistant',
    type: 'Part-Time',
    description: 'Assisted in teaching OOP and Data Structures using Java to over 500 students. Covered fundamental concepts like Abstraction, Encapsulation, and Polymorphism.',
    skills: ['Java'],
  },
  {
    company: 'Accenture',
    period: 'June 2021 - Aug 2021',
    location: 'Bangkok, Thailand',
    role: 'Software Engineer',
    type: 'Internship',
    description: 'Full-stack software engineer contributing to web applications. Created user-friendly interfaces and optimized user experiences.',
    skills: ['Angular', 'React', 'Spring Boot', 'Redis', 'Docker', 'Git', 'Jira'],
  },
  {
    company: 'PentaOne',
    period: 'Aug 2020 - Jan 2022',
    location: 'Colombo, Sri Lanka',
    role: 'Full Stack Developer',
    type: 'Part-Time',
    description: 'Collaborated with back-end and front-end teams to develop functional web applications and services.',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL', 'Git'],
  },
];

export default function Experience() {
  return (
    <div className="flex h-full w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <div className="sticky top-0 z-10 backdrop-blur-md pb-4 md:pb-6 -mx-5 px-5 md:-mx-12 md:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Work <span className="text-primary">Experience</span>
        </motion.h2>
      </div>

      <div className="flex-1 pl-2 pr-4 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-l-2 border-primary/20 pl-8 transition-colors hover:border-primary"
            >
              <div className="absolute -left-[7px] md:-left-[9px] top-[7px] md:top-[9px] h-4 w-4 rounded-full bg-[var(--background)] border-2 border-primary" />
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[var(--foreground)]">
                    {exp.role} @ <span className="text-primary">{exp.company}</span>
                  </h3>
                  <span className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
                  {exp.location} • {exp.type}
                </p>
                
                <p className="mt-2 max-w-3xl text-xs text-[var(--foreground)]/70 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/10 px-4 py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
