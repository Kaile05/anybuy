export default function Button() {
  return (
    <button className="bg-dark text-white rounded py-3 px-6 w-full font-urbanist text-sm cursor-pointer flex items-center justify-center gap-2">
      <img src="/shoppingcart.png" alt="Cart" className="w-6 h-6 invert brightness-200" />
      Add to Cart
    </button>
  );
}
