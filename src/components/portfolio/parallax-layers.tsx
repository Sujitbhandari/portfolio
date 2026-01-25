"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxLayers() {
  const { scrollYProgress } = useScroll()

  // Different speeds for depth effect (Firewatch style)
  // Basecamp (furthest) moves slowest (0.2x)
  // Ridge moves at medium speed (0.5x)
  // Mountain moves at normal speed (1.0x)
  // Sky moves fastest (1.5x)
  
  const basecampY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const ridgeY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ height: "200vh" }}>
      {/* Layer 4: Basecamp (furthest, slowest) */}
      <motion.div
        style={{ y: basecampY }}
        className="absolute inset-0"
      >
        <img
          src="/images/bg-basecamp.png"
          alt="Basecamp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ height: "200vh", width: "100vw" }}
        />
      </motion.div>

      {/* Layer 3: Ridge (medium speed) */}
      <motion.div
        style={{ y: ridgeY }}
        className="absolute inset-0"
      >
        <img
          src="/images/bg-ridge.png"
          alt="Ridge"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ height: "200vh", width: "100vw" }}
        />
      </motion.div>

      {/* Layer 2: Mountain (normal speed) */}
      <motion.div
        style={{ y: mountainY }}
        className="absolute inset-0"
      >
        <img
          src="/images/Mountain.png"
          alt="Mountain"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ height: "200vh", width: "100vw" }}
        />
      </motion.div>

      {/* Layer 1: Sky (fastest, closest) */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-summit.png"
          alt="Sky"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ height: "200vh", width: "100vw" }}
        />
      </motion.div>
    </div>
  )
}

