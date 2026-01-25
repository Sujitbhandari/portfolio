"use client"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ExternalLink, Github } from "lucide-react"

interface PeekingCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  githubUrl: string
  liveUrl?: string
}

export function PeekingCard({ title, description, tags, githubUrl }: PeekingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  const y = useTransform(ySpring, (val) => val - 35)

  useEffect(() => {
    if (!isHovered) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.3)
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.3)
    }

    const element = cardRef.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        mouseX.set(0)
        mouseY.set(0)
      }
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
      {/* Animated Yeti Peek-a-Boo */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ 
              scale: 0,
              rotate: -180,
              y: 150,
              opacity: 0,
              x: 0
            }}
            animate={{ 
              scale: 1.1,
              rotate: 0,
              y: -35,
              opacity: 1
            }}
            exit={{ 
              scale: 0,
              rotate: 180,
              y: 150,
              opacity: 0
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.6
            }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 z-50 pointer-events-none"
            style={{ x, y }}
          >
            {/* Yeti with lively bounce and wiggle animation */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/images/yeti-peek-top.png"
                alt="Peeking Yeti"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ 
                  filter: 'drop-shadow(0 15px 40px rgba(251, 191, 36, 0.5))',
                  transform: 'perspective(1000px) rotateX(5deg)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content with Dramatic 3D */}
      <motion.div
        initial={{ rotateX: 0, rotateY: 0, z: 0 }}
        whileHover={{ 
          y: -20, 
          scale: 1.08, 
          rotateX: 10, 
          rotateY: 10, 
          z: 80,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1500px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(251, 191, 36, 0.15)"
        }}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden group-hover:bg-white/10 group-hover:border-amber-400/30 transition-all duration-500"
      >
        {/* GitHub Icon in Top Right */}
        {githubUrl && (
          <div className="absolute top-4 right-4 z-20">
            <Github className="w-5 h-5 text-white/60 group-hover:text-amber-300 transition-colors" />
          </div>
        )}

        {/* Glow Effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={isHovered ? {
            opacity: [0, 1, 0.8]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors pr-8">
            {title}
          </h3>
          
          <p className="text-white/60 leading-relaxed mb-6">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-amber-400/10 text-amber-300/80 text-sm rounded-full border border-amber-400/20"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
    </a>
  )
}

