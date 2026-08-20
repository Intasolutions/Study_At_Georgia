import { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import Testimonials from "@/components/Testimonials";
import StatsCounters from "@/components/StatsCounters";
import WhyGruni from "@/components/WhyGruni";
import Link from "next/link";
import { Phone, ShieldCheck, Award, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply Now - Fast Admission & Scholarships in Germany",
  description: "Secure your medical admission in Georgia with StudyAtGeorgia. Fast admission, scholarships, placement guarantee in Germany, and no agency fees.",
};

export default async function ApplyPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  const fetchWithCache = async (endpoint: string) => {
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, { next: { revalidate: 60 } });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const [siteContentData, testimonialsData, statsData, whyGruniBadgesData] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/testimonials/'),
    fetchWithCache('/api/stats/'),
    fetchWithCache('/api/why-gruni-badges/'),
  ]);

  const contentDict: Record<string, string> = {};
  if (siteContentData && Array.isArray(siteContentData)) {
    siteContentData.forEach(item => {
      contentDict[item.identifier] = item.text_value || "";
      if (item.image_value) {
        contentDict[`${item.identifier}_img`] = item.image_value;
      }
    });
  }

  const logoImg = contentDict.nav_logo_img || contentDict.footer_logo_img;
  const logoUrl = logoImg ? (logoImg.startsWith('http') ? logoImg : `${apiUrl}${logoImg}`) : null;

  return (
    <main className="min-h-screen relative bg-[#FAFAFA] font-sans flex flex-col selection:bg-[#1a237e]/20 selection:text-[#1a237e]">
      
      {/* Minimal Header (No distraction navigation) */}
      <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="inline-block">
            {logoUrl ? (
              <img src={logoUrl} alt="StudyAtGeorgia Logo" className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              <span className="text-xl font-black text-[#1a237e] tracking-tight">StudyAt<span className="text-[#d4af37]">Georgia</span></span>
            )}
          </Link>
          <a href={`tel:${contentDict.contact_phone || "+918590964594"}`} className="hidden md:flex items-center gap-2 text-[#1a237e] font-bold hover:text-[#d4af37] transition-colors">
            <Phone className="w-5 h-5" />
            <span>{contentDict.contact_phone || "+91 85909 64594"}</span>
          </a>
        </div>
      </header>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-gradient-to-b from-[#1a237e]/5 to-transparent pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-16 pb-8 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            Authorized Representatives
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight mb-6">
            Fast Admission & <span className="text-[#1a237e] relative whitespace-nowrap">Scholarships<svg className="absolute -bottom-2 left-0 w-full h-3 text-[#d4af37] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" /></svg></span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-light mb-8 leading-relaxed max-w-2xl mx-auto">
            Secure your medical admission in Georgia with <strong>placement guarantees in Germany</strong> and absolutely <strong>no agency fees</strong>. Start your journey today!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold text-slate-700">
            <span className="flex items-center gap-2"><Award className="w-5 h-5 text-[#d4af37]" /> No Agency Fees</span>
            <span className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-[#1a237e]" /> Germany Placement</span>
          </div>
        </div>
      </section>

      {/* Main Content (Form) */}
      <section className="px-6 py-8 relative z-10" id="apply-form">
        <ApplyForm content={contentDict} />
      </section>
      
      {/* Trust Signals (Social Proof) */}
      <div className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Why Thousands Choose Us</h3>
            <p className="text-slate-500">We are the most trusted pathway to your medical career.</p>
          </div>
          
          <StatsCounters initialContent={contentDict} initialStats={statsData || []} />
          
          <div className="mt-20">
            <WhyGruni initialContent={contentDict} initialBadges={whyGruniBadgesData || []} />
          </div>

          <div className="mt-20">
            <Testimonials initialContent={contentDict} initialTestimonials={testimonialsData || []} />
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="w-full bg-[#0f172a] text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} StudyAtGeorgia. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
