import Link from "next/link"
import Carousel from "./Carousel"
import { Product } from "@/types/product"

type Props = {
  products: Product[],
  title: string
}

export default function ProductSection({products,title}:Props){
  const additionalInfo = title
  return(
    <div className="mt-3">
      <h1 className="mb-3 text-2xl font-bold tracking-widest"><span className="text-muted">〢</span>{title}</h1>
        <div className="grid grid-flow-col auto-cols-[150px] overflow-x-auto bg-base rounded ring-1 ring-gray-300 shadow-2xs gap-0.5 custom-scrollbar p-0.5">
          {products.map((product)=>(
          <Link
            key={product.id}
            href={{
              pathname: `/products/${product.id}`,
              query: { source: product.source },
            }}
            className="p-0.5"
          >
            <Carousel product={product} title={additionalInfo}/>
          </Link>
          ))} 
        </div>
    </div>
  )
}