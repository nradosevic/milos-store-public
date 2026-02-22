// Data entity types for Rariteti.rs

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  depth: number;
  sortOrder: number;
  isActive: boolean;
  parentId?: string;
  children?: Category[];
  productCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export interface ProductImage {
  id: string;
  s3Key: string;
  thumbnailS3Key?: string;
  originalName: string;
  altText?: string;
  isMain: boolean;
  sortOrder: number;
  url?: string;
  thumbnailUrl?: string;
}

export type ProductCondition = 'Odlično' | 'Vrlo dobro' | 'Dobro' | 'Prihvatljivo';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  priceOnRequest?: boolean;
  year?: number;
  condition?: ProductCondition;
  origin?: string;
  dimensions?: string;
  material?: string;
  author?: string;
  publisher?: string;
  period?: string;
  hiddenFields?: string[];
  customFields?: Record<string, string>;
  fieldDisplayOrder?: string[];
  isUnique?: boolean;
  stock?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  isSold?: boolean;
  sortOrder?: number;
  images?: ProductImage[];
  tags?: Tag[];
  category?: Category;
  categoryBreadcrumb?: Category[];
  relatedProducts?: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  type: string;
}

export interface Testimonial {
  id: string;
  text: string;
  authorName: string;
  source?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

export interface ContactSubmission {
  name?: string;
  email?: string;
  phone?: string;
  message: string;
  productSlug?: string;
  productTitle?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  categorySlug?: string;
  tags?: string;
  yearMin?: number;
  yearMax?: number;
  condition?: string;
  priceMin?: number;
  priceMax?: number;
  isUnique?: boolean;
  isSold?: boolean;
  search?: string;
  sortBy?: 'price' | 'year' | 'createdAt' | 'sortOrder';
  sortDir?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
