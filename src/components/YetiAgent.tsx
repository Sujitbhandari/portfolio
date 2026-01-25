'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const YetiContext = createContext<{
  setHoveredProject: (index: number | null) => void;
} | null>(null);

export function useYetiHover() {
  const context = useContext(YetiContext);
  if (!context) {
    return { setHoveredProject: () => {} };
  }
  return context;
}

export default function YetiAgent({ children }: { children: React.ReactNode }) {
  const aboutYetiRef = useRef<HTMLImageElement>(null);
  const experienceYetiRef = useRef<HTMLImageElement>(null);
  const projectsYetiRef = useRef<HTMLImageElement>(null);
  const contactYetiRef = useRef<HTMLImageElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    // About Section: Yeti slides in from left
    if (aboutYetiRef.current) {
      gsap.fromTo(
        aboutYetiRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }

    // Experience Section: Yeti climbs down timeline
    if (experienceYetiRef.current) {
      gsap.fromTo(
        experienceYetiRef.current,
        { y: '-100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }

    // Contact Section: Yeti slides in from bottom-right
    if (contactYetiRef.current) {
      gsap.fromTo(
        contactYetiRef.current,
        { x: '100%', y: '100%', opacity: 0 },
        {
          x: '0%',
          y: '0%',
          opacity: 1,
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  // Projects hover animation
  useEffect(() => {
    if (projectsYetiRef.current && hoveredProject !== null) {
      const projectCard = document.querySelector(
        `.project-card-${hoveredProject}`
      );
      if (projectCard) {
        const rect = projectCard.getBoundingClientRect();
        gsap.to(projectsYetiRef.current, {
          left: rect.left + rect.width / 2 - 64,
          top: rect.top - 100,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    } else if (projectsYetiRef.current) {
      gsap.to(projectsYetiRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [hoveredProject]);

  return (
    <YetiContext.Provider value={{ setHoveredProject }}>
      {children}
      {/* About Section Yeti */}
      <img
        ref={aboutYetiRef}
        src="/yeti-peek-side left.png"
        alt="Yeti Guide"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 w-32 h-auto pointer-events-none opacity-0"
      />

      {/* Experience Section Yeti */}
      <img
        ref={experienceYetiRef}
        src="/yeti-climb.png"
        alt="Yeti Climbing"
        className="fixed right-10 top-1/2 -translate-y-1/2 z-50 w-24 h-auto pointer-events-none opacity-0"
      />

      {/* Projects Section Yeti */}
      <img
        ref={projectsYetiRef}
        src="/yeti-peek-top.png"
        alt="Yeti Peeking"
        className="fixed z-50 w-32 h-auto pointer-events-none opacity-0"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Contact Section Yeti */}
      <img
        ref={contactYetiRef}
        src="/yeti-peek-side.png"
        alt="Yeti Guide"
        className="fixed bottom-10 right-10 z-50 w-32 h-auto pointer-events-none opacity-0"
      />
    </YetiContext.Provider>
  );
}

