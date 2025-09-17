import { useState } from "react";

export const Tagline = () => {
  const [isMobile, setIsMobile] = useState(false);

  
  if (typeof window !== 'undefined') {
    const mobile = window.innerWidth < 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }

  if (isMobile) {
    return (
      <div 
        className="tagline-container bg-[#161711] rounded-xl p-4"
      >
        <div 
          className="instrument text-lg tagline-text"
        >
          Hey, <span className="italic">welcome. </span>
          I'm Naman, a software developer based in Ontario. I focus on building (and sometimes designing) high-quality websites, applications, and everything in between.
        </div>
      </div>
    );
  }

  return (
    <div className="tagline-container col-span-5 bg-[#161711] rounded-xl p-4 relative">
      <img
        src="/airpords.svg"
        alt="airpods"
        className="airpods absolute right-6"
        height={20}
        width={20}
      />

      <div className="absolute instrument bottom-12 text-xl tagline-text">
        Hey, <span className="italic">welcome. </span>
I'm Naman, a software developer based in Ontario. I focus on building (and sometimes designing) high-quality websites, applications, and everything in between.
        <p className="description">
        </p>
      </div>
   
    </div>
  );
};
