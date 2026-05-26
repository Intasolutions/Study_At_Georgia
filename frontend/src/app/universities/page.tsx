import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityShowcase from "@/components/UniversityShowcase";

export async function generateMetadata(): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiUrl}/api/universities/`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const targetUni = data.find((u: { name: string; is_active: boolean }) => u.name.includes("Grigol Robakidze")) || data.find((u: { name: string; is_active: boolean }) => u.is_active);
      if (targetUni) {
        return { title: targetUni.name };
      }
    }
  } catch (e) {
    console.error(e);
  }
  return { title: "Universities" };
}

export default async function UniversitiesPage() {
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

  const [siteContentData, universitiesData] = await Promise.all([
    fetchWithCache('/api/site-content/'),
    fetchWithCache('/api/universities/')
  ]);

  const contentDict: Record<string, string> = {};
  if (siteContentData && Array.isArray(siteContentData)) {
    siteContentData.forEach(item => {
      contentDict[item.identifier] = item.text_value || "";
    });
  }

  let targetUni = null;
  if (universitiesData && Array.isArray(universitiesData)) {
    targetUni = universitiesData.find(u => u.name.includes("Grigol Robakidze")) || universitiesData.find(u => u.is_active);
  }

  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar initialContent={contentDict} />
      <div className="flex-grow">
        <UniversityShowcase initialUniversity={targetUni} />
      </div>
      <Footer initialContent={contentDict} />
    </main>
  );
}
