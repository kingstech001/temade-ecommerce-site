'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' }, 
    [Autoplay({ delay: 5000 })]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Add your image paths here
  const galleryImages = [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-1.jpg',
    '/gallery-2.jpg',
  ];

  return (
    <section className="relative bg-[#FFFBEB] py-16 overflow-hidden">
      <div 
        className="embla__viewport" 
        ref={emblaRef}
        style={{ cursor: 'grab' }}
      >
        <div className="embla__container flex transition-transform duration-500 ease-in-out">
          {galleryImages.map((imgSrc, index) => (
            <div 
              key={index}
              className="embla__slide flex-[0_0_100vw] md:flex-[0_0_50vw] px-4"
            >
              <div className="relative aspect-[720/1024] w-full">
                <Image
                  src={imgSrc}
                  alt={`Gallery item ${index + 1}`}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2} // Load first 2 images immediately
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#8D2741] p-3 rounded-full hover:bg-opacity-90 transition-all duration-300 opacity-80 hover:opacity-100"
      >
        <ArrowLeft className="text-[#FFFBEB]" size={32} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#8D2741] p-3 rounded-full hover:bg-opacity-90 transition-all duration-300 opacity-80 hover:opacity-100"
      >
        <ArrowRight className="text-[#FFFBEB]" size={32} />
      </button>
    </section>
  );
}

export default GalleryCarousel;