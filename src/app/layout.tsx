import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Singhal | Full-Stack Developer & DevOps Engineer",
  description:
    "High-speed, execution-focused Full-Stack Developer specializing in complex architectures, Docker containerization, and backend systems. Open source contributor ranked #2 in ACWOC'26.",
  keywords: [
    "Yash Singhal",
    "Full-Stack Developer",
    "DevOps",
    "React",
    "Docker",
    "Portfolio",
    "Open Source",
  ],
  authors: [{ name: "Yash Singhal" }],
  openGraph: {
    title: "Yash Singhal | Full-Stack Developer",
    description:
      "Architecting complex systems. Shipping production code. Driving open source impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cyber-darker font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
