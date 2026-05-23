import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
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

  const [siteContentData, faqsData] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/faqs/')
  ]);

  const contentDict: Record<string, string> = {};
  if (siteContentData && Array.isArray(siteContentData)) {
    siteContentData.forEach(item => {
      contentDict[item.identifier] = item.text_value || "";
    });
  }

  return (
    <main className="min-h-screen relative bg-[#FAFAFA] font-sans flex flex-col selection:bg-[#1a237e]/20 selection:text-[#1a237e]">
      <Navbar initialContent={contentDict} />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#1a237e]/5 to-transparent pointer-events-none" />

      <div className="flex-1 max-w-7xl mx-auto px-6 pt-[calc(8rem+var(--banner-height,0px))] pb-20 w-full relative z-10">
        
        {/* Page Header */}
        <div className="mb-10 md:mb-16">
          <p className="text-[#cfb53b] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#cfb53b]"></span>
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight">
            Contact <span className="text-[#1a237e] font-serif italic font-light">Us.</span>
          </h1>
          <p className="text-slate-500 mt-6 max-w-2xl text-lg font-light leading-relaxed">
            Have questions? Our consultants are here to help you chart the perfect academic journey to Georgia.
          </p>
        </div>

        {/* Form Component */}
        <ContactForm content={contentDict} />
        
        {/* FAQ Section */}
        <div className="mt-16">
          <FaqAccordion initialContent={contentDict} initialFaqs={faqsData || []} />
        </div>
      </div>

      <Footer initialContent={contentDict} />
    </main>
  );
}