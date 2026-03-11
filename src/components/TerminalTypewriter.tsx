"use client";

import { useState, useEffect, useRef } from "react";

const ROLES = [
  "Full-Stack Developer",
  "AI & Web3 Systems Builder",
  "Edge AI Specialist",
  "DevOps & Security Engineer",
  "Open-Source Champion",
];

const TYPE_SPEED = 50;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function TerminalTypewriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const charIndex = useRef(0);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (charIndex.current < role.length) {
          timer = setTimeout(() => {
            charIndex.current += 1;
            setText(role.slice(0, charIndex.current));
          }, TYPE_SPEED);
        } else {
          setPhase("pausing");
        }
        break;

      case "pausing":
        timer = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
        break;

      case "deleting":
        if (charIndex.current > 0) {
          timer = setTimeout(() => {
            charIndex.current -= 1;
            setText(role.slice(0, charIndex.current));
          }, DELETE_SPEED);
        } else {
          setPhase("waiting");
        }
        break;

      case "waiting":
        timer = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
        break;
    }

    return () => clearTimeout(timer);
  }, [text, phase, roleIndex]);

  return (
    <span className="inline-flex items-baseline font-mono text-lg text-cyber-green sm:text-xl lg:text-2xl">
      <span className="animate-pulse-glow mr-1 text-cyber-green/80">&lt;</span>
      <span className="whitespace-pre">{text}</span>
      <span
        className="ml-[1px] inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-cyber-green"
        style={{ animation: "cursor-blink 0.75s step-end infinite" }}
      />
      <span className="animate-pulse-glow ml-1 text-cyber-green/80">/&gt;</span>
    </span>
  );
}
