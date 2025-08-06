import Image from "next/image"
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function Carousel({ product }:Props){
  return(
    <div className="rounded ring-1 ring-gray-300 bg-white shadow-2xs ">
      <div>
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="hover:scale-105 object-contain mx-auto transition-transform duration-300"
        />
        <h1 className="truncate text-xs py-0.5 px-1.5 font-bold tracking-widest">{product.title}</h1>
      </div>
    </div>
  )
}