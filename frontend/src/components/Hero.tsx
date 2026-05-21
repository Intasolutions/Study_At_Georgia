"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, Globe, Award, ShieldCheck } from "lucide-react";
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
    <section className="relative min-h-[90vh] flex items-center pt-[calc(8rem+var(--banner-height,0px))] pb-20 overflow-hidden bg-brand-background font-sans">
      {/* Subtle background grid pattern for modern tech-enabled feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>

      {/* Decorative Brand Blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-crimson/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content - Typography Led */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-primary text-xs font-bold uppercase tracking-wider">{content.hero_small_badge_text || "Premium Educational Advisory"}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-foreground leading-[1.1] mb-6 tracking-tight">
                {content.home_hero_title1 || "Architect Your"} <br />
                <span className="text-brand-primary">
                  {content.home_hero_title2 || "Global Future"}
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 max-w-xl font-light leading-relaxed">
                {content.home_hero_subtitle || "Exclusive guidance for elite university admissions, streamlined visa processing, and premium international placements."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new Event("open-consultation"));
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-primary/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-brand-primary/30"
                >
                  {content.hero_primary_button_text || "Book Consultation"} <ArrowUpRight className="w-5 h-5" />
                </button>
                <Link 
                  href={content.hero_secondary_button_link || "https://share.google/ywHxfnHjIL8mmewcT"}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-brand-primary font-semibold flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                >
                  {content.hero_secondary_button_text || "Explore Destinations"}
                </Link>
              </div>

              {/* Trusted By / Mini Logos */}
              <div className="pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{content.hero_trusted_partners_text || "Partnering with excellence globally"}</p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Replace these with actual university logo silhouettes if available */}
                  {(content.hero_university_names || "Cambridge,Oxford,Tbilisi State").split(",").map((name, i) => (
                    <div key={i} className="text-base sm:text-lg font-bold font-serif text-slate-800">{name.trim()}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Trending Bento Box Layout */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square mx-auto max-w-[500px] lg:max-w-none"
            >
              {/* Main Image Bento Card */}
              <div className="absolute inset-2 sm:inset-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 transform hover:scale-[1.02] transition-transform duration-500">
                {content.home_hero_image_img ? (
                  <Image 
                    src={content.home_hero_image_img.startsWith('http') ? content.home_hero_image_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.home_hero_image_img}`}
                    alt="Students on Campus" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent z-10" />
                    <GraduationCap className="w-16 sm:w-24 h-16 sm:h-24 text-slate-300" />
                    <p className="absolute bottom-6 left-6 text-slate-500 font-medium z-20 text-sm sm:text-base">{content.hero_bento_image_alt_text || "Premium Campus Photography"}</p>
                  </div>
                )}
              </div>

              {/* Floating Bento Card 1 - Visa Success */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute left-0 sm:-left-4 top-4 sm:top-12 bg-white p-3 sm:p-5 rounded-2xl shadow-xl shadow-brand-primary/5 border border-slate-100 z-20 flex items-center gap-3 sm:gap-4 scale-90 sm:scale-100 origin-top-left"
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-brand-crimson/10 flex items-center justify-center text-brand-crimson">
                  <Award className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-brand-foreground">{content.hero_statistic_1_value || "99%"}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-wide">{content.hero_statistic_1_label || "Visa Success"}</div>
                </div>
              </motion.div>

              {/* Floating Bento Card 2 - Global Reach */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute right-0 sm:-right-4 bottom-8 sm:bottom-24 bg-brand-primary p-4 sm:p-5 rounded-2xl shadow-xl shadow-brand-primary/40 border border-brand-primary z-20 scale-90 sm:scale-100 origin-bottom-right"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-5 h-5 text-brand-gold" />
                  <span className="text-white text-sm font-bold uppercase tracking-wider">{content.hero_statistic_2_title || "Est. 1992"}</span>
                </div>
                <div className="text-white/80 text-sm max-w-[140px] leading-snug">
                  {content.hero_statistic_2_description || "Decades of Scientia et Veritas."}
                </div>
              </motion.div>

              {/* Decorative Gold Accent Behind */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-brand-gold/20 to-transparent rounded-3xl -z-0 transform rotate-6 scale-105" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}