import type { CSSProperties } from "react";
import { useState } from "react";

type PhotoProps = {
  height?: number | string;
  className?: string;
};

export const Photo = ({ height, className }: PhotoProps) => {
  const [isMobile, setIsMobile] = useState(false);

  
  if (typeof window !== 'undefined') {
    const mobile = window.innerWidth < 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }

  return (
    <div
      className={className ?? "col-span-3 rounded-xl overflow-hidden photo w-full"}
      style={{ height: (height ?? "320px") as CSSProperties["height"] }}
    >
      <img
        src="/personal.jpg"
        alt="personal-pic"
        className="object-cover object-center w-full h-full"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width={800}
        height={800}
      />
    </div>
  );
};
