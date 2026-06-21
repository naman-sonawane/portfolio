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
        <motion.p
          className="serif"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            color: "var(--ink)",
            letterSpacing: "-0.015em",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Naman Sonawane
          <motion.span
            style={{ color: "var(--gold)", display: "inline-block", marginLeft: "0.12em" }}
            initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 280, damping: 14 }}
          >
            ✦
          </motion.span>
        </motion.p>

        <motion.div
          style={{ height: "1px", background: "var(--faint)", marginTop: "1.15rem" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "min(58vw, 20rem)", opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}
