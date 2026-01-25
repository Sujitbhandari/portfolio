"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-16 md:h-20">
            {/* Desktop Navigation - Centered with 3D */}
            <div className="hidden md:flex items-center gap-1" style={{ transformStyle: "preserve-3d" }}>
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-white/70 hover:text-amber-300 transition-colors text-sm font-medium relative group"
                  whileHover={{ scale: 1.1, y: -2, rotateY: 5 }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.label}
                  <motion.span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-amber-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.div
          initial={false}
          animate={{
            x: isMobileMenuOpen ? 0 : "100%",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-slate-900 border-l border-white/10 p-6 pt-24"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-white/70 hover:text-amber-300 hover:bg-white/5 rounded-lg transition-all text-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

