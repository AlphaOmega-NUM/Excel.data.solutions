import { useCallback } from "react";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WorkflowSection } from "./components/WorkflowSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { Footer } from "./components/Footer";

export default function App() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
        <Navbar onNavigate={scrollToSection} />
        <main className="flex-1">
          <HeroSection onNavigate={scrollToSection} />
          <AboutSection />
          <WorkflowSection />
          <ServicesSection />
          <PortfolioSection />
        </main>
        <Footer onNavigate={scrollToSection} />
      </div>
    </MotionConfig>
  );
}
