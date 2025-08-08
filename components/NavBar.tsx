'use client'

import Link from "next/link";
import Search from "./Search";
import { useState } from "react";


const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Cart", href: "#" }, 
];

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  function handleClick(){
    setIsNavOpen((prev)=>!prev)
  }

  const showBtn = 
    isNavOpen === false ? "☰"  : "X"

  return (
    <header className="w-full z-100 fixed top-0 bg-dark shadow-2xs">
      <div className="w-full py-3 px-6 flex items-center justify-center">
        <nav className="text-base flex items-center justify-between w-3/4 gap-3">
          <Link href="/" className="text-2xl font-semibold text-muted">
            <span className="text-white">Any</span>Buy
          </Link>

          <Search />

          <div className="flex gap-1.5 font-urbanist text-md max-sm:hidden text-white">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>

          <button 
            className="absolute md:hidden right-5 text-2xl text-white cursor-pointer z-50"
            onClick={handleClick}
          >{showBtn}</button>

          {isNavOpen && (
            <div className="absolute top-0 min-h-screen w-1/2 right-0 mt-2 bg-dark text-white flex flex-col gap-2 p-4 rounded shadow md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
