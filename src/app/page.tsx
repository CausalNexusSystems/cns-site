"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

// ==================== TYPES ====================
type SectionKey = "top" | "modules" | "business" | "demos" | "community" | "contact";

type EcoModule = {
  acronym: string;
  fullName: string;
  badge: string;
  color: string;
  imgSrc: string;
  desc: string;
  definition: string;
  createdFor: string;
  independentUse: string;
  ecosystemUse: string;
  sectors: string[];
  signals: string[];
  outputs: string[];
  evidence: string[];
};

// ==================== NEW MODULES DATA ====================
const ECO_MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/brand/k24.1-rs.png",
    desc: "Command authority for the CNS ecosystem. Integrates module evidence and emits the final deterministic causal decision.",
    definition: "K24.1-RS is the authority layer that consolidates module-level evidence, resolves decision pressure, and produces the final system posture under a bounded runtime contract.",
    createdFor: "Created to prevent fragmented module outputs from becoming uncontrolled operational decisions. It centralizes authority without exposing the underlying kernel.",
    independentUse: "As an independent module, K24.1-RS applies where a mission system needs a deterministic authority layer to classify, approve, reject, or escalate operational states.",
    ecosystemUse: "Inside CNS, K24.1-RS is the final authority that receives evidence from NCM, MDFE, ACDK, KECS, ADIK, Iron Guardian, and SQS/DEEL before a runtime posture is emitted.",
    sectors: ["Defense operations", "Critical infrastructure", "Mission governance", "Sovereign systems"],
    signals: ["Module verdicts", "Runtime status", "Policy boundaries", "Evidence hashes"],
    outputs: ["Final decision posture", "Authority trace", "Escalation status", "Rejected-action accounting"],
    evidence: ["Decision ledger", "Run manifest", "Merkle root", "Authority chain"],
  },
  {
    acronym: "ACDK v4.1",
    fullName: "Adaptive Causal Decision Kernel",
    badge: "Decision",
    color: "#B83232",
    imgSrc: "/brand/acdk.png",
    desc: "Strategic causal decision governance for complex operating conditions, mission planning, and adaptive risk posture.",
    definition: "ACDK is the decision kernel for strategic causal interpretation. It converts multi-condition operational context into bounded decision options.",
    createdFor: "Created for environments where risk changes across time, domain, and mission priority, and where decision posture must remain explainable.",
    independentUse: "As an independent module, ACDK applies to mission planning, scenario evaluation, infrastructure prioritization, and risk-aware operational governance.",
    ecosystemUse: "Inside CNS, ACDK contributes strategic decision pressure and scenario interpretation to the sovereign authority layer.",
    sectors: ["Mission planning", "Defense analysis", "Infrastructure risk", "Emergency operations"],
    signals: ["Scenario context", "Risk indicators", "Priority rules", "Operational constraints"],
    outputs: ["Decision posture", "Risk class", "Scenario ranking", "Escalation recommendation"],
    evidence: ["Decision trace", "Criteria map", "Policy context", "Scenario audit frame"],
  },
  {
    acronym: "NCM v2.1",
    fullName: "Nexus Causal Module",
    badge: "Edge",
    color: "#00A85E",
    imgSrc: "/brand/ncm.png",
    desc: "Compact deterministic causal operation for edge devices, robotics, drones, and autonomous platforms.",
    definition: "NCM is the edge causal module. It evaluates local operational state close to the physical system without relying on cloud availability.",
    createdFor: "Created for local, embedded, or constrained environments where latency, connectivity, and autonomy are operational constraints.",
    independentUse: "As an independent module, NCM applies to drones, robotics, sensors, industrial controllers, and autonomous systems that need local bounded decisions.",
    ecosystemUse: "Inside CNS, NCM provides edge-level causal pressure and local state evidence to the full ecosystem authority chain.",
    sectors: ["Drones", "Robotics", "Embedded platforms", "Autonomous systems", "Industrial edge"],
    signals: ["Local telemetry", "Sensor state", "Edge constraints", "Latency-sensitive events"],
    outputs: ["Local verdict", "Edge risk class", "Containment hint", "State transition"],
    evidence: ["Edge event record", "Module contribution row", "Replay input", "Hash-linked output"],
  },
  {
    acronym: "MDFE v3.1",
    fullName: "Multi-Domain Fusion Engine",
    badge: "Fusion",
    color: "#6C32D4",
    imgSrc: "/brand/mdfe.png",
    desc: "Transforms fragmented operational streams into one coherent multi-domain causal context.",
    definition: "MDFE is the fusion layer that aligns heterogeneous telemetry into a coherent causal context before downstream decisions are made.",
    createdFor: "Created because critical systems rarely operate in one domain. It reduces fragmented interpretation across sensors, sectors, and operational layers.",
    independentUse: "As an independent module, MDFE applies to sensor fusion, situational awareness, infrastructure monitoring, aerospace streams, and cyber-physical correlation.",
    ecosystemUse: "Inside CNS, MDFE feeds unified cross-domain context to ACDK, KECS, K24.1-RS, and evidence packaging layers.",
    sectors: ["Sensor fusion", "Aerospace", "Energy systems", "Cyber-physical systems", "Situational awareness"],
    signals: ["Multi-domain feeds", "Sensor streams", "Temporal context", "Operational metadata"],
    outputs: ["Fused causal context", "Domain alignment", "Signal conflict flags", "Cross-domain contribution"],
    evidence: ["Fusion matrix", "Contribution rows", "Source mapping", "Hash-linked manifest"],
  },
  {
    acronym: "KECS",
    fullName: "Kinetic Entropy Coherence System",
    badge: "Coherence",
    color: "#4D94FF",
    imgSrc: "/brand/kecs.png",
    desc: "Causal coherence evaluation, kinetic entropy analysis, cascade stability, fault detection, and safe-state containment.",
    definition: "KECS is the coherence and entropy module. It evaluates whether system behavior remains structurally coherent or is drifting toward instability.",
    createdFor: "Created to identify instability before it appears as an uncontrolled effect, especially in systems where small deviations can cascade.",
    independentUse: "As an independent module, KECS applies to energy grids, industrial process control, aerospace systems, logistics networks, financial infrastructure, and safety monitoring.",
    ecosystemUse: "Inside CNS, KECS contributes coherence pressure, cascade risk, fault detection, and containment evidence to the final authority layer.",
    sectors: ["Energy grid", "Industrial control", "Aerospace systems", "Critical infrastructure", "Safety operations"],
    signals: ["Entropy drift", "Coherence loss", "Cascade indicators", "Fault signatures"],
    outputs: ["Coherence verdict", "Cascade risk", "Safe-state signal", "Containment trigger"],
    evidence: ["Entropy frame", "Coherence score", "Fault trace", "Replayable event record"],
  },
  {
    acronym: "ADIK / AetherCore",
    fullName: "Deterministic Integrity Kernel",
    badge: "Integrity",
    color: "#C85A18",
    imgSrc: "/brand/adik.png",
    desc: "Preserves trust between physical operational state and evidence-supported deterministic output.",
    definition: "ADIK is the integrity kernel that protects consistency between input state, timing, computation path, and repeatable output.",
    createdFor: "Created to reduce ambiguity between what the physical system produced, what the runtime processed, and what evidence later proves.",
    independentUse: "As an independent module, ADIK applies to physical control systems, industrial automation, robotics, aerospace instrumentation, and evidence-sensitive execution.",
    ecosystemUse: "Inside CNS, ADIK reinforces state integrity and repeatability for module outputs before they are integrated into final decisions.",
    sectors: ["Physical control", "Aerospace", "Energy infrastructure", "Robotics", "Industrial automation"],
    signals: ["Timing state", "Input consistency", "Execution path", "Output determinism"],
    outputs: ["Integrity verdict", "Repeatability status", "Timing consistency", "State validation"],
    evidence: ["Integrity seal", "Timing trace", "Input-output hash", "Deterministic proof frame"],
  },
  {
    acronym: "Iron Guardian V3",
    fullName: "Runtime Enforcement and Protection Shield",
    badge: "Protection",
    color: "#C8A84B",
    imgSrc: "/brand/iron-guardian.png",
    desc: "Runtime enforcement, containment, integrity monitoring, autonomous response logic, and bounded execution protection.",
    definition: "Iron Guardian is the runtime shield. It enforces bounded execution and protects the environment where deterministic CNS decisions operate.",
    createdFor: "Created to keep causal decisions from becoming exposed, unbounded, or unsafe at runtime when operational pressure changes.",
    independentUse: "As an independent module, Iron Guardian applies to secure compute environments, embedded protection, mission systems, industrial control, and sovereign infrastructure.",
    ecosystemUse: "Inside CNS, Iron Guardian acts as runtime executor and protection layer after authority decisions are emitted.",
    sectors: ["Secure compute", "Mission systems", "Industrial control", "Embedded protection", "Sovereign infrastructure"],
    signals: ["Runtime integrity", "Threat status", "Execution boundary", "Containment rules"],
    outputs: ["Runtime enforcement", "Containment action", "Protection status", "Escalation block"],
    evidence: ["Runtime log", "Containment trace", "Executor field", "Protection seal"],
  },
  {
    acronym: "SQS / DEEL",
    fullName: "Sealed Quality System / Deterministic Evidence and Execution Ledger",
    badge: "Evidence",
    color: "#007A6E",
    imgSrc: "/brand/sqs-deel.png",
    desc: "Sealed evidence boundaries, deterministic evidence packaging, traceability, auditability, and external review support.",
    definition: "SQS/DEEL is the evidence and ledger layer that packages CNS outputs into reviewable, sealed, and hash-verifiable records.",
    createdFor: "Created so outputs are not only operationally useful, but also inspectable after the fact by reviewers, partners, or institutional evaluators.",
    independentUse: "As an independent module, SQS/DEEL applies to audit systems, compliance workflows, evidence packaging, quality systems, and external attestation.",
    ecosystemUse: "Inside CNS, SQS/DEEL preserves the evidence chain across module outputs, final authority decisions, manifests, hashes, and audit packages.",
    sectors: ["Audit systems", "Compliance", "Institutional review", "Quality systems", "Evidence packaging"],
    signals: ["Module output", "Manifest data", "Hash records", "Disclosure boundaries"],
    outputs: ["Sealed package", "Evidence ledger", "Review packet", "Audit trace"],
    evidence: ["SHA-256", "Merkle root", "Run seal", "External audit package"],
  },
];

// ==================== UTILS ====================
function safeSrc(src?: string, fallback = "/brand/cns_logo.png") {
  if (!src) return fallback;
  const s = String(src).trim();
  return s || fallback;
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

// ==================== STYLES (from original v3) ====================
function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --cns-blue: rgba(56, 189, 248, 1);
        --glass: rgba(255, 255, 255, 0.06);
        --ring: rgba(255, 255, 255, 0.12);
      }

      html { scroll-behavior: smooth; }

      @keyframes logoPulse {
        0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(56, 189, 248, 0)); }
        55% { transform: scale(1.03); filter: drop-shadow(0 0 22px rgba(56, 189, 248, 0.28)); }
        100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(56, 189, 248, 0)); }
      }

      @keyframes netFloat {
        0% { transform: translate3d(0, 0, 0); opacity: 0.75; }
        50% { transform: translate3d(0, -10px, 0); opacity: 0.95; }
        100% { transform: translate3d(0, 0, 0); opacity: 0.8; }
      }

      @keyframes scanSweep {
        0% { transform: translateY(-40%); opacity: 0; }
        20% { opacity: 0.65; }
        100% { transform: translateY(140%); opacity: 0; }
      }

      @keyframes anticipGlow {
        0% { opacity: 0.25; }
        50% { opacity: 0.65; }
        100% { opacity: 0.25; }
      }

      @keyframes rocketBob {
        0% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
        100% { transform: translateY(0); }
      }

      @keyframes rocketLaunch {
        0% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 22px rgba(56, 189, 248, 0.25)); }
        35% { transform: translateY(-14px) scale(1.01); }
        100% { transform: translateY(-190px) scale(1.02); filter: drop-shadow(0 0 36px rgba(56, 189, 248, 0.35)); }
      }

      @keyframes flameFlicker {
        0% { transform: translateY(0) scaleY(0.9); opacity: 0.65; }
        50% { transform: translateY(2px) scaleY(1.08); opacity: 0.95; }
        100% { transform: translateY(0) scaleY(0.92); opacity: 0.7; }
      }

      @keyframes metricFadeUp {
        0% { opacity: 0; transform: translateY(8px); filter: blur(2px); }
        100% { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      @keyframes panelGlow {
        0% { opacity: 0.35; }
        50% { opacity: 0.65; }
        100% { opacity: 0.35; }
      }

      .glass {
        background: var(--glass);
        border: 1px solid var(--ring);
        backdrop-filter: blur(12px);
      }

      .btnPrimary {
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 11px 22px; border-radius: 999px;
        background: rgba(56, 189, 248, 0.18);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: white; font-size: 13px; font-weight: 600;
        transition: all 180ms ease;
      }
      .btnPrimary:hover {
        transform: translateY(-1px);
        background: rgba(56, 189, 248, 0.24);
        border-color: rgba(56, 189, 248, 0.55);
      }

      .btnGhost {
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 11px 22px; border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 500;
        transition: all 180ms ease;
      }
      .btnGhost:hover {
        background: rgba(255, 255, 255, 0.07);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .sectionTitle {
        font-size: 11px;
        letter-spacing: 0.3em;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
      }

      .module-card {
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .module-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255,255,255,0.2);
      }

      .module-modal {
        animation: modalPop 0.2s ease forwards;
      }
      @keyframes modalPop {
        from { opacity: 0; transform: scale(0.96) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `}</style>
  );
}

// ==================== BACKGROUND (from original v3 - kept intact) ====================
function CausalBackground({ intensity = 0.8, focus = "top" }: { intensity?: number; focus?: SectionKey }) {
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
        <video className="h-full w-full object-cover" src="/brand/cns_canvas.mp4" autoPlay loop muted playsInline preload="metadata" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.78) 100%)" }} />
      </div>

      <div className="absolute inset-0" style={{
        opacity: intensity,
        background: `radial-gradient(circle at ${p.x}% ${p.y}%, rgba(56,189,248,0.22), transparent 52%),
                     radial-gradient(circle at ${Math.min(95, p.x + 35)}% ${Math.max(5, p.y - 20)}%, rgba(168,85,247,0.16), transparent 54%)`,
        transition: "all 380ms ease",
      }} />

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
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g1)" strokeWidth="1" opacity="0.7" />;
          })}
          {Array.from({ length: 34 }).map((_, i) => {
            const x = (i * 89) % 1200;
            const y = (i * 53) % 700;
            const r = 1.5 + (i % 4) * 0.6;
            return <circle key={`c-${i}`} cx={x} cy={y} r={r} fill="rgba(56,189,248,0.7)" opacity="0.7" />;
          })}
        </svg>
        <div className="absolute left-0 top-0 h-[220%] w-full" style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.08) 30%, transparent 60%)",
          animation: "scanSweep 6.8s ease-in-out infinite",
        }} />
      </div>
    </div>
  );
}

// ==================== HORIZONTAL NAV (new) ====================
function TopNavigation() {
  return (
    <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-white/80">
      <button onClick={() => scrollToId("modules")} className="hover:text-white transition-colors">Modules</button>
      <button onClick={() => scrollToId("business")} className="hover:text-white transition-colors">Business</button>
      <button onClick={() => scrollToId("demos")} className="hover:text-white transition-colors">Demos</button>
      <button onClick={() => scrollToId("contact")} className="hover:text-white transition-colors">Contact</button>
    </nav>
  );
}

// ==================== ROCKET METRICS CARD (kept from original) ====================
function RocketMetricsCard() {
  const [phase, setPhase] = useState<"metrics" | "launch">("metrics");
  const t1 = useRef<number | null>(null);
  const t2 = useRef<number | null>(null);

  useEffect(() => {
    const run = () => {
      setPhase("metrics");
      if (t1.current) window.clearTimeout(t1.current);
      if (t2.current) window.clearTimeout(t2.current);
      t1.current = window.setTimeout(() => setPhase("launch"), 1600);
      t2.current = window.setTimeout(() => run(), 3200);
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
              { k: "FTTI - Failure Tolerance Time Index", v: "0.16", d: 0 },
              { k: "FN - False Negatives", v: "0.00", d: 120 },
              { k: "FP - False Positives", v: "0.01", d: 240 },
            ].map((x) => (
              <div key={x.k} className="flex items-center justify-between gap-10"
                   style={phase === "metrics" ? { animation: `metricFadeUp 520ms ease ${x.d}ms both` } : { opacity: 0.55 }}>
                <span className="text-white/75">{x.k}</span>
                <span className="font-semibold text-white">{x.v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[11px] text-white/55">Metrics surface first. Then motion.</div>
        </div>

        <div className="relative h-[210px] w-[140px]">
          <div className="absolute right-[30px] top-[10px] h-[190px] w-[2px] rounded-full bg-[rgba(56,189,248,0.18)]" />
          <div className="absolute right-0 top-[58px]" style={{
            animation: phase === "launch"
              ? "rocketLaunch 3.01s cubic-bezier(.22,.7,.25,1) both"
              : "rocketBob 1.4s ease-in-out infinite",
          }}>
            <Image src={safeSrc("/brand/rocket.png")} alt="Rocket" width={220} height={240} className="h-[170px] w-auto object-contain" priority />
            {phase === "launch" && (
              <div className="absolute left-1/2 top-[152px] -translate-x-1/2">
                <div className="h-[60px] w-[26px] rounded-full" style={{
                  background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.85), rgba(56,189,248,0.35) 35%, rgba(168,85,247,0.18) 65%, rgba(0,0,0,0) 75%)",
                  animation: "flameFlicker 200ms ease-in-out infinite",
                }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-center">
        <div className="relative h-[185px] w-[185px] overflow-hidden rounded-full ring-1 ring-white/12" style={{ boxShadow: "0 0 44px rgba(56,189,248,0.16)" }}>
          <video className="absolute inset-0 h-full w-full object-cover" src="/brand/earth_rotation.mp4" autoPlay loop muted playsInline preload="metadata" />
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

// ==================== MODULE MODAL (NEW - rich version) ====================
function ModuleModal({ module, onClose }: { module: EcoModule | null; onClose: () => void }) {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="module-modal glass w-full max-w-5xl rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-5">
          {/* Image Side */}
          <div className="md:col-span-2 bg-black/40 p-6 flex items-center justify-center">
            <div className="relative w-full aspect-square max-h-[420px]">
              <Image 
                src={safeSrc(module.imgSrc, "/brand/cns_logo.png")} 
                alt={module.acronym} 
                fill 
                className="object-contain p-8" 
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="md:col-span-3 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div style={{ color: module.color }} className="text-5xl font-bold tracking-[-1.5px]">{module.acronym}</div>
                <div className="text-2xl text-white/80 mt-1">{module.fullName}</div>
              </div>
              <button onClick={onClose} className="text-4xl text-white/40 hover:text-white leading-none">×</button>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <div className="text-xs tracking-[2px] text-white/50 mb-1.5">DEFINITION</div>
                <p className="text-white/90 leading-relaxed">{module.definition}</p>
              </div>

              <div>
                <div className="text-xs tracking-[2px] text-white/50 mb-1.5">CREATED FOR</div>
                <p className="text-white/90 leading-relaxed">{module.createdFor}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <div className="text-xs tracking-[2px] text-white/50 mb-1.5">INDEPENDENT USE</div>
                  <p className="text-white/90 leading-relaxed">{module.independentUse}</p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-white/50 mb-1.5">ECOSYSTEM USE</div>
                  <p className="text-white/90 leading-relaxed">{module.ecosystemUse}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-white/50 mb-2 tracking-widest">SECTORS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.sectors.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white/5 rounded border border-white/10">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-2 tracking-widest">SIGNALS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.signals.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white/5 rounded border border-white/10">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-2 tracking-widest">OUTPUTS</div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.outputs.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white/5 rounded border border-white/10">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-2 tracking-widest">EVIDENCE</div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.evidence.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white/5 rounded border border-white/10">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function Home() {
  const [selectedModule, setSelectedModule] = useState<EcoModule | null>(null);
  const [hoverFocus, setHoverFocus] = useState<SectionKey | null>(null);

  // For background focus (kept from original)
  const focus = hoverFocus ?? "top";

  return (
    <main className="min-h-screen text-white bg-[#03030A]">
      <GlobalStyles />
      <CausalBackground intensity={0.8} focus={focus} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#03030A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center ring-1 ring-white/20">
              <Image src="/brand/cns_logo_v2.png" alt="CNS" width={42} height={42} className="object-contain" />
            </div>
            <div>
              <div className="font-semibold text-xl tracking-tight">Causal Nexus Systems</div>
              <div className="text-[10px] text-white/50 -mt-1">SOVEREIGN DETERMINISTIC ECOSYSTEM</div>
            </div>
          </div>

          <TopNavigation />

          <button onClick={() => scrollToId("contact")} className="btnPrimary text-sm px-6 py-2.5">
            NDA Access
          </button>
        </div>
      </header>

      {/* HERO + ROCKET */}
      <section className="max-w-screen-2xl mx-auto px-6 pt-28 pb-12">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <div>
            <div className="sectionTitle mb-3">CAUSAL OBSERVABILITY • LIVE SYSTEMS</div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none">
              CNS MEASURES<br />CAUSE, NOT EFFECT.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/70">
              A sovereign deterministic causal ecosystem for high-stakes environments where decisions must be explainable, bounded, and verifiable.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={() => scrollToId("modules")} className="btnPrimary">Explore Modules</button>
              <button onClick={() => scrollToId("business")} className="btnGhost">Kernel Licensing</button>
            </div>
          </div>

          <div onMouseEnter={() => setHoverFocus("top")} onMouseLeave={() => setHoverFocus(null)}>
            <RocketMetricsCard />
          </div>
        </div>
      </section>

      {/* MODULES SECTION (NEW) */}
      <section id="modules" className="max-w-screen-2xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="mb-10">
          <div className="sectionTitle">PUBLIC MODULE LAYER</div>
          <h2 className="text-4xl font-semibold tracking-tight mt-2">Eight Sovereign Modules</h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Each module operates independently or as part of the integrated CNS ecosystem. Click any card to see full technical details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ECO_MODULES.map((mod, index) => (
            <button
              key={index}
              onClick={() => setSelectedModule(mod)}
              onMouseEnter={() => setHoverFocus("modules")}
              onMouseLeave={() => setHoverFocus(null)}
              className="module-card glass text-left rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-all group"
            >
              <div className="flex items-center justify-between mb-5">
                <div style={{ color: mod.color }} className="text-2xl font-bold tracking-tight">{mod.acronym}</div>
                <div className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: mod.color, color: mod.color, opacity: 0.8 }}>
                  {mod.badge}
                </div>
              </div>

              <div className="font-semibold text-lg mb-1 pr-4">{mod.fullName}</div>
              <p className="text-sm text-white/70 line-clamp-3 mb-6">{mod.desc}</p>

              <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors flex items-center gap-2">
                View full module details <span className="text-lg leading-none">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BUSINESS (kept from original) */}
      <section id="business" className="max-w-screen-2xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="max-w-3xl">
          <div className="sectionTitle">BUSINESS</div>
          <h2 className="text-4xl font-semibold tracking-tight mt-2">Kernel Licensing Model</h2>
          <p className="mt-4 text-white/70">
            CNS is not offered as public SaaS. The Kernel operates under strict NDA and domain-specific licensing. All public outputs are cryptographically sealed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { title: "NDA-First Access", desc: "Kernel access is granted exclusively under confidentiality agreements. No source access or reverse engineering permitted." },
            { title: "Public Proofs", desc: "Every output is sealed with SHA-256 + Merkle root verification. Full auditability without exposing internal logic." },
            { title: "High-Stakes Focus", desc: "Built for aerospace, defense, critical infrastructure, and environments where failure is not an option." },
          ].map((item, i) => (
            <div key={i} className="glass rounded-3xl p-7" onMouseEnter={() => setHoverFocus("business")} onMouseLeave={() => setHoverFocus(null)}>
              <div className="font-semibold text-xl mb-3">{item.title}</div>
              <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMOS + COMMUNITY + CONTACT (kept from original) */}
      <section id="demos" className="max-w-screen-2xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="sectionTitle mb-3">DEMOS</div>
        <h2 className="text-3xl font-semibold tracking-tight">Verified Public Demonstrations</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { label: "ASTRA Demo", url: "https://www.linkedin.com/feed/update/urn:li:activity:7415229373039230976/" },
            { label: "CNS Full Demo", url: "https://www.linkedin.com/feed/update/urn:li:activity:7397122628907417600/" },
            { label: "SQS Demo", url: "https://www.linkedin.com/feed/update/urn:li:activity:7414403427432325121/" },
          ].map((demo, i) => (
            <a key={i} href={demo.url} target="_blank" className="glass rounded-3xl p-6 hover:bg-white/5 transition block">
              <div className="font-medium">{demo.label}</div>
              <div className="text-sm text-white/60 mt-1">Open on LinkedIn →</div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-screen-2xl mx-auto px-6 py-20 border-t border-white/10 text-center">
        <div className="max-w-xl mx-auto">
          <div className="sectionTitle mb-3">CONTACT</div>
          <h2 className="text-4xl font-semibold tracking-tight">Kernel access is NDA-first.</h2>
          <p className="mt-4 text-white/70">For partnerships, licensing, and high-stakes deployments.</p>
          <a href="mailto:admin@causalnexussystems.com" className="mt-8 inline-block btnPrimary">admin@causalnexussystems.com</a>
        </div>
        <footer className="mt-20 text-xs text-white/40">© {new Date().getFullYear()} Causal Nexus Systems LLC — Public layer only</footer>
      </section>

      {/* MODULE MODAL */}
      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </main>
  );
}
