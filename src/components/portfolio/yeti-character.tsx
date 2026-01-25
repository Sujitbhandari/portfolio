"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function YetiCharacter() {
  const yetiRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!yetiRef.current || !containerRef.current) return

    // Fixed position on screen (Bruno Simon style)
    gsap.set(yetiRef.current, {
      position: "fixed",
      bottom: "50px",
      right: "50px",
      zIndex: 100,
      width: "200px",
      height: "auto"
    })

    // Animation states based on scroll progress
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        
        // Change animation state based on scroll position
        // 0-0.3: Climbing animation
        // 0.3-0.7: Transition
        // 0.7-1.0: Peeking animation
        
        if (progress < 0.3) {
          // Climbing state
          gsap.to(yetiRef.current, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.3
          })
        } else if (progress < 0.7) {
          // Transition state
          gsap.to(yetiRef.current, {
            opacity: 0.8,
            scale: 0.9,
            rotation: -10,
            duration: 0.3
          })
        } else {
          // Peeking state
          gsap.to(yetiRef.current, {
            opacity: 1,
            scale: 1.1,
            rotation: 10,
            duration: 0.3
          })
        }
      }
    })

    // Continuous climbing animation when in climbing state
    const climbingAnimation = gsap.to(yetiRef.current, {
      y: -20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    })

    // Pause/resume based on scroll
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress
        if (progress < 0.3) {
          climbingAnimation.play()
        } else {
          climbingAnimation.pause()
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      climbingAnimation.kill()
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div ref={yetiRef} className="pointer-events-none">
        <img
          src="/images/yeti-climb.png"
          alt="Yeti Character"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  )
}

