import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  product: Product;
  title: string;
};

export default function Carousel({ product, title }: Props) {
  const showInfo =
    title === "Cheapest Products"
      ? <p><span className="text-[#d4aa7d] font-bold">$</span>{product.price}</p>
      : title === "Top Rated Products"
      ? <p><span className="text-[#d4aa7d] font-bold">★</span> {product.rating}/5</p>
      : "";

  return (
    <div className="rounded ring-1 ring-gray-300 bg-white shadow-2xs">
      <div>
        <div className="h-[150px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="hover:scale-105 object-contain h-full w-full mx-auto transition-transform duration-300"
          />
        </div>
        <h1 className="truncate text-xs py-0.5 px-1.5 font-bold">
          {product.title}
        </h1>
        <div className="px-1.5 text-xs text-gray-600 font-medium">{showInfo}</div>
      </div>
    </div>
  );
}
