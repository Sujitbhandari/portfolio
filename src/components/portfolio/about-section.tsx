"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card3D } from "./3d-card"

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      {/* 3D Ambient Background with Parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0"
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <motion.h2 
            className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 px-2"
            style={{
              transform: "translateZ(50px)",
              textShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 60px rgba(251, 191, 36, 0.3)"
            }}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              rotateX: 5,
              z: 100
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            The <span className="text-amber-300">Climber</span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2"
            style={{ transform: "translateZ(30px)" }}
          >
            Every expedition needs a skilled mountaineer. Here's what I bring to the climb.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 items-center">
          {/* Picture Box on Left - Smaller */}
          <Card3D intensity={15} className="relative lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 relative aspect-square overflow-hidden max-w-sm mx-auto"
                style={{
                  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 120px rgba(251, 191, 36, 0.2), inset 0 0 60px rgba(251, 191, 36, 0.05)",
                  transform: "translateZ(60px) rotateX(2deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                <img
                  src="/images/thumbnail.png"
                  alt="Sujit Bhandari"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </Card3D>

          {/* About Text on Right - Bigger */}
          <Card3D intensity={15} className="relative lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 relative"
                style={{
                  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 120px rgba(251, 191, 36, 0.2), inset 0 0 60px rgba(251, 191, 36, 0.05)",
                  transform: "translateZ(60px) rotateX(2deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                  Reaching New Peaks in Tech
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white/70 leading-relaxed">
                  <p>
                    I'm a Computer Science and Mathematics student at Texas Christian University, 
                    passionate about building technology that makes a difference. Like scaling a 
                    mountain, I approach each challenge with determination and strategic thinking.
                  </p>
                  <p>
                    My journey has taken me through the valleys of full-stack development, 
                    across the ridges of machine learning, and up to the peaks of algorithm 
                    optimization. Each project is a new summit to conquer.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, 
                    contributing to open source, or mentoring fellow climbers on their 
                    tech journeys.
                  </p>
                </div>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}
