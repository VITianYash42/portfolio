"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const springConfig = { stiffness: 100, damping: 18, mass: 0.6 };

export type Expression = 'neutral' | 'hello' | 'email' | 'github' | 'linkedin' | 'instagram' | 'discord' | 'twitter';

// Tween for SVG d-attribute morphing (prevents spring overshoot → no twisted paths)
const pathT = { type: "tween" as const, duration: 0.25, ease: "easeInOut" as const };
// Spring for numeric properties (opacity, ry, scale, etc.)
const exprT = { type: "spring" as const, stiffness: 300, damping: 22 };

// All SVG paths use identical command structure: M x y Q cx cy x y
// Matching structure is critical for smooth Framer Motion interpolation
const expr = {
  mouth: {
    neutral:   "M 139 232 Q 150 236 161 232",
    hello:     "M 132 229 Q 150 245 168 229",
    email:     "M 138 232 Q 151 239 162 231",
    github:    "M 140 233 Q 149 237 161 231",
    linkedin:  "M 139 232 Q 152 238 161 230",
    instagram: "M 138 232 Q 150 236 162 232",
    discord:   "M 133 230 Q 150 246 167 230",
    twitter:   "M 141 232 Q 150 228 159 232",
  },
  lowerLip: {
    neutral:   "M 142 235 Q 150 239 158 235",
    hello:     "M 136 236 Q 150 248 164 236",
    email:     "M 141 235 Q 151 242 159 234",
    github:    "M 143 236 Q 149 239 158 235",
    linkedin:  "M 142 235 Q 152 241 158 234",
    instagram: "M 141 235 Q 150 239 159 235",
    discord:   "M 136 236 Q 150 250 164 236",
    twitter:   "M 144 234 Q 150 239 156 234",
  },
  leftBrow: {
    neutral:   "M 108 172 Q 124 166 140 170",
    hello:     "M 108 166 Q 124 157 140 164",
    email:     "M 108 171 Q 124 164 140 169",
    github:    "M 108 175 Q 124 172 140 177",
    linkedin:  "M 108 172 Q 124 166 140 170",
    instagram: "M 108 170 Q 124 164 140 168",
    discord:   "M 108 166 Q 124 157 140 164",
    twitter:   "M 108 168 Q 124 160 140 166",
  },
  rightBrow: {
    neutral:   "M 160 170 Q 176 166 192 172",
    hello:     "M 160 164 Q 176 157 192 166",
    email:     "M 160 169 Q 176 163 192 171",
    github:    "M 160 177 Q 176 172 192 175",
    linkedin:  "M 160 168 Q 176 162 192 170",
    instagram: "M 160 168 Q 176 164 192 170",
    discord:   "M 160 164 Q 176 157 192 166",
    twitter:   "M 160 166 Q 176 160 192 168",
  },
  eyeRy: {
    neutral: 8, hello: 9, email: 8, github: 5, linkedin: 8, instagram: 8, discord: 1, twitter: 8,
  },
  mouthOpenRx: {
    neutral: 0, hello: 14, email: 0, github: 0, linkedin: 0, instagram: 0, discord: 14, twitter: 6,
  },
  mouthOpenRy: {
    neutral: 0, hello: 9, email: 0, github: 0, linkedin: 0, instagram: 0, discord: 9, twitter: 5,
  },
  mouthOpenOp: {
    neutral: 0, hello: 1, email: 0, github: 0, linkedin: 0, instagram: 0, discord: 1, twitter: 0.85,
  },
  teethOp: {
    neutral: 0, hello: 0.95, email: 0, github: 0, linkedin: 0, instagram: 0, discord: 0.9, twitter: 0,
  },
  lowerLipOp: {
    neutral: 0.2, hello: 0, email: 0.2, github: 0.2, linkedin: 0.2, instagram: 0.2, discord: 0, twitter: 0,
  },
  sunglassOp: {
    neutral: 0, hello: 0, email: 0, github: 0, linkedin: 0, instagram: 0.92, discord: 0, twitter: 0,
  },
  happyEyeOp: {
    neutral: 0, hello: 0, email: 0, github: 0, linkedin: 0, instagram: 0, discord: 1, twitter: 0,
  },
};

export default function InteractiveAvatar({ expression = 'neutral' }: { expression?: Expression }) {
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouseNorm({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const eyesX = useSpring(0, springConfig);
  const eyesY = useSpring(0, springConfig);
  const glassesX = useSpring(0, springConfig);
  const glassesY = useSpring(0, springConfig);
  const faceX = useSpring(0, springConfig);
  const faceY = useSpring(0, springConfig);
  const hairFrontX = useSpring(0, springConfig);
  const hairFrontY = useSpring(0, springConfig);
  const hairBackX = useSpring(0, springConfig);
  const hairBackY = useSpring(0, springConfig);

  useEffect(() => {
    eyesX.set(mouseNorm.x * 25);
    eyesY.set(mouseNorm.y * 18);
    glassesX.set(mouseNorm.x * 18);
    glassesY.set(mouseNorm.y * 12);
    faceX.set(mouseNorm.x * 10);
    faceY.set(mouseNorm.y * 6);
    hairFrontX.set(mouseNorm.x * 6);
    hairFrontY.set(mouseNorm.y * 4);
    hairBackX.set(mouseNorm.x * -4);
    hairBackY.set(mouseNorm.y * -2);
  }, [mouseNorm, eyesX, eyesY, glassesX, glassesY, faceX, faceY, hairFrontX, hairFrontY, hairBackX, hairBackY]);

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 300 380"
        className="h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] lg:h-[360px] lg:w-[360px]"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive avatar of Yash"
      >
        <defs>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c68c53" />
            <stop offset="100%" stopColor="#b07840" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="glassFrameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(195,155,120,0.85)" />
            <stop offset="100%" stopColor="rgba(170,130,95,0.7)" />
          </linearGradient>
          <filter id="faceShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Background circle - lighter than UI to outline the figure */}
        <circle cx="150" cy="190" r="142" fill="#0f1520" />
        <circle cx="150" cy="190" r="142" fill="none" stroke="#00ff41" strokeWidth="0.8" opacity="0.15" />

        {/* === NECK === */}
        <motion.g id="neck" style={{ x: faceX, y: faceY }}>
          <rect x="128" y="260" width="44" height="40" rx="8" fill="url(#skinGrad)" />
          {/* Shirt / collar with pattern hint */}
          <path d="M 108 292 Q 150 308 192 292 L 198 340 Q 150 355 102 340 Z" fill="#2a1f14" />
          <path d="M 108 292 Q 150 308 192 292 L 198 340 Q 150 355 102 340 Z" fill="none" stroke="#c8a050" strokeWidth="0.5" opacity="0.4" />
          {/* Collar V */}
          <path d="M 135 292 L 150 315 L 165 292" fill="none" stroke="#c8a050" strokeWidth="1" opacity="0.3" />
        </motion.g>

        {/* === HAIR BACK === */}
        <motion.g id="hair-back" style={{ x: hairBackX, y: hairBackY }}>
          <ellipse cx="150" cy="138" rx="80" ry="90" fill="url(#hairGrad)" />
          <ellipse cx="68" cy="145" rx="10" ry="20" fill="#111" />
          <ellipse cx="228" cy="155" rx="12" ry="25" fill="#111" />
        </motion.g>

        {/* === FACE BASE === */}
        <motion.g id="face-base" style={{ x: faceX, y: faceY }} filter="url(#faceShadow)">
          {/* Head - slightly angular, masculine jaw */}
          <ellipse cx="150" cy="178" rx="68" ry="82" fill="url(#skinGrad)" />
          {/* Squarer jaw overlay */}
          <path d="M 90 200 Q 92 255 120 268 Q 150 275 180 268 Q 208 255 210 200" fill="url(#skinGrad)" />

          {/* Left ear */}
          <ellipse cx="83" cy="185" rx="11" ry="16" fill="#b07840" />
          <ellipse cx="84" cy="185" rx="6" ry="10" fill="#9a6830" />

          {/* Right ear */}
          <ellipse cx="217" cy="185" rx="11" ry="16" fill="#b07840" />
          <ellipse cx="216" cy="185" rx="6" ry="10" fill="#9a6830" />

          {/* Jawline shadow - angular */}
          <path d="M 95 230 Q 120 260 150 265 Q 180 260 205 230" fill="#9a6530" opacity="0.12" />

          {/* Moustache - very light, barely there */}
          <path
            d="M 134 223 Q 142 219 150 220 Q 158 219 166 223"
            fill="none"
            stroke="#6a5030"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.2"
          />

          {/* === BULLETPROOF MOUTH RENDERING === */}
          
          {/* 1. Closed Mouths (Neutral, Email, Github, etc. - Morphing works fine here) */}
          <motion.g
            initial={{ opacity: 1 }}
            animate={{ opacity: (expression === 'hello' || expression === 'discord') ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.path
              fill="none" stroke="#8a5040" strokeWidth={2.5} strokeLinecap="round"
              animate={{ d: expr.mouth[expression] }} transition={pathT}
            />
            <motion.path
              fill="#9a6050"
              animate={{ d: expr.lowerLip[expression], opacity: expr.lowerLipOp[expression] }} transition={pathT}
            />
          </motion.g>

          {/* 2. The 'Hello' Mouth (Wide smile with top teeth) */}īīī
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: expression === 'hello' ? 1 : 0,
              scale: expression === 'hello' ? 1 : 0.8
            }}
            transition={exprT}
            style={{ originX: "150px", originY: "235px" }}
          >
            {/* Dark cavity */}
            <path d="M 130 232 Q 150 258 170 232 Z" fill="#2a0e0e" />
            {/* Top teeth */}
            <path d="M 130 232 Q 150 242 170 232 Z" fill="#ffffff" />
          </motion.g>

          {/* 3. The 'Discord' Mouth (Happy open D shape with tongue hint) */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: expression === 'discord' ? 1 : 0,
              scale: expression === 'discord' ? 1 : 0.8
            }}
            transition={exprT}
            style={{ originX: "150px", originY: "235px" }}
          >
            {/* Dark cavity */}
            <path d="M 134 232 Q 150 255 166 232 Z" fill="#2a0e0e" />
            {/* Cute tongue at the bottom */}
            <path d="M 142 245 Q 150 240 158 245 Q 150 255 142 245 Z" fill="#c85a5a" />
          </motion.g>

          {/* Very subtle chin stubble */}
          <ellipse cx="150" cy="250" rx="18" ry="10" fill="#5a4020" opacity="0.06" />

          {/* Faint jawline stubble */}
          <path
            d="M 122 238 Q 135 255 150 258 Q 165 255 178 238"
            fill="none"
            stroke="#5a4020"
            strokeWidth="1"
            opacity="0.08"
          />
        </motion.g>

        {/* === EYES === */}
        <motion.g id="eyes" style={{ x: eyesX, y: eyesY }}>
          {/* Left eye */}
          <motion.ellipse
            cx={124} cy={188} rx={12}
            fill="white"
            animate={{
              ry: expr.eyeRy[expression],
              opacity: expression === 'instagram' ? 0 : 1,
            }}
            transition={exprT}
          />
          <motion.circle
            cx={126} cy={188} r={5.5} fill="#2c1a0e"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 1 }}
            transition={exprT}
          />
          <motion.circle
            cx={127} cy={187} r={2.8} fill="#0d0d0d"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 1 }}
            transition={exprT}
          />
          <motion.circle
            cx={129} cy={186} r={1.5} fill="white"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 0.9 }}
            transition={exprT}
          />

          {/* Right eye */}
          <motion.ellipse
            cx={176} cy={188} rx={12}
            fill="white"
            animate={{
              ry: expr.eyeRy[expression],
              opacity: expression === 'instagram' ? 0 : 1,
            }}
            transition={exprT}
          />
          <motion.circle
            cx={178} cy={188} r={5.5} fill="#2c1a0e"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 1 }}
            transition={exprT}
          />
          <motion.circle
            cx={179} cy={187} r={2.8} fill="#0d0d0d"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 1 }}
            transition={exprT}
          />
          <motion.circle
            cx={181} cy={186} r={1.5} fill="white"
            animate={{ opacity: expression === 'discord' || expression === 'instagram' ? 0 : 0.9 }}
            transition={exprT}
          />

          {/* Happy eye arcs (discord ^^) */}
          <motion.path
            d="M 114 190 Q 124 180 134 190"
            fill="none"
            stroke="#2c1a0e"
            strokeWidth={3}
            strokeLinecap="round"
            animate={{ opacity: expr.happyEyeOp[expression] }}
            transition={exprT}
          />
          <motion.path
            d="M 166 190 Q 176 180 186 190"
            fill="none"
            stroke="#2c1a0e"
            strokeWidth={3}
            strokeLinecap="round"
            animate={{ opacity: expr.happyEyeOp[expression] }}
            transition={exprT}
          />

          {/* Eyebrows */}
          <motion.path
            fill="none"
            stroke="#111"
            strokeWidth={3.5}
            strokeLinecap="round"
            animate={{ d: expr.leftBrow[expression] }}
            transition={pathT}
          />
          <motion.path
            fill="none"
            stroke="#111"
            strokeWidth={3.5}
            strokeLinecap="round"
            animate={{ d: expr.rightBrow[expression] }}
            transition={pathT}
          />
        </motion.g>

        {/* === GLASSES AND NOSE === */}
        <motion.g id="glasses-and-nose" style={{ x: glassesX, y: glassesY }}>
          {/* Left lens - large rectangular, rose-gold frame */}
          <rect
            x="98"
            y="174"
            width="42"
            height="32"
            rx="7"
            fill="rgba(220,200,170,0.06)"
            stroke="url(#glassFrameGrad)"
            strokeWidth="2.5"
          />
          {/* Left lens glare - greenish tint like in photo */}
          <rect
            x="100"
            y="176"
            width="38"
            height="28"
            rx="6"
            fill="rgba(120,200,120,0.03)"
          />
          <path d="M 104 179 Q 110 176 120 179" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right lens - large rectangular, rose-gold frame */}
          <rect
            x="160"
            y="174"
            width="42"
            height="32"
            rx="7"
            fill="rgba(220,200,170,0.06)"
            stroke="url(#glassFrameGrad)"
            strokeWidth="2.5"
          />
          {/* Right lens glare */}
          <rect
            x="162"
            y="176"
            width="38"
            height="28"
            rx="6"
            fill="rgba(120,200,120,0.03)"
          />
          <path d="M 166 179 Q 172 176 182 179" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bridge */}
          <path
            d="M 140 190 Q 150 184 160 190"
            fill="none"
            stroke="url(#glassFrameGrad)"
            strokeWidth="2.2"
          />

          {/* Temple arms - thicker like real frames */}
          <line x1="98" y1="184" x2="84" y2="182" stroke="url(#glassFrameGrad)" strokeWidth="2.5" />
          <line x1="202" y1="184" x2="216" y2="182" stroke="url(#glassFrameGrad)" strokeWidth="2.5" />

          {/* Nose - wider, more prominent */}
          <path
            d="M 150 196 Q 146 210 141 218 Q 150 222 159 218 Q 154 210 150 196"
            fill="#a87038"
            opacity="0.4"
          />
          {/* Nose bridge shadow */}
          <path
            d="M 148 194 Q 150 200 152 194"
            fill="none"
            stroke="#8a5a30"
            strokeWidth="1"
            opacity="0.2"
          />

          {/* Sunglasses overlay (instagram) */}
          <motion.rect
            x={100} y={176} width={38} height={28} rx={6}
            fill="#111"
            animate={{ opacity: expr.sunglassOp[expression] }}
            transition={exprT}
          />
          <motion.rect
            x={162} y={176} width={38} height={28} rx={6}
            fill="#111"
            animate={{ opacity: expr.sunglassOp[expression] }}
            transition={exprT}
          />
        </motion.g>

        {/* === HAIR FRONT (wavy side-swept, low hairline) === */}
        <motion.g id="hair-front" style={{ x: hairFrontX, y: hairFrontY }}>
          {/* Main hair mass - low hairline, covers forehead */}
          <path
            d="M 82 165
               Q 78 135 85 110
               Q 92 88 110 75
               Q 130 62 150 60
               Q 170 58 190 65
               Q 210 75 220 95
               Q 228 115 225 145
               Q 220 128 205 118
               Q 185 108 155 105
               Q 125 108 105 118
               Q 88 130 82 165Z"
            fill="url(#hairGrad)"
          />

          {/* Fringe / bangs coming down on forehead - key for covering forehead */}
          <path
            d="M 95 155
               Q 90 130 100 110
               Q 110 92 130 85
               Q 145 80 155 82
               Q 165 84 170 90
               Q 150 100 130 108
               Q 110 120 95 155Z"
            fill="url(#hairGrad)"
          />

          {/* Side-swept volume going right - more dramatic */}
          <path
            d="M 155 60
               Q 180 52 205 60
               Q 225 70 232 90
               Q 236 108 230 130
               Q 225 115 215 105
               Q 205 95 190 88
               Q 210 75 220 95"
            fill="#111"
            opacity="0.85"
          />

          {/* Wavy top volume */}
          <path
            d="M 115 82 Q 125 60 145 55 Q 160 53 175 58 Q 190 62 200 72"
            fill="url(#hairGrad)"
          />

          {/* Hair texture strands - swept direction */}
          <path d="M 100 120 Q 120 92 145 78" fill="none" stroke="#222" strokeWidth="1.8" opacity="0.4" />
          <path d="M 110 118 Q 135 85 165 72" fill="none" stroke="#222" strokeWidth="1.5" opacity="0.35" />
          <path d="M 125 112 Q 155 80 190 70" fill="none" stroke="#222" strokeWidth="1.3" opacity="0.35" />
          <path d="M 140 108 Q 170 82 205 75" fill="none" stroke="#222" strokeWidth="1" opacity="0.3" />

          {/* Wavy curl strands on top */}
          <path d="M 130 78 Q 135 65 142 58" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 150 72 Q 158 58 168 55" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

          {/* Hair highlight / shine streak */}
          <path
            d="M 115 115 Q 140 85 170 72"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 130 108 Q 160 78 195 70"
            fill="none"
            stroke="rgba(180,130,80,0.08)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Right side hair */}
          <path
            d="M 225 145 Q 230 130 232 115"
            fill="none"
            stroke="#111"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </motion.g>
      </svg>
    </div>
  );
}
