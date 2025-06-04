'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { EB_Garamond } from 'next/font/google';
import { Work_Sans } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['700', '800'],
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // adjust weights as needed
});

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-svh md:min-h-[130vh] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/temade-hero1.jpg')",
        backgroundPosition: "center 15%",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white bg-black/40 z-10 pb-20">
        <motion.div
          
          className="flex flex-col items-center"
        >
          <h1 className={`${ebGaramond.className} text-[44px] font-extrabold drop-shadow-lg text-[#FFFFFF]`}>
            THE NEW COLLECTION IS HERE
          </h1>
          <p className={`${workSans.className} text-[15px] drop-shadow-md font-normal`}>
            Discover premium fashion made with love and heritage. Feel the vibe, wear the pride.
          </p>
          <motion.button
            style={{ y: buttonY, opacity }}
            className="flex items-center gap-2 text-[10px] sm:text-[18px]  md:text-xl hover:bg-[#8D2741] hover:border-[#8D2741] px-8 py-4 rounded-[5px] border-[2px] transition drop-shadow-lg"
          >
            SHOP THE NEW COLLECTION
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>

  );
};

export default Hero;
