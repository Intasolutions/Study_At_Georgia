import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and Data Collection Practices for StudyAtGeorgia.",
};

export default async function PrivacyPolicy() {
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

  const siteContentData = await fetchWithCache('/api/site-content/');

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
    <main className="min-h-screen relative selection:bg-brand-primary/30 selection:text-brand-primary bg-slate-50">
      <Navbar initialContent={contentDict} />
      
      {/* Page Header */}
      <section className="pt-[calc(8rem+var(--banner-height,0px))] pb-16 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Privacy Policy</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your privacy is critically important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-primary/5 p-8 md:p-12 prose prose-slate max-w-none">
            
            <p className="lead text-xl text-slate-600 mb-8">
              At StudyAtGeorgia, we respect your privacy and are committed to protecting any personal information you may provide us through our website. This privacy policy explains what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties.
            </p>

            <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We only collect information about you if we have a reason to do so—for example, to facilitate your admission process as the direct authorized representatives of Grigol Robakidze university, to communicate with you, or to make our services better. We collect information in the following ways:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li><strong>Contact Forms:</strong> When you fill out a form to inquire about our services or universities, we ask for your name, email address, phone number, and any message or questions you have.</li>
              <li><strong>Communication:</strong> If you contact us directly (e.g., via WhatsApp, Email, or Phone), we may receive additional information about you such as the contents of the message and/or attachments you may send us.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">2. How We Use Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Provide, operate, and maintain our admission services and website.</li>
              <li>Assist you with the university admission process at Grigol Robakidze university and other partner institutions.</li>
              <li>Communicate with you, either directly or through one of our partners, to provide you with updates and other information relating to the website and your admission status.</li>
              <li>Send you emails or messages regarding your inquiries.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-slate-600 mb-6">
              We do not share your personal information with companies, organizations, or individuals outside of StudyAtGeorgia except in the following cases:
              <br/><br/>
              <strong>With Educational Institutions:</strong> We may share your relevant information (such as academic history, name, and contact info) with Grigol Robakidze university and other educational institutions solely for the purpose of processing your admission application.
              <br/><br/>
              We <strong>do not</strong> sell your personal data to third-party marketers.
            </p>

            <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">4. Data Security</h2>
            <p className="text-slate-600 mb-6">
              We value your trust in providing us your Personal Information, thus we strive to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-brand-primary mt-8 mb-4">5. Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us using the information provided on our Contact Us page or via the contact details listed in the footer of this website.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer initialContent={contentDict} />
    </main>
  );
}
