import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityList from "@/components/UniversityList";

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-foreground mb-4">
            Partner Universities
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl">
            Explore our network of prestigious medical and technical universities in Georgia, recognized globally for their academic excellence.
          </p>
        </div>
        
        <UniversityList />
      </div>

      <Footer />
    </main>
  );
}
