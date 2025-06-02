'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

function CategorySection() {
  const sectionRef = useRef(null);

  // Set up scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Text movement effect
  const pantsY = useTransform(scrollYProgress, [0, 1], ['-80px', '50px']);
  const dressesY = useTransform(scrollYProgress, [0, 1], ['-40px', '20px']);
  const skirtsY = useTransform(scrollYProgress, [0, 1], ['-80px', '50px']);

  // Opacity effect as they come into view
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-[94px] bg-[#FFFBEB] min-h-screen overflow-hidden"
    >
      {/* Image Section */}
      <div className="mx-auto w-full max-w-[1033px] px-4 md:px-0">
        <div className="relative aspect-square md:aspect-auto md:h-[1024px]">
          <Image
            src="/section2-image.png"
            alt="Fashion Categories"
            fill
            className="object-cover"
            quality={90}
            sizes="(max-width: 768px) 90vw, 1033px"
          />
        </div>
      </div>

      {/* Animated Category Texts + Button */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] flex flex-col items-center z-10 space-y-10"
        style={{ opacity }}
      >
        {/* Text Row */}
        <div className="flex justify-center items-center gap-x-[300px] w-full">
          {/* 🔧 Adjust gap-x-[...] to control distance between texts */}

          <motion.span
            style={{ y: pantsY }}
            className="text-2xl md:text-4xl lg:text-[48px] font-bold text-white mix-blend-difference"
          >
            PANTS
          </motion.span>

          <motion.span
            style={{ y: dressesY }}
            className="text-2xl md:text-4xl lg:text-[48px] font-bold text-[#8D2741]"
          >
            DRESSES
          </motion.span>

          <motion.span
            style={{ y: skirtsY }}
            className="text-2xl md:text-4xl lg:text-[48px] font-bold text-white mix-blend-difference"
          >
            SKIRTS
          </motion.span>
        </div>

        {/* Shop Now Button */}
        <motion.button
          className="mt-8 bg-[#8D2741] text-white px-6 py-3 rounded-lg hover:bg-[#701d34] transition flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-base md:text-lg lg:text-xl font-medium">SHOP NOW</span>
          <ArrowRight className="ml-2 md:ml-[10px]" size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}

export default CategorySection;
