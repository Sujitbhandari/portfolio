"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatedClouds } from "./animated-clouds"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Background with 3D Parallax */}
      <motion.div
        style={{ 
          y: parallaxY, 
          opacity,
          transformStyle: "preserve-3d",
          perspective: "2000px"
        }}
        className="absolute inset-0"
      >
        <motion.img
          src="/images/hero-summit.png"
          alt="Hero Summit"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.2) translateZ(-100px)',
            transformStyle: "preserve-3d"
          }}
          animate={{
            scale: [1.2, 1.25, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Animated Clouds */}
      <AnimatedClouds />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90" />
      
      {/* Golden Hour Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-transparent to-orange-900/10" />

      {/* Content with Dramatic 3D Effect */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -40, z: -200 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="w-full max-w-5xl px-2"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-amber-200/80 text-xs sm:text-sm md:text-base uppercase tracking-widest mb-4 sm:mb-6"
          >
            Welcome to the Summit
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, rotateX: -50, z: -300 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
            style={{ 
              textShadow: "0 15px 50px rgba(0,0,0,0.8), 0 0 80px rgba(251, 191, 36, 0.4), 0 0 120px rgba(251, 191, 36, 0.2)",
              transformStyle: "preserve-3d",
              transform: "translateZ(100px)"
            }}
          >
            <motion.span 
              className="block"
              whileHover={{ 
                scale: 1.15, 
                rotateY: 15, 
                rotateX: 5,
                z: 100,
                textShadow: "0 20px 60px rgba(0,0,0,0.9), 0 0 100px rgba(251, 191, 36, 0.6)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ 
                transformStyle: "preserve-3d", 
                display: "inline-block",
                transform: "translateZ(50px)"
              }}
            >
              CONQUER
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.15, 
                rotateY: -15, 
                rotateX: -5,
                z: 100,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ 
                transformStyle: "preserve-3d", 
                display: "inline-block",
                transform: "translateZ(50px)"
              }}
            >
              NEW HEIGHTS
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <p className="text-base sm:text-xl md:text-2xl text-white/90 font-light px-2">
              Sujit Bhandari | Software Engineer
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
