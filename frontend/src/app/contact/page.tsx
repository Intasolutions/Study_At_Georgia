"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => {
          dict[item.identifier] = item.text_value || "";
        });
        setContent(dict);
      })
      .catch(console.error);
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your inquiry.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen relative bg-[#FAFAFA] font-sans flex flex-col selection:bg-[#1a237e]/20 selection:text-[#1a237e]">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#1a237e]/5 to-transparent pointer-events-none" />

      <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#cfb53b] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#cfb53b]"></span>
            Private Advisory
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight">
            Initiate <span className="text-[#1a237e] font-serif italic font-light">Dialogue.</span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl text-lg font-light leading-relaxed">
            Secure your future with elite academic guidance. Connect with our senior consultants to architect your personalized transition to global excellence.
          </p>
        </motion.div>

        {/* Split Layout Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row mb-24"
        >
          
          {/* Left Panel: Contact Information (Navy Branding) */}
          <div className="lg:w-5/12 bg-[#1a237e] p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#cfb53b]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#9b1c31]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-white mb-2">Direct Access</h2>
              <p className="text-slate-300 font-light mb-12">Our concierge team operates with complete confidentiality and precision.</p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#cfb53b] border border-white/5 group-hover:bg-[#cfb53b] group-hover:text-[#1a237e] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Electronic Mail</span>
                    <a href={`mailto:${content.contact_email || "hello@gatewaytogeorgia.com"}`} className="text-white text-lg font-medium hover:text-[#cfb53b] transition-colors">
                      {content.contact_email || "hello@gatewaytogeorgia.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#cfb53b] border border-white/5 group-hover:bg-[#cfb53b] group-hover:text-[#1a237e] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Global Desk</span>
                    <a href={`tel:${content.contact_phone || "+15551234567"}`} className="text-white text-lg font-medium hover:text-[#cfb53b] transition-colors">
                      {content.contact_phone || "+1 (555) 123-4567"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#cfb53b] border border-white/5 group-hover:bg-[#cfb53b] group-hover:text-[#1a237e] transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Headquarters</span>
                    <span className="text-white text-lg font-medium leading-snug block whitespace-pre-line">
                      {content.contact_address || "123 Global Way, Suite 400\nBusiness District"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
              <p className="text-slate-400 text-sm font-serif italic">
                &quot;Scientia et Veritas&quot; — Established 1992
              </p>
            </div>
          </div>
          
          {/* Right Panel: Interactive Form (Anchored Right) */}
          <div className="lg:w-7/12 p-10 lg:p-14 bg-white">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-8">Schedule a Consultation</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => { setFormData({...formData, name: e.target.value}); if (errors.name) setErrors({...errors, name: undefined}); }} 
                    className={`w-full bg-slate-50 border rounded-lg px-4 py-3.5 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                    placeholder="John Doe" 
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>
                
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: undefined}); }} 
                    className={`w-full bg-slate-50 border rounded-lg px-4 py-3.5 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inquiry Details</label>
                <textarea 
                  rows={5} 
                  value={formData.message} 
                  onChange={e => { setFormData({...formData, message: e.target.value}); if (errors.message) setErrors({...errors, message: undefined}); }} 
                  className={`w-full bg-slate-50 border rounded-lg px-4 py-3.5 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 focus:border-[#1a237e] transition-all resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                  placeholder="Tell us about your academic goals..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                disabled={status === "submitting"} 
                type="submit" 
                className="w-full md:w-auto px-10 py-4 bg-[#1a237e] hover:bg-[#111859] text-white font-bold rounded-lg transition-all disabled:opacity-70 flex items-center justify-center gap-3 shadow-[0_10px_20px_-10px_rgba(26,35,126,0.5)] hover:shadow-lg hover:-translate-y-0.5"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
                {status !== "submitting" && <ArrowRight className="w-5 h-5" />}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-3 text-emerald-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm font-medium">Inquiry received successfully. Our team will contact you shortly.</p>
                </motion.div>
              )}
              
              {status === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-800"
                >
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium">Transmission failed. Please check your connection and try again.</p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <div className="mt-32">
          <FaqAccordion />
        </div>
      </div>

      <Footer />
    </main>
  );
}