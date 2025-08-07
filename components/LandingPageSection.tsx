import { getProducts } from "@/lib/fetchproducts"
import ProductSection from "./ProductSection"

export default async function LandingPageSection() {
  const products = await getProducts()
  const cheapestProducts = [...products].sort((a,b)=>a.price - b.price).slice(0,10)
  const topRatedProducts = [...products].sort((a,b)=>b.rating - a.rating).slice(0,10)

  return(
    <section>
      <div>
        <ProductSection products={cheapestProducts} title="Cheapest Products"/>
        <ProductSection products={topRatedProducts} title="Top Rated Products"/>
      </div>
    </section>
  )
}