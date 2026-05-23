

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import StatsCounters from "@/components/StatsCounters";
import JourneyTimeline from "@/components/JourneyTimeline";
import FaqAccordion from "@/components/FaqAccordion";
import WhyGruni from "@/components/WhyGruni";

export default async function Home() {
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

  const [
    siteContentData,
    testimonialsData,
    faqsData,
    statsData,
    journeyData,
    servicesData
  ] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/testimonials/'),
    fetchWithCache('/api/faqs/'),
    fetchWithCache('/api/stats/'),
    fetchWithCache('/api/journey-steps/'),
    fetchWithCache('/api/service-packages/')
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
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar initialContent={contentDict} />
      <Hero initialContent={contentDict} />
      <StatsCounters initialContent={contentDict} initialStats={statsData || []} />
      <WhyGruni initialContent={contentDict} />
      <ServicesBento initialContent={contentDict} initialServices={servicesData || []} />
      <JourneyTimeline initialContent={contentDict} initialSteps={journeyData || []} />
      <Testimonials initialContent={contentDict} initialTestimonials={testimonialsData || []} />
      <FaqAccordion initialContent={contentDict} initialFaqs={faqsData || []} />
      <Footer initialContent={contentDict} />
    </main>
  );
}
