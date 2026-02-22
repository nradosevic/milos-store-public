import {
  Category,
  Tag,
  Product,
  Testimonial,
  FaqItem,
  ContactSubmission,
  PaginatedResponse,
  ProductFilters,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.rariteti.rs';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/api/categories');
}

export async function getCategoryBySlug(
  slug: string,
  page = 1,
  limit = 24
): Promise<Category & { products: PaginatedResponse<Product> }> {
  return apiFetch(`/api/categories/${slug}?page=${page}&limit=${limit}`);
}

// Products
export async function getProducts(
  filters: ProductFilters = {}
): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  const query = params.toString();
  return apiFetch<PaginatedResponse<Product>>(
    `/api/products${query ? `?${query}` : ''}`
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/api/products/featured');
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return apiFetch<Product>(`/api/products/${slug}`);
}

// Tags
export async function getTags(): Promise<Tag[]> {
  return apiFetch<Tag[]>('/api/tags');
}

export async function getTagBySlug(
  slug: string,
  page = 1,
  limit = 24
): Promise<Tag & { products: PaginatedResponse<Product> }> {
  return apiFetch(`/api/tags/${slug}?page=${page}&limit=${limit}`);
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>('/api/testimonials');
}

// FAQ
export async function getFaq(): Promise<FaqItem[]> {
  return apiFetch<FaqItem[]>('/api/faq');
}

// Settings
export async function getSetting(key: string): Promise<{ value: string }> {
  return apiFetch<{ value: string }>(`/api/settings/${key}`);
}

// Contact
export async function submitContact(data: ContactSubmission): Promise<{ success: boolean; message: string }> {
  return apiFetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Image URL helpers
export function getImageUrl(s3Key: string): string {
  if (!s3Key) return '/images/placeholder.svg';
  if (s3Key.startsWith('http')) return s3Key;
  return `${API_BASE}/uploads/${s3Key}`;
}

export function getThumbnailUrl(s3Key: string): string {
  if (!s3Key) return '/images/placeholder.svg';
  if (s3Key.startsWith('http')) return s3Key;
  return `${API_BASE}/uploads/thumbnails/${s3Key}`;
}
