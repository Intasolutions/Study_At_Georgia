"use client";

import { motion } from "framer-motion";
import { FileCheck, GraduationCap, Home, Plane, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [services, setServices] = useState<{ id: number; name: string; description: string }[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/service-packages/`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);
  }, []);

  const icons = [
    <FileCheck key="1" className="w-6 h-6" />,
    <GraduationCap key="2" className="w-6 h-6" />,
    <Home key="3" className="w-6 h-6" />,
    <Plane key="4" className="w-6 h-6" />,
  ];

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-32 bg-white relative font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Sticky Header & Georgian Animation */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-brand-gold"></span>
                  Pillars of Excellence
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-foreground leading-tight mb-6">
                  Comprehensive <br />
                  <span className="text-brand-primary">Consulting.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  A frictionless ecosystem designed to transition you globally without the traditional administrative chaos. Experience absolute clarity at every step.
                </p>
              </motion.div>

              {/* Custom "Georgia Touch" Animation: The Academic Astrolabe */}
              <div className="mt-16 relative w-64 h-64 hidden md:flex items-center justify-center">
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-brand-crimson/5 rounded-full blur-2xl" />

                {/* Outer Rotating Compass Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-slate-200 border-dashed"
                />
                
                {/* Middle Rotating Ring (Counter-clockwise) */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-slate-100"
                />

                {/* Static Inner Georgian Cross Frame */}
                <div className="absolute inset-8 rounded-full border border-brand-primary/20 flex items-center justify-center bg-white shadow-inner">
                  <div className="relative w-full h-full">
                    {/* Main Cross (Subtle nod to Georgian Flag structure) */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent" />
                    <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

                    {/* 4 Quadrant Accent Stars (Pulsing Gold/Crimson) */}
                    {[
                      { top: '20%', left: '20%', delay: 0 },
                      { top: '20%', right: '20%', delay: 1 },
                      { bottom: '20%', left: '20%', delay: 2 },
                      { bottom: '20%', right: '20%', delay: 3 }
                    ].map((pos, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-brand-gold rotate-45 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ ...pos, boxShadow: '0 0 10px var(--color-brand-gold)' }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6],
                          backgroundColor: ["var(--color-brand-gold)", "var(--color-brand-crimson)", "var(--color-brand-gold)"]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: pos.delay
                        }}
                      />
                    ))}

                    {/* Central Anchor Dot */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_var(--color-brand-primary)] border-2 border-white" />
                  </div>
                </div>

                {/* Floating Decorative Rings */}
                <motion.div
                  animate={{ y: [-5, 5, -5], rotateX: [10, -10, 10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="absolute inset-[-10px] rounded-full border border-brand-gold/30"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Anchored Interactive List */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="border-t border-slate-200">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative border-b border-slate-200 py-10 cursor-pointer transition-colors duration-300 hover:bg-slate-50 px-6 -mx-6 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 lg:gap-10">
                    
                    {/* Number Indicator */}
                    <div className="text-2xl font-light text-slate-300 group-hover:text-brand-gold transition-colors duration-300 font-serif">
                      0{index + 1}
                    </div>

                    <div className="flex-1">
                      {/* Title & Icon Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-brand-foreground group-hover:text-brand-primary transition-colors duration-300 flex items-center gap-4">
                          <span className="p-2 rounded-lg bg-white shadow-sm border border-slate-100 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                            {icons[index % icons.length]}
                          </span>
                          {service.name}
                        </h3>
                        
                        {/* Animated Arrow */}
                        <motion.div
                          animate={{ 
                            x: hoveredIndex === index ? 5 : 0,
                            opacity: hoveredIndex === index ? 1 : 0.3 
                          }}
                          className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-brand-crimson group-hover:text-brand-crimson group-hover:bg-brand-crimson/5 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-500 font-light leading-relaxed max-w-2xl group-hover:text-slate-700 transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}