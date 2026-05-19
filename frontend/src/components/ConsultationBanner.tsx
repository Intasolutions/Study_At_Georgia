"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsultationBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", qualification: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const handleOpenEvent = () => setIsVisible(true);
    window.addEventListener("open-consultation", handleOpenEvent);

    // Check if the banner has been dismissed previously
    const hasClosed = localStorage.getItem("consultation_banner_closed");
    let timer: NodeJS.Timeout;

    if (!hasClosed) {
      // 1 minute delay = 60,000 milliseconds
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 60000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-consultation", handleOpenEvent);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("consultation_banner_closed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: `Phone: ${formData.phone}\nQualification: ${formData.qualification}\n\nI would like to register for a free consultation.`
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", qualification: "" });
        // Automatically close after a short delay
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
        >
          <div className="bg-brand-surface border border-slate-200 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="bg-brand-primary p-4 flex items-center justify-between">
              <h3 className="text-brand-gold font-bold text-lg flex items-center gap-2">
                <span className="w-4 h-[2px] bg-brand-gold"></span>
                Free Consultation
              </h3>
              <button 
                onClick={handleClose}
                className="text-white hover:text-brand-gold transition-colors p-1"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Start your journey today! Register for a free, no-obligation consultation with our study abroad experts.
              </p>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-center text-sm font-medium"
                >
                  Registration successful! We will contact you soon.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      required 
                      type="text" 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-brand-background border border-slate-200 rounded-lg px-4 py-2.5 text-brand-foreground text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      required 
                      type="email" 
                      placeholder="Your Email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-brand-background border border-slate-200 rounded-lg px-4 py-2.5 text-brand-foreground text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      required 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-brand-background border border-slate-200 rounded-lg px-4 py-2.5 text-brand-foreground text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>
                  <div>
                    <select 
                      required 
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                      className="w-full bg-brand-background border border-slate-200 rounded-lg px-4 py-2.5 text-brand-foreground text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    >
                      <option value="" disabled>Current Qualification</option>
                      <option value="High School / 12th Grade">High School / 12th Grade</option>
                      <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                      <option value="Master's Degree">Master&apos;s Degree</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button 
                    disabled={status === "submitting"}
                    type="submit" 
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-3 rounded-lg transition-all shadow-md shadow-brand-primary/20 disabled:opacity-50 text-sm"
                  >
                    {status === "submitting" ? "Submitting..." : "Claim Free Consultation"}
                  </button>
                  
                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center">Failed to submit. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
