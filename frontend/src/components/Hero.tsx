"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string; image_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => {
          dict[item.identifier] = item.text_value || "";
          if (item.image_value) {
            dict[`${item.identifier}_img`] = item.image_value;
          }
        });
        setContent(dict);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-[calc(7rem+var(--banner-height,0px))] pb-12 lg:pb-0 overflow-hidden bg-[#fafafa] font-sans">
      
      {/* Extremely subtle grid - blueprint aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 z-0 pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-5 sm:px-6 w-full z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 w-full items-center">
          
          {/* Left Column - Typography & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-primary animate-pulse"></div>
                </div>
                <span className="text-brand-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] leading-snug">
                  {content.hero_small_badge_text || "Premium Educational Route"}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-slate-800 leading-[1.1] sm:leading-[1.05] mb-5 sm:mb-6 tracking-tight">
                {content.home_hero_title1 || "CHART YOUR"} <br className="hidden sm:block" />
                <span className="font-bold text-brand-primary">
                  {content.home_hero_title2 || "CAREER."}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-500 mb-8 sm:mb-10 max-w-lg font-light leading-relaxed border-l-2 border-brand-primary/20 pl-4 py-1">
                {content.home_hero_subtitle || "We are India's premier educational consultants. Recent results show Indian Students prefer Georgia. 85% study health related courses such as Medicine, Dentistry, Nursing, and Pharmacy."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new Event("open-consultation"));
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-md bg-brand-primary text-white font-medium flex items-center justify-center transition-all hover:bg-slate-900 shadow-sm"
                >
                  {content.hero_primary_button_text || "Book Consultation"} 
                </button>
                <Link 
                  href={content.hero_secondary_button_link || "#"}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-md bg-transparent text-slate-700 font-medium flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-300"
                >
                  {content.hero_secondary_button_text || "Explore University"} <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-slate-400" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Integrated Infographic Node System */}
          <div className="lg:col-span-7 relative mt-8 sm:mt-12 lg:mt-0 flex justify-center lg:justify-end items-center min-h-[350px] sm:min-h-[500px] lg:min-h-[600px]">
            
            <div className="relative w-full max-w-[400px] sm:max-w-[550px] lg:max-w-[700px] aspect-square flex items-center justify-center">
              
              {/* Infographic Central Image (Geometric & Clean) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative w-[65%] sm:w-[70%] lg:w-[75%] aspect-square z-20 rounded-full border-[6px] sm:border-[8px] border-white shadow-[0_0_30px_rgba(0,0,0,0.05)] overflow-hidden bg-slate-100"
              >
                {content.home_hero_image_img ? (
                  <Image 
                    src={content.home_hero_image_img.startsWith('http') ? content.home_hero_image_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.home_hero_image_img}`}
                    alt="Stylized Isometric Map / Education Illustration" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100/50 p-4">
                    <MapPin className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 text-slate-300" />
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-medium text-center">Insert Isometric/3D<br/>Illustration Here</span>
                  </div>
                )}
              </motion.div>

              {/* Data Node 1: Top Left (Health Courses) */}
              <motion.div 
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-[8%] sm:top-[10%] left-[2%] sm:left-[5%] md:left-[10%] z-30 flex items-start gap-2 sm:gap-4"
              >
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-light text-brand-primary leading-none mb-1">{content.hero_statistic_1_value || "85%"}</div>
                  <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{content.hero_statistic_1_label || "Health Courses"}</div>
                </div>
                {/* Node connector - Scalable SVG */}
                <div className="relative mt-1 sm:mt-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-primary relative z-10 shadow-[0_0_0_3px_rgba(15,23,42,0.05)] sm:shadow-[0_0_0_4px_rgba(15,23,42,0.1)]"></div>
                  <svg viewBox="0 0 100 40" className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-16 sm:w-24 lg:w-32 h-auto -z-10 pointer-events-none origin-top-right rotate-180">
                    <path d="M 0 0 L 40 40 L 100 40" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </motion.div>

              {/* Data Node 2: Bottom Right (FMGE Success) */}
              <motion.div 
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-[10%] sm:bottom-[15%] right-[2%] sm:right-[5%] z-30 flex items-end gap-2 sm:gap-4"
              >
                {/* Node connector - Scalable SVG */}
                <div className="relative mb-1 sm:mb-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-crimson relative z-10 shadow-[0_0_0_3px_rgba(220,38,38,0.05)] sm:shadow-[0_0_0_4px_rgba(220,38,38,0.1)]"></div>
                  <svg viewBox="-120 -50 120 50" className="absolute bottom-1 sm:bottom-1.5 left-1 sm:left-1.5 w-20 sm:w-28 lg:w-40 h-auto -z-10 pointer-events-none">
                    <path d="M 0 0 L -30 -50 L -120 -50" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
                <div className="text-left pb-0.5 sm:pb-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-light text-brand-primary leading-none mb-1">{content.hero_statistic_2_title || "Est. 1992"}</div>
                  <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{content.hero_statistic_2_description || "Highest FMGE Success"}</div>
                </div>
              </motion.div>

              {/* Decorative Abstract Map Rings (Background of infographic) */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-20">
                <div className="w-[75%] lg:w-[70%] aspect-square rounded-full border border-slate-400"></div>
                <div className="absolute w-[95%] lg:w-[90%] aspect-square rounded-full border border-slate-300 border-dashed"></div>
                <div className="absolute w-[115%] lg:w-[110%] aspect-square rounded-full border border-slate-200"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}