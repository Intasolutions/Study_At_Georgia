"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Stethoscope, ChevronRightSquare } from "lucide-react";
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
        // Find Grigol Robakidze or just pick the first active one
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
    return null; // Silent fail/loading for seamless UX
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

  return (
    <section id="university-showcase" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -right-64 top-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-semibold mb-6">
            <GraduationCap className="w-4 h-4" />
            <span>Exclusive Partner University</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-foreground mb-4">
            {university.name}
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto text-lg">
            Located in the heart of {university.location}. Recognized for academic rigor, global relevance, and industry integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Details & Courses */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Split description safely by assuming Markdown-like format from API */}
            <div className="prose prose-slate prose-lg text-brand-muted">
              {university.description.split('\n\n').map((paragraph, idx) => {
                // If paragraph is a course header (starts with **)
                if (paragraph.startsWith('**')) {
                  const titleMatch = paragraph.match(/\*\*(.*?)\*\*/);
                  const title = titleMatch ? titleMatch[1] : '';
                  const content = paragraph.replace(/\*\*.*?\*\*/, '').trim();
                  
                  return (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-brand-primary/10 mt-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                          {title.includes('Nursing') ? <Stethoscope className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-bold text-brand-foreground m-0">{title}</h3>
                      </div>
                      <p className="m-0 text-brand-muted/90 text-base">{content}</p>
                    </div>
                  );
                }
                
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            <button 
              onClick={() => window.dispatchEvent(new Event("open-consultation"))}
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
            >
              Apply for this University
              <ChevronRightSquare className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Right Column: Image Gallery Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="sticky top-24 relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group"
          >
            {images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={images[currentImageIndex].image}
                      alt={images[currentImageIndex].caption || `University Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                    
                    {/* Caption Overlay */}
                    {images[currentImageIndex].caption && (
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <p className="text-white font-medium text-lg drop-shadow-md">
                          {images[currentImageIndex].caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? "w-6 bg-brand-accent" : "bg-white/60 hover:bg-white"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-primary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <p className="text-brand-muted font-medium">Campus gallery images pending upload.</p>
                <p className="text-sm text-brand-muted/70 mt-1">Add images in the Django Admin Panel.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
