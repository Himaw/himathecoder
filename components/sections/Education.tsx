'use client';

import { motion } from 'motion/react';

const academics = [
  {
    institution: 'SIIT, Thammasat University',
    period: 'Aug 2022 - May 2024',
    degree: 'Master of Science in Computer Engineering',
    gpa: '3.92/4.00',
    description: 'Focused on advanced algorithmic design, artificial intelligence, and scalable software systems. Deepened research capabilities in machine learning.',
    skills: ['C++', 'Python', 'PyTorch'],
  },
  {
    institution: 'SIIT, Thammasat University',
    period: 'Aug 2018 - May 2022',
    degree: 'Bachelor of Engineering in Computer Engineering (Hons.)',
    gpa: '3.74/4.00',
    description: 'Strong foundation in computer science principles. Core subjects: OOP, Data Structures, Algorithms, Databases, and Software Engineering.',
    skills: ['C++', 'Java', 'Python', 'JavaScript', 'React', 'Node.js', 'MySQL'],
  },
  {
    institution: 'National Institute of Business Management',
    period: 'Oct 2017 - Mar 2018',
    degree: 'Diploma in Computer Programming',
    description: 'Practical understanding of computer programming fundamentals. Sparked passion for coding through basic software logic.',
    skills: ['C', 'C++', 'C#', 'HTML5', 'CSS3'],
  },
  {
    institution: 'Ananda College',
    period: 'Jun 2015 - Sep 2017',
    degree: 'Advanced Level Examination',
    description: 'Maths: A, Physics: B, Chemistry: B. Colombo District Rank: 532. Fortified analytical thinking and problem-solving abilities.',
  },
];

export default function Education() {
  return (
    <div className="flex h-full w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <div className="sticky top-0 z-10 backdrop-blur-md pb-4 md:pb-6 -mx-5 px-5 md:-mx-12 md:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Academic <span className="text-primary">Journey</span>
        </motion.h2>
      </div>

      <div className="flex-1 pr-4 min-h-0 overflow-y-auto custom-scrollbar">
        <div className="grid gap-6 md:grid-cols-2">
          {academics.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {edu.period}
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[var(--foreground)] group-hover:text-primary transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium uppercase tracking-widest text-[var(--muted)]">
                  {edu.institution}
                </p>
              </div>

              {edu.gpa && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">GPA:</span>
                  <span className="text-sm font-black text-[var(--foreground)]">{edu.gpa}</span>
                </div>
              )}

              <p className="text-xs leading-relaxed text-[var(--muted)]">
                {edu.description}
              </p>

              {edu.skills && (
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {edu.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
