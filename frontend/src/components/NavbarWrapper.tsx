import Navbar from "./Navbar";

export default async function NavbarWrapper({ initialContent = {} }: { initialContent?: Record<string, string> }) {
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

  const [programsData, announcementsData, siteContentData] = await Promise.all([
    fetchWithCache('/api/programs/'),
    fetchWithCache('/api/announcements/'),
    Object.keys(initialContent).length === 0 ? fetchWithCache('/api/site-content/') : Promise.resolve(null)
  ]);

  let finalContent = initialContent;
  if (siteContentData && Array.isArray(siteContentData)) {
    const dict: Record<string, string> = {};
    siteContentData.forEach(item => {
      dict[item.identifier] = item.text_value || "";
      if (item.image_value) {
        dict[`${item.identifier}_img`] = item.image_value;
      }
    });
    finalContent = dict;
  }

  return (
    <Navbar 
      initialContent={finalContent} 
      initialPrograms={programsData || []} 
      initialAnnouncements={announcementsData || []} 
    />
  );
}
