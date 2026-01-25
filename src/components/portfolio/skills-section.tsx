"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Code2, Brain, Cloud, Cpu, Smartphone, Calculator } from "lucide-react"
import { Card3D } from "./3d-card"

const skills = [
  { 
    icon: Code2, 
    label: "Languages", 
    stack: "Python, C++, Java, TypeScript, JavaScript, SQL, Bash, HTML/CSS"
  },
  { 
    icon: Brain, 
    label: "AI & Data Science", 
    stack: "Generative AI, LLMs, RAG, LangChain, PyTorch, TensorFlow, Hugging Face, Scikit-learn, Pandas, NumPy"
  },
  { 
    icon: Cloud, 
    label: "Cloud & Network Infrastructure", 
    stack: "AWS, Azure, Docker, Linux, CI/CD, Git, TCP/IP, DNS, Vercel"
  },
  { 
    icon: Cpu, 
    label: "Backend & Systems", 
    stack: "Node.js, FastAPI, Pydantic, REST APIs, GraphQL, System Design, Multithreading"
  },
  { 
    icon: Smartphone, 
    label: "Frontend & Mobile", 
    stack: "React, Next.js 14, React Native, Tailwind CSS, Framer Motion, Three.js"
  },
  { 
    icon: Calculator, 
    label: "Quant & Mathematics", 
    stack: "Algorithmic Trading, Stochastic Calculus, Linear Algebra, Probability & Statistics, IBKR API"
  },
]

export function SkillsSection() {
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
            My <span className="text-amber-300">Skills</span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2"
            style={{ transform: "translateZ(30px)" }}
          >
            The tools and expertise I bring to every expedition.
          </motion.p>
        </motion.div>

        {/* Skills Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" style={{ perspective: "1000px" }}>
          {skills.map((skill, index) => (
            <Card3D key={skill.label} intensity={25} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: -30, z: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(30px)",
                  boxShadow: "0 15px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.15)"
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 group h-full w-full"
              >
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow flex-shrink-0"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                </motion.div>
                <h4 className="font-semibold text-white mb-2 sm:mb-3 group-hover:text-amber-200 transition-colors text-base sm:text-lg break-words">
                  {skill.label}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed break-words hyphens-auto">{skill.stack}</p>
              </motion.div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}

