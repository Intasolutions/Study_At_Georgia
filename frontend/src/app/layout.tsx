import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationBanner from "@/components/ConsultationBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let faviconUrl = "/favicon.ico"; // Default fallback if fetch fails
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`, { next: { revalidate: 60 } });
    const data = await res.json();
    const faviconItem = data.find((item: any) => item.identifier === 'global_favicon_image');
    if (faviconItem && faviconItem.image_value) {
      faviconUrl = faviconItem.image_value.startsWith('http') 
        ? faviconItem.image_value 
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${faviconItem.image_value}`;
    }
  } catch (error) {
    console.error("Failed to fetch favicon:", error);
  }

  return {
    title: "Premium Study Abroad Agency | Gateway to Georgia",
    description: "Your trusted partner for studying abroad in Georgia. We handle visa processing, university selection, and accommodation.",
    icons: {
      icon: faviconUrl,
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        <WhatsAppButton />
        <ConsultationBanner />
      </body>
    </html>
  );
}
