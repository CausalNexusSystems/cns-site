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

type Metric = {
  v: string;
  l: string;
  cyan?: boolean;
};

// ==================== NAV (7 items — IDs match section ids exactly) ====================
const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },   // → #ecosystem (What is CNS)
  { id: "modules",   label: "Modules" },     // → #modules
  { id: "cns-runs",  label: "CNS-RUNS" },   // → #cns-runs
  { id: "cnl",       label: "CNL" },         // → #cnl
  { id: "ces",       label: "CES" },         // → #ces
  { id: "business",  label: "Licensing" },   // → #business (Licensing section)
  { id: "contact",   label: "Contact" },     // → #contact
];

const METRICS: Metric[] = [
  { v: "8/8",     l: "Active Modules" },
  { v: "32",      l: "Telemetry Domains" },
  { v: "24,606",  l: "Records Processed" },
  { v: "196,848", l: "Module Rows" },
  { v: "PASS",    l: "Validation Status", cyan: true },
];

const RUN_DETAILS = [
  ["Run ID",      "CNS_K24_TRUE_GLOBAL_CRITICAL_INFRASTRUCTURE_ENTROPY_32_DOMAIN"],
  ["Authority",   "K24.1-RS"],
  ["Runtime",     "Iron Guardian V3"],
  ["Records",     "24,606"],
  ["Module Rows", "196,848"],
  ["Validation",  "PASS"],
];

const TELEMETRY_FEEDS = [
  ["Energy Grid",        "LIVE", "#00A85E"],
  ["Aerospace",          "LIVE", "#00C8FF"],
  ["Industrial Control", "LIVE", "#C8A84B"],
  ["Cyber Physical",     "LIVE", "#B83232"],
  ["Logistics",          "LIVE", "#8BA0C0"],
];

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

// ==================== UTILS ====================
function safeSrc(src?: string, fallback = "/brand/cns_logo.png") {
  if (!src) return fallback;
  const s = String(src).trim();
  return s || fallback;
}

function scrollToId(id: SectionKey | string) {
  if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==================== STYLES (exact from original) ====================
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
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.22; }
      }
      @keyframes scan {
        0% { transform: translateY(-100%); opacity: 0; }
        20% { opacity: 0.55; }
        100% { transform: translateY(320%); opacity: 0; }
      }

      .glass {
        background: var(--glass);
        border: 1px solid var(--ring);
        backdrop-filter: blur(10px);
      }
      .btnPrimary {
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 10px 14px; border-radius: 999px;
        background: rgba(56, 189, 248, 0.18); border: 1px solid rgba(56, 189, 248, 0.35);
        color: white; transition: transform 180ms ease, background 180ms ease, border 180ms ease;
        cursor: pointer;
      }
      .btnPrimary:hover { transform: translateY(-1px); background: rgba(56, 189, 248, 0.24); border-color: rgba(56, 189, 248, 0.55); }
      .btnGhost {
        display: inline-flex; align-items: center; justify-content: center; gap: 10px;
        padding: 10px 14px; border-radius: 999px;
        background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9); transition: transform 180ms ease, background 180ms ease, border 180ms ease;
        cursor: pointer;
      }
      .btnGhost:hover { transform: translateY(-1px); background: rgba(255, 255, 255, 0.07); border-color: rgba(255, 255, 255, 0.2); }
      /* FIX 1: sectionTitle — blue, bigger, consistent with eyebrow-inj */
      .sectionTitle { font-size: 13px; letter-spacing: 0.22em; color: #38bdf8; font-weight: 600; }

      /* NAV always horizontal */
      .top-nav { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 18px; }
      .top-nav button {
        font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
        white-space: nowrap; background: none; border: none; cursor: pointer;
        padding: 4px 0; transition: color 180ms ease;
      }
      .top-nav button:hover { color: #fff; }
      @media (max-width: 640px) {
        .top-nav { gap: 3px 10px; }
        .top-nav button { font-size: 11px; }
      }

      /* ── Injected sections styles ── */
      @keyframes tick {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .injected-section {
        position: relative; z-index: 10;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        background: transparent;
      }
      .injected-section.alt { background: transparent; }
      .injected-section.dim { background: transparent; }
      .injected-inner { max-width: 1280px; margin: 0 auto; padding: 96px 48px; }

      .eyebrow-inj {
        font-family: "Space Mono", monospace; font-size: 13px;
        letter-spacing: 0.22em; text-transform: uppercase; color: #38bdf8; font-weight: 600; margin-bottom: 14px;
      }
      .h2-inj {
        font-size: clamp(30px, 4vw, 48px); font-weight: 700; line-height: 1.1;
        margin-bottom: 18px;
      }
      .copy-inj { font-size: 15px; line-height: 1.75; color: rgba(255, 255, 255, 0.6); }

      /* runs */
      .metrics-panel-inj { background: rgba(10,10,22,0.76); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); padding: 34px; border-radius: 16px; }
      .metrics-title-inj { margin-bottom: 24px; font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: #1a6fff; }
      .metrics-row-inj { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid rgba(255,255,255,0.06); margin-bottom: 26px; }
      .metric-inj { padding: 18px 10px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
      .metric-inj:last-child { border-right: none; }
      .metric-v { display: block; font-family: "Space Mono", monospace; font-size: 20px; font-weight: 700; color: white; }
      .metric-v.cyan { color: #00c8ff; }
      .metric-l { margin-top: 4px; font-family: "Space Mono", monospace; font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
      .detail-list-inj { display: grid; gap: 0; }
      .detail-row-inj { display: flex; justify-content: space-between; gap: 16px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
      .detail-row-inj span:first-child { flex: 0 0 auto; font-family: "Space Mono", monospace; font-size: 10px; color: rgba(255,255,255,0.42); text-transform: uppercase; letter-spacing: 0.06em; }
      .detail-row-inj span:last-child { min-width: 0; text-align: right; font-family: "Space Mono", monospace; font-size: 10px; color: rgba(255,255,255,0.82); font-weight: 700; overflow-wrap: anywhere; }
      .status-pill-inj { margin-top: 18px; padding: 10px 14px; background: rgba(0,168,94,0.08); border: 1px solid rgba(0,168,94,0.25); display: flex; align-items: center; gap: 10px; border-radius: 10px; }
      .status-dot-inj { width: 6px; height: 6px; border-radius: 50%; background: #00a85e; box-shadow: 0 0 6px #00a85e; animation: blink 1.5s infinite; flex-shrink: 0; }
      .status-pill-inj span { font-family: "Space Mono", monospace; font-size: 10px; color: #00a85e; letter-spacing: 0.1em; text-transform: uppercase; }
      .live-panel-inj { overflow: hidden; background: rgba(10,10,22,0.76); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(20px); margin-top: 14px; border-radius: 16px; }
      .live-video-inj { position: relative; background: #050812; overflow: hidden; aspect-ratio: 16/9; border-radius: 16px 16px 0 0; }
      .live-video-inj img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .live-overlay-inj { position: absolute; left: 18px; right: 18px; bottom: 16px; z-index: 3; display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; }
      .live-copy-inj div:first-child { font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #00c8ff; margin-bottom: 6px; }
      .live-copy-inj div:last-child { font-family: "Space Grotesk", sans-serif; font-size: 17px; font-weight: 700; line-height: 1.15; color: white; }
      .feed-stack-inj { display: grid; gap: 5px; min-width: 166px; }
      .feed-row-inj { display: flex; justify-content: space-between; gap: 14px; padding: 5px 8px; background: rgba(3,3,10,0.72); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; font-family: "Space Mono", monospace; font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; }
      .live-caption-inj { padding: 14px 18px 16px; display: flex; justify-content: space-between; align-items: center; gap: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
      .live-caption-inj p { max-width: 560px; color: rgba(255,255,255,0.56); font-size: 12px; line-height: 1.5; }
      .live-caption-inj span { flex: 0 0 auto; font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: #00c8ff; }

      /* ecosystem */
      .eco-grid-inj { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
      .qa-list-inj { border-top: 1px solid rgba(255,255,255,0.06); margin-top: 36px; }
      .qa-row-inj { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .qa-row-inj div:first-child { font-size: 13px; font-weight: 600; color: white; }
      .qa-row-inj div:last-child { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.55; }
      .principles-grid-inj { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .principle-inj { background: rgba(15,15,28,0.78); border: 1px solid rgba(255,255,255,0.08); padding: 22px; border-radius: 16px; }
      .principle-inj div:first-child { font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #1a6fff; margin-bottom: 8px; }
      .principle-inj div:last-child { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }

      /* cnl */
      .cnl-grid-inj { display: grid; grid-template-columns: 0.78fr 1.22fr; gap: 74px; align-items: start; }
      .cnl-image-inj { border: 1px solid rgba(255,255,255,0.08); overflow: hidden; background: rgba(15,15,28,0.8); border-radius: 16px; }
      .cnl-image-inj img { width: 100%; display: block; object-fit: cover; filter: brightness(0.94); }
      .cnl-status-inj { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,168,94,0.08); border: 1px solid rgba(0,168,94,0.25); padding: 6px 14px; margin-bottom: 22px; font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #00a85e; border-radius: 8px; }
      .cnl-status-inj::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #00a85e; animation: blink 1.5s infinite; }
      .cnl-metrics-inj { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 28px 0 10px; }
      .cnl-metric-inj { background: rgba(15,15,28,0.8); border: 1px solid rgba(255,255,255,0.06); padding: 16px 10px; text-align: center; border-radius: 12px; }
      .cnl-metric-inj div:first-child { font-family: "Space Mono", monospace; font-size: 18px; font-weight: 700; color: #00a85e; margin-bottom: 3px; }
      .cnl-metric-inj div:last-child { font-family: "Space Mono", monospace; font-size: 8px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.35); }
      .cnl-feature-inj { margin-top: 10px; padding: 14px 16px; background: rgba(15,15,28,0.62); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; }
      .cnl-feature-inj div:first-child { font-size: 13px; font-weight: 700; color: white; margin-bottom: 3px; }
      .cnl-feature-inj div:last-child { font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.52); }

      /* ces */
      .ces-grid-inj { display: grid; grid-template-columns: 1.22fr 0.78fr; gap: 74px; align-items: start; }
      .ces-image-inj { border: 1px solid rgba(200,168,75,0.25); overflow: hidden; background: rgba(15,15,10,0.8); border-radius: 16px; }
      .ces-image-inj img { width: 100%; display: block; object-fit: cover; }
      .ces-badge-inj { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,168,75,0.08); border: 1px solid rgba(200,168,75,0.3); padding: 6px 14px; margin-bottom: 18px; font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #c8a84b; border-radius: 8px; }
      .ces-badge-inj::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #c8a84b; box-shadow: 0 0 6px #c8a84b; animation: blink 2s infinite; }
      .ces-body-inj p { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.68); margin-bottom: 14px; }
      .ces-body-inj p strong { color: #c8a84b; font-weight: 600; }
      .ces-pills-inj { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
      .ces-pill-inj { font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border: 1px solid rgba(200,168,75,0.35); color: #c8a84b; background: rgba(200,168,75,0.06); border-radius: 8px; }
      .ces-rule-inj { margin-top: 22px; padding: 16px 18px; background: rgba(200,168,75,0.05); border: 1px solid rgba(200,168,75,0.2); border-left: 3px solid #c8a84b; border-radius: 0 12px 12px 0; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.9); font-style: italic; line-height: 1.5; }

      @media (max-width: 900px) {
        .eco-grid-inj, .cnl-grid-inj, .ces-grid-inj { grid-template-columns: 1fr; gap: 32px; }
        .principles-grid-inj, .qa-row-inj, .cnl-metrics-inj { grid-template-columns: 1fr 1fr; }
        .metrics-row-inj { grid-template-columns: repeat(2, 1fr); }
        .live-overlay-inj { flex-direction: column; align-items: flex-start; }
        .injected-inner { padding: 60px 20px; }
      }
      @media (max-width: 560px) {
        .principles-grid-inj, .qa-row-inj, .cnl-metrics-inj { grid-template-columns: 1fr; }
        /* Mobile: center titles */
        .eyebrow-inj, .h2-inj { text-align: center; }
        .copy-inj { text-align: center; }
        .ces-pills-inj { justify-content: center; }
      }

      /* ── TICKER SCROLL BAR ── */
      .ticker-wrap { position: relative; z-index: 11; overflow: hidden; border-bottom: 1px solid rgba(200,168,75,0.18); background: rgba(0,0,0,0.25); backdrop-filter: blur(8px); height: 40px; display: flex; align-items: center; }
      .ticker-track { display: flex; align-items: center; white-space: nowrap; animation: tickerScroll 28s linear infinite; }
      .ticker-track:hover { animation-play-state: paused; }
      @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .ticker-item { display: inline-flex; align-items: center; gap: 10px; padding: 0 36px; font-family: "Space Mono", monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #c8a84b; }
      .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: #c8a84b; opacity: 0.6; flex-shrink: 0; }

      /* ── LICENSING SECTION ── */
      .lic-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
      .lic-card { background: rgba(10,10,22,0.55); border: 1px solid rgba(255,255,255,0.08); padding: 34px 26px; position: relative; backdrop-filter: blur(10px); border-radius: 16px; transition: border-color 220ms ease, background 220ms ease; }
      .lic-card:hover { background: rgba(15,15,32,0.7); border-color: rgba(255,255,255,0.16); }
      .lic-card.featured { background: rgba(26,111,255,0.06); border-color: rgba(26,111,255,0.45); }
      .lic-card.featured:hover { background: rgba(26,111,255,0.10); border-color: rgba(26,111,255,0.65); }
      .lic-flag { position: absolute; top: -1px; right: 18px; background: #1a6fff; color: #fff; font-family: "Space Mono", monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 0 0 8px 8px; }
      .lic-eye { font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #38bdf8; margin-bottom: 10px; font-weight: 600; }
      .lic-title { font-size: 22px; font-weight: 700; line-height: 1.2; margin-bottom: 12px; white-space: pre-line; }
      .lic-desc { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.65; margin-bottom: 20px; }
      .lic-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
      .lic-list li { font-size: 13px; color: rgba(237,241,255,0.68); display: flex; align-items: flex-start; gap: 9px; }
      .lic-list li span { color: #38bdf8; flex-shrink: 0; font-family: "Space Mono", monospace; font-size: 11px; }
      .lic-nda { margin-top: 16px; padding: 20px 26px; background: rgba(10,10,22,0.55); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; backdrop-filter: blur(10px); border-radius: 16px; }
      .lic-nda strong { display: block; font-size: 15px; font-weight: 700; margin-bottom: 4px; }
      .lic-nda p { font-size: 12px; color: rgba(255,255,255,0.5); }
      @media (max-width: 900px) { .lic-grid { grid-template-columns: 1fr; gap: 12px; } }

      /* ── MOBILE GLOBAL FIXES ── */
      @media (max-width: 768px) {
        /* Header — reduce height, allow nav to wrap */
        header { height: auto !important; padding: 8px 12px !important; }
        .top-nav { gap: 2px 8px; }
        .top-nav button { font-size: 10px; }
        /* Ticker flush under header */
        .ticker-wrap { margin-top: 0 !important; }
        /* injected padding */
        .injected-inner { padding: 48px 16px !important; }
        /* all 2-col injected grids → 1 col */
        .eco-grid-inj, .cnl-grid-inj, .ces-grid-inj { grid-template-columns: 1fr !important; gap: 24px !important; }
        /* licensing 1 col */
        .lic-grid { grid-template-columns: 1fr !important; }
        /* contact entity 2 col on mobile */
        .contact-entity-row { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
      }
      @media (max-width: 480px) {
        .top-nav button { font-size: 9px; }
        .metrics-row-inj { grid-template-columns: repeat(2,1fr) !important; }
      }

      /* ── NEW CONTACT SECTION ── */
      .contact-new { position: relative; z-index: 10; border-top: 1px solid rgba(255,255,255,0.06); }
      .contact-new-inner { max-width: 860px; margin: 0 auto; padding: 100px 48px 80px; text-align: center; }
      .contact-eyebrow { font-family: "Space Mono", monospace; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #38bdf8; font-weight: 600; margin-bottom: 28px; }
      .contact-desc { font-size: 16px; color: rgba(255,255,255,0.62); line-height: 1.75; max-width: 680px; margin: 0 auto 36px; }
      .contact-warning { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: rgba(200,168,75,0.07); border: 1px solid rgba(200,168,75,0.35); padding: 12px 24px; margin-bottom: 36px; font-family: "Space Mono", monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #c8a84b; font-weight: 700; flex-wrap: wrap; text-align: center; }
      .contact-email-link { display: block; font-size: clamp(16px,3vw,22px); font-weight: 700; color: white; text-decoration: none; margin-bottom: 28px; letter-spacing: 0.02em; transition: color 180ms ease; }
      .contact-email-link:hover { color: #38bdf8; }
      .contact-cta { display: inline-flex; align-items: center; justify-content: center; padding: 14px 44px; background: #1a6fff; color: white; font-family: "Space Mono", monospace; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; cursor: pointer; border: none; transition: background 180ms ease, transform 180ms ease; }
      .contact-cta:hover { background: #4d94ff; transform: translateY(-1px); }
      .contact-entity-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 32px; margin-top: 64px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.07); }
      .contact-entity-label { font-family: "Space Mono", monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 7px; }
      .contact-entity-value { font-size: 14px; font-weight: 600; color: white; line-height: 1.4; }
      @media (max-width: 640px) {
        .contact-new-inner { padding: 64px 20px 56px; }
        .contact-entity-row { grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px; }
        .contact-warning { font-size: 8px; padding: 10px 14px; }
      }

      /* ══════════════════════════════════════════════
         MODAL — always fixed, always on top, scrollable
      ══════════════════════════════════════════════ */
      .modal-outer {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.88);
        backdrop-filter: blur(12px);
        padding: 20px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      .modal-inner {
        position: relative;
        background: rgba(8,8,20,0.98);
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 20px;
        overflow: hidden;
        width: 100%;
        max-width: 920px;
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        max-height: calc(100vh - 40px);
        margin: auto;
      }
      .modal-img-col {
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 28px;
      }
      .modal-img-col img {
        width: 100%;
        max-height: 460px;
        object-fit: contain;
        display: block;
      }
      .modal-text-col {
        padding: 32px 28px;
        overflow-y: auto;
        max-height: calc(100vh - 40px);
        -webkit-overflow-scrolling: touch;
      }
      /* Mobile: bottom sheet */
      @media (max-width: 700px) {
        .modal-outer {
          padding: 0;
          align-items: flex-end;
          justify-content: stretch;
        }
        .modal-inner {
          grid-template-columns: 1fr;
          border-radius: 20px 20px 0 0;
          max-height: 93vh;
          max-width: 100%;
          border-left: none;
          border-right: none;
          border-bottom: none;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .modal-img-col {
          padding: 16px 20px 0;
          min-height: 0;
        }
        .modal-img-col img {
          max-height: 200px;
          width: auto;
          max-width: 100%;
          margin: 0 auto;
          display: block;
        }
        .modal-text-col {
          padding: 16px 16px 40px;
          overflow-y: visible;
          max-height: none;
        }
      }

      /* ══════════════════════════════════════════════
         MODULE CARDS — square on mobile
      ══════════════════════════════════════════════ */
      @media (max-width: 640px) {
        /* Force 1-column and square cards */
        .modules-grid { grid-template-columns: 1fr !important; }
        .module-card-sq {
          display: grid !important;
          grid-template-columns: auto 1fr !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 14px !important;
        }
        .module-card-sq .mod-thumb {
          width: 64px !important;
          height: 64px !important;
          flex-shrink: 0;
        }
        .module-card-sq .mod-desc { display: none !important; }
        .module-card-sq .mod-cta { display: none !important; }
      }

      /* ══════════════════════════════════════════════
         HERO MOBILE — enough padding for dynamic header
      ══════════════════════════════════════════════ */
      @media (max-width: 768px) {
        .hero-pt-mobile { padding-top: 16px !important; }
        .mods-grid-resp { grid-template-columns: 1fr !important; }
        .injected-inner .eyebrow-inj,
        .injected-inner .h2-inj,
        .injected-inner .copy-inj { text-align: center; }
        .ces-body-inj p,
        .detail-row-inj,
        .qa-row-inj div { text-align: left !important; }
        .ces-pills-inj { justify-content: center; }
      }

      /* ══════════════════════════════════════════════
         CREDIBILITY STRIP
      ══════════════════════════════════════════════ */
      .cred-strip {
        position: relative; z-index: 10;
        border-top: 1px solid rgba(255,255,255,0.06);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.025);
        backdrop-filter: blur(8px);
        padding: 13px 24px;
      }
      .cred-inner {
        max-width: 1280px; margin: 0 auto;
        display: flex; align-items: center; justify-content: center;
        flex-wrap: wrap; gap: 0;
      }
      .cred-item {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 4px 18px;
        font-family: "Space Mono", monospace;
        font-size: 10px; font-weight: 600;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: rgba(255,255,255,0.6);
        white-space: nowrap;
      }
      .cred-item.hi { color: #38bdf8; }
      .cred-item.gold { color: #c8a84b; }
      .cred-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; opacity: 0.5; }
      .cred-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.12); flex-shrink: 0; }
      @media (max-width: 700px) {
        .cred-item { font-size: 9px; padding: 3px 10px; }
        .cred-hide { display: none; }
      }

      /* ══════════════════════════════════════════════
         ARCHITECTURE — 4×2 grid
      ══════════════════════════════════════════════ */
      .arch-section {
        position: relative; z-index: 10;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .arch-inner {
        max-width: 1280px; margin: 0 auto; padding: 80px 48px;
      }
      .arch-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-top: 40px;
      }
      .arch-card {
        --mod-color: #38bdf8;
        position: relative;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 20px 16px 16px;
        cursor: pointer;
        text-align: left;
        transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
        overflow: hidden;
        display: flex; flex-direction: column;
      }
      .arch-card:hover {
        transform: translateY(-3px);
        background: rgba(255,255,255,0.07);
        border-color: rgba(255,255,255,0.18);
      }
      .arch-top-bar {
        position: absolute; top: 0; left: 0; right: 0; height: 3px;
        border-radius: 16px 16px 0 0;
        background: var(--mod-color);
        opacity: 0.8;
      }
      .arch-num {
        font-family: "Space Mono", monospace;
        font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
        color: var(--mod-color); opacity: 0.65;
        margin-bottom: 10px;
      }
      .arch-name {
        font-size: 15px; font-weight: 700; line-height: 1.2;
        color: var(--mod-color); margin-bottom: 3px;
      }
      .arch-full {
        font-size: 11px; color: rgba(255,255,255,0.42);
        line-height: 1.45; margin-bottom: 12px; flex: 1;
      }
      .arch-badge {
        display: inline-flex; align-self: flex-start;
        font-family: "Space Mono", monospace;
        font-size: 8px; font-weight: 700;
        letter-spacing: 0.1em; text-transform: uppercase;
        padding: 3px 8px; border-radius: 4px;
        border: 1px solid var(--mod-color);
        color: var(--mod-color); opacity: 0.7;
        margin-bottom: 10px;
      }
      .arch-cta {
        font-family: "Space Mono", monospace;
        font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase;
        color: rgba(255,255,255,0.28);
        transition: color 180ms ease; margin-top: auto;
      }
      .arch-card:hover .arch-cta { color: rgba(255,255,255,0.6); }
      @media (max-width: 900px) {
        .arch-grid { grid-template-columns: repeat(2, 1fr); }
        .arch-inner { padding: 60px 20px; }
      }
      @media (max-width: 480px) {
        .arch-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .arch-card { padding: 14px 12px 12px; }
        .arch-full { display: none; }
      }
    `}</style>
  );
}

// ==================== BACKGROUND (EXACT — DO NOT TOUCH) ====================
function CausalBackground({ intensity = 0.8, focus = "top" }: { intensity?: number; focus?: SectionKey }) {
  const focusMap: Record<SectionKey, { x: number; y: number }> = {
    top:       { x: 25, y: 20 },
    modules:   { x: 22, y: 55 },
    business:  { x: 65, y: 42 },
    demos:     { x: 70, y: 60 },
    community: { x: 35, y: 75 },
    contact:   { x: 55, y: 85 },
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
        background: [
          "radial-gradient(circle at " + p.x + "% " + p.y + "%, rgba(56,189,248,0.22), transparent 52%)",
          "radial-gradient(circle at " + Math.min(95, p.x + 35) + "% " + Math.max(5, p.y - 20) + "%, rgba(168,85,247,0.16), transparent 54%)"
        ].join(", "),
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
            const x1 = (i * 47) % 1200, y1 = (i * 71) % 700;
            const x2 = (x1 + 260 + (i % 7) * 18) % 1200, y2 = (y1 + 190 + (i % 5) * 22) % 700;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g1)" strokeWidth="1" opacity="0.7" />;
          })}
          {Array.from({ length: 34 }).map((_, i) => {
            const x = (i * 89) % 1200, y = (i * 53) % 700, r = 1.5 + (i % 4) * 0.6;
            return <circle key={"c-" + i} cx={x} cy={y} r={r} fill="rgba(56,189,248,0.7)" opacity="0.7" />;
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

// ==================== TOP NAV (always horizontal) ====================
function TopNav() {
  return (
    <nav className="top-nav">
      {NAV_ITEMS.map((item) => (
        <button key={item.id} onClick={() => scrollToId(item.id)}>{item.label}</button>
      ))}
    </nav>
  );
}

// ==================== ROCKET METRICS CARD (EXACT — DO NOT TOUCH) ====================
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
              { k: "FN - False Negatives",               v: "0.00", d: 120 },
              { k: "FP - False Positives",               v: "0.01", d: 240 },
            ].map((x) => (
              <div key={x.k} className="flex items-center justify-between gap-10"
                style={phase === "metrics" ? { animation: "metricFadeUp 520ms ease " + x.d + "ms both" } : { opacity: 0.55 }}>
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
            <img src="/brand/rocket.png" alt="Rocket" style={{ height: 170, width: "auto", objectFit: "contain" }} />
            {phase === "launch" && (
              <div className="absolute left-1/2 top-[152px] -translate-x-1/2">
                <div className="h-[60px] w-[26px] rounded-full" style={{
                  background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.85), rgba(56,189,248,0.35) 35%, rgba(168,85,247,0.18) 65%, rgba(0,0,0,0) 75%)",
                  filter: "blur(0.2px)", animation: "flameFlicker 200ms ease-in-out infinite",
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

// ==================== MODULE MODAL (mobile-optimized) ====================
function ModuleModal({ module, onClose }: { module: EcoModule | null; onClose: () => void }) {
  // Lock body scroll when modal is open — critical for mobile
  useEffect(() => {
    if (module) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [module]);

  // Close on Escape
  useEffect(() => {
    if (!module) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [module, onClose]);

  if (!module) return null;

  return (
    <div className="modal-outer" onClick={onClose}>
      <div className="modal-inner" onClick={e => e.stopPropagation()}>

        {/* IMAGE / FALLBACK */}
        <div className="modal-img-col">
          <img
            src={safeSrc(module.imgSrc)}
            alt={module.acronym}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* CONTENT */}
        <div className="modal-text-col">
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ color: module.color, fontSize: "clamp(26px,5vw,44px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-1px" }}>
                {module.acronym}
              </div>
              <div style={{ fontSize: "clamp(13px,2vw,18px)", color: "rgba(255,255,255,0.72)", marginTop: 6 }}>
                {module.fullName}
              </div>
            </div>
            <button onClick={onClose} style={{
              fontSize: 26, color: "rgba(255,255,255,0.45)", background: "none",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8,
              cursor: "pointer", lineHeight: 1, padding: "4px 10px", flexShrink: 0, marginLeft: 12,
            }}>×</button>
          </div>

          {/* Text sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["DEFINITION",        module.definition],
              ["CREATED FOR",       module.createdFor],
              ["INDEPENDENT USE",   module.independentUse],
              ["ECOSYSTEM USE",     module.ecosystemUse],
            ].map(([title, text]) => (
              <div key={title} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 0" }}>
                <div style={{ fontSize: 10, letterSpacing: "2px", color: module.color, opacity: 0.9, marginBottom: 7, textTransform: "uppercase", fontWeight: 700 }}>
                  {title}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", margin: 0 }}>{text}</p>
              </div>
            ))}

            {/* Tags grid */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["SECTORS",  module.sectors],
                  ["SIGNALS",  module.signals],
                  ["OUTPUTS",  module.outputs],
                  ["EVIDENCE", module.evidence],
                ].map(([label, items]) => (
                  <div key={label as string} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "12px 10px", borderRadius: 8 }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: module.color, marginBottom: 8, fontWeight: 700 }}>
                      {label as string}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {(items as string[]).map(s => (
                        <span key={s} style={{
                          fontSize: 11, color: "rgba(255,255,255,0.62)",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          padding: "3px 8px", borderRadius: 4,
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
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
  const focus = hoverFocus ?? "top";

  return (
    <main className="min-h-screen text-white">
      <GlobalStyles />
      <CausalBackground intensity={0.8} focus={focus} />

      {/* ── HEADER — transparent, no logo, always-horizontal nav, mobile-friendly ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10" style={{ padding: "10px 24px" }}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex-shrink-0 leading-tight">
            <div style={{ fontSize: "clamp(13px,3vw,18px)", fontWeight: 600, letterSpacing: "0.03em", color: "white" }}>Causal Nexus Systems</div>
            <div className="hidden sm:block" style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
              Public Causal Observability • Sealed Outputs • USPTO PPA #63/896,666
            </div>
          </div>
          <TopNav />
        </div>
      </header>

      {/* ── TICKER — directly under fixed header ── */}
      <div className="ticker-wrap" style={{ marginTop: "clamp(52px, 10vw, 76px)" }}>
        <div className="ticker-track">
          {/* doubled for seamless loop */}
          {[...Array(2)].map((_, pass) =>
            ["Deterministic Causal Ecosystems", "Sovereign Deployment Boundary", "Unified Run Ecosystems", "SHA-256 and Merkle Evidence", "Falsifiable", "Causal Observability Live Systems"].map((word, i) => (
              <span key={pass + "-" + i} className="ticker-item">
                {word}
                <span className="ticker-dot" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── HERO (original — untouched except padding) ── */}
      <section className="hero-pt-mobile relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 pb-10">
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

      {/* ══════════════════════════════════════════════
          CREDIBILITY STRIP — between hero and modules
      ══════════════════════════════════════════════ */}
      <div className="cred-strip">
        <div className="cred-inner">
          <div className="cred-item hi"><span className="cred-dot" />USPTO PPA #63/896,666</div>
          <div className="cred-sep" />
          <div className="cred-item hi">8 Active Modules</div>
          <div className="cred-sep" />
          <div className="cred-item hi">32 Telemetry Domains</div>
          <div className="cred-sep" />
          <div className="cred-item gold">SHA-256 + Merkle</div>
          <div className="cred-sep" />
          <div className="cred-item cred-hide">Deterministic</div>
          <div className="cred-sep cred-hide" />
          <div className="cred-item gold cred-hide">NDA-First Access</div>
          <div className="cred-sep cred-hide" />
          <div className="cred-item cred-hide">Validation <span style={{ color: "#00a85e", marginLeft: 4 }}>PASS</span></div>
        </div>
      </div>

      {/* ── MODULES (original — right after hero) ── */}
      <section id="modules" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="sectionTitle">PUBLIC MODULE LAYER</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Modules</h2>
            <p className="mt-2 max-w-2xl text-white/70">Each module is a public window into CNS. Click a module for full technical details.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 mods-grid-resp" style={{ gridTemplateColumns: "repeat(3, 1fr)", alignItems: "stretch" }}>
          {ECO_MODULES.map((mod, index) => (
            <button key={index} onClick={() => setSelectedModule(mod)}
              onMouseEnter={() => setHoverFocus("modules")} onMouseLeave={() => setHoverFocus(null)}
              className="module-card-sq glass group text-left transition"
              style={{
                display: "flex", flexDirection: "column",
                padding: 20, gap: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                cursor: "pointer",
                borderRadius: 20,
                width: "100%",
              }}>

              {/* Top row: thumb + name */}
              <div className="flex items-center gap-3">
                <div className="mod-thumb" style={{
                  width: 56, height: 56, flexShrink: 0,
                  borderRadius: 14, overflow: "hidden",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <img src={safeSrc(mod.imgSrc)} alt={mod.acronym}
                    style={{ width: 56, height: 56, objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: mod.color, fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{mod.acronym}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mod.fullName}</div>
                </div>
              </div>

              {/* Description — grows to fill card height equally */}
              <div className="mod-desc" style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.68)", flex: 1 }}>
                {mod.desc}
              </div>

              {/* CTA always at bottom */}
              <div className="mod-cta" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                View full module details <span style={{ fontSize: 14 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ARCHITECTURE — 4×2 grid, compact, clickable to modal
      ══════════════════════════════════════════════════════ */}
      <section className="arch-section">
        <div className="arch-inner">
          <div className="eyebrow-inj">Eight-Layer Sovereign Ecosystem</div>
          <h2 className="h2-inj" style={{ marginBottom: 8 }}>Architecture.</h2>
          <p className="copy-inj" style={{ maxWidth: 580 }}>
            Each layer serves a precise role in the causal authority chain. Click any module to inspect it.
          </p>

          <div className="arch-grid">
            {[
              { num: "RS", label: "K24.1-RS", full: "Runtime Sovereign Authority", badge: "Authority", color: "#8BA0C0", idx: 0 },
              { num: "02", label: "ACDK v4.1", full: "Adaptive Causal Decision Kernel", badge: "Decision", color: "#B83232", idx: 1 },
              { num: "03", label: "NCM v2.1", full: "Nexus Causal Module", badge: "Edge", color: "#00A85E", idx: 2 },
              { num: "04", label: "MDFE v3.1", full: "Multi-Domain Fusion Engine", badge: "Fusion", color: "#6C32D4", idx: 3 },
              { num: "05", label: "KECS", full: "Kinetic Entropy Coherence System", badge: "Coherence", color: "#4D94FF", idx: 4 },
              { num: "06", label: "ADIK", full: "Deterministic Integrity Kernel", badge: "Integrity", color: "#C85A18", idx: 5 },
              { num: "07", label: "Iron Guardian V3", full: "Runtime Enforcement & Protection", badge: "Protection", color: "#C8A84B", idx: 6 },
              { num: "08", label: "SQS / DEEL", full: "Sealed Quality & Evidence Ledger", badge: "Evidence", color: "#007A6E", idx: 7 },
            ].map((m) => (
              <button
                key={m.label}
                className="arch-card"
                style={{ "--mod-color": m.color } as React.CSSProperties}
                onClick={() => setSelectedModule(ECO_MODULES[m.idx])}
              >
                <div className="arch-top-bar" />
                <div className="arch-num">LAYER {m.num}</div>
                <div className="arch-name">{m.label}</div>
                <div className="arch-full">{m.full}</div>
                <div className="arch-badge">{m.badge}</div>
                <div className="arch-cta">Open brief →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INJECTED SECTION 1 — CNS-RUNS (32 domain run)
      ══════════════════════════════════════════════════════ */}
      <section id="cns-runs" className="injected-section dim">
        <div className="injected-inner">
          <div className="eyebrow-inj">Public Run Evidence</div>
          <h2 className="h2-inj">K24 Unified Run —<br />32 Domains.</h2>

          <div className="metrics-panel-inj">
            <div className="metrics-title-inj">K24 unified run - public metrics layer</div>
            <div className="metrics-row-inj">
              {METRICS.map(m => (
                <div key={m.l} className="metric-inj">
                  <span className={"metric-v" + (m.cyan ? " cyan" : "")}>{m.v}</span>
                  <span className="metric-l">{m.l}</span>
                </div>
              ))}
            </div>
            <div className="detail-list-inj">
              {RUN_DETAILS.map(([k, v]) => (
                <div key={k} className="detail-row-inj"><span>{k}</span><span>{v}</span></div>
              ))}
            </div>
            <div className="status-pill-inj">
              <span className="status-dot-inj" />
              <span>Validation: PASS - public evidence boundary</span>
            </div>
          </div>

          <div className="live-panel-inj">
            <div className="live-video-inj">
              <img src="/brand/CNS_Panel_Live_Ecosystem.png" alt="CNS K24 Live Public Telemetry Operations Monitor" />
            </div>
            <div className="live-caption-inj">
              <p>Live operational telemetry panel — multi-sector CNS intake across 32 active domains.</p>
              <span>PC + phone ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INJECTED SECTION 2 — ECOSYSTEM (What is CNS)
      ══════════════════════════════════════════════════════ */}
      <section id="ecosystem" className="injected-section alt">
        <div className="injected-inner">
          <div className="eco-grid-inj">
            <div>
              <div className="eyebrow-inj">What is CNS</div>
              <h2 className="h2-inj">Not monitoring.<br />Not prediction.<br />Causal governance.</h2>
              <p className="copy-inj" style={{ marginTop: 20 }}>
                CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
              </p>
              <div className="qa-list-inj">
                {[
                  ["Is the system state coherent?",  "CNS evaluates whether the operational state remains causally aligned and structurally valid."],
                  ["Is the system bounded?",          "CNS classifies outputs into controlled operational states rather than opaque reactions."],
                  ["Is runtime trustworthy?",         "CNS validates execution path, module context, and deployment state before action."],
                  ["Is the result reviewable?",       "CNS generates evidence packages for replay, audit, and institutional review."],
                  ["Can evidence be trusted later?",  "CNS supports hash-based integrity, sealed packages, and reviewable chain-of-custody."],
                ].map(([q, a]) => (
                  <div key={q} className="qa-row-inj"><div>{q}</div><div>{a}</div></div>
                ))}
              </div>
            </div>
            <div className="principles-grid-inj">
              {[
                ["Deterministic", "Same validated input and same execution boundary should produce the same reviewable output."],
                ["Bounded",       "Outputs are classified into controlled operational states with explicit review boundaries."],
                ["Sovereign",     "Designed for local, private, air-gapped, or embedded deployment profiles under defined scope."],
                ["Falsifiable",   "Evidence can be packaged through hashes, manifests, Merkle roots, and replay artifacts."],
                ["Traceable",     "Module-level contribution records preserve the authority path from signal to runtime posture."],
                ["Modular",       "Each module can be scoped independently or integrated into the CNS ecosystem."],
              ].map(([title, desc]) => (
                <div key={title} className="principle-inj"><div>{title}</div><div>{desc}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INJECTED SECTION 3 — CNL
      ══════════════════════════════════════════════════════ */}
      <section id="cnl" className="injected-section dim">
        <div className="injected-inner">
          <div className="eyebrow-inj">Causal Nexus Ledger</div>
          <h2 className="h2-inj" style={{ marginBottom: 48 }}>CNL v1.0 — ledger and<br />consensus validation track.</h2>
          <div className="cnl-grid-inj">
            <div className="cnl-image-inj">
              {/* FIX: plain <img> */}
              <img src="/01-CNL.png" alt="CNL v1.0" loading="lazy" />
            </div>
            <div>
              <div className="cnl-status-inj">Validation track - approaching production readiness</div>
              <p className="copy-inj" style={{ marginBottom: 18 }}>
                CNL is the ledger and consensus direction for extending CNS from local sovereign execution into a reviewable network state. CNL is presented as a validation track unless production evidence is published.
              </p>
              <p className="copy-inj">
                The role of CNL is to preserve canonical state, commit evidence, verifier records, and recovery behavior so external review can inspect what was decided, when it was committed, and under which boundary.
              </p>
              <div className="cnl-metrics-inj">
                {[
                  ["<50ms",  "Commit latency target"],
                  ["1K+",    "Batches/min target"],
                  ["<500ms", "Finalization target"],
                  ["Rust",   "Verifier path"],
                ].map(([v, l]) => (
                  <div key={l} className="cnl-metric-inj"><div>{v}</div><div>{l}</div></div>
                ))}
              </div>
              {[
                ["Deterministic commit design",    "CNL is framed around bounded commit certificates and reproducible ledger state rather than probabilistic public-chain language."],
                ["Canonical ledger boundary",      "The ledger becomes the reviewable source of committed state once the deployment scope and verifier package are defined."],
                ["Recovery and partition behavior", "Recovery claims should be tied to testnet evidence, multi-machine runs, and documented failure scenarios."],
                ["External verification",           "Rust verifier artifacts can be positioned as the independent review path when the verifier package is included in the evidence boundary."],
              ].map(([t, d]) => (
                <div key={t} className="cnl-feature-inj"><div>{t}</div><div>{d}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INJECTED SECTION 4 — CES (Causal Execution System)
      ══════════════════════════════════════════════════════ */}
      <section id="ces" className="injected-section alt">
        <div className="injected-inner">
          <div className="eyebrow-inj">Causal Execution System</div>
          <h2 className="h2-inj" style={{ marginBottom: 48 }}>CES — Capital Module<br />of Causal Nexus Systems.</h2>
          <div className="ces-grid-inj">

            {/* TEXT — left */}
            <div className="ces-body-inj">
              <div className="ces-badge-inj">Capital Execution Module</div>

              <p><strong>CES (Causal Execution System) is the capital module of Causal Nexus Systems.</strong> Its purpose is to transform real-world market data into disciplined, auditable financial execution decisions governed by causal rules.</p>

              <p>CES is not designed to guess market direction or operate like a traditional probabilistic bot. Its function is to analyze the cause behind a movement, validate market structure, measure risk, select an executable opportunity, and protect capital before, during, and after every decision.</p>

              <p>The system interprets market data, volatility, liquidity, price structure, institutional pressure, macroeconomic events, news, sectoral behavior, and execution conditions. Based on this information, CES determines whether a trade should be monitored, validated, executed, managed, or blocked.</p>

              <p>As the CNS capital module, CES performs a critical function: converting the ecosystem's causal logic into applied financial discipline. Every decision must pass through controls regarding capital, risk, evidence, contracts, liquidity, exposure, and exit parameters. <strong>If the causal chain is incomplete, CES does not execute.</strong></p>

              <p>Unlike "black-box" probabilistic systems, CES prioritizes traceability, capital protection, execution governance, and auditability. Its value lies not in promising predictive certainty, but in validating when an opportunity is causally executable under real market conditions.</p>

              <p>CES was designed to operate on a deterministic architecture, enabling controlled, portable, and verifiable execution logic. Its objective is to serve as an institutional layer for financial systems, market validation, execution governance, capital protection, and risk-controlled operations.</p>

              <div className="ces-rule-inj">
                CES does not chase random movements. CES validates cause, context, risk, and execution before acting.
              </div>

              <div className="ces-pills-inj">
                {["Financial Systems", "Market-State Validation", "Execution Governance", "Capital Protection", "Risk-Controlled Operations", "Deterministic Causal", "No Cloud Dependency", "No Linux Dependency"].map(p => (
                  <span key={p} className="ces-pill-inj">{p}</span>
                ))}
              </div>
            </div>

            {/* IMAGE — right */}
            <div className="ces-image-inj">
              <img src="/brand/CES_Causal_Execution_System.png" alt="CES — Causal Execution System" loading="lazy" />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LICENSING — replaces Business, matches nav "Licensing"
      ══════════════════════════════════════════════════════ */}
      <section id="business" className="injected-section dim">
        <div className="injected-inner">
          <div className="eyebrow-inj">Licensing Model</div>
          <h2 className="h2-inj" style={{ marginBottom: 18 }}>
            Three paths to sovereign<br />causal governance.
          </h2>
          <p className="copy-inj" style={{ maxWidth: 640, marginBottom: 52 }}>
            CNS is not positioned as public SaaS. Access is NDA-first, scoped per domain, deployment boundary, and evidence disclosure level.
          </p>

          <div className="lic-grid">
            {/* MODULE LICENSE */}
            <div className="lic-card">
              <div className="lic-eye">Module License</div>
              <div className="lic-title">Single Module{"\n"}Deployment</div>
              <div className="lic-desc">Deploy one CNS module for a specific operational domain, use case, or mission need.</div>
              <ul className="lic-list">
                {["One module, one operational domain", "NDA-first access agreement", "Defined license scope", "Local or sovereign deployment", "Evidence packaging included"].map(item => (
                  <li key={item}><span>—</span>{item}</li>
                ))}
              </ul>
            </div>

            {/* ECOSYSTEM LICENSE — FLAGSHIP */}
            <div className="lic-card featured">
              <div className="lic-flag">FLAGSHIP</div>
              <div className="lic-eye">Ecosystem License</div>
              <div className="lic-title">Full CNS Ecosystem{"\n"}Platform</div>
              <div className="lic-desc">Access the integrated deterministic causal ecosystem across authority, runtime, integrity, fusion, and evidence layers.</div>
              <ul className="lic-list">
                {["All core modules", "Unified authority path", "Multi-domain operational scope", "Public/private evidence boundary", "Dedicated institutional engagement"].map(item => (
                  <li key={item}><span>—</span>{item}</li>
                ))}
              </ul>
            </div>

            {/* SOVEREIGN NATION LICENSE */}
            <div className="lic-card">
              <div className="lic-eye">Sovereign Nation License</div>
              <div className="lic-title">Country-Level{"\n"}Deployment</div>
              <div className="lic-desc">CNS licensed at national scale for governments, defense ministries, and sovereign institutions.</div>
              <ul className="lic-list">
                {["National-scope license", "Sovereign deployment architecture", "Air-gapped or private options", "Critical sector coverage", "Government-level engagement"].map(item => (
                  <li key={item}><span>—</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lic-nda">
            <div>
              <strong>All technical access is NDA-first.</strong>
              <p>No public source exposure. Public outputs show results, evidence boundaries, hashes, and review paths without exposing protected kernel logic.</p>
            </div>
            <button className="btnPrimary" onClick={() => scrollToId("contact")} style={{ whiteSpace: "nowrap" }}>
              Request Access →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT — new design (from image), no "Kernel access is NDA-first" heading
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="contact-new">
        <div className="contact-new-inner">

          <div className="contact-eyebrow">Access and Partnerships</div>

          <p className="contact-desc">
            CNS is designed for high-stakes evaluation in aerospace, defense, critical infrastructure, financial systems, and sovereign institutions. Partnerships, licensing, and technical review begin under confidentiality.
          </p>

          <div className="contact-warning">
            No source access — No kernel exposure — No reverse engineering permitted
          </div>

          <a className="contact-email-link" href="mailto:admin@causalnexussystems.com">
            admin@causalnexussystems.com
          </a>

          <a className="contact-cta" href="mailto:admin@causalnexussystems.com">
            Request NDA Access
          </a>

          <div className="contact-entity-row">
            <div>
              <div className="contact-entity-label">Entity</div>
              <div className="contact-entity-value">Causal Nexus Systems LLC</div>
            </div>
            <div>
              <div className="contact-entity-label">Location</div>
              <div className="contact-entity-value">Orlando, Florida — USA</div>
            </div>
            <div>
              <div className="contact-entity-label">Patents</div>
              <div className="contact-entity-value">#63/896,666 · #64/043,866 · #64/067,492</div>
            </div>
            <div>
              <div className="contact-entity-label">Founder</div>
              <div className="contact-entity-value">Anthony Moreno</div>
            </div>
          </div>
        </div>

        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "22px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10,
          fontFamily: "Space Mono, monospace", fontSize: 10,
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em",
        }}>
          <div>Copyright {new Date().getFullYear()} Causal Nexus Systems LLC · All rights reserved · Public layer only · Kernel access is NDA-first</div>
          <div>CNS <span style={{ color: "#1A6FFF" }}>K24</span> · 32 Domains · 24,606 Records · Validation <span style={{ color: "#1A6FFF" }}>PASS</span></div>
        </footer>
      </section>

      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </main>
  );
}
