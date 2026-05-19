"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCounters from "@/components/StatsCounters";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string; image_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => {
          dict[item.identifier] = item.text_value || "";
          if (item.image_value) {
            dict[`${item.identifier}_img`] = item.image_value;
          }
        });
        setContent(dict);
      })
      .catch(console.error);
  }, []);
  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-foreground mb-6">
          About Us
        </h1>
        <div className="bg-brand-surface border border-slate-200 shadow-sm rounded-2xl p-8 backdrop-blur-sm">
          <p className="text-slate-600 text-lg leading-relaxed">
            Welcome to Gateway to Georgia. We are a premium agency dedicated to guiding students toward a successful academic future.
            Our team of expert consultants provides tailored advice and end-to-end support for studying abroad.
          </p>
          {/* Blueprint content can be expanded here */}
          <div className="mt-12">
            <StatsCounters />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-background border border-slate-200 rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-heading font-bold text-brand-foreground mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                {content.about_mission || "Loading..."}
              </p>
            </div>
            <div className="bg-brand-background border border-slate-200 rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-heading font-bold text-brand-foreground mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {content.about_vision || "Loading..."}
              </p>
              {content.about_vision_img && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 mt-2">
                  <img src={content.about_vision_img} alt="Our Vision" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
