import { getSingleProduct, getProducts } from "@/lib/fetchproducts";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import Carousel from "@/components/Carousel";


type Props = {
  params: { id: string };
  searchParams?: { source?: "Fake" | "Dummy" };
};

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const id = parseInt(params.id);
  const source = searchParams?.source;

  if (!source || isNaN(id)) {
    return notFound(); 
  }

  try {
    const product = await getSingleProduct(id, source);
    const allProducts = await getProducts()

    const relatedProducts = allProducts
      .filter(p => p.category ===
        product.category && p.id !== product.id)

    return (
      <main className="mt-15 min-md:py-3 min-md:px-6 w-full flex items-center justify-center">
        <div className="min-md:w-3/4 max-md:px-3 w-full">
          <h1 className="mb-3 text-2xl font-bold tracking-widest"><span className="text-muted">〢</span>Product Page</h1>
          <section>
            <div className="bg-white rounded shadow-2xs flex max-md:flex-col ring-1 ring-gray-300">
              <div className="min-md:w-1/2 p-6">
                <Image
                  src={product.image}
                  alt={product.title}
                  height={300}
                  width={300}
                  className="object-contain w-full"
                />
              </div>
              <div className="min-md:w-1/2 p-6 flex-1 space-y-4 bg-base">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-gray-900"><span className="tracking-widest uppercase font-semibold">Description:</span> {product.description}</p>
                <p className="text-md text-gray-800 tracking-widest uppercase"><span className="font-semibold">Price: </span><span className="text-[#d4aa7d] font-bold">$</span>{product.price}</p>
                <p className="text-sm text-gray-600 tracking-widest uppercase"><span className="font-semibold">Rating:</span> <span className="text-[#d4aa7d] font-bold">★</span>{product.rating}/5</p>
                <p className="text-xs text-gray-500 tracking-widest uppercase"><span className="font-semibold">Category:</span> {product.category}</p>
                <Button/>
              </div>
            </div>
          </section>

          <section className="mt-3">
            <h1 className="mb-3 text-2xl font-bold tracking-widest"><span className="text-muted">〢</span>Related Products</h1>
            <div className="grid grid-flow-col auto-cols-[150px] overflow-x-auto bg-base rounded ring-1 ring-gray-300 shadow-2xs gap-0.5 custom-scrollbar">
              {relatedProducts.map((product)=>(
                <Link 
                  href={{
                          pathname: `/products/${product.id}`,
                          query: { source: product.source },
                        }}
                  key={product.id}
                  className="p-1.5"
                >
                  <Carousel product={product}/>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    return notFound();
  }
}
