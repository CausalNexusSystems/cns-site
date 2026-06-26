"use client";

import { useState } from "react";

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
  areas: string[];
};

const ECO_MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/06-K24_1-RS.png",
    desc: "The command authority of the CNS ecosystem. Integrates module evidence and emits the final deterministic causal posture.",
    definition: "K24.1-RS is the runtime authority layer of CNS. It consolidates module-level evidence, resolves decision pressure, and produces the final bounded operational posture.",
    independentUse: "As an independent module, K24.1-RS applies where a mission or infrastructure system needs deterministic authority for approval, rejection, escalation, or containment of operational states.",
    ecosystemUse: "Inside CNS, K24.1-RS receives evidence from the other modules and acts as final decision authority before runtime enforcement and evidence packaging.",
    areas: ["Command Authority", "Mission Governance", "Defense Operations", "Critical Infrastructure"],
  },
  {
    acronym: "ACDK v4.1",
    fullName: "Adaptive Causal Decision Kernel",
    badge: "Decision",
    color: "#B83232",
    imgSrc: "/04-ACDK.png",
    desc: "Strategic causal decision governance for complex operational conditions, mission planning, and adaptive risk posture.",
    definition: "ACDK v4.1 is the adaptive causal decision kernel. It converts operational context, risk pressure, and scenario conditions into bounded decision options.",
    independentUse: "As an independent module, ACDK applies to mission planning, scenario evaluation, infrastructure prioritization, and risk-aware operational governance.",
    ecosystemUse: "Inside CNS, ACDK contributes strategic decision pressure and scenario interpretation to the final authority layer.",
    areas: ["Strategic Decision Systems", "Mission Planning", "Critical Infrastructure", "Adaptive Risk Management"],
  },
  {
    acronym: "NCM v2.1",
    fullName: "Nexus Causal Module",
    badge: "Edge",
    color: "#00A85E",
    imgSrc: "/09-NCM.png",
    desc: "Compact deterministic causal operation for edge devices, robotics, drones, autonomous systems, and local embedded platforms.",
    definition: "NCM v2.1 is the edge causal module. It evaluates local operational state close to the physical system without depending on remote cloud availability.",
    independentUse: "As an independent module, NCM applies to drones, robotics, edge sensors, industrial controllers, and autonomous systems that need local bounded decisions.",
    ecosystemUse: "Inside CNS, NCM contributes local edge-state evidence and operational pressure to the integrated ecosystem authority chain.",
    areas: ["Edge Devices", "Drones", "Robotics", "Autonomous Systems", "Embedded Platforms"],
  },
  {
    acronym: "MDFE v3.1",
    fullName: "Multi-Domain Fusion Engine",
    badge: "Fusion",
    color: "#6C32D4",
    imgSrc: "/08-MDFE.png",
    desc: "Transforms fragmented operational streams from multiple domains into unified deterministic causal context.",
    definition: "MDFE v3.1 is the multi-domain fusion layer. It aligns heterogeneous telemetry and operational streams into coherent causal context.",
    independentUse: "As an independent module, MDFE applies to sensor fusion, aerospace monitoring, energy systems, situational awareness, and cyber-physical correlation.",
    ecosystemUse: "Inside CNS, MDFE supplies unified cross-domain context to decision, coherence, authority, and evidence layers.",
    areas: ["Sensor Fusion", "Aerospace Systems", "Energy Systems", "Cyber-Physical", "Situational Awareness"],
  },
  {
    acronym: "KECS",
    fullName: "Kinetic Entropy Coherence System",
    badge: "Coherence",
    color: "#4D94FF",
    imgSrc: "/07-KECS.png",
    desc: "Causal coherence evaluation, kinetic entropy analysis, cascade risk, fault detection, and safe-state containment.",
    definition: "KECS is the kinetic entropy and coherence module. It evaluates whether system behavior remains structurally coherent or is drifting toward instability.",
    independentUse: "As an independent module, KECS applies to energy grids, industrial process control, aerospace systems, logistics networks, and critical safety monitoring.",
    ecosystemUse: "Inside CNS, KECS contributes coherence pressure, cascade risk, fault detection, and containment evidence to the final authority layer.",
    areas: ["System Safety", "Critical Infrastructure Resilience", "Real-Time Risk Governance", "Industrial Process Control"],
  },
  {
    acronym: "ADIK / AetherCore",
    fullName: "Deterministic Integrity Kernel",
    badge: "Integrity",
    color: "#C85A18",
    imgSrc: "/05-ADIK.png",
    desc: "Preserves technical trust between physical operational state and deterministic evidence-supported output.",
    definition: "ADIK / AetherCore is the deterministic integrity kernel. It protects consistency between input state, timing, execution path, and repeatable output.",
    independentUse: "As an independent module, ADIK applies to physical control systems, industrial automation, robotics, aerospace instrumentation, and evidence-sensitive execution.",
    ecosystemUse: "Inside CNS, ADIK reinforces state integrity and repeatability before module outputs are integrated into final decisions.",
    areas: ["Physical Control Systems", "Aerospace", "Energy Infrastructure", "Industrial Automation", "Robotics"],
  },
  {
    acronym: "Iron Guardian V3",
    fullName: "Runtime Enforcement & Protection Shield",
    badge: "Protection",
    color: "#C8A84B",
    imgSrc: "/02-IRON_GUARDIAN.png",
    desc: "Runtime enforcement, containment, integrity monitoring, autonomous response, and bounded execution protection.",
    definition: "Iron Guardian V3 is the runtime enforcement and protection shield. It protects the environment where deterministic CNS decisions operate.",
    independentUse: "As an independent module, Iron Guardian applies to secure compute environments, mission systems, industrial control, embedded protection, and sovereign infrastructure.",
    ecosystemUse: "Inside CNS, Iron Guardian acts as runtime executor and protection layer after authority decisions are emitted.",
    areas: ["Secure Compute Environments", "Mission Systems", "Industrial Control", "Embedded Protection", "Sovereign Infrastructure"],
  },
  {
    acronym: "SQS / DEEL",
    fullName: "Sealed Quality System / Deterministic Evidence & Execution Ledger",
    badge: "Evidence",
    color: "#007A6E",
    imgSrc: "/03-SQS_-_DEEL.png",
    desc: "Sealed evidence boundaries, deterministic evidence packaging, traceability, auditability, and external review support.",
    definition: "SQS / DEEL is the sealed evidence and execution ledger layer. It packages CNS outputs into traceable, reviewable, hash-verifiable records.",
    independentUse: "As an independent module, SQS / DEEL applies to audit systems, compliance workflows, quality systems, evidence packaging, and external attestation.",
    ecosystemUse: "Inside CNS, SQS / DEEL preserves the evidence chain across module outputs, final authority decisions, manifests, hashes, and audit packages.",
    areas: ["Audit Systems", "Evidence Packaging", "Verification Workflows", "Institutional Review", "Compliance"],
  },
];

const METRICS = [
  { v: "8/8", l: "Active Modules" },
  { v: "32", l: "Telemetry Domains" },
  { v: "24,606", l: "Records Processed" },
  { v: "196,848", l: "Module Rows" },
  { v: "PASS", l: "Validation Status", cyan: true },
];

const NAV_ITEMS = [
  { id: "ecosystem", label: "Ecosystem" },
  { id: "modules", label: "Modules" },
  { id: "cnl", label: "CNL" },
  { id: "business", label: "Licensing" },
  { id: "contact", label: "Contact" },
];

function scrollTo(id: string) {
  if (id === "top") { 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
    return; 
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<EcoModule | null>(null);

  return (
    <main style={{ minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", background: "#03030A", overflowX: "hidden" }}>
      
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #03030A; color: #EDF1FF; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(26,111,255,0.018) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(26,111,255,0.018) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none; z-index: 0;
        }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .eco-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease;
          display: flex; flex-direction: column;
          width: 100%;
          color: white;
          font: inherit;
          text-align: left;
          cursor: pointer;
        }
        .eco-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.16); }
        .eco-img-wrap { width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #07070F; }
        .eco-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease, filter 0.3s ease; filter: brightness(0.82); display: block; }
        .eco-card:hover .eco-img-wrap img { transform: scale(1.04); filter: brightness(1); }

        .nav-link { 
          color: rgba(255,255,255,0.55); 
          text-decoration: none; 
          font-size: 12px; 
          font-weight: 500; 
          letter-spacing: 0.08em; 
          text-transform: uppercase; 
          transition: color 0.2s; 
          cursor: pointer; 
          background: none; 
          border: none; 
        }
        .nav-link:hover { color: white; }

        .btn-primary {
          background: #1A6FFF; color: #fff; border: none;
          padding: 13px 32px; font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.07em;
          text-transform: uppercase; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .btn-primary:hover { background: #4D94FF; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent; color: white;
          border: 1px solid rgba(255,255,255,0.13);
          padding: 13px 32px; font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; cursor: pointer; text-decoration: none;
          display: inline-block; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: #1A6FFF; color: #4D94FF; }

        .prop-bar { 
          display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; 
          padding: 16px 48px; background: rgba(10,10,22,0.8); 
          border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 1; 
        }
        .prop { 
          display: flex; align-items: center; gap: 8px; 
          font-family: 'Space Mono', monospace; font-size: 10px; 
          letter-spacing: 0.09em; text-transform: uppercase; 
          color: rgba(255,255,255,0.5); 
        }

        .ticker-bar { 
          background: #07070F; border-top: 1px solid rgba(255,255,255,0.06); 
          border-bottom: 1px solid rgba(255,255,255,0.06); height: 44px; 
          overflow: hidden; position: relative; z-index: 1; 
        }
        .ticker-inner { 
          display: flex; align-items: center; height: 100%; 
          animation: tick 36s linear infinite; white-space: nowrap; 
        }
        .t-item { 
          display: inline-flex; align-items: center; gap: 8px; padding: 0 32px; 
          font-family: 'Space Mono', monospace; font-size: 10px; 
          letter-spacing: 0.1em; text-transform: uppercase; 
          color: rgba(255,255,255,0.45); border-right: 1px solid rgba(255,255,255,0.06); 
          height: 100%; 
        }
        .t-v { color: #00C8FF; font-weight: 700; }
        .t-p { color: #00A85E; font-weight: 700; }

        .module-modal-backdrop {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.74);
          backdrop-filter: blur(18px);
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
        }
        .module-modal {
          width: min(1060px, 100%);
          max-height: calc(100vh - 64px);
          overflow: auto;
          display: grid;
          grid-template-columns: minmax(300px, 0.9fr) minmax(0, 1.1fr);
          background: #07070F;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 28px 90px rgba(0,0,0,0.55);
        }
        .module-modal-img { min-height: 100%; background: #03030A; border-right: 1px solid rgba(255,255,255,0.08); }
        .module-modal-img img { width: 100%; height: 100%; min-height: 520px; object-fit: cover; display: block; filter: brightness(0.92); }
        .module-modal-body { padding: 34px; }
        .module-modal-close {
          float: right; width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          color: white; cursor: pointer;
          font-family: 'Space Mono', monospace; font-size: 18px;
        }
        .module-modal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 700; line-height: 1;
          padding-right: 54px; margin-bottom: 10px;
        }
        .module-modal-full {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 24px;
        }
        .module-modal-section {
          padding: 17px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .module-modal-section h3 {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .module-modal-section p {
          font-size: 14px; line-height: 1.65;
          color: rgba(255,255,255,0.66);
        }
        .module-modal-tags {
          display: flex; flex-wrap: wrap; gap: 7px;
          margin-top: 4px;
        }
        .module-modal-tags span {
          font-family: 'Space Mono', monospace;
          font-size: 9px; letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 9px;
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.62);
          background: rgba(255,255,255,0.035);
        }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
          .eco-grid { grid-template-columns: 1fr !important; }
          .metrics-row { flex-wrap: wrap; }
          .prop-bar { gap: 16px; padding: 14px 20px; }
          .nav-links-desktop { display: none !important; }
          .section-inner { padding: 72px 20px !important; }
          .eco-header-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .module-modal-backdrop { padding: 16px; }
          .module-modal { grid-template-columns: 1fr; max-height: calc(100vh - 32px); }
          .module-modal-img { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .module-modal-img img { min-height: 0; aspect-ratio: 1.25 / 1; }
          .module-modal-body { padding: 24px; }
        }
      `}</style>

      {/* Video Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          src="/brand/cns_canvas.mp4"
          autoPlay loop muted playsInline preload="metadata"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,3,10,0.3) 0%, rgba(3,3,10,0.65) 60%, rgba(3,3,10,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(26,111,255,0.09) 0%, transparent 70%)" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(3,3,10,0.94)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 48px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, border: "1px solid #1A6FFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, color: "#1A6FFF", position: "relative" }}>
            CNS
            <div style={{ position: "absolute", top: -4, right: -4, width: 6, height: 6, borderRadius: "50%", background: "#00C8FF", boxShadow: "0 0 6px #00C8FF", animation: "blink 2s infinite" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em" }}>Causal Nexus Systems</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Sovereign Deterministic Ecosystem</div>
          </div>
        </div>

        <div className="nav-links-desktop" style={{ display: "flex", gap: 36, listStyle: "none" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} className="nav-link" onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>

        <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 11 }} onClick={() => scrollTo("contact")}>NDA Access</button>
      </nav>

      {/* TICKER */}
      <div style={{ paddingTop: 68 }}>
        <div className="ticker-bar">
          <div className="ticker-inner">
            {[
              ["Run ID", "CNS_K24_UNIFIED_32_DOMAIN", false],
              ["Authority", "K24.1-RS", false],
              ["Runtime", "Iron Guardian V3", false],
              ["Merkle Root", "3a3f1ef7512b...", false],
              ["Validation", "PASS", true],
              ["FTTI", "0.16", false],
              ["False Negatives", "0.00", false],
              ["False Positives", "0.01", false],
              ["Domains Active", "32", false],
              ["SHA-256", "dee7a9d13b76...", false],
            ].flatMap((item, i) => [
              <div key={i} className="t-item">{item[0]} <span className={item[2] ? "t-p" : "t-v"}>{item[1] as string}</span></div>,
              <div key={`d${i}`} className="t-item">{item[0]} <span className={item[2] ? "t-p" : "t-v"}>{item[1] as string}</span></div>,
            ])}
          </div>
        </div>
      </div>

      {/* PROPS BAR */}
      <div className="prop-bar">
        <div className="prop">✓ Deterministic Causal</div>
        <div className="prop">✓ No Cloud Dependency</div>
        <div className="prop">✓ No Linux Dependency</div>
        <div className="prop">✓ Sovereign Technology</div>
        <div className="prop">✓ SHA-256 · Merkle Root</div>
        <div className="prop">✓ Falsifiable Audit Package</div>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "100px 48px 80px" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>
              Causal Nexus Systems LLC
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(64px, 10vw, 112px)", fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: 16 }}>
              <span style={{ background: "linear-gradient(130deg, #fff 0%, #4D94FF 45%, #00C8FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CNS</span>
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 48 }}>
              Next-Generation Sovereign Deterministic Ecosystem
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 300, lineHeight: 1.35, color: "rgba(237,241,255,0.88)", maxWidth: 600, marginBottom: 52 }}>
              <strong style={{ color: "#00C8FF", fontWeight: 600 }}>CNS measures the cause.</strong><br />
              It does not wait for the effect.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("modules")}>Explore the Ecosystem</button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>Request NDA Access</button>
            </div>
          </div>

          {/* Metrics Panel */}
          <div style={{ background: "rgba(10,10,22,0.75)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", padding: 40 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 28 }}>
              K24 Unified Run — Live Metrics
            </div>
            <div className="metrics-row" style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 32 }}>
              {METRICS.map(m => (
                <div key={m.l} style={{ flex: 1, padding: "20px 16px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: m.cyan ? "#00C8FF" : "white", display: "block" }}>{m.v}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{m.l}</div>
                </div>
              ))}
            </div>
            {[
              ["Run ID", "CNS_K24_UNIFIED_32_DOMAIN"],
              ["Merkle Root", "3a3f1ef7512b..."],
              ["SHA-256", "dee7a9d13b76..."],
              ["FTTI", "0.16"],
              ["False Negatives", "0.00"],
              ["False Positives", "0.01"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: "10px 14px", background: "rgba(0,168,94,0.08)", border: "1px solid rgba(0,168,94,0.25)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A85E", boxShadow: "0 0 6px #00A85E", animation: "blink 1.5s infinite", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00A85E", letterSpacing: "0.1em", textTransform: "uppercase" }}>Validation: PASS — Iron Guardian V3 Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS CNS */}
      <section id="ecosystem" style={{ position: "relative", zIndex: 1, background: "rgba(10,10,22,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>What is CNS</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Not monitoring.<br />Not prediction.<br />Causal governance.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  ["Is the system state coherent?", "CNS evaluates whether the operational state remains causally aligned and structurally valid."],
                  ["Is the system bounded?", "CNS classifies outputs into controlled operational states — not uncontrolled or opaque reactions."],
                  ["Is runtime trustworthy?", "CNS validates execution path, module context, and deployment state before any action."],
                  ["Is the result reviewable?", "CNS generates structured evidence packages for replay, audit, and institutional review."],
                  ["Can evidence be trusted later?", "CNS supports hash-based integrity, sealed packages, chain-of-custody, and non-repudiation."],
                ].map(([q, a]) => (
                  <div key={q} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "white" }}>{q}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {[
                ["Deterministic", "Same input, same state, same output. Always. Independently verifiable by any third party at any time."],
                ["Bounded", "Outputs classified into controlled states: Observe, Elevated Risk, Domain Quarantine."],
                ["Sovereign", "Core causal function operates locally, air-gapped, or embedded. No third-party cloud dependency."],
                ["Falsifiable", "Every run produces SHA-256 hashes, Merkle root, and a sealed evidence package for independent review."],
                ["Traceable", "Full module-level authority chain from signal ingestion to final runtime action — every step recorded."],
                ["Modular", "Each module deploys independently or as part of the integrated ecosystem. Domain-scoped licensing."],
              ].map(([t, d]) => (
                <div key={t} style={{ background: "rgba(15,15,28,0.8)", border: "1px solid rgba(255,255,255,0.06)", padding: 22 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 8 }}>{t}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM LAYERS */}
      <section style={{ position: "relative", zIndex: 1, background: "rgba(7,7,16,0.7)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div className="eco-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 60 }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Architecture</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Eight-layer<br />sovereign ecosystem.
              </h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
              Each layer serves a precise institutional role. Together they form one causal platform — not a collection of tools.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { lbl: "Master", num: "★", color: "#1A6FFF", mod: "CNS Master Platform — V23.5 Deterministic Causal Core", desc: "Universal causal foundation. Sovereign entry point.", tags: ["Sovereign", "NDA-First"], accent: true },
              { lbl: "Authority", num: "RS", color: "#8BA0C0", mod: "K24.1-RS — Runtime Sovereign Authority", desc: "Integrates all module verdicts. Emits the final deterministic causal decision.", tags: ["Command Authority", "Defense Ops"] },
              { lbl: "Decision", num: "2", color: "#B83232", mod: "ACDK v4.1 — Adaptive Causal Decision Kernel", desc: "Strategic decision governance for mission planning and multi-domain coordination.", tags: ["Mission Planning", "Multi-Domain"] },
              { lbl: "Edge", num: "3", color: "#00A85E", mod: "NCM v2.1 — Nexus Causal Module", desc: "Compact deterministic causal operation for edge devices, drones, robotics, autonomous systems.", tags: ["Edge", "Drones", "Embedded"] },
              { lbl: "Fusion", num: "4", color: "#6C32D4", mod: "MDFE v3.1 — Multi-Domain Fusion Engine", desc: "Fuses heterogeneous signals into unified causal context.", tags: ["Sensor Fusion", "Situational Awareness"] },
              { lbl: "Coherence", num: "5", color: "#4D94FF", mod: "KECS — Kinetic Entropy Coherence System", desc: "Causal coherence evaluation, kinetic entropy analysis, cascade stability, fault detection, containment.", tags: ["System Safety", "Resilience"] },
              { lbl: "Integrity", num: "6", color: "#C85A18", mod: "ADIK / AetherCore — Deterministic Integrity Kernel", desc: "Timing consistency, output determinism, state integrity, repeatable validation.", tags: ["Physical Control", "Aerospace"] },
              { lbl: "Protection", num: "7", color: "#C8A84B", mod: "Iron Guardian V3 — Runtime Enforcement & Protection Shield", desc: "Protects runtime trust, enforces bounded execution, preserves resilient sovereign assurance.", tags: ["Mission Systems", "Sovereign Infra"] },
              { lbl: "Evidence", num: "8", color: "#007A6E", mod: "SQS / DEEL — Sealed Quality System / Deterministic Evidence & Execution Ledger", desc: "Packages, seals, and preserves CNS outputs as structured, traceable, verification-ready institutional evidence.", tags: ["Audit", "Compliance", "Institutional Review"] },
            ].map((row) => (
              <div key={row.mod} style={{ display: "grid", gridTemplateColumns: "100px 46px 1fr", alignItems: "stretch" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textAlign: "right", paddingRight: 14, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{row.lbl}</div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: row.num === "★" ? 14 : 12, margin: "auto", flexShrink: 0, background: `${row.color}18`, border: `${row.accent ? 2 : 1}px solid ${row.color}`, color: row.color }}>{row.num}</div>
                <div style={{ padding: "14px 22px", borderLeft: `2px solid ${row.color}`, marginLeft: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, background: row.accent ? `${row.color}08` : "rgba(15,15,28,0.6)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: row.color, marginBottom: 3 }}>{row.mod}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{row.desc}</div>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end", flexShrink: 0, maxWidth: 230 }}>
                    {row.tags.map(t => (
                      <span key={t} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${row.color}`, color: row.color, opacity: 0.6 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULE CARDS */}
      <section id="modules" style={{ position: "relative", zIndex: 1, background: "rgba(10,10,22,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div className="eco-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 60 }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Module Ecosystem</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Every module.<br />One sovereign platform.
              </h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)" }}>
              Each module deploys independently or integrates into the full CNS ecosystem.
            </p>
          </div>

          <div className="eco-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
            {ECO_MODULES.map((mod) => (
              <button 
                type="button" 
                key={mod.acronym} 
                className="eco-card" 
                onClick={() => setSelectedModule(mod)}
              >
                <div style={{ height: 3, background: mod.color }} />
                <div className="eco-img-wrap">
                  <img src={mod.imgSrc} alt={mod.acronym} loading="lazy" />
                </div>
                <div style={{ padding: 22, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: mod.color }}>{mod.acronym}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${mod.color}`, color: mod.color, opacity: 0.65, whiteSpace: "nowrap", flexShrink: 0 }}>{mod.badge}</div>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 11 }}>{mod.fullName}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", marginBottom: 14, flex: 1 }}>{mod.desc}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {mod.areas.map(a => (
                      <span key={a} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.04em", textTransform: "uppercase", padding: "2px 7px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}>{a}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 15, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Open module brief</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CNL Section */}
      <section id="cnl" style={{ position: "relative", zIndex: 1, background: "rgba(7,7,16,0.7)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Causal Nexus Ledger</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 48 }}>
            CNL v1.0 — The consensus<br />layer of the ecosystem.
          </h2>
          {/* ... (resto del contenido de CNL se mantiene igual) */}
        </div>
      </section>

      {/* BUSINESS / LICENSING */}
      <section id="business" style={{ position: "relative", zIndex: 1, background: "rgba(10,10,22,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Licensing Model</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18 }}>
            Three paths to sovereign<br />causal governance.
          </h2>
          {/* ... (resto del contenido de Licensing se mantiene igual) */}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(7,7,16,0.8)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Access & Partnerships</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Kernel access<br />is NDA-first.
          </h2>
          {/* ... (resto del contenido de Contact se mantiene igual) */}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#03030A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "26px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>
          © 2026 Causal Nexus Systems LLC · All rights reserved · Public layer only — kernel access is NDA-first
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
          CNS <span style={{ color: "#1A6FFF" }}>K24</span> · 32 Domains · 24,606 Records · Validation <span style={{ color: "#1A6FFF" }}>PASS</span>
        </div>
      </footer>

      {/* MODULE MODAL */}
      {selectedModule && (
        <div className="module-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setSelectedModule(null)}>
          <div className="module-modal" onClick={(e) => e.stopPropagation()}>
            <div className="module-modal-img">
              <img src={selectedModule.imgSrc} alt={selectedModule.acronym} />
            </div>
            <div className="module-modal-body">
              <button type="button" className="module-modal-close" onClick={() => setSelectedModule(null)}>×</button>
              <div className="module-modal-title" style={{ color: selectedModule.color }}>{selectedModule.acronym}</div>
              <div className="module-modal-full">{selectedModule.fullName}</div>

              <div className="module-modal-section">
                <h3 style={{ color: selectedModule.color }}>Definition</h3>
                <p>{selectedModule.definition}</p>
              </div>

              <div className="module-modal-section">
                <h3 style={{ color: selectedModule.color }}>Independent Module</h3>
                <p>{selectedModule.independentUse}</p>
              </div>

              <div className="module-modal-section">
                <h3 style={{ color: selectedModule.color }}>Inside CNS Ecosystem</h3>
                <p>{selectedModule.ecosystemUse}</p>
              </div>

              <div className="module-modal-section">
                <h3 style={{ color: selectedModule.color }}>Applicable Areas</h3>
                <div className="module-modal-tags">
                  {selectedModule.areas.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
