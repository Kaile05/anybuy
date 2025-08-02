import { getProducts } from "@/lib/fetchproducts";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage(){
  const products = await getProducts()
  return(
    <main className="mt-15 min-md:py-3 min-md:px-6 w-full flex items-center justify-center">
      <div className="min-md:w-3/4 px-3">
        <h1 className="mb-3 text-2xl font-bold"><span className="text-white">〢</span>Products</h1>
        <div className="grid md:grid-cols-3 min-lg:grid-cols-5 gap-1.5 grid-cols-2">
          {products.map((product)=>(
            <div 
              key={product.id}
              className="bg-white rounded py-2 px-2"
              >
              <div className="h-[150px] w-[150px] overflow-hidden">
                <Image
                  alt={product.title}
                  src={product.image}
                  width={150}
                  height={150}      
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h1 className="font-urbanist truncate text-md font-semibold mt-1.5">{product.title}</h1>
                <h2 className="font-space-grotesk">${product.price}</h2>
                <Link
                  href={{
                    pathname: `/products/${product.id}`,
                    query: { source: product.source },
                  }}
                  className="underline text-sm text-slate-700 cursor-pointer"
                >
                  View Details⇁
                </Link>
                <Button/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}