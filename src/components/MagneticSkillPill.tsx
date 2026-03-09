"use client";

import { useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import type { IconType } from "react-icons";

interface MagneticSkillPillProps {
  name: string;
  icon?: IconType;
  accentColor: string;
  accentRgb: string;
  delay?: number;
  isVisible?: boolean;
}

export default function MagneticSkillPill({
  name,
  icon: Icon,
  accentColor,
  accentRgb,
  delay = 0,
  isVisible = true,
}: MagneticSkillPillProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 2;
      Object.assign(ripple.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        left: `${e.clientX - rect.left - size / 2}px`,
        top: `${e.clientY - rect.top - size / 2}px`,
        background: `radial-gradient(circle, rgba(${accentRgb}, 0.4), transparent 70%)`,
        borderRadius: "50%",
        transform: "scale(0)",
        animation: "skill-ripple 0.6s ease-out forwards",
        pointerEvents: "none",
      });
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    },
    [accentRgb]
  );

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 12 }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
      whileHover={{
        scale: 1.08,
        borderColor: accentColor,
        boxShadow: `0 0 20px rgba(${accentRgb}, 0.25), 0 0 50px rgba(${accentRgb}, 0.08)`,
      }}
      whileTap={{ scale: 0.93 }}
      className="group/pill relative overflow-hidden flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-gray-400 backdrop-blur-sm transition-colors duration-200 hover:text-white"
    >
      {Icon && (
        <Icon
          className="text-[13px] opacity-50 transition-opacity duration-200 group-hover/pill:opacity-100"
          style={{ color: accentColor }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </motion.button>
  );
}
