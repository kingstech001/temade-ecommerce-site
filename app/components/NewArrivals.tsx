'use client';

import { Heart, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { newArrivals } from '../data/newArrivals';
import { useCart } from '../context/CartContext'; // Import your cart context hook

type NewArrivalItem = {
  id: number;
  name: string;
  image: string;
  sizes: string[];
  price: number | string;
};

type ToastType = 'success' | 'error';

function NewArrivals() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: false });

  const { addToCart } = useCart();

  // Auto dismiss toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAddToCart = (item: NewArrivalItem) => {
    const selectedSize = selectedSizes[item.id];
    if (!selectedSize) {
      setToastType('error');
      setToastMessage('Please select a size first');
      return;
    }

    addToCart({
      id: item.id.toString(),
      name: item.name,
      image: item.image,
      price:
        typeof item.price === 'number'
          ? item.price
          : parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0,
      quantity: 1,
      size: selectedSize,
      color: 'Default',
    });

    setToastType('success');
    setToastMessage(`Added ${item.name} (Size: ${selectedSize}) to cart`);
  };

  // Toast popup component with your notification styling
  function Toast({ message, type }: { message: string; type: ToastType }) {
    return (
      <div
        className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 max-w-xs border shadow-lg rounded-lg px-5 py-3 text-sm font-semibold transition-opacity duration-300
          opacity-100 pointer-events-auto
          ${
            type === 'success'
              ? 'bg-white border-green-400 text-green-700'
              : 'bg-white border-red-400 text-red-600'
          }
        `}
        role="alert"
      >
        {type === 'success' ? (
          <CheckCircle2 className="w-6 h-6" />
        ) : (
          <span className="text-lg font-bold">!</span>
        )}
        <span>{message}</span>
      </div>
    );
  }

  return (
    <section className="bg-[#FFFBEB] px-4 sm:px-6 lg:px-8 mb-[61px] relative">
      <div className="max-w-7xl mx-auto">
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          role="list"
          aria-label="New arrivals product carousel"
        >
          <div className="flex gap-2">
            {newArrivals.map((item: NewArrivalItem) => (
              <div
                key={item.id}
                className="flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%] group relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                role="listitem"
              >
                <div className="relative aspect-[474/923]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <button
                    aria-label="Add to favorites"
                    className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-opacity ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    type="button"
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
                        type="button"
                        aria-pressed={selectedSizes[item.id] === size}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [item.id]: prev[item.id] === size ? '' : size,
                          }))
                        }
                        className={`px-3 py-1 rounded-[6px] text-sm border transition-colors duration-200 ${
                          selectedSizes[item.id] === size
                            ? 'bg-[#8D2741] text-white border-[#8D2741]'
                            : 'text-[#2C2C2C] border-gray-300 hover:border-[#8D2741]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <p className="text-lg font-medium text-[#2C2C2C] mt-2">
                    {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 py-3 underline font-semibold text-[#2C2C2C] hover:text-[#701d34] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} type={toastType} />}
    </section>
  );
}

export default NewArrivals;
