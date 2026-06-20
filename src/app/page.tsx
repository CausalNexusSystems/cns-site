"use client";
 
import { useState } from "react";
 
type EcoModule = {
  acronym: string;
  fullName: string;
  badge: string;
  color: string;
  imgSrc: string;
  desc: string;
  areas: string[];
};
 
const ECO_MODULES: EcoModule[] = [
  {
    acronym: "K24.1-RS",
    fullName: "Runtime Sovereign Authority",
    badge: "Authority",
    color: "#8BA0C0",
    imgSrc: "/K24.1-RS.png",
    desc: "The command authority of the CNS ecosystem. Integrates all module evidence and emits the final deterministic causal decision. Sovereign verification, decision integration, consensus resolution, policy enforcement, runtime verdict.",
    areas: ["Command Authority", "Mission Governance", "Defense Operations", "Critical Infrastructure"],
  },
  {
    acronym: "ACDK v4.1",
    fullName: "Adaptive Causal Decision Kernel",
    badge: "Decision",
    color: "#B83232",
    imgSrc: "/ACDK.png",
    desc: "Strategic causal decision governance for environments where complex operational conditions must be interpreted and converted into bounded decision postures. Adaptive reasoning, scenario evaluation, risk-aware decisions.",
    areas: ["Strategic Decision Systems", "Mission Planning", "Critical Infrastructure", "Adaptive Risk Management"],
  },
  {
    acronym: "NCM v2.1",
    fullName: "Nexus Causal Module",
    badge: "Edge",
    color: "#00A85E",
    imgSrc: "/NCM.png",
    desc: "Compact deterministic causal operation for environments where decisions must occur locally, close to the physical system, without remote cloud dependency. No latency dependency. No connectivity requirement for critical decisions.",
    areas: ["Edge Devices", "Drones", "Robotics", "Autonomous Systems", "Embedded Platforms"],
  },
  {
    acronym: "MDFE v3.1",
    fullName: "Multi-Domain Fusion Engine",
    badge: "Fusion",
    color: "#6C32D4",
    imgSrc: "/MDFE.png",
    desc: "Transforms fragmented operational streams from multiple domains into unified deterministic causal context. Critical environments never operate in a single domain — MDFE ensures all signals are interpreted together, coherently.",
    areas: ["Sensor Fusion", "Aerospace Systems", "Energy Systems", "Cyber-Physical", "Situational Awareness"],
  },
  {
    acronym: "KECS",
    fullName: "Kinetic Entropy Coherence System",
    badge: "Coherence",
    color: "#4D94FF",
    imgSrc: "/KECS.png",
    desc: "Causal coherence evaluation, kinetic entropy analysis, cascade stability monitoring, fault detection, safe-state containment protocols, and zeroize protection. Deterministic governance with auditable evidence chain.",
    areas: ["System Safety", "Critical Infrastructure Resilience", "Real-Time Risk Governance", "Industrial Process Control"],
  },
  {
    acronym: "ADIK / AetherCore",
    fullName: "Deterministic Integrity Kernel",
    badge: "Integrity",
    color: "#C85A18",
    imgSrc: "/ADIK.png",
    desc: "Preserves technical trust between a physical operational state and the evidence-supported result produced from that state. Timing consistency, output determinism, state integrity, repeatable results.",
    areas: ["Physical Control Systems", "Aerospace", "Energy Infrastructure", "Industrial Automation", "Robotics"],
  },
  {
    acronym: "Iron Guardian V3",
    fullName: "Runtime Enforcement & Protection Shield",
    badge: "Protection",
    color: "#C8A84B",
    imgSrc: "/IRON GUARDIAN.png",
    desc: "Runtime enforcement engine, threat containment protocols, real-time integrity monitoring, autonomous response logic. Protects the environment where deterministic causal execution runs. Trusted. Isolated. Resilient.",
    areas: ["Secure Compute Environments", "Mission Systems", "Industrial Control", "Embedded Protection", "Sovereign Infrastructure"],
  },
  {
    acronym: "SQS / DEEL",
    fullName: "Sealed Quality System / Deterministic Evidence & Execution Ledger",
    badge: "Evidence",
    color: "#007A6E",
    imgSrc: "/SQS - DEEL.png",
    desc: "Sealed evidence boundaries, deterministic evidence packaging, traceability, auditability, disclosure constraints, evidence ledger integrity, falsifiability and independent review. Evidence that survives scrutiny.",
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
  if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
 
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
 
  return (
    <main style={{ minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", background: "#03030A", overflowX: "hidden" }}>
 
      {/* ── GLOBAL STYLES ── */}
      <style jsx global>{`
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
 
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
 
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }
        @keyframes tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes revealUp { 0%{opacity:0;transform:translateY(18px)} 100%{opacity:1;transform:translateY(0)} }
 
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .reveal.vis { opacity: 1; transform: translateY(0); }
 
        .eco-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease;
          display: flex; flex-direction: column;
        }
        .eco-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.16); }
        .eco-img-wrap { width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #07070F; }
        .eco-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease, filter 0.3s ease; filter: brightness(0.82); display: block; }
        .eco-card:hover .eco-img-wrap img { transform: scale(1.04); filter: brightness(1); }
 
        .nav-link { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; cursor: pointer; background: none; border: none; }
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
 
        .prop-bar { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; padding: 16px 48px; background: rgba(10,10,22,0.8); border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; z-index: 1; }
        .prop { display: flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
 
        .ticker-bar { background: #07070F; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); height: 44px; overflow: hidden; position: relative; z-index: 1; }
        .ticker-inner { display: flex; align-items: center; height: 100%; animation: tick 36s linear infinite; white-space: nowrap; }
        .t-item { display: inline-flex; align-items: center; gap: 8px; padding: 0 32px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); border-right: 1px solid rgba(255,255,255,0.06); height: 100%; }
        .t-v { color: #00C8FF; font-weight: 700; }
        .t-p { color: #00A85E; font-weight: 700; }
 
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
          .eco-grid { grid-template-columns: 1fr !important; }
          .metrics-row { flex-wrap: wrap; }
          .metrics-row > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); flex: 1 1 40%; }
          .prop-bar { gap: 16px; padding: 14px 20px; }
          .nav-links-desktop { display: none !important; }
          .section-inner { padding: 72px 20px !important; }
          .eco-header-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
 
      {/* ── VIDEO BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <video
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
          src="/brand/cns_canvas.mp4"
          autoPlay loop muted playsInline preload="metadata"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(3,3,10,0.3) 0%, rgba(3,3,10,0.65) 60%, rgba(3,3,10,0.92) 100%)" }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(26,111,255,0.09) 0%, transparent 70%)" }} />
      </div>
 
      {/* ── NAV ── */}
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
 
      {/* ── TICKER ── */}
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
 
      {/* ── PROPS BAR ── */}
      <div className="prop-bar">
        <div className="prop">✓ Deterministic Causal</div>
        <div className="prop">✓ No Cloud Dependency</div>
        <div className="prop">✓ No Linux Dependency</div>
        <div className="prop">✓ Sovereign Technology</div>
        <div className="prop">✓ SHA-256 · Merkle Root</div>
        <div className="prop">✓ Falsifiable Audit Package</div>
      </div>
 
      {/* ── HERO ── */}
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
 
          {/* Metrics panel */}
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
 
      {/* ── WHAT IS CNS ── */}
      <section id="ecosystem" style={{ position: "relative", zIndex: 1, background: "rgba(10,10,22,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>What is CNS</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Not monitoring.<br />Not prediction.<br />Causal governance.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable — before a state continues, escalates, or affects a critical system.
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
 
      {/* ── ECOSYSTEM LAYERS ── */}
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
              Each layer serves a precise institutional role. Together they form one causal platform — not a collection of tools. The difference between a set of modules and a sovereign deterministic architecture.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { lbl: "Master", num: "★", color: "#1A6FFF", mod: "CNS Master Platform — V23.5 Deterministic Causal Core", desc: "Universal causal foundation. Sovereign entry point. Makes all modules coherent as one ecosystem.", tags: ["Sovereign", "NDA-First"], accent: true },
              { lbl: "Authority", num: "RS", color: "#8BA0C0", mod: "K24.1-RS — Runtime Sovereign Authority", desc: "Integrates all module verdicts. Emits the final deterministic causal decision. Command authority.", tags: ["Command Authority", "Defense Ops"] },
              { lbl: "Decision", num: "2", color: "#B83232", mod: "ACDK v4.1 — Adaptive Causal Decision Kernel", desc: "Strategic decision governance. Mission planning, critical infrastructure, multi-domain coordination.", tags: ["Mission Planning", "Multi-Domain"] },
              { lbl: "Edge", num: "3", color: "#00A85E", mod: "NCM v2.1 — Nexus Causal Module", desc: "Compact deterministic causal operation for edge devices, drones, robotics, autonomous systems.", tags: ["Edge", "Drones", "Embedded"] },
              { lbl: "Fusion", num: "4", color: "#6C32D4", mod: "MDFE v3.1 — Multi-Domain Fusion Engine", desc: "Fuses heterogeneous signals — sensors, aerospace, energy, cyber-physical — into unified causal context.", tags: ["Sensor Fusion", "Situational Awareness"] },
              { lbl: "Coherence", num: "5", color: "#4D94FF", mod: "KECS — Kinetic Entropy Coherence System", desc: "Causal coherence evaluation, kinetic entropy analysis, cascade stability, fault detection, containment.", tags: ["System Safety", "Resilience"] },
              { lbl: "Integrity", num: "6", color: "#C85A18", mod: "ADIK / AetherCore — Deterministic Integrity Kernel", desc: "Timing consistency, output determinism, state integrity, repeatable validation. Built for physical reality.", tags: ["Physical Control", "Aerospace"] },
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
 
      {/* ── MODULE CARDS WITH REAL IMAGES ── */}
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
              Each module deploys independently or integrates into the full CNS ecosystem. Modular licensing. Unified deterministic foundation. Institutional scope defined per domain and operational boundary under NDA.
            </p>
          </div>
          <div className="eco-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {ECO_MODULES.map((mod) => (
              <div key={mod.acronym} className="eco-card">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CNL ── */}
      <section id="cnl" style={{ position: "relative", zIndex: 1, background: "rgba(7,7,16,0.7)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Causal Nexus Ledger</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 48 }}>CNL v1.0 — The consensus<br />layer of the ecosystem.</h2>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <img src="/CNL.png" alt="CNL v1.0" style={{ width: "100%", display: "block", filter: "brightness(0.9)" }} />
            </div>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,168,94,0.08)", border: "1px solid rgba(0,168,94,0.25)", padding: "6px 14px", marginBottom: 22, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00A85E" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A85E", animation: "blink 1.5s infinite" }} />
                50–60% Global Progress — Approaching Production
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 22 }}>CNL is not just a ledger. It is a complete deterministic consensus system — transforming CNS from a local sovereign engine into a resilient, auditable, and verifiable consensus network. Real nodes. Real machines. Real world.</p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", marginBottom: 30 }}>No node can rebuild the consensus from scratch. The only source of truth is the canonical ledger. CNL measures the cause — it does not wait for the effect.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
                {[["<50ms", "Commit Latency p95"], ["1K+", "Batches / min"], ["<500ms", "Finalization Time"], ["PASS", "External Verifier (Rust)"]].map(([v, l]) => (
                  <div key={l} style={{ background: "rgba(15,15,28,0.8)", border: "1px solid rgba(255,255,255,0.06)", padding: 16, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: v === "PASS" ? "#00C8FF" : "#00A85E", display: "block", marginBottom: 3 }}>{v}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)" }}>{l}</div>
                  </div>
                ))}
              </div>
              {[
                ["⚡", "Deterministic Consensus — 3/4 Threshold", "No probabilistic consensus. Verifiable commit certificates. Every node reaches the same state."],
                ["🔗", "Canonical Ledger — Unique, Immutable, Verifiable", "The single source of truth. Anti-reorg guaranteed before finality."],
                ["🛡", "Automatic Recovery — Partition Tolerant", "Processes crash, nodes go offline — CNL converges automatically after heal."],
                ["🔍", "Independent External Verification (Rust)", "Rust-based external verifier completed and approved. Audit trail independent from internal logic."],
              ].map(([icon, t, s]) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "13px 16px", background: "rgba(15,15,28,0.6)", border: "1px solid rgba(255,255,255,0.05)", marginTop: 2 }}>
                  <div style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 2 }}>{t}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: "15px 17px", background: "rgba(0,168,94,0.06)", border: "1px solid rgba(0,168,94,0.2)" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00A85E", marginBottom: 5 }}>Next Milestone</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>FD Multi-Machine Testnet</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Real nodes. Real machines. Real world. No middleware.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── BUSINESS ── */}
      <section id="business" style={{ position: "relative", zIndex: 1, background: "rgba(10,10,22,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Licensing Model</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18 }}>Three paths to sovereign<br />causal governance.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.6)", maxWidth: 580, marginBottom: 60 }}>CNS is not a SaaS product. Access is granted under NDA, scoped per domain and operational boundary. No source access. No kernel exposure. No reverse engineering permitted.</p>
          <div className="modules-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {[
              { eye: "Module License", t: "Single Module\nDeployment", d: "Deploy one CNS module for a specific operational domain, use case, or mission need.", items: ["One module, one operational domain", "NDA-first access agreement", "Defined license scope and boundary", "Local, edge, or sovereign deployment", "Evidence packaging included"] },
              { eye: "Ecosystem License", t: "Full CNS Ecosystem\nPlatform", d: "Access the complete deterministic causal ecosystem. All modules, all layers, unified under one sovereign causal platform.", items: ["All 8 modules across all layers", "V23.5 Deterministic Causal Core", "CNL consensus layer (on availability)", "Multi-domain operational scope", "Full audit and evidence package", "Dedicated institutional engagement"], feat: true },
              { eye: "Sovereign Nation License", t: "Country-Level\nDeployment", d: "CNS licensed at national scale for governments, defense ministries, and sovereign institutions.", items: ["National-scope operational license", "Sovereign deployment architecture", "Air-gapped or private cloud options", "Defense, infrastructure, financial sectors", "Direct government-level engagement"] },
            ].map((bc) => (
              <div key={bc.eye} style={{ background: bc.feat ? "rgba(26,111,255,0.05)" : "rgba(15,15,28,0.8)", border: `1px solid ${bc.feat ? "rgba(26,111,255,0.4)" : "rgba(255,255,255,0.06)"}`, padding: "34px 26px", position: "relative" }}>
                {bc.feat && <div style={{ position: "absolute", top: -1, right: 18, background: "#1A6FFF", color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px" }}>FLAGSHIP</div>}
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 10 }}>{bc.eye}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12, lineHeight: 1.2, whiteSpace: "pre-line" }}>{bc.t}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 20 }}>{bc.d}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {bc.items.map(item => (
                    <li key={item} style={{ fontSize: 13, color: "rgba(237,241,255,0.65)", display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <span style={{ color: "#1A6FFF", flexShrink: 0, fontFamily: "'Space Mono', monospace", fontSize: 11 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: "18px 24px", background: "rgba(15,15,28,0.8)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>All access is NDA-first. No exceptions.</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>No public SaaS. No source access. All public outputs cryptographically sealed via SHA-256 and Merkle root verification.</div>
            </div>
            <button className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0 }} onClick={() => scrollTo("contact")}>Request Access</button>
          </div>
        </div>
      </section>
 
      {/* ── CONTACT ── */}
      <section id="contact" style={{ position: "relative", zIndex: 1, background: "rgba(7,7,16,0.8)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "100px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1A6FFF", marginBottom: 14 }}>Access & Partnerships</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.02em" }}>Kernel access<br />is NDA-first.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 36 }}>CNS is designed for high-stakes deployments in aerospace, defense, critical infrastructure, financial systems, and sovereign institutions. Partnerships, licensing, and technical evaluations begin under a confidentiality agreement.</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.07)", border: "1px solid rgba(200,168,75,0.25)", padding: "9px 18px", marginBottom: 32, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A84B" }}>
            🔒 No source access · No kernel exposure · No reverse engineering permitted
          </div>
          <br /><br />
          <a href="mailto:admin@causalnexussystems.com" style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "white", textDecoration: "none", marginBottom: 28, transition: "color 0.2s" }}>admin@causalnexussystems.com</a>
          <a href="mailto:admin@causalnexussystems.com" className="btn-primary" style={{ display: "inline-block", marginBottom: 48 }}>Request NDA Access</a>
          <div style={{ display: "flex", justifyContent: "center", gap: 44, flexWrap: "wrap", marginTop: 44, paddingTop: 44, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[["Entity", "Causal Nexus Systems LLC"], ["Location", "Orlando, Florida — USA"], ["Patents", "#63/896,666 · #64/043,866 · #64/067,492"], ["Founder", "Anthony Moreno"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{l}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: "white" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer style={{ background: "#03030A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "26px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>© 2026 Causal Nexus Systems LLC · All rights reserved · Public layer only — kernel access is NDA-first</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>CNS <span style={{ color: "#1A6FFF" }}>K24</span> · 32 Domains · 24,606 Records · Validation <span style={{ color: "#1A6FFF" }}>PASS</span> · Merkle: 3a3f1ef7512b...</div>
      </footer>
 
    </main>
  );
}
 










