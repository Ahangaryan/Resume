"use client";

import { useEffect, useState } from "react";
import { fetchSiteInfo } from "../services/wordpress";
import Image from "next/image";

type SiteInfo = {
  name?: string;
  description?: string;
};

const DEFAULTS = {
  name: "Site Title",
  description: "Tagline goes here.",
  icon: "/favicon.ico",
};

export default function WordpressSiteInfo() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSiteInfo()
      .then((data) => setInfo(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // اگر info وجود دارد، مقدار واقعی را نمایش بده، در غیر این صورت مقدار پیش‌فرض
  const siteTitle = info && typeof info.name === 'string' && info.name.trim() !== '' ? info.name : DEFAULTS.name;
  const tagline = info && typeof info.description === 'string' && info.description.trim() !== '' ? info.description : DEFAULTS.description;
  const iconUrl = DEFAULTS.icon;

  return (
    <div style={{ textAlign: "center" }}>
      <Image
        src={iconUrl}
        alt="Site Icon"
        width={64}
        height={64}
        style={{ borderRadius: 12, marginBottom: 12 }}
      />
      <h2>{siteTitle}</h2>
      <p>{tagline}</p>
      <pre style={{textAlign:'left',direction:'ltr',fontSize:12,background:'#f5f5f5',padding:8,borderRadius:8,overflowX:'auto'}}>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
}
