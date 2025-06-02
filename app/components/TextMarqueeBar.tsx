'use client';

export default function TextMarqueeBar() {
  return (
    <div className="bg-[#8D2741] h-[61px] w-full overflow-hidden relative">
      <div className="absolute inset-0 flex items-center">
        <div className="marquee-container animate-marquee whitespace-nowrap flex items-center gap-4">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-white uppercase font-WorkSans font-medium text-base leading-none tracking-normal">
                MADE TO FEEL LIKE YOU
              </span>
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}