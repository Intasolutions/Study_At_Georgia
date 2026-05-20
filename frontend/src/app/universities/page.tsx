import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityShowcase from "@/components/UniversityShowcase";

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20">
        <UniversityShowcase />
      </div>
      <Footer />
    </main>
  );
}
