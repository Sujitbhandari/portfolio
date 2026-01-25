"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = "", intensity = 20 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`])
  const scale = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [1, 1.1, 1]
  )
  const z = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [0, 50, 0]
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
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div 
          style={{ 
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

