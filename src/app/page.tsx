import { Navigation } from "@/components/portfolio/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { ParallaxLayers } from "@/components/portfolio/parallax-layers"

export default function PortfolioPage() {
  return (
    <main className="relative w-full flex flex-col items-center" style={{ perspective: "2000px" }}>
      {/* Firewatch-style Parallax Layers */}
      <ParallaxLayers />
      
      <Navigation />
      
      <div id="home" className="w-full relative z-10">
        <HeroSection />
      </div>
      
      <div id="experience" className="w-full relative z-10">
        <ExperienceSection />
      </div>
      
      <div id="projects" className="w-full relative z-10">
        <ProjectsSection />
      </div>
      
      <div id="about" className="w-full relative z-10">
        <AboutSection />
      </div>
      
      <div id="skills" className="w-full relative z-10">
        <SkillsSection />
      </div>
      
      <div id="contact" className="w-full relative z-10">
        <ContactSection />
      </div>
    </main>
  )
}
