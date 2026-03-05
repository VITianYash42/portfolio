"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let visible = false;
    let hovering = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        cursor.style.opacity = "1";
        trail.style.opacity = "1";
      }
      cursor.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer";
      if (isInteractive && !hovering) {
        hovering = true;
        cursor.className = "pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-cyber-blue scale-[2] opacity-100";
        trail.className = "pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-cyber-blue/50 scale-150 opacity-100";
      }
    };

    const onMouseOut = () => {
      if (hovering) {
        hovering = false;
        cursor.className = "pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-cyber-green opacity-100";
        trail.className = "pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-cyber-green/30 opacity-100";
      }
    };

    const onMouseLeave = () => {
      visible = false;
      cursor.style.opacity = "0";
      trail.style.opacity = "0";
    };

    const animate = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.transform = `translate3d(${trailX - 20}px, ${trailY - 20}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-cyber-green opacity-0"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-cyber-green/30 opacity-0"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
    </>
  );
}
