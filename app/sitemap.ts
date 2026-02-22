import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rariteti.rs';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Try to fetch dynamic pages from API
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.rariteti.rs';
    const sitemapRes = await fetch(`${API_BASE}/sitemap.xml`, {
      next: { revalidate: 3600 },
    });
    if (sitemapRes.ok) {
      // If backend provides XML sitemap, we return our static pages
      // The backend sitemap.xml handles the dynamic content
    }
  } catch {
    // API unavailable — return static only
  }

  return staticPages;
}
