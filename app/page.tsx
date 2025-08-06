import Link from "next/link";

export default async function Home() {

  return (
    <main className="mt-15 min-md:py-3 min-md:px-6 w-full flex items-center justify-center">
      <div className="min-md:w-3/4 max-md:px-3 w-full">
        <section className="bg-white min-h-screen w-full rounded flex items-center justify-center flex-col text-center text-black space-y-3">
          <h1 className="min-lg:text-4xl text-2xl font-bold tracking-tight">Anything You Want, <span className="bg-dark text-white px-1.5 rounded">Just a Click Away.</span></h1>
          <p className="font-urbanist text-sm font-semibold tracking-tighter px-3"><em>Shop smart with Any<span className="text-muted">Buy</span> — your all-in-one online store for everyday essentials, fashion, tech, and more.</em></p>
          <div className="flex justify-center items-center space-x-3">
            <Link href={"/products"}>
              <button className="bg-[#2d3142] py-3 px-6 text-white rounded cursor-pointer hover:bg-white hover:text-black hover:ring-1 hover:ring-black transition-colors duration-300">Shop Now</button>
            </Link>
            <button className="ring-1 ring-black py-3 px-6 text-black rounded cursor-pointer hover:bg-dark hover:text-white hover:bg-[#2d3142] transition-colors duration-300">Learn More!</button>
          </div>
        </section>
      </div>
    </main>
  );
}
