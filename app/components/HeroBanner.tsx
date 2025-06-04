'use client';

import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative h-[875px] w-full">
      <div className="absolute inset-0">
        <div className="relative h-full w-full opacity-50">
          <Image
            src="/temade-hero1.jpg"
            alt="Temade Background"
            fill
            className="object-fit"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 bg-[#36071380]" />
      </div>

      {/* Centered Container */}
      {/* <div className="relative flex h-full items-center justify-center">
        <div 
          className="flex flex-col border-2 items-center justify-center gap-8 border-3 border-white rounded-[4px] p-[100px] text-center"
          style={{
            width: '613px',
            height: '621px',
            marginTop: '127px'
          }}
        >
         
          <div className="font-garamond space-y-8 text-white">
            <h1 className=" leading-none font-medium">
              Effortless,
              <br />
              Beautiful,
              <br />
              Sustainable.
            </h1>
          </div>

          
          <button className="mt-8 flex items-center gap-2 border-2 border-white px-8 py-3 text-white transition-opacity hover:opacity-80">
            <span className="text-lg">SHOP TEMADE</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div> */}
    </section>
  );
}