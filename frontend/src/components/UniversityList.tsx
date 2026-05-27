"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type University = {
  id: number;
  name: string;
  location: string;
  university_type: string;
  color_theme: string;
  description: string;
  image: string | null;
};

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function UniversityList() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/universities/`)
      .then(res => res.json())
      .then(data => {
        setUniversities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch universities:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-brand-muted">Loading University...</div>;
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {universities.map((uni, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          className="bg-brand-surface border border-slate-200 rounded-2xl overflow-hidden group hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/10 transition-all"
        >
          <div className="h-48 bg-slate-100 relative overflow-hidden">
            {uni.image ? (
              <Image src={uni.image.startsWith('http') ? uni.image : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${uni.image}`} alt={uni.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-gradient-to-br from-slate-100 to-slate-200 group-hover:scale-105 transition-transform duration-500">
                Campus Image
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs font-bold ${uni.color_theme}`}>
                {uni.university_type}
              </span>
              <span className="text-slate-500 text-xs">{uni.location}</span>
            </div>
            <h3 className="text-xl text-brand-foreground font-semibold mb-2 group-hover:text-brand-primary transition-colors">{uni.name}</h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {uni.description}
            </p>
            <Link href="#" className="text-brand-primary text-sm font-medium hover:underline flex items-center gap-1">
              View Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
