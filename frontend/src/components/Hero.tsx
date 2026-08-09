"use client";

import { motion } from "framer-motion";
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center pt-[calc(7rem+var(--banner-height,0px))] pb-12 lg:pb-0 overflow-hidden bg-[#faf9f6] font-sans">
      
      {/* Background Breathing / Rotating Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none z-0" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#f5dfb8]/40 rounded-full blur-[100px] pointer-events-none z-0" 
      />

      <div className="max-w-[90rem] mx-auto px-5 sm:px-6 w-full z-10 flex items-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 w-full items-center">
          
          {/* Image Column (Order 1 on Mobile, Order 2 on LG) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative mt-8 sm:mt-12 lg:mt-0 flex justify-center items-center min-h-[350px] sm:min-h-[450px]">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative w-[100vw] ml-[calc(50%-50vw)] sm:ml-0 sm:w-[80%] lg:w-[100%] max-w-[100vw] sm:max-w-[550px] aspect-square sm:aspect-[4/5] z-20 rounded-none sm:rounded-t-[10rem] sm:rounded-b-[2rem] shadow-none sm:shadow-2xl overflow-hidden bg-white/50 border-0 sm:border-4 border-white backdrop-blur-sm transition-transform duration-500"
            >
              {content.home_hero_image_img ? (
                <Image 
                  src={content.home_hero_image_img.startsWith('http') ? content.home_hero_image_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.home_hero_image_img}`}
                  alt="Hero Image" 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-200/50 p-4">
                  <MapPin className="w-12 h-12 mb-3 text-brand-primary" />
                  <span className="text-xs uppercase tracking-widest font-medium text-center">Hero Image<br/>Coming Soon</span>
                </div>
              )}
            </motion.div>

            {/* Glassmorphic Floating Info Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-[10%] left-[5%] sm:left-[0%] z-30"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl">
                  {content.hero_statistic_1_value || "85%"}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{content.hero_statistic_1_label || "Health Courses"}</div>
                  <div className="text-sm font-medium text-slate-800">Top Choice</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Glassmorphic Floating Info Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-[15%] right-[5%] sm:right-[-10%] z-30"
            >
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 flex items-center gap-4"
              >
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-800">{content.hero_statistic_2_title || "Est. 1992"}</div>
                  <div className="text-xs font-bold text-brand-primary uppercase tracking-wider">{content.hero_statistic_2_description || "Highest FMGE Success"}</div>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Text Column (Order 2 on Mobile, Order 1 on LG) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center relative mt-4 lg:mt-0 z-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-8 bg-brand-primary" />
                <span className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                  {content.hero_small_badge_text || "Premium Educational Route"}
                </span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-6 tracking-tight drop-shadow-sm">
                {content.home_hero_title1 || "CHART YOUR"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#b8860b]">
                  {content.home_hero_title2 || "CAREER."}
                </span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 mb-10 max-w-lg font-medium leading-relaxed">
                {content.home_hero_subtitle || "We are India's premier educational consultants. Recent results show Indian Students prefer Georgia. 85% study health related courses such as Medicine, Dentistry, Nursing, and Pharmacy."}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    window.dispatchEvent(new Event("open-consultation"));
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-primary text-white font-bold text-sm sm:text-base flex items-center justify-center transition-shadow shadow-lg hover:shadow-brand-primary/40 hover:shadow-xl"
                >
                  {content.hero_primary_button_text || "Book Consultation"} 
                </motion.button>
                <Link href={content.hero_secondary_button_link || "#"} passHref legacyBehavior>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-800 font-bold text-sm sm:text-base flex items-center justify-center hover:bg-slate-50 transition-shadow border border-slate-200 shadow-sm hover:shadow-md"
                  >
                    {content.hero_secondary_button_text || "Explore University"} <ArrowUpRight className="w-5 h-5 ml-2 text-brand-primary" />
                  </motion.a>
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}