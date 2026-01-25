"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Mail, Github, Linkedin, Send } from "lucide-react"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Sujitbhandari" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sujit-bhandari-296ab4264/" },
  { icon: Mail, label: "Email", href: "mailto:sujitbhandari77@gmail.com" },
]

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      {/* Parallax Background - Using Lake Mountain.png */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Lake Mountain.png"
          alt="Lake and Mountain"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center center",
            minHeight: "100%",
            height: "100%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center pt-12 sm:pt-20 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 relative z-20 w-full"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <motion.h2 
            className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 px-2"
            style={{
              transform: "translateZ(50px)",
              textShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 60px rgba(251, 191, 36, 0.3)",
              position: "relative",
              zIndex: 20
            }}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              rotateX: 5,
              z: 100
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Join the <span className="text-amber-300">Expedition</span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto px-2"
            style={{ transform: "translateZ(30px)", position: "relative", zIndex: 20 }}
          >
            Ready to conquer new heights together? Let's connect and build something amazing.
          </motion.p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          <div
            className="bg-white/3 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl"
            style={{ 
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.1)"
            }}
          >
            {/* Contact Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                  placeholder="Tell me about your expedition..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-sm">or connect with me</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5, rotate: 360 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 text-center mt-20"
      >
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Sujit Bhandari. Built with passion at the summit.
        </p>
      </motion.footer>
    </section>
  )
}
