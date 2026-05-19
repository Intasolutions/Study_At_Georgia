"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon_text: string;
};

export default function JourneyTimeline() {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/journey-steps/`)
      .then(res => res.json())
      .then(data => setSteps(data))
      .catch(console.error);
  }, []);

  if (steps.length === 0) return null;

  return (
    <section className="py-32 bg-white relative font-sans border-t border-slate-100 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-[#1a237e]/5 via-transparent to-[#9b1c31]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <p className="text-[#cfb53b] text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-[#cfb53b]"></span>
            The Master Plan
            <span className="w-8 h-[2px] bg-[#cfb53b]"></span>
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-tight mb-6">
            Your Journey <span className="text-[#1a237e] font-serif italic font-light">Simplified.</span>
          </h2>
        </div>
        
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 rounded-full transform md:-translate-x-1/2 overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#1a237e] via-[#9b1c31] to-[#cfb53b] rounded-full origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-12 md:space-y-20 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0; // Even indexes (0, 2, 4) go Left on Desktop

              return (
                <div key={index} className="relative flex items-center justify-between w-full group">
                  
                  {/* Left Side (Desktop Only) */}
                  <div className="hidden md:flex w-[45%] justify-end">
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1a237e]/30 shadow-sm hover:shadow-lg transition-all text-right w-full max-w-md relative"
                      >
                        <div className="text-4xl font-serif text-slate-100 absolute -top-4 -right-4 font-bold select-none pointer-events-none">
                          0{index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-3 relative z-10">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-light relative z-10">{step.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node (Icon) */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-white shadow-[0_0_20px_rgba(26,35,126,0.15)] group-hover:shadow-[0_0_30px_rgba(155,28,49,0.3)] transition-shadow duration-500">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-full h-full bg-[#1a237e] rounded-full flex items-center justify-center text-[#cfb53b] font-serif font-bold text-lg"
                    >
                      {step.icon_text}
                    </motion.div>
                  </div>

                  {/* Right Side (Mobile: All items | Desktop: Odd items) */}
                  <div className="w-full pl-24 md:pl-0 md:w-[45%] flex justify-start">
                    {/* On mobile, this always shows. On desktop, this hides if it's an even index (left side). */}
                    <div className={`${isEven ? 'block md:hidden' : 'block'} w-full max-w-md`}>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1a237e]/30 shadow-sm hover:shadow-lg transition-all text-left relative"
                      >
                         <div className="text-4xl font-serif text-slate-100 absolute -top-4 -left-4 md:-left-8 font-bold select-none pointer-events-none">
                          0{index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-3 relative z-10">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-light relative z-10">{step.description}</p>
                      </motion.div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}