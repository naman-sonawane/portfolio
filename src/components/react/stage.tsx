import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { database, ref, set, onValue } from "../../../lib/firebase";
import type { DataSnapshot } from "firebase/database";
import { useOverlayReady } from "./use-overlay-ready";

const EASE = [0.22, 1, 0.36, 1] as const;

type Kind = "exp" | "project" | "cert";
type Item = {
  id: string;
  kind: Kind;
  label: string;
  sub: string; // phrase shown under the name on hover
  line?: string; // one-liner in the row (experience only)
  meta?: string; // role / award shown inline
  img: string;
  link: string;
  brand?: string; // brand hex for experience underline
};

const experience: Item[] = [
  {
    id: "cohere", kind: "exp", label: "Cohere", brand: "#ff7759",
    meta: "AI / NLP Code Evaluation", sub: "AI / NLP code evaluation at Cohere",
    line: "Optimizing enterprise ML models through large-scale data validation.",
    img: "/logos/cohere.png", link: "https://cohere.com/blog/north-mini-code",
  },
  {
    id: "mit", kind: "exp", label: "Mantis AI @MIT CSAIL", brand: "#ba3d49",
    meta: "ML Research Assistant", sub: "ML research at MIT CSAIL",
    line: "LLM solutions via MCP integrations for the Mantis project.",
    img: "/logos/mit.png", link: "https://github.com/KellisLab",
  },
  {
    id: "hackcanada", kind: "exp", label: "Hack Canada", brand: "#b38168",
    meta: "UI / UX Designer", sub: "UI / UX design at Hack Canada",
    line: "Designed the experience behind 1,200+ applications and 20+ sponsors.",
    img: "/logos/hackcanada.png", link: "https://hackcanada.org",
  },
  {
    id: "codeninjas", kind: "exp", label: "Code Ninjas", brand: "#7a7a7a",
    meta: "Programming Instructor", sub: "Programming instructor at Code Ninjas",
    line: "Built interactive programming modules and curriculum for students.",
    img: "/logos/codeninjas.png", link: "https://www.codeninjas.com",
  },
];

const projects: Item[] = [
  { id: "pral", kind: "project", label: "PRAL", meta: "Best Overall, 1st",
    sub: "Autonomous drones for cinematography.",
    img: "/pral.png", link: "https://devpost.com/software/pral" },
  { id: "help", kind: "project", label: "helpidontknowhowtonetworkin", meta: "Best Gen AI Hack",
    sub: "Facial-recognition networking assistant for events.",
    img: "/helpidontknow.png", link: "https://dorahacks.io/buidl/26364/milestones" },
  { id: "eve", kind: "project", label: "Eve", meta: "Best Social Hack",
    sub: "Campus safety network with AI deterrent and safe routing.",
    img: "/eve.png", link: "https://devpost.com/software/evo-cadujv" },
  { id: "instalearn", kind: "project", label: "InstaLearn", meta: "Winner",
    sub: "ML platform that replaces the social feed with learning.",
    img: "/instalearn.png", link: "https://devpost.com/software/instalearn-sxvyz1" },
];

const certs: Item[] = [
  { id: "pcpp", kind: "cert", label: "PCPP", sub: "Certified Professional Python Programmer",
    img: "/PCPP.png", link: "https://www.credly.com/badges/25ab02d0-2662-4a94-a5ef-28ee7ddc710d/public_url" },
  { id: "pcap", kind: "cert", label: "PCAP", sub: "Certified Associate Python Programmer",
    img: "/PCAP.png", link: "https://www.credly.com/badges/7fb0fec3-eac9-4d58-9efd-bf9665301705/public_url" },
  { id: "pcep", kind: "cert", label: "PCEP", sub: "Certified Entry-Level Python Programmer",
    img: "/PCEP.png", link: "https://www.credly.com/badges/34923fe3-3193-4a8e-bad2-d8fa4575b7b7/public_url" },
  { id: "azai", kind: "cert", label: "Azure AI", sub: "Azure AI Fundamentals, Microsoft",
    img: "/AzureAI.png", link: "https://www.credly.com/badges/b00b0667-d014-41f6-8bb5-47985ecdc6e9/public_url" },
  { id: "azdata", kind: "cert", label: "Azure Data", sub: "Azure Data Fundamentals, Microsoft",
    img: "/AzureDataFunda.png", link: "https://www.credly.com/badges/965700dd-65b1-4282-8fc4-a539b84d7a0e/public_url" },
  { id: "azfun", kind: "cert", label: "Azure", sub: "Azure Fundamentals, Microsoft",
    img: "/AzureFunda.png", link: "https://www.credly.com/badges/594e6cd4-a640-4e23-9f89-ddd2ef1f664b/public_url" },
  { id: "genai", kind: "cert", label: "Databricks GenAI", sub: "Databricks Generative AI Fundamentals",
    img: "/GenAI.png", link: "https://credentials.databricks.com/520eff16-3773-49ca-bb56-02f8d08dd69d#acc.Rb5mt3j6" },
  { id: "lake", kind: "cert", label: "Databricks Lakehouse", sub: "Databricks Lakehouse Fundamentals",
    img: "/Lakehouse.png", link: "https://credentials.databricks.com/82633c06-a728-40c9-95d3-6fee7d3cf855#acc.lAaCNmgb" },
  { id: "postman", kind: "cert", label: "Postman", sub: "Postman API Fundamentals Student Expert",
    img: "/Postman.png", link: "https://badgr.com/public/assertions/lo6kFpJPS1mGhwT7cCh38Q" },
];

export const Stage = () => {
  const overlayReady = useOverlayReady();
  // `pinned` is set by click and locks the tagline until it's cleared.
  // `preview` is set by hover, but only matters when nothing is pinned.
  const [pinned, setPinned] = useState<Item | null>(null);
  const [preview, setPreview] = useState<Item | null>(null);
  const active = pinned ?? preview;

  // Click an item to pin it; click it again to unpin.
  const selectItem = (it: Item | null) =>
    setPinned((prev) => (it && prev?.id === it.id ? null : it));

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: overlayReady ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: EASE, delay },
  });

  // Row / open-link / star clicks stopPropagation, so they don't reach here.
  useEffect(() => {
    const clear = () => setPinned(null);
    document.addEventListener("click", clear);
    return () => document.removeEventListener("click", clear);
  }, []);

  return (
    <section className="grid min-h-[100svh] grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-0">
      {/* ── LEFT : identity ── */}
      <div className="flex min-w-0 flex-col justify-center">
        <motion.h1
          className="serif ink leading-[0.82] tracking-[-0.015em] text-[clamp(3.2rem,9vw,8rem)]"
          {...rise(0)}
        >
          <span className="block">Naman</span>
          <span className="block">
            Sonawane<Star />
          </span>
        </motion.h1>

        <motion.div className="mt-6 min-h-6 text-[0.95rem]" {...rise(0.4)}>
          <AnimatePresence mode="wait">
            <motion.p
              key={active ? active.id : "default"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {active ? (
                <span className="inline-flex max-w-full items-center gap-2">
                  <span className="ink font-medium">{active.sub}</span>
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${active.label}`}
                    className="open-link shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <OpenIcon />
                  </a>
                </span>
              ) : (
                <span className="muted tracking-wide">Software Developer, Ontario</span>
              )}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div className="mt-8" {...rise(0.56)}>
          <Socials />
        </motion.div>
      </div>

      {/* ── RIGHT : experience / projects / certifications ── */}
      <div className="flex min-w-0 flex-col justify-center gap-9 lg:gap-12">
        <motion.div {...rise(0.2)}>
          <p className="eyebrow mb-3.5">Experience</p>
          <div className="flex flex-col gap-3">
            {experience.map((it) => (
              <ExpRow key={it.id} item={it} active={active} onHover={setPreview} onSelect={selectItem} />
            ))}
          </div>
        </motion.div>

        <motion.div {...rise(0.32)}>
          <p className="eyebrow mb-3.5">Projects</p>
          <div className="flex flex-col gap-2.5">
            {projects.map((it) => (
              <ProjectRow key={it.id} item={it} active={active} onHover={setPreview} onSelect={selectItem} />
            ))}
          </div>
        </motion.div>

        <motion.div {...rise(0.44)}>
          <p className="eyebrow mb-3.5">Certifications</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {certs.map((it) => {
              const dim = active && active.id !== it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  aria-label={it.sub}
                  className="transition-[opacity,transform] duration-300 hover:-translate-y-0.5"
                  style={{ opacity: dim ? 0.35 : 1 }}
                  onMouseEnter={() => setPreview(it)}
                  onMouseLeave={() => setPreview(null)}
                  onClick={(e) => { e.stopPropagation(); selectItem(it); }}
                >
                  <img src={it.img} alt={it.sub} loading="lazy" className="h-9 w-9 object-contain" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Socials : 4×1 row beneath the tagline ── */
function Socials() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copyEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const addr = atob("c29uYXdhbmUubmFtYW4xNEBnbWFpbC5jb20");
    try {
      await navigator.clipboard.writeText(addr);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = addr;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        className="social-tile"
        aria-label="Copy email"
        onClick={copyEmail}
      >
        <span className={`copied-tip${copied ? " show" : ""}`}>Copied</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </button>

      <a className="social-tile" target="_blank" rel="noreferrer" href="https://github.com/naman-sonawane" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>

      <a className="social-tile" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/naman-sonawane/" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      <a className="social-tile" target="_blank" rel="noreferrer" href="https://devpost.com/naman-sonawane" aria-label="Devpost" onClick={(e) => e.stopPropagation()}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853H10.112z" />
        </svg>
      </a>
    </div>
  );
}

function ExpRow({ item, active, onHover, onSelect }: { item: Item; active: Item | null; onHover: (i: Item | null) => void; onSelect: (i: Item | null) => void }) {
  const isActive = active?.id === item.id;
  const dim = active && !isActive;
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3.5 text-left transition-[opacity] duration-300"
      style={{ opacity: dim ? 0.4 : 1 }}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onSelect(item); }}
    >
      <span className="logo-tile h-9 w-9 shrink-0 p-1.5">
        <img src={item.img} alt={item.label} loading="lazy" />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="flex min-w-0 items-baseline gap-2">
          <span
            className="truncate text-[0.95rem] font-semibold underline"
            style={{
              color: isActive ? item.brand : "var(--ink)",
              textDecorationColor: item.brand,
              textDecorationThickness: "2px",
              textUnderlineOffset: "3px",
              transition: "color 0.3s var(--ease)",
            }}
          >
            {item.label}
          </span>
          <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.12em] faint">
            {item.meta}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[0.78rem] faint">{item.line}</p>
      </div>
    </button>
  );
}

function ProjectRow({ item, active, onHover, onSelect }: { item: Item; active: Item | null; onHover: (i: Item | null) => void; onSelect: (i: Item | null) => void }) {
  const isActive = active?.id === item.id;
  const dim = active && !isActive;
  return (
    <button
      type="button"
      className="group flex w-full min-w-0 items-baseline gap-2.5 text-left transition-[opacity] duration-300"
      style={{ opacity: dim ? 0.4 : 1 }}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onSelect(item); }}
    >
      <span
        className="truncate text-[0.98rem] font-semibold"
        style={{ color: isActive ? "var(--ink)" : "var(--muted)", transition: "color 0.3s var(--ease)" }}
      >
        {item.label}
      </span>
      <span className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--gold)" }}>
        {item.meta}
      </span>
    </button>
  );
}

/* ── Small "open" affordance shown in the tagline ── */
function OpenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/* ── Star easter egg : accent after the name; cumulative clicks (persisted)
   advance its color through threshold tiers, ported from the old heart-counter ── */
type StarFill = { type: "solid"; value: string } | { type: "gradient"; value: string };

function getStarFill(clicks: number): StarFill {
  if (clicks >= 1000) return { type: "gradient", value: "starGradWhiteGray" };
  if (clicks >= 850) return { type: "gradient", value: "starGradRainbow" };
  if (clicks >= 600) return { type: "gradient", value: "starGradGold" };
  if (clicks >= 450) return { type: "gradient", value: "starGradBluePurple" };
  if (clicks >= 300) return { type: "gradient", value: "starGradGreenYellow" };
  if (clicks >= 150) return { type: "gradient", value: "starGradRedPink" };
  if (clicks >= 25) return { type: "solid", value: "#f59e0b" };
  if (clicks >= 10) return { type: "gradient", value: "starGradThemeSlate" };
  if (clicks >= 5) return { type: "gradient", value: "starGradThemeOlive" };
  if (clicks >= 1) return { type: "gradient", value: "starGradThemeSand" };
  return { type: "solid", value: "var(--faint)" };
}

function Star() {
  const [count, setCount] = useState<number | null>(null);
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    try {
      const c = window.localStorage.getItem("ns_star_clicks");
      if (c) setClicks(parseInt(c, 10) || 0);
    } catch {}
    const counterRef = ref(database, "counter");
    const unsub = onValue(counterRef, (snap: DataSnapshot) => {
      const v = snap.val();
      setCount(typeof v === "number" ? v : 0);
    });
    return () => unsub();
  }, []);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (count !== null) set(ref(database, "counter"), count + 1);
    const next = clicks + 1;
    setClicks(next);
    try { window.localStorage.setItem("ns_star_clicks", String(next)); } catch {}
    setShow(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(false), 1500);
  };

  const fill = getStarFill(clicks);
  const color = fill.type === "solid" ? fill.value : `url(#${fill.value})`;

  return (
    <span
      className="relative cursor-pointer"
      style={{ marginLeft: "0.06em", display: "inline-block", width: "0.32em", height: "0.32em", lineHeight: 0, verticalAlign: "baseline", top: "0.18em" }}
      onClick={handle}
      role="button"
      aria-label=""
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill={color}
        style={{ width: "0.32em", height: "0.32em", display: "inline-block" }}
        whileTap={{ scale: 0.72 }}
        transition={{ type: "spring", stiffness: 420, damping: 17 }}
      >
        <defs>
          <linearGradient id="starGradThemeSand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffe1c6" />
            <stop offset="100%" stopColor="#f5d4b2" />
          </linearGradient>
          <linearGradient id="starGradThemeOlive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#61643a" />
            <stop offset="100%" stopColor="#7a7d50" />
          </linearGradient>
          <linearGradient id="starGradThemeSlate" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a4664" />
            <stop offset="100%" stopColor="#5a6585" />
          </linearGradient>
          <linearGradient id="starGradRedPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="starGradGreenYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="starGradBluePurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="starGradGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="starGradRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f59e0b" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="80%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="starGradWhiteGray" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <path d="M12 1L14.53 8.52L22.46 8.6L16.09 13.33L18.47 20.9L12 16.3L5.53 20.9L7.91 13.33L1.54 8.6L9.47 8.52Z" />
      </motion.svg>
      <AnimatePresence>
        {show && count !== null && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.58rem] font-semibold tracking-wide"
            style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "Public Sans, sans-serif" }}
          >
            {count.toLocaleString()}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default Stage;
