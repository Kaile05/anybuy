import { getProducts } from "@/lib/fetchproducts";
import { getAllCategories, filterByCategory } from "@/lib/utils";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: { category?: string }
}

export default async function ProductPage({ searchParams }: Props){
  const products = await getProducts()
  const category = searchParams.category || "All"
  const categories = getAllCategories(products)
  const filtered = category === "All" ? 
    products : filterByCategory(products, category)

  return(
    <main className="mt-15 min-md:py-3 min-md:px-6 w-full flex items-center justify-center">
      <div className="min-md:w-3/4 max-md:px-3">
        <h1 className="mb-3 text-2xl font-bold tracking-widest"><span className="text-white">〢</span>Products</h1>


        <div className="flex flex-wrap items-center justify-center gap-2 my-2">
          {["All",...categories].map((cat)=>(
            <a
              key={cat}
              href={`?category=${encodeURIComponent(cat)}`}
              className={`px-1 py-0.5 text-sm max-md:text-xs uppercase font-semibold tracking-tighter transition-colors duration-200 hover:text-[#d4aa7d] 
                ${cat === category
                  ? "text-[#d4aa7d] underline"
                  : "text-black"
                }`}
            >
              {cat}           
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-3 min-lg:grid-cols-5 gap-1.5 grid-cols-2">
          {filtered.map((product)=>(
            <Link
              href={{
                    pathname: `/products/${product.id}`,
                    query: { source: product.source },
                  }}
              key={product.id}
              className="bg-white rounded py-2 px-2 shadow-2xs"
              >
              <div className="h-[150px] overflow-hidden">
                <Image
                  alt={product.title}
                  src={product.image}
                  width={150}
                  height={150}      
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <h1 className="truncate text-md font-bold mt-1.5 tracking-tighter">{product.title}</h1>
                <h2 className="font-space-grotesk text-gray-600 text-sm tracking-tight font-semibold"><span className="text-[#d4aa7d]">$ </span>{product.price}</h2>
                <h2 className="font-space-grotesk text-xs text-gray-500"><span className="text-[#d4aa7d]">★</span>{product.rating}/5</h2>
                <Button/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}