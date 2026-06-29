// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
    featured?: boolean;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    tagline?: string;
    description?: string;
    price?: number;
    sale_price?: number;
    main_image?: CosmicImage;
    gallery?: CosmicImage[];
    scent?: string;
    candle_type?: string;
    burn_time?: string;
    inventory_count?: number;
    stock_status?: StockStatus;
    featured?: boolean;
    category?: Category;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_text?: string;
    verified_purchase?: boolean;
    product?: Product;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Cart types
export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}