export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlight: string;
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  year: string;
  type: "hackathon" | "open-source" | "competition";
}

export interface Contribution {
  id: string;
  project: string;
  role: string;
  tech: string[];
  impact: string;
  url: string;
}

export const PERSONAL = {
  name: "Yash Singhal",
  title: "Full-Stack Developer",
  subtitle: "DevOps Engineer & Open Source Contributor",
  tagline: "Architecting complex systems. Shipping production code. Driving open source impact.",
  email: "yashjee979@gmail.com",
  location: "Bhopal, India",
  university: "Vellore Institute of Technology, Bhopal",
  degree: "B.Tech Computer Science",
  github: "https://github.com/VITianYash42",
  linkedin: "https://www.linkedin.com/in/yashsinghal979/",
  codeforces: "https://codeforces.com/profile/YashSinghal42",
  instagram: "https://www.instagram.com/yeah_shhh_/",
  discord: "https://discord.com/users/1260276042346532917",
  twitter: "https://x.com/dyno_playz_yt",
  contributions: "700+",
} as const;

export const SKILLS = {
  languages: ["Python", "TypeScript", "JavaScript", "Java", "C++", "HTML5", "CSS3"],
  backend: ["Flask", "Node.js", "Django REST", "Gunicorn"],
  frontend: ["React.js", "Next.js", "Tailwind CSS"],
  devops: ["Docker", "GitHub Actions", "Git", "Nmap"],
  databases: ["MongoDB", "SQLite", "Firebase"],
  tools: ["VS Code", "Postman", "Linux"],
  ai_ml: ["TensorFlow Lite", "Google MediaPipe", "Gemini AI", "Ollama"],
} as const;

export const TERMINAL_COMMANDS: { command: string; output: string }[] = [
  { command: "whoami", output: "yash-singhal // full-stack-developer" },
  { command: "cat skills.json | jq '.core'", output: '["React", "Flask", "Docker", "Node.js", "TypeScript"]' },
  { command: "docker ps --format '{{.Names}}'", output: "mess-metric-api\ngati-rehab-pwa\ndeceptiscan-flask" },
  { command: "git log --oneline -5", output: "a3f2d1c feat: containerized production deployment\nb7e9a4f fix: multi-stage Docker build optimization\nc1d8f3e feat: WebGL particle system integration\nd4a6b2c refactor: REST API authentication layer\ne9c3f7a chore: CI/CD pipeline with GitHub Actions" },
  { command: "nmap -sV localhost", output: "PORT     STATE  SERVICE\n3000/tcp open   react-dev\n5000/tcp open   flask-api\n27017/tcp open  mongodb" },
  { command: "echo $STACK", output: "React | Flask | Docker | Git | Nmap | Node.js" },
];

export const PROJECTS: Project[] = [
  {
    id: "mess-metric",
    title: "Mess-Metric",
    subtitle: "AI & Web3 Food Sustainability Portal",
    description:
      "An enterprise-grade ERP designed to eliminate campus food waste through machine learning predictions and blockchain-powered gamification. Features real-time analytics, Gemini AI integration for waste forecasting, and Polygon Web3 for transparent sustainability tracking.",
    techStack: ["React.js", "Node.js", "MongoDB", "Gemini AI", "Polygon Web3"],
    highlight: "Top 6 Finalist (out of 137 teams) — INNOVIT'26 Hackathon",
    githubUrl: "https://github.com/VITianYash42/mess-metric",
    liveUrl: "https://mess-metric.vercel.app/",
    accentColor: "#00ff41",
  },
  {
    id: "gati-rehab",
    title: "Gati Rehab",
    subtitle: "Offline-First AI Physiotherapy PWA",
    description:
      "An AI-powered virtual rehabilitation assistant providing zero-latency skeletal tracking entirely in the browser. Uses MediaPipe for real-time pose estimation and TensorFlow Lite for exercise form analysis — all running client-side for complete offline capability.",
    techStack: ["React.js", "Google MediaPipe", "Firebase", "TensorFlow Lite", "PWA"],
    highlight: "National Finalist (Top 60 out of 600+ teams) — Health Hackathon '26 (VIT Bhopal x Johns Hopkins)",
    githubUrl: "https://github.com/VITianYash42/Gati-rehab",
    liveUrl: "https://gati.web.app/",
    accentColor: "#00d4ff",
  },
  {
    id: "deceptiscan",
    title: "DeceptiScan",
    subtitle: "Interactive Phishing Simulation Platform",
    description:
      "A full-stack, gamified security awareness platform designed to test and train users against real-world social engineering attacks. Features realistic phishing scenarios, user scoring, and comprehensive analytics for organizational security training.",
    techStack: ["Python", "Flask", "SQLite", "Docker", "Tailwind CSS"],
    highlight: "Top 9 out of 300+ teams — Cyber Carnival Hackathon",
    githubUrl: "https://github.com/VITianYash42/DeceptiScan",
    accentColor: "#bf00ff",
  },
  {
    id: "chem-viz",
    title: "Chemical Equipment Visualizer",
    subtitle: "Hybrid Data Science Dashboard",
    description:
      "A full-stack data science platform featuring both Web and Desktop clients for analyzing and visualizing chemical engineering datasets. Features a 'Thin Client' architecture with a centralized Django REST API serving synchronized statistical data to both a React web dashboard and a native PyQt5 desktop application.",
    techStack: ["Django REST", "React.js", "PyQt5", "Pandas", "Chart.js"],
    highlight: "Dual-client architecture with automated PDF report generation",
    githubUrl: "https://github.com/VITianYash42/chemical-equipment-visualizer",
    accentColor: "#00ff41",
  },
];

export const CONTRIBUTIONS: Contribution[] = [
  {
    id: "layr",
    project: "Layr (VS Code Extension)",
    role: "Built the Community Templates Library & Template Manager",
    tech: ["TypeScript", "VS Code Webview API", "FileSystem Architecture"],
    impact:
      "Enabled users to save, browse, and inject project scaffolds (React, Node, etc.) directly within VS Code.",
    url: "https://github.com/manasdutta04/layr",
  },
  {
    id: "mediassist",
    project: "MediAssist AI Scribe",
    role: "Led the Dockerization and Production Deployment",
    tech: ["Python", "Flask", "Docker", "Gunicorn", "Ollama (Llama 3)"],
    impact: "Reduced deployment time and ensured environment consistency across dev/prod.",
    url: "https://github.com/garvit-010/MediAssist_AI_Powered_Scribe",
  },
  {
    id: "toolsuite",
    project: "Project Toolsuite",
    role: "Developed the Offline Regex Tester and Mandelbrot Set Generator",
    tech: ["JavaScript (ES6+)", "HTML5 Canvas", "CSS3"],
    impact:
      "Added essential developer utilities and high-performance mathematical visualizations to the platform.",
    url: "https://github.com/Winter262005/Project-Toolsuite",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "acwoc",
    title: "Rank #2 — ACWOC'26",
    description:
      "Secured 2nd place in Android Club Winter of Code with 97 high-impact pull requests and earned the Champion Badge.",
    icon: "trophy",
    year: "2026",
    type: "open-source",
  },
  {
    id: "health-hack",
    title: "National Finalist — Health Hackathon '26",
    description:
      "Built 'Gati Rehab,' an AI physiotherapy monitor. Top 60 out of 600+ teams at VIT Bhopal x Johns Hopkins University.",
    icon: "medal",
    year: "2026",
    type: "hackathon",
  },
  {
    id: "innovit",
    title: "Top 6 Finalist — INNOVIT'26",
    description:
      "Architected 'Mess-Metric', a Web 2.5 food sustainability ERP. Top 6 in theme, top 38 out of 137 teams.",
    icon: "star",
    year: "2026",
    type: "hackathon",
  },
  {
    id: "hackathon101",
    title: "3rd Place — Hackathon 101",
    description:
      "Won 3rd place at the CISCO Community Hackathon for a marketplace prototype.",
    icon: "award",
    year: "2026",
    type: "hackathon",
  },
  {
    id: "cyber-carnival",
    title: "Top 9 — Cyber Carnival Hackathon",
    description:
      "Survived a 3-phase elimination to place Top 9 out of 300+ teams with DeceptiScan.",
    icon: "shield",
    year: "2026",
    type: "hackathon",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;
