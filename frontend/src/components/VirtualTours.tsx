"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { PlayCircle, ExternalLink } from "lucide-react";

interface Tour {
  id: number;
  title_en: string;
  title_ge: string;
  url: string;
  image: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function VirtualTours({ 
  initialContent, 
  initialTours 
}: { 
  initialContent?: Record<string, string>;
  initialTours?: Tour[];
}) {
  const [tours, setTours] = useState<Tour[]>(initialTours || []);

  useEffect(() => {
    if (initialTours) {
      setTours(initialTours);
    }
  }, [initialTours]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background embellishments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[color:var(--accent-light)]/20 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-blue-100 blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--accent-light)]/30 text-[color:var(--accent-deep)] text-sm font-medium mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[color:var(--accent)]" />
            Immersive Experience
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[color:var(--ink)] mb-6"
          >
            {initialContent?.virtual_tours_heading || "Explore Campus in 360°"}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[color:var(--ink-soft)] text-lg max-w-2xl mx-auto"
          >
            {initialContent?.virtual_tours_subheading || "Take a virtual walk through our state-of-the-art facilities, from modern simulation centers to university campuses, right from your device."}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Array.isArray(tours) ? tours.map((tour, index) => (
            <motion.a
              href={tour.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              key={tour.id}
              variants={itemVariants}
              className={`group block relative rounded-3xl overflow-hidden shadow-sm border border-[color:var(--line)] bg-white hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[color:var(--accent-light)] ${
                index === 0 || index === 3 ? "md:col-span-2 lg:col-span-2" : ""
              } ${index === 4 ? "lg:col-span-3 md:col-span-2" : ""}`}
              style={{ minHeight: "300px" }}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={tour.image || '/vr_tour_gruni_1787204089333.jpg'}
                  alt={tour.title_en || 'Virtual Tour'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-1 group-hover:text-blue-100 transition-colors">
                      {tour.title_en}
                    </h3>
                    <p className="text-white/80 font-medium font-georgian tracking-wider text-sm">
                      {tour.title_ge}
                    </p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:bg-white group-hover:text-[color:var(--accent-deep)] transition-all duration-300">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Play button overlay that appears on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="flex flex-col items-center text-white gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <PlayCircle className="w-16 h-16 drop-shadow-lg text-white/90" strokeWidth={1.5} />
                  <span className="font-semibold tracking-wide text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                    Start Virtual Tour
                  </span>
                </div>
              </div>
            </motion.a>
          )) : null}
        </motion.div>
      </div>
    </section>
  );
}
