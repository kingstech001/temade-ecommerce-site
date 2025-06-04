'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['700', '800'],
});


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
      className=" mt-[94px] bg-[#FFFBEB] md:min-h-[130vh] overflow-hidden flex justify-center items-center md:mx-16"
      style={{
        backgroundImage: "url('/section2-image.png')",
        backgroundPosition: "center 6%",
      }}
    >
      <div className='flex w-full flex-col items-center justify-center gap-8 pb-20 relative'>
        <div
          className={`${ebGaramond.className} block m-auto text-center md:flex justify-between w-full md:absolute -top-20`}
        >
          <span>
            <h2
              className=" text-[44px] font-extrabold text-[#360713] drop-shadow-lg"
            >
              PANTS
            </h2>
          </span>
          <span>
            <h2
              className=" text-[44px] font-extrabold text-[#fff] drop-shadow-lg"
            >
              DRESSES
            </h2>
          </span>
          <span>
            <h2
              className=" text-[44px] font-extrabold text-[#360713] drop-shadow-lg"
            >
              SKIRTS
            </h2>
          </span>
        </div>

        {/* Shop Now Button */}
        <button
          className="border-[2px] border-white hover:border-[#701d34] text-white px-8 py-4 rounded-lg hover:bg-[#701d34] transition flex items-center m-auto"
        >
          SHOP NOW
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}

export default CategorySection; 