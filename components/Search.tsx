"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/fetchproducts";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searched, setSearched] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Clear search when changing pages
  useEffect(() => {
    setQuery("");
    setSearched([]);
    setActiveIndex(-1);
  }, [pathname]);

  // Load all products
  useEffect(() => {
    getProducts()
      .then(setAllProducts)
      .catch((error) => {
        console.error("Failed to load products:", error);
      });
  }, []);

  // Search products
  useEffect(() => {
    if (!query.trim()) {
      setSearched([]);
      setActiveIndex(-1);
      return;
    }

    const searchQuery = query.toLowerCase().trim();

    const results = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );

    setSearched(results);
    setActiveIndex(-1);
  }, [query, allProducts]);

  // Keyboard navigation
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (searched.length === 0) return;

    // Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev >= searched.length - 1 ? 0 : prev + 1
      );
    }

    // Arrow Up
    else if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev <= 0 ? searched.length - 1 : prev - 1
      );
    }

    // Enter
    else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();

      const selected = searched[activeIndex];

      router.push(
        `/products/${selected.id}?source=${selected.source}`
      );
    }

    // Escape
    else if (e.key === "Escape") {
      setQuery("");
      setSearched([]);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="w-2/3 relative max-sm:w-full">

      {/* Search Input */}
      <input
        className="w-full h-full bg-white rounded px-2 py-1.5 focus:outline-none text-black text-sm"
        placeholder="Search a Product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Search Results */}
      {searched.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-md z-50 overflow-y-auto max-h-80 custom-scrollbar">

          {searched.map((product, idx) => (
            <Link
              href={{
                pathname: `/products/${product.id}`,
                query: {
                  source: product.source,
                },
              }}
              key={`${product.source}-${product.id}`}
              className={`px-3 flex items-center gap-x-2.5 py-1 transition-colors ${
                idx === activeIndex
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >

              {/* Product Image */}
              <Image
                src={product.image}
                alt={product.title}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />

              {/* Product Name */}
              <h1 className="truncate text-black text-sm">
                {product.title}
              </h1>

            </Link>
          ))}

        </div>
      )}

    </div>
  );
}