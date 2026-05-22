"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, Briefcase, ChevronRightSquare, ShieldCheck, MapPin, Building, Globe } from "lucide-react";
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
  image?: string;
  is_active: boolean;
  gallery_images: UniversityImage[];
}

export default function UniversityShowcase() {
  const [university, setUniversity] = useState<University | null>(null);
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

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes('nursing') || title.toLowerCase().includes('medical') || title.toLowerCase().includes('mbbs')) return <Stethoscope className="w-8 h-8" />;
    if (title.toLowerCase().includes('bba') || title.toLowerCase().includes('mba') || title.toLowerCase().includes('business')) return <Briefcase className="w-8 h-8" />;
    return <GraduationCap className="w-8 h-8" />;
  };

  const paragraphs = university.description.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
  const introParagraphs = paragraphs.filter(p => !p.startsWith('**') || p.includes('**GRIGOL ROBAKIDZE'));
  const courseParagraphs = paragraphs.filter(p => p.startsWith('**') && !p.includes('**GRIGOL ROBAKIDZE'));

  return (
    <div className="w-full bg-[#fafafa]">
      
      {/* 1. LIGHT MODE HERO SECTION WITH IMAGE (Restored) */}
      <section className="relative w-full pt-[calc(8rem+var(--banner-height,0px))] pb-20 lg:pt-[calc(10rem+var(--banner-height,0px))] lg:pb-24 bg-white overflow-hidden border-b border-slate-200">
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

      {/* 2. STRUCTURED ACADEMIC PROGRAMS */}
      <section className="py-20 max-w-7xl mx-auto px-6 relative z-20">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-slate-900">Academic Programs</h2>
          <p className="text-slate-500 mt-2 text-lg">Comprehensive degrees aligned with global standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseParagraphs.map((paragraph, idx) => {
            const titleMatch = paragraph.match(/\*\*(.*?)\*\*/);
            const title = titleMatch ? titleMatch[1] : '';
            const content = paragraph.replace(/\*\*.*?\*\*/, '').trim();
            
            const contentParts = content.split(/(Highlights:|Program Highlights:|Program Structure:)/);
            const mainDescription = contentParts[0];
            const highlights = contentParts.length > 1 ? contentParts.slice(1).join('') : '';

            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:border-[#1a237e]/30 hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="text-[#1a237e] bg-[#1a237e]/5 p-3 rounded-lg">
                    {getCourseIcon(title)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{mainDescription}</p>
                
                {highlights && (
                  <div className="mt-auto bg-slate-50 p-5 rounded-lg">
                    <p className="text-sm font-bold text-[#1a237e] uppercase tracking-wide mb-2">Key Highlights</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {highlights.replace(/:\s*/, '')}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STANDARD PROFESSIONAL GALLERY GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Campus Gallery</h2>
            <p className="text-slate-500 mt-2 text-lg">Explore our facilities and student life.</p>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-slate-200">
                  <Image
                    src={getImageUrl(img.image)}
                    alt={img.caption || `Campus Image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Subtle overlay for caption: Always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 sm:p-6">
                    <p className="text-white font-medium text-base sm:text-lg lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                      {img.caption || "Campus View"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <Building className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-900 font-bold text-xl mb-2">No Gallery Images</p>
              <p className="text-slate-500 max-w-md">Please upload images in the Django Admin panel to display them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. PROFESSIONAL CALL TO ACTION */}
      <section className="py-20 bg-[#1a237e] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Academic Journey</h2>
          <p className="text-white/80 text-lg mb-10">
            Secure your admission at {university.name} today. Our expert consultants are ready to assist you.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new Event("open-consultation"))}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#cfb53b] text-[#1a237e] rounded-xl font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
          >
            Request Consultation
            <ChevronRightSquare className="w-5 h-5" />
          </button>
        </div>
      </section>
      
    </div>
  );
}
