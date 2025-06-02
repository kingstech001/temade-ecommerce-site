'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const newArrivals = [
  {
    id: 1,
    name: 'Embroidered Kaftan Dress',
    price: '₦45,000',
    size: 'M/L/XL',
    image: '/new-arrival-1.jpg'
  },
  {
    id: 2,
    name: 'Handwoven Silk Skirt',
    price: '₦32,500',
    size: 'S/M/L',
    image: '/new-arrival-2.jpg'
  },
  {
    id: 3,
    name: 'Traditional Print Pants',
    price: '₦28,900',
    size: 'One Size',
    image: '/new-arrival-3.jpg'
  }
];

function NewArrivals() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className="bg-[#FFFBEB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#8D2741] mb-12 text-center">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((item) => (
            <div 
              key={item.id}
              className="group relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[474/923]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Like Button */}
                <button
                  className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-opacity ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Heart className="text-[#8D2741] w-6 h-6" />
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-[#8D2741]">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2">{item.size}</p>
                <p className="text-lg font-bold text-[#8D2741] mt-2">
                  {item.price}
                </p>
                <button className="mt-4 w-full py-3 border-2 border-[#8D2741] text-[#8D2741] rounded-lg hover:bg-[#8D2741] hover:text-[#FFFBEB] transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;