'use client';

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // triggers during scroll into view
  });

  // Transform the Y position of text and button
  const textY = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full">
        <Image
          src="/temade-hero1.jpg"
          alt="Temade Hero"
          layout="responsive"
          width={1600}
          height={1000}
          objectFit="contain"
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 bg-black/40 z-10">
        <motion.div style={{ y: textY, opacity }} className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            THE NEW COLLECTION IS HERE
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">
            Discover premium fashion made with love and heritage. Feel the vibe, wear the pride.
          </p>
        </motion.div>

        <motion.button
          style={{ y: buttonY, opacity }}
          className="mt-10 text-lg md:text-xl bg-[#8D2741] px-8 py-4 rounded-xl hover:bg-[#701d34] transition drop-shadow-lg"
        >
          SHOP THE NEW COLLECTION
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
