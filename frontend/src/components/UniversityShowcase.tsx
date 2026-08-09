"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

interface GeorgiaKeyPoint {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface UniversityImage {
  id: number;
  image: string;
  caption: string;
  category: string;
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
  georgia_key_points: GeorgiaKeyPoint[];
  georgia_heading: string;
  georgia_photo?: string;
  georgia_paragraph: string;
  founder_name: string;
  founder_pic?: string;
  founder_paragraph: string;
  hospital_heading: string;
  hospital_paragraph: string;
  campus_heading: string;
  campus_paragraph: string;
  hostel_heading: string;
  hostel_paragraph: string;
}

const getImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${url.startsWith('/') ? '' : '/'}${url}`;
};

const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Globe;
  return <IconComponent className={className} />;
};

// Removed text-justify for better readability on smaller screens
const renderParagraphs = (text?: string, className: string = "text-slate-600 text-[1.05rem] md:text-lg leading-relaxed") => {
  if (!text) return null;
  return text.split(/\r?\n\s*\r?\n/).map((p, idx) => (
    <p key={idx} className={`${className} mb-5`}>
      {p.trim()}
    </p>
  ));
};

// Fixed Premium Asymmetrical Gallery for full responsiveness
const AsymmetricGallery = ({ images, reverse = false }: { images: UniversityImage[], reverse?: boolean }) => {
  const displayImages = images.slice(0, 3);
  if (displayImages.length === 0) return null;

  const ImageCard = ({ img, delay, className = "" }: { img?: UniversityImage, delay: number, className?: string }) => {
    if (!img) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={`relative w-full rounded-[2rem] overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-500 ${className}`}
      >
        <Image
          src={getImageUrl(img.image)}
          alt={img.caption || "University photo"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {/* Improved gradient for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        {img.caption && (
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white font-semibold text-lg md:text-xl drop-shadow-md">{img.caption}</p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-12 lg:h-[650px]">
      {reverse ? (
        <>
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <ImageCard img={displayImages[1]} delay={0.1} className="h-[250px] lg:h-full lg:flex-1" />
            {displayImages[2] && (
              <ImageCard img={displayImages[2]} delay={0.2} className="h-[250px] lg:h-full lg:flex-1" />
            )}
          </div>
          <div className="lg:col-span-8">
            <ImageCard img={displayImages[0]} delay={0} className="h-[350px] md:h-[450px] lg:h-full" />
          </div>
        </>
      ) : (
        <>
          <div className="lg:col-span-8">
            <ImageCard img={displayImages[0]} delay={0} className="h-[350px] md:h-[450px] lg:h-full" />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <ImageCard img={displayImages[1]} delay={0.1} className="h-[250px] lg:h-full lg:flex-1" />
            {displayImages[2] && (
              <ImageCard img={displayImages[2]} delay={0.2} className="h-[250px] lg:h-full lg:flex-1" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default function UniversityShowcase({ initialUniversity = null }: { initialUniversity?: University | null }) {
  const [university, setUniversity] = useState<University | null>(initialUniversity);
  const [loading, setLoading] = useState(!initialUniversity);

  useEffect(() => {
    if (initialUniversity) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/universities/`)
      .then((res) => res.json())
      .then((data: University[]) => {
        const targetUni = data.find(u => u.name.includes("Grigol Robakidze")) || data.find(u => u.is_active) || data[0];
        if (targetUni) {
          setUniversity(targetUni);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch university data:", error);
        setLoading(false);
      });
  }, [initialUniversity]);

  if (loading || !university) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium tracking-wide">Loading University Details...</p>
        </div>
      </div>
    );
  }

  const imagesByCategory = (category: string) => {
    return university.gallery_images?.filter(img => img.category === category && img.image) || [];
  };

  const allImages = university.gallery_images?.filter(img => img.image) || [];

  return (
    <div className="w-full bg-[#faf9f6] font-sans pt-[calc(6rem+var(--banner-height,0px))] selection:bg-slate-800 selection:text-white">
      
      {/* --- GEORGIA & TBILISI SECTION --- */}
      {university.georgia_heading && (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-5 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
          >
            {/* Left: Georgia Photo */}
            <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shrink-0">
              {university.georgia_photo ? (
                 <Image
                    src={getImageUrl(university.georgia_photo)}
                    alt="Georgia & Tbilisi"
                    fill
                    className="object-cover"
                    unoptimized
                  />
              ) : (
                 <div className="w-full h-full bg-slate-200 animate-pulse" />
              )}
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-md p-5 md:p-6 rounded-3xl shadow-xl max-w-[16rem]">
                <LucideIcons.MapPin className="w-7 h-7 md:w-8 md:h-8 text-rose-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base md:text-lg">Heart of the Caucasus</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">A perfect blend of ancient history and modern infrastructure.</p>
              </div>
            </div>

            {/* Right: Text & Key Points */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 font-bold text-xs md:text-sm tracking-widest uppercase mb-6 md:mb-8">
                <LucideIcons.Compass className="w-4 h-4" /> Destination
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-6 md:mb-8 leading-[1.1]">
                {university.georgia_heading}
              </h2>
              <div className="mb-10 max-w-xl">
                {renderParagraphs(university.georgia_paragraph)}
              </div>
              
              {/* Key Points Grid */}
              {university.georgia_key_points && university.georgia_key_points.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {university.georgia_key_points.map((point, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="group bg-white/80 hover:bg-white backdrop-blur-sm p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="mb-3 text-slate-800 group-hover:scale-110 group-hover:text-rose-600 transition-all duration-300 transform origin-left">
                        {renderIcon(point.icon, "w-6 h-6 md:w-7 md:h-7")}
                      </div>
                      <h4 className="font-bold text-slate-900 text-base md:text-lg mb-1.5">{point.title}</h4>
                      {point.description && <p className="text-slate-500 text-sm leading-relaxed">{point.description}</p>}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* --- MAIN UNIVERSITY SECTION --- */}
      <section className="py-16 md:py-24 bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 lg:gap-12 mb-10 md:mb-16"
          >
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs md:text-sm tracking-widest uppercase mb-6 md:mb-8">
                <LucideIcons.GraduationCap className="w-4 h-4" /> University Overview
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0f172a] tracking-tight leading-[1.05] mb-6 md:mb-8">
                {university.name}
              </h1>
              <div className="text-lg md:text-2xl text-slate-500 font-light max-w-3xl leading-relaxed">
                {renderParagraphs(university.description, "")}
              </div>
            </div>
            
            {/* Desktop Founder Card */}
            {(university.founder_name || university.founder_paragraph) && (
              <div className="hidden xl:flex shrink-0 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 max-w-[340px] items-start gap-5 shadow-sm">
                {university.founder_pic && (
                  <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full overflow-hidden shadow-inner border-2 border-white">
                    <Image src={getImageUrl(university.founder_pic)} alt="Founder" fill className="object-cover" unoptimized />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{university.founder_name}</h4>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-4 italic leading-relaxed">"{university.founder_paragraph}"</p>
                </div>
              </div>
            )}
          </motion.div>

          <AsymmetricGallery images={imagesByCategory('MAIN')} reverse={false} />
          
          {/* Mobile/Tablet Founder Card */}
          {(university.founder_name || university.founder_paragraph) && (
            <div className="mt-8 xl:hidden bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-6 text-center sm:text-left">
              {university.founder_pic && (
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden shadow-md border-2 border-white">
                  <Image src={getImageUrl(university.founder_pic)} alt="Founder" fill className="object-cover" unoptimized />
                </div>
              )}
              <div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2">{university.founder_name}</h4>
                <p className="text-sm md:text-base text-slate-600 italic leading-relaxed">"{university.founder_paragraph}"</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- HOSPITAL SECTION --- */}
      {university.hospital_heading && (
        <section className="py-16 md:py-24 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-10 md:mb-12"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-indigo-100 text-indigo-600 mb-6 md:mb-8 shadow-sm">
                <LucideIcons.HeartPulse className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-6 md:mb-8 leading-[1.1]">
                {university.hospital_heading}
              </h2>
              <div className="max-w-2xl">
                {renderParagraphs(university.hospital_paragraph)}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory('HOSPITAL')} reverse={true} />
          </div>
        </section>
      )}

      {/* --- CAMPUS LIFE SECTION --- */}
      {university.campus_heading && (
        <section className="py-16 md:py-28 bg-slate-900 text-white rounded-[2.5rem] md:rounded-[4rem] mx-3 md:mx-6 my-8 md:my-12 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-full h-[300px] md:h-[500px] bg-blue-600/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-blue-500/20 text-blue-400 mb-6 md:mb-8 border border-blue-500/30">
                <LucideIcons.Library className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-[1.1]">
                {university.campus_heading}
              </h2>
              <div className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mx-auto">
                {renderParagraphs(university.campus_paragraph, "text-slate-300")}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory('CAMPUS')} reverse={false} />
          </div>
        </section>
      )}

      {/* --- HOSTEL SECTION --- */}
      {university.hostel_heading && (
        <section className="py-16 md:py-24 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-10 md:mb-12"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-amber-100 text-amber-600 mb-6 md:mb-8 shadow-sm">
                <LucideIcons.Home className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-6 md:mb-8 leading-[1.1]">
                {university.hostel_heading}
              </h2>
              <div className="max-w-2xl">
                {renderParagraphs(university.hostel_paragraph)}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory('HOSTEL')} reverse={true} />
          </div>
        </section>
      )}

      {/* --- COMMON GALLERY --- */}
      {allImages.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f172a] mb-4">Complete Gallery</h2>
              <p className="text-base md:text-lg text-slate-500">Explore all aspects of university life in Georgia.</p>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {allImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.1 }}
                  className="relative group break-inside-avoid rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={getImageUrl(img.image)}
                    alt={img.caption || `Gallery photo ${idx}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm md:text-base font-medium drop-shadow-md">{img.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}