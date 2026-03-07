"use client";

import { PERSONAL } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/50 bg-cyber-darker py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="font-mono text-xs text-gray-600">
          <span className="text-cyber-green">&lt;</span>
          {` Designed & Built by ${PERSONAL.name} `}
          <span className="text-cyber-green">/&gt;</span>
        </div>
        <div className="font-mono text-xs text-gray-700">
          &copy; {year} &middot; All rights reserved
        </div>
      </div>
    </footer>
  );
}
