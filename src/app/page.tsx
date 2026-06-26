"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

// ==================== MODULES ====================
const ECO_MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/brand/06-K24_1-RS.png",
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
    imgSrc: "/brand/04-ACDK.png",
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
    imgSrc: "/brand/09-NCM.png",
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
    imgSrc: "/brand/08-MDFE.png",
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
    imgSrc: "/brand/07-KECS.png",
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
    imgSrc: "/brand/05-ADIK.png",
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
    imgSrc: "/brand/02-IRON_GUARDIAN.png",
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
    imgSrc: "/brand/03-SQS_-_DEEL.png",
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

// ==================== NAV (7 items as requested) ====================
const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },
  { id: "modules",   label: "Modules" },
  { id: "cns-runs",  label: "CNS-RUNS" },
  { id: "cnl",       label: "CNL" },
  { id: "ces",       label: "CES" },
  { id: "business",  label: "Licensing" },
  { id: "contact",   label: "Contact" },
];

// ==================== UTILS ====================
function safeSrc(src?: string, fallback = "/brand/cns_logo.png") {
  if (!src) return fallback;
  const s = String(src).trim();
  return s || fallback;
}

function scrollToId(id: string) {
  if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==================== STYLES ====================
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
      html { scroll-behavior: smooth; }

      @keyframes logoPulse {
        0%   { transform: scale(1);    filter: drop-shadow(0 0 0   rgba(56,189,248,0)); }
        55%  { transform: scale(1.03); filter: drop-shadow(0 0 22px rgba(56,189,248,0.28)); }
        100% { transform: scale(1);    filter: drop-shadow(0 0 0   rgba(56,189,248,0)); }
      }
      @keyframes netFloat {
        0%   { transform: translate3d(0,0,0);    opacity: 0.75; }
        50%  { transform: translate3d(0,-10px,0); opacity: 0.95; }
        100% { transform: translate3d(0,0,0);    opacity: 0.8;  }
      }
      @keyframes scanSweep {
        0%   { transform: translateY(-40%); opacity: 0;    }
        20%  { opacity: 0.65; }
        100% { transform: translateY(140%); opacity: 0;    }
      }
      @keyframes rocketBob {
        0%   { transform: translateY(0);   }
        50%  { transform: translateY(-6px); }
        100% { transform: translateY(0);   }
      }
      @keyframes rocketLaunch {
        0%   { transform: translateY(0)     scale(1);    filter: drop-shadow(0 0 22px rgba(56,189,248,0.25)); }
        35%  { transform: translateY(-14px) scale(1.01); }
        100% { transform: translateY(-190px) scale(1.02); filter: drop-shadow(0 0 36px rgba(56,189,248,0.35)); }
      }
      @keyframes flameFlicker {
        0%   { transform: translateY(0)  scaleY(0.9);  opacity: 0.65; }
        50%  { transform: translateY(2px) scaleY(1.08); opacity: 0.95; }
        100% { transform: translateY(0)  scaleY(0.92); opacity: 0.7;  }
      }
      @keyframes metricFadeUp {
        0%   { opacity:0; transform:translateY(8px);  filter:blur(2px); }
        100% { opacity:1; transform:translateY(0);    filter:blur(0);   }
      }
      @keyframes panelGlow {
        0%   { opacity: 0.35; }
        50%  { opacity: 0.65; }
        100% { opacity: 0.35; }
      }

      .glass {
        background: var(--glass);
        border: 1px solid var(--ring);
        backdrop-filter: blur(10px);
      }
      .btnPrimary {
        display:inline-flex; align-items:center; justify-content:center; gap:10px;
        padding:10px 14px; border-radius:999px;
        background:rgba(56,189,248,0.18); border:1px solid rgba(56,189,248,0.35);
        color:white; transition:transform 180ms ease,background 180ms ease,border 180ms ease;
      }
      .btnPrimary:hover { transform:translateY(-1px); background:rgba(56,189,248,0.24); border:1px solid rgba(56,189,248,0.55); }
      .btnGhost {
        display:inline-flex; align-items:center; justify-content:center; gap:10px;
        padding:10px 14px; border-radius:999px;
        background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12);
        color:rgba(255,255,255,0.9); transition:transform 180ms ease,background 180ms ease,border 180ms ease;
      }
      .btnGhost:hover { transform:translateY(-1px); background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.2); }
      .sectionTitle { font-size:12px; letter-spacing:0.28em; color:rgba(255,255,255,0.55); }

      /* ── NAV: always horizontal, wraps on small screens ── */
      .top-nav { display:flex; flex-wrap:wrap; align-items:center; gap:4px 18px; }
      .top-nav button {
        font-size:13px; font-weight:500; color:rgba(255,255,255,0.75);
        white-space:nowrap; background:none; border:none; cursor:pointer;
        padding:4px 0; transition:color 180ms ease;
      }
      .top-nav button:hover { color:#fff; }
      @media (max-width:640px) {
        .top-nav { gap:3px 10px; }
        .top-nav button { font-size:11px; }
      }
    `}</style>
  );
}

// ==================== BACKGROUND (EXACT — DO NOT TOUCH) ====================
function CausalBackground({ intensity = 0.8, focus = "top" }: { intensity?: number; focus?: SectionKey }) {
  const focusMap: Record<SectionKey, { x:number; y:number }> = {
    top:       { x:25, y:20 },
    modules:   { x:22, y:55 },
    business:  { x:65, y:42 },
    demos:     { x:70, y:60 },
    community: { x:35, y:75 },
    contact:   { x:55, y:85 },
  };
  const p = focusMap[focus] ?? focusMap.top;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0">
        <video className="h-full w-full object-cover" src="/brand/cns_canvas.mp4" autoPlay loop muted playsInline preload="metadata" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.62) 55%,rgba(0,0,0,0.78) 100%)" }} />
      </div>
      <div className="absolute inset-0" style={{
        opacity: intensity,
        background:`radial-gradient(circle at ${p.x}% ${p.y}%,rgba(56,189,248,0.22),transparent 52%),
                    radial-gradient(circle at ${Math.min(95,p.x+35)}% ${Math.max(5,p.y-20)}%,rgba(168,85,247,0.16),transparent 54%)`,
        transition:"all 380ms ease",
      }} />
      <div className="absolute inset-0 opacity-70" style={{ animation:"netFloat 8s ease-in-out infinite" }}>
        <svg className="h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(56,189,248,0.22)" />
              <stop offset="1" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
          </defs>
          {Array.from({length:26}).map((_,i)=>{
            const x1=(i*47)%1200, y1=(i*71)%700;
            const x2=(x1+260+(i%7)*18)%1200, y2=(y1+190+(i%5)*22)%700;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g1)" strokeWidth="1" opacity="0.7"/>;
          })}
          {Array.from({length:34}).map((_,i)=>{
            const x=(i*89)%1200, y=(i*53)%700, r=1.5+(i%4)*0.6;
            return <circle key={`c-${i}`} cx={x} cy={y} r={r} fill="rgba(56,189,248,0.7)" opacity="0.7"/>;
          })}
        </svg>
        <div className="absolute left-0 top-0 h-[220%] w-full" style={{
          background:"linear-gradient(180deg,transparent 0%,rgba(56,189,248,0.08) 30%,transparent 60%)",
          animation:"scanSweep 6.8s ease-in-out infinite",
        }}/>
      </div>
    </div>
  );
}

// ==================== TOP NAV ====================
function TopNav() {
  return (
    <nav className="top-nav">
      {NAV_ITEMS.map((item) => (
        <button key={item.id} onClick={() => scrollToId(item.id)}>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

// ==================== ROCKET METRICS CARD (EXACT — DO NOT TOUCH) ====================
function RocketMetricsCard() {
  const [phase, setPhase] = useState<"metrics"|"launch">("metrics");
  const t1 = useRef<number|null>(null);
  const t2 = useRef<number|null>(null);

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
      <div className="absolute inset-0" style={{ animation:"panelGlow 4.2s ease-in-out infinite" }} />

      <div className="relative flex items-start justify-between gap-6">
        <div className="min-w-[190px]">
          <div className="text-xs tracking-[0.28em] text-white/60">LIVE METRICS</div>
          <div className="mt-3 space-y-1 text-sm text-white/85">
            {[
              { k:"FTTI - Failure Tolerance Time Index", v:"0.16", d:0   },
              { k:"FN - False Negatives",               v:"0.00", d:120  },
              { k:"FP - False Positives",               v:"0.01", d:240  },
            ].map((x) => (
              <div key={x.k} className="flex items-center justify-between gap-10"
                style={phase==="metrics"?{animation:`metricFadeUp 520ms ease ${x.d}ms both`}:{opacity:0.55}}>
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
            animation: phase==="launch"
              ? "rocketLaunch 3.01s cubic-bezier(.22,.7,.25,1) both"
              : "rocketBob 1.4s ease-in-out infinite",
          }}>
            <Image src={safeSrc("/brand/rocket.png")} alt="Rocket" width={220} height={240} className="h-[170px] w-auto object-contain" priority />
            {phase==="launch" && (
              <div className="absolute left-1/2 top-[152px] -translate-x-1/2">
                <div className="h-[60px] w-[26px] rounded-full" style={{
                  background:"radial-gradient(circle at 50% 20%,rgba(255,255,255,0.85),rgba(56,189,248,0.35) 35%,rgba(168,85,247,0.18) 65%,rgba(0,0,0,0) 75%)",
                  filter:"blur(0.2px)", animation:"flameFlicker 200ms ease-in-out infinite",
                }}/>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-center">
        <div className="relative h-[185px] w-[185px] overflow-hidden rounded-full ring-1 ring-white/12" style={{boxShadow:"0 0 44px rgba(56,189,248,0.16)"}}>
          <video className="absolute inset-0 h-full w-full object-cover" src="/brand/earth_rotation.mp4" autoPlay loop muted playsInline preload="metadata"/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(56,189,248,0.18),transparent_60%)]"/>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(168,85,247,0.10),transparent_62%)]"/>
          <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.42))"}}/>
        </div>
      </div>
      <div className="relative mt-4 text-center text-[12px] text-white/70">
        CNS WAS CREATED TO PROTECT SYSTEMS WHERE FAILURE IS NOT AN OPTION.
      </div>
    </div>
  );
}

// ==================== MODULE MODAL (EXACT — DO NOT TOUCH) ====================
function ModuleModal({ module, onClose }: { module: EcoModule|null; onClose: ()=>void }) {
  if (!module) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="glass w-full max-w-5xl rounded-3xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="grid md:grid-cols-5">
          <div className="md:col-span-2 bg-black/30 p-8 flex items-center justify-center">
            <div className="relative w-full aspect-square max-h-[420px]">
              <Image src={safeSrc(module.imgSrc)} alt={module.acronym} fill className="object-contain"/>
            </div>
          </div>
          <div className="md:col-span-3 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div style={{color:module.color}} className="text-5xl font-bold tracking-[-1.5px]">{module.acronym}</div>
                <div className="text-2xl text-white/80 mt-1">{module.fullName}</div>
              </div>
              <button onClick={onClose} className="text-4xl text-white/40 hover:text-white">×</button>
            </div>
            <div className="space-y-6 text-sm">
              <div>
                <div className="text-xs tracking-[2px] text-white/50 mb-1">DEFINITION</div>
                <p className="text-white/90 leading-relaxed">{module.definition}</p>
              </div>
              <div>
                <div className="text-xs tracking-[2px] text-white/50 mb-1">CREATED FOR</div>
                <p className="text-white/90 leading-relaxed">{module.createdFor}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <div className="text-xs tracking-[2px] text-white/50 mb-1">INDEPENDENT USE</div>
                  <p className="text-white/90 leading-relaxed">{module.independentUse}</p>
                </div>
                <div>
                  <div className="text-xs tracking-[2px] text-white/50 mb-1">ECOSYSTEM USE</div>
                  <p className="text-white/90 leading-relaxed">{module.ecosystemUse}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  {[
                    {label:"SECTORS",  items:module.sectors},
                    {label:"SIGNALS",  items:module.signals},
                    {label:"OUTPUTS",  items:module.outputs},
                    {label:"EVIDENCE", items:module.evidence},
                  ].map(({label,items})=>(
                    <div key={label}>
                      <div className="text-white/50 mb-2 tracking-widest">{label}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((s,i)=><span key={i} className="px-2.5 py-1 bg-white/5 rounded border border-white/10">{s}</span>)}
                      </div>
                    </div>
                  ))}
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
  const [selectedModule, setSelectedModule] = useState<EcoModule|null>(null);
  const [hoverFocus, setHoverFocus] = useState<SectionKey|null>(null);
  const focus = hoverFocus ?? "top";

  return (
    <main className="min-h-screen text-white">
      <GlobalStyles />
      <CausalBackground intensity={0.8} focus={focus} />

      {/* ── HEADER ──────────────────────────────────────────────
          FIX 2: Logo image removed
          FIX 3: Brand text = "Causal Nexus Systems" only
          FIX 4: bg-black/20 (transparent) instead of bg-[#03030A]/95
          FIX 5: TopNav always flex (visible on all screen sizes)
      ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

          {/* BRAND */}
          <div className="flex-shrink-0 leading-tight">
            <div className="text-lg sm:text-xl font-semibold tracking-wide text-white">
              Causal Nexus Systems
            </div>
            <div className="hidden sm:block mt-0.5 text-[11px] text-white/50">
              Public Causal Observability • Sealed Outputs • Kernel Licensing • USPTO PPA #63/896,666
            </div>
          </div>

          {/* NAV — always horizontal */}
          <TopNav />

          {/* CTA */}
          <button onClick={() => scrollToId("contact")} className="btnPrimary flex-shrink-0 text-xs sm:text-sm px-4 sm:px-6 py-2">
            NDA Access
          </button>
        </div>
      </header>

      {/* ── HERO ── transparent (no dark bg override) */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="sectionTitle">CAUSAL OBSERVABILITY LIVE SYSTEMS</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              CNS MEASURES CAUSE,<br />NOT EFFECT.
            </h1>
            <p className="mt-4 max-w-xl text-white/75">
              Causal Nexus Systems (CNS) is a Next Generation Causal Intelligence ecosystem that integrates predictive models, multilayer telemetry analysis, and cryptographic integrity tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btnPrimary" onClick={() => scrollToId("modules")}>Explore Modules →</button>
              <button className="btnGhost"   onClick={() => scrollToId("business")}>Kernel licensing model</button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">Public layer</span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">Sealed outputs</span>
              <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">No kernel exposure</span>
            </div>
          </div>
          <div onMouseEnter={() => setHoverFocus("top")} onMouseLeave={() => setHoverFocus(null)}>
            <RocketMetricsCard />
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="modules" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="sectionTitle">PUBLIC MODULE LAYER</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Modules</h2>
            <p className="mt-2 max-w-2xl text-white/70">Each module is a public window into CNS. Click a module for full technical details.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ECO_MODULES.map((mod, index) => (
            <button key={index} onClick={() => setSelectedModule(mod)}
              onMouseEnter={() => setHoverFocus("modules")} onMouseLeave={() => setHoverFocus(null)}
              className="glass group rounded-3xl p-5 text-left transition hover:bg-white/7">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Image src={safeSrc(mod.imgSrc)} alt={mod.acronym} width={90} height={90} className="h-10 w-10 object-contain"/>
                </div>
                <div className="min-w-0">
                  <div style={{color:mod.color}} className="text-xl font-semibold">{mod.acronym}</div>
                  <div className="truncate text-sm text-white/65">{mod.fullName}</div>
                </div>
              </div>
              <div className="mt-4 line-clamp-3 text-sm text-white/75">{mod.desc}</div>
              <div className="mt-5 text-xs text-white/50 group-hover:text-white/70 transition-colors flex items-center gap-2">
                View full module details <span className="text-lg leading-none">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BUSINESS ── */}
      <section id="business" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">BUSINESS</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Kernel licensing</h2>
        <p className="mt-3 max-w-3xl text-white/72">
          CNS is not offered as a public SaaS platform. The Kernel operates as a licensed, cloud-hosted causal engine. Access is granted exclusively under NDA and domain-specific licensing agreements.
        </p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            { t:"NDA-First Access",    d:"Kernel access is granted only under strict confidentiality agreements. No source access, reverse engineering, or internal inspection is permitted." },
            { t:"Public Proofs",       d:"All public outputs are cryptographically sealed using SHA-256 + Merkle root verification without exposing private Kernel mechanics." },
            { t:"High-Stakes Focus",   d:"Designed for systems where failure is not an option: Aerospace, critical infrastructure, financial, healthcare, and security-sensitive environments." },
          ].map((x,i)=>(
            <div key={i} className="glass rounded-3xl p-5" onMouseEnter={()=>setHoverFocus("business")} onMouseLeave={()=>setHoverFocus(null)}>
              <div className="text-lg font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-white/70">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMOS ── */}
      <section id="demos" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">DEMOS</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Verified Public Demonstrations</h2>
        <p className="mt-3 max-w-3xl text-white/72">Public evidence of operational capability. Internal logic remains protected.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {[
            { t:"ASTRA Demo Video", href:"https://www.linkedin.com/feed/update/urn:li:activity:7415229373039230976/" },
            { t:"CNS Demo Video",   href:"https://www.linkedin.com/feed/update/urn:li:activity:7397122628907417600/" },
            { t:"SQS Demo Video",   href:"https://www.linkedin.com/feed/update/urn:li:activity:7414403427432325121/" },
          ].map((d,i)=>(
            <a key={i} href={d.href} target="_blank" rel="noreferrer"
              className="glass rounded-3xl p-5 transition hover:bg-white/7"
              onMouseEnter={()=>setHoverFocus("demos")} onMouseLeave={()=>setHoverFocus(null)}>
              <div className="text-lg font-semibold">{d.t}</div>
              <div className="mt-2 text-sm text-white/70">Open →</div>
            </a>
          ))}
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section id="community" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">COMMUNITY</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Build the Public Layer</h2>
        <div className="glass mt-7 rounded-3xl p-6" onMouseEnter={()=>setHoverFocus("community")} onMouseLeave={()=>setHoverFocus(null)}>
          <div className="text-white/80">Coming soon: public runs feed + pinned updates.</div>
          <div className="mt-2 text-sm text-white/60">CNS keeps the public layer transparent without exposing kernel internals.</div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="sectionTitle">CONTACT</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Contact</h2>
        <p className="mt-3 max-w-3xl text-white/72">For partnerships, licensing, and high-stakes deployments. Public layer only — kernel access is NDA-first.</p>
        <div className="glass mt-7 rounded-3xl p-6" onMouseEnter={()=>setHoverFocus("contact")} onMouseLeave={()=>setHoverFocus(null)}>
          <div className="text-white/85">Email: admin@causalnexussystems.com</div>
        </div>
        <footer className="mt-10 pb-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Causal Nexus Systems LLC
        </footer>
      </section>

      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </main>
  );
}
