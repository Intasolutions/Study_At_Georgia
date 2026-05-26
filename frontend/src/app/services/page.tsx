import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import JourneyTimeline from "@/components/JourneyTimeline";

export const metadata: Metadata = {
  title: "Our Services",
};

export default async function ServicesPage() {
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

  const [siteContentData, servicesData, journeyData] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/service-packages/'),
    fetchWithCache('/api/journey-steps/')
  ]);

  const contentDict: Record<string, string> = {};
  if (siteContentData && Array.isArray(siteContentData)) {
    siteContentData.forEach(item => {
      contentDict[item.identifier] = item.text_value || "";
    });
  }

  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar initialContent={contentDict} />
      
      <div className="flex-1 w-full pt-[calc(8rem+var(--banner-height,0px))] pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-foreground mb-4">
            Our Services
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Comprehensive support designed to help you transition seamlessly to studying and living in Georgia.
          </p>
        </div>
        
        {/* Reusing the ServicesBento component for the blueprint */}
        <ServicesBento initialContent={contentDict} initialServices={servicesData || []} />
        
        <JourneyTimeline initialContent={contentDict} initialSteps={journeyData || []} />
      </div>

      <Footer initialContent={contentDict} />
    </main>
  );
}
