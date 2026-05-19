

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import StatsCounters from "@/components/StatsCounters";
import JourneyTimeline from "@/components/JourneyTimeline";
import FaqAccordion from "@/components/FaqAccordion";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />
      <Hero />
      <StatsCounters/>
      <ServicesBento />
      <JourneyTimeline/>
      <Testimonials />
      <FaqAccordion />
      <Footer />
    </main>
  );
}
