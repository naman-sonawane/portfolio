import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Preloader() {
  const [phase, setPhase] = useState<"intro" | "split" | "done">("intro");

  useEffect(() => {
    try {
      window.dispatchEvent(new CustomEvent("ns-overlay-mounted"));
    } catch {}

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const splitAt = reduce ? 150 : 1100;
    const doneAt = reduce ? 400 : 1880;

    const t1 = window.setTimeout(() => setPhase("split"), splitAt);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      try {
        (window as any).__nsUncovered = true;
        window.dispatchEvent(new CustomEvent("ns-overlay-uncovered"));
      } catch {}
    }, doneAt);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: "none" }}>
      {/* split panels */}
      <motion.div
        className="preloader-panel"
        style={{ top: 0 }}
        initial={{ y: 0 }}
        animate={phase === "split" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.78, ease: EASE }}
      />
      <motion.div
        className="preloader-panel"
        style={{ top: "50vh" }}
        initial={{ y: 0 }}
        animate={phase === "split" ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.78, ease: EASE }}
      />

      {/* centered mark */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: phase === "split" ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="#e06058"
          style={{ width: "clamp(2.6rem, 7vw, 4.4rem)", height: "clamp(2.6rem, 7vw, 4.4rem)" }}
          initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
        >
          <path d="M12 1L14.53 8.52L22.46 8.6L16.09 13.33L18.47 20.9L12 16.3L5.53 20.9L7.91 13.33L1.54 8.6L9.47 8.52Z" />
        </motion.svg>
      </div>
    </div>
  );
}
