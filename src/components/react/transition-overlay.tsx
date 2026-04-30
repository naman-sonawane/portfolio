import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { navigate } from "astro:transitions/client";

export const TransitionOverlay = () => {
  const controls = useAnimation();
  const navigatingRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentOverlay = overlayRef.current;
    if (currentOverlay) {
      const overlays = document.querySelectorAll('[data-ns-overlay="true"]');
      overlays.forEach((overlay) => {
        if (overlay !== currentOverlay && overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
      });
    }

    const dispatchUncovered = () => {
      try {
        (window as any).__nsUncovered = true;
        window.dispatchEvent(new CustomEvent('ns-overlay-uncovered'));
      } catch {
        // no-op
      }
    };

    const start = async () => {
      const navFlag = typeof window !== 'undefined' ? window.sessionStorage.getItem('ns-nav') : null;
      await controls.set({ y: "0%" });
      try { window.dispatchEvent(new CustomEvent('ns-overlay-mounted')); } catch {}
      if (navFlag === 'covering') {
        window.sessionStorage.removeItem('ns-nav');
        await new Promise((r) => setTimeout(r, 120));
        await controls.start({ y: "-100%" , transition: { duration: 0.7, ease: 'easeInOut' } });
        dispatchUncovered();
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
        dispatchUncovered();
      }
    };
    start();

    const handler = async (e: Event) => {
      const custom = e as CustomEvent<{ href: string }>;
      const href = custom.detail?.href;
      if (!href || navigatingRef.current) return;
      navigatingRef.current = true;

      try {
        (window as any).__nsUncovered = false;
        window.sessionStorage.setItem('ns-nav', 'covering');
      } catch {
        // no-op
      }

      try {
        await controls.start({ y: "0%", transition: { duration: 0.5, ease: 'easeInOut' } });
        await navigate(href);
        await start();
      } finally {
        navigatingRef.current = false;
      }
    };

    window.addEventListener("page-transition", handler as EventListener);
    return () => {
      window.removeEventListener("page-transition", handler as EventListener);
    };
  }, [controls]);

  return (
    <motion.div
      ref={overlayRef}
      data-ns-overlay="true"
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


