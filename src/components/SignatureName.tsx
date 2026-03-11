"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const gradientStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(0,255,65,0.4) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

export default function SignatureName({ name }: { name: string }) {
  const chars = name.split("");

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-2 text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
      style={{ filter: "drop-shadow(0 0 30px rgba(0,255,65,0.15))" }}
      aria-label={name}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letterVariants}
          className="inline-block"
          style={
            char === " "
              ? { width: "0.3em", ...gradientStyle }
              : gradientStyle
          }
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
