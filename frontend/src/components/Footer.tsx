"use client";

import { useState, useEffect } from "react";

export default function Footer({ initialContent = {} }: { initialContent?: Record<string, string> }) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);

  useEffect(() => {
    if (Object.keys(initialContent).length > 0) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/site-content/`)
      .then(res => res.json())
      .then((data: { identifier: string; text_value: string }[]) => {
        const dict: Record<string, string> = {};
        data.forEach(item => {
          dict[item.identifier] = item.text_value || "";
        });
        setContent(dict);
      })
      .catch(console.error);
  }, [initialContent]);

  return (
    <footer className="border-t border-brand-primary/10 py-12 text-center text-brand-muted text-sm mt-20 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <span className="text-brand-primary font-bold text-xs">
              {(content.footer_brand_name || "G")[0]}
            </span>
          </div>
          <span className="font-heading font-medium text-brand-foreground">
            {content.footer_brand_name || "Gateway to Georgia"}
          </span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1 mt-4 md:mt-0">
          <p>© {new Date().getFullYear()} {content.footer_copyright || "Gateway Consulting. All rights reserved."}</p>
          <p className="text-xs opacity-60 font-light">{content.footer_developer_tagline || "Developed and maintained by IN-TA Solutions Pvt Ltd."}</p>
        </div>
      </div>
    </footer>
  );
}
