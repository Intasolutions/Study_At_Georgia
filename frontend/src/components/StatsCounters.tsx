"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true;
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function StatsCounters({ 
  initialContent = {}, 
  initialStats = [] 
}: { 
  initialContent?: Record<string, string>,
  initialStats?: { id: number; number_value: number; suffix: string; label: string }[]
}) {
  const [stats, setStats] = useState<{ id: number; number_value: number; suffix: string; label: string }[]>(initialStats);

  useEffect(() => {
    if (initialStats.length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/stats/`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);
    }
  }, [initialStats]);

  if (stats.length === 0) return null;

  return (
    <section className="bg-white py-20 font-sans relative overflow-hidden border-t border-slate-100">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px)] bg-[size:10rem_10rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-slate-200 rounded-2xl bg-brand-background/50 backdrop-blur-sm shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-slate-200 flex-wrap">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              className="flex flex-col items-start p-6 sm:p-8 md:p-12 relative group overflow-hidden"
            >
              {/* Subtle top indicator bar utilizing your brand colors sequentially */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-500 ${
                  index === 0 ? 'bg-brand-primary' : index === 1 ? 'bg-brand-crimson' : 'bg-brand-gold'
                }`} 
              />

              {/* Decorative background hover reveal */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Stat Number */}
              <div className="text-5xl md:text-6xl font-extrabold text-brand-foreground mb-3 tracking-tight flex items-baseline">
                <span className="text-brand-foreground group-hover:text-brand-primary transition-colors duration-300">
                  <Counter from={0} to={stat.number_value} />
                </span>
                
                {/* Suffix using Crimson to emphasize key results */}
                <span className="text-brand-crimson ml-0.5 font-semibold text-3xl md:text-4xl">
                  {stat.suffix}
                </span>
              </div>

              {/* Stat Label */}
              <div className="text-slate-500 font-semibold text-xs uppercase tracking-widest leading-relaxed">
                {stat.label}
              </div>

              {/* Subtle corner detail icon replacement for modern layout balance */}
              <div className="absolute bottom-4 right-4 opacity-10 text-slate-400 font-serif text-3xl select-none group-hover:opacity-20 transition-opacity">
                {`// 0${index + 1}`}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}