"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { PROJECTS, CONTRIBUTIONS } from "@/data/portfolio";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import type { Project, Contribution } from "@/data/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);

    // 3D tilt: map 0-100 to -8 to 8 degrees
    rotateY.set(((x - 50) / 50) * 8);
    rotateX.set(((50 - y) / 50) * 8);
    glareX.set(x);
    glareY.set(y);
    glareOpacity.set(0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group"
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="project-card relative overflow-hidden rounded-2xl border border-gray-800/60 bg-[#0d1117] p-8 transition-[border-color] duration-500 hover:border-gray-700/80"
        data-cursor="pointer"
      >
        {/* Glare overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(350px circle at ${isHovered ? "var(--mouse-x, 50%)" : "50%"} ${isHovered ? "var(--mouse-y, 50%)" : "50%"}, rgba(255,255,255,0.18), transparent 60%)`,
          }}
        />
        {/* Glow effect on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accentColor}08, transparent 40%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}${isHovered ? "80" : "30"}, transparent)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3
                className="mb-1 text-2xl font-bold text-white transition-colors duration-300"
                style={{ color: isHovered ? project.accentColor : undefined }}
              >
                {project.title}
              </h3>
              <p className="font-mono text-sm text-gray-500">
                {project.subtitle}
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-700/50 p-2 text-gray-400 transition-all hover:border-gray-500 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="h-5 w-5" />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-700/50 p-2 text-gray-400 transition-all hover:border-gray-500 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-gray-400">
            {project.description}
          </p>

          {/* Highlight badge */}
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-gray-800/50 bg-gray-900/50 p-3">
            <span className="mt-0.5 text-lg">🏆</span>
            <span className="font-mono text-xs text-gray-300">
              {project.highlight}
            </span>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3 py-1 font-mono text-xs transition-all duration-300"
                style={{
                  border: `1px solid ${project.accentColor}25`,
                  color: project.accentColor,
                  backgroundColor: `${project.accentColor}08`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContributionCard({
  contribution,
  index,
}: {
  contribution: Contribution;
  index: number;
}) {
  return (
    <motion.a
      href={contribution.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-cyber-purple/30 hover:shadow-[0_0_30px_rgba(191,0,255,0.05)]"
      data-cursor="pointer"
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-cyber-purple">
          {contribution.project}
        </h4>
        <FiArrowRight className="h-4 w-4 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-cyber-purple" />
      </div>
      <p className="mb-3 text-sm text-cyber-blue">{contribution.role}</p>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">
        {contribution.impact}
      </p>
      <div className="flex flex-wrap gap-2">
        {contribution.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-gray-800 bg-gray-900/50 px-2 py-1 font-mono text-[11px] text-gray-500"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-darker py-32"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.04),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Featured <span className="text-cyber-blue">Work</span>
          </h2>
          <p className="mt-4 max-w-xl text-gray-500">
            Complex architectures, containerized deployments, and production-grade
            systems — built with strong teams for real-world impact.
          </p>
        </motion.div>

        {/* Projects grid - staggered layout */}
        <div className="mb-24 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Open Source Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="mb-2 font-mono text-sm text-cyber-purple">
            {"open source"}
          </div>
          <h3 className="text-3xl font-bold text-white">
            Key <span className="text-cyber-purple">Contributions</span>
          </h3>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CONTRIBUTIONS.map((c, i) => (
            <ContributionCard key={c.id} contribution={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
