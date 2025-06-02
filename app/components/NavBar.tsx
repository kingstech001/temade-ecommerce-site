'use client';

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFBEB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <img
            src="/temade-icon.png"
            alt="Temade Logo"
            className="h-10 w-auto"/>
          </Link>
        <div className="text-xl font-bold text-[#8D2741]">Temade</div>
        <div className="space-x-6 text-sm md:text-base text-[#030C26]">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
