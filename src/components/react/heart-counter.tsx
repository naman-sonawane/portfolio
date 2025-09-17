import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const HeartCounter = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWoah, setShowWoah] = useState(false);
  const [woahTrigger, setWoahTrigger] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const LOCAL_STORAGE_KEY = "heartLocalCount";

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      const initial = raw ? parseInt(raw, 10) : 0;
      if (!Number.isNaN(initial)) {
        setCount(initial);
      }
    } catch {
      // ignore storage errors
    }
  }, []);


  const handleHeartClick = () => {
    const next = count + 1;
    setCount(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, String(next));
      }
    } catch {
    }
    console.log("HeartCounter: next=", next, "fill=", (() => {
      if (next >= 300) return "white";
      if (next >= 200) return "blue-purple";
      if (next >= 100) return "green-yellow";
      if (next >= 20) return "red-pink";
      return "white";
    })());
    if (next % 20 === 0) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPos({ top: rect.top, left: rect.left + rect.width / 2 });
      } else {
        setTooltipPos(null);
      }
      setShowWoah(true);
      setWoahTrigger((t) => t + 1);
    }
    
    
    if (!isAnimating) {
      setIsAnimating(true);
      gsap.to(".heart-button", {
        scale: 1.3,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setIsAnimating(false);
        }
      });
    }

    
    gsap.fromTo(".heart-counter", 
      { scale: 1.2 },
      { 
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      }
    );
  };

  const getHeartFill = () => {
    if (count >= 1000) {
      return { type: "gradient" as const, value: "heartGradWhiteGray" };
    }
    if (count >= 850) {
      return { type: "gradient" as const, value: "heartGradRainbow" };
    }
    if (count >= 600) {
      return { type: "gradient" as const, value: "heartGradGold" };
    }
    if (count >= 450) {
      return { type: "gradient" as const, value: "heartGradBluePurple" };
    }
    if (count >= 300) {
      return { type: "gradient" as const, value: "heartGradGreenYellow" };
    }
    if (count >= 150) {
      return { type: "gradient" as const, value: "heartGradRedPink" };
    }
    if (count >= 25) {
      return { type: "solid" as const, value: "#f59e0b" };
    }
    if (count >= 10) {
      return { type: "gradient" as const, value: "heartGradThemeSlate" };
    }
    if (count >= 5) {
      return { type: "gradient" as const, value: "heartGradThemeOlive" };
    }
    if (count >= 1) {
      return { type: "gradient" as const, value: "heartGradThemeSand" };
    }
    return { type: "solid" as const, value: "#ffe1c6" };
  };

  const getButtonGradientClasses = () => {
    if (count >= 300) {
      return {
        base: "from-white to-white",
        hover: "hover:from-white hover:to-white",
      };
    }
    if (count >= 200) {
      return {
        base: "from-blue-500 to-purple-500",
        hover: "hover:from-blue-600 hover:to-purple-600",
      };
    }
    if (count >= 100) {
      return {
        base: "from-green-500 to-yellow-500",
        hover: "hover:from-green-600 hover:to-yellow-600",
      };
    }
    if (count >= 20) {
      return {
        base: "from-pink-500 to-red-500",
        hover: "hover:from-pink-600 hover:to-red-600",
      };
    }
    return {
      base: "from-pink-500 to-red-500",
      hover: "hover:from-pink-600 hover:to-red-600",
    };
  };

  return (
    <div className="heart-container h-full bg-[#161711] rounded-xl p-4 flex items-center justify-center">
      <div className="relative flex items-center gap-3">
        <button
          onClick={handleHeartClick}
          className={`heart-button relative bg-gradient-to-r ${getButtonGradientClasses().base} ${getButtonGradientClasses().hover} text-white p-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25 active:scale-95`}
          ref={buttonRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={(e) => setTooltipPos({ top: e.clientY, left: e.clientX })}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={`animate-pulse ${count >= 1000 ? 'spin-slow' : ''}`}
          >
            <defs>
              <linearGradient id="heartGradRedPink" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="heartGradGreenYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="heartGradBluePurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="heartGradThemeSand" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe1c6" />
                <stop offset="100%" stopColor="#f5d4b2" />
              </linearGradient>
              <linearGradient id="heartGradThemeOlive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#61643a" />
                <stop offset="100%" stopColor="#7a7d50" />
              </linearGradient>
              <linearGradient id="heartGradThemeSlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a4664" />
                <stop offset="100%" stopColor="#5a6585" />
              </linearGradient>
              <linearGradient id="heartGradGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="heartGradWhiteGray" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
              <linearGradient id="heartGradRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="20%" stopColor="#f59e0b" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="60%" stopColor="#22c55e" />
                <stop offset="80%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={(() => {
                const fill = getHeartFill();
                return fill.type === "solid" ? fill.value : `url(#${fill.value})`;
              })()}
            />
          </svg>
        </button>
        
        <span className="heart-counter text-2xl text-white font-light">
          {count}
        </span>
      </div>
      {showWoah && isHovering && (
        createPortal(
          <div
            className="woah-popup fixed bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow-xl ring-1 ring-white/20 z-[9999] pointer-events-none whitespace-nowrap"
            style={{
              top: tooltipPos ? tooltipPos.top - 10 : undefined,
              left: tooltipPos ? tooltipPos.left : undefined,
              transform: "translate(-50%, -140%)",
            }}
          >
            woah: that fades away after 3 secs
          </div>,
          document.body
        )
      )}
    </div>
  );
};

