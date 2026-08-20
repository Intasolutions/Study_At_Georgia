"use client";

import { motion, MotionConfig } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero({ initialContent = {} }: { initialContent?: Record<string, string> }) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);

  useEffect(() => {
    if (Object.keys(initialContent).length > 0) return;

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
  }, [initialContent]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative min-h-[75vh] flex flex-col justify-center pt-[calc(6rem+var(--banner-height,0px))] sm:pt-[calc(7rem+var(--banner-height,0px))] pb-14 sm:pb-16 lg:pb-0 overflow-hidden font-sans [--ink:#182952] [--ink-soft:#4A5578] [--paper:#F4F2EA] [--accent:#C9A227] [--accent-deep:#96741C] [--crimson:#8E1F2E] [--line:#DAD9CE] bg-[color:var(--paper)]"
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
        <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
      `}</style>

        {/* Background breathing orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] max-w-[600px] max-h-[600px] bg-[color:var(--accent)]/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] sm:w-[40vw] sm:h-[40vw] max-w-[500px] max-h-[500px] bg-[color:var(--ink)]/10 rounded-full blur-[70px] sm:blur-[100px] pointer-events-none z-0"
        />

        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8 w-full z-10 flex items-center h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 w-full items-center">

            {/* Image Column (Order 1 on Mobile, Order 2 on LG) */}
            <div className="order-1 lg:order-2 lg:col-span-6 relative mt-8 sm:mt-12 lg:mt-0">
              <div className="relative w-full sm:max-w-[480px] sm:mx-auto lg:max-w-none lg:mx-0">

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                  whileHover={{ scale: 1.015 }}
                  className="relative w-[100vw] -ml-5 sm:ml-0 sm:w-full z-20 rounded-none sm:rounded-t-[5rem] sm:rounded-b-[1.75rem] shadow-none sm:shadow-[0_30px_60px_-15px_rgba(22,35,43,0.3)] overflow-hidden bg-white border-0 sm:border-[6px] border-white transition-transform duration-500 flex"
                >
                  {content.home_hero_image_img ? (
                    <img
                      src={content.home_hero_image_img.startsWith('http') ? content.home_hero_image_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.home_hero_image_img}`}
                      alt="Hero Image"
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] flex flex-col items-center justify-center text-[color:var(--ink-soft)] bg-[color:var(--line)]/40 p-4">
                      <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-[color:var(--accent-deep)]" strokeWidth={1.5} />
                      <span className="text-xs uppercase tracking-widest font-medium text-center">Hero Image<br />Coming Soon</span>
                    </div>
                  )}
                </motion.div>

                {/* Ticket-stub perforation, tying to the boarding-pass motif used elsewhere on the site */}
                <div className="hidden sm:flex justify-center gap-2.5 -mt-1 relative z-10">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[color:var(--paper)] ring-1 ring-[color:var(--line)]" />
                  ))}
                </div>

                {/* Floating Info Card 1 (sm and up) */}
                <motion.div
                  initial={{ opacity: 0, x: -16, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="hidden sm:block absolute top-6 -left-4 md:-left-8 z-30"
                >
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/85 backdrop-blur-md pl-4 pr-5 py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 flex items-center gap-3.5 max-w-[220px]"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-full bg-[color:var(--accent)]/15 flex items-center justify-center text-[color:var(--accent-deep)] font-mono font-bold text-base">
                      {content.hero_statistic_1_value || "85%"}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[color:var(--ink-soft)] uppercase tracking-wider">{content.hero_statistic_1_label || "Health Courses"}</div>
                      <div className="text-sm font-semibold text-[color:var(--ink)]">Top Choice</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Info Card 2 (sm and up) */}
                <motion.div
                  initial={{ opacity: 0, x: 16, y: -16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.65 }}
                  className="hidden sm:block absolute bottom-10 -right-4 md:-right-8 z-30"
                >
                  <motion.div
                    animate={{ y: [8, -8, 8] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="bg-white/85 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60"
                  >
                    <div className="text-right">
                      <div className="text-base font-semibold text-[color:var(--ink)] font-mono">{content.hero_statistic_2_title || "Est. 1992"}</div>
                      <div className="text-[11px] font-bold text-[color:var(--crimson)] uppercase tracking-wider">{content.hero_statistic_2_description || "Highest FMGE Success"}</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Mobile-only info cards, stacked below the image */}
              <div className="flex sm:hidden flex-col w-full gap-3 mt-6 z-30">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-[color:var(--line)] flex items-center gap-4 w-full"
                >
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[color:var(--accent)]/15 flex items-center justify-center text-[color:var(--accent-deep)] font-mono font-bold text-xl">
                    {content.hero_statistic_1_value || "85%"}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[color:var(--ink-soft)] uppercase tracking-wider">{content.hero_statistic_1_label || "Health Courses"}</div>
                    <div className="text-sm font-semibold text-[color:var(--ink)]">Top Choice</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-[color:var(--line)] flex items-center justify-between gap-4 w-full"
                >
                  <div className="w-full flex flex-col items-end text-right">
                    <div className="text-lg font-semibold text-[color:var(--ink)] font-mono">{content.hero_statistic_2_title || "Est. 1992"}</div>
                    <div className="text-xs font-bold text-[color:var(--crimson)] uppercase tracking-wider">{content.hero_statistic_2_description || "Highest FMGE Success"}</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Text Column (Order 2 on Mobile, Order 1 on LG) */}
            <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center relative mt-4 lg:mt-0 z-20">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="h-[2px] w-8 bg-[color:var(--accent)]" />
                  <span className="text-[color:var(--accent-deep)] text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                    {content.hero_small_badge_text || "Premium Educational Route"}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold text-[color:var(--ink)] mb-6 tracking-tight"
                  style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
                >
                  {content.home_hero_title1 || "CHART YOUR"} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--accent-deep)] to-[color:var(--accent)]">
                    {content.home_hero_title2 || "CAREER."}
                  </span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-base sm:text-lg text-[color:var(--ink-soft)] mb-9 sm:mb-10 max-w-lg leading-relaxed">
                  {content.home_hero_subtitle || "We are India's premier educational consultants. Recent results show Indian Students prefer Georgia. 85% study health related courses such as Medicine, Dentistry, Nursing, and Pharmacy."}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 p-5 pb-5">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      window.dispatchEvent(new Event("open-consultation"));
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[color:var(--ink)] text-white font-semibold text-sm sm:text-base flex items-center justify-center transition-shadow shadow-lg hover:shadow-xl"
                  >
                    {content.hero_primary_button_text || "Book Consultation"}
                  </motion.button>

                  <Link
                    href={content.hero_secondary_button_link || "#"}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[color:var(--ink)] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border border-[color:var(--line)] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {content.hero_secondary_button_text || "Explore University"} <ArrowUpRight className="w-5 h-5 text-[color:var(--accent-deep)]" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
