import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export const TransitionOverlay = () => {
  const controls = useAnimation();
  const navigatingRef = useRef(false);

  useEffect(() => {
    
    const navFlag = typeof window !== 'undefined' ? window.sessionStorage.getItem('ns-nav') : null;
    const start = async () => {
      await controls.set({ y: "0%" });
      try { window.dispatchEvent(new CustomEvent('ns-overlay-mounted')); } catch {}
      if (navFlag === 'covering') {
        
        window.sessionStorage.removeItem('ns-nav');
        await new Promise((r) => setTimeout(r, 120));
        await controls.start({ y: "-100%" , transition: { duration: 0.7, ease: 'easeInOut' } });
        try {
          (window as any).__nsUncovered = true;
          window.dispatchEvent(new CustomEvent('ns-overlay-uncovered'));
        } catch {}
      } else {
        
        const waitForReady = () => new Promise<void>((resolve) => {
          let resolved = false;
          const done = () => { if (!resolved) { resolved = true; resolve(); } };
          
          window.addEventListener('ns-page-ready', done, { once: true });
          
          if (document.readyState === 'complete') {
            setTimeout(done, 100); 
          } else {
            window.addEventListener('load', () => setTimeout(done, 100), { once: true });
          }
          
          setTimeout(done, 1200);
        });
        await waitForReady();
        await controls.start({ y: "-100%", transition: { duration: 0.8, ease: 'easeInOut' } });
        try {
          (window as any).__nsUncovered = true;
          window.dispatchEvent(new CustomEvent('ns-overlay-uncovered'));
        } catch {}
      }
    };
    start();

    const handler = async (e: Event) => {
      const custom = e as CustomEvent<{ href: string }>;
      const href = custom.detail?.href;
      if (!href || navigatingRef.current) return;
      navigatingRef.current = true;
      
      try { window.sessionStorage.setItem('ns-nav', 'covering'); } catch {}
      await controls.start({ y: "0%", transition: { duration: 0.5, ease: 'easeInOut' } });
      window.location.href = href;
    };

    window.addEventListener("page-transition", handler as EventListener);
    return () => window.removeEventListener("page-transition", handler as EventListener);
  }, [controls]);

  return (
    <motion.div
      className="ns-transition-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-[#ffe1c6] text-[#3a4664]"
      initial={{ y: "0%" }}
      animate={controls}
      style={{ willChange: "transform" }}
    >
      <div className="instrument text-5xl tracking-wide">NS</div>
    </motion.div>
  );
};

export default TransitionOverlay;


