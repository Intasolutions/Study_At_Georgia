"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import JourneyTimeline from "@/components/JourneyTimeline";
import { useEffect, useState } from "react";

type Package = {
  id: number;
  name: string;
  description: string;
  is_popular: boolean;
};

export default function ServicesPage() {

  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar />
      
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
        <ServicesBento />
        
       

        <JourneyTimeline />
      </div>

      <Footer />
    </main>
  );
}
