'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { newArrivals } from '../data/newArrivals'; 

function NewArrivals() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: false });

  return (
    <section className="bg-[#FFFBEB] px-4 sm:px-6 lg:px-8 mb-[61px]">
      <div className="max-w-7xl mx-auto">
        <div ref={emblaRef} className="overflow-hidden cursor-grab">
          <div className="flex gap-2">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%] group relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative aspect-[474/923]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <button
                    className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-opacity ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Heart className="text-[#8D2741] w-6 h-6" />
                  </button>
                </div>

                <div className="mt-6 absolute bottom-0 left-0 right-0 bg-[#FBF7F3CC]/80 backdrop-blur-sm p-4 transition-transform transform group-hover:translate-y-0 translate-y-full">
                  <h3 className="text-xl font-normal text-[#2C2C2C]">{item.name}</h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [item.id]: prev[item.id] === size ? '' : size,
                          }))
                        }
                        className={`px-3 py-1 hover:border-[2px] hover:border-[#8D2741] rounded-[6px] text-sm ${
                          selectedSizes[item.id] === size
                            ? 'bg-[#8D2741] text-white border-[#8D2741]'
                            : 'text-[#2C2C2C] border-gray-300'
                        } transition-colors duration-200`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <p className="text-lg font-medium text-[#2C2C2C] mt-2">{item.price}</p>
                  <button className="mt-4 py-3 underline font-semibold text-[#2C2C2C] hover:text-[#701d34] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
