"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TERMINAL_COMMANDS } from "@/data/portfolio";

export default function TerminalWindow() {
  const [lines, setLines] = useState<{ type: "cmd" | "out"; text: string }[]>([]);
  const [currentCmd, setCurrentCmd] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (currentCmd >= TERMINAL_COMMANDS.length) {
      // Loop back
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentCmd(0);
        setCurrentChar(0);
        setPhase("typing");
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const cmd = TERMINAL_COMMANDS[currentCmd];

    if (phase === "typing") {
      if (currentChar < cmd.command.length) {
        const timeout = setTimeout(() => {
          setCurrentChar((c) => c + 1);
        }, 40 + Math.random() * 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setLines((prev) => [...prev, { type: "cmd", text: cmd.command }]);
          setPhase("output");
        }, 200);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "output") {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { type: "out", text: cmd.output }]);
        setPhase("pause");
        scrollToBottom();
      }, 150);
      return () => clearTimeout(timeout);
    }

    if (phase === "pause") {
      const timeout = setTimeout(() => {
        setCurrentCmd((c) => c + 1);
        setCurrentChar(0);
        setPhase("typing");
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [currentCmd, currentChar, phase, scrollToBottom]);

  useEffect(scrollToBottom, [lines, scrollToBottom]);

  const activeCmd = currentCmd < TERMINAL_COMMANDS.length ? TERMINAL_COMMANDS[currentCmd] : null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-800/80 bg-[#0d1117] shadow-2xl shadow-cyber-green/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-800/60 bg-[#161b22] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-gray-500">
          yash@dev ~ /portfolio
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="h-[320px] overflow-y-auto p-4 font-mono text-sm scrollbar-hide"
      >
        {/* Welcome message */}
        <div className="mb-3 text-gray-600">
          {`# Welcome to Yash's terminal. Initializing skill dump...`}
        </div>

        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === "cmd" ? (
              <div className="flex items-start gap-2">
                <span className="text-cyber-green">➜</span>
                <span className="text-cyber-blue">~</span>
                <span className="text-white">{line.text}</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap pl-6 text-gray-400">
                {line.text}
              </pre>
            )}
          </div>
        ))}

        {/* Currently typing line */}
        {activeCmd && phase === "typing" && (
          <div className="flex items-start gap-2">
            <span className="text-cyber-green">➜</span>
            <span className="text-cyber-blue">~</span>
            <span className="text-white">
              {activeCmd.command.slice(0, currentChar)}
            </span>
            <span className="inline-block h-5 w-[2px] animate-blink bg-cyber-green" />
          </div>
        )}
      </div>
    </div>
  );
}
