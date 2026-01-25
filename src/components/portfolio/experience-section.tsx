"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap, Code, Settings } from "lucide-react"

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "MechaDax • Arlington, TX",
    bullets: [
      "Architected a Python CAD automation engine that deserializes JSON into production-ready .slvs files, cutting manual setup time by 95%.",
      "Implemented type-safe validation using Pydantic to ensure 100% collision-free model generation.",
      "Engineered algorithms for automatic constraint injection, accelerating design iterations by 3x."
    ],
    icon: Code,
    type: "work"
  },
  {
    title: "Student Researcher (AI & Health)",
    company: "TCU • Fort Worth, TX",
    bullets: [
      "Architected a hybrid AI pipeline fusing 50K LLM-generated signals with real ECG data to solve arrhythmia detection scarcity.",
      "Engineered a high-performance PyTorch training stack on NVIDIA GPUs, achieving 99.4% accuracy.",
      "Benchmarked CNN inference vs. Random Forest, proving a 20% reduction in false negatives."
    ],
    icon: GraduationCap,
    type: "research"
  },
  {
    title: "Teaching Assistant",
    company: "Computer Science Department",
    bullets: [
      "Core Subjects: Cloud Computing (COSC 40233), Database Systems (COSC 30603), Computer Organization (COSC 30253), Intro to Data Science (COSC 30103).",
      "Mentored 100+ students on system architecture and graded 500+ technical assessments."
    ],
    icon: GraduationCap,
    type: "education"
  },
  {
    title: "IT Operational Support Specialist",
    company: "TCU",
    bullets: [
      "Maintained university network stability via TCP/IP and VLAN configurations.",
      "Resolved hardware/software tickets for faculty, ensuring minimal operational downtime."
    ],
    icon: Settings,
    type: "work"
  },
]

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const yetiY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      {/* Parallax Background - Using Milky Way */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Milkyway.png"
          alt="Milky Way Galaxy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center center",
            minHeight: "100%",
            height: "100%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
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
            The <span className="text-amber-300">Descent</span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2"
            style={{ transform: "translateZ(30px)" }}
          >
            Every summit begins with a single step. Here's my journey through the peaks of experience.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-amber-400/30 to-transparent hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card with Dramatic 3D */}
                <motion.div 
                  className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  initial={{ opacity: 0, rotateY: index % 2 === 0 ? -50 : 50, z: -100 }}
                  whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: index % 2 === 0 ? 20 : -20, 
                    rotateX: 5,
                    z: 80 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  <div 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500 group"
                    style={{ 
                      transformStyle: "preserve-3d",
                      transform: "translateZ(60px) rotateY(2deg)",
                      boxShadow: "0 35px 90px rgba(0, 0, 0, 0.8), 0 0 70px rgba(251, 191, 36, 0.2), inset 0 0 50px rgba(251, 191, 36, 0.05)"
                    }}
                  >
                    <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-amber-200/80 font-medium mb-4">{exp.company}</p>
                    <ul className="space-y-2 text-white/70 leading-relaxed">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start">
                          <span className="text-amber-400 mr-2 mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Center Icon with Dramatic 3D */}
                <div className="relative z-10 flex-shrink-0" style={{ transformStyle: "preserve-3d", perspective: "500px" }}>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
                    initial={{ scale: 0, rotateX: -180, z: -100 }}
                    whileInView={{ scale: 1, rotateX: 0, z: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.5, 
                      rotate: 360, 
                      rotateY: 180,
                      z: 50,
                      boxShadow: "0 0 40px rgba(251, 191, 36, 0.8)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    style={{ 
                      transformStyle: "preserve-3d",
                      transform: "translateZ(30px)",
                      boxShadow: "0 10px 40px rgba(251, 191, 36, 0.5)"
                    }}
                  >
                    <motion.div
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <exp.icon className="w-7 h-7 text-slate-900" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
