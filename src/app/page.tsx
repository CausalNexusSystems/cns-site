<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CNS - Causal Nexus Systems</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
    
    :root {
      --cns-blue: #1A6FFF;
    }
    
    body {
      font-family: 'Inter', system_ui, sans-serif;
      background: #03030A;
      color: #EDF1FF;
    }
    
    .font-grotesk {
      font-family: 'Space Grotesk', system_ui, sans-serif;
    }
    
    .font-mono {
      font-family: 'Space Mono', ui-monospace, monospace;
    }

    .eco-card {
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    
    .eco-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.16);
    }

    .ticker-inner {
      animation: ticker 36s linear infinite;
    }

    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .nav-link {
      transition: color 0.2s ease;
    }
    
    .nav-link:hover {
      color: white;
    }

    .module-modal {
      animation: modalPop 0.2s ease forwards;
    }

    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.96) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }

    .section-title {
      font-size: clamp(30px, 4vw, 48px);
      line-height: 1.1;
      font-weight: 700;
    }
  </style>
</head>
<body class="overflow-x-hidden">

  <!-- Video Background -->
  <div class="fixed inset-0 z-0 pointer-events-none">
    <video 
      class="w-full h-full object-cover opacity-35" 
      src="/brand/cns_canvas.mp4" 
      autoplay 
      loop 
      muted 
      playsinline>
    </video>
    <div class="absolute inset-0 bg-gradient-to-b from-[#03030A]/30 via-[#03030A]/65 to-[#03030A]/92"></div>
  </div>

  <!-- Navigation -->
  <nav class="fixed top-0 left-0 right-0 z-[200] bg-[#03030A]/95 backdrop-blur-xl border-b border-white/10">
    <div class="max-w-screen-2xl mx-auto px-8 h-[68px] flex items-center justify-between">
      <div class="flex items-center gap-x-3">
        <div class="w-9 h-9 border border-[#1A6FFF] flex items-center justify-center relative">
          <span class="font-bold text-[#1A6FFF] text-sm tracking-wider">CNS</span>
          <div class="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00C8FF] rounded-full animate-pulse"></div>
        </div>
        <div>
          <div class="font-semibold text-lg tracking-tight">Causal Nexus Systems</div>
          <div class="text-[10px] text-white/40 -mt-1 tracking-[1.5px]">SOVEREIGN DETERMINISTIC ECOSYSTEM</div>
        </div>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-x-8 text-sm">
        <button onclick="scrollToSection('ecosystem')" class="nav-link text-white/60 hover:text-white text-xs tracking-widest font-medium">ECOSYSTEM</button>
        <button onclick="scrollToSection('modules')" class="nav-link text-white/60 hover:text-white text-xs tracking-widest font-medium">MODULES</button>
        <button onclick="scrollToSection('cnl')" class="nav-link text-white/60 hover:text-white text-xs tracking-widest font-medium">CNL</button>
        <button onclick="scrollToSection('business')" class="nav-link text-white/60 hover:text-white text-xs tracking-widest font-medium">LICENSING</button>
        <button onclick="scrollToSection('contact')" class="nav-link text-white/60 hover:text-white text-xs tracking-widest font-medium">CONTACT</button>
      </div>

      <button onclick="scrollToSection('contact')" 
              class="px-6 py-2.5 bg-[#1A6FFF] hover:bg-[#4D94FF] transition-all text-xs font-semibold tracking-wider rounded-full">
        NDA ACCESS
      </button>
    </div>
  </nav>

  <!-- Ticker -->
  <div class="pt-[68px]">
    <div class="bg-[#07070F] border-y border-white/10 h-11 overflow-hidden">
      <div class="ticker-inner flex items-center h-full whitespace-nowrap text-xs tracking-[1px] text-white/50">
        <div class="flex items-center">
          <div class="px-8 border-r border-white/10">RUN ID <span class="text-[#00C8FF] font-bold">CNS_K24_UNIFIED_32_DOMAIN</span></div>
          <div class="px-8 border-r border-white/10">AUTHORITY <span class="text-[#00C8FF] font-bold">K24.1-RS</span></div>
          <div class="px-8 border-r border-white/10">RUNTIME <span class="text-[#00C8FF] font-bold">Iron Guardian V3</span></div>
          <div class="px-8 border-r border-white/10">VALIDATION <span class="text-[#00A85E] font-bold">PASS</span></div>
          <div class="px-8 border-r border-white/10">FTTI <span class="text-[#00C8FF] font-bold">0.16</span></div>
          <div class="px-8 border-r border-white/10">FALSE NEGATIVES <span class="text-[#00C8FF] font-bold">0.00</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Hero -->
  <section class="relative z-10 max-w-screen-2xl mx-auto px-8 pt-16 pb-12">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
      
      <!-- Left Content -->
      <div>
        <div class="text-[#1A6FFF] text-xs tracking-[3px] font-mono mb-3">CAUSAL NEXUS SYSTEMS LLC</div>
        
        <h1 class="text-[92px] lg:text-[120px] leading-[0.88] font-bold tracking-tighter mb-4">
          <span class="bg-gradient-to-r from-white via-[#4D94FF] to-[#00C8FF] bg-clip-text text-transparent">CNS</span>
        </h1>
        
        <div class="text-white/50 text-sm tracking-[3.5px] font-medium mb-8">NEXT-GENERATION SOVEREIGN DETERMINISTIC ECOSYSTEM</div>
        
        <p class="max-w-lg text-3xl leading-tight font-light text-white/90 mb-10">
          <strong class="font-semibold text-[#00C8FF]">CNS measures the cause.</strong><br>
          It does not wait for the effect.
        </p>
        
        <div class="flex flex-wrap gap-3">
          <button onclick="scrollToSection('modules')" 
                  class="px-8 py-3.5 bg-[#1A6FFF] hover:bg-[#4D94FF] transition-all font-semibold text-sm tracking-wider rounded-full">
            EXPLORE THE ECOSYSTEM
          </button>
          <button onclick="scrollToSection('contact')" 
                  class="px-8 py-3.5 border border-white/30 hover:border-white/60 transition-all font-medium text-sm tracking-wider rounded-full">
            REQUEST NDA ACCESS
          </button>
        </div>
      </div>

      <!-- Metrics Panel -->
      <div class="bg-[#0A0A16]/80 border border-white/10 p-8 rounded-2xl">
        <div class="text-[#1A6FFF] text-xs tracking-[2px] font-mono mb-6">K24 UNIFIED RUN — LIVE METRICS</div>
        
        <div class="grid grid-cols-5 gap-px bg-white/10 mb-8">
          <div class="bg-[#0A0A16] p-4 text-center">
            <div class="text-2xl font-mono font-bold">8/8</div>
            <div class="text-[10px] text-white/40 mt-1 tracking-wider">ACTIVE MODULES</div>
          </div>
          <div class="bg-[#0A0A16] p-4 text-center">
            <div class="text-2xl font-mono font-bold">32</div>
            <div class="text-[10px] text-white/40 mt-1 tracking-wider">TELEMETRY DOMAINS</div>
          </div>
          <div class="bg-[#0A0A16] p-4 text-center">
            <div class="text-2xl font-mono font-bold">24,606</div>
            <div class="text-[10px] text-white/40 mt-1 tracking-wider">RECORDS PROCESSED</div>
          </div>
          <div class="bg-[#0A0A16] p-4 text-center">
            <div class="text-2xl font-mono font-bold">196,848</div>
            <div class="text-[10px] text-white/40 mt-1 tracking-wider">MODULE ROWS</div>
          </div>
          <div class="bg-[#0A0A16] p-4 text-center">
            <div class="text-2xl font-mono font-bold text-[#00C8FF]">PASS</div>
            <div class="text-[10px] text-white/40 mt-1 tracking-wider">VALIDATION STATUS</div>
          </div>
        </div>

        <div class="space-y-2 text-sm">
          <div class="flex justify-between py-1 border-b border-white/10">
            <span class="text-white/40 text-xs">RUN ID</span>
            <span class="font-mono text-xs">CNS_K24_UNIFIED_32_DOMAIN</span>
          </div>
          <div class="flex justify-between py-1 border-b border-white/10">
            <span class="text-white/40 text-xs">MERKLE ROOT</span>
            <span class="font-mono text-xs">3a3f1ef7512b...</span>
          </div>
          <div class="flex justify-between py-1 border-b border-white/10">
            <span class="text-white/40 text-xs">FTTI</span>
            <span class="font-mono text-xs">0.16</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- What is CNS -->
  <section id="ecosystem" class="relative z-10 bg-[#0A0A16]/70 border-t border-white/10">
    <div class="max-w-screen-2xl mx-auto px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
        <div>
          <div class="text-[#1A6FFF] text-xs tracking-[3px] font-mono mb-3">WHAT IS CNS</div>
          <h2 class="section-title leading-none tracking-tighter mb-6">Not monitoring.<br>Not prediction.<br>Causal governance.</h2>
          
          <p class="text-white/70 max-w-md">
            CNS is a sovereign deterministic causal ecosystem for critical environments where operational decisions, evidence, continuity, and system trust must be structured, bounded, verifiable, and reviewable.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="bg-white/5 border border-white/10 p-6">
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-2">DETERMINISTIC</div>
            <p class="text-sm text-white/70">Same input, same state, same output. Always verifiable by any third party.</p>
          </div>
          <div class="bg-white/5 border border-white/10 p-6">
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-2">SOVEREIGN</div>
            <p class="text-sm text-white/70">Operates locally, air-gapped or embedded. No cloud dependency.</p>
          </div>
          <div class="bg-white/5 border border-white/10 p-6">
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-2">FALSIFIABLE</div>
            <p class="text-sm text-white/70">Every run produces SHA-256, Merkle root and sealed evidence package.</p>
          </div>
          <div class="bg-white/5 border border-white/10 p-6">
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-2">TRACEABLE</div>
            <p class="text-sm text-white/70">Full authority chain from signal to final runtime decision.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modules Section -->
  <section id="modules" class="relative z-10 bg-[#0A0A16]/60 border-t border-white/10">
    <div class="max-w-screen-2xl mx-auto px-8 py-20">
      <div class="flex justify-between items-end mb-10">
        <div>
          <div class="text-[#1A6FFF] text-xs tracking-[3px] font-mono mb-2">MODULE ECOSYSTEM</div>
          <h2 class="section-title">Every module.<br>One sovereign platform.</h2>
        </div>
        <p class="max-w-sm text-white/60 text-sm hidden lg:block">
          Each module can be deployed independently or as part of the full CNS ecosystem.
        </p>
      </div>

      <!-- Module Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2" id="module-grid">
        <!-- Populated by JavaScript -->
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-6 px-8 text-xs text-white/40 flex justify-between items-center">
    <div>© 2026 Causal Nexus Systems LLC — Public layer only</div>
    <div>CNS K24 • 32 Domains • Validation PASS</div>
  </footer>

  <!-- Module Modal -->
  <div id="modal" class="hidden fixed inset-0 z-[500] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
    <div onclick="event.target.id === 'modal' && closeModal()" class="absolute inset-0"></div>
    
    <div class="relative bg-[#07070F] border border-white/20 w-full max-w-[1100px] max-h-[92vh] overflow-auto grid grid-cols-1 lg:grid-cols-5">
      
      <!-- Image -->
      <div class="lg:col-span-2 bg-[#03030A]">
        <img id="modal-image" class="w-full h-full object-cover min-h-[420px]" alt="">
      </div>
      
      <!-- Content -->
      <div class="lg:col-span-3 p-9">
        <button onclick="closeModal()" class="float-right text-3xl leading-none text-white/60 hover:text-white">×</button>
        
        <div id="modal-acronym" class="text-5xl font-bold tracking-tighter"></div>
        <div id="modal-fullname" class="text-white/50 text-sm tracking-[1.5px] mt-1"></div>
        
        <div class="mt-8 space-y-7 text-sm">
          <div>
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-1.5">DEFINITION</div>
            <p id="modal-definition" class="text-white/80 leading-relaxed"></p>
          </div>
          
          <div>
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-1.5">INDEPENDENT USE</div>
            <p id="modal-independent" class="text-white/80 leading-relaxed"></p>
          </div>
          
          <div>
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-1.5">INSIDE CNS ECOSYSTEM</div>
            <p id="modal-ecosystem" class="text-white/80 leading-relaxed"></p>
          </div>
          
          <div>
            <div class="text-[#1A6FFF] text-xs tracking-widest font-mono mb-3">APPLICABLE AREAS</div>
            <div id="modal-areas" class="flex flex-wrap gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Tailwind script
    function initializeTailwind() {
      document.documentElement.style.setProperty('--accent', '#1A6FFF');
    }

    // Module data
    const modules = [
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
        areas: ["Command Authority", "Mission Governance", "Defense Operations", "Critical Infrastructure"]
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
        areas: ["Strategic Decision Systems", "Mission Planning", "Critical Infrastructure", "Adaptive Risk Management"]
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
        areas: ["Edge Devices", "Drones", "Robotics", "Autonomous Systems", "Embedded Platforms"]
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
        areas: ["Sensor Fusion", "Aerospace Systems", "Energy Systems", "Cyber-Physical", "Situational Awareness"]
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
        areas: ["System Safety", "Critical Infrastructure Resilience", "Real-Time Risk Governance", "Industrial Process Control"]
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
        areas: ["Physical Control Systems", "Aerospace", "Energy Infrastructure", "Industrial Automation", "Robotics"]
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
        areas: ["Secure Compute Environments", "Mission Systems", "Industrial Control", "Embedded Protection", "Sovereign Infrastructure"]
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
        areas: ["Audit Systems", "Evidence Packaging", "Verification Workflows", "Institutional Review", "Compliance"]
      }
    ];

    // Render module cards
    function renderModules() {
      const container = document.getElementById('module-grid');
      container.innerHTML = '';

      modules.forEach(mod => {
        const card = document.createElement('button');
        card.className = `eco-card border border-white/10 bg-white/5 text-left overflow-hidden group`;
        
        card.innerHTML = `
          <div class="h-1.5" style="background: ${mod.color}"></div>
          
          <div class="aspect-video bg-[#07070F] overflow-hidden">
            <img src="${mod.imgSrc}" alt="${mod.acronym}" 
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 onerror="this.style.display='none'">
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <div style="color: ${mod.color}" class="font-bold text-xl tracking-tight">${mod.acronym}</div>
              <div class="px-3 py-1 text-[10px] border font-mono tracking-widest" 
                   style="border-color: ${mod.color}; color: ${mod.color}; opacity: 0.7">
                ${mod.badge}
              </div>
            </div>
            
            <div class="text-xs text-white/50 tracking-wider mb-4">${mod.fullName}</div>
            
            <p class="text-sm text-white/70 leading-relaxed line-clamp-3 mb-5">
              ${mod.desc}
            </p>
            
            <div class="text-xs text-white/50 font-mono tracking-widest">OPEN MODULE BRIEF →</div>
          </div>
        `;
        
        card.onclick = () => openModal(mod);
        container.appendChild(card);
      });
    }

    // Open modal
    function openModal(module) {
      const modal = document.getElementById('modal');
      
      document.getElementById('modal-image').src = module.imgSrc;
      document.getElementById('modal-acronym').innerHTML = module.acronym;
      document.getElementById('modal-acronym').style.color = module.color;
      document.getElementById('modal-fullname').innerHTML = module.fullName;
      document.getElementById('modal-definition').innerHTML = module.definition;
      document.getElementById('modal-independent').innerHTML = module.independentUse;
      document.getElementById('modal-ecosystem').innerHTML = module.ecosystemUse;

      // Areas
      const areasContainer = document.getElementById('modal-areas');
      areasContainer.innerHTML = '';
      module.areas.forEach(area => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 text-xs border border-white/20 text-white/70';
        span.textContent = area;
        areasContainer.appendChild(span);
      });

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeModal() {
      const modal = document.getElementById('modal');
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }

    // Smooth scroll
    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Initialize everything
    function init() {
      initializeTailwind();
      renderModules();
      
      // Close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
          const modal = document.getElementById('modal');
          if (!modal.classList.contains('hidden')) {
            closeModal();
          }
        }
      });
      
      // Optional: Close modal when clicking outside content
      console.log('%c[CNS] HTML version initialized successfully', 'color:#4D94FF');
    }

    // Boot app
    window.onload = init;
  </script>
</body>
</html>
