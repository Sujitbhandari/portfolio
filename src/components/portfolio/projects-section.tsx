"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { PeekingCard } from "./peeking-card"

const projects = [
  {
    title: "Algo-Catalyst",
    description: "High-performance Event-Driven Trading Engine in C++20. Features a custom AI Regime Detector (k-Means) and News Momentum algorithms for Level 2 order book filtering.",
    tags: ["C++", "Python", "CMake"],
    githubUrl: "https://github.com/Sujitbhandari/Algo-Catalyst"
  },
  {
    title: "FedScope",
    description: "FOMC Impact Analysis Tool. Quantifies the effect of Federal Reserve meetings on S&P 500 volatility using event-driven analysis and FinBERT (NLP) sentiment scoring.",
    tags: ["Python", "FinBERT", "NLP", "Pandas"],
    githubUrl: "https://github.com/Sujitbhandari/FedScope"
  },
  {
    title: "NeuroCore-AI",
    description: "High-performance Deep Learning engine built from scratch in C++17. Features custom matrix mathematics, OpenMP multi-threading for parallel training, and a hybrid Python pipeline for data normalization.",
    tags: ["C++17", "OpenMP", "Python", "CMake"],
    githubUrl: "https://github.com/Sujitbhandari/NeuroCore-AI"
  },
  {
    title: "Theta-Prime",
    description: "Automated options trading system implementing 'The Wheel Strategy'. Analyzes Implied Volatility (IV) to execute cash-secured puts and covered calls for optimized premium capture.",
    tags: ["Python", "Pandas", "IBKR API"],
    githubUrl: "https://github.com/Sujitbhandari/Theta-Prime"
  },
  {
    title: "TrustGraph-AI",
    description: "Hallucination-resistant RAG (Retrieval-Augmented Generation) architecture. Uses Knowledge Graphs to ground LLM outputs in verifiable facts for high-stakes domains.",
    tags: ["Neo4j", "LangChain", "Python"],
    githubUrl: "https://github.com/Sujitbhandari/TrustGraph-AI"
  },
  {
    title: "DermaVoice",
    description: "Hands-free dermatological analysis tool. Integrates real-time speech-to-text with computer vision to allow clinicians to document skin conditions via voice commands.",
    tags: ["React Native", "OpenAI Whisper", "TensorFlow"],
    githubUrl: "https://github.com/Sujitbhandari/DermaVoice"
  }
]

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      {/* Parallax Background with 3D Depth */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Mountain.png"
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "translateZ(-50px) scale(1.05)",
            transformStyle: "preserve-3d",
            minHeight: "100%",
            height: "100%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-slate-950" />
      </div>

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
            The <span className="text-amber-300">Exploration</span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2"
            style={{ transform: "translateZ(30px)" }}
          >
            Charting new territories through code. Each project is a new peak conquered.
          </motion.p>
        </motion.div>

        {/* Projects Grid with Dramatic 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 justify-items-center" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 100, rotateX: -60, rotateY: index % 2 === 0 ? -30 : 30, z: -200 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2, type: "spring", stiffness: 200 }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full"
            >
              <PeekingCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

