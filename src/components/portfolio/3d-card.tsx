"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState, ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = "", intensity = 20 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(false) // Start as false (desktop) for better initial render
  
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    // Check immediately on mount
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Full intensity on desktop, minimal on mobile
  const effectiveIntensity = isMobile ? 5 : intensity

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${effectiveIntensity}deg`, `-${effectiveIntensity}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${effectiveIntensity}deg`, `${effectiveIntensity}deg`])
  const scale = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [1, isMobile ? 1 : 1.1, 1]
  )
  const z = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0, isMobile ? 0 : 50, 0]
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5
      x.set(xPct)
      y.set(yPct)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      element.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        element.removeEventListener("mousemove", handleMouseMove)
        element.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [x, y])

  return (
    <div
      style={{
        perspective: isMobile ? "none" : "1000px",
        transformStyle: isMobile ? "flat" : "preserve-3d",
      }}
      className={`${className} w-full ${isMobile ? 'overflow-hidden' : ''}`}
    >
      <motion.div
        ref={ref}
        style={isMobile ? {
          scale: 1,
          transformStyle: "flat",
        } : {
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: "preserve-3d",
        }}
        className="w-full"
      >
        <motion.div 
          style={{ 
            transform: isMobile ? "none" : "translateZ(50px)",
            transformStyle: isMobile ? "flat" : "preserve-3d"
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

