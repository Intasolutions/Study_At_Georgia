"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

interface ProgramBadge {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ProgramKeyPoint {
  id: number;
  title: string;
  description?: string;
  icon: string;
}

interface ProgramComparisonMetric {
  id: number;
  metric_name: string;
  india_value: string;
  georgia_value: string;
}

interface Program {
  id: number;
  name: string;
  slug: string;
  heading: string;
  image: string | null;
  paragraph: string | null;
  badges: ProgramBadge[];
  key_points: ProgramKeyPoint[];
  comparison_metrics: ProgramComparisonMetric[];
}

export default function ProgramShowcase({ program }: { program: Program }) {
  const getImageUrl = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${url}`;
  };

  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.CheckCircle2;
    return <IconComponent className={className} strokeWidth={1.75} />;
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="bg-brand-background pt-[calc(6rem+var(--banner-height,0px))] sm:pt-[calc(7rem+var(--banner-height,0px))] pb-20">
      
      {/* HERO SECTION */}
      <section className="px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-24">
        <motion.div {...fadeUp} className="block">
          
          {program.image && (
            <div className="w-full lg:w-5/12 lg:float-right lg:ml-10 mb-8 relative rounded-[2rem] overflow-hidden shadow-2xl flex justify-center bg-white/50">
              <img
                src={getImageUrl(program.image)}
                alt={program.heading}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="text-left mb-10 md:mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs sm:text-sm font-bold tracking-widest uppercase mb-6">
              Study {program.name}
            </div>
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-brand-foreground tracking-tight leading-[1.02] mb-6"
              style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
            >
              {program.heading}
            </h1>
            {program.paragraph && (
              <p className="text-lg sm:text-xl text-brand-muted leading-relaxed text-justify">
                {program.paragraph}
              </p>
            )}
          </div>
          
          <div className="clear-both"></div>
        </motion.div>
      </section>

      {/* BADGES SECTION */}
      {program.badges && program.badges.length > 0 && (
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {program.badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="bg-[#FBFAF5] border border-brand-primary/20 p-8 rounded-[2rem] flex flex-col items-start shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(224,165,68,0.15)] transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(badge.icon, "w-7 h-7")}
                  </div>
                  <h3 className="text-xl font-bold text-brand-foreground mb-3">
                    {badge.title}
                  </h3>
                  <p className="text-brand-muted leading-relaxed">
                    {badge.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* COMPARISON AND KEY POINTS */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
        
        {/* Comparison Table */}
        <div className="lg:col-span-7">
          {program.comparison_metrics && program.comparison_metrics.length > 0 && (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-3xl sm:text-4xl font-semibold text-brand-foreground mb-8 tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                Why Georgia(GRUNI) Over India?
              </motion.h2>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="grid grid-cols-3 bg-brand-foreground text-white text-sm sm:text-base font-bold p-4 sm:p-6 uppercase tracking-wider items-center border-b-[3px] border-brand-primary">
                  <div className="col-span-1">Comparison</div>
                  <div className="col-span-1 text-center flex flex-col items-center gap-1 opacity-80">
                    <span>India</span>
                  </div>
                  <div className="col-span-1 text-center flex flex-col items-center gap-1 text-brand-gold">
                    <span>Georgia</span>
                    <span>(GRUNI)</span>
                  </div>
                </div>
                
                <div className="divide-y divide-slate-200">
                  {program.comparison_metrics.map((metric, idx) => (
                    <motion.div 
                      key={metric.id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ scale: 1.01, backgroundColor: "#fafafa" }}
                      className={`grid grid-cols-3 p-4 sm:p-6 items-center transition-colors ${idx % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                    >
                      <div className="col-span-1 font-semibold text-brand-foreground text-sm sm:text-base">
                        {metric.metric_name}
                      </div>
                      <div className="col-span-1 text-center text-brand-muted text-sm sm:text-base font-medium px-2">
                        {metric.india_value}
                      </div>
                      <div className="col-span-1 text-center font-bold text-brand-foreground text-sm sm:text-base px-2">
                        {metric.georgia_value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Key Points */}
        <div className="lg:col-span-5">
          {program.key_points && program.key_points.length > 0 && (
            <motion.div {...fadeUp} className="bg-brand-foreground text-white p-8 sm:p-10 rounded-[2rem] h-full flex flex-col">
              <h3 
                className="text-2xl sm:text-3xl font-semibold mb-8 text-brand-gold"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                Key Highlights
              </h3>
              
              <div className="flex flex-col gap-6">
                {program.key_points.map((point) => (
                  <div key={point.id} className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 text-white/50">
                      {renderIcon(point.icon, "w-5 h-5")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg mb-1">
                        {point.title}
                      </h4>
                      {point.description && (
                        <p className="text-white/70 text-sm leading-relaxed">
                          {point.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center bg-brand-primary hover:bg-brand-primary text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-primary/20"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </div>

      </section>
    </div>
  );
}
