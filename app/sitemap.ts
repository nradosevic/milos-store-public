import type { MetadataRoute } from 'next';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.rariteti.rs';
const BASE_URL = 'https://rariteti.rs';

export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/prodavnica`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Fetch all products
    const productsRes = await fetch(`${API_BASE}/api/products?limit=10000&isSold=false`, {
      next: { revalidate: 3600 },
    });
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      const products = productsData.data || [];
      for (const product of products) {
        staticPages.push({
          url: `${BASE_URL}/proizvod/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }

    // Fetch all categories
    const categoriesRes = await fetch(`${API_BASE}/api/categories`, {
      next: { revalidate: 3600 },
    });
    if (categoriesRes.ok) {
      const categories = await categoriesRes.json();
      const flatCategories = flattenCategories(categories);
      for (const category of flatCategories) {
        staticPages.push({
          url: `${BASE_URL}/prodavnica?kategorija=${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch {
    // API unavailable — return static only
  }

  return staticPages;
}

function flattenCategories(categories: any[]): any[] {
  const result: any[] = [];
  for (const cat of categories) {
    result.push(cat);
    if (cat.children?.length) {
      result.push(...flattenCategories(cat.children));
    }
  }
  return result;
}
