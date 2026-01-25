"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"

interface Container3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Container3D({ children, className = "", intensity = 15 }: Container3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity])

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
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

