"use client";

import { useEffect, useState } from "react";

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

const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },
  { id: "modules", label: "Modules" },
  { id: "cnl", label: "CNL" },
  { id: "business", label: "Licensing" },
  { id: "contact", label: "Contact" },
];

const METRICS: Metric[] = [
  { v: "8/8", l: "Active Modules" },
  { v: "32", l: "Telemetry Domains" },
  { v: "24,606", l: "Records Processed" },
  { v: "196,848", l: "Module Rows" },
  { v: "PASS", l: "Validation Status", cyan: true },
];

const RUN_DETAILS = [
  ["Run ID", "CNS_K24_TRUE_GLOBAL_CRITICAL_INFRASTRUCTURE_ENTROPY_32_DOMAIN"],
  ["Authority", "K24.1-RS"],
  ["Runtime", "Iron Guardian V3"],
  ["Records", "24,606"],
  ["Module Rows", "196,848"],
  ["Validation", "PASS"],
];

const TELEMETRY_FEEDS = [
  ["Energy Grid", "LIVE", "#00A85E"],
  ["Aerospace", "LIVE", "#00C8FF"],
  ["Industrial Control", "LIVE", "#C8A84B"],
  ["Cyber Physical", "LIVE", "#B83232"],
  ["Logistics", "LIVE", "#8BA0C0"],
];

const ECO_MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/06-K24_1-RS.png",
    desc: "Command authority for the CNS ecosystem. Integrates module evidence and emits the final deterministic causal decision.",
    definition:
      "K24.1-RS is the authority layer that consolidates module-level evidence, resolves decision pressure, and produces the final system posture under a bounded runtime contract.",
    createdFor:
      "Created to prevent fragmented module outputs from becoming uncontrolled operational decisions. It centralizes authority without exposing the underlying kernel.",
    independentUse:
      "As an independent module, K24.1-RS applies where a mission system needs a deterministic authority layer to classify, approve, reject, or escalate operational states.",
    ecosystemUse:
      "Inside CNS, K24.1-RS is the final authority that receives evidence from NCM, MDFE, ACDK, KECS, ADIK, Iron Guardian, and SQS/DEEL before a runtime posture is emitted.",
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
    definition:
      "ACDK is the decision kernel for strategic causal interpretation. It converts multi-condition operational context into bounded decision options.",
    createdFor:
      "Created for environments where risk changes across time, domain, and mission priority, and where decision posture must remain explainable.",
    independentUse:
      "As an independent module, ACDK applies to mission planning, scenario evaluation, infrastructure prioritization, and risk-aware operational governance.",
    ecosystemUse:
      "Inside CNS, ACDK contributes strategic decision pressure and scenario interpretation to the sovereign authority layer.",
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
    definition:
      "NCM is the edge causal module. It evaluates local operational state close to the physical system without relying on cloud availability.",
    createdFor:
      "Created for local, embedded, or constrained environments where latency, connectivity, and autonomy are operational constraints.",
    independentUse:
      "As an independent module, NCM applies to drones, robotics, sensors, industrial controllers, and autonomous systems that need local bounded decisions.",
    ecosystemUse:
      "Inside CNS, NCM provides edge-level causal pressure and local state evidence to the full ecosystem authority chain.",
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
    definition:
      "MDFE is the fusion layer that aligns heterogeneous telemetry into a coherent causal context before downstream decisions are made.",
    createdFor:
      "Created because critical systems rarely operate in one domain. It reduces fragmented interpretation across sensors, sectors, and operational layers.",
    independentUse:
      "As an independent module, MDFE applies to sensor fusion, situational awareness, infrastructure monitoring, aerospace streams, and cyber-physical correlation.",
    ecosystemUse:
      "Inside CNS, MDFE feeds unified cross-domain context to ACDK, KECS, K24.1-RS, and evidence packaging layers.",
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
    definition:
      "KECS is the coherence and entropy module. It evaluates whether system behavior remains structurally coherent or is drifting toward instability.",
    createdFor:
      "Created to identify instability before it appears as an uncontrolled effect, especially in systems where small deviations can cascade.",
    independentUse:
      "As an independent module, KECS applies to energy grids, industrial process control, aerospace systems, logistics networks, financial infrastructure, and safety monitoring.",
    ecosystemUse:
      "Inside CNS, KECS contributes coherence pressure, cascade risk, fault detection, and containment evidence to the final authority layer.",
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
    definition:
      "ADIK is the integrity kernel that protects consistency between input state, timing, computation path, and repeatable output.",
    createdFor:
      "Created to reduce ambiguity between what the physical system produced, what the runtime processed, and what evidence later proves.",
    independentUse:
      "As an independent module, ADIK applies to physical control systems, industrial automation, robotics, aerospace instrumentation, and evidence-sensitive execution.",
    ecosystemUse:
      "Inside CNS, ADIK reinforces state integrity and repeatability for module outputs before they are integrated into final decisions.",
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
    definition:
      "Iron Guardian is the runtime shield. It enforces bounded execution and protects the environment where deterministic CNS decisions operate.",
    createdFor:
      "Created to keep causal decisions from becoming exposed, unbounded, or unsafe at runtime when operational pressure changes.",
    independentUse:
      "As an independent module, Iron Guardian applies to secure compute environments, embedded protection, mission systems, industrial control, and sovereign infrastructure.",
    ecosystemUse:
      "Inside CNS, Iron Guardian acts as runtime executor and protection layer after authority decisions are emitted.",
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
    definition:
      "SQS/DEEL is the evidence and ledger layer that packages CNS outputs into reviewable, sealed, and hash-verifiable records.",
    createdFor:
      "Created so outputs are not only operationally useful, but also inspectable after the fact by reviewers, partners, or institutional evaluators.",
    independentUse:
      "As an independent module, SQS/DEEL applies to audit systems, compliance workflows, evidence packaging, quality systems, and external attestation.",
    ecosystemUse:
      "Inside CNS, SQS/DEEL preserves the evidence chain across module outputs, final authority decisions, manifests, hashes, and audit packages.",
    sectors: ["Audit systems", "Compliance", "Institutional review", "Quality systems", "Evidence packaging"],
    signals: ["Module output", "Manifest data", "Hash records", "Disclosure boundaries"],
    outputs: ["Sealed package", "Evidence ledger", "Review packet", "Audit trace"],
    evidence: ["SHA-256", "Merkle root", "Run seal", "External audit package"],
  },
];

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<EcoModule | null>(null);

  useEffect(() => {
    if (!selectedModule) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedModule(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedModule]);

  return (
    <main>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          background: #03030a;
        }

        body {
          background: #03030a;
          color: #edf1ff;
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(26, 111, 255, 0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 111, 255, 0.018) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.22; }
        }

        @keyframes tick {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes liftIn {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 0.55; }
          100% { transform: translateY(320%); opacity: 0; }
        }

        main {
          min-height: 100vh;
          color: white;
          background: #03030a;
          overflow-x: hidden;
        }

        .video-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .video-bg video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .video-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(3, 3, 10, 0.3) 0%, rgba(3, 3, 10, 0.68) 58%, rgba(3, 3, 10, 0.94) 100%),
            radial-gradient(ellipse 70% 50% at 50% 30%, rgba(26, 111, 255, 0.09) 0%, transparent 72%);
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          height: 68px;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(3, 3, 10, 0.94);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          text-align: left;
        }

        .brand-mark {
          width: 34px;
          height: 34px;
          border: 1px solid #1a6fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #1a6fff;
          position: relative;
          flex: 0 0 auto;
        }

        .brand-mark::after {
          content: "";
          position: absolute;
          top: -4px;
          right: -4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00c8ff;
          box-shadow: 0 0 6px #00c8ff;
          animation: blink 2s infinite;
        }

        .brand-name {
          font-family: "Space Grotesk", sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .brand-sub {
          margin-top: 2px;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          gap: 36px;
          align-items: center;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
        }

        .nav-link:hover,
        .nav-link:focus-visible {
          color: white;
          outline: none;
        }

        .menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: white;
          font-family: "Space Mono", monospace;
          font-size: 18px;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
        }

        .btn-primary,
        .btn-ghost {
          min-height: 44px;
          padding: 13px 26px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .btn-primary {
          background: #1a6fff;
          color: #fff;
          border: none;
        }

        .btn-primary:hover,
        .btn-primary:focus-visible {
          background: #4d94ff;
          transform: translateY(-1px);
          outline: none;
        }

        .btn-ghost {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .btn-ghost:hover,
        .btn-ghost:focus-visible {
          border-color: #1a6fff;
          color: #4d94ff;
          outline: none;
        }

        .ticker-shell {
          position: relative;
          z-index: 1;
          padding-top: 68px;
        }

        .ticker-bar {
          background: #07070f;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          height: 44px;
          overflow: hidden;
        }

        .ticker-inner {
          display: flex;
          align-items: center;
          height: 100%;
          animation: tick 42s linear infinite;
          white-space: nowrap;
        }

        .t-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          height: 100%;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .t-v {
          color: #00c8ff;
          font-weight: 700;
        }

        .t-p {
          color: #00a85e;
          font-weight: 700;
        }

        .prop-bar {
          display: flex;
          justify-content: center;
          gap: 34px;
          flex-wrap: wrap;
          padding: 16px 48px;
          background: rgba(10, 10, 22, 0.82);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 1;
        }

        .prop {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.52);
        }

        .hero {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          padding: 92px 48px 86px;
          animation: liftIn 0.7s ease both;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
          gap: 72px;
          align-items: center;
        }

        .eyebrow {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1a6fff;
          margin-bottom: 14px;
        }

        .hero-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(64px, 10vw, 112px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: 0;
          margin-bottom: 16px;
        }

        .hero-title span {
          background: linear-gradient(130deg, #ffffff 0%, #4d94ff 48%, #00c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(12px, 1.4vw, 15px);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 42px;
        }

        .hero-line {
          max-width: 620px;
          margin-bottom: 46px;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(22px, 2.8vw, 34px);
          font-weight: 300;
          line-height: 1.35;
          color: rgba(237, 241, 255, 0.88);
        }

        .hero-line strong {
          color: #00c8ff;
          font-weight: 600;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-panel-stack {
          display: grid;
          gap: 14px;
        }

        .metrics-panel,
        .live-panel {
          background: rgba(10, 10, 22, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .metrics-panel {
          padding: 34px;
        }

        .metrics-title {
          margin-bottom: 24px;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1a6fff;
        }

        .metrics-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 26px;
        }

        .metric {
          padding: 18px 10px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .metric:last-child {
          border-right: none;
        }

        .metric-value {
          display: block;
          font-family: "Space Mono", monospace;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .metric-value.cyan {
          color: #00c8ff;
        }

        .metric-label {
          margin-top: 4px;
          font-family: "Space Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        .detail-list {
          display: grid;
          gap: 0;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .detail-row span:first-child {
          flex: 0 0 auto;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.42);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .detail-row span:last-child {
          min-width: 0;
          text-align: right;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.82);
          font-weight: 700;
          overflow-wrap: anywhere;
        }

        .status-pill {
          margin-top: 18px;
          padding: 10px 14px;
          background: rgba(0, 168, 94, 0.08);
          border: 1px solid rgba(0, 168, 94, 0.25);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00a85e;
          box-shadow: 0 0 6px #00a85e;
          animation: blink 1.5s infinite;
          flex-shrink: 0;
        }

        .status-pill span {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: #00a85e;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .live-panel {
          overflow: hidden;
        }

        .live-video {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #050812;
          overflow: hidden;
        }

        .live-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.9;
        }

        .live-video::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 0%, rgba(3, 3, 10, 0.5) 100%),
            linear-gradient(90deg, rgba(0, 200, 255, 0.08) 1px, transparent 1px);
          background-size: 100% 100%, 28px 28px;
          pointer-events: none;
          z-index: 1;
        }

        .live-video::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 34%;
          background: linear-gradient(180deg, transparent, rgba(0, 200, 255, 0.16), transparent);
          animation: scan 4.5s linear infinite;
          pointer-events: none;
          z-index: 2;
        }

        .live-overlay {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          z-index: 3;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
        }

        .live-copy {
          max-width: 360px;
        }

        .live-copy div:first-child {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #00c8ff;
          margin-bottom: 6px;
        }

        .live-copy div:last-child {
          font-family: "Space Grotesk", sans-serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.15;
          color: white;
        }

        .feed-stack {
          display: grid;
          gap: 5px;
          min-width: 166px;
        }

        .feed-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 5px 8px;
          background: rgba(3, 3, 10, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: "Space Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .live-caption {
          padding: 14px 18px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .live-caption p {
          max-width: 560px;
          color: rgba(255, 255, 255, 0.56);
          font-size: 12px;
          line-height: 1.5;
        }

        .live-caption span {
          flex: 0 0 auto;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00c8ff;
        }

        .section {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .section.alt {
          background: rgba(7, 7, 16, 0.72);
        }

        .section.dim {
          background: rgba(10, 10, 22, 0.62);
        }

        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 96px 48px;
        }

        .section-head {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(340px, 1fr);
          gap: 80px;
          align-items: end;
          margin-bottom: 58px;
        }

        h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: 0;
        }

        .section-copy {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.6);
        }

        .ecosystem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .qa-list {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 36px;
        }

        .qa-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .qa-row div:first-child {
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: white;
        }

        .qa-row div:last-child {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.55;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .principle {
          background: rgba(15, 15, 28, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 22px;
        }

        .principle div:first-child {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a6fff;
          margin-bottom: 8px;
        }

        .principle div:last-child {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.5;
        }

        .layer-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .layer-row {
          display: grid;
          grid-template-columns: 100px 46px 1fr;
          align-items: stretch;
        }

        .layer-label {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          text-align: right;
          padding-right: 14px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .layer-num {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 12px;
          margin: auto;
          flex-shrink: 0;
        }

        .layer-body {
          margin-left: 14px;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .layer-title {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 3px;
        }

        .layer-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .tag-row {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: flex-end;
          flex-shrink: 0;
          max-width: 250px;
        }

        .tag {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 8px;
          opacity: 0.68;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
        }

        .module-card {
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: white;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }

        .module-card:hover,
        .module-card:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.06);
          outline: none;
        }

        .module-img-wrap {
          width: 100%;
          aspect-ratio: 1.25 / 1;
          overflow: hidden;
          background: #07070f;
        }

        .module-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.84);
          transition: transform 0.45s ease, filter 0.3s ease;
        }

        .module-card:hover img,
        .module-card:focus-visible img {
          transform: scale(1.035);
          filter: brightness(1);
        }

        .module-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .module-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }

        .module-name {
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 16px;
        }

        .module-badge {
          font-family: "Space Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          white-space: nowrap;
          flex-shrink: 0;
          opacity: 0.75;
        }

        .module-full {
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
          margin-bottom: 10px;
        }

        .module-desc {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.62);
          margin-bottom: 14px;
          flex: 1;
        }

        .module-action {
          margin-top: auto;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.56);
        }

        .cnl-grid {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 74px;
          align-items: start;
        }

        .cnl-image {
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          background: rgba(15, 15, 28, 0.8);
        }

        .cnl-image img {
          width: 100%;
          display: block;
          object-fit: cover;
          filter: brightness(0.94);
        }

        .cnl-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 168, 94, 0.08);
          border: 1px solid rgba(0, 168, 94, 0.25);
          padding: 6px 14px;
          margin-bottom: 22px;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00a85e;
        }

        .cnl-status::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00a85e;
          animation: blink 1.5s infinite;
        }

        .cnl-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          margin: 28px 0 2px;
        }

        .cnl-metric {
          background: rgba(15, 15, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 16px 10px;
          text-align: center;
        }

        .cnl-metric div:first-child {
          font-family: "Space Mono", monospace;
          font-size: 18px;
          font-weight: 700;
          color: #00a85e;
          margin-bottom: 3px;
        }

        .cnl-metric div:last-child {
          font-family: "Space Mono", monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.35);
        }

        .cnl-feature {
          margin-top: 2px;
          padding: 14px 16px;
          background: rgba(15, 15, 28, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cnl-feature div:first-child {
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: white;
          margin-bottom: 3px;
        }

        .cnl-feature div:last-child {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.52);
        }

        .business-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .license-card {
          background: rgba(15, 15, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 34px 26px;
          position: relative;
        }

        .license-card.featured {
          background: rgba(26, 111, 255, 0.05);
          border-color: rgba(26, 111, 255, 0.4);
        }

        .flag {
          position: absolute;
          top: -1px;
          right: 18px;
          background: #1a6fff;
          color: #fff;
          font-family: "Space Mono", monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 10px;
        }

        .license-eye {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a6fff;
          margin-bottom: 10px;
        }

        .license-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.2;
          white-space: pre-line;
        }

        .license-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .license-card ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .license-card li {
          font-size: 13px;
          color: rgba(237, 241, 255, 0.65);
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }

        .license-card li span {
          color: #1a6fff;
          flex-shrink: 0;
          font-family: "Space Mono", monospace;
          font-size: 11px;
        }

        .nda-strip {
          margin-top: 24px;
          padding: 18px 24px;
          background: rgba(15, 15, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .nda-strip strong {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .nda-strip p {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .contact-inner {
          max-width: 820px;
          margin: 0 auto;
          padding: 96px 48px;
          text-align: center;
        }

        .contact-inner p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.7;
          margin: 16px auto 34px;
        }

        .security-note {
          display: inline-flex;
          align-items: center;
          background: rgba(200, 168, 75, 0.07);
          border: 1px solid rgba(200, 168, 75, 0.25);
          padding: 9px 18px;
          margin-bottom: 30px;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #c8a84b;
        }

        .contact-email {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          margin-bottom: 26px;
        }

        .entity-row {
          display: flex;
          justify-content: center;
          gap: 44px;
          flex-wrap: wrap;
          margin-top: 44px;
          padding-top: 44px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .entity-label {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 4px;
        }

        .entity-value {
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: white;
        }

        footer {
          position: relative;
          z-index: 1;
          background: #03030a;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 26px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-family: "Space Mono", monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.06em;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(18px);
          padding: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          width: min(1120px, 100%);
          max-height: min(820px, calc(100vh - 72px));
          overflow: auto;
          background: #070711;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: white;
          display: grid;
          grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
          box-shadow: 0 26px 80px rgba(0, 0, 0, 0.5);
        }

        .modal-media {
          min-height: 100%;
          background: #03030a;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-media img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          object-fit: cover;
          display: block;
        }

        .modal-content {
          padding: 34px;
        }

        .modal-close {
          float: right;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.04);
          color: white;
          cursor: pointer;
          font-family: "Space Mono", monospace;
          font-size: 18px;
        }

        .modal-title {
          padding-right: 56px;
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 10px;
        }

        .modal-full {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 24px;
        }

        .modal-section {
          padding: 18px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-section h3 {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .modal-section p {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.66);
        }

        .modal-columns {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          margin-top: 18px;
        }

        .modal-list {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 16px;
        }

        .modal-list h4 {
          font-family: "Space Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .modal-list ul {
          list-style: none;
          display: grid;
          gap: 8px;
        }

        .modal-list li {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.4;
        }

        .modal-list li::before {
          content: "- ";
          color: currentColor;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }

        @media (max-width: 1180px) {
          .module-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-panel-stack {
            max-width: 780px;
          }
        }

        @media (max-width: 900px) {
          .nav {
            padding: 0 20px;
          }

          .brand-sub {
            display: none;
          }

          .nav-links,
          .nav-cta {
            display: none;
          }

          .menu-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-menu {
            display: grid;
            position: fixed;
            top: 68px;
            left: 0;
            right: 0;
            z-index: 190;
            background: rgba(3, 3, 10, 0.97);
            backdrop-filter: blur(22px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding: 14px 20px 20px;
            gap: 8px;
          }

          .mobile-menu .nav-link,
          .mobile-menu .btn-primary {
            width: 100%;
            justify-content: flex-start;
          }

          .hero,
          .section-inner,
          .contact-inner {
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero {
            padding-top: 74px;
          }

          .prop-bar {
            justify-content: flex-start;
            gap: 14px;
            padding: 14px 20px;
          }

          .section-head,
          .ecosystem-grid,
          .cnl-grid,
          .business-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .principles-grid,
          .qa-row,
          .cnl-metrics {
            grid-template-columns: 1fr 1fr;
          }

          .module-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .layer-row {
            grid-template-columns: 34px 1fr;
            gap: 12px;
          }

          .layer-label {
            display: none;
          }

          .layer-body {
            margin-left: 0;
            flex-direction: column;
            align-items: flex-start;
          }

          .tag-row {
            justify-content: flex-start;
            max-width: 100%;
          }

          .metrics-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric {
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .metric:nth-child(even) {
            border-right: none;
          }

          .metric:last-child {
            grid-column: 1 / -1;
          }

          .live-overlay {
            align-items: flex-start;
            flex-direction: column;
          }

          .feed-stack {
            width: 100%;
          }

          .live-caption {
            align-items: flex-start;
            flex-direction: column;
          }

          .modal-backdrop {
            padding: 18px;
            align-items: stretch;
          }

          .modal {
            max-height: calc(100vh - 36px);
            grid-template-columns: 1fr;
          }

          .modal-media {
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .modal-media img {
            min-height: 0;
            aspect-ratio: 1.25 / 1;
          }
        }

        @media (max-width: 560px) {
          .brand-name {
            font-size: 13px;
          }

          .hero-title {
            font-size: 62px;
          }

          .hero-subtitle {
            letter-spacing: 0.11em;
          }

          .hero-actions,
          .hero-actions .btn-primary,
          .hero-actions .btn-ghost,
          .nda-strip .btn-primary {
            width: 100%;
          }

          .metrics-panel {
            padding: 22px;
          }

          .detail-row {
            display: grid;
          }

          .detail-row span:last-child {
            text-align: left;
          }

          .module-grid,
          .principles-grid,
          .qa-row,
          .cnl-metrics,
          .modal-columns {
            grid-template-columns: 1fr;
          }

          .module-body {
            padding: 18px;
          }

          .modal-content {
            padding: 24px;
          }

          footer {
            padding: 24px 20px;
          }
        }
      `}</style>

      <div className="video-bg" aria-hidden="true">
        <video src="/brand/cns_canvas.mp4" autoPlay loop muted playsInline preload="metadata" />
      </div>

      <nav className="nav" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollToSection("top")} aria-label="Go to top">
          <span className="brand-mark">CNS</span>
          <span>
            <span className="brand-name">Causal Nexus Systems</span>
            <span className="brand-sub">Sovereign Deterministic Ecosystem</span>
          </span>
        </button>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} className="nav-link" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <button className="btn-primary nav-cta" style={{ minHeight: 38, padding: "9px 20px", fontSize: 11 }} onClick={() => scrollToSection("contact")}>
          NDA Access
        </button>

        <button className="menu-btn" onClick={() => setMenuOpen((open) => !open)} aria-label="Open navigation" aria-expanded={menuOpen}>
          {menuOpen ? "x" : "="}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className="nav-link"
              onClick={() => {
                setMenuOpen(false);
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="btn-primary"
            onClick={() => {
              setMenuOpen(false);
              scrollToSection("contact");
            }}
          >
            NDA Access
          </button>
        </div>
      )}

      <div id="top" className="ticker-shell">
        <div className="ticker-bar">
          <div className="ticker-inner">
            {[
              ["Run ID", "32-DOMAIN", false],
              ["Authority", "K24.1-RS", false],
              ["Runtime", "Iron Guardian V3", false],
              ["Records", "24,606", false],
              ["Module Rows", "196,848", false],
              ["Validation", "PASS", true],
              ["Evidence", "SHA-256 + Merkle", false],
              ["Access", "NDA-first", false],
            ].flatMap((item, index) => [
              <div key={`${index}-a`} className="t-item">
                {item[0]} <span className={item[2] ? "t-p" : "t-v"}>{item[1] as string}</span>
              </div>,
              <div key={`${index}-b`} className="t-item">
                {item[0]} <span className={item[2] ? "t-p" : "t-v"}>{item[1] as string}</span>
              </div>,
            ])}
          </div>
        </div>
      </div>

      <div className="prop-bar">
        <div className="prop">Deterministic causal</div>
        <div className="prop">Local execution path</div>
        <div className="prop">Sovereign deployment boundary</div>
        <div className="prop">SHA-256 and Merkle evidence</div>
        <div className="prop">NDA-first technical access</div>
      </div>

      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Causal Nexus Systems LLC</div>
            <h1 className="hero-title">
              <span>CNS</span>
            </h1>
            <div className="hero-subtitle">Next-generation sovereign deterministic ecosystem</div>
            <p className="hero-line">
              <strong>CNS measures the cause.</strong>
              <br />
              It does not wait for the effect.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToSection("modules")}>
                Explore Modules
              </button>
              <button className="btn-ghost" onClick={() => scrollToSection("contact")}>
                Request NDA Access
              </button>
            </div>
          </div>

          <div className="hero-panel-stack">
            <div className="metrics-panel">
              <div className="metrics-title">K24 unified run - public metrics layer</div>
              <div className="metrics-row">
                {METRICS.map((metric) => (
                  <div key={metric.l} className="metric">
                    <span className={`metric-value ${metric.cyan ? "cyan" : ""}`}>{metric.v}</span>
                    <span className="metric-label">{metric.l}</span>
                  </div>
                ))}
              </div>
              <div className="detail-list">
                {RUN_DETAILS.map(([key, value]) => (
                  <div key={key} className="detail-row">
                    <span>{key}</span>
                    <span>{value}</span>
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
                    {TELEMETRY_FEEDS.map(([sector, status, color]) => (
                      <div key={sector} className="feed-row">
                        <span>{sector}</span>
                        <span style={{ color }}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="live-caption">
                <p>
                  Place the live panel recording at <strong>/public/brand/cns_live_telemetry_panel.mp4</strong>. The page keeps the current background video and adds this operational telemetry layer inside the hero.
                </p>
                <span>PC + phone ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="section dim">
        <div className="section-inner">
          <div className="ecosystem-grid">
            <div>
              <div className="eyebrow">What is CNS</div>
              <h2>
                Not monitoring.
                <br />
                Not prediction.
                <br />
                Causal governance.
              </h2>
              <p className="section-copy" style={{ marginTop: 20 }}>
                CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
              </p>
              <div className="qa-list">
                {[
                  ["Is the system state coherent?", "CNS evaluates whether the operational state remains causally aligned and structurally valid."],
                  ["Is the system bounded?", "CNS classifies outputs into controlled operational states rather than opaque reactions."],
                  ["Is runtime trustworthy?", "CNS validates execution path, module context, and deployment state before action."],
                  ["Is the result reviewable?", "CNS generates evidence packages for replay, audit, and institutional review."],
                  ["Can evidence be trusted later?", "CNS supports hash-based integrity, sealed packages, and reviewable chain-of-custody."],
                ].map(([question, answer]) => (
                  <div key={question} className="qa-row">
                    <div>{question}</div>
                    <div>{answer}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="principles-grid">
              {[
                ["Deterministic", "Same validated input and same execution boundary should produce the same reviewable output."],
                ["Bounded", "Outputs are classified into controlled operational states with explicit review boundaries."],
                ["Sovereign", "Designed for local, private, air-gapped, or embedded deployment profiles under defined scope."],
                ["Falsifiable", "Evidence can be packaged through hashes, manifests, Merkle roots, and replay artifacts."],
                ["Traceable", "Module-level contribution records preserve the authority path from signal to runtime posture."],
                ["Modular", "Each module can be scoped independently or integrated into the CNS ecosystem."],
              ].map(([title, description]) => (
                <div key={title} className="principle">
                  <div>{title}</div>
                  <div>{description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Architecture</div>
              <h2>
                Eight-layer
                <br />
                sovereign ecosystem.
              </h2>
            </div>
            <p className="section-copy">
              Each layer serves a precise institutional role. The value is not a list of tools, but a coherent authority, runtime, integrity, and evidence chain.
            </p>
          </div>

          <div className="layer-list">
            {[
              { lbl: "Authority", num: "RS", color: "#8BA0C0", mod: "K24.1-RS - Runtime Sovereign Authority", desc: "Integrates module verdicts and emits the final deterministic decision.", tags: ["Command Authority", "Mission Governance"] },
              { lbl: "Decision", num: "2", color: "#B83232", mod: "ACDK v4.1 - Adaptive Causal Decision Kernel", desc: "Strategic decision governance for mission planning and multi-domain coordination.", tags: ["Decision", "Risk"] },
              { lbl: "Edge", num: "3", color: "#00A85E", mod: "NCM v2.1 - Nexus Causal Module", desc: "Compact causal operation for edge devices, robotics, drones, and autonomous systems.", tags: ["Edge", "Embedded"] },
              { lbl: "Fusion", num: "4", color: "#6C32D4", mod: "MDFE v3.1 - Multi-Domain Fusion Engine", desc: "Fuses heterogeneous streams into unified causal context.", tags: ["Fusion", "Signals"] },
              { lbl: "Coherence", num: "5", color: "#4D94FF", mod: "KECS - Kinetic Entropy Coherence System", desc: "Evaluates entropy, coherence, cascade risk, and safe-state containment.", tags: ["Safety", "Resilience"] },
              { lbl: "Integrity", num: "6", color: "#C85A18", mod: "ADIK / AetherCore - Deterministic Integrity Kernel", desc: "Protects timing consistency, output determinism, and state integrity.", tags: ["Integrity", "Repeatability"] },
              { lbl: "Protection", num: "7", color: "#C8A84B", mod: "Iron Guardian V3 - Runtime Enforcement Shield", desc: "Enforces bounded execution and protects deterministic runtime operation.", tags: ["Protection", "Runtime"] },
              { lbl: "Evidence", num: "8", color: "#007A6E", mod: "SQS / DEEL - Evidence and Execution Ledger", desc: "Packages CNS outputs as traceable, sealed, reviewable institutional evidence.", tags: ["Audit", "Evidence"] },
            ].map((row) => (
              <div key={row.mod} className="layer-row">
                <div className="layer-label">{row.lbl}</div>
                <div className="layer-num" style={{ background: `${row.color}18`, border: `1px solid ${row.color}`, color: row.color }}>
                  {row.num}
                </div>
                <div className="layer-body" style={{ borderLeft: `2px solid ${row.color}`, background: "rgba(15, 15, 28, 0.6)" }}>
                  <div>
                    <div className="layer-title" style={{ color: row.color }}>
                      {row.mod}
                    </div>
                    <div className="layer-desc">{row.desc}</div>
                  </div>
                  <div className="tag-row">
                    {row.tags.map((tag) => (
                      <span key={tag} className="tag" style={{ border: `1px solid ${row.color}`, color: row.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="section dim">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Module Ecosystem</div>
              <h2>
                Click any module.
                <br />
                Inspect its role.
              </h2>
            </div>
            <p className="section-copy">
              Each CNS module has an independent operational purpose and a specific role inside the integrated ecosystem. The public page should show both without exposing kernel logic.
            </p>
          </div>

          <div className="module-grid">
            {ECO_MODULES.map((mod) => (
              <button key={mod.acronym} className="module-card" onClick={() => setSelectedModule(mod)}>
                <div style={{ height: 3, background: mod.color }} />
                <div className="module-img-wrap">
                  <img src={mod.imgSrc} alt={mod.acronym} loading="lazy" />
                </div>
                <div className="module-body">
                  <div className="module-top">
                    <div className="module-name" style={{ color: mod.color }}>
                      {mod.acronym}
                    </div>
                    <div className="module-badge" style={{ border: `1px solid ${mod.color}`, color: mod.color }}>
                      {mod.badge}
                    </div>
                  </div>
                  <div className="module-full">{mod.fullName}</div>
                  <div className="module-desc">{mod.desc}</div>
                  <div className="module-action">Open module brief</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="cnl" className="section alt">
        <div className="section-inner">
          <div className="eyebrow">Causal Nexus Ledger</div>
          <h2 style={{ marginBottom: 48 }}>
            CNL v1.0 - ledger and
            <br />
            consensus validation track.
          </h2>

          <div className="cnl-grid">
            <div className="cnl-image">
              <img src="/01-CNL.png" alt="CNL v1.0" loading="lazy" />
            </div>

            <div>
              <div className="cnl-status">Validation track - approaching production readiness</div>
              <p className="section-copy" style={{ marginBottom: 18 }}>
                CNL is the ledger and consensus direction for extending CNS from local sovereign execution into a reviewable network state. Public wording should stay precise: CNL is presented as a validation track unless production evidence is published.
              </p>
              <p className="section-copy">
                The role of CNL is to preserve canonical state, commit evidence, verifier records, and recovery behavior so external review can inspect what was decided, when it was committed, and under which boundary.
              </p>

              <div className="cnl-metrics">
                {[
                  ["<50ms", "Commit latency target"],
                  ["1K+", "Batches/min target"],
                  ["<500ms", "Finalization target"],
                  ["Rust", "Verifier path"],
                ].map(([value, label]) => (
                  <div key={label} className="cnl-metric">
                    <div>{value}</div>
                    <div>{label}</div>
                  </div>
                ))}
              </div>

              {[
                ["Deterministic commit design", "CNL is framed around bounded commit certificates and reproducible ledger state rather than probabilistic public-chain language."],
                ["Canonical ledger boundary", "The ledger becomes the reviewable source of committed state once the deployment scope and verifier package are defined."],
                ["Recovery and partition behavior", "Recovery claims should be tied to testnet evidence, multi-machine runs, and documented failure scenarios."],
                ["External verification", "Rust verifier artifacts can be positioned as the independent review path when the verifier package is included in the evidence boundary."],
              ].map(([title, description]) => (
                <div key={title} className="cnl-feature">
                  <div>{title}</div>
                  <div>{description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="business" className="section dim">
        <div className="section-inner">
          <div className="eyebrow">Licensing Model</div>
          <h2 style={{ marginBottom: 18 }}>
            Three paths to sovereign
            <br />
            causal governance.
          </h2>
          <p className="section-copy" style={{ maxWidth: 620, marginBottom: 58 }}>
            CNS is not positioned as public SaaS. Access is NDA-first, scoped per domain, deployment boundary, and evidence disclosure level.
          </p>

          <div className="business-grid">
            {[
              {
                eye: "Module License",
                title: "Single Module\nDeployment",
                desc: "Deploy one CNS module for a specific operational domain, use case, or mission need.",
                items: ["One module, one operational domain", "NDA-first access agreement", "Defined license scope", "Local or sovereign deployment", "Evidence packaging included"],
              },
              {
                eye: "Ecosystem License",
                title: "Full CNS Ecosystem\nPlatform",
                desc: "Access the integrated deterministic causal ecosystem across authority, runtime, integrity, fusion, and evidence layers.",
                items: ["All core modules", "Unified authority path", "Multi-domain operational scope", "Public/private evidence boundary", "Dedicated institutional engagement"],
                featured: true,
              },
              {
                eye: "Sovereign Nation License",
                title: "Country-Level\nDeployment",
                desc: "CNS licensed at national scale for governments, defense ministries, and sovereign institutions.",
                items: ["National-scope license", "Sovereign deployment architecture", "Air-gapped or private options", "Critical sector coverage", "Government-level engagement"],
              },
            ].map((card) => (
              <div key={card.eye} className={`license-card ${card.featured ? "featured" : ""}`}>
                {card.featured && <div className="flag">FLAGSHIP</div>}
                <div className="license-eye">{card.eye}</div>
                <div className="license-title">{card.title}</div>
                <div className="license-desc">{card.desc}</div>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>
                      <span>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="nda-strip">
            <div>
              <strong>All technical access is NDA-first.</strong>
              <p>No public source exposure. Public outputs should show results, evidence boundaries, hashes, and review paths without exposing protected kernel logic.</p>
            </div>
            <button className="btn-primary" onClick={() => scrollToSection("contact")}>
              Request Access
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="section alt">
        <div className="contact-inner">
          <div className="eyebrow">Access and Partnerships</div>
          <h2>
            Kernel access
            <br />
            is NDA-first.
          </h2>
          <p>
            CNS is designed for high-stakes evaluation in aerospace, defense, critical infrastructure, financial systems, and sovereign institutions. Partnerships, licensing, and technical review begin under confidentiality.
          </p>
          <div className="security-note">No source access - no kernel exposure - no reverse engineering permitted</div>
          <a className="contact-email" href="mailto:admin@causalnexussystems.com">
            admin@causalnexussystems.com
          </a>
          <a href="mailto:admin@causalnexussystems.com" className="btn-primary">
            Request NDA Access
          </a>

          <div className="entity-row">
            {[
              ["Entity", "Causal Nexus Systems LLC"],
              ["Location", "Orlando, Florida - USA"],
              ["Patents", "#63/896,666 - #64/043,866 - #64/067,492"],
              ["Founder", "Anthony Moreno"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="entity-label">{label}</div>
                <div className="entity-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div>Copyright 2026 Causal Nexus Systems LLC - All rights reserved - Public layer only - kernel access is NDA-first</div>
        <div>
          CNS <span style={{ color: "#1A6FFF" }}>K24</span> - 32 Domains - 24,606 Records - Validation <span style={{ color: "#1A6FFF" }}>PASS</span>
        </div>
      </footer>

      {selectedModule && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selectedModule.acronym} module brief`} onClick={() => setSelectedModule(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-media">
              <img src={selectedModule.imgSrc} alt={selectedModule.acronym} />
            </div>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setSelectedModule(null)} aria-label="Close module brief">
                x
              </button>
              <div className="modal-title" style={{ color: selectedModule.color }}>
                {selectedModule.acronym}
              </div>
              <div className="modal-full">{selectedModule.fullName}</div>

              {[
                ["Definition", selectedModule.definition],
                ["Created For", selectedModule.createdFor],
                ["As Independent Module", selectedModule.independentUse],
                ["Inside CNS Ecosystem", selectedModule.ecosystemUse],
              ].map(([title, text]) => (
                <div key={title} className="modal-section">
                  <h3 style={{ color: selectedModule.color }}>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}

              <div className="modal-columns">
                {[
                  ["Applicable Sectors", selectedModule.sectors],
                  ["Input Signals", selectedModule.signals],
                  ["Operational Outputs", selectedModule.outputs],
                  ["Evidence Produced", selectedModule.evidence],
                ].map(([title, items]) => (
                  <div key={title as string} className="modal-list">
                    <h4 style={{ color: selectedModule.color }}>{title as string}</h4>
                    <ul>
                      {(items as string[]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
