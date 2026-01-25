'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Clouds() {
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cloudsRef.current) return;

    const clouds = cloudsRef.current.children;

    // Animate each cloud with different speeds and delays
    Array.from(clouds).forEach((cloud, index) => {
      const speed = 20 + Math.random() * 30; // Faster movement for wind effect
      const startX = -400 - Math.random() * 300;
      const endX = window.innerWidth + 400;
      const startY = 50 + Math.random() * 400; // Random vertical position
      const baseY = startY;

      gsap.set(cloud, {
        x: startX,
        y: startY,
        opacity: 0.25 + Math.random() * 0.35, // Random opacity between 0.25-0.6
        scale: 0.7 + Math.random() * 0.7, // Random size between 0.7-1.4
        rotation: -5 + Math.random() * 10, // Slight rotation for wind effect
      });

      // Horizontal movement (wind blowing clouds) - continuous loop
      const horizontalTween = gsap.to(cloud, {
        x: endX,
        duration: speed,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 10,
        onRepeat: () => {
          // Reset position when cloud goes off screen
          gsap.set(cloud, { x: startX - Math.random() * 200 });
        },
      });

      // Dynamic vertical movement (wind turbulence) - more pronounced
      gsap.to(cloud, {
        y: baseY + 30 + Math.random() * 60,
        duration: 3 + Math.random() * 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Rotation animation (wind twisting clouds)
      gsap.to(cloud, {
        rotation: `+=${15 + Math.random() * 20}`,
        duration: 4 + Math.random() * 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Scale animation (clouds expanding/contracting with wind)
      gsap.to(cloud, {
        scale: `+=${0.15 + Math.random() * 0.15}`,
        duration: 4 + Math.random() * 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Parallax effect based on scroll (wind intensity changes)
      gsap.to(cloud, {
        x: '+=50',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Add overall wind gust effect
    const windGust = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    windGust.to(cloudsRef.current, {
      x: '+=20',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    });

    // Animate wind particles
    const particles = cloudsRef.current.querySelectorAll('.wind-particle');
    particles.forEach((particle, i) => {
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const speed = 3 + Math.random() * 4;
      
      gsap.set(particle, {
        x: startX,
        y: startY,
        opacity: 0.1 + Math.random() * 0.2,
      });

      gsap.to(particle, {
        x: startX + 200 + Math.random() * 300,
        y: startY + (Math.random() - 0.5) * 100,
        duration: speed,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * 2,
        onRepeat: () => {
          gsap.set(particle, {
            x: -50 - Math.random() * 100,
            y: Math.random() * window.innerHeight,
          });
        },
      });
    });
  }, []);

  return (
    <div ref={cloudsRef} className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
      {/* Wind particles effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="wind-particle absolute w-1.5 h-1.5 bg-white/30 rounded-full blur-sm"
          />
        ))}
      </div>
      {/* Cloud 1 - Multiple layers for realistic cloud shape */}
      <div className="absolute">
        <div className="w-64 h-32 bg-white/25 rounded-full blur-2xl"></div>
        <div className="w-48 h-24 bg-white/20 rounded-full blur-xl -mt-16 ml-8"></div>
        <div className="w-56 h-28 bg-white/20 rounded-full blur-xl -mt-12 -ml-4"></div>
      </div>
      {/* Cloud 2 */}
      <div className="absolute">
        <div className="w-80 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="w-64 h-32 bg-white/15 rounded-full blur-2xl -mt-20 ml-12"></div>
        <div className="w-72 h-36 bg-white/18 rounded-full blur-2xl -mt-16 -ml-8"></div>
      </div>
      {/* Cloud 3 */}
      <div className="absolute">
        <div className="w-72 h-36 bg-white/22 rounded-full blur-2xl"></div>
        <div className="w-56 h-28 bg-white/18 rounded-full blur-xl -mt-14 ml-6"></div>
        <div className="w-60 h-30 bg-white/20 rounded-full blur-xl -mt-10 -ml-6"></div>
      </div>
      {/* Cloud 4 */}
      <div className="absolute">
        <div className="w-96 h-48 bg-white/20 rounded-full blur-3xl"></div>
        <div className="w-80 h-40 bg-white/15 rounded-full blur-2xl -mt-24 ml-16"></div>
        <div className="w-88 h-44 bg-white/18 rounded-full blur-2xl -mt-20 -ml-12"></div>
      </div>
      {/* Cloud 5 */}
      <div className="absolute">
        <div className="w-56 h-28 bg-white/25 rounded-full blur-xl"></div>
        <div className="w-44 h-22 bg-white/20 rounded-full blur-lg -mt-12 ml-4"></div>
        <div className="w-48 h-24 bg-white/20 rounded-full blur-lg -mt-8 -ml-4"></div>
      </div>
      {/* Cloud 6 */}
      <div className="absolute">
        <div className="w-88 h-44 bg-white/22 rounded-full blur-2xl"></div>
        <div className="w-72 h-36 bg-white/18 rounded-full blur-xl -mt-18 ml-10"></div>
        <div className="w-76 h-38 bg-white/20 rounded-full blur-xl -mt-14 -ml-8"></div>
      </div>
      {/* Cloud 7 */}
      <div className="absolute">
        <div className="w-60 h-30 bg-white/20 rounded-full blur-xl"></div>
        <div className="w-48 h-24 bg-white/15 rounded-full blur-lg -mt-14 ml-6"></div>
        <div className="w-52 h-26 bg-white/18 rounded-full blur-lg -mt-10 -ml-6"></div>
      </div>
      {/* Cloud 8 */}
      <div className="absolute">
        <div className="w-76 h-38 bg-white/18 rounded-full blur-2xl"></div>
        <div className="w-64 h-32 bg-white/15 rounded-full blur-xl -mt-16 ml-8"></div>
        <div className="w-68 h-34 bg-white/17 rounded-full blur-xl -mt-12 -ml-8"></div>
      </div>
    </div>
  );
}

