"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 relative bg-brand-background overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-foreground mb-6"
          >
            {content.testimonials_main_title_part1 || "Student"} <span className="text-brand-primary">{content.testimonials_main_title_part2 || "Success Stories"}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500"
          >
            {content.testimonials_section_description || "Join hundreds of successful students who have achieved their dreams of studying in top Georgian universities."}
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id || index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
              className="min-w-[320px] md:min-w-[400px] lg:min-w-[450px] snap-center shrink-0"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl shadow-brand-primary/5 border border-slate-100 h-full flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                
                {/* Decorative Quote Icon */}
                <div className="absolute top-6 right-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors">
                  <Quote size={80} className="rotate-180" />
                </div>

                <div className="relative z-10 flex-grow">
                  <p className="text-slate-700 text-lg leading-relaxed italic mb-8">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center text-xl font-bold">
                    {t.student_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-foreground">{t.student_name}</h4>
                    <p className="text-sm font-medium text-brand-primary">{t.university_name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}