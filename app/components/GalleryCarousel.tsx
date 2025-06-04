'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

function GalleryCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
    },
    [autoplay.current]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const galleryImages = [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-3.jpg',
    '/gallery-4.jpg',
    '/gallery-5.jpg',
    '/gallery-6.jpg',
    '/gallery-1.jpg',
    '/gallery-2.jpg',
  ];

  return (
    <section className="relative bg-[#FFFBEB] py-16 overflow-hidden">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#030C26] mb-4">Temade Gallery</h2>
        <p className="text-lg text-[#5C5C5C] max-w-2xl mx-auto">
          Discover moments of elegance and sustainability from our latest collections.
        </p>
      </div>

      <div ref={emblaRef} className="overflow-hidden cursor-grab">
        <div className="flex gap-6 px-6">
          {galleryImages.map((imgSrc, index) => (
            <div
              key={index}
              className="flex-[0_0_60%] sm:flex-[0_0_40%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg group">
                <Image
                  src={imgSrc}
                  alt={`Gallery item ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden lg:flex absolute top-1/2 left-6 right-6 justify-between -translate-y-1/2 z-10">
        <button
          onClick={scrollPrev}
          className="bg-[#8D2741] p-3 rounded-full shadow-md hover:scale-110 transition-all"
        >
          <ArrowLeft className="text-[#FFFBEB]" size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="bg-[#8D2741] p-3 rounded-full shadow-md hover:scale-110 transition-all"
        >
          <ArrowRight className="text-[#FFFBEB]" size={24} />
        </button>
      </div>
    </section>
  );
}

export default GalleryCarousel;
