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
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*
   * Fetch all products once when Search mounts
   */
  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(false);

        const products = await getProducts();

        if (mounted) {
          setAllProducts(products);
        }
      } catch (error) {
        console.error("Failed to load search products:", error);

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Clear search whenever the user changes pages
   */
  useEffect(() => {
    setQuery("");
    setActiveIndex(-1);
  }, [pathname]);

  /*
   * Search products
   */
  const searchedProducts =
    query.trim() === ""
      ? []
      : allProducts.filter((product) =>
          product.title
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        );

  /*
   * Keyboard navigation
   */
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (searchedProducts.length === 0) return;

      setActiveIndex((prev) =>
        prev >= searchedProducts.length - 1 ? 0 : prev + 1
      );

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (searchedProducts.length === 0) return;

      setActiveIndex((prev) =>
        prev <= 0 ? searchedProducts.length - 1 : prev - 1
      );

      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (
        activeIndex >= 0 &&
        activeIndex < searchedProducts.length
      ) {
        const selected = searchedProducts[activeIndex];

        router.push(
          `/products/${selected.id}?source=${selected.source}`
        );

        setQuery("");
        setActiveIndex(-1);
      }

      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();

      setQuery("");
      setActiveIndex(-1);
    }
  }

  return (
    <div className="relative w-2/3 max-sm:w-full">
      <input
        type="search"
        name="product-search"
        placeholder="Search a Product..."
        value={query}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="relative z-10 w-full h-full rounded bg-white px-2 py-1.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {/* Loading */}
      {query.trim() !== "" && loading && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded border bg-white p-3 text-sm text-gray-500 shadow-md">
          Loading products...
        </div>
      )}

      {/* Error */}
      {query.trim() !== "" && !loading && error && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded border bg-white p-3 text-sm text-red-500 shadow-md">
          Failed to load products.
        </div>
      )}

      {/* No results */}
      {query.trim() !== "" &&
        !loading &&
        !error &&
        searchedProducts.length === 0 && (
          <div className="absolute left-0 top-full z-50 mt-1 w-full rounded border bg-white p-3 text-sm text-gray-500 shadow-md">
            No products found.
          </div>
        )}

      {/* Search results */}
      {searchedProducts.length > 0 && !loading && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-80 w-full overflow-y-auto rounded border bg-white shadow-md custom-scrollbar">
          {searchedProducts.map((product, index) => (
            <Link
              key={`${product.source}-${product.id}`}
              href={{
                pathname: `/products/${product.id}`,
                query: {
                  source: product.source,
                },
              }}
              onClick={() => {
                setQuery("");
                setActiveIndex(-1);
              }}
              className={`flex items-center gap-x-2.5 px-3 py-2 transition-colors ${
                index === activeIndex
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />

              <span className="truncate text-sm text-black">
                {product.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}