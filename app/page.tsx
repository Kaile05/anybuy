import Image from "next/image";
import { getProducts } from "@/lib/fetchproducts";

export default async function Home() {
  const products = await getProducts(); // Call the function

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Fake Store Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            
            <h2 className="font-semibold text-lg mt-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
