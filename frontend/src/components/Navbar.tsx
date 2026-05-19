"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {content.nav_logo_img ? (
            <img 
              src={content.nav_logo_img.startsWith('http') ? content.nav_logo_img : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${content.nav_logo_img}`} 
              alt="Brand Logo" 
              className="h-15 w-auto object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(26,35,126,0.4)]">
              <span className="text-white font-bold text-xl leading-none">
                {(content.nav_brand_name || "G")[0]}
              </span>
            </div>
          )}
          <span className="font-heading font-bold text-xl tracking-tight text-brand-foreground">
            {content.nav_brand_name || "Gateway"}
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-brand-primary transition-colors">About</Link>
          <Link href="/services" className="hover:text-brand-primary transition-colors">Services</Link>
          <Link href="/universities" className="hover:text-brand-primary transition-colors">Universities</Link>
          <Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link>
        </div>
      </div>
    </motion.nav>
  );
}