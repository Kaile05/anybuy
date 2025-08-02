import { getSingleProduct } from "@/lib/fetchproducts";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams?: { source?: "Fake" | "Dummy" };
};

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const id = parseInt(params.id);
  const source = searchParams?.source;

  if (!source || isNaN(id)) {
    return notFound(); // No valid source or ID
  }

  try {
    const product = await getSingleProduct(id, source);

    return (
      <main className="min-h-screen p-6 bg-[#f8f8f8] flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col md:flex-row gap-6 max-w-4xl w-full">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-xl object-contain w-full max-w-xs"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <div className="text-xl font-semibold text-[#d4aa7d]">${product.price}</div>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            <span className="text-xs uppercase tracking-widest text-gray-400">
              Source: {product.source}
            </span>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return notFound();
  }
}
