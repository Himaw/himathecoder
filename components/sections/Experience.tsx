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
    <div className="flex h-full w-full flex-col px-6 py-10 md:px-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mb-8 font-display text-4xl font-black uppercase tracking-tighter md:text-5xl"
      >
        Work <span className="text-indigo-500">Experience</span>
      </motion.h2>

      <div className="flex-1 pr-4">
        <div className="flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-l-2 border-indigo-500/20 pl-8 transition-colors hover:border-indigo-500"
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-zinc-900 border-2 border-indigo-500 transition-transform group-hover:scale-125" />
              
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                    {exp.role} @ <span className="text-indigo-500">{exp.company}</span>
                  </h3>
                  <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                  {exp.location} • {exp.type}
                </p>
                
                <p className="mt-2 max-w-3xl text-xs text-neutral-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-500/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-500 border border-indigo-500/20"
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
