"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMousePosition } from "@/hooks/useMousePosition";
import { PERSONAL } from "@/data/portfolio";
import SignatureName from "./SignatureName";
import { FiGithub, FiLinkedin, FiChevronDown } from "react-icons/fi";

const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

export default function HeroSection() {
  const mouseRef = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-cyber-darker"
    >
      {/* 3D Background */}
      <Scene mouseRef={mouseRef} />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyber-darker/30 via-transparent to-cyber-darker" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyber-darker/50 via-transparent to-cyber-darker/50" />

      {/* Scan line effect */}
      <div className="scan-lines pointer-events-none absolute inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-cyber-green/20 bg-cyber-panel px-4 py-2 backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-green" />
          </span>
          <span className="font-mono text-xs text-cyber-green">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name - Signature Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <SignatureName name={PERSONAL.name} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-4 font-mono text-lg text-cyber-green sm:text-xl lg:text-2xl"
        >
          &lt; {PERSONAL.title} /&gt;
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 max-w-2xl text-base text-gray-400 sm:text-lg"
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-lg border border-cyber-green/30 bg-cyber-green/10 px-8 py-3 font-mono text-sm text-cyber-green transition-all hover:border-cyber-green/60 hover:bg-cyber-green/20 hover:shadow-[0_0_30px_rgba(0,255,65,0.15)]"
          >
            <span className="relative z-10">View Projects</span>
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-cyber-panel px-6 py-3 font-mono text-sm text-gray-300 backdrop-blur-sm transition-all hover:border-gray-500 hover:text-white"
          >
            <FiGithub className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-cyber-panel px-6 py-3 font-mono text-sm text-gray-300 backdrop-blur-sm transition-all hover:border-cyber-blue hover:text-cyber-blue"
          >
            <FiLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-cyber-green">{PERSONAL.contributions}+</span>
            <span>contributions</span>
          </div>
          <div className="h-4 w-px bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="text-cyber-blue">97</span>
            <span>PRs merged</span>
          </div>
          <div className="h-4 w-px bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="text-cyber-purple">5+</span>
            <span>hackathon finals</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
            Scroll
          </span>
          <FiChevronDown className="h-4 w-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
