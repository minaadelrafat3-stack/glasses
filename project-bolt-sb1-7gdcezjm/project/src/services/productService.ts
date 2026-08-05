import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ApiError } from '@/types';
import type { Product, ProductImage, ProductVariant, Category } from '@/types';

/**
 * Product service — all catalog reads go through here.
 *
 * The browser talks directly to Postgres via the Supabase anon client,
 * gated by row-level security. This module keeps query construction in one
 * place so future caching, pagination, or server-side moves are centralized.
 */

export interface ProductQuery {
  categorySlug?: string;
  shape?: Product['shape'];
  gender?: Product['gender'];
  lensType?: Product['lensType'];
  search?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating';
  page?: number;
  pageSize?: number;
}

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

/** Row shape returned by the `products_with_relations` view (future). */
interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  shape: Product['shape'];
  material: Product['material'];
  gender: Product['gender'];
  lens_type: Product['lensType'];
  price: number;
  compare_at_price: number | null;
  status: Product['status'];
  rating: number | null;
  review_count: number;
  category_ids: string[];
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    description: row.description,
    shape: row.shape,
    material: row.material,
    gender: row.gender,
    lensType: row.lens_type,
    price: row.price,
    compareAtPrice: row.compare_at_price,
    status: row.status,
    rating: row.rating,
    reviewCount: row.review_count,
    categoryIds: row.category_ids,
    images: row.images,
    variants: row.variants,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const PAGE_SIZE = 24;

export async function fetchProducts(query: ProductQuery = {}): Promise<ProductListResult> {
  if (!isSupabaseConfigured) {
    return { items: [], total: 0, page: 1, pageSize: PAGE_SIZE };
  }

  const page = Math.max(1, query.page ?? 1);
  const pageSize = query.pageSize ?? PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let req = supabase
    .from('products')
    .select('*, images:product_images(*), variants:product_variants(*)', { count: 'exact' })
    .eq('status', 'active');

  if (query.categorySlug) {
    req = req.eq('category_slug', query.categorySlug);
  }
  if (query.shape) req = req.eq('shape', query.shape);
  if (query.gender) req = req.eq('gender', query.gender);
  if (query.lensType) req = req.eq('lens_type', query.lensType);
  if (query.search) {
    req = req.or(`name.ilike.%${query.search}%,brand.ilike.%${query.search}%`);
  }

  switch (query.sort) {
    case 'price-asc':
      req = req.order('price', { ascending: true });
      break;
    case 'price-desc':
      req = req.order('price', { ascending: false });
      break;
    case 'rating':
      req = req.order('rating', { ascending: false, nullsFirst: false });
      break;
    default:
      req = req.order('created_at', { ascending: false });
  }

  req = req.range(from, to);

  const { data, error, count } = await req;

  if (error) {
    throw new ApiError(error.message, 500, error.code);
  }

  const items = (data ?? []).map((row) => mapRow(row as unknown as ProductRow));
  return { items, total: count ?? 0, page, pageSize };
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*), variants:product_variants(*)')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle();

  if (error) throw new ApiError(error.message, 500, error.code);
  if (!data) return null;
  return mapRow(data as unknown as ProductRow);
}

export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw new ApiError(error.message, 500, error.code);
  return (data ?? []) as Category[];
}
