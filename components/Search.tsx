"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  // Fetch products once when the component mounts
  useEffect(() => {
    async function loadProducts() {
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          fetch("https://dummyjson.com/products"),
          fetch("https://fakestoreapi.com/products"),
        ]);

        if (!dummyRes.ok || !fakeRes.ok) {
          throw new Error("Failed to fetch products");
        }

        const dummyData = await dummyRes.json();
        const fakeData = await fakeRes.json();

        const dummyProducts: Product[] = dummyData.products.map(
          (item: any) => ({
            id: item.id + 1000,
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            image: item.thumbnail,
            rating: item.rating,
            source: "Dummy",
          })
        );

        const fakeProducts: Product[] = fakeData.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          rating: item.rating?.rate || 0,
          source: "Fake",
        }));

        setAllProducts([...dummyProducts, ...fakeProducts]);
      } catch (error) {
        console.error("Search product fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Clear search when navigating to another page
  useEffect(() => {
    setQuery("");
    setActiveIndex(-1);
  }, [pathname]);

  const searched = query.trim()
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (searched.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev < searched.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((prev) =>
        prev <= 0 ? searched.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0) {
        const selected = searched[activeIndex];

        window.location.href =
          `/products/${selected.id}?source=${selected.source}`;
      }
    }

    if (e.key === "Escape") {
      setQuery("");
      setActiveIndex(-1);
    }
  }

  return (
    <div className="w-2/3 relative max-sm:w-full">
      <input
        type="text"
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        className="w-full h-full bg-white rounded px-2 py-1.5 focus:outline-none text-black text-sm"
        placeholder="Search a Product..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
      />

      {loading && query.trim() !== "" && (
        <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-md z-50 p-3 text-sm text-gray-500">
          Loading products...
        </div>
      )}

      {!loading &&
        query.trim() !== "" &&
        searched.length === 0 && (
          <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-md z-50 p-3 text-sm text-gray-500">
            No products found.
          </div>
        )}

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
              className={`px-3 flex items-center gap-x-2.5 py-2 ${
                idx === activeIndex
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <Image
                src={product.image}
                alt={product.title}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />

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