"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

export function AnimatedClouds() {
  const [windowWidth, setWindowWidth] = useState(1920)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generate cloud properties once and memoize them to prevent hydration mismatches
  const cloudConfigs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      // Use a seeded random based on index for consistency
      const seed = i * 0.618033988749895 // Golden ratio for better distribution
      const random = () => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      
      return {
        speed: 20 + random() * 30,
        delay: random() * 5,
        startX: -200 - random() * 300,
        y: 50 + random() * 400,
        size: 100 + random() * 200,
        opacity: 0.2 + random() * 0.3,
      }
    })
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cloudConfigs.map((config, index) => {
        const endX = windowWidth + 200

        return (
          <motion.div
            key={index}
            initial={{ x: config.startX, y: config.y }}
            animate={{
              x: endX,
              y: config.y + Math.sin(index) * 30,
            }}
            transition={{
              duration: config.speed,
              repeat: Infinity,
              delay: config.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{
              width: `${config.size}px`,
              height: `${config.size * 0.5}px`,
              opacity: config.opacity,
            }}
          >
            {/* Cloud shape with multiple layers */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl" />
              <div className="absolute -top-1/4 left-1/4 w-3/4 h-3/4 bg-white/25 rounded-full blur-xl" />
              <div className="absolute -bottom-1/4 right-1/4 w-2/3 h-2/3 bg-white/20 rounded-full blur-lg" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

