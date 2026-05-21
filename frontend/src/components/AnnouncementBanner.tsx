"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Announcement {
  id: number;
  message: string;
  link: string | null;
  is_active: boolean;
  order: number;
}

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/announcements/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    
    // Cycle through announcements every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const current = announcements[currentIndex];

  const content = (
    <motion.div
      key={current.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 w-full px-4"
    >
      <span className="text-xs md:text-sm font-medium tracking-wide text-center">
        {current.message}
      </span>
      {current.link && (
        <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-0.5 ml-1">
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </span>
      )}
    </motion.div>
  );

  return (
    <div className="w-full bg-[#1a237e] text-white py-2 shadow-inner overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative min-h-[24px]">
        {current.link ? (
          <Link href={current.link} className="w-full hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer">
            <AnimatePresence mode="wait">
              {content}
            </AnimatePresence>
          </Link>
        ) : (
          <div className="w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {content}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
