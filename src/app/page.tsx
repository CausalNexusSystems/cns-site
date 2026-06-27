"use client";

import { useEffect, useRef, useState } from "react";

// ==================== TYPES ====================
type SectionKey = "top" | "modules" | "business" | "contact";

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
    imgSrc: "/06-K24_1-RS.png",
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
    imgSrc: "/04-ACDK.png",
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
    imgSrc: "/09-NCM.png",
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
    imgSrc: "/08-MDFE.png",
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
    imgSrc: "/07-KECS.png",
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
    imgSrc: "/05-ADIK.png",
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
    imgSrc: "/02-IRON_GUARDIAN.png",
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
    imgSrc: "/03-SQS_-_DEEL.png",
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

// ==================== NAV (7 items) ====================
const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },
  { id: "modules",   label: "Modules" },
  { id: "cns-runs",  label: "CNS-RUNS" },
  { id: "cnl",       label: "CNL" },
  { id: "ces",       label: "CES" },
  { id: "business",  label: "Licensing" },
  { id: "contact",   label: "Contact" },
];

const METRICS = [
  { v: "8/8", l: "Active Modules" },
  { v: "32",  l: "Telemetry Domains" },
  { v: "24,606",  l: "Records Processed" },
  { v: "196,848", l: "Module Rows" },
  { v: "PASS", l: "Validation Status", cyan: true },
];

const RUN_DETAILS = [
  ["Run ID",     "CNS_K24_TRUE_GLOBAL_CRITICAL_INFRASTRUCTURE_ENTROPY_32_DOMAIN"],
  ["Authority",  "K24.1-RS"],
  ["Runtime",    "Iron Guardian V3"],
  ["Records",    "24,606"],
  ["Module Rows","196,848"],
  ["Validation", "PASS"],
];

const TELEMETRY_FEEDS = [
  ["Energy Grid",       "LIVE", "#00A85E"],
  ["Aerospace",         "LIVE", "#00C8FF"],
  ["Industrial Control","LIVE", "#C8A84B"],
  ["Cyber Physical",    "LIVE", "#B83232"],
  ["Logistics",         "LIVE", "#8BA0C0"],
];

// ==================== UTILS ====================
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
        --cns-blue: rgba(56,189,248,1);
        --cns-blue-soft: rgba(56,189,248,0.22);
        --cns-purple-soft: rgba(168,85,247,0.18);
        --glass: rgba(255,255,255,0.06);
        --ring: rgba(255,255,255,0.12);
      }
      html { scroll-behavior: smooth; background: #03030a; }
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #03030a; color: #edf1ff; font-family: "Inter", sans-serif; overflow-x: hidden; }
      button, a { -webkit-tap-highlight-color: transparent; }

      @keyframes logoPulse {
        0%   { transform:scale(1);    filter:drop-shadow(0 0 0   rgba(56,189,248,0)); }
        55%  { transform:scale(1.03); filter:drop-shadow(0 0 22px rgba(56,189,248,0.28)); }
        100% { transform:scale(1);    filter:drop-shadow(0 0 0   rgba(56,189,248,0)); }
      }
      @keyframes netFloat {
        0%   { transform:translate3d(0,0,0);     opacity:0.75; }
        50%  { transform:translate3d(0,-10px,0); opacity:0.95; }
        100% { transform:translate3d(0,0,0);     opacity:0.8;  }
      }
      @keyframes scanSweep {
        0%   { transform:translateY(-40%); opacity:0;    }
        20%  { opacity:0.65; }
        100% { transform:translateY(140%); opacity:0;    }
      }
      @keyframes rocketBob {
        0%   { transform:translateY(0);    }
        50%  { transform:translateY(-6px); }
        100% { transform:translateY(0);    }
      }
      @keyframes rocketLaunch {
        0%   { transform:translateY(0)     scale(1);    filter:drop-shadow(0 0 22px rgba(56,189,248,0.25)); }
        35%  { transform:translateY(-14px) scale(1.01); }
        100% { transform:translateY(-190px) scale(1.02); filter:drop-shadow(0 0 36px rgba(56,189,248,0.35)); }
      }
      @keyframes flameFlicker {
        0%   { transform:translateY(0)  scaleY(0.9);  opacity:0.65; }
        50%  { transform:translateY(2px) scaleY(1.08); opacity:0.95; }
        100% { transform:translateY(0)  scaleY(0.92); opacity:0.7;  }
      }
      @keyframes metricFadeUp {
        0%   { opacity:0; transform:translateY(8px);  filter:blur(2px); }
        100% { opacity:1; transform:translateY(0);    filter:blur(0);   }
      }
      @keyframes panelGlow {
        0%   { opacity:0.35; }
        50%  { opacity:0.65; }
        100% { opacity:0.35; }
      }
      @keyframes blink {
        0%,100% { opacity:1;    }
        50%      { opacity:0.22; }
      }
      @keyframes tick {
        0%   { transform:translateX(0);    }
        100% { transform:translateX(-50%); }
      }
      @keyframes liftIn {
        0%   { opacity:0; transform:translateY(18px); }
        100% { opacity:1; transform:translateY(0);    }
      }
      @keyframes scan {
        0%   { transform:translateY(-100%); opacity:0;    }
        20%  { opacity:0.55; }
        100% { transform:translateY(320%);  opacity:0;    }
      }

      .glass {
        background:var(--glass);
        border:1px solid var(--ring);
        backdrop-filter:blur(10px);
      }
      .btnPrimary {
        display:inline-flex; align-items:center; justify-content:center; gap:10px;
        padding:10px 14px; border-radius:999px;
        background:rgba(56,189,248,0.18); border:1px solid rgba(56,189,248,0.35);
        color:white; transition:transform 180ms ease,background 180ms ease,border 180ms ease;
        cursor:pointer;
      }
      .btnPrimary:hover { transform:translateY(-1px); background:rgba(56,189,248,0.24); border-color:rgba(56,189,248,0.55); }
      .btnGhost {
        display:inline-flex; align-items:center; justify-content:center; gap:10px;
        padding:10px 14px; border-radius:999px;
        background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12);
        color:rgba(255,255,255,0.9); transition:transform 180ms ease,background 180ms ease,border 180ms ease;
        cursor:pointer;
      }
      .btnGhost:hover { transform:translateY(-1px); background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.2); }
      .sectionTitle { font-size:12px; letter-spacing:0.28em; color:rgba(255,255,255,0.55); }

      /* ── NAV always horizontal ── */
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

      /* ── Sections from new code ── */
      .section-new {
        position:relative; z-index:1;
        border-top:1px solid rgba(255,255,255,0.06);
      }
      .section-new.alt  { background:rgba(7,7,16,0.72);   }
      .section-new.dim  { background:rgba(10,10,22,0.62);  }
      .section-inner-new {
        max-width:1280px; margin:0 auto; padding:96px 48px;
      }
      .eyebrow {
        font-family:"Space Mono",monospace;
        font-size:10px; letter-spacing:0.16em; text-transform:uppercase;
        color:#1a6fff; margin-bottom:14px;
      }
      h2.sec-h2 {
        font-family:"Space Grotesk",sans-serif;
        font-size:clamp(30px,4vw,48px); font-weight:700; line-height:1.1;
      }
      .section-copy {
        font-size:15px; line-height:1.75; color:rgba(255,255,255,0.6);
      }

      /* runs panel */
      .metrics-panel {
        background:rgba(10,10,22,0.76);
        border:1px solid rgba(255,255,255,0.08);
        backdrop-filter:blur(20px);
        padding:34px;
      }
      .metrics-title {
        margin-bottom:24px;
        font-family:"Space Mono",monospace; font-size:9px;
        letter-spacing:0.16em; text-transform:uppercase; color:#1a6fff;
      }
      .metrics-row {
        display:grid; grid-template-columns:repeat(5,1fr);
        border-top:1px solid rgba(255,255,255,0.06); margin-bottom:26px;
      }
      .metric { padding:18px 10px; text-align:center; border-right:1px solid rgba(255,255,255,0.06); }
      .metric:last-child { border-right:none; }
      .metric-value { display:block; font-family:"Space Mono",monospace; font-size:20px; font-weight:700; color:white; }
      .metric-value.cyan { color:#00c8ff; }
      .metric-label { margin-top:4px; font-family:"Space Mono",monospace; font-size:8px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.35); }
      .detail-list { display:grid; gap:0; }
      .detail-row { display:flex; justify-content:space-between; gap:16px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
      .detail-row span:first-child { flex:0 0 auto; font-family:"Space Mono",monospace; font-size:10px; color:rgba(255,255,255,0.42); text-transform:uppercase; letter-spacing:0.06em; }
      .detail-row span:last-child { min-width:0; text-align:right; font-family:"Space Mono",monospace; font-size:10px; color:rgba(255,255,255,0.82); font-weight:700; overflow-wrap:anywhere; }
      .status-pill { margin-top:18px; padding:10px 14px; background:rgba(0,168,94,0.08); border:1px solid rgba(0,168,94,0.25); display:flex; align-items:center; gap:10px; }
      .status-dot { width:6px; height:6px; border-radius:50%; background:#00a85e; box-shadow:0 0 6px #00a85e; animation:blink 1.5s infinite; flex-shrink:0; }
      .status-pill span { font-family:"Space Mono",monospace; font-size:10px; color:#00a85e; letter-spacing:0.1em; text-transform:uppercase; }

      /* live panel */
      .live-panel { overflow:hidden; background:rgba(10,10,22,0.76); border:1px solid rgba(255,255,255,0.08); backdrop-filter:blur(20px); margin-top:14px; }
      .live-video { position:relative; aspect-ratio:16/9; background:#050812; overflow:hidden; }
      .live-video video { width:100%; height:100%; object-fit:cover; display:block; opacity:0.9; }
      .live-video::before { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 0%,rgba(3,3,10,0.5) 100%),linear-gradient(90deg,rgba(0,200,255,0.08) 1px,transparent 1px); background-size:100% 100%,28px 28px; pointer-events:none; z-index:1; }
      .live-video::after { content:""; position:absolute; left:0; right:0; top:0; height:34%; background:linear-gradient(180deg,transparent,rgba(0,200,255,0.16),transparent); animation:scan 4.5s linear infinite; pointer-events:none; z-index:2; }
      .live-overlay { position:absolute; left:18px; right:18px; bottom:16px; z-index:3; display:flex; align-items:flex-end; justify-content:space-between; gap:18px; }
      .live-copy div:first-child { font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:#00c8ff; margin-bottom:6px; }
      .live-copy div:last-child { font-family:"Space Grotesk",sans-serif; font-size:17px; font-weight:700; line-height:1.15; color:white; }
      .feed-stack { display:grid; gap:5px; min-width:166px; }
      .feed-row { display:flex; justify-content:space-between; gap:14px; padding:5px 8px; background:rgba(3,3,10,0.72); border:1px solid rgba(255,255,255,0.08); font-family:"Space Mono",monospace; font-size:8px; letter-spacing:0.08em; text-transform:uppercase; }
      .live-caption { padding:14px 18px 16px; display:flex; justify-content:space-between; align-items:center; gap:16px; border-top:1px solid rgba(255,255,255,0.06); }
      .live-caption p { max-width:560px; color:rgba(255,255,255,0.56); font-size:12px; line-height:1.5; }
      .live-caption span { flex:0 0 auto; font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:#00c8ff; }

      /* ecosystem */
      .ecosystem-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
      .qa-list { border-top:1px solid rgba(255,255,255,0.06); margin-top:36px; }
      .qa-row { display:grid; grid-template-columns:1fr 1fr; gap:20px; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
      .qa-row div:first-child { font-family:"Space Grotesk",sans-serif; font-size:13px; font-weight:600; color:white; }
      .qa-row div:last-child { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.55; }
      .principles-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
      .principle { background:rgba(15,15,28,0.78); border:1px solid rgba(255,255,255,0.06); padding:22px; }
      .principle div:first-child { font-family:"Space Mono",monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#1a6fff; margin-bottom:8px; }
      .principle div:last-child { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.5; }

      /* CNL */
      .cnl-grid { display:grid; grid-template-columns:0.78fr 1.22fr; gap:74px; align-items:start; }
      .cnl-image { border:1px solid rgba(255,255,255,0.08); overflow:hidden; background:rgba(15,15,28,0.8); }
      .cnl-image img { width:100%; display:block; object-fit:cover; filter:brightness(0.94); }
      .cnl-status { display:inline-flex; align-items:center; gap:8px; background:rgba(0,168,94,0.08); border:1px solid rgba(0,168,94,0.25); padding:6px 14px; margin-bottom:22px; font-family:"Space Mono",monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#00a85e; }
      .cnl-status::before { content:""; width:6px; height:6px; border-radius:50%; background:#00a85e; animation:blink 1.5s infinite; }
      .cnl-metrics { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; margin:28px 0 2px; }
      .cnl-metric { background:rgba(15,15,28,0.8); border:1px solid rgba(255,255,255,0.06); padding:16px 10px; text-align:center; }
      .cnl-metric div:first-child { font-family:"Space Mono",monospace; font-size:18px; font-weight:700; color:#00a85e; margin-bottom:3px; }
      .cnl-metric div:last-child { font-family:"Space Mono",monospace; font-size:8px; text-transform:uppercase; letter-spacing:0.08em; color:rgba(255,255,255,0.35); }
      .cnl-feature { margin-top:2px; padding:14px 16px; background:rgba(15,15,28,0.62); border:1px solid rgba(255,255,255,0.05); }
      .cnl-feature div:first-child { font-family:"Space Grotesk",sans-serif; font-size:13px; font-weight:700; color:white; margin-bottom:3px; }
      .cnl-feature div:last-child { font-size:12px; line-height:1.5; color:rgba(255,255,255,0.52); }

      /* modules grid */
      .module-grid-new { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; }
      .module-card-new { text-align:left; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); color:white; overflow:hidden; cursor:pointer; display:flex; flex-direction:column; min-height:100%; transition:transform 0.25s ease,border-color 0.25s ease,background 0.25s ease; }
      .module-card-new:hover { transform:translateY(-4px); border-color:rgba(255,255,255,0.18); background:rgba(255,255,255,0.06); }
      .module-img-wrap { width:100%; aspect-ratio:1.25/1; overflow:hidden; background:#07070f; }
      /* FIX: plain <img> tag, no Next.js Image restrictions */
      .module-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(0.84); transition:transform 0.45s ease,filter 0.3s ease; }
      .module-card-new:hover .module-img-wrap img { transform:scale(1.035); filter:brightness(1); }
      .module-body-new { padding:20px; flex:1; display:flex; flex-direction:column; }
      .module-top-new { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; margin-bottom:8px; }
      .module-name-new { font-family:"Space Grotesk",sans-serif; font-weight:700; font-size:16px; }
      .module-badge-new { font-family:"Space Mono",monospace; font-size:8px; letter-spacing:0.1em; text-transform:uppercase; padding:3px 8px; white-space:nowrap; flex-shrink:0; opacity:0.75; }
      .module-full-new { font-family:"Space Grotesk",sans-serif; font-size:10px; font-weight:500; letter-spacing:0.06em; text-transform:uppercase; color:rgba(255,255,255,0.42); margin-bottom:10px; }
      .module-desc-new { font-size:12.5px; line-height:1.55; color:rgba(255,255,255,0.62); margin-bottom:14px; flex:1; }
      .module-action-new { margin-top:auto; font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.56); }

      /* business */
      .business-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; }
      .license-card { background:rgba(15,15,28,0.8); border:1px solid rgba(255,255,255,0.06); padding:34px 26px; position:relative; }
      .license-card.featured { background:rgba(26,111,255,0.05); border-color:rgba(26,111,255,0.4); }
      .flag { position:absolute; top:-1px; right:18px; background:#1a6fff; color:#fff; font-family:"Space Mono",monospace; font-size:9px; font-weight:700; letter-spacing:0.1em; padding:4px 10px; }
      .license-eye { font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:#1a6fff; margin-bottom:10px; }
      .license-title { font-family:"Space Grotesk",sans-serif; font-size:20px; font-weight:700; margin-bottom:12px; line-height:1.2; white-space:pre-line; }
      .license-desc { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.6; margin-bottom:20px; }
      .license-card ul { list-style:none; display:flex; flex-direction:column; gap:8px; }
      .license-card li { font-size:13px; color:rgba(237,241,255,0.65); display:flex; align-items:flex-start; gap:9px; }
      .license-card li span { color:#1a6fff; flex-shrink:0; font-family:"Space Mono",monospace; font-size:11px; }
      .nda-strip { margin-top:24px; padding:18px 24px; background:rgba(15,15,28,0.8); border:1px solid rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:space-between; gap:18px; flex-wrap:wrap; }
      .nda-strip strong { display:block; font-family:"Space Grotesk",sans-serif; font-size:14px; margin-bottom:4px; }
      .nda-strip p { font-size:12px; color:rgba(255,255,255,0.5); }

      /* contact */
      .contact-inner-new { max-width:820px; margin:0 auto; padding:96px 48px; text-align:center; }
      .contact-inner-new p { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.7; margin:16px auto 34px; }
      .security-note { display:inline-flex; align-items:center; background:rgba(200,168,75,0.07); border:1px solid rgba(200,168,75,0.25); padding:9px 18px; margin-bottom:30px; font-family:"Space Mono",monospace; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#c8a84b; }
      .contact-email { display:block; font-family:"Space Grotesk",sans-serif; font-size:18px; font-weight:600; color:white; text-decoration:none; margin-bottom:26px; }
      .entity-row { display:flex; justify-content:center; gap:44px; flex-wrap:wrap; margin-top:44px; padding-top:44px; border-top:1px solid rgba(255,255,255,0.06); }
      .entity-label { font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:4px; }
      .entity-value { font-family:"Space Grotesk",sans-serif; font-size:13px; font-weight:500; color:white; }

      /* modal */
      .modal-backdrop { position:fixed; inset:0; z-index:500; background:rgba(0,0,0,0.72); backdrop-filter:blur(18px); padding:36px; display:flex; align-items:center; justify-content:center; }
      .modal-box { width:min(1120px,100%); max-height:min(820px,calc(100vh - 72px)); overflow:auto; background:#070711; border:1px solid rgba(255,255,255,0.12); color:white; display:grid; grid-template-columns:minmax(320px,0.9fr) minmax(0,1.1fr); box-shadow:0 26px 80px rgba(0,0,0,0.5); }
      .modal-media { min-height:100%; background:#03030a; border-right:1px solid rgba(255,255,255,0.08); }
      /* FIX: plain <img> in modal too */
      .modal-media img { width:100%; height:100%; min-height:520px; object-fit:cover; display:block; }
      .modal-content { padding:34px; }
      .modal-close { float:right; width:38px; height:38px; border:1px solid rgba(255,255,255,0.16); background:rgba(255,255,255,0.04); color:white; cursor:pointer; font-size:18px; }
      .modal-title { padding-right:56px; font-family:"Space Grotesk",sans-serif; font-size:clamp(30px,4vw,46px); font-weight:700; line-height:1; margin-bottom:10px; }
      .modal-full { font-family:"Space Mono",monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:24px; }
      .modal-section { padding:18px 0; border-top:1px solid rgba(255,255,255,0.08); }
      .modal-section h3 { font-family:"Space Mono",monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:8px; }
      .modal-section p { font-size:14px; line-height:1.65; color:rgba(255,255,255,0.66); }
      .modal-columns { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; margin-top:18px; }
      .modal-list { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.06); padding:16px; }
      .modal-list h4 { font-family:"Space Mono",monospace; font-size:9px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; }
      .modal-list ul { list-style:none; display:grid; gap:8px; }
      .modal-list li { font-size:12.5px; color:rgba(255,255,255,0.58); line-height:1.4; }
      .modal-list li::before { content:"- "; }

      /* BACKGROUND (untouched) */
      .video-bg { position:fixed; inset:0; z-index:0; pointer-events:none; }
      .video-bg video { width:100%; height:100%; object-fit:cover; opacity:0.35; }
      .video-bg::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,rgba(3,3,10,0.3) 0%,rgba(3,3,10,0.68) 58%,rgba(3,3,10,0.94) 100%),radial-gradient(ellipse 70% 50% at 50% 30%,rgba(26,111,255,0.09) 0%,transparent 72%); }

      /* HERO */
      .hero-section { position:relative; z-index:1; max-width:1320px; margin:0 auto; padding:92px 48px 86px; animation:liftIn 0.7s ease both; }
      .hero-grid { display:grid; grid-template-columns:minmax(0,0.95fr) minmax(420px,1.05fr); gap:72px; align-items:center; }
      .hero-title { font-family:"Space Grotesk",sans-serif; font-size:clamp(64px,10vw,112px); font-weight:700; line-height:0.92; margin-bottom:16px; }
      .hero-title span { background:linear-gradient(130deg,#ffffff 0%,#4d94ff 48%,#00c8ff 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      .hero-subtitle { font-family:"Space Grotesk",sans-serif; font-size:clamp(12px,1.4vw,15px); font-weight:500; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:42px; }
      .hero-line { max-width:620px; margin-bottom:46px; font-family:"Space Grotesk",sans-serif; font-size:clamp(22px,2.8vw,34px); font-weight:300; line-height:1.35; color:rgba(237,241,255,0.88); }
      .hero-line strong { color:#00c8ff; font-weight:600; }
      .hero-actions { display:flex; flex-wrap:wrap; gap:12px; }
      .hero-panel-stack { display:grid; gap:14px; }

      /* responsive */
      @media (max-width:1180px) {
        .module-grid-new { grid-template-columns:repeat(3,1fr); }
        .hero-grid { grid-template-columns:1fr; }
      }
      @media (max-width:900px) {
        .ecosystem-grid,.cnl-grid,.business-grid { grid-template-columns:1fr; gap:32px; }
        .principles-grid,.qa-row,.cnl-metrics { grid-template-columns:1fr 1fr; }
        .module-grid-new { grid-template-columns:repeat(2,1fr); }
        .metrics-row { grid-template-columns:repeat(2,1fr); }
        .modal-box { grid-template-columns:1fr; }
        .modal-media img { min-height:0; aspect-ratio:1.25/1; }
        .section-inner-new { padding:60px 20px; }
        .live-overlay { flex-direction:column; align-items:flex-start; }
        .feed-stack { width:100%; }
      }
      @media (max-width:560px) {
        .module-grid-new,.principles-grid,.qa-row,.cnl-metrics,.modal-columns { grid-template-columns:1fr; }
        .hero-title { font-size:62px; }
        .metrics-row { grid-template-columns:repeat(2,1fr); }
      }

      @media (prefers-reduced-motion:reduce) {
        *,*::before,*::after { animation-duration:0.001ms !important; transition-duration:0.001ms !important; }
      }
    `}</style>
  );
}

// ==================== BACKGROUND (EXACT — DO NOT TOUCH) ====================
function CausalBackground() {
  return (
    <div className="video-bg" aria-hidden="true">
      <video src="/brand/cns_canvas.mp4" autoPlay loop muted playsInline preload="metadata" />
    </div>
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
      <div className="absolute inset-0" style={{animation:"panelGlow 4.2s ease-in-out infinite"}} />

      <div className="relative flex items-start justify-between gap-6">
        <div className="min-w-[190px]">
          <div className="text-xs tracking-[0.28em] text-white/60">LIVE METRICS</div>
          <div className="mt-3 space-y-1 text-sm text-white/85">
            {[
              {k:"FTTI - Failure Tolerance Time Index", v:"0.16", d:0},
              {k:"FN - False Negatives",               v:"0.00", d:120},
              {k:"FP - False Positives",               v:"0.01", d:240},
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
            animation:phase==="launch"
              ?"rocketLaunch 3.01s cubic-bezier(.22,.7,.25,1) both"
              :"rocketBob 1.4s ease-in-out infinite",
          }}>
            <img src="/brand/rocket.png" alt="Rocket" style={{height:170,width:"auto",objectFit:"contain"}} />
            {phase==="launch" && (
              <div className="absolute left-1/2 top-[152px] -translate-x-1/2">
                <div style={{height:60,width:26,borderRadius:"50%",background:"radial-gradient(circle at 50% 20%,rgba(255,255,255,0.85),rgba(56,189,248,0.35) 35%,rgba(168,85,247,0.18) 65%,rgba(0,0,0,0) 75%)",filter:"blur(0.2px)",animation:"flameFlicker 200ms ease-in-out infinite"}} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-center">
        <div className="relative overflow-hidden rounded-full ring-1 ring-white/12" style={{width:185,height:185,boxShadow:"0 0 44px rgba(56,189,248,0.16)"}}>
          <video className="absolute inset-0 h-full w-full object-cover" src="/brand/earth_rotation.mp4" autoPlay loop muted playsInline preload="metadata" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_35%,rgba(56,189,248,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,rgba(168,85,247,0.10),transparent_62%)]" />
          <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.42))"}} />
        </div>
      </div>
      <div className="relative mt-4 text-center text-[12px] text-white/70">
        CNS WAS CREATED TO PROTECT SYSTEMS WHERE FAILURE IS NOT AN OPTION.
      </div>
    </div>
  );
}

// ==================== MODULE MODAL ====================
function ModuleModal({ module, onClose }: { module: EcoModule|null; onClose:()=>void }) {
  useEffect(() => {
    if (!module) return;
    const onKey = (e: KeyboardEvent) => { if (e.key==="Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [module, onClose]);

  if (!module) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-media">
          {/* FIX: plain <img> — no Next.js Image restrictions */}
          <img src={module.imgSrc} alt={module.acronym} />
        </div>
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-title" style={{color:module.color}}>{module.acronym}</div>
          <div className="modal-full">{module.fullName}</div>
          {[
            ["Definition",            module.definition],
            ["Created For",           module.createdFor],
            ["As Independent Module", module.independentUse],
            ["Inside CNS Ecosystem",  module.ecosystemUse],
          ].map(([title,text]) => (
            <div key={title} className="modal-section">
              <h3 style={{color:module.color}}>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
          <div className="modal-columns">
            {[
              ["Applicable Sectors", module.sectors],
              ["Input Signals",      module.signals],
              ["Operational Outputs",module.outputs],
              ["Evidence Produced",  module.evidence],
            ].map(([title,items]) => (
              <div key={title as string} className="modal-list">
                <h4 style={{color:module.color}}>{title as string}</h4>
                <ul>{(items as string[]).map(s => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function Home() {
  const [selectedModule, setSelectedModule] = useState<EcoModule|null>(null);

  return (
    <main style={{minHeight:"100vh",color:"white",background:"#03030a",overflowX:"hidden"}}>
      <GlobalStyles />
      <CausalBackground />

      {/* ── HEADER — transparent, no logo, Causal Nexus Systems, always-horizontal nav ── */}
      <header style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        height:68,padding:"0 48px",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,
        background:"rgba(3,3,10,0.30)",
        backdropFilter:"blur(24px)",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{flexShrink:0,lineHeight:1.25}}>
          <div style={{fontFamily:"Space Grotesk,sans-serif",fontSize:16,fontWeight:600,letterSpacing:"0.04em",color:"white"}}>
            Causal Nexus Systems
          </div>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginTop:3}}>
            Public Causal Observability · Sealed Outputs · USPTO PPA #63/896,666
          </div>
        </div>

        {/* NAV — always horizontal, wraps on small screens */}
        <nav className="top-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollToId(item.id)}>{item.label}</button>
          ))}
        </nav>

        <button onClick={() => scrollToId("contact")} className="btnPrimary" style={{flexShrink:0,fontSize:12,padding:"8px 18px"}}>
          NDA Access
        </button>
      </header>

      {/* ── HERO — padding-top so content clears fixed header ── */}
      <section id="top" style={{paddingTop:68,position:"relative",zIndex:1}}>
        <div className="hero-section">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Causal Nexus Systems LLC</div>
              <h1 className="hero-title"><span>CNS</span></h1>
              <div className="hero-subtitle">Next-generation sovereign deterministic ecosystem</div>
              <p className="hero-line">
                <strong>CNS measures the cause.</strong><br />
                It does not wait for the effect.
              </p>
              <div className="hero-actions">
                <button className="btnPrimary" onClick={() => scrollToId("modules")}>Explore Modules</button>
                <button className="btnGhost"   onClick={() => scrollToId("contact")}>Request NDA Access</button>
              </div>
            </div>
            <div className="hero-panel-stack">
              <RocketMetricsCard />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 1 (NEW): CNS-RUNS — 32 Domain Run
      ══════════════════════════════════════════════ */}
      <section id="cns-runs" className="section-new dim">
        <div className="section-inner-new">
          <div className="eyebrow">Public Run Evidence</div>
          <h2 className="sec-h2" style={{marginBottom:48}}>
            K24 Unified Run —<br />32 Domains.
          </h2>

          <div className="metrics-panel">
            <div className="metrics-title">K24 unified run - public metrics layer</div>
            <div className="metrics-row">
              {METRICS.map(m => (
                <div key={m.l} className="metric">
                  <span className={`metric-value${m.cyan?" cyan":""}`}>{m.v}</span>
                  <span className="metric-label">{m.l}</span>
                </div>
              ))}
            </div>
            <div className="detail-list">
              {RUN_DETAILS.map(([k,v]) => (
                <div key={k} className="detail-row">
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
            <div className="status-pill">
              <span className="status-dot" />
              <span>Validation: PASS - public evidence boundary</span>
            </div>
          </div>

          <div className="live-panel">
            <div className="live-video">
              <video src="/brand/cns_live_telemetry_panel.mp4" autoPlay loop muted playsInline preload="metadata" />
              <div className="live-overlay">
                <div className="live-copy">
                  <div>Live telemetry intake</div>
                  <div>CNS panel connected to multi-sector operational feeds.</div>
                </div>
                <div className="feed-stack">
                  {TELEMETRY_FEEDS.map(([sector,status,color]) => (
                    <div key={sector} className="feed-row">
                      <span>{sector}</span>
                      <span style={{color}}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="live-caption">
              <p>Live operational telemetry panel — multi-sector CNS intake across 32 active domains.</p>
              <span>PC + phone ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 (NEW): ECOSYSTEM — What is CNS
      ══════════════════════════════════════════════ */}
      <section id="ecosystem" className="section-new alt">
        <div className="section-inner-new">
          <div className="ecosystem-grid">
            <div>
              <div className="eyebrow">What is CNS</div>
              <h2 className="sec-h2">
                Not monitoring.<br />
                Not prediction.<br />
                Causal governance.
              </h2>
              <p className="section-copy" style={{marginTop:20}}>
                CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
              </p>
              <div className="qa-list">
                {[
                  ["Is the system state coherent?",    "CNS evaluates whether the operational state remains causally aligned and structurally valid."],
                  ["Is the system bounded?",            "CNS classifies outputs into controlled operational states rather than opaque reactions."],
                  ["Is runtime trustworthy?",           "CNS validates execution path, module context, and deployment state before action."],
                  ["Is the result reviewable?",         "CNS generates evidence packages for replay, audit, and institutional review."],
                  ["Can evidence be trusted later?",    "CNS supports hash-based integrity, sealed packages, and reviewable chain-of-custody."],
                ].map(([q,a]) => (
                  <div key={q} className="qa-row">
                    <div>{q}</div><div>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="principles-grid">
              {[
                ["Deterministic", "Same validated input and same execution boundary should produce the same reviewable output."],
                ["Bounded",       "Outputs are classified into controlled operational states with explicit review boundaries."],
                ["Sovereign",     "Designed for local, private, air-gapped, or embedded deployment profiles under defined scope."],
                ["Falsifiable",   "Evidence can be packaged through hashes, manifests, Merkle roots, and replay artifacts."],
                ["Traceable",     "Module-level contribution records preserve the authority path from signal to runtime posture."],
                ["Modular",       "Each module can be scoped independently or integrated into the CNS ecosystem."],
              ].map(([title,desc]) => (
                <div key={title} className="principle">
                  <div>{title}</div><div>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 (NEW): CNL
      ══════════════════════════════════════════════ */}
      <section id="cnl" className="section-new dim">
        <div className="section-inner-new">
          <div className="eyebrow">Causal Nexus Ledger</div>
          <h2 className="sec-h2" style={{marginBottom:48}}>
            CNL v1.0 — ledger and<br />consensus validation track.
          </h2>

          <div className="cnl-grid">
            <div className="cnl-image">
              {/* FIX: plain <img> */}
              <img src="/01-CNL.png" alt="CNL v1.0" loading="lazy" />
            </div>

            <div>
              <div className="cnl-status">Validation track - approaching production readiness</div>
              <p className="section-copy" style={{marginBottom:18}}>
                CNL is the ledger and consensus direction for extending CNS from local sovereign execution into a reviewable network state. Public wording should stay precise: CNL is presented as a validation track unless production evidence is published.
              </p>
              <p className="section-copy">
                The role of CNL is to preserve canonical state, commit evidence, verifier records, and recovery behavior so external review can inspect what was decided, when it was committed, and under which boundary.
              </p>

              <div className="cnl-metrics">
                {[
                  ["<50ms",  "Commit latency target"],
                  ["1K+",    "Batches/min target"],
                  ["<500ms", "Finalization target"],
                  ["Rust",   "Verifier path"],
                ].map(([v,l]) => (
                  <div key={l} className="cnl-metric"><div>{v}</div><div>{l}</div></div>
                ))}
              </div>

              {[
                ["Deterministic commit design",   "CNL is framed around bounded commit certificates and reproducible ledger state rather than probabilistic public-chain language."],
                ["Canonical ledger boundary",     "The ledger becomes the reviewable source of committed state once the deployment scope and verifier package are defined."],
                ["Recovery and partition behavior","Recovery claims should be tied to testnet evidence, multi-machine runs, and documented failure scenarios."],
                ["External verification",          "Rust verifier artifacts can be positioned as the independent review path when the verifier package is included in the evidence boundary."],
              ].map(([t,d]) => (
                <div key={t} className="cnl-feature"><div>{t}</div><div>{d}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MODULES
      ══════════════════════════════════════════════ */}
      <section id="modules" className="section-new alt">
        <div className="section-inner-new">
          <div className="eyebrow">Module Ecosystem</div>
          <h2 className="sec-h2" style={{marginBottom:12}}>
            Click any module.<br />Inspect its role.
          </h2>
          <p className="section-copy" style={{marginBottom:42,maxWidth:680}}>
            Each CNS module has an independent operational purpose and a specific role inside the integrated ecosystem.
          </p>

          <div className="module-grid-new">
            {ECO_MODULES.map(mod => (
              <button key={mod.acronym} className="module-card-new" onClick={() => setSelectedModule(mod)}>
                <div style={{height:3,background:mod.color}} />
                <div className="module-img-wrap">
                  {/* FIX: plain <img> — images in /public root, no /brand prefix */}
                  <img src={mod.imgSrc} alt={mod.acronym} loading="lazy" />
                </div>
                <div className="module-body-new">
                  <div className="module-top-new">
                    <div className="module-name-new" style={{color:mod.color}}>{mod.acronym}</div>
                    <div className="module-badge-new" style={{border:`1px solid ${mod.color}`,color:mod.color}}>{mod.badge}</div>
                  </div>
                  <div className="module-full-new">{mod.fullName}</div>
                  <div className="module-desc-new">{mod.desc}</div>
                  <div className="module-action-new">Open module brief →</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LICENSING (was "business")
      ══════════════════════════════════════════════ */}
      <section id="business" className="section-new dim">
        <div className="section-inner-new">
          <div className="eyebrow">Licensing Model</div>
          <h2 className="sec-h2" style={{marginBottom:18}}>
            Three paths to sovereign<br />causal governance.
          </h2>
          <p className="section-copy" style={{maxWidth:620,marginBottom:58}}>
            CNS is not positioned as public SaaS. Access is NDA-first, scoped per domain, deployment boundary, and evidence disclosure level.
          </p>

          <div className="business-grid">
            {[
              {
                eye:"Module License",
                title:"Single Module\nDeployment",
                desc:"Deploy one CNS module for a specific operational domain, use case, or mission need.",
                items:["One module, one operational domain","NDA-first access agreement","Defined license scope","Local or sovereign deployment","Evidence packaging included"],
              },
              {
                eye:"Ecosystem License",
                title:"Full CNS Ecosystem\nPlatform",
                desc:"Access the integrated deterministic causal ecosystem across authority, runtime, integrity, fusion, and evidence layers.",
                items:["All core modules","Unified authority path","Multi-domain operational scope","Public/private evidence boundary","Dedicated institutional engagement"],
                featured:true,
              },
              {
                eye:"Sovereign Nation License",
                title:"Country-Level\nDeployment",
                desc:"CNS licensed at national scale for governments, defense ministries, and sovereign institutions.",
                items:["National-scope license","Sovereign deployment architecture","Air-gapped or private options","Critical sector coverage","Government-level engagement"],
              },
            ].map(card => (
              <div key={card.eye} className={`license-card${card.featured?" featured":""}`}>
                {card.featured && <div className="flag">FLAGSHIP</div>}
                <div className="license-eye">{card.eye}</div>
                <div className="license-title">{card.title}</div>
                <div className="license-desc">{card.desc}</div>
                <ul>{card.items.map(item => <li key={item}><span>-</span>{item}</li>)}</ul>
              </div>
            ))}
          </div>

          <div className="nda-strip">
            <div>
              <strong>All technical access is NDA-first.</strong>
              <p>No public source exposure. Outputs show results, evidence boundaries, hashes, and review paths without exposing protected kernel logic.</p>
            </div>
            <button className="btnPrimary" onClick={() => scrollToId("contact")}>Request Access</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════ */}
      <section id="contact" className="section-new alt">
        <div className="contact-inner-new">
          <div className="eyebrow">Access and Partnerships</div>
          <h2 className="sec-h2">Kernel access<br />is NDA-first.</h2>
          <p>
            CNS is designed for high-stakes evaluation in aerospace, defense, critical infrastructure, financial systems, and sovereign institutions. Partnerships, licensing, and technical review begin under confidentiality.
          </p>
          <div className="security-note">No source access · No kernel exposure · No reverse engineering permitted</div>
          <a className="contact-email" href="mailto:admin@causalnexussystems.com">admin@causalnexussystems.com</a>
          <a href="mailto:admin@causalnexussystems.com" className="btnPrimary" style={{display:"inline-flex"}}>Request NDA Access</a>

          <div className="entity-row">
            {[
              ["Entity",   "Causal Nexus Systems LLC"],
              ["Location", "Orlando, Florida — USA"],
              ["Patents",  "#63/896,666 · #64/043,866 · #64/067,492"],
              ["Founder",  "Anthony Moreno"],
            ].map(([label,value]) => (
              <div key={label}>
                <div className="entity-label">{label}</div>
                <div className="entity-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{
        position:"relative",zIndex:1,background:"#03030a",
        borderTop:"1px solid rgba(255,255,255,0.06)",
        padding:"26px 48px",display:"flex",alignItems:"center",
        justifyContent:"space-between",flexWrap:"wrap",gap:10,
        fontFamily:"Space Mono,monospace",fontSize:10,
        color:"rgba(255,255,255,0.3)",letterSpacing:"0.06em",
      }}>
        <div>Copyright 2026 Causal Nexus Systems LLC · All rights reserved · Public layer only · Kernel access is NDA-first</div>
        <div>CNS <span style={{color:"#1A6FFF"}}>K24</span> · 32 Domains · 24,606 Records · Validation <span style={{color:"#1A6FFF"}}>PASS</span></div>
      </footer>

      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </main>
  );
}
