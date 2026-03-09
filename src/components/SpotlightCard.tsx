"use client";

import { useRef, useCallback, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  accentRgb: string;
}

export default function SpotlightCard({
  children,
  className = "",
  accentRgb,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const cfg = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), cfg);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), cfg);
  const spotX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), cfg);
  const spotY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), cfg);

  const spotlight = useMotionTemplate`radial-gradient(
    500px circle at ${spotX}% ${spotY}%,
    rgba(${accentRgb}, 0.1),
    transparent 40%
  )`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[rgba(10,15,25,0.7)] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.15] ${className}`}
    >
      {/* Cursor-tracking spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* Subtle inner highlight at top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
