'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundStage() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const ridgeRef = useRef<HTMLImageElement>(null);
  const mountainRef = useRef<HTMLImageElement>(null);
  const basecampRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Hero image fade out
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Ridge background fade in
    if (ridgeRef.current) {
      gsap.fromTo(
        ridgeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }

    // Mountain background fade in
    if (mountainRef.current) {
      gsap.fromTo(
        mountainRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }

    // Basecamp background fade in
    if (basecampRef.current) {
      gsap.fromTo(
        basecampRef.current,
        { opacity: 0 },
        {
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

  return (
    <div className="fixed inset-0 z-0">
      {/* Layer 1: Hero Image - Landing Page Background */}
      <img
        ref={heroImageRef}
        src="/hero-summit.png"
        alt="Hero Summit"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        style={{ 
          filter: 'brightness(0.6) contrast(1.2) saturate(0.7)',
        }}
      />
      
      {/* Dark Blue-Grey Gradient Overlay - Matching Screenshot */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 30, 50, 0.4) 0%, rgba(15, 25, 40, 0.3) 20%, rgba(10, 20, 35, 0.2) 40%, rgba(5, 15, 30, 0.4) 60%, rgba(0, 0, 0, 0.6) 80%, rgba(0, 0, 0, 0.85) 100%)'
        }}
      ></div>

      {/* Layer 2: Ridge Background */}
      <img
        ref={ridgeRef}
        src="/bg-ridge.png"
        alt="Ridge Background"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />

      {/* Layer 3: Mountain Background */}
      <img
        ref={mountainRef}
        src="/Mountain.png"
        alt="Mountain Background"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />

      {/* Layer 4: Basecamp Background */}
      <img
        ref={basecampRef}
        src="/bg-basecamp.png"
        alt="Basecamp Background"
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />
    </div>
  );
}

