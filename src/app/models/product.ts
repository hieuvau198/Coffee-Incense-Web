// src\app\models\product.ts
export interface Product {
  id?: string | number | null;
  title?: string | null;
  description?: string | null;
  fullDescription?: string | null;
  category?: string | null;
  image?: string | null;
  price?: number | null;
  specifications?: Record<string, string> | null;
  stock?: number | null;
  featured?: boolean | null;
}

export interface ProductDescription {
  title: string;
  description: string;
  image: string;
}

export interface ProductCategory {
  id: string | number;
  name: string;
  description?: string;
} 