"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Stethoscope, Briefcase, ChevronRightSquare, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";

interface UniversityImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

interface University {
  id: number;
  name: string;
  location: string;
  university_type: string;
  description: string;
  color_theme: string;
  is_active: boolean;
  gallery_images: UniversityImage[];
}

export default function UniversityShowcase() {
  const [university, setUniversity] = useState<University | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/universities/`)
      .then((res) => res.json())
      .then((data: University[]) => {
        const targetUni = data.find(u => u.name.includes("Grigol Robakidze")) || data.find(u => u.is_active);
        if (targetUni) {
          setUniversity(targetUni);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch university data:", error);
        setLoading(false);
      });
  }, []);

  if (loading || !university) {
    return <div className="min-h-screen bg-white" />; // Placeholder while loading
  }

  const images = university.gallery_images?.filter(img => img.image) || [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Helper to choose the right icon based on course title
  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes('nursing')) return <Stethoscope className="w-6 h-6" />;
    if (title.toLowerCase().includes('bba') || title.toLowerCase().includes('mba') || title.toLowerCase().includes('business')) return <Briefcase className="w-6 h-6" />;
    return <GraduationCap className="w-6 h-6" />;
  };

  // Parse description into intro text and course cards, handling Windows \r\n
  const paragraphs = university.description.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
  const introParagraphs = paragraphs.filter(p => !p.startsWith('**') || p.includes('**GRIGOL ROBAKIDZE'));
  const courseParagraphs = paragraphs.filter(p => p.startsWith('**') && !p.includes('**GRIGOL ROBAKIDZE'));

  return (
    <div className="w-full bg-[#fafafa]">
      
      {/* 1. LIGHT MODE HERO SECTION WITH IMAGE */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-24 bg-white overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a237e]/10 border border-[#1a237e]/20 text-[#1a237e] text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Premium Partner University</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                <span>{university.location}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight mb-6 leading-tight">
              {university.name}
            </h1>
            
            <div className="text-slate-600 text-lg md:text-xl max-w-2xl space-y-4">
              {introParagraphs.map((p, idx) => (
                <p key={idx}>{p.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100"
          >
            {university.image ? (
              <Image 
                src={getImageUrl(university.image)}
                alt={university.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <GraduationCap className="w-16 h-16 mb-4 opacity-50" />
                <p>Upload the main University Image in Django Admin</p>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* 2. BENTO GRID COURSES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-20 -mt-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#0f172a]">Academic Excellence</h2>
          <p className="text-slate-500 mt-2">World-class programs designed for global success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courseParagraphs.map((paragraph, idx) => {
            const titleMatch = paragraph.match(/\*\*(.*?)\*\*/);
            const title = titleMatch ? titleMatch[1] : '';
            const content = paragraph.replace(/\*\*.*?\*\*/, '').trim();
            
            // Extract highlights if they exist (lines starting with 'Highlights:' or 'Program Highlights:')
            const contentParts = content.split(/(Highlights:|Program Highlights:|Program Structure:)/);
            const mainDescription = contentParts[0];
            const highlights = contentParts.length > 1 ? contentParts.slice(1).join('') : '';

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1a237e]/5 to-transparent rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a237e]/5 text-[#1a237e] flex items-center justify-center group-hover:bg-[#1a237e] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#1a237e]/10">
                    {getCourseIcon(title)}
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">{title}</h3>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{mainDescription}</p>
                
                {highlights && (
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <p className="text-sm font-semibold text-[#1a237e] uppercase tracking-wider mb-3">Key Highlights</p>
                    <p className="text-slate-500 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">
                      {highlights.replace(/:\s*/, '')}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CINEMATIC IMAGE GALLERY */}
      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a]">Campus Life</h2>
            <p className="text-slate-500 mt-2">Experience Grigol Robakidze University.</p>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              <button onClick={prevImage} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1a237e] hover:text-white hover:border-[#1a237e] transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1a237e] hover:text-white hover:border-[#1a237e] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="max-w-[95%] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0f172a]"
          >
            {images.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={getImageUrl(images[currentImageIndex].image)}
                    alt={images[currentImageIndex].caption || `Campus Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  {/* Subtle Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent pointer-events-none" />
                  
                  {images[currentImageIndex].caption && (
                    <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
                      <p className="text-white font-medium text-xl md:text-3xl max-w-3xl drop-shadow-lg">
                        {images[currentImageIndex].caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <GraduationCap className="w-16 h-16 text-white/20 mb-4" />
                <p className="text-white/60 text-lg">Campus gallery images pending upload in Django Admin.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 4. STICKY FLOATING ACTION BUTTON */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
      >
        <button 
          onClick={() => window.dispatchEvent(new Event("open-consultation"))}
          className="flex items-center gap-3 px-8 py-4 bg-[#1a237e] text-white rounded-full font-bold shadow-[0_10px_40px_rgba(26,35,126,0.5)] hover:bg-[#111859] hover:scale-105 transition-all border border-white/10"
        >
          Secure Your Admission
          <ChevronRightSquare className="w-5 h-5 text-[#cfb53b]" />
        </button>
      </motion.div>
    </div>
  );
}
