"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL } from "@/data/portfolio";
import { FiMail, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { FaInstagram, FaDiscord, FaXTwitter } from "react-icons/fa6";
import InteractiveAvatar, { type Expression } from "./InteractiveAvatar";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [hoverState, setHoverState] = useState<Expression>('neutral');

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-cyber-darker py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Avatar + CTA */}
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <InteractiveAvatar expression={hoverState} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <a
                href={`mailto:${PERSONAL.email}`}
                onMouseEnter={() => setHoverState('hello')}
                onMouseLeave={() => setHoverState('neutral')}
                className="group inline-flex items-center gap-3 rounded-xl border border-cyber-green/30 bg-cyber-green/10 px-10 py-4 font-mono text-sm text-cyber-green transition-all hover:border-cyber-green/60 hover:bg-cyber-green/20 hover:shadow-[0_0_40px_rgba(0,255,65,0.15)]"
              >
                Say Hello
                <FiExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Contact content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                Let&apos;s <span className="text-cyber-green">Connect</span>
              </h2>
              <p className="mb-12 text-lg text-gray-400">
                I&apos;m always open to discussing new projects, complex
                challenges, and opportunities to collaborate. Drop me a message
                and let&apos;s build something impactful.
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
            onMouseEnter={() => setHoverState('email')}
            onMouseLeave={() => setHoverState('neutral')}
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
            onMouseEnter={() => setHoverState('github')}
            onMouseLeave={() => setHoverState('neutral')}
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
            onMouseEnter={() => setHoverState('linkedin')}
            onMouseLeave={() => setHoverState('neutral')}
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

          <a
            href={PERSONAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverState('instagram')}
            onMouseLeave={() => setHoverState('neutral')}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500 transition-transform group-hover:scale-110">
              <FaInstagram className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              Instagram
            </span>
            <span className="font-mono text-xs text-pink-500">
              yeah_shhh_
            </span>
          </a>

          <a
            href={PERSONAL.discord}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverState('discord')}
            onMouseLeave={() => setHoverState('neutral')}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-[0_0_30px_rgba(129,140,248,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-400 transition-transform group-hover:scale-110">
              <FaDiscord className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              Discord
            </span>
            <span className="font-mono text-xs text-indigo-400">
              yashsinghal42
            </span>
          </a>

          <a
            href={PERSONAL.twitter}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverState('twitter')}
            onMouseLeave={() => setHoverState('neutral')}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-800/50 bg-[#0d1117] p-6 transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400 transition-transform group-hover:scale-110">
              <FaXTwitter className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 group-hover:text-white">
              Twitter / X
            </span>
            <span className="font-mono text-xs text-sky-400">
              dyno_playz_yt
            </span>
          </a>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
