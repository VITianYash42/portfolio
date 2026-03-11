"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/portfolio";
import {
  FiAward,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <FiAward className="h-6 w-6" />,
  medal: <FiTarget className="h-6 w-6" />,
  star: <FiStar className="h-6 w-6" />,
  award: <FiTrendingUp className="h-6 w-6" />,
  shield: <FiShield className="h-6 w-6" />,
};

const typeColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  "open-source": {
    border: "border-cyber-green/30",
    bg: "bg-cyber-green/10",
    text: "text-cyber-green",
    glow: "shadow-[0_0_20px_rgba(0,255,65,0.1)]",
  },
  hackathon: {
    border: "border-cyber-blue/30",
    bg: "bg-cyber-blue/10",
    text: "text-cyber-blue",
    glow: "shadow-[0_0_20px_rgba(0,212,255,0.1)]",
  },
  competition: {
    border: "border-cyber-purple/30",
    bg: "bg-cyber-purple/10",
    text: "text-cyber-purple",
    glow: "shadow-[0_0_20px_rgba(191,0,255,0.1)]",
  },
};

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-darker py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(191,0,255,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Achievement <span className="text-cyber-purple">Unlocked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyber-green/40 via-cyber-blue/40 to-cyber-purple/40 md:left-1/2 md:block" />

          <div className="space-y-8">
            {ACHIEVEMENTS.map((achievement, i) => {
              const colors = typeColors[achievement.type] || typeColors.hackathon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`group rounded-xl border ${colors.border} bg-[#0d1117] p-6 transition-all duration-300 hover:${colors.glow}`}
                    >
                      {/* Achievement unlocked banner */}
                      <div className="mb-3 flex items-center gap-2">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
                        >
                          {iconMap[achievement.icon]}
                        </div>
                        <div className={`${isLeft ? "md:ml-auto md:mr-0" : ""}`}>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full border ${colors.border} ${colors.bg} px-2 py-0.5 font-mono text-[10px] uppercase ${colors.text}`}
                            >
                              {achievement.type.replace("-", " ")}
                            </span>
                            <span className="font-mono text-xs text-gray-600">
                              {achievement.year}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h3 className={`mb-2 text-xl font-bold text-white`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-6 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full ${colors.bg} ring-4 ring-cyber-darker`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${colors.text} bg-current`}
                      />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
