import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCounters from "@/components/StatsCounters";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
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

  const [siteContentData, statsData] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/stats/')
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

  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar initialContent={contentDict} />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-[calc(8rem+var(--banner-height,0px))] pb-20 w-full">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-foreground mb-6">
          About Us
        </h1>
        <div className="bg-brand-surface border border-slate-200 shadow-sm rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="mb-16 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 shadow-sm rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <span className="text-brand-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Official Verification</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-foreground mb-4">University Authorization</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Study at Georgia is officially certified and authorized by Grigol Robakidze University as the Exclusive Recruitment Partner to represent and recruit international students from India.
              </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-8 border-white group">
              <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              <Image 
                src="/gruni-certificate.jpg" 
                alt="GRUNI Official Authorization Certificate"
                width={1200}
                height={850}
                className="w-full h-auto object-contain bg-white group-hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Intro Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              Study at Georgia is the authorized marketing and student support team in India for Grigol Robakidze University, committed to helping Indian students achieve quality international education in Georgia. We provide complete guidance throughout the admission journey — from university selection and application support to visa assistance, accommodation guidance, and pre-departure support. Our mission is to connect aspiring students with European-standard education opportunities and help them build a successful global career with confidence.
            </p>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-slate-800 text-lg mb-1">Authorized Channel Partner</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Official representative for admissions and student support for Grigol Robakidze University (GRUNI).</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mt-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-slate-800 text-lg mb-1">End-to-End Support</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Complete assistance with applications, document verification, translation, visa processing, and pre-departure guidance.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Representatives Section */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <div className="text-center mb-12">
              <span className="text-brand-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-foreground mb-4">Authorized Representatives</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Prasad Pulachiparambil Kuttan */}
              <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-amber-200/80 bg-gradient-to-b from-white to-amber-50/30 p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-5">
                  <Image 
                    src="/prasad-representative.jpeg" 
                    alt="Prasad Pulachiparambil Kuttan - Official Representative" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-[center_15%] group-hover:scale-102 transition-transform duration-500" 
                    priority
                  />
                  <div className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Official Representative
                  </div>
                </div>
                <div className="text-center px-2 pb-2">
                  <h3 className="text-2xl font-heading font-bold text-brand-foreground">
                    Prasad Pulachiparambil Kuttan
                  </h3>
                  <p className="text-amber-600 font-medium text-sm mt-1">
                    Official Representative of Grigol Robakidze University
                  </p>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed border-t border-amber-100 pt-3">
                    Exclusive Recruitment Partner for Grigol Robakidze University (GRUNI), Georgia.
                  </p>
                </div>
              </div>

              {/* Amal Mohan */}
              <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-slate-200/80 bg-white p-4 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-5">
                  <Image 
                    src="/amal-mohan.jpg" 
                    alt="Amal Mohan - Deputy Representative" 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-[center_15%] group-hover:scale-102 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-brand-primary/95 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Deputy Representative
                  </div>
                </div>
                <div className="text-center px-2 pb-2">
                  <h3 className="text-2xl font-heading font-bold text-brand-foreground">
                    Amal Mohan
                  </h3>
                  <p className="text-brand-primary font-medium text-sm mt-1">
                    Deputy Representative of Grigol Robakidze University
                  </p>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed border-t border-slate-100 pt-3">
                    Authorized to represent and assist students from India seeking admission to Grigol Robakidze University (GRUNI), Georgia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-slate-100">
            <StatsCounters initialContent={contentDict} initialStats={statsData || []} />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-background border border-slate-200 rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-heading font-bold text-brand-foreground mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                {contentDict.about_mission || "Loading..."}
              </p>
            </div>
            <div className="bg-brand-background border border-slate-200 rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-heading font-bold text-brand-foreground mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {contentDict.about_vision || "Loading..."}
              </p>
              {contentDict.about_vision_img && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 mt-2">
                  <Image 
                    src={contentDict.about_vision_img} 
                    alt="Our Vision" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer initialContent={contentDict} />
    </main>
  );
}