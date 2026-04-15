"use client";

import { motion } from "motion/react";

const achievements = [
  { highlight: "3+", text: "Years Building & Learning" },
  { highlight: "IEEE", text: "Publications" },
  { highlight: "Best Paper Award", text: "Winner" },
  { highlight: "500+", text: "Students Mentored" },
  { highlight: "2×", text: "Scholarship Awardee" },
];

export default function ScrollingBar() {
  // Use 4x duplication to ensure seamless coverage on wide screens
  const duplicatedAchievements = [
    ...achievements,
    ...achievements,
    ...achievements,
    ...achievements,
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-[var(--border)] bg-[var(--card)]/30 py-8 md:py-14 backdrop-blur-md group">
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .ticker-animate {
          animation: ticker 40s linear infinite;
        }
        @media (max-width: 768px) {
          .ticker-animate {
            animation: ticker 20s linear infinite;
          }
        }
        .group:hover .ticker-animate {
          animation-play-state: paused;
        }
        .group:active .ticker-animate {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-animate flex w-max whitespace-nowrap">
        {duplicatedAchievements.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex flex-shrink-0 flex-col items-center justify-center gap-3 md:gap-5 px-8 md:px-24 py-4 rounded-3xl cursor-default transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--foreground)]/5 px-3 md:px-4 py-1.5 backdrop-blur-sm transition-colors duration-300">
              <span className="font-display text-sm md:text-xl font-black uppercase tracking-tight text-[var(--foreground)]/80">
                {item.highlight}
              </span>
            </div>
            <span className="font-display text-[8px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[var(--foreground)]/60 text-center whitespace-nowrap">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
