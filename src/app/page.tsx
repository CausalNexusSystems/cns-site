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
  independentUse: string;
  ecosystemUse: string;
  sectors: string[];
  evidence: string[];
};

type AssetFrameProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
};

const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },
  { id: "modules", label: "Modules" },
  { id: "cns", label: "CNS" },
  { id: "runs", label: "RUNS" },
  { id: "cnl", label: "CNL" },
  { id: "ces", label: "CES" },
  { id: "licensing", label: "Licensing" },
  { id: "contact", label: "Contact" },
];

const MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/06-K24_1-RS.png",
    desc: "Command authority for CNS. Integrates module evidence and emits the final deterministic causal posture.",
    definition: "Authority layer that consolidates module-level evidence, resolves pressure, and emits the final bounded runtime posture.",
    independentUse: "Used where a system needs a deterministic authority layer for approval, escalation, containment, or rejection of operational states.",
    ecosystemUse: "Inside CNS it acts as the final decision authority after module outputs are evaluated and evidence is assembled.",
    sectors: ["Defense operations", "Mission governance", "Critical infrastructure", "Sovereign systems"],
    evidence: ["Authority trace", "Decision ledger", "Run manifest", "Merkle-linked output"],
  },
  {
    acronym: "ACDK v4.1",
    fullName: "Adaptive Causal Decision Kernel",
    badge: "Decision",
    color: "#B83232",
    imgSrc: "/04-ACDK.png",
    desc: "Strategic causal decision governance for complex conditions, mission planning, and adaptive risk posture.",
    definition: "Decision kernel that converts operational conditions into bounded decision options under explicit criteria.",
    independentUse: "Used for mission planning, scenario evaluation, infrastructure prioritization, and risk-aware governance.",
    ecosystemUse: "Inside CNS it contributes strategic decision pressure to K24.1-RS and the runtime authority chain.",
    sectors: ["Mission planning", "Defense analysis", "Emergency operations", "Critical infrastructure"],
    evidence: ["Scenario trace", "Criteria map", "Risk class", "Decision contribution"],
  },
  {
    acronym: "NCM v2.1",
    fullName: "Nexus Causal Module",
    badge: "Edge",
    color: "#00A85E",
    imgSrc: "/09-NCM.png",
    desc: "Compact deterministic causal operation for edge devices, robotics, drones, and autonomous platforms.",
    definition: "Edge causal module for local decisions close to physical systems without depending on remote cloud availability.",
    independentUse: "Used in drones, robotics, embedded sensors, industrial controllers, and autonomous edge platforms.",
    ecosystemUse: "Inside CNS it supplies edge-state evidence and local causal pressure to the integrated authority layer.",
    sectors: ["Drones", "Robotics", "Industrial edge", "Autonomous systems"],
    evidence: ["Edge event record", "Local verdict", "Module row", "Replayable input"],
  },
  {
    acronym: "MDFE v3.1",
    fullName: "Multi-Domain Fusion Engine",
    badge: "Fusion",
    color: "#6C32D4",
    imgSrc: "/08-MDFE.png",
    desc: "Transforms fragmented telemetry streams into one coherent multi-domain causal context.",
    definition: "Fusion layer that aligns heterogeneous streams before downstream causal decisions are made.",
    independentUse: "Used for sensor fusion, multi-domain monitoring, situational awareness, and cyber-physical correlation.",
    ecosystemUse: "Inside CNS it supplies unified context to ACDK, KECS, K24.1-RS, and evidence packaging layers.",
    sectors: ["Aerospace", "Energy", "Sensor fusion", "Cyber-physical systems"],
    evidence: ["Fusion matrix", "Source map", "Contribution rows", "Context frame"],
  },
  {
    acronym: "KECS",
    fullName: "Kinetic Entropy Coherence System",
    badge: "Coherence",
    color: "#4D94FF",
    imgSrc: "/07-KECS.png",
    desc: "Evaluates coherence, kinetic entropy, cascade risk, fault signals, and safe-state containment.",
    definition: "Coherence and entropy module that evaluates whether behavior remains structurally stable or is drifting toward instability.",
    independentUse: "Used in energy grids, industrial process control, aerospace systems, logistics networks, and safety monitoring.",
    ecosystemUse: "Inside CNS it contributes coherence pressure, cascade risk, and containment evidence to the final authority layer.",
    sectors: ["Energy grid", "Industrial control", "Aerospace", "Critical infrastructure"],
    evidence: ["Entropy frame", "Coherence score", "Fault trace", "Containment signal"],
  },
  {
    acronym: "ADIK",
    fullName: "AetherCore Deterministic Integrity Kernel",
    badge: "Integrity",
    color: "#C85A18",
    imgSrc: "/05-ADIK.png",
    desc: "Preserves trust between physical operational state and deterministic evidence-supported output.",
    definition: "Integrity kernel that protects consistency between input state, timing, execution path, and repeatable output.",
    independentUse: "Used in physical control, industrial automation, robotics, aerospace instrumentation, and evidence-sensitive execution.",
    ecosystemUse: "Inside CNS it reinforces repeatability and state integrity before module outputs are integrated.",
    sectors: ["Physical control", "Industrial automation", "Robotics", "Aerospace"],
    evidence: ["Integrity seal", "Timing trace", "Input-output hash", "Repeatability status"],
  },
  {
    acronym: "Iron Guardian V3",
    fullName: "Runtime Enforcement and Protection Shield",
    badge: "Protection",
    color: "#C8A84B",
    imgSrc: "/02-IRON_GUARDIAN.png",
    desc: "Runtime enforcement, containment, integrity monitoring, autonomous response, and bounded protection.",
    definition: "Runtime shield that enforces bounded execution and protects the environment where CNS decisions operate.",
    independentUse: "Used in secure compute, mission systems, industrial control, embedded protection, and sovereign infrastructure.",
    ecosystemUse: "Inside CNS it acts as runtime executor and protection layer after authority decisions are emitted.",
    sectors: ["Secure compute", "Mission systems", "Industrial control", "Embedded protection"],
    evidence: ["Runtime log", "Containment trace", "Executor field", "Protection status"],
  },
  {
    acronym: "SQS / DEEL",
    fullName: "Sealed Quality System / Deterministic Evidence and Execution Ledger",
    badge: "Evidence",
    color: "#007A6E",
    imgSrc: "/03-SQS_-_DEEL.png",
    desc: "Evidence packaging, traceability, auditability, disclosure boundaries, and external review support.",
    definition: "Evidence layer that packages CNS outputs into sealed, traceable, and hash-verifiable records.",
    independentUse: "Used in audit systems, compliance workflows, quality systems, evidence packaging, and external attestation.",
    ecosystemUse: "Inside CNS it preserves the evidence chain across module outputs, authority decisions, manifests, hashes, and audit packages.",
    sectors: ["Audit", "Compliance", "Institutional review", "Evidence packaging"],
    evidence: ["SHA-256", "Merkle root", "Run seal", "External package"],
  },
];

const RUN_METRICS = [
  ["Domains", "32"],
  ["Records", "24,606"],
  ["Module Rows", "196,848"],
  ["Authority", "K24.1-RS"],
  ["Runtime", "Iron Guardian V3"],
  ["Validation", "PASS"],
];

const RUN_LAYERS = [
  ["Signal intake", "Multi-sector telemetry normalized into deterministic event records."],
  ["Module execution", "Eight module families produce bounded contribution rows."],
  ["Authority integration", "K24.1-RS separates final authority from module pressure drivers."],
  ["Runtime enforcement", "Iron Guardian preserves bounded execution and containment status."],
  ["Evidence boundary", "Manifest, hash, Merkle, replay, and package fields define reviewability."],
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AssetFrame({ src, alt, label, className }: AssetFrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`asset-fallback ${className ?? ""}`}>
        <span>{label ?? alt}</span>
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<EcoModule | null>(null);

  useEffect(() => {
    if (!selectedModule) return;

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedModule(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [selectedModule]);

  return (
    <main>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background: #02030a; }
        body { background: #02030a; color: #edf1ff; font-family: "Inter", sans-serif; overflow-x: hidden; }
        button, a { -webkit-tap-highlight-color: transparent; }

        @keyframes tick { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.32; } }
        @keyframes scan { 0% { transform: translateY(-120%); opacity: 0; } 25% { opacity: 0.42; } 100% { transform: translateY(360%); opacity: 0; } }
        @keyframes rise { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }

        main {
          min-height: 100vh;
          background: #02030a;
          color: #fff;
          overflow-x: hidden;
        }

        .bg-video {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: #02030a;
        }

        .bg-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.58;
          filter: saturate(1.08) contrast(1.08);
        }

        .bg-video::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(2,3,10,0.92) 0%, rgba(2,3,10,0.56) 38%, rgba(2,3,10,0.78) 100%),
            linear-gradient(180deg, rgba(2,3,10,0.12) 0%, rgba(2,3,10,0.74) 76%, #02030a 100%);
        }

        .top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          min-height: 68px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 24px;
          align-items: center;
          padding: 0 40px;
          background: rgba(2, 3, 10, 0.78);
          border-bottom: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(22px);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 0;
          color: white;
          cursor: pointer;
          text-align: left;
          min-width: 218px;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border: 1px solid #1a6fff;
          font: 700 11px "Space Grotesk", sans-serif;
          color: #50a0ff;
          position: relative;
        }

        .brand-mark::after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          top: -4px;
          right: -4px;
          border-radius: 50%;
          background: #00c8ff;
          box-shadow: 0 0 9px #00c8ff;
          animation: pulse 1.8s infinite;
        }

        .brand-title {
          display: block;
          font: 700 14px "Space Grotesk", sans-serif;
          letter-spacing: 0.04em;
        }

        .brand-sub {
          display: block;
          margin-top: 2px;
          font: 400 9px "Space Mono", monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }

        .nav-strip {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 14px 0;
        }

        .nav-strip::-webkit-scrollbar { display: none; }

        .nav-chip {
          flex: 0 0 auto;
          min-height: 36px;
          padding: 0 13px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.66);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
        }

        .nav-chip:hover,
        .nav-chip:focus-visible {
          border-color: rgba(0,200,255,0.5);
          color: white;
          background: rgba(0,200,255,0.07);
          outline: none;
        }

        .hero {
          position: relative;
          z-index: 1;
          min-height: 100svh;
          padding: 108px 42px 56px;
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          gap: 28px;
        }

        .hero-inner {
          max-width: 1340px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(320px, 0.78fr) minmax(460px, 1.22fr);
          gap: 56px;
          align-items: center;
          animation: rise .65s ease both;
        }

        .eyebrow {
          font: 700 10px "Space Mono", monospace;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4d94ff;
          margin-bottom: 14px;
        }

        .hero h1 {
          font: 700 clamp(78px, 12vw, 150px) / 0.88 "Space Grotesk", sans-serif;
          letter-spacing: 0;
          margin-bottom: 16px;
        }

        .hero h1 span {
          background: linear-gradient(130deg, #fff 0%, #6fb0ff 45%, #00c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font: 600 clamp(12px, 1.45vw, 16px) "Space Grotesk", sans-serif;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
          margin-bottom: 42px;
        }

        .hero-statement {
          max-width: 620px;
          font: 300 clamp(24px, 3.1vw, 42px) / 1.22 "Space Grotesk", sans-serif;
          color: rgba(237,241,255,0.92);
          margin-bottom: 40px;
        }

        .hero-statement strong {
          color: #00c8ff;
          font-weight: 700;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 25px;
          border: 1px solid rgba(255,255,255,0.16);
          background: transparent;
          color: white;
          text-decoration: none;
          cursor: pointer;
          font: 700 12px "Space Grotesk", sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background .2s, border-color .2s, transform .2s;
        }

        .btn.primary {
          background: #1a6fff;
          border-color: #1a6fff;
        }

        .btn:hover,
        .btn:focus-visible {
          transform: translateY(-1px);
          border-color: #00c8ff;
          outline: none;
        }

        .module-constellation {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
        }

        .hero-module {
          min-height: 172px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(4,8,18,0.52);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          text-align: left;
          color: white;
          transition: transform .22s, border-color .22s, background .22s;
        }

        .hero-module:hover,
        .hero-module:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(0,200,255,0.42);
          background: rgba(4,8,18,0.72);
          outline: none;
        }

        .hero-module img,
        .asset-fallback {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(.8) saturate(.92);
        }

        .hero-module::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(2,3,10,0.04), rgba(2,3,10,0.72));
          pointer-events: none;
        }

        .hero-module-info {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 13px;
          z-index: 1;
        }

        .hero-module-info strong {
          display: block;
          font: 700 15px "Space Grotesk", sans-serif;
          margin-bottom: 3px;
        }

        .hero-module-info span {
          display: block;
          font: 700 8px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.58);
        }

        .ticker {
          max-width: 1340px;
          width: 100%;
          margin: 0 auto;
          height: 44px;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(2,3,10,0.58);
        }

        .ticker-inner {
          height: 100%;
          display: flex;
          align-items: center;
          animation: tick 42s linear infinite;
          white-space: nowrap;
        }

        .ticker-item {
          height: 100%;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          border-right: 1px solid rgba(255,255,255,0.08);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.48);
        }

        .ticker-item span { color: #00c8ff; }
        .ticker-item .pass { color: #00a85e; }

        .section {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(2,3,10,0.9);
        }

        .section.alt { background: rgba(7,10,20,0.92); }

        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 96px 42px;
        }

        .section-head {
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(320px, 1fr);
          gap: 76px;
          align-items: end;
          margin-bottom: 56px;
        }

        h2 {
          font: 700 clamp(34px, 5vw, 58px) / 1.02 "Space Grotesk", sans-serif;
          letter-spacing: 0;
        }

        .copy {
          color: rgba(255,255,255,0.62);
          font-size: 15px;
          line-height: 1.75;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2px;
        }

        .module-card {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: white;
          overflow: hidden;
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          transition: transform .22s, border-color .22s, background .22s;
        }

        .module-card:hover,
        .module-card:focus-visible {
          transform: translateY(-4px);
          border-color: rgba(0,200,255,0.34);
          background: rgba(255,255,255,0.055);
          outline: none;
        }

        .module-card-media {
          aspect-ratio: 1.25 / 1;
          overflow: hidden;
          background: #050812;
        }

        .module-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(.84);
          transition: transform .35s, filter .35s;
        }

        .module-card:hover img { transform: scale(1.035); filter: brightness(1); }

        .module-card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .module-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .module-name {
          font: 700 17px "Space Grotesk", sans-serif;
        }

        .badge {
          flex: 0 0 auto;
          padding: 3px 8px;
          border: 1px solid currentColor;
          font: 700 8px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          opacity: .72;
        }

        .module-full {
          font: 600 10px "Space Grotesk", sans-serif;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.42);
          margin-bottom: 10px;
        }

        .module-desc {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255,255,255,.62);
          margin-bottom: 14px;
          flex: 1;
        }

        .open-brief {
          font: 700 9px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.5);
        }

        .cns-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr);
          gap: 72px;
          align-items: start;
        }

        .qa {
          margin-top: 34px;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .qa-row {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 22px;
          padding: 17px 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .qa-row strong {
          font: 700 13px "Space Grotesk", sans-serif;
        }

        .qa-row span {
          color: rgba(255,255,255,.56);
          font-size: 13px;
          line-height: 1.55;
        }

        .principles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .principle {
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.035);
          padding: 22px;
        }

        .principle strong {
          display: block;
          color: #4d94ff;
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .principle span {
          color: rgba(255,255,255,.56);
          font-size: 13px;
          line-height: 1.5;
        }

        .runs-grid {
          display: grid;
          grid-template-columns: minmax(0, .92fr) minmax(360px, 1.08fr);
          gap: 60px;
          align-items: stretch;
        }

        .run-panel {
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(4,8,18,.64);
          overflow: hidden;
          position: relative;
        }

        .run-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,200,255,.08) 1px, transparent 1px),
            linear-gradient(rgba(0,200,255,.08) 1px, transparent 1px);
          background-size: 34px 34px;
          pointer-events: none;
          opacity: .42;
        }

        .run-visual {
          min-height: 420px;
          position: relative;
          overflow: hidden;
        }

        .run-visual video {
          width: 100%;
          height: 100%;
          min-height: 420px;
          object-fit: cover;
          display: block;
          opacity: .76;
        }

        .run-visual::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 36%;
          background: linear-gradient(180deg, transparent, rgba(0,200,255,.16), transparent);
          animation: scan 4.8s linear infinite;
          z-index: 2;
        }

        .run-overlay {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 22px;
          z-index: 3;
        }

        .run-overlay strong {
          display: block;
          max-width: 560px;
          font: 700 clamp(26px, 4vw, 44px) / 1.02 "Space Grotesk", sans-serif;
          margin-bottom: 12px;
        }

        .run-overlay span {
          color: rgba(255,255,255,.64);
          font-size: 13px;
          line-height: 1.5;
          max-width: 560px;
          display: block;
        }

        .run-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 18px;
        }

        .run-metric {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.07);
          padding: 20px 16px;
        }

        .run-metric strong {
          display: block;
          color: #00c8ff;
          font: 700 24px "Space Mono", monospace;
          margin-bottom: 4px;
        }

        .run-metric span {
          font: 700 9px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.42);
        }

        .run-layer {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 18px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .run-layer strong {
          font: 700 11px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #8ba0c0;
        }

        .run-layer span {
          color: rgba(255,255,255,.6);
          font-size: 13px;
          line-height: 1.5;
        }

        .media-pair {
          display: grid;
          grid-template-columns: .72fr 1.28fr;
          gap: 24px;
          align-items: stretch;
        }

        .media-frame {
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.035);
          overflow: hidden;
          min-height: 100%;
        }

        .media-frame img {
          width: 100%;
          height: 100%;
          min-height: 360px;
          object-fit: cover;
          display: block;
          filter: brightness(.93);
        }

        .asset-fallback {
          min-height: 360px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0,200,255,.16);
          background:
            linear-gradient(135deg, rgba(26,111,255,.12), rgba(0,0,0,.2)),
            rgba(255,255,255,.035);
          color: rgba(255,255,255,.68);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .12em;
          text-align: center;
          text-transform: uppercase;
          padding: 24px;
        }

        .media-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
        }

        .media-copy p {
          color: rgba(255,255,255,.62);
          font-size: 15px;
          line-height: 1.75;
        }

        .feature-list {
          display: grid;
          gap: 2px;
        }

        .feature {
          border: 1px solid rgba(255,255,255,.07);
          background: rgba(255,255,255,.035);
          padding: 16px 18px;
        }

        .feature strong {
          display: block;
          font: 700 13px "Space Grotesk", sans-serif;
          margin-bottom: 4px;
        }

        .feature span {
          color: rgba(255,255,255,.56);
          font-size: 12.5px;
          line-height: 1.5;
        }

        .licensing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        .license {
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.035);
          padding: 32px 26px;
        }

        .license.featured {
          background: rgba(26,111,255,.055);
          border-color: rgba(26,111,255,.36);
        }

        .license small {
          display: block;
          color: #4d94ff;
          font: 700 9px "Space Mono", monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .license strong {
          display: block;
          white-space: pre-line;
          font: 700 22px / 1.16 "Space Grotesk", sans-serif;
          margin-bottom: 12px;
        }

        .license p {
          color: rgba(255,255,255,.58);
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .license ul {
          list-style: none;
          display: grid;
          gap: 9px;
        }

        .license li {
          color: rgba(255,255,255,.66);
          font-size: 13px;
          line-height: 1.4;
        }

        .license li::before {
          content: "- ";
          color: #4d94ff;
        }

        .contact-panel {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-panel p {
          max-width: 720px;
          margin: 18px auto 28px;
          color: rgba(255,255,255,.64);
          font-size: 16px;
          line-height: 1.75;
        }

        .contact-email {
          display: inline-flex;
          margin-top: 8px;
          color: white;
          text-decoration: none;
          font: 700 20px "Space Grotesk", sans-serif;
        }

        footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,.08);
          background: #02030a;
          padding: 26px 42px;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          color: rgba(255,255,255,.36);
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .07em;
          text-transform: uppercase;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 400;
          padding: 34px;
          background: rgba(0,0,0,.76);
          backdrop-filter: blur(18px);
          display: grid;
          place-items: center;
        }

        .modal {
          width: min(1120px, 100%);
          max-height: min(820px, calc(100vh - 68px));
          overflow: auto;
          display: grid;
          grid-template-columns: minmax(330px,.9fr) minmax(0,1.1fr);
          background: #070a14;
          border: 1px solid rgba(255,255,255,.12);
        }

        .modal img {
          width: 100%;
          height: 100%;
          min-height: 540px;
          object-fit: cover;
          display: block;
        }

        .modal-body {
          padding: 34px;
        }

        .modal-close {
          float: right;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.04);
          color: white;
          cursor: pointer;
          font: 700 18px "Space Mono", monospace;
        }

        .modal-title {
          padding-right: 54px;
          font: 700 clamp(32px, 4vw, 48px) / .98 "Space Grotesk", sans-serif;
          margin-bottom: 8px;
        }

        .modal-sub {
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,.44);
          margin-bottom: 24px;
        }

        .modal-section {
          padding: 17px 0;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .modal-section h3 {
          font: 700 10px "Space Mono", monospace;
          letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .modal-section p,
        .modal-section li {
          color: rgba(255,255,255,.64);
          font-size: 14px;
          line-height: 1.65;
        }

        .modal-section ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .modal-section li {
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.035);
          padding: 6px 10px;
          font-size: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 1180px) {
          .top-nav {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0 24px;
          }

          .brand {
            padding-top: 12px;
          }

          .nav-strip {
            justify-content: flex-start;
          }

          .hero {
            padding-top: 128px;
          }

          .hero-inner,
          .runs-grid {
            grid-template-columns: 1fr;
          }

          .module-constellation,
          .module-grid {
            grid-template-columns: repeat(4, minmax(190px, 1fr));
            overflow-x: auto;
            padding-bottom: 6px;
          }

          .hero-module,
          .module-card {
            min-width: 190px;
          }

          .section-head,
          .cns-grid,
          .media-pair {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 820px) {
          .top-nav {
            min-height: 92px;
            padding: 0 14px;
          }

          .brand {
            min-width: 0;
          }

          .brand-sub {
            display: none;
          }

          .nav-chip {
            min-height: 34px;
            padding: 0 10px;
            font-size: 9px;
          }

          .hero {
            padding: 124px 18px 42px;
          }

          .section-inner {
            padding: 72px 18px;
          }

          .hero h1 {
            font-size: 78px;
          }

          .hero-subtitle {
            letter-spacing: .12em;
          }

          .hero-actions,
          .hero-actions .btn {
            width: 100%;
          }

          .btn {
            width: 100%;
          }

          .ticker {
            height: 40px;
          }

          .ticker-item {
            padding: 0 22px;
            font-size: 9px;
          }

          .principles,
          .run-metrics,
          .licensing-grid {
            grid-template-columns: 1fr;
          }

          .qa-row,
          .run-layer {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .media-frame img,
          .asset-fallback {
            min-height: 280px;
          }

          .modal-backdrop {
            padding: 16px;
          }

          .modal {
            grid-template-columns: 1fr;
            max-height: calc(100vh - 32px);
          }

          .modal img {
            min-height: 0;
            aspect-ratio: 1.25 / 1;
          }

          .modal-body {
            padding: 24px;
          }

          footer {
            padding: 24px 18px;
          }
        }
      `}</style>

      <div className="bg-video" aria-hidden="true">
        <video src="/brand/cns_canvas.mp4" autoPlay loop muted playsInline preload="metadata" />
      </div>

      <nav className="top-nav" aria-label="CNS navigation">
        <button className="brand" onClick={() => scrollToSection("ecosystem")} aria-label="Go to CNS ecosystem">
          <span className="brand-mark">CNS</span>
          <span>
            <span className="brand-title">Causal Nexus Systems</span>
            <span className="brand-sub">Sovereign deterministic ecosystem</span>
          </span>
        </button>

        <div className="nav-strip">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} className="nav-chip" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="ecosystem" className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow">Causal Nexus Systems LLC</div>
            <h1>
              <span>CNS</span>
            </h1>
            <div className="hero-subtitle">Sovereign causal execution for critical environments</div>
            <p className="hero-statement">
              <strong>CNS mide la causa.</strong>
              <br />
              No espera a que el efecto llegue al sistema.
            </p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => scrollToSection("modules")}>
                View Modules
              </button>
              <button className="btn" onClick={() => scrollToSection("runs")}>
                32-Domain Run
              </button>
            </div>
          </div>

          <div className="module-constellation" aria-label="CNS module visual entry">
            {MODULES.map((mod) => (
              <button key={mod.acronym} className="hero-module" onClick={() => setSelectedModule(mod)}>
                <AssetFrame src={mod.imgSrc} alt={mod.acronym} label={mod.acronym} />
                <span className="hero-module-info">
                  <strong style={{ color: mod.color }}>{mod.acronym}</strong>
                  <span>{mod.badge}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="ticker">
          <div className="ticker-inner">
            {[
              ["Modules", "8 active"],
              ["Telemetry", "32 domains"],
              ["Records", "24,606"],
              ["Module Rows", "196,848"],
              ["Authority", "K24.1-RS"],
              ["Runtime", "Iron Guardian V3"],
              ["Validation", "PASS"],
              ["Evidence", "SHA-256 + Merkle"],
            ].flatMap(([k, v], index) => [
              <div className="ticker-item" key={`${index}-a`}>
                {k} <span className={v === "PASS" ? "pass" : ""}>{v}</span>
              </div>,
              <div className="ticker-item" key={`${index}-b`}>
                {k} <span className={v === "PASS" ? "pass" : ""}>{v}</span>
              </div>,
            ])}
          </div>
        </div>
      </section>

      <section id="modules" className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Modules</div>
              <h2>
                CNS as independent modules.
                <br />
                CNS as one ecosystem.
              </h2>
            </div>
            <p className="copy">
              Each module has a standalone operational purpose and a defined role inside the CNS causal chain. Click a module to inspect definition, sector fit, ecosystem function, and evidence outputs.
            </p>
          </div>

          <div className="module-grid">
            {MODULES.map((mod) => (
              <button key={mod.acronym} className="module-card" onClick={() => setSelectedModule(mod)}>
                <div style={{ height: 3, background: mod.color }} />
                <div className="module-card-media">
                  <AssetFrame src={mod.imgSrc} alt={mod.acronym} label={mod.acronym} />
                </div>
                <div className="module-card-body">
                  <div className="module-top">
                    <div className="module-name" style={{ color: mod.color }}>{mod.acronym}</div>
                    <div className="badge" style={{ color: mod.color }}>{mod.badge}</div>
                  </div>
                  <div className="module-full">{mod.fullName}</div>
                  <div className="module-desc">{mod.desc}</div>
                  <div className="open-brief">Open module brief</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="cns" className="section">
        <div className="section-inner">
          <div className="cns-grid">
            <div>
              <div className="eyebrow">What is CNS</div>
              <h2>
                Not monitoring.
                <br />
                Not prediction.
                <br />
                Causal governance.
              </h2>
              <p className="copy" style={{ marginTop: 22 }}>
                CNS is a deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
              </p>
              <div className="qa">
                {[
                  ["Is the state coherent?", "CNS evaluates whether an operational state remains causally aligned and structurally valid."],
                  ["Is the state bounded?", "Outputs are classified into controlled postures instead of opaque reactions."],
                  ["Is runtime trustworthy?", "Execution path, module context, and deployment boundary are part of the review chain."],
                  ["Is the result reviewable?", "Runs can produce manifests, hashes, Merkle roots, replay paths, and evidence packages."],
                ].map(([q, a]) => (
                  <div className="qa-row" key={q}>
                    <strong>{q}</strong>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="principles">
              {[
                ["Deterministic", "Validated input and bounded execution should produce reproducible output."],
                ["Sovereign", "Designed for local, private, air-gapped, embedded, or controlled deployment boundaries."],
                ["Traceable", "Module-level contributions preserve the path from signal to authority decision."],
                ["Falsifiable", "Evidence is structured so external review can inspect hashes, manifests, and replay outputs."],
                ["Operational", "The ecosystem separates signal intake, module judgment, authority, runtime, and evidence."],
                ["Institutional", "Positioned for technical review, procurement discussion, and high-assurance evaluation."],
              ].map(([title, text]) => (
                <div className="principle" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="runs" className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">32-Domain Execution Run</div>
              <h2>
                Live telemetry pressure.
                <br />
                Deterministic evidence.
              </h2>
            </div>
            <p className="copy">
              This section replaces the old eight-layer block with an execution-centered view: telemetry intake, module rows, authority integration, runtime enforcement, and evidence packaging.
            </p>
          </div>

          <div className="runs-grid">
            <div className="run-panel">
              <div className="run-visual">
                <video src="/brand/cns_live_telemetry_panel.mp4" autoPlay loop muted playsInline preload="metadata" />
                <div className="run-overlay">
                  <strong>32 domains connected into one causal execution path.</strong>
                  <span>Place the live CNS panel recording at /public/brand/cns_live_telemetry_panel.mp4. The background video remains active behind the full page.</span>
                </div>
              </div>
            </div>

            <div>
              <div className="run-metrics">
                {RUN_METRICS.map(([label, value]) => (
                  <div className="run-metric" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {RUN_LAYERS.map(([title, text]) => (
                <div className="run-layer" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cnl" className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">CNL</div>
              <h2>
                Causal Nexus Ledger.
                <br />
                Consensus evidence layer.
              </h2>
            </div>
            <p className="copy">
              CNL should be framed as the ledger and consensus validation path for CNS: canonical state, commit evidence, verifier records, and reviewable recovery behavior.
            </p>
          </div>

          <div className="media-pair">
            <div className="media-frame">
              <AssetFrame src="/01-CNL.png" alt="CNL primary module image" label="CNL primary image" />
            </div>
            <div className="media-frame">
              <AssetFrame src="/CNL_LEDGER_EXECUTION.png" alt="CNL ledger execution image" label="Upload second CNL image as CNL_LEDGER_EXECUTION.png" />
            </div>
          </div>

          <div className="feature-list" style={{ marginTop: 24 }}>
            {[
              ["Canonical state", "Ledger boundary for committed execution state and reviewable system history."],
              ["Verifier path", "External review path for manifests, hashes, commit records, and evidence artifacts."],
              ["Recovery behavior", "Claims should remain tied to testnet and multi-machine evidence as the CNL path matures."],
            ].map(([title, text]) => (
              <div className="feature" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ces" className="section alt">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">CES</div>
              <h2>
                Causal Execution System.
                <br />
                Ecosystem test execution.
              </h2>
            </div>
            <p className="copy">
              CES is positioned here as the execution-facing layer for ecosystem trials, module orchestration, telemetry intake, run production, and institutional evaluation packages.
            </p>
          </div>

          <div className="media-pair">
            <div className="media-frame">
              <AssetFrame src="/CES_CAUSAL_EXECUTION_SYSTEM_01.png" alt="CES module image one" label="Upload CES image 1 as CES_CAUSAL_EXECUTION_SYSTEM_01.png" />
            </div>
            <div className="media-copy">
              <p>
                CES should communicate how CNS is exercised: selected domains, telemetry streams, module execution, authority integration, and evidence output. It is the right section for trials, demonstrations, and controlled ecosystem tests.
              </p>
              <div className="feature-list">
                {[
                  ["Trial orchestration", "Defines what is being tested, which modules participate, and what evidence must be produced."],
                  ["Run governance", "Connects telemetry intake, module rows, authority decisions, runtime enforcement, and package validation."],
                  ["Institutional evaluation", "Supports partner-facing trials without exposing protected kernel internals."],
                ].map(([title, text]) => (
                  <div className="feature" key={title}>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="media-pair" style={{ marginTop: 24 }}>
            <div className="media-frame">
              <AssetFrame src="/CES_CAUSAL_EXECUTION_SYSTEM_02.png" alt="CES module image two" label="Upload CES image 2 as CES_CAUSAL_EXECUTION_SYSTEM_02.png" />
            </div>
            <div className="media-frame">
              <AssetFrame src="/CES_CAUSAL_EXECUTION_SYSTEM_03.png" alt="CES module image three" label="Upload CES image 3 as CES_CAUSAL_EXECUTION_SYSTEM_03.png" />
            </div>
          </div>
        </div>
      </section>

      <section id="licensing" className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Licensing Model</div>
              <h2>
                Three paths to evaluate
                <br />
                and deploy CNS.
              </h2>
            </div>
            <p className="copy">
              CNS is presented for structured technical trials, scoped module evaluation, ecosystem licensing, and sovereign or institutional deployment discussions.
            </p>
          </div>

          <div className="licensing-grid">
            {[
              {
                eye: "Module License",
                title: "Single Module\nEvaluation",
                desc: "Evaluate one CNS module against a defined sector, domain, or operational use case.",
                items: ["Scoped module boundary", "Controlled test objective", "Evidence package", "Partner review path"],
              },
              {
                eye: "Ecosystem License",
                title: "Full CNS\nEcosystem Trial",
                desc: "Run CNS as an integrated causal ecosystem across multiple modules and telemetry sources.",
                items: ["Multi-module execution", "Authority integration", "Runtime enforcement", "Run evidence and replay"],
                featured: true,
              },
              {
                eye: "Institutional Deployment",
                title: "Sovereign or\nEnterprise Scope",
                desc: "Engage CNS for national, defense, aerospace, energy, financial, or critical infrastructure contexts.",
                items: ["Deployment architecture", "Security boundary", "Evaluation package", "Institutional engagement"],
              },
            ].map((item) => (
              <div className={`license ${item.featured ? "featured" : ""}`} key={item.eye}>
                <small>{item.eye}</small>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
                <ul>
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section alt">
        <div className="section-inner">
          <div className="contact-panel">
            <div className="eyebrow">Contact</div>
            <h2>
              CNS ecosystem trials,
              <br />
              evaluation, and business model.
            </h2>
            <p>
              For controlled ecosystem testing, module evaluation, licensing discussions, or institutional deployment review, contact the CNS team. Technical access, demonstrations, and evidence packages should be scoped through a formal engagement.
            </p>
            <a className="contact-email" href="mailto:admin@causalnexussystems.com">
              admin@causalnexussystems.com
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div>Causal Nexus Systems LLC - sovereign deterministic ecosystem</div>
        <div>Modules - Runs - CNL - CES - Licensing - Contact</div>
      </footer>

      {selectedModule && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selectedModule.acronym} module brief`} onClick={() => setSelectedModule(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <AssetFrame src={selectedModule.imgSrc} alt={selectedModule.acronym} label={selectedModule.acronym} />
            <div className="modal-body">
              <button className="modal-close" onClick={() => setSelectedModule(null)} aria-label="Close module brief">x</button>
              <div className="modal-title" style={{ color: selectedModule.color }}>{selectedModule.acronym}</div>
              <div className="modal-sub">{selectedModule.fullName}</div>

              <div className="modal-section">
                <h3 style={{ color: selectedModule.color }}>Definition</h3>
                <p>{selectedModule.definition}</p>
              </div>

              <div className="modal-section">
                <h3 style={{ color: selectedModule.color }}>Independent Module</h3>
                <p>{selectedModule.independentUse}</p>
              </div>

              <div className="modal-section">
                <h3 style={{ color: selectedModule.color }}>Inside CNS Ecosystem</h3>
                <p>{selectedModule.ecosystemUse}</p>
              </div>

              <div className="modal-section">
                <h3 style={{ color: selectedModule.color }}>Applicable Sectors</h3>
                <ul>
                  {selectedModule.sectors.map((sector) => (
                    <li key={sector}>{sector}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3 style={{ color: selectedModule.color }}>Evidence Produced</h3>
                <ul>
                  {selectedModule.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
