"use client";

import { motion } from "framer-motion";
import { Globe, Building2, Briefcase, Users, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhyGruni() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => { dict[item.identifier] = item.text_value || ""; });
        setContent(dict);
      })
      .catch(console.error);
  }, []);

  const dynamicPoints = [
    {
      title: content.why_gruni_pt1_title || "Global Recognition",
      description: content.why_gruni_pt1_desc || "Degrees recognized worldwide, opening doors to international career opportunities across Europe and beyond.",
      icon: Globe,
    },
    {
      title: content.why_gruni_pt2_title || "State-of-the-Art Campus",
      description: content.why_gruni_pt2_desc || "Modern laboratories, extensive libraries, and advanced research facilities designed for future leaders.",
      icon: Building2,
    },
    {
      title: content.why_gruni_pt3_title || "High Employment Rate",
      description: content.why_gruni_pt3_desc || "Exceptional track record of alumni success with top-tier corporate partnerships and global networking.",
      icon: Briefcase,
    },
    {
      title: content.why_gruni_pt4_title || "International Community",
      description: content.why_gruni_pt4_desc || "A diverse ecosystem of students and faculty from over 50 countries, fostering global perspectives.",
      icon: Users,
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative bg-slate-50 overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text & Premium Feel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-widest text-sm font-bold">
                {content.why_gruni_subtitle || "Excellence in Education"}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-foreground leading-tight mb-8">
              {content.why_gruni_title_1 || "Why Choose"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary/80">
                {content.why_gruni_title_2 || "GRUNI?"}
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed font-light mb-10 max-w-lg">
              {content.why_gruni_desc || "Grigol Robakidze University (GRUNI) represents the pinnacle of modern education in Georgia. We combine rigorous academic standards with cutting-edge facilities to shape the innovators and leaders of tomorrow."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-foreground">{content.why_gruni_badge1_title || "Fully Accredited"}</h4>
                  <p className="text-sm text-slate-500">{content.why_gruni_badge1_desc || "Ministry of Education"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-foreground">{content.why_gruni_badge2_title || "Top Ranked"}</h4>
                  <p className="text-sm text-slate-500">{content.why_gruni_badge2_desc || "In Academic Excellence"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {dynamicPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white text-brand-primary transition-colors duration-300">
                  <point.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-foreground mb-3">
                  {point.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
