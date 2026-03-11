"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import SpotlightCard from "./SpotlightCard";
import MagneticSkillPill from "./MagneticSkillPill";
import { PERSONAL, SKILLS } from "@/data/portfolio";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiFlask,
  SiNodedotjs,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiMongodb,
  SiSqlite,
  SiFirebase,
  SiTensorflow,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbServer, TbRadar, TbBrain, TbRobot, TbCode } from "react-icons/tb";

const SKILL_ICONS: Record<string, IconType> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  "C++": TbCode,
  HTML5: SiHtml5,
  CSS3: SiCss,
  Flask: SiFlask,
  "Node.js": SiNodedotjs,
  "Django REST": SiDjango,
  Gunicorn: TbServer,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Git: SiGit,
  Nmap: TbRadar,
  MongoDB: SiMongodb,
  SQLite: SiSqlite,
  Firebase: SiFirebase,
  "TensorFlow Lite": SiTensorflow,
  "Google MediaPipe": TbBrain,
  "Gemini AI": TbBrain,
  Ollama: TbRobot,
};

const skillCategories = [
  { label: "Languages", items: SKILLS.languages, color: "#00ff41", rgb: "0, 255, 65" },
  { label: "Backend", items: SKILLS.backend, color: "#00d4ff", rgb: "0, 212, 255" },
  { label: "Frontend", items: SKILLS.frontend, color: "#bf00ff", rgb: "191, 0, 255" },
  { label: "DevOps", items: SKILLS.devops, color: "#00ff41", rgb: "0, 255, 65" },
  { label: "Databases", items: SKILLS.databases, color: "#00d4ff", rgb: "0, 212, 255" },
  { label: "AI / ML", items: SKILLS.ai_ml, color: "#bf00ff", rgb: "191, 0, 255" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: false, margin: "-50px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-darker py-32"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            About <span className="text-cyber-green">Me</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 text-gray-400"
          >
            <p className="text-lg leading-relaxed">
              I&apos;m a{" "}
              <span className="text-white font-semibold">
                high-speed, execution-focused Full-Stack Developer
              </span>{" "}
              studying Computer Science at{" "}
              <span className="text-cyber-blue">{PERSONAL.university}</span>.
              I specialize in architecting complex systems, containerizing
              production deployments, and building backend infrastructure
              that scales.
            </p>
            <p className="leading-relaxed">
              From national-level hackathon finals to ranking{" "}
              <span className="text-cyber-green font-semibold">
                #2 in ACWOC&apos;26
              </span>{" "}
              with 97 merged pull requests, I thrive in competitive,
              high-pressure environments where clean architecture meets tight
              deadlines.
            </p>
            <p className="leading-relaxed">
              My toolkit spans from React frontends to Dockerized Flask
              backends, from MongoDB pipelines to GitHub Actions CI/CD —
              everything needed to take an idea from whiteboard to production.
            </p>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TerminalWindow />
          </motion.div>
        </div>

        {/* ============================================= */}
        {/* SKILLS SHOWCASE — Full-Width 3-Column Grid    */}
        {/* ============================================= */}
        <div ref={skillsRef} className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Technologies I Work With
            </h3>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: catIdx * 0.1,
                  ease: "easeOut",
                }}
              >
                <SpotlightCard accentRgb={cat.rgb} className="h-full">
                  <div className="p-5">
                    <div
                      className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                      style={{ color: cat.color }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.label}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {cat.items.map((skill, skillIdx) => (
                        <MagneticSkillPill
                          key={skill}
                          name={skill}
                          icon={SKILL_ICONS[skill]}
                          accentColor={cat.color}
                          accentRgb={cat.rgb}
                          delay={catIdx * 0.1 + 0.3 + skillIdx * 0.05}
                          isVisible={skillsInView}
                        />
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
