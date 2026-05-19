"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/faqs/`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(console.error);
  }, []);

  if (faqs.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-16">
      <h2 className="text-3xl font-heading font-bold text-brand-foreground mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-brand-surface shadow-sm backdrop-blur-sm transition-colors hover:border-brand-primary/30">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <span className="font-medium text-brand-foreground text-lg">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isActive ? 'bg-brand-primary border-brand-primary text-brand-gold rotate-180' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
