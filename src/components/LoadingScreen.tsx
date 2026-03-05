"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: "> Initializing system...", delay: 0 },
  { text: "> Loading kernel modules...", delay: 300 },
  { text: "> Mounting /dev/portfolio...", delay: 600 },
  { text: "> Starting Docker daemon...", delay: 900 },
  { text: "> Pulling yash-singhal:latest...", delay: 1200 },
  { text: "> Building assets [████████████████] 100%", delay: 1600 },
  { text: "> System ready.", delay: 2200 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setIsExiting(true);
      }, 2800)
    );

    timers.push(
      setTimeout(() => {
        onComplete();
      }, 3400)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-darker"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-full max-w-xl px-6">
            <div className="rounded-lg border border-cyber-green/20 bg-cyber-dark/80 p-6 font-mono text-sm backdrop-blur-md">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-cyber-green/80" />
                <span className="ml-2 text-xs text-gray-500">
                  boot@yash-portfolio
                </span>
              </div>
              <div className="space-y-1">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`${
                      i === BOOT_LINES.length - 1
                        ? "text-cyber-green font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {visibleLines < BOOT_LINES.length && (
                  <span className="inline-block h-4 w-2 animate-blink bg-cyber-green" />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
