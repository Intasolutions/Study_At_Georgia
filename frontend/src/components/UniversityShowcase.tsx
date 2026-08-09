"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

interface GeorgiaKeyPoint {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

interface UniversityImage {
  id: number;
  image: string;
  caption: string;
  category: string;
  order: number;
}

interface University {
  id: number;
  name: string;
  location: string;
  university_type: string;
  description: string;
  color_theme: string;
  image?: string;
  is_active: boolean;
  gallery_images: UniversityImage[];
  georgia_key_points: GeorgiaKeyPoint[];
  georgia_heading: string;
  georgia_photo?: string;
  georgia_paragraph: string;
  founder_name: string;
  founder_pic?: string;
  founder_paragraph: string;
  hospital_heading: string;
  hospital_paragraph: string;
  campus_heading: string;
  campus_paragraph: string;
  hostel_heading: string;
  hostel_paragraph: string;
}

const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${url.startsWith("/") ? "" : "/"}${url}`;
};

const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Globe;
  return <IconComponent className={className} strokeWidth={1.75} />;
};

const renderParagraphs = (text?: string, className: string = "") => {
  if (!text) return null;
  return text.split(/\r?\n\s*\r?\n/).map((p, idx) => (
    <p key={idx} className={`${className} mb-4 last:mb-0 break-inside-avoid text-justify`}>
      {p.trim()}
    </p>
  ));
};

/* ---------------------------------------------------------------
   Eyebrow — the section marker used throughout the page.
   Styled like a boarding-pass fare code (e.g. "GEO · DESTINATION")
   rather than a generic pill badge, since the whole page is about
   a journey a student is about to take.
---------------------------------------------------------------- */
const Eyebrow = ({
  label,
  icon,
  tone = "light",
}: {
  label: string;
  icon?: ReactNode;
  tone?: "light" | "dark";
}) => (
  <div
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase mb-6 ${
      tone === "dark"
        ? "bg-white/10 border border-white/15 text-white/90"
        : "bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/20 text-[color:var(--accent-deep)]"
    }`}
  >
    {icon}
    {label}
  </div>
);

/* ---------------------------------------------------------------
   Responsive gallery: three photos, one dominant + two stacked.
   Uses aspect ratios instead of fixed pixel heights so it never
   overflows or crushes images on small screens — the container
   only takes a fixed height at the lg breakpoint, where there is
   room for it.
---------------------------------------------------------------- */
const AsymmetricGallery = ({
  images,
  reverse = false,
}: {
  images: UniversityImage[];
  reverse?: boolean;
}) => {
  const displayImages = images.slice(0, 3);
  const remainingImages = images.slice(3);
  if (displayImages.length === 0) return null;

  const ImageCard = ({
    img,
    delay,
    tall = false,
  }: {
    img?: UniversityImage;
    delay: number;
    tall?: boolean;
  }) => {
    if (!img) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={`relative w-full ${
          tall ? "aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3] lg:aspect-auto lg:h-full"
        } rounded-2xl sm:rounded-[1.75rem] overflow-hidden group bg-[color:var(--line)] shadow-[0_1px_2px_rgba(22,35,43,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(22,35,43,0.25)] transition-shadow duration-500`}
      >
        <Image
          src={getImageUrl(img.image)}
          alt={img.caption || "University photo"}
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {img.caption && (
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white font-medium text-sm sm:text-base drop-shadow">{img.caption}</p>
          </div>
        )}
      </motion.div>
    );
  };

  const mainImg = displayImages[0];
  const sideA = displayImages[1];
  const sideB = displayImages[2];

  return (
    <div className="mt-10 sm:mt-12 md:mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-4 sm:gap-5 md:gap-6 lg:h-[560px]">
        {reverse ? (
          <>
            <div className="order-2 lg:order-1 lg:col-span-4 lg:row-span-2 grid grid-rows-2 gap-4 sm:gap-5 md:gap-6">
              <ImageCard img={sideA} delay={0.1} />
              <ImageCard img={sideB} delay={0.2} />
            </div>
            <div className="order-1 lg:order-2 sm:col-span-2 lg:col-span-8 lg:row-span-2">
              <ImageCard img={mainImg} delay={0} tall />
            </div>
          </>
        ) : (
          <>
            <div className="sm:col-span-2 lg:col-span-8 lg:row-span-2">
              <ImageCard img={mainImg} delay={0} tall />
            </div>
            <div className="lg:col-span-4 lg:row-span-2 grid grid-rows-2 gap-4 sm:gap-5 md:gap-6">
              <ImageCard img={sideA} delay={0.1} />
              <ImageCard img={sideB} delay={0.2} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------
   Loading skeleton — kept on-brand instead of a bare "Loading…"
   string, so a slow connection doesn't read as a broken page.
---------------------------------------------------------------- */
const ShowcaseSkeleton = () => (
  <div className="min-h-screen bg-[#EFF0EA] flex items-center justify-center px-6">
    <div className="flex flex-col items-center gap-4 text-[#16232B]">
      <div className="w-10 h-10 rounded-full border-2 border-[#16232B]/15 border-t-[#E0A544] animate-spin" />
      <p className="text-sm text-[#16232B]/60">Loading...</p>
    </div>
  </div>
);

export default function UniversityShowcase({
  initialUniversity = null,
}: {
  initialUniversity?: University | null;
}) {
  const [university, setUniversity] = useState<University | null>(initialUniversity);
  const [loading, setLoading] = useState(!initialUniversity);

  useEffect(() => {
    if (initialUniversity) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/universities/`)
      .then((res) => res.json())
      .then((data: University[]) => {
        const targetUni =
          data.find((u) => u.name.includes("Grigol Robakidze")) ||
          data.find((u) => u.is_active) ||
          data[0];
        if (targetUni) {
          setUniversity(targetUni);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch university data:", error);
        setLoading(false);
      });
  }, [initialUniversity]);

  if (loading || !university) {
    return <ShowcaseSkeleton />;
  }

  const imagesByCategory = (category: string) => {
    return university.gallery_images?.filter((img) => img.category === category && img.image) || [];
  };

  const allImages = university.gallery_images?.filter((img) => img.image) || [];

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <MotionConfig reducedMotion="user">
    <div
      className="w-full font-sans selection:bg-[#E0A544]/30 [--ink:#16232B] [--ink-soft:#5B6A72] [--paper:#EFF0EA] [--accent:#E0A544] [--accent-deep:#9C7326] [--line:#DBD9CC] pt-[calc(6rem+var(--banner-height,0px))] sm:pt-[calc(7rem+var(--banner-height,0px))] bg-[color:var(--paper)]"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
      `}</style>

      {/* --- GEORGIA & TBILISI SECTION --- */}
      {university.georgia_heading && (
        <section className="py-16 sm:py-20 md:py-28 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-16 items-start lg:items-center"
          >
            {/* Left: Georgia Photo with a passport-stamp badge */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(22,35,43,0.35)] bg-[color:var(--line)]">
                {university.georgia_photo ? (
                  <Image
                    src={getImageUrl(university.georgia_photo)}
                    alt="Georgia & Tbilisi"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-[color:var(--line)] animate-pulse" />
                )}
              </div>

              {/* Signature: visa-stamp badge, tied to the "journey abroad" theme */}
              <div className="absolute -bottom-5 -right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 -rotate-6 bg-[#FBFAF5] text-[color:var(--ink)] rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 border-2 border-dashed border-[color:var(--accent-deep)]/60 shadow-xl flex flex-col items-center justify-center text-center p-3">
                <LucideIcons.Plane className="w-4 h-4 sm:w-5 sm:h-5 text-[color:var(--accent-deep)] mb-1" strokeWidth={1.75} />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase leading-tight text-[color:var(--ink-soft)]">
                  Arrivals
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.1em]">
                  TBILISI, GE
                </span>
              </div>
            </div>

            {/* Right: Text & Key Points */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
              <Eyebrow label="Destination" icon={<LucideIcons.Compass className="w-4 h-4" />} />
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[color:var(--ink)] mb-6 md:mb-8 leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                {university.georgia_heading}
              </h2>
              <div className="mb-8 md:mb-10 text-lg sm:text-xl text-[color:var(--ink-soft)] leading-relaxed">
                {renderParagraphs(university.georgia_paragraph)}
              </div>

              {university.georgia_key_points && university.georgia_key_points.length > 0 && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                  {university.georgia_key_points.map((point, idx) => (
                    <motion.div
                      key={point.id ?? idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                      className="group bg-white/70 hover:bg-white p-5 sm:p-6 rounded-2xl border border-[color:var(--line)] hover:border-[color:var(--accent)]/50 transition-colors duration-300"
                    >
                      <div className="mb-3 sm:mb-4 text-[color:var(--accent-deep)] group-hover:translate-x-0.5 transition-transform duration-300">
                        {renderIcon(point.icon, "w-6 h-6 sm:w-7 sm:h-7")}
                      </div>
                      <h4 className="font-semibold text-[color:var(--ink)] text-base sm:text-lg mb-1.5">
                        {point.title}
                      </h4>
                      {point.description && (
                        <p className="text-[color:var(--ink-soft)] text-sm leading-relaxed">
                          {point.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* --- MAIN UNIVERSITY SECTION --- */}
      <section className="py-16 sm:py-20 md:py-28 bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] shadow-[0_-10px_40px_rgba(22,35,43,0.04)] border-t border-[color:var(--line)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="mb-10 md:mb-14"
          >
            {/* Top row: Heading */}
            <div className="mb-8 md:mb-10">
              <div className="max-w-3xl">
                <Eyebrow label="University Overview" icon={<LucideIcons.GraduationCap className="w-4 h-4" />} />
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[color:var(--ink)] tracking-tight leading-[1.02]"
                  style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
                >
                  {university.name}
                </h1>
              </div>
            </div>
            
            {/* Description Text - Single column, full width to fill the space naturally */}
            <div className="text-lg sm:text-xl text-[color:var(--ink-soft)] font-normal leading-relaxed max-w-6xl mb-12 md:mb-16 text-justify">
              {renderParagraphs(university.description)}
            </div>

            {/* Unified Founder Card (Full Description) */}
            {(university.founder_name || university.founder_paragraph) && (
              <div className="bg-[#FBFAF5] p-6 sm:p-8 md:p-10 rounded-[2rem] border border-[color:var(--accent)]/30 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left max-w-5xl shadow-[0_10px_30px_-10px_rgba(224,165,68,0.15)] mb-8">
                {university.founder_pic && (
                  <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                    <Image
                      src={getImageUrl(university.founder_pic)}
                      alt={university.founder_name || "Founder"}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <div className="inline-block px-3 py-1 bg-[color:var(--accent)]/10 text-[color:var(--accent-deep)] rounded-full text-xs font-bold tracking-widest uppercase mb-3">
                    Founder
                  </div>
                  <h4 className="font-semibold text-xl md:text-2xl text-[color:var(--ink)] mb-3">
                    {university.founder_name}
                  </h4>
                  <p className="text-[color:var(--ink-soft)] leading-relaxed italic md:text-lg text-justify">
                    "{university.founder_paragraph}"
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <AsymmetricGallery images={imagesByCategory("MAIN")} reverse={false} />
        </div>
      </section>

      {/* --- PINO HOSPITAL SECTION --- */}
      {university.hospital_heading && (
        <section className="py-16 sm:py-20 md:py-28 bg-[color:var(--paper)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 md:mb-14">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[color:var(--ink)] text-[color:var(--accent)] mb-6 sm:mb-8">
                <LucideIcons.HeartPulse className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[color:var(--ink)] mb-5 md:mb-6 leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                {university.hospital_heading}
              </h2>
              <div className="text-lg sm:text-xl text-[color:var(--ink-soft)] leading-relaxed max-w-6xl">
                {renderParagraphs(university.hospital_paragraph)}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory("HOSPITAL")} reverse={true} />
          </div>
        </section>
      )}

      {/* --- CAMPUS LIFE SECTION --- */}
      {university.campus_heading && (
        <section className="py-16 sm:py-20 md:py-28 bg-[color:var(--ink)] text-white rounded-[2rem] sm:rounded-[3rem] mx-3 sm:mx-4 md:mx-6 my-8 sm:my-10 md:my-12 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] sm:h-[500px] bg-[color:var(--accent)]/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeUp} className="text-center max-w-6xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 text-[color:var(--accent)] mb-6 sm:mb-8 border border-white/10">
                <LucideIcons.Library className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-5 md:mb-6 leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                {university.campus_heading}
              </h2>
              <div className="text-lg sm:text-xl text-white/65 leading-relaxed font-normal">
                {renderParagraphs(university.campus_paragraph)}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory("CAMPUS")} reverse={false} />
          </div>
        </section>
      )}

      {/* --- HOSTEL SECTION --- */}
      {university.hostel_heading && (
        <section className="py-16 sm:py-20 md:py-28 bg-[color:var(--paper)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 md:mb-14">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[color:var(--ink)] text-[color:var(--accent)] mb-6 sm:mb-8">
                <LucideIcons.Home className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[color:var(--ink)] mb-5 md:mb-6 leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                {university.hostel_heading}
              </h2>
              <div className="text-lg sm:text-xl text-[color:var(--ink-soft)] leading-relaxed max-w-6xl">
                {renderParagraphs(university.hostel_paragraph)}
              </div>
            </motion.div>

            <AsymmetricGallery images={imagesByCategory("HOSTEL")} reverse={true} />
          </div>
        </section>
      )}

      {/* --- COMMON GALLERY (END OF PAGE) --- */}
      {allImages.length > 0 && (
        <section className="py-16 sm:py-20 md:py-28 bg-white border-t border-[color:var(--line)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14 md:mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[color:var(--ink)] mb-3 tracking-tight"
                style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
              >
                Complete Gallery
              </h2>
              <p className="text-base sm:text-lg text-[color:var(--ink-soft)]">
                Explore all aspects of university life in Georgia.
              </p>
            </div>

            <div className="columns-1 xs:columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 md:gap-6">
              {allImages.map((img, idx) => (
                <motion.div
                  key={img.id ?? idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.08, duration: 0.5 }}
                  className="relative group break-inside-avoid mb-4 sm:mb-5 md:mb-6 rounded-2xl overflow-hidden bg-[color:var(--line)]"
                >
                  <Image
                    src={getImageUrl(img.image)}
                    alt={img.caption || `Gallery photo ${idx + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs sm:text-sm font-medium drop-shadow">{img.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </MotionConfig>
  );
}