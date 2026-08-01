export default function EngineArchitectureDiagram() {
  return (
    <div className="relative mx-auto mt-8 w-full max-w-6xl rounded-xl border border-white/10 bg-base-950 p-6 shadow-glow-cobalt">
      <svg viewBox="0 0 1000 400" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7f00ff" />
            <stop offset="100%" stopColor="#e100ff" />
          </linearGradient>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a233a" />
            <stop offset="100%" stopColor="#0f1626" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(30, 40)">
          <text x="0" y="0" fill="#f0f4f8" fontSize="20" fontWeight="700" letterSpacing="1">
            LATENTSCHEMA™ SLM ARCHITECTURE
          </text>
          <text x="0" y="22" fill="#8a99ad" fontSize="12">
            Optimized On-Device &amp; Compressed Language Model Pipeline
          </text>

          <g transform="translate(780, -15)">
            <rect x="0" y="0" width="160" height="36" rx="6" fill="#151c2e" stroke="#2a3656" />
            <circle cx="20" cy="18" r="6" fill="url(#primaryGrad)" className="engine-diagram-pulse" />
            <text x="34" y="22" fill="#ffffff" fontSize="12" fontWeight="600">
              Latent Schema
            </text>
          </g>
        </g>

        <path d="M 140 220 L 190 220" stroke="#4facfe" strokeWidth="2" className="engine-diagram-flow" />
        <path d="M 310 220 L 360 220" stroke="#4facfe" strokeWidth="2" className="engine-diagram-flow" />
        <path d="M 620 220 L 670 220" stroke="#00f2fe" strokeWidth="2" className="engine-diagram-flow" />
        <path d="M 820 220 L 860 220" stroke="#00e676" strokeWidth="2" className="engine-diagram-flow" />

        <g className="engine-diagram-node" transform="translate(30, 130)">
          <rect x="0" y="0" width="110" height="180" rx="8" fill="url(#cardGrad)" stroke="#2a3656" strokeWidth="1.5" />
          <text x="55" y="30" fill="#8a99ad" fontSize="11" fontWeight="600" textAnchor="middle">
            1. INPUT
          </text>
          <rect x="12" y="55" width="86" height="30" rx="4" fill="#0f1626" stroke="#2a3656" />
          <text x="55" y="74" fill="#f0f4f8" fontSize="11" textAnchor="middle">
            User Text
          </text>
          <rect x="12" y="100" width="86" height="55" rx="4" fill="#0f1626" stroke="#2a3656" />
          <text x="55" y="122" fill="#8a99ad" fontSize="10" textAnchor="middle">
            Embeddings
          </text>
          <text x="55" y="140" fill="#4facfe" fontSize="10" fontWeight="600" textAnchor="middle">
            + Positional
          </text>
        </g>

        <g className="engine-diagram-node" transform="translate(190, 130)">
          <rect x="0" y="0" width="120" height="180" rx="8" fill="url(#cardGrad)" stroke="#2a3656" strokeWidth="1.5" />
          <text x="60" y="30" fill="#8a99ad" fontSize="11" fontWeight="600" textAnchor="middle">
            2. TOKENIZER
          </text>
          <circle cx="60" cy="85" r="28" fill="#151c2e" stroke="#4facfe" strokeWidth="2" className="engine-diagram-pulse" />
          <text x="60" y="89" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
            BPE / Subword
          </text>
          <text x="60" y="140" fill="#8a99ad" fontSize="10" textAnchor="middle">
            Vocabulary Map
          </text>
        </g>

        <g className="engine-diagram-node" transform="translate(360, 100)">
          <rect
            x="0"
            y="0"
            width="260"
            height="240"
            rx="10"
            fill="url(#cardGrad)"
            stroke="#00f2fe"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <rect x="10" y="10" width="240" height="220" rx="8" fill="none" stroke="#2a3656" strokeDasharray="4 4" />

          <text x="130" y="32" fill="#00f2fe" fontSize="12" fontWeight="700" textAnchor="middle">
            SLM TRANSFORMER BLOCK
          </text>
          <text x="130" y="48" fill="#8a99ad" fontSize="9" textAnchor="middle">
            (Reduced Layers: N = 6 to 12)
          </text>

          <rect x="25" y="65" width="210" height="45" rx="6" fill="#151c2e" stroke="#4facfe" />
          <text x="130" y="85" fill="#f0f4f8" fontSize="11" fontWeight="600" textAnchor="middle">
            Grouped-Query Attention (GQA)
          </text>
          <text x="130" y="98" fill="#8a99ad" fontSize="9" textAnchor="middle">
            Optimized KV-Cache Memory
          </text>

          <rect x="25" y="125" width="210" height="45" rx="6" fill="#151c2e" stroke="#4facfe" />
          <text x="130" y="145" fill="#f0f4f8" fontSize="11" fontWeight="600" textAnchor="middle">
            Compressed Feed-Forward (FFN)
          </text>
          <text x="130" y="158" fill="#8a99ad" fontSize="9" textAnchor="middle">
            SwiGLU / Swish Activation
          </text>

          <rect x="25" y="180" width="210" height="30" rx="4" fill="#0f1626" stroke="#2a3656" />
          <text x="130" y="199" fill="#00e676" fontSize="10" fontWeight="600" textAnchor="middle">
            RMSNorm &amp; Residual Connections
          </text>
        </g>

        <g className="engine-diagram-node" transform="translate(670, 110)">
          <rect x="0" y="0" width="150" height="220" rx="8" fill="url(#cardGrad)" stroke="#7f00ff" strokeWidth="1.5" />
          <text x="75" y="28" fill="#e100ff" fontSize="11" fontWeight="700" textAnchor="middle">
            LS OPTIMIZATION
          </text>

          <rect x="12" y="45" width="126" height="42" rx="4" fill="#151c2e" stroke="#2a3656" />
          <text x="63" y="62" fill="#f0f4f8" fontSize="10" fontWeight="600" textAnchor="middle">
            Distillation
          </text>
          <text x="63" y="76" fill="#8a99ad" fontSize="8" textAnchor="middle">
            Teacher → Student
          </text>

          <rect x="12" y="98" width="126" height="42" rx="4" fill="#151c2e" stroke="#2a3656" />
          <text x="63" y="115" fill="#f0f4f8" fontSize="10" fontWeight="600" textAnchor="middle">
            Quantization
          </text>
          <text x="63" y="129" fill="#00f2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
            INT4 / INT8 Precision
          </text>

          <rect x="12" y="151" width="126" height="42" rx="4" fill="#151c2e" stroke="#2a3656" />
          <text x="63" y="168" fill="#f0f4f8" fontSize="10" fontWeight="600" textAnchor="middle">
            Structured Pruning
          </text>
          <text x="63" y="182" fill="#8a99ad" fontSize="8" textAnchor="middle">
            Sparsity Enforced
          </text>
        </g>

        <g className="engine-diagram-node" transform="translate(860, 130)">
          <rect x="0" y="0" width="110" height="180" rx="8" fill="url(#cardGrad)" stroke="#00e676" strokeWidth="1.5" />
          <text x="55" y="30" fill="#00e676" fontSize="11" fontWeight="700" textAnchor="middle">
            4. DEPLOYMENT
          </text>

          <circle cx="55" cy="75" r="20" fill="#151c2e" stroke="#00e676" strokeWidth="1.5" className="engine-diagram-pulse" />
          <text x="55" y="79" fill="#ffffff" fontSize="14" textAnchor="middle">
            ⚡
          </text>

          <text x="55" y="118" fill="#f0f4f8" fontSize="10" fontWeight="600" textAnchor="middle">
            On-Device AI
          </text>
          <text x="55" y="134" fill="#8a99ad" fontSize="9" textAnchor="middle">
            Low Latency
          </text>
          <text x="55" y="148" fill="#8a99ad" fontSize="9" textAnchor="middle">
            Edge Executable
          </text>
        </g>

        <g transform="translate(30, 360)">
          <line x1="0" y1="0" x2="940" y2="0" stroke="#2a3656" strokeWidth="1" />
          <text x="0" y="20" fill="#8a99ad" fontSize="10">
            © LatentSchema. All rights reserved. Confidential &amp; Proprietary Architectural Specification.
          </text>
          <text x="940" y="20" fill="#4facfe" fontSize="10" textAnchor="end">
            https://latentschema.com
          </text>
        </g>
      </svg>
    </div>
  )
}
