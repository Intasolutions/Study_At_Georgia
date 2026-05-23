"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, CheckCircle2, Building2, Star } from "lucide-react";
import { useState, useEffect } from "react";

type Testimonial = {
  id: number;
  student_name: string;
  university_name: string;
  quote: string;
};

export default function Testimonials({ 
  initialContent = {}, 
  initialTestimonials = [] 
}: { 
  initialContent?: Record<string, string>,
  initialTestimonials?: Testimonial[]
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [content, setContent] = useState<Record<string, string>>(initialContent);

  useEffect(() => {
    if (initialTestimonials.length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/testimonials/`)
        .then(res => res.json())
        .then(data => setTestimonials(data))
        .catch(console.error);
    }

    if (Object.keys(initialContent).length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
        .then(res => res.json())
        .then((data: { identifier: string; text_value: string }[]) => {
          const dict: Record<string, string> = {};
          data.forEach(item => { dict[item.identifier] = item.text_value || ""; });
          setContent(dict);
        })
        .catch(console.error);
    }
  }, [initialTestimonials, initialContent]);

  // Autoplay functionality
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [testimonials.length, activeIndex]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 relative bg-white font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-gold"></span>
              {content.testimonials_section_subtitle || "Voices of Excellence"}
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-foreground leading-tight mb-6">
              {content.testimonials_main_title_part1 || "Global"} <br />
              <span className="text-brand-primary">{content.testimonials_main_title_part2 || "Scholars."}</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-light mb-8 max-w-sm">
              {content.testimonials_section_description || "Decades of trust, documented by ambitious students who transitioned from local aspirations to international prestige."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: The Alumni Roster (Interactive List) */}
          <div className="lg:col-span-4 flex flex-col relative">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{content.testimonials_sidebar_title || "Featured Alumni"}</h3>
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar relative snap-x snap-mandatory">
              {/* Highlight Slider Background (Desktop only for precision) */}
              <motion.div 
                className="hidden lg:block absolute left-0 w-full h-24 bg-slate-50 border-l-2 border-brand-primary z-0 rounded-r-lg transition-all"
                animate={{ top: activeIndex * 104 }} // 104px is approx the height of the button + gap
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative z-10 text-left min-w-[280px] lg:min-w-0 p-5 rounded-lg lg:rounded-none lg:rounded-r-lg transition-all duration-300 border-l-2 lg:border-l-0 snap-center ${
                    activeIndex === index 
                      ? "bg-slate-50 lg:bg-transparent border-brand-primary lg:border-transparent shadow-sm lg:shadow-none" 
                      : "border-transparent hover:bg-slate-50/50 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg transition-colors ${
                      activeIndex === index ? "bg-brand-primary text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      {t.student_name.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-bold text-base transition-colors ${
                        activeIndex === index ? "text-brand-primary" : "text-slate-700"
                      }`}>
                        {t.student_name}
                      </div>
                      <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{t.university_name}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: The Editorial Feature Card */}
          <div className="lg:col-span-8 relative min-h-[400px]">
            {/* Structural Heritage Watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none flex items-center justify-center w-full h-full">
              <div className="w-64 h-64 border-[1px] border-brand-primary rotate-45 flex items-center justify-center">
                 <div className="w-48 h-48 border-[1px] border-brand-primary rotate-[-45deg] flex items-center justify-center">
                   <Star className="w-16 h-16 text-brand-primary" />
                 </div>
              </div>
            </div>

            <div className="relative h-full flex flex-col justify-center">
              <div className="text-brand-gold/20 mb-6">
                <Quote size={64} fill="currentColor" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-brand-foreground leading-snug mb-8 sm:mb-12">
                    &quot;{testimonials[activeIndex]?.quote}&quot;
                  </p>

                  <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                      {testimonials[activeIndex]?.student_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-brand-foreground text-lg">{testimonials[activeIndex]?.student_name}</div>
                      <div className="text-brand-primary text-sm font-medium">{testimonials[activeIndex]?.university_name}</div>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                      <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                      <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">{content.testimonials_status_label || "Status"}: <span className="text-brand-foreground">{content.testimonials_status_value || "Visa Approved"}</span></span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}