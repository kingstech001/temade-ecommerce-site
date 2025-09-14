"use client";

import Link from "next/link";  // import Link
import { Work_Sans } from 'next/font/google';
import { useEffect, useState } from "react";
import Image from "next/image";
import { categories, categoryImages, CategoryImage } from "../data/shopCategories";

type ShopTemadeDropdownProps = {
  onClose: () => void;
  onSelect: (category: string) => void;
};

const workSans = Work_Sans({ subsets: ['latin'], weight: ['400','500','600'] });

const ShopTemadeDropdown = ({ onClose, onSelect }: ShopTemadeDropdownProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setVisible(true);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getCategoryHref = (category: string) => {
    if (category === 'All') return '/shop';
    return `/shop#${category.toLowerCase()}`;
  };

  // Three static tiles that do not change with selection
  const images = [
    { id: 'tops', href: '/shop#tops', src: '/loop-Cotton-Adire.png', alt: 'Shop Tops', label: 'Shop Tops' },
    { id: 'skirts', href: '/shop#skirts', src: '/flute-Cotton-Adire.png', alt: 'Shop Skirts', label: 'Shop Skirts' },
    { id: 'pants', href: '/shop#pants', src: '/Rectangle.jpg', alt: 'Shop Pants', label: 'Shop Pants' },
  ];

  return (
    <div className="fixed inset-0 z-20 flex top-16">
      <div className="flex-1 bg-black bg-opacity-50" onClick={handleClose} />
      <div
        className={`relative w-full max-w-[1013px] h-full bg-[#FFFBEB] px-[50px] py-8 overflow-y-auto ${workSans.className} right-0
          transform transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}`}
        style={{ willChange: "transform" }}
      >
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-black font-bold text-lg underline hover:text-[#8D2741]"
          >
            Close
          </button>
        </div>

        <div className="mt-6 flex flex-col text-[#030C26] text-lg font-normal space-y-4">
          <h2 className="font-semibold text-xl mb-2">Category</h2>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={getCategoryHref(cat)}
              onClick={() => {
                handleCategoryClick(cat);
                handleClose();
              }}
              className={`text-left transition-colors ${
                selectedCategory === cat ? "text-[#8D2741] font-semibold underline" : ""
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {images.map((img) => (
            <Link key={img.id} href={img.href} onClick={handleClose}>
              <div className="text-center cursor-pointer block">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={320}
                  height={320}
                  className="object-cover rounded-lg w-full h-[220px] sm:h-[240px] md:h-[260px]"
                />
                <p className="mt-2 text-[#030C26] text-base font-medium text-left">
                  {img.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopTemadeDropdown;
