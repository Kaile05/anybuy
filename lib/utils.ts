import { Product } from "@/types/product";

export function getAllCategories(products: Product[]): string[] {
  const all = products.map((p) => p.category);
  return Array.from(new Set(all));
}

export function filterByCategory(products: Product[], category: string): Product[] {
  return products.filter((p) => p.category === category);
}