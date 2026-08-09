import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProgramShowcase from '@/components/ProgramShowcase';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch all program slugs for static generation
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/programs/`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((program: { slug: string }) => ({
      slug: program.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for programs:", error);
    return [];
  }
}

// Fetch program data for the specific slug
async function getProgramData(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/programs/${slug}/`, {
      next: { revalidate: 0 } // Revalidate every 0 seconds (disable cache)
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch program data');
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching program:", error);
    return null;
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramData(slug);
  
  if (!program) {
    return {
      title: 'Program Not Found | StudyAtGeorgia',
      description: 'The requested program could not be found.',
    };
  }
  
  return {
    title: `${program.name} in Georgia | StudyAtGeorgia`,
    description: program.heading || `Learn more about studying ${program.name} in Georgia with StudyAtGeorgia.`,
    openGraph: {
      title: `${program.name} in Georgia | StudyAtGeorgia`,
      description: program.heading,
      images: program.image ? [{ url: program.image.startsWith('http') ? program.image : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${program.image}` }] : [],
    }
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramData(slug);

  if (!program) {
    notFound();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`, { next: { revalidate: 60 } });
  const siteContentData = res.ok ? await res.json() : null;
  const contentDict: Record<string, string> = {};
  if (siteContentData && Array.isArray(siteContentData)) {
    siteContentData.forEach((item: any) => {
      contentDict[item.identifier] = item.text_value || "";
      if (item.image_value) {
        contentDict[`${item.identifier}_img`] = item.image_value;
      }
    });
  }

  return (
    <>
      <Navbar initialContent={contentDict} />
      <main className="min-h-screen bg-[color:var(--paper)]">
        <ProgramShowcase program={program} />
      </main>
      <Footer content={contentDict} />
    </>
  );
}
