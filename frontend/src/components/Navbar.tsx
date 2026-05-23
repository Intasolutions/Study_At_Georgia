"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnnouncementBanner from "./AnnouncementBanner";

export default function Navbar({ initialContent = {} }: { initialContent?: Record<string, string> }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 md:py-4 shadow-sm" : "bg-transparent py-4 md:py-6"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 z-50">
          {content.nav_logo_img ? (
            <img 
              src={content.nav_logo_img.startsWith('http') ? content.nav_logo_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.nav_logo_img}`} 
              alt="Brand Logo" 
              className="h-10 md:h-15 w-auto object-contain"
            />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(26,35,126,0.4)]">
              <span className="text-white font-bold text-lg md:text-xl leading-none">
                {(content.nav_brand_name || "G")[0]}
              </span>
            </div>
          )}
          <span className="font-heading font-bold text-lg md:text-xl tracking-tight text-brand-foreground">
            {content.nav_brand_name || "Gateway"}
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-brand-primary transition-colors">About</Link>
          <Link href="/services" className="hover:text-brand-primary transition-colors">Services</Link>
          <Link href="/universities" className="hover:text-brand-primary transition-colors">University</Link>
          <Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 text-brand-foreground z-50"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col items-center justify-start h-full pt-10 pb-32 gap-8 text-lg font-semibold text-brand-foreground">
              <Link href="/" onClick={closeMenu} className="hover:text-brand-primary transition-colors w-full text-center py-2">Home</Link>
              <Link href="/about" onClick={closeMenu} className="hover:text-brand-primary transition-colors w-full text-center py-2">About</Link>
              <Link href="/services" onClick={closeMenu} className="hover:text-brand-primary transition-colors w-full text-center py-2">Services</Link>
              <Link href="/universities" onClick={closeMenu} className="hover:text-brand-primary transition-colors w-full text-center py-2">University</Link>
              <Link href="/contact" onClick={closeMenu} className="hover:text-brand-primary transition-colors w-full text-center py-2">Contact Us</Link>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  window.dispatchEvent(new Event("open-consultation"));
                }}
                className="mt-4 px-8 py-3 rounded-xl bg-brand-primary text-white font-semibold flex items-center justify-center shadow-lg shadow-brand-primary/30"
              >
                {content.navbar_button_text || "Book Consultation"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <AnnouncementBanner />
  </div>
  );
}