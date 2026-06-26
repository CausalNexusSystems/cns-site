"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type SectionKey = "top" | "modules" | "business" | "demos" | "community" | "contact";
type ModuleKey = "ASTRA" | "SQS" | "CAE" | "NEXA" | "NARP" | "IGNIS";

type ModuleInfo = {
  key: ModuleKey;
  name: string;
  subtitle: string;
  description: string;
  problems: string[];
  logoSrc: string;
  heroSrc?: string; // imagen grande del módulo (opcional)
  publicRuns: { label: string; url: string }[];
};

function safeSrc(src?: string, fallback = "/brand/cns_logo.png") {
  if (!src) return fallback;
  const s = String(src).trim();
  if (!s) return fallback;
  return s;
}

function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --cns-blue: rgba(56, 189, 248, 1);
        --cns-blue-soft: rgba(56, 189, 248, 0.22);
        --cns-purple-soft: rgba(168, 85, 247, 0.18);
        --glass: rgba(255, 255, 255, 0.06);
        --ring: rgba(255, 255, 255, 0.12);
      }

      html {
        scroll-behavior: smooth;
      }

      @keyframes logoPulse {
        0% {
          transform: translateZ(0) scale(1);
          filter: drop-shadow(0 0 0 rgba(56, 189, 248, 0));
        }
        55% {
          transform: translateZ(0) scale(1.03);
          filter: drop-shadow(0 0 22px rgba(56, 189, 248, 0.28));
        }
        100% {
          transform: translateZ(0) scale(1);
          filter: drop-shadow(0 0 0 rgba(56, 189, 248, 0));
        }
      }

      @keyframes netFloat {
        0% {
          transform: translate3d(0, 0, 0);
          opacity: 0.75;
        }
        50% {
          transform: translate3d(0, -10px, 0);
          opacity: 0.95;
        }
        100% {
          transform: translate3d(0, 0, 0);
          opacity: 0.8;
        }
      }

      @keyframes scanSweep {
        0% {
          transform: translateY(-40%);
          opacity: 0;
        }
        20% {
          opacity: 0.65;
        }
        100% {
          transform: translateY(140%);
          opacity: 0;
        }
      }

      @keyframes anticipGlow {
        0% {
          opacity: 0.25;
        }
        50% {
          opacity: 0.65;
        }
        100% {
          opacity: 0.25;
        }
      }

      /* --- ROCKET SEQUENCE --- */
      @keyframes rocketBob {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-6px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes rocketLaunch {
        0% {
          transform: translateY(0) scale(1);
          filter: drop-shadow(0 0 22px rgba(56, 189, 248, 0.25));
        }
        35% {
          transform: translateY(-14px) scale(1.01);
        }
        100% {
          transform: translateY(-190px) scale(1.02);
          filter: drop-shadow(0 0 36px rgba(56, 189, 248, 0.35));
        }
      }

      @keyframes flameFlicker {
        0% {
          transform: translateY(0) scaleY(0.9);
          opacity: 0.65;
        }
        50% {
          transform: translateY(2px) scaleY(1.08);
          opacity: 0.95;
        }
        100% {
          transform: translateY(0) scaleY(0.92);
          opacity: 0.7;
        }
      }

      @keyframes metricFadeUp {
        0% {
          opacity: 0;
          transform: translateY(8px);
          filter: blur(2px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes panelGlow {
        0% {
          opacity: 0.35;
        }
        50% {
          opacity: 0.65;
        }
        100% {
          opacity: 0.35;
        }
      }

      .glass {
        background: var(--glass);
        border: 1px solid var(--ring);
        backdrop-filter: blur(10px);
      }

      .btnPrimary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(56, 189, 248, 0.18);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: white;
        transition: transform 180ms ease, background 180ms ease, border 180ms ease;
      }
      .btnPrimary:hover {
        transform: translateY(-1px);
        background: rgba(56, 189, 248, 0.24);
        border: 1px solid rgba(56, 189, 248, 0.55);
      }

      .btnGhost {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9);
        transition: transform 180ms ease, background 180ms ease, border 180ms ease;
      }
      .btnGhost:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .sectionTitle {
        font-size: 12px;
        letter-spacing: 0.28em;
        color: rgba(255, 255, 255, 0.55);
      }
    `}</style>
  );
}

function useSectionSpy(keys: SectionKey[]) {
  const [active, setActive] = useState<SectionKey>("top");
  const [nextKey, setNextKey] = useState<SectionKey>("modules");

  useEffect(() => {
    const ids = keys.filter((k) => k !== "top");
    const els = ids.map((k) => document.getElementById(k)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const calc = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      let current: SectionKey = "top";
      for (const el of els) {
        const top = el.offsetTop;
        if (y + vh * 0.35 >= top) current = el.id as SectionKey;
      }

      let upcoming: SectionKey = "modules";
      for (const el of els) {
        const top = el.offsetTop;
        if (top > y + vh * 0.35) {
          upcoming = el.id as SectionKey;
          break;
        }
      }

      setActive(current);
      setNextKey(upcoming);
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    return () => window.removeEventListener("scroll", calc);
  }, [keys]);

  return { active, nextKey };
}

function scrollToId(id: SectionKey) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CausalBackground({
  intensity = 0.65,
  focus = "top",
}: {
  intensity?: number;
  focus?: SectionKey;
}) {
  const focusMap: Record<SectionKey, { x: number; y: number }> = {
    top: { x: 25, y: 20 },
    modules: { x: 22, y: 55 },
    business: { x: 65, y: 42 },
    demos: { x: 70, y: 60 },
    community: { x: 35, y: 75 },
    contact: { x: 55, y: 85 },
  };

  const p = focusMap[focus] ?? focusMap.top;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/brand/cns_canvas.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.78) 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          opacity: intensity,
          background: `radial-gradient(circle at ${p.x}% ${p.y}%, rgba(56,189,248,0.22), transparent 52%),
                       radial-gradient(circle at ${Math.min(95, p.x + 35)}% ${Math.max(
            5,
            p.y - 20
          )}%, rgba(168,85,247,0.16), transparent 54%)`,
          transition: "all 380ms ease",
        }}
      />

      <div className="absolute inset-0 opacity-70" style={{ animation: "netFloat 8s ease-in-out infinite" }}>
        <svg className="h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(56,189,248,0.22)" />
              <stop offset="1" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
          </defs>

          {Array.from({ length: 26 }).map((_, i) => {
            const x1 = (i * 47) % 1200;
            const y1 = (i * 71) % 700;
            const x2 = (x1 + 260 + (i % 7) * 18) % 1200;
            const y2 = (y1 + 190 + (i % 5) * 22) % 700;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#g1)"
                strokeWidth="1"
                opacity="0.7"
              />
            );
          })}

          {Array.from({ length: 34 }).map((_, i) => {
            const x = (i * 89) % 1200;
            const y = (i * 53) % 700;
            const r = 1.5 + (i % 4) * 0.6;
            return <circle key={`c-${i}`} cx={x} cy={y} r={r} fill="rgba(56,189,248,0.7)" opacity="0.7" />;
          })}
        </svg>

        <div
          className="absolute left-0 top-0 h-[220%] w-full"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.08) 30%, transparent 60%)",
            animation: "scanSweep 6.8s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

function PredictiveNodes({
  active,
  nextKey,
  onHover,
}: {
  active: SectionKey;
  nextKey: SectionKey;
  onHover: (k: SectionKey | null) => void;
}) {
  const items: { key: SectionKey; label: string }[] = [
    { key: "top", label: "CNS" },
    { key: "modules", label: "Modules" },
    { key: "business", label: "Business" },
    { key: "demos", label: "Demos" },
    { key: "community", label: "Community" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <div className="fixed left-6 top-[180px] z-10 hidden lg:block">
      <div className="glass rounded-2xl p-3">
        <div className="px-2 pb-2 text-[10px] tracking-[0.28em] text-white/55">PREDICTIVE NODES</div>

        <div className="grid gap-2">
          {items.map((it) => {
            const isActive = it.key === active;
            const isNext = it.key === nextKey;

            return (
              <button
                key={it.key}
                onClick={() => scrollToId(it.key)}
                onMouseEnter={() => onHover(it.key)}
                onMouseLeave={() => onHover(null)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/5"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: isActive
                      ? "rgba(56,189,248,0.95)"
                      : isNext
                      ? "rgba(56,189,248,0.55)"
                      : "rgba(255,255,255,0.22)",
                    boxShadow: isActive ? "0 0 18px rgba(56,189,248,0.35)" : "none",
                    animation: isNext ? "anticipGlow 1.8s ease-in-out infinite" : "none",
                  }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm text-white/90">{it.label}</div>
                  <div className="truncate text-[11px] text-white/45">{isActive ? "current" : isNext ? "next" : "idle"}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ModuleModal({ module, onClose }: { module: ModuleInfo | null; onClose: () => void }) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="relative p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_52%)]" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image src={safeSrc(module.logoSrc)} alt={module.name} width={80} height={80} className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">{module.name}</div>
                  <div className="text-white/65">{module.subtitle}</div>
                </div>
              </div>

              <button className="btnGhost" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="relative mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-white/80">{module.description}</div>

                <div className="mt-5 text-sm font-semibold text-white/85">Public problems solved</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {module.problems.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[rgba(56,189,248,0.7)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-sm font-semibold text-white/85">Public runs (LinkedIn)</div>
                <div className="mt-3 space-y-2">
                  {module.publicRuns.map((r) => (
                    <a
                      key={r.label}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl bg-white/5 px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/10"
                    >
                      {r.label} →
                    </a>
                  ))}
                </div>

                <div className="mt-5 text-xs text-white/50">Public layer only. Kernel internals stay protected.</div>
              </div>
            </div>

            {module.heroSrc ? (
              <div className="relative mt-6 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={safeSrc(module.heroSrc)}
                  alt={`${module.name} visual`}
                  width={1600}
                  height={900}
                  className="h-[220px] w-full object-cover md:h-[280px]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function RocketMetricsCard() {
  // secuencia: metrics -> launch -> reset (loop)
  const [phase, setPhase] = useState<"metrics" | "launch">("metrics");
  const t1 = useRef<number | null>(null);
  const t2 = useRef<number | null>(null);

  useEffect(() => {
    // metrics visible 1.6s, luego launch 1.4s, luego reset
    const run = () => {
      setPhase("metrics");
      if (t1.current) window.clearTimeout(t1.current);
      if (t2.current) window.clearTimeout(t2.current);

      t1.current = window.setTimeout(() => setPhase("launch"), 1600);
      t2.current = window.setTimeout(() => run(), 1600 + 1600); // total 3.2s loop
    };

    run();
    return () => {
      if (t1.current) window.clearTimeout(t1.current);
      if (t2.current) window.clearTimeout(t2.current);
    };
  }, []);

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.12),transparent_55%)]" />
      <div className="absolute inset-0" style={{ animation: "panelGlow 4.2s ease-in-out infinite" }} />

      <div className="relative flex items-start justify-between gap-6">
        <div className="min-w-[190px]">
          <div className="text-xs tracking-[0.28em] text-white/60">LIVE METRICS</div>

          <div className="mt-3 space-y-1 text-sm text-white/85">
            {[
              { k: "FTTI - Faliure Tolerance Time Index", v: "0.16", d: 0 },
              { k: "FN - Fasle Negatives", v: "0.00", d: 120 },
              { k: "FP - Fasle Positives", v: "0.01", d: 240 },
            ].map((x) => (
              <div
                key={x.k}
                className="flex items-center justify-between gap-10"
                style={
                  phase === "metrics"
                    ? { animation: `metricFadeUp 520ms ease ${x.d}ms both` }
                    : { opacity: 0.55, transform: "translateY(0)" }
                }
              >
                <span className="text-white/75">{x.k}</span>
                <span className="font-semibold text-white">{x.v}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-white/55">Metrics surface first. Then motion.</div>
        </div>

        {/* Rocket launch lane */}
        <div className="relative h-[210px] w-[140px]">
          {/* launch trail */}
          <div className="absolute right-[30px] top-[10px] h-[190px] w-[2px] rounded-full bg-[rgba(56,189,248,0.18)]" />
          {/* rocket */}
          <div
            className="absolute right-0 top-[58px]"
            style={{
              animation:
                phase === "launch"
                  ? "rocketLaunch 3.01s cubic-bezier(.22,.7,.25,1) both"
                  : "rocketBob 1.4s ease-in-out infinite",
            }}
          >
            <Image
              src={safeSrc("/brand/rocket.png")}
              alt="Rocket"
              width={220}
              height={240}
              className="h-[170px] w-auto object-contain"
              priority
            />

            {/* flame only during launch */}
            {phase === "launch" ? (
              <div className="absolute left-1/2 top-[152px] -translate-x-1/2">
                <div
                  className="h-[60px] w-[26px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.85), rgba(56,189,248,0.35) 35%, rgba(168,85,247,0.18) 65%, rgba(0,0,0,0) 75%)",
                    filter: "blur(0.2px)",
                    animation: "flameFlicker 200ms ease-in-out infinite",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Earth video circle */}
      <div className="relative mt-5 flex items-center justify-center">
        <div
          className="relative h-[185px] w-[185px] overflow-hidden rounded-full ring-1 ring-white/12"
          style={{ boxShadow: "0 0 44px rgba(56,189,248,0.16)" }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/brand/earth_rotation.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(56,189,248,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(168,85,247,0.10),transparent_62%)]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.42))" }} />
        </div>
      </div>

      <div className="relative mt-4 text-center text-[12px] text-white/70">
        CNS WAS CREATED TO PROTECT SYSTEMS WHERE FAILURE IS NOT AN OPTION.
      </div>
    </div>
  );
}

export default function Home() {
  const sections: SectionKey[] = ["top", "modules", "business", "demos", "community", "contact"];
  const { active, nextKey } = useSectionSpy(sections);

  const [hoverFocus, setHoverFocus] = useState<SectionKey | null>(null);
  const focus = hoverFocus ?? active;

  const modules = useMemo<ModuleInfo[]>(
    () => [
      {
        key: "ASTRA",
        name: "ASTRA",
        subtitle: "Aerospace causal autonomy",
        description:
          "Public causal observability for launch, mission, and telemetry coherence designed for aerospace systems where anticipation matters.",
        problems: [
          "Launch & mission coherence under uncertainty",
          "Telemetry gaps with structured reconstruction narratives",
          "Causal surfaces before failure becomes visible",
        ],
        logoSrc: "/brand/astra_logo.png",
        heroSrc: "/brand/astra_hero.png",
        publicRuns: [{ label: "ASTRA runs (public)", url: "https://www.linkedin.com/feed/update/urn:li:activity:7403822252661813248/" }],
      },
      {
        key: "SQS",
        name: "SQS",
        subtitle: "Shield Quantum Secure",
        description:
          "Causal security posture: observe intent surfaces before visible breach. Built for critical environments and non negotiable reliability.",
        problems: ["Intent anomalies before impact", "Integrity first defense for critical systems", "Reduced false positives under complex attack chains"],
        logoSrc: "/brand/sqs_logo.png",
        heroSrc: "/brand/sqs_hero.png",
        publicRuns: [{ label: "SQS posts (public)", url: "https://www.linkedin.com/feed/update/urn:li:activity:7393030639832387584/" }],
      },
      {
        key: "CAE",
        name: "CAE",
        subtitle: "Capital Adaptive Engine",
        description:
          "Institutional regime observability and capital flow surfaces. Public layer explains signals without exposing proprietary internals.",
        problems: ["Institutional flow regimes & transitions", "False breakouts vs real momentum surfaces", "Risk conditions before volatility expansion"],
        logoSrc: "/brand/cae_logo.png",
        heroSrc: "/brand/cae_hero.png",
        publicRuns: [
          {
            label: "CAE demos / runs (public)",
            url: "https://www.linkedin.com/feed/update/urn:li:activity:7416935443486629888/?originTrackingId=jh4L2NXOS%2BK2YOQMd8OG4w%3D%3D",
          },
        ],
      },
      {
        key: "NEXA",
        name: "NEXA",
        subtitle: "Neural Exchange Analyzer",
        description:
          "Coherence monitoring and interpretability layer for public causal narratives without revealing private kernel mechanics.",
        problems: ["Coherence drift detection", "Explainable public outputs", "Signal stability narratives"],
        logoSrc: "/brand/nexa_logo.png",
        heroSrc: "/brand/nexa_hero.png",
        publicRuns: [
          {
            label: "NEXA notes (public)",
            url: "https://www.linkedin.com/feed/update/urn:li:activity:7400582525661908992/?originTrackingId=LUiTIVvdSS26lhFQRzuFMw%3D%3D",
          },
        ],
      },
      {
        key: "NARP",
        name: "NARP",
        subtitle: "Nexus Asset Restoration Protocol",
        description:
          "Sealed outputs and integrity workflow storytelling: SHA-256 + Merkle root verification as public proof of existence and process.",
        problems: ["Integrity proofs", "Tamper evident sealing workflows", "Audit-ready public artifacts"],
        logoSrc: "/brand/narp_logo.png",
        heroSrc: "/brand/narp_hero.png",
        publicRuns: [{ label: "NARP proofs (public)", url: "https://www.linkedin.com/feed/update/urn:li:activity:7407801748838498304/" }],
      },
      {
        key: "IGNIS",
        name: "IGNIS",
        subtitle: "Stability & energy narratives",
        description:
          "Public layer stays conceptual + demo-based. Focused on stability narratives and causal surfaces no private modeling exposed.",
        problems: ["Stability narratives", "Early anomaly surfaces", "Explainable public outputs"],
        logoSrc: "/brand/ignis_logo.png",
        heroSrc: "/brand/ignis_hero.png",
        publicRuns: [{ label: "IGNIS runs (public)", url: "https://www.linkedin.com/feed/update/urn:li:activity:7411061162043396097/" }],
      },
    ],
    []
  );

  const [openModule, setOpenModule] = useState<ModuleInfo | null>(null);

  return (
    <main className="min-h-screen text-white">
      <GlobalStyles />
      <CausalBackground intensity={0.8} focus={focus} />
      <PredictiveNodes active={active} nextKey={nextKey} onHover={setHoverFocus} />

      {/* HEADER */}
      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between gap-6">
          {/* BIGGER CNS LOGO */}
          <div className="flex items-center gap-5">
            <div
              className="grid h-[84px] w-[84px] place-items-center overflow-hidden rounded-2xl ring-1 ring-white/20"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                boxShadow: "0 0 46px rgba(56,189,248,0.16)",
              }}
            >
              <div className="absolute h-[84px] w-[84px] rounded-2xl bg-[radial-gradient(circle_at_35%_35%,rgba(56,189,248,0.22),transparent_60%)]" />
              <Image
                src={safeSrc("/brand/cns_logo_v2.png")}
                alt="CNS"
                width={180}
                height={180}
                className="relative h-[60px] w-[60px] object-contain"
                style={{ animation: "logoPulse 2.8s ease-in-out infinite" }}
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="text-3xl font-semibold tracking-wide"></div>
              <div className="text-sm text-white/70">Causal Nexus Systems LLC</div>
              <div className="mt-1 text-[11px] text-white/55">
                Public Causal Observability • Sealed Outputs • Kernel Licensing • USPTO PPA #63/896,666
              </div>
            </div>
          </div>

          {/* REMOVED: top-right menu to avoid duplication with left navigation */}
          <div />
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="sectionTitle">CAUSAL OBSERVABILITY LIVE SYSTEMS</div>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              CNS MEASURES CAUSE,
              <br />
              NOT EFFECT.
            </h1>

            <p className="mt-4 max-w-xl text-white/75">
              Causal Nexus Systems (CNS) is a Next Generation Causal Intelligence ecosystem that integrates predictive models,
              multilayer telemetry analysis, and cryptographic integrity tools.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btnPrimary" onClick={() => scrollToId("modules")}>
                Explore Modules →
              </button>
              <button className="btnGhost" onClick={() => scrollToId("business")}>
                Kernel licensing model
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">Public layer</span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">Sealed outputs</span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">No kernel exposure</span>
            </div>
          </div>

          {/* PANEL DERECHO (NEW): metrics -> rocket launch + earth video */}
          <div onMouseEnter={() => setHoverFocus("top")} onMouseLeave={() => setHoverFocus(null)}>
            <RocketMetricsCard />
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="sectionTitle">PUBLIC MODULE LAYER</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Modules</h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Each module is a public window into CNS. Click a module for description + problems solved + direct LinkedIn runs.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <button
              key={m.key}
              onClick={() => setOpenModule(m)}
              onMouseEnter={() => setHoverFocus("modules")}
              onMouseLeave={() => setHoverFocus(null)}
              className="glass group rounded-3xl p-5 text-left transition hover:bg-white/7"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image src={safeSrc(m.logoSrc)} alt={m.name} width={90} height={90} className="h-10 w-10 object-contain" />
                </div>

                <div className="min-w-0">
                  <div className="text-xl font-semibold">{m.name}</div>
                  <div className="truncate text-sm text-white/65">{m.subtitle}</div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={safeSrc(m.heroSrc, "/brand/cns_banner.png")}
                  alt={`${m.name} hero`}
                  width={1400}
                  height={900}
                  className="h-[180px] w-full object-cover sm:h-[200px]"
                />
              </div>

              <div className="mt-4 line-clamp-3 text-sm text-white/75">{m.description}</div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-xs text-white/55">Open details</span>
                <span className="text-xs text-white/55">•</span>
                <a
                  href={m.publicRuns?.[0]?.url || "https://www.linkedin.com/"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-white/80 underline decoration-white/25 hover:decoration-white/60"
                >
                  LinkedIn →
                </a>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BUSINESS */}
      <section id="business" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">BUSINESS</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Kernel licensing</h2>
        <p className="mt-3 max-w-3xl text-white/72">
          CNS is not offered as a public SaaS platform.
          The Kernel Ω operates as a licensed, cloud-hosted causal engine. Access is granted exclusively under NDA and domain specific licensing agreements.
          Clients and partners interact with the Kernel through controlled interfaces, while all internal logic, causal structures, and core metrics remain fully protected.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            { t: "NDA-First Access", d: "Kernel access is granted only under strict confidentiality agreements. License scope is defined per domain, use case, and operational boundary. No source acces, reverse engineering, or internal inspection is permitted. " },
            { t: "Public Proofs", d: "All public outputs are cryptographically sealed. CNS uses (SHA-256) Hashing and Merkle root verification to provide public, immutable proof of execution and process integrity without exposing private Kernel mechanics." },
            { t: "High-Stakes Focus", d: "CNS is designed for systems wherw failure is not an option. Aerospace, critical infrastructure, financial, healthcare, and security sensitive envirments demand causal coherence not post event analysis." },
          ].map((x, i) => (
            <div
              key={i}
              className="glass rounded-3xl p-5"
              onMouseEnter={() => setHoverFocus("business")}
              onMouseLeave={() => setHoverFocus(null)}
            >
              <div className="text-lg font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-white/70">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMOS */}
      <section id="demos" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">DEMOS</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Verified Public Demonstrations</h2>
        <p className="mt-3 max-w-3xl text-white/72">
          Public evidence of operational capability. Internal logic remains protected.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            { t: "ASTRA Demo Video", href: "https://www.linkedin.com/feed/update/urn:li:activity:7415229373039230976/?originTrackingId=FGEVJIaAS6W5Rru5i8k86A%3D%3D" },
            { t: "CNS Demo Video", href: "https://www.linkedin.com/feed/update/urn:li:activity:7397122628907417600/?originTrackingId=w2p8yHxGQDGEbCIezI0p2A%3D%3D" },
            { t: "SQS Demo Video", href: "https://www.linkedin.com/feed/update/urn:li:activity:7414403427432325121/?originTrackingId=Gcwey0hSRZedKtmuk7ekbA%3D%3D" },
          ].map((d, i) => (
            <a
              key={i}
              href={d.href}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-3xl p-5 transition hover:bg-white/7"
              onMouseEnter={() => setHoverFocus("demos")}
              onMouseLeave={() => setHoverFocus(null)}
            >
              <div className="text-lg font-semibold">{d.t}</div>
              <div className="mt-2 text-sm text-white/70">Open →</div>
            </a>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">COMMUNITY</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Build the Public Layer</h2>
        <p className="mt-3 max-w-3xl text-white/72">
          Community features can grow here (comments, updates, public runs feed). For now: a clean public entry point.
        </p>

        <div
          className="glass mt-7 rounded-3xl p-6"
          onMouseEnter={() => setHoverFocus("community")}
          onMouseLeave={() => setHoverFocus(null)}
        >
          <div className="text-white/80">Coming soon: public runs feed + pinned updates.</div>
          <div className="mt-2 text-sm text-white/60">CNS keeps the public layer transparent without exposing kernel internals.</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">CONTACT</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Contact</h2>
        <p className="mt-3 max-w-3xl text-white/72">
          For partnerships, licensing, and high stakes deployments reach out Public layer only kernel access is NDA first.
        </p>

        <div
          className="glass mt-7 rounded-3xl p-6"
          onMouseEnter={() => setHoverFocus("contact")}
          onMouseLeave={() => setHoverFocus(null)}
        >
          <div className="text-white/85">Email: admin@causalnexussystems.com</div>
          <div className="mt-2 text-sm text-white/60"></div>
        </div>

        <footer className="mt-10 pb-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Causal Nexus Systems LLC
        </footer>
      </section>

      <ModuleModal module={openModule} onClose={() => setOpenModule(null)} />
    </main>
  );
}
