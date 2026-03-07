"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL } from "@/data/portfolio";
import { FiMail, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-darker py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Let&apos;s <span className="text-cyber-green">Connect</span>
          </h2>
          <p className="mb-12 text-lg text-gray-400">
            I&apos;m always open to discussing new projects, complex challenges,
            and opportunities to collaborate. Drop me a message and let&apos;s
            build something impactful.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 grid gap-4 sm:grid-cols-3"
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-cyber-green/30 hover:shadow-[0_0_30px_rgba(0,255,65,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-green/10 text-cyber-green transition-transform group-hover:scale-110">
              <FiMail className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              Email
            </span>
            <span className="font-mono text-xs text-cyber-green">
              {PERSONAL.email}
            </span>
          </a>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-cyber-blue/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-blue/10 text-cyber-blue transition-transform group-hover:scale-110">
              <FiGithub className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              GitHub
            </span>
            <span className="font-mono text-xs text-cyber-blue">
              VITianYash42
            </span>
          </a>

          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-cyber-purple/30 hover:shadow-[0_0_30px_rgba(191,0,255,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-purple/10 text-cyber-purple transition-transform group-hover:scale-110">
              <FiLinkedin className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              LinkedIn
            </span>
            <span className="font-mono text-xs text-cyber-purple">
              yashsinghal979
            </span>
          </a>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="group inline-flex items-center gap-3 rounded-xl border border-cyber-green/30 bg-cyber-green/10 px-10 py-4 font-mono text-sm text-cyber-green transition-all hover:border-cyber-green/60 hover:bg-cyber-green/20 hover:shadow-[0_0_40px_rgba(0,255,65,0.15)]"
          >
            Say Hello
            <FiExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
