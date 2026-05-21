"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Megaphone } from "lucide-react";

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
  const bannerRef = useRef<HTMLDivElement>(null);

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

  // Cycle through announcements for mobile fading
  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // Dynamically set CSS variable for layout adjustment
  useEffect(() => {
    if (announcements.length > 0 && bannerRef.current) {
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px');
    }

    // Cleanup when unmounted
    return () => {
      document.documentElement.style.setProperty('--banner-height', '0px');
    };
  }, [announcements, currentIndex]); // depend on currentIndex so height updates if text wraps differently

  if (announcements.length === 0) return null;

  const current = announcements[currentIndex];
  // For desktop marquee, combine all
  const combinedMessage = announcements.map(a => a.message).join(" • ");
  const mainLink = announcements.find(a => a.link)?.link;

  return (
    <div 
      ref={bannerRef}
      className="w-full bg-gradient-to-r from-brand-crimson via-red-600 to-brand-crimson text-white shadow-[0_4px_20px_-5px_rgba(155,28,49,0.5)] overflow-hidden border-b border-white/10 relative z-50"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-wrapper {
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;
        }
        .marquee-content {
          display: flex;
          align-items: center;
          width: fit-content;
        }
        @media (min-width: 768px) {
          .marquee-content {
            animation: marquee 30s linear infinite;
          }
          .marquee-wrapper:hover .marquee-content {
            animation-play-state: paused;
          }
        }
      `}} />
      
      <div className="w-full max-w-[100vw] mx-auto relative">
        
        {/* === MOBILE VIEW: Fading Carousel (Only visible on small screens) === */}
        <div className="md:hidden w-full py-2.5 px-4 min-h-[40px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
              className="flex items-start justify-center gap-2 w-full text-center"
            >
              <Megaphone className="w-4 h-4 shrink-0 text-[#cfb53b] mt-0.5" />
              {current.link ? (
                <Link href={current.link} className="flex items-center text-xs font-medium leading-snug hover:opacity-80">
                  {current.message}
                  <ChevronRight className="w-3 h-3 shrink-0 ml-1" />
                </Link>
              ) : (
                <span className="text-xs font-medium leading-snug">
                  {current.message}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === DESKTOP VIEW: Continuous Infinite Marquee (Only visible on md+ screens) === */}
        <div className="hidden md:flex py-2.5 w-full">
          {mainLink ? (
            <Link href={mainLink} className="w-full block hover:bg-black/10 transition-colors">
              <DesktopMarquee combinedMessage={combinedMessage} hasLink={true} />
            </Link>
          ) : (
            <div className="w-full">
              <DesktopMarquee combinedMessage={combinedMessage} hasLink={false} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function DesktopMarquee({ combinedMessage, hasLink }: { combinedMessage: string, hasLink: boolean }) {
  const itemContent = (
    <div className="flex items-center gap-3 px-8">
      <Megaphone className="w-5 h-5 shrink-0 text-[#cfb53b]" />
      <span className="text-sm font-bold tracking-wide uppercase">
        {combinedMessage}
      </span>
      {hasLink && <ChevronRight className="w-4 h-4 shrink-0 bg-white/20 rounded-full p-0.5" />}
    </div>
  );

  return (
    <div className="marquee-wrapper">
      <div className="marquee-content">
        {itemContent}
        {itemContent}
        {itemContent}
        {itemContent}
      </div>
    </div>
  );
}
