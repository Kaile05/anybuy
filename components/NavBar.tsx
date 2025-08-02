import Link from "next/link"

export default function NavBar(){
  return(
    <header className="w-full z-100 fixed top-0 bg-dark py-3 px-6 flex items-center justify-center shadow-2xs">
      <nav className="text-base flex items-center justify-between w-3/4">
        <h1 className="text-2xl font-semibold text-muted"><span className="text-white">Any</span>Buy</h1>
        <div className="flex gap-2.5 font-urabanist text-md">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <a>Cart</a>
        </div>
      </nav>
    </header>
  )
}