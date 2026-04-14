"use client";

import { motion } from "motion/react";
import { ExternalLink, BookOpen, Calendar, Award } from "lucide-react";
import React from "react";

const publications = [
  {
    title: "Indoor Positioning Based on Time of Flight and Kalman Filtering Using Ultra-Wideband Sensors",
    venue: "BIGCOMP",
    date: "Apr 12, 2024",
    link: "https://ieeexplore.ieee.org/document/10488216",
    description: "Published paper entitled \"Indoor Positioning Based on Time of Flight and Kalman Filtering Using Ultra-Wideband Sensors\" with IEEE in International Conference on Big Data and Smart Computing (BIGCOMP 2024)",
    type: "Conference Paper"
  },
  {
    title: "Automatic Segmentation of Swelling Optic Disc using Factorized Gradient Vector Flow",
    venue: "ECTICON",
    date: "May 25, 2022",
    link: "https://ieeexplore.ieee.org/document/9795601",
    description: "Published paper entitled \"Automatic Segmentation of Swelling Optic Disc using Factorized Gradient Vector Flow\" with IEEE in International conference on Electrical Engineering/ Electronics, Computer, Telecommunications and Information Technology (ECTI-CON 2022)",
    type: "Conference Paper"
  }
];

function PublicationCard({
  pub,
  index,
}: {
  pub: (typeof publications)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
              {pub.type}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
              <Calendar className="h-3 w-3" />
              {pub.date}
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-black uppercase leading-tight tracking-tight text-[var(--foreground)] transition-colors group-hover:text-primary">
            {pub.title}
          </h3>
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
            <Award className="h-3 w-3" />
            {pub.venue}
          </p>
        </div>

        <a
          href={pub.link}
          target="_blank"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] transition-all hover:bg-primary hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
          title="Show publication"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="text-sm leading-relaxed text-[var(--foreground)]/70 line-clamp-3">
        {pub.description}
      </p>

      <div className="mt-auto pt-4 border-t border-[var(--border)]/50">
        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
          <BookOpen className="h-3 w-3" />
          Show publication
        </button>
      </div>
    </motion.div>
  );
}

export default function Publications() {
  return (
    <div className="flex w-full flex-col px-5 py-6 md:px-12 md:py-10">
      <div className="pb-12 md:pb-14">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter"
        >
          Research & <span className="text-primary">Publications</span>
        </motion.h2>
      </div>

      <div className="pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <PublicationCard key={index} pub={pub} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
