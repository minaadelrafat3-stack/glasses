import type { Product, Category } from '@/types';

/**
 * Static catalog used by the storefront UI. In production these rows come from
 * the `products` / `categories` tables via the service layer; the shapes here
 * match those domain types so swapping to live data is a drop-in change.
 */

export const categories: Category[] = [
  {
    id: 'cat-optical',
    slug: 'optical',
    name: 'Optical',
    description: 'Prescription frames for everyday clarity.',
    parentId: null,
  },
  {
    id: 'cat-sunglasses',
    slug: 'sunglasses',
    name: 'Sunglasses',
    description: 'UV-protected shades in timeless silhouettes.',
    parentId: null,
  },
  {
    id: 'cat-blue-light',
    slug: 'blue-light',
    name: 'Blue Light',
    description: 'Screen-friendly lenses for digital days.',
    parentId: null,
  },
  {
    id: 'cat-readers',
    slug: 'readers',
    name: 'Readers',
    description: 'Magnifying frames for close-up focus.',
    parentId: null,
  },
];

interface CatalogProduct extends Omit<Product, 'images' | 'variants' | 'categoryIds'> {
  categorySlugs: string[];
  images: { id: string; url: string; altText: string; position: number; isAiGenerated: boolean }[];
  variants: { id: string; name: string; sizeMm: number | null; lensTint: string | null; price: number; stock: number; sku: string }[];
}

const base = (slug: string, name: string, brand: string, shape: Product['shape'], material: Product['material'], gender: Product['gender'], lensType: Product['lensType'], price: number, compareAt: number | null, rating: number | null, reviewCount: number, description: string, categorySlugs: string[], images: CatalogProduct['images'], variants: CatalogProduct['variants']): CatalogProduct => ({
  id: `prod-${slug}`,
  slug,
  name,
  brand,
  description,
  shape,
  material,
  gender,
  lensType,
  price,
  compareAtPrice: compareAt,
  status: 'active',
  rating,
  reviewCount,
  categorySlugs,
  images,
  variants,
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z',
});

export const products: CatalogProduct[] = [
  base(
    'aurora-cat-eye',
    'Aurora',
    'Vuera Studio',
    'cat-eye', 'acetate', 'women', 'single-vision',
    189, null, 4.8, 124,
    'A sculpted cat-eye frame with a subtle upswept brow line. Hand-polished Italian acetate with stainless steel hinges.',
    ['optical', 'sunglasses'],
    [
      { id: 'img-aurora-1', url: 'https://images.pexels.com/photos/29811438/pexels-photo-29811438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Aurora cat-eye frame on silk', position: 0, isAiGenerated: false },
      { id: 'img-aurora-2', url: 'https://images.pexels.com/photos/26100579/pexels-photo-26100579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Model wearing Aurora frames', position: 1, isAiGenerated: false },
      { id: 'img-aurora-3', url: 'https://images.pexels.com/photos/29811437/pexels-photo-29811437.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Aurora frame detail with gold accents', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-aurora-1', name: 'Tortoise / 52mm', sizeMm: 52, lensTint: null, price: 189, stock: 18, sku: 'VU-AUR-TT-52' },
      { id: 'var-aurora-2', name: 'Matte Black / 52mm', sizeMm: 52, lensTint: null, price: 189, stock: 12, sku: 'VU-AUR-BK-52' },
      { id: 'var-aurora-3', name: 'Crystal / 50mm', sizeMm: 50, lensTint: null, price: 199, stock: 8, sku: 'VU-AUR-CR-50' },
    ],
  ),
  base(
    'meridian-aviator',
    'Meridian',
    'Vuera Studio',
    'aviator', 'metal', 'unisex', 'sunglasses',
    219, null, 4.6, 89,
    'A modern take on the classic aviator. Lightweight titanium frame with gradient polarized lenses.',
    ['sunglasses'],
    [
      { id: 'img-meridian-1', url: 'https://images.pexels.com/photos/16625257/pexels-photo-16625257.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Meridian aviator sunglasses', position: 0, isAiGenerated: false },
      { id: 'img-meridian-2', url: 'https://images.pexels.com/photos/29271917/pexels-photo-29271917.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Model wearing Meridian sunglasses', position: 1, isAiGenerated: false },
      { id: 'img-meridian-3', url: 'https://images.pexels.com/photos/14464892/pexels-photo-14464892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Meridian sunglasses urban setting', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-meridian-1', name: 'Gold / Green Lens', sizeMm: 58, lensTint: 'Green', price: 219, stock: 22, sku: 'VU-MER-GD-GR' },
      { id: 'var-meridian-2', name: 'Silver / Grey Lens', sizeMm: 58, lensTint: 'Grey', price: 219, stock: 15, sku: 'VU-MER-SV-GY' },
      { id: 'var-meridian-3', name: 'Black / Smoke Lens', sizeMm: 58, lensTint: 'Smoke', price: 229, stock: 10, sku: 'VU-MER-BK-SM' },
    ],
  ),
  base(
    'atlas-round',
    'Atlas',
    'North Optics',
    'round', 'acetate', 'unisex', 'single-vision',
    159, 129, 4.4, 67,
    'Perfectly round lenses in a chunky acetate frame. A statement piece inspired by 1960s intellectuals.',
    ['optical', 'blue-light'],
    [
      { id: 'img-atlas-1', url: 'https://images.pexels.com/photos/36310717/pexels-photo-36310717.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Atlas round frame on stand', position: 0, isAiGenerated: false },
      { id: 'img-atlas-2', url: 'https://images.pexels.com/photos/36713202/pexels-photo-36713202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Model wearing round Atlas frames', position: 1, isAiGenerated: false },
      { id: 'img-atlas-3', url: 'https://images.pexels.com/photos/36713201/pexels-photo-36713201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Atlas frame close-up', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-atlas-1', name: 'Crystal / 48mm', sizeMm: 48, lensTint: null, price: 129, stock: 30, sku: 'VU-ATL-CR-48' },
      { id: 'var-atlas-2', name: 'Matte Black / 48mm', sizeMm: 48, lensTint: null, price: 129, stock: 25, sku: 'VU-ATL-BK-48' },
    ],
  ),
  base(
    'nova-geometric',
    'Nova',
    'Vuera Studio',
    'geometric', 'acetate', 'women', 'single-vision',
    209, null, 4.9, 156,
    'Bold geometric silhouette with sharp angular lines. For those who refuse to blend in.',
    ['optical', 'sunglasses'],
    [
      { id: 'img-nova-1', url: 'https://images.pexels.com/photos/29301758/pexels-photo-29301758.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Nova geometric sunglasses', position: 0, isAiGenerated: false },
      { id: 'img-nova-2', url: 'https://images.pexels.com/photos/26100579/pexels-photo-26100579.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Model wearing Nova frames', position: 1, isAiGenerated: false },
      { id: 'img-nova-3', url: 'https://images.pexels.com/photos/31762856/pexels-photo-31762856.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Nova sunglasses indoor', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-nova-1', name: 'Champagne / 53mm', sizeMm: 53, lensTint: null, price: 209, stock: 14, sku: 'VU-NOV-CH-53' },
      { id: 'var-nova-2', name: 'Onyx / 53mm', sizeMm: 53, lensTint: null, price: 209, stock: 9, sku: 'VU-NOV-ON-53' },
    ],
  ),
  base(
    'horizon-square',
    'Horizon',
    'North Optics',
    'square', 'titanium', 'men', 'single-vision',
    179, null, 4.5, 92,
    'Architectural square frame in featherlight titanium. Clean lines for a confident, modern look.',
    ['optical', 'blue-light'],
    [
      { id: 'img-horizon-1', url: 'https://images.pexels.com/photos/19552285/pexels-photo-19552285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Horizon square frame portrait', position: 0, isAiGenerated: false },
      { id: 'img-horizon-2', url: 'https://images.pexels.com/photos/1743545/pexels-photo-1743545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Man wearing Horizon frames', position: 1, isAiGenerated: false },
      { id: 'img-horizon-3', url: 'https://images.pexels.com/photos/17065258/pexels-photo-17065258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Horizon frame close-up', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-horizon-1', name: 'Gunmetal / 54mm', sizeMm: 54, lensTint: null, price: 179, stock: 20, sku: 'VU-HOR-GM-54' },
      { id: 'var-horizon-2', name: 'Matte Black / 54mm', sizeMm: 54, lensTint: null, price: 179, stock: 16, sku: 'VU-HOR-BK-54' },
    ],
  ),
  base(
    'lumina-oval',
    'Lumina',
    'Vuera Studio',
    'oval', 'acetate', 'women', 'single-vision',
    169, 139, 4.7, 108,
    'Soft oval frame with a gentle keyhole bridge. Universally flattering and impossibly light.',
    ['optical', 'readers'],
    [
      { id: 'img-lumina-1', url: 'https://images.pexels.com/photos/8473285/pexels-photo-8473285.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Lumina oval frame still life', position: 0, isAiGenerated: false },
      { id: 'img-lumina-2', url: 'https://images.pexels.com/photos/7860704/pexels-photo-7860704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Woman wearing Lumina frames', position: 1, isAiGenerated: false },
      { id: 'img-lumina-3', url: 'https://images.pexels.com/photos/38453638/pexels-photo-38453638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Lumina frame profile view', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-lumina-1', name: 'Rose / 51mm', sizeMm: 51, lensTint: null, price: 139, stock: 28, sku: 'VU-LUM-RS-51' },
      { id: 'var-lumina-2', name: 'Matte Black / 51mm', sizeMm: 51, lensTint: null, price: 139, stock: 19, sku: 'VU-LUM-BK-51' },
      { id: 'var-lumina-3', name: 'Tortoise / 51mm', sizeMm: 51, lensTint: null, price: 149, stock: 11, sku: 'VU-LUM-TT-51' },
    ],
  ),
  base(
    'orbit-rectangular',
    'Orbit',
    'North Optics',
    'rectangular', 'metal', 'men', 'single-vision',
    149, null, 4.3, 54,
    'Slim rectangular frame with a brushed metal finish. Understated and endlessly versatile.',
    ['optical', 'blue-light'],
    [
      { id: 'img-orbit-1', url: 'https://images.pexels.com/photos/16764124/pexels-photo-16764124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Orbit rectangular frame portrait', position: 0, isAiGenerated: false },
      { id: 'img-orbit-2', url: 'https://images.pexels.com/photos/14228163/pexels-photo-14228163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Man adjusting Orbit frames', position: 1, isAiGenerated: false },
      { id: 'img-orbit-3', url: 'https://images.pexels.com/photos/5914908/pexels-photo-5914908.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Orbit frame outdoor', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-orbit-1', name: 'Silver / 55mm', sizeMm: 55, lensTint: null, price: 149, stock: 24, sku: 'VU-ORB-SV-55' },
      { id: 'var-orbit-2', name: 'Black / 55mm', sizeMm: 55, lensTint: null, price: 149, stock: 17, sku: 'VU-ORB-BK-55' },
    ],
  ),
  base(
    'eclipse-aviator',
    'Eclipse',
    'Vuera Studio',
    'aviator', 'metal', 'unisex', 'sunglasses',
    239, null, 4.8, 73,
    'Oversized aviator with a double bridge and mirrored lenses. Maximum coverage, maximum impact.',
    ['sunglasses'],
    [
      { id: 'img-eclipse-1', url: 'https://images.pexels.com/photos/38523258/pexels-photo-38523258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Eclipse aviator sunglasses', position: 0, isAiGenerated: false },
      { id: 'img-eclipse-2', url: 'https://images.pexels.com/photos/18742635/pexels-photo-18742635.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Model wearing Eclipse sunglasses profile', position: 1, isAiGenerated: false },
      { id: 'img-eclipse-3', url: 'https://images.pexels.com/photos/5891808/pexels-photo-5891808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', altText: 'Eclipse sunglasses street style', position: 2, isAiGenerated: false },
    ],
    [
      { id: 'var-eclipse-1', name: 'Gold / Mirror Lens', sizeMm: 60, lensTint: 'Mirror', price: 239, stock: 13, sku: 'VU-ECL-GD-MR' },
      { id: 'var-eclipse-2', name: 'Black / Smoke Lens', sizeMm: 60, lensTint: 'Smoke', price: 239, stock: 9, sku: 'VU-ECL-BK-SM' },
    ],
  ),
];

export function getFeaturedProducts(): CatalogProduct[] {
  return products.filter((p) => p.rating !== null && p.rating >= 4.6).slice(0, 4);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): CatalogProduct[] {
  return products.filter((p) => p.categorySlugs.includes(slug));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): CatalogProduct[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return products
    .filter((p) => p.slug !== slug && p.categorySlugs.some((c) => product.categorySlugs.includes(c)))
    .slice(0, limit);
}

export type { CatalogProduct };
