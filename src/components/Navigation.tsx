'use client';

import { useEffect, useState } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`.${sectionId}`);
    if (element) {
      // Use Lenis smooth scroll if available, otherwise fallback to native
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -20, duration: 1.5 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-section', 'about-section', 'experience-section', 'projects-section', 'contact-section'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.querySelector(`.${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.replace('-section', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-lg bg-black/60 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center">
          <ul className="flex gap-6 md:gap-8 items-center">
            <li>
              <button
                onClick={() => scrollToSection('hero-section')}
                className={`text-sm md:text-base font-inter transition-colors font-medium ${
                  activeSection === 'hero' ? 'text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('experience-section')}
                className={`text-sm md:text-base font-inter transition-colors font-medium ${
                  activeSection === 'experience' ? 'text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('projects-section')}
                className={`text-sm md:text-base font-inter transition-colors font-medium ${
                  activeSection === 'projects' ? 'text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about-section')}
                className={`text-sm md:text-base font-inter transition-colors font-medium ${
                  activeSection === 'about' ? 'text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact-section')}
                className={`text-sm md:text-base font-inter transition-colors font-medium ${
                  activeSection === 'contact' ? 'text-white/90 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

