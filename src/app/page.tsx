"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import GlobalSpotlight from "@/components/GlobalSpotlight";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <CustomCursor />

      {/* Fixed noise grain texture */}
      <div
        className="noise-overlay pointer-events-none fixed inset-0"
        style={{ zIndex: -10 }}
      />

      {/* Mouse-tracking spotlight glow */}
      <GlobalSpotlight />

      {!isLoading && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
