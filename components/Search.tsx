import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/fetchproducts";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Search() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searched, setSearched] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setQuery("");
    setSearched([]);
  }, [pathname]);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearched([]);
      setActiveIndex(-1);
      return;
    }
    const results = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearched(results);
    setActiveIndex(-1);
  }, [query, allProducts]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % searched.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev <= 0 ? searched.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const selected = searched[activeIndex];
      window.location.href = `/products/${selected.id}?source=${selected.source}`;
    }
  }

  return (
    <div className="w-2/3 relative max-sm:w-full">
      <input
        className="w-full h-full bg-white rounded px-2 py-1.5 focus:outline-none text-black text-sm"
        placeholder="Search a Product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searched.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-md z-50 overflow-y-auto max-h-80 custom-scrollbar">
          {searched.map((product, idx) => (
            <Link
              href={{
                pathname: `/products/${product.id}`,
                query: { source: product.source },
              }}
              key={product.id}
              className={`px-3 flex items-center gap-x-2.5 py-1 ${
                idx === activeIndex ? "bg-gray-200" : ""
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
