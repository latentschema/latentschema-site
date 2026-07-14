import { useState, useEffect, useRef, useMemo } from "react";
import {
  Play, Pause, RotateCcw, CreditCard, Calculator, Package,
  Table, Receipt, Brain, BarChart3, TrendingUp,
  Sparkles, ChefHat, Truck, ArrowRight, Volume2, VolumeX
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Timeline configuration — 90 seconds, 5 scenes                      */
/* ------------------------------------------------------------------ */

const DURATION = 90;

const SCENES = [
  { id: 1, label: "The Challenge", start: 0, end: 15 },
  { id: 2, label: "Introducing fnbPulse", start: 15, end: 30 },
  { id: 3, label: "The Intelligence Engine", start: 30, end: 50 },
  { id: 4, label: "AI in Action", start: 50, end: 70 },
  { id: 5, label: "The Vision", start: 70, end: 90 },
];

const CAPTIONS = [
  { s: 0.5, e: 5, t: "Every restaurant generates thousands of data points every day — from sales and inventory to supplier invoices and accounting." },
  { s: 5, e: 10, t: "But this information is scattered across multiple systems, making it difficult to understand what's really happening." },
  { s: 10, e: 15, t: "The result? Rising costs, hidden waste, shrinking margins — and decisions based on incomplete information." },
  { s: 15, e: 19, t: "fnbPulse changes that." },
  { s: 19, e: 25, t: "It connects your existing systems — including POS and Accounting systems like Clover and Xero — into one intelligent view of your business." },
  { s: 25, e: 30, t: "No replacing software. No complicated setup. Just smarter use of the data you already have." },
  { s: 30, e: 37, t: "Our Intelligence Engine combines operational and financial data into a single source of truth." },
  { s: 37, e: 44, t: "It continuously analyses sales, food costs, supplier pricing, inventory performance and profitability using advanced analytics and AI." },
  { s: 44, e: 50, t: "Instead of just showing reports, it identifies opportunities and recommends actions." },
  { s: 50, e: 55, t: "Rather than asking, \u201CWhat happened?\u201D" },
  { s: 55, e: 60, t: "\u2026restaurant owners can now ask, \u201CWhat should I do next?\u201D" },
  { s: 60, e: 70, t: "From identifying profit leaks to reducing waste and optimising menus, fnbPulse turns data into practical decisions every day." },
  { s: 70, e: 76, t: "Our vision is simple: to become the AI intelligence platform for restaurants worldwide." },
  { s: 76, e: 82, t: "Helping operators reduce waste, increase profitability, and make smarter decisions every day." },
  { s: 82, e: 90, t: "fnbPulse. Turn restaurant data into higher profits." },
];

/* ---------------- helpers ---------------- */

const clamp01 = (v) => Math.max(0, Math.min(1, v));
// staged progress: 0→1 between local times a..b (seconds within scene)
const stage = (local, a, b) => clamp01((local - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a, b, k) => a + (b - a) * k;

const NAVY = "#0F172A";
const NAVY_DEEP = "#0B1120";
const CARD = "#F1F5F9";
const EMERALD = "#10B981";
const EMERALD_LT = "#34D399";
const RED = "#F87171";
const SLATE = "#94A3B8";

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function IconChip({ icon: Icon, label, style, jitter, dim }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 12,
        background: dim ? "rgba(241,245,249,0.9)" : CARD,
        color: NAVY,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: "nowrap",
        animation: jitter ? "fp-jitter 0.9s ease-in-out infinite" : "none",
        ...style,
      }}
    >
      <Icon size={16} strokeWidth={2} color={NAVY} />
      {label}
    </div>
  );
}

/* Bespoke crossed knife & fork mark — realistic filled silhouettes.
   ring=true encloses the cutlery in a thin circle (classic dining emblem). */
function LogoMark({ size = 20, color = "#fff", ring = false }) {
  const k = ring ? 1.0 : 1.16; // cutlery scale within the viewBox
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ring && <circle cx="12" cy="12" r="11.5" stroke={color} strokeWidth="0.8" fill="none" />}
      <g transform={`translate(12 12) scale(${k}) translate(-12 -12)`}>
        {/* fork */}
        <g transform="rotate(-35 12 12)" fill={color}>
          <rect x="10.0" y="2.7" width="0.78" height="4.5" rx="0.39" />
          <rect x="11.19" y="2.7" width="0.78" height="4.7" rx="0.39" />
          <rect x="12.38" y="2.7" width="0.78" height="4.7" rx="0.39" />
          <rect x="13.57" y="2.7" width="0.78" height="4.5" rx="0.39" />
          <path d="M10.0 6.6 H14.35 C14.52 8.2 13.35 9.25 12.72 9.78 C12.56 9.92 12.48 10.1 12.48 10.32 V11.1 H11.87 V10.32 C11.87 10.1 11.79 9.92 11.63 9.78 C11.0 9.25 9.83 8.2 10.0 6.6 Z" />
          <path d="M11.9 10.9 H12.45 C12.6 13.4 12.92 16.4 12.92 18.9 A0.74 0.74 0 0 1 11.44 18.9 C11.44 16.4 11.75 13.4 11.9 10.9 Z" />
        </g>
        {/* knife */}
        <g transform="rotate(35 12 12)" fill={color}>
          <path d="M12.6 2.6 C10.5 4.6 9.8 8.1 11.25 11.0 L12.6 11.0 Z" />
          <rect x="11.35" y="11.3" width="1.28" height="10.0" rx="0.64" />
        </g>
      </g>
    </svg>
  );
}

/* Green logo badge: rounded square, or circular disc for the emblem style */
function LogoBadge({ variant, mark, pad, radius, shadow }) {
  const circle = variant === "circle";
  return (
    <span style={{
      display: "inline-flex",
      padding: pad,
      borderRadius: circle ? "50%" : radius,
      background: `linear-gradient(135deg, ${EMERALD}, #059669)`,
      boxShadow: shadow,
    }}>
      <LogoMark size={mark} color="#fff" ring={circle} />
    </span>
  );
}

function Brand({ base, pulse = true }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch" }}>
      <span>
        <span style={{ fontStyle: "italic", fontWeight: 400, color: base }}>fnb</span>
        <span style={{ marginLeft: "0.12em", color: EMERALD }}>Pulse</span>
      </span>
      {pulse && (
        <svg
          viewBox="0 0 100 16" preserveAspectRatio="none"
          style={{ width: "100%", height: "0.24em", marginTop: "-0.36em", display: "block" }}
        >
          <path
            d="M0 8 H37 L39.5 0 L42 8 L44.5 16 L47 8 H100"
            fill="none" stroke={EMERALD} strokeWidth="2.1"
            strokeLinecap="square" strokeLinejoin="miter"
          />
        </svg>
      )}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "5.5%",
        left: "5%",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#ffffff",
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 1 — The Challenge                                            */
/* ------------------------------------------------------------------ */

function Scene1({ local }) {
  const items = [
    { icon: CreditCard, label: "POS", x: 12, y: 31, d: 0.4 },
    { icon: Calculator, label: "Accounting", x: 68, y: 20, d: 0.9 },
    { icon: Package, label: "Inventory", x: 22, y: 62, d: 1.4 },
    { icon: Table, label: "Spreadsheets", x: 62, y: 66, d: 1.9 },
    { icon: Receipt, label: "Supplier invoices", x: 42, y: 40, d: 2.4 },
  ];
  const problems = ["Rising costs", "Hidden waste", "Shrinking margins"];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow>The Challenge</Eyebrow>

      <div
        style={{
          position: "absolute",
          top: "11%",
          left: "5%",
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(18px, 3.2vw, 30px)",
          fontWeight: 700,
          color: "#fff",
          opacity: easeOut(stage(local, 0.2, 1)),
          transform: `translateY(${(1 - easeOut(stage(local, 0.2, 1))) * 14}px)`,
        }}
      >
        Thousands of data points.
        <br />
        <span style={{ color: SLATE }}>Zero connection.</span>
      </div>

      {/* dashed broken links */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          [20, 30, 46, 44], [72, 26, 50, 43], [28, 64, 45, 47], [66, 68, 50, 48],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={RED}
            strokeOpacity={0.4 * stage(local, 6, 8)}
            strokeWidth="0.35"
            strokeDasharray="1.6 2.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {items.map((it, i) => {
        const k = easeOut(stage(local, it.d, it.d + 0.8));
        return (
          <IconChip
            key={i}
            icon={it.icon}
            label={it.label}
            jitter={local > 5.5}
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              opacity: k,
              transform: `scale(${lerp(0.7, 1, k)})`,
            }}
          />
        );
      })}

      <div style={{ position: "absolute", left: "50%", bottom: "9%", transform: "translateX(-50%)", display: "flex", gap: 10 }}>
        {problems.map((p, i) => {
          const k = easeOut(stage(local, 10.5 + i * 0.6, 11.3 + i * 0.6));
          return (
            <div
              key={p}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: `1px solid ${RED}`,
                color: RED,
                fontSize: 12,
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "nowrap",
                background: "rgba(248,113,113,0.08)",
                opacity: k,
                transform: `translateY(${(1 - k) * 10}px)`,
              }}
            >
              {p}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 2 — Introducing fnbPulse                                     */
/* ------------------------------------------------------------------ */

function Scene2({ local, logoVariant }) {
  const converge = easeInOut(stage(local, 1.2, 4.5));
  const hubK = easeOut(stage(local, 0.2, 1.2));
  const cx = 50, cy = 46, ring = 30;

  const items = [
    { icon: CreditCard, label: "Clover POS", ox: 8, oy: 16 },
    { icon: Calculator, label: "Xero Accounting", ox: 78, oy: 14 },
    { icon: Package, label: "Inventory", ox: 6, oy: 72 },
    { icon: Table, label: "Spreadsheets", ox: 80, oy: 74 },
    { icon: Receipt, label: "Suppliers", ox: 44, oy: 84 },
  ];

  const chips = ["No replacing software", "No complicated setup", "Your data, made smarter"];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow>Introducing <span style={{ textTransform: "none" }}>fnbPulse</span></Eyebrow>

      {/* connection lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {items.map((it, i) => {
          const ang = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const tx = cx + Math.cos(ang) * ring;
          const ty = cy + Math.sin(ang) * ring * 0.96;
          const k = stage(local, 4.2, 6);
          return (
            <line
              key={i}
              x1={lerp(it.ox + 6, tx, converge)} y1={lerp(it.oy + 3, ty, converge)}
              x2={cx} y2={cy}
              stroke={EMERALD}
              strokeWidth="0.45"
              vectorEffect="non-scaling-stroke"
              strokeOpacity={0.7 * k}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - k}
            />
          );
        })}
      </svg>

      {items.map((it, i) => {
        const ang = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const tx = cx + Math.cos(ang) * ring;
        const ty = cy + Math.sin(ang) * ring * 0.96;
        return (
          <IconChip
            key={i}
            icon={it.icon}
            label={it.label}
            style={{
              left: `${lerp(it.ox, tx - 6, converge)}%`,
              top: `${lerp(it.oy, ty - 3, converge)}%`,
              opacity: 1,
              transition: "none",
            }}
          />
        );
      })}

      {/* hub */}
      <div
        style={{
          position: "absolute",
          left: `${cx}%`,
          top: `${cy}%`,
          transform: `translate(-50%,-50%) scale(${lerp(0.6, 1, hubK)})`,
          opacity: hubK,
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div style={{
            position: "absolute", inset: -18, borderRadius: 28,
            border: `1px solid ${EMERALD}`, opacity: 0.5,
            animation: "fp-pulse 2.2s ease-out infinite",
          }} />
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 24px", borderRadius: 18,
            background: "#fff",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700, fontSize: "clamp(16px, 2.4vw, 24px)",
            boxShadow: "0 20px 50px rgba(16,185,129,0.35)",
          }}>
            <LogoBadge variant={logoVariant} mark={32} pad={6} radius={11} />
            <Brand base={NAVY} />
          </div>
        </div>
        <div style={{ marginTop: 12, color: SLATE, fontSize: 13, opacity: stage(local, 5, 6.5) }}>
          One intelligent view of your business
        </div>
      </div>

      <div style={{ position: "absolute", left: "50%", bottom: "7%", transform: "translateX(-50%)", display: "flex", gap: 10 }}>
        {chips.map((c, i) => {
          const k = easeOut(stage(local, 10 + i * 0.7, 10.8 + i * 0.7));
          return (
            <div key={c} style={{
              padding: "8px 14px", borderRadius: 999,
              border: `1px solid rgba(52,211,153,0.5)`, color: EMERALD_LT,
              background: "rgba(16,185,129,0.08)", fontSize: 12, fontWeight: 600,
              opacity: k, transform: `translateY(${(1 - k) * 10}px)`, whiteSpace: "nowrap",
            }}>
              {c}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 3 — The Intelligence Engine                                  */
/* ------------------------------------------------------------------ */

function Scene3({ local, t }) {
  const sources = [
    { icon: CreditCard, label: "Clover" },
    { icon: Calculator, label: "Xero" },
    { icon: Package, label: "Inventory" },
    { icon: ChefHat, label: "Recipes" },
    { icon: Truck, label: "Supplier costs" },
  ];
  const outputs = [
    { icon: BarChart3, label: "Live dashboards" },
    { icon: Sparkles, label: "AI recommendations" },
  ];
  const engineK = easeOut(stage(local, 1.5, 2.8));
  const outK = stage(local, 12, 14);

  // geometry (viewBox 100x100)
  const srcX = 22, engX = 50, engY = 50, outX = 78;
  const srcYs = [18, 34, 50, 66, 82];
  const outYs = [38, 62];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow>The Intelligence Engine</Eyebrow>

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* source → engine paths + flowing dots */}
        {srcYs.map((y, i) => {
          const drawK = stage(local, 0.5 + i * 0.3, 1.5 + i * 0.3);
          const dots = [0, 0.33, 0.66];
          return (
            <g key={i}>
              <path
                d={`M ${srcX} ${y} C ${srcX + 12} ${y}, ${engX - 14} ${engY}, ${engX - 8} ${engY}`}
                fill="none" stroke={EMERALD} strokeOpacity={0.35 * drawK}
                strokeWidth="0.4" vectorEffect="non-scaling-stroke"
                pathLength="1" strokeDasharray="1" strokeDashoffset={1 - drawK}
              />
              {local > 2.5 && dots.map((off, j) => {
                const k = ((t * 0.35 + off + i * 0.13) % 1);
                // cubic bezier interpolation
                const p0 = [srcX, y], p1 = [srcX + 12, y], p2 = [engX - 14, engY], p3 = [engX - 8, engY];
                const u = 1 - k;
                const bx = u*u*u*p0[0] + 3*u*u*k*p1[0] + 3*u*k*k*p2[0] + k*k*k*p3[0];
                const by = u*u*u*p0[1] + 3*u*u*k*p1[1] + 3*u*k*k*p2[1] + k*k*k*p3[1];
                return <circle key={j} cx={bx} cy={by} r="0.55" fill={EMERALD_LT} opacity={0.9} />;
              })}
            </g>
          );
        })}
        {/* engine → outputs */}
        {outYs.map((y, i) => (
          <g key={`o${i}`}>
            <path
              d={`M ${engX + 8} ${engY} C ${engX + 16} ${engY}, ${outX - 12} ${y}, ${outX - 6} ${y}`}
              fill="none" stroke={EMERALD} strokeOpacity={0.5 * outK}
              strokeWidth="0.45" vectorEffect="non-scaling-stroke"
              pathLength="1" strokeDasharray="1" strokeDashoffset={1 - outK}
            />
          </g>
        ))}
      </svg>

      {/* source labels */}
      {sources.map((s, i) => {
        const k = easeOut(stage(local, 0.3 + i * 0.3, 1.1 + i * 0.3));
        return (
          <IconChip
            key={s.label}
            icon={s.icon}
            label={s.label}
            style={{
              left: "5%",
              top: `${srcYs[i] - 3.5}%`,
              opacity: k,
              transform: `translateX(${(1 - k) * -16}px)`,
            }}
          />
        );
      })}

      {/* engine */}
      <div
        style={{
          position: "absolute", left: "50%", top: "50%",
          transform: `translate(-50%,-50%) scale(${lerp(0.7, 1, engineK)})`,
          opacity: engineK, textAlign: "center",
        }}
      >
        <div style={{
          padding: "20px 22px", borderRadius: 20,
          background: NAVY_DEEP,
          border: `1px solid rgba(52,211,153,0.6)`,
          boxShadow: `0 0 ${lerp(20, 44, 0.5 + 0.5 * Math.sin(t * 2))}px rgba(16,185,129,0.28)`,
          color: "#fff", width: "min(24vw, 210px)",
        }}>
          <Brain size={30} color={EMERALD_LT} style={{ animation: "fp-breathe 2.4s ease-in-out infinite" }} />
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, marginTop: 8, fontSize: "clamp(12px, 1.6vw, 16px)" }}>
            Intelligence Engine
          </div>
          <div style={{ color: SLATE, fontSize: 11, marginTop: 4, opacity: stage(local, 4, 6) }}>
            One source of truth
          </div>
        </div>
      </div>

      {/* outputs */}
      {outputs.map((o, i) => {
        const k = easeOut(stage(local, 13 + i * 0.6, 14 + i * 0.6));
        return (
          <div key={o.label} style={{
            position: "absolute", left: "73%", top: `${outYs[i] - 4.5}%`,
            display: "flex", alignItems: "center", gap: 8,
            padding: "11px 15px", borderRadius: 12,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(52,211,153,0.5)",
            color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
            opacity: k, transform: `translateX(${(1 - k) * 16}px)`,
          }}>
            <o.icon size={16} color={EMERALD_LT} />
            {o.label}
          </div>
        );
      })}

      {/* analysed dimensions ticker */}
      <div style={{
        position: "absolute", left: "64%", bottom: "7%", transform: "translateX(-50%)",
        display: "flex", gap: 8, opacity: stage(local, 7, 8.5),
      }}>
        {["Sales", "Food costs", "Supplier pricing", "Inventory", "Profitability"].map((d, i) => (
          <span key={d} style={{
            fontSize: 11, color: EMERALD, fontWeight: 700, padding: "6px 10px",
            textAlign: "center", whiteSpace: "nowrap",
            border: "1px solid rgba(148,163,184,0.3)", borderRadius: 999,
            opacity: stage(local, 7 + i * 0.4, 7.7 + i * 0.4),
          }}>{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 4 — AI in Action                                             */
/* ------------------------------------------------------------------ */

function Scene4({ local, logoVariant }) {
  const cardK = easeOut(stage(local, 0.3, 1.4));
  const score = Math.round(84 * easeOut(stage(local, 1.5, 4)));
  const insight = "Chicken costs increased 14%. Review supplier pricing or increase menu price by \u00A30.50.";
  const typeK = stage(local, 5, 10.5);
  const typed = insight.slice(0, Math.floor(insight.length * typeK));
  const profit = Math.round(8600 * easeOut(stage(local, 11, 14)));
  const R = 34, C = 2 * Math.PI * R;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Eyebrow>AI in Action</Eyebrow>

      <div style={{
        position: "absolute", left: "50%", top: "52%",
        transform: `translate(-50%,-50%) translateY(${(1 - cardK) * 30}px)`,
        opacity: cardK, width: "min(86%, 720px)",
      }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "clamp(16px,3vw,28px)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)", color: NAVY,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <LogoMark size={22} color={EMERALD} ring={logoVariant === "circle"} />
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14 }}><Brand base={NAVY} /></span>
            <span style={{ color: "#64748B", fontSize: 12 }}>· Daily briefing</span>
          </div>

          <div style={{ display: "flex", gap: "clamp(12px,2.5vw,24px)", alignItems: "stretch", flexWrap: "wrap" }}>
            {/* health score ring */}
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <svg width="104" height="104" viewBox="0 0 104 104">
                <circle cx="52" cy="52" r={R} fill="none" stroke="#E2E8F0" strokeWidth="9" />
                <circle
                  cx="52" cy="52" r={R} fill="none" stroke={EMERALD} strokeWidth="9"
                  strokeLinecap="round" strokeDasharray={C}
                  strokeDashoffset={C * (1 - score / 100)}
                  transform="rotate(-90 52 52)"
                />
                <text x="52" y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill={NAVY} fontFamily="'Sora',sans-serif">{score}</text>
                <text x="52" y="66" textAnchor="middle" fontSize="9" fill="#64748B">/ 100</text>
              </svg>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Restaurant Health
              </div>
            </div>

            {/* AI insight */}
            <div style={{
              flex: 1, minWidth: 220, background: "#F8FAFC", borderRadius: 14,
              padding: 16, border: "1px solid #E2E8F0", display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Sparkles size={14} color={EMERALD} />
                <span style={{ fontSize: 11, fontWeight: 700, color: EMERALD, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI insight</span>
              </div>
              <div style={{ fontSize: "clamp(13px,1.8vw,15px)", lineHeight: 1.5, color: "#1E293B", minHeight: 44 }}>
                {typed}
                {typeK > 0 && typeK < 1 && <span style={{ borderRight: `2px solid ${EMERALD}`, marginLeft: 1 }} />}
              </div>
              <div style={{
                marginTop: "auto", paddingTop: 12, display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 10, flexWrap: "wrap",
                opacity: stage(local, 11, 12.5),
              }}>
                <span style={{ fontSize: 12, color: "#64748B" }}>Potential annual profit improvement</span>
                <span style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20, color: EMERALD,
                }}>
                  <TrendingUp size={18} />
                  +£{profit.toLocaleString("en-GB")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* question flip */}
      <div style={{
        position: "absolute", left: "50%", top: "10%", transform: "translateX(-50%)",
        fontFamily: "'Sora',sans-serif", fontWeight: 700, textAlign: "center",
        fontSize: "clamp(14px,2.2vw,20px)", whiteSpace: "nowrap",
      }}>
        <span style={{ color: SLATE, textDecoration: local > 6 ? "line-through" : "none", opacity: easeOut(stage(local, 0.5, 1.5)) }}>
          “What happened?”
        </span>
        <span style={{ color: EMERALD_LT, marginLeft: 14, opacity: easeOut(stage(local, 6, 7.5)) }}>
          “What should I do next?”
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene 5 — The Vision                                               */
/* ------------------------------------------------------------------ */

/* Abstract dot-matrix world map — original, simplified continent silhouettes
   (hand-approximated shapes, not traced from any existing map artwork),
   rendered as horizontal contour lines instead of dots. */
function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    const hit = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

// Shapes traced programmatically (via contour detection on the landmass
// pixels) from Wikipedia's public-domain "BlankMap-World.svg". Uses the
// raw traced proportions directly — an earlier horizontal correction for
// the video's 16:9 stretch was over-compressing thin features, so it's
// been removed in favor of the true traced widths.
const CONTINENTS = [
  [[46.1,2.3],[32.4,2.5],[25.8,4.6],[26.6,6.2],[23.6,6.8],[24.4,8.3],[14.2,7.7],[14.1,9.7],[12.4,9.8],[12.8,11.5],[10.6,12.6],[11.9,14.8],[9.9,16.0],[15.2,12.6],[16.9,13.8],[17.1,20.6],[15.6,25.7],[17.4,35.5],[17.7,32.8],[19.1,38.6],[25.6,44.6],[24.8,53.7],[28.1,61.2],[28.9,78.6],[31.2,83.7],[32.4,83.5],[31.0,81.4],[31.5,74.2],[34.1,65.5],[36.1,63.4],[37.4,53.4],[33.5,50.0],[30.3,43.2],[27.4,42.3],[24.5,44.5],[24.3,40.6],[23.1,40.0],[23.6,36.6],[20.9,38.0],[21.0,33.1],[24.4,31.1],[25.5,34.3],[25.7,30.3],[28.7,24.6],[32.7,21.5],[31.9,19.5],[33.4,18.8],[33.0,20.5],[34.5,20.8],[33.4,13.1],[32.4,14.2],[31.3,11.8],[33.6,12.3],[35.2,9.5],[33.4,4.6],[37.1,4.8],[36.8,10.8],[38.1,13.2],[39.5,10.0],[43.7,7.5]], // Americas
  [[88.0,10.6],[83.8,7.1],[79.9,8.0],[73.5,4.8],[75.1,6.9],[64.7,2.6],[63.6,2.6],[65.4,4.9],[56.5,9.7],[51.7,7.8],[49.0,12.2],[49.6,16.9],[48.0,18.3],[47.0,13.8],[45.3,16.6],[47.1,18.9],[47.2,22.6],[45.2,23.2],[45.8,28.1],[43.5,32.3],[42.7,42.1],[45.0,47.1],[48.4,45.9],[49.9,48.0],[52.4,71.2],[55.3,69.1],[58.4,59.4],[58.2,52.0],[61.3,42.6],[59.1,42.1],[63.0,38.0],[62.7,34.0],[67.0,36.8],[69.5,46.1],[69.2,40.1],[72.2,36.1],[74.4,41.7],[75.1,47.5],[73.6,46.8],[74.9,51.5],[81.5,56.1],[82.2,54.6],[76.6,53.7],[77.2,51.5],[74.6,42.8],[76.2,44.5],[77.3,42.8],[76.1,37.5],[77.0,36.5],[77.3,38.5],[79.3,34.6],[78.6,25.9],[80.7,29.2],[80.2,24.9],[81.6,19.5],[83.4,26.1],[81.6,29.5],[82.0,31.1],[84.0,28.1],[84.0,22.5],[79.3,16.0],[79.5,13.8],[83.5,12.3],[85.0,18.9],[84.6,13.1],[86.5,11.8],[85.9,10.2]], // Africa + Europe + Asia
  [[86.6,56.6],[85.8,60.6],[85.4,60.6],[84.5,59.4],[84.8,57.4],[83.2,56.9],[82.7,59.1],[82.4,59.1],[82.1,58.5],[81.6,58.9],[81.3,60.0],[80.7,60.5],[80.7,61.1],[80.3,62.0],[78.2,63.5],[77.8,66.2],[78.0,69.8],[77.6,71.1],[78.2,71.5],[78.8,70.8],[79.8,70.8],[80.2,70.2],[81.5,69.4],[82.7,69.7],[83.0,72.2],[83.6,72.0],[83.7,73.2],[84.3,73.8],[84.1,76.8],[84.7,76.5],[85.2,75.2],[84.5,75.2],[84.3,74.0],[84.5,73.5],[85.1,74.0],[85.6,73.2],[86.2,73.1],[87.9,69.2],[88.5,66.0],[88.1,63.9],[87.8,63.5],[87.7,62.5],[87.2,61.7],[87.1,59.1],[86.7,58.6]], // Australia
];

function AbstractWorldMap({ opacity = 1 }) {
  // For each continent, scan row by row and turn each contiguous
  // inside-the-shape run into a single horizontal line segment —
  // this produces a clean line/contour fill instead of a dot grid.
  const segments = [];
  const rowStep = 1.4;   // vertical spacing between lines
  const scan = 0.35;     // horizontal sampling resolution
  for (const poly of CONTINENTS) {
    const minx = Math.min(...poly.map((p) => p[0])), maxx = Math.max(...poly.map((p) => p[0]));
    const miny = Math.min(...poly.map((p) => p[1])), maxy = Math.max(...poly.map((p) => p[1]));
    for (let y = miny; y <= maxy; y += rowStep) {
      let runStart = null;
      let prevInside = false;
      for (let x = minx; x <= maxx + scan; x += scan) {
        const inside = pointInPolygon(x, y, poly);
        if (inside && !prevInside) runStart = x;
        if (!inside && prevInside) segments.push([runStart, x - scan, y]);
        prevInside = inside;
      }
      if (prevInside) segments.push([runStart, maxx, y]);
    }
  }
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
      {CONTINENTS.map((poly, i) => (
        <polygon
          key={`o${i}`}
          points={poly.map((p) => p.join(",")).join(" ")}
          fill="none" stroke="#CBD5E1" strokeWidth="0.7"
          strokeOpacity={0.85 * opacity} vectorEffect="non-scaling-stroke"
        />
      ))}
      {segments.map(([x1, x2, y], i) => (
        <line
          key={i} x1={x1} y1={y} x2={x2} y2={y}
          stroke="#94A3B8" strokeWidth="0.28" strokeOpacity={0.5 * opacity}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* Glossy 3D-style location pin — rounded head with a highlight and a
   soft drop shadow, in the brand's emerald tone. Original artwork. */
function LocationPin({ size = 26 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 26 34" style={{ overflow: "visible" }}>
      <ellipse cx="13" cy="31.5" rx="6" ry="2" fill="#000" opacity="0.35" />
      <path d="M13 33 C13 33 4 21.5 4 13.5 A9 9 0 0 1 22 13.5 C22 21.5 13 33 13 33 Z" fill="#047857" />
      <circle cx="13" cy="13" r="9.4" fill="url(#pinGrad)" />
      <circle cx="13" cy="13" r="9.4" fill="none" stroke="#ECFDF5" strokeOpacity="0.35" strokeWidth="0.6" />
      <ellipse cx="10" cy="9.5" rx="3.4" ry="2.2" fill="#ECFDF5" opacity="0.55" />
      <circle cx="13" cy="13" r="3.4" fill="#064E3B" opacity="0.85" />
      <defs>
        <radialGradient id="pinGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="55%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Scene5({ local, logoVariant }) {
  const pins = [
    ["London", 50, 18], ["Amsterdam", 54, 10], ["Berlin", 62, 12],
    ["Paris", 55, 25], ["Madrid", 45, 31], ["Rome", 62, 29],
    ["New York", 33, 26], ["Toronto", 30, 17], ["San Francisco", 13, 27],
    ["Mumbai", 70, 38], ["Delhi", 71, 32],
    ["Singapore", 76, 49],
    ["Sydney", 88, 70], ["Melbourne", 86, 73],
  ];
  const mapPhase = 1 - stage(local, 9.5, 11.5); // fades out
  const finalK = easeOut(stage(local, 10.5, 12.5));
  const spark = stage(local, 3, 8);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* MAP PHASE */}
      <div style={{ position: "absolute", inset: 0, opacity: mapPhase, pointerEvents: "none" }}>
        <Eyebrow>The Vision</Eyebrow>
        <AbstractWorldMap opacity={easeOut(stage(local, 0, 2))} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {pins.map(([, x, y], i) =>
            pins.slice(i + 1, i + 3).map(([, x2, y2], j) => (
              <line
                key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2}
                stroke={EMERALD} strokeOpacity={0.25 * stage(local, 2.5, 5)}
                strokeWidth="0.3" vectorEffect="non-scaling-stroke"
              />
            ))
          )}
          {/* rising chart */}
          <polyline
            points="14,88 30,84 46,85 62,79 78,74 90,68"
            fill="none" stroke={EMERALD_LT} strokeWidth="0.7"
            vectorEffect="non-scaling-stroke" strokeLinecap="round"
            pathLength="1" strokeDasharray="1" strokeDashoffset={1 - spark}
            opacity={0.9}
          />
        </svg>
        {pins.map(([label, x, y], i) => {
          const k = easeOut(stage(local, 0.4 + i * 0.35, 1 + i * 0.35));
          return (
            <div key={i} style={{
              position: "absolute", left: `${x}%`, top: `${y}%`,
              transform: `translate(-50%,-100%) scale(${k})`, opacity: k,
              textAlign: "center", whiteSpace: "nowrap",
            }}>
              <LocationPin size={24} />
              <div style={{
                marginTop: 2, fontSize: 11, fontWeight: 700, color: "#E2E8F0",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}>
                {label}
              </div>
            </div>
          );
        })}
        <div style={{
          position: "absolute", left: "5%", bottom: "20%",
          color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 700,
          fontSize: "clamp(15px,2.4vw,22px)", opacity: stage(local, 5, 6.5),
        }}>
          The AI intelligence platform<br />
          <span style={{ color: EMERALD_LT }}>for restaurants worldwide.</span>
        </div>
      </div>

      {/* FINAL SCREEN */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        opacity: finalK, transform: `scale(${lerp(0.96, 1, finalK)})`,
        pointerEvents: finalK > 0.5 ? "auto" : "none",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          fontFamily: "'Sora',sans-serif", fontWeight: 800,
          fontSize: "clamp(30px,6vw,52px)", color: "#fff",
        }}>
          <LogoBadge
            variant={logoVariant}
            mark={52}
            pad={9}
            radius={16}
            shadow="0 16px 40px rgba(16,185,129,0.4)"
          />
          <Brand base="#fff" />
        </div>
        <div style={{
          marginTop: 16, color: "#CBD5E1", fontSize: "clamp(14px,2.4vw,20px)",
          opacity: easeOut(stage(local, 12.5, 14)),
        }}>
          Turn restaurant data into higher profits.
        </div>
        <button style={{
          marginTop: 28, padding: "14px 26px", borderRadius: 12, border: "none",
          background: EMERALD, color: "#fff", fontWeight: 700, fontSize: 15,
          cursor: "pointer", boxShadow: "0 14px 36px rgba(16,185,129,0.4)",
          opacity: easeOut(stage(local, 14, 15.5)),
          transform: `translateY(${(1 - easeOut(stage(local, 14, 15.5))) * 12}px)`,
        }}>
          Coming soon!
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Player                                                             */
/* ------------------------------------------------------------------ */

const SCENE_END_HOLD = { 1: 0.7 }; // extra breathing pause before moving into the next scene

export default function FnbPulseExplainer() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [logoVariant] = useState("circle"); // circle emblem locked in
  const [voiceOn, setVoiceOn] = useState(true);
  const [voices, setVoices] = useState([]);
  const [voiceName, setVoiceName] = useState("");
  const lastSpoken = useRef(null);
  const voiceOnRef = useRef(true);
  const utterKeep = useRef([]); // prevents Chrome garbage-collecting live utterances
  const utterEnded = useRef(true); // false while the current line is still being spoken
  const holdRemaining = useRef(0); // seconds the timeline should freeze at a scene boundary
  const raf = useRef(null);
  const last = useRef(null);
  const stageRef = useRef(null);
  const [stageScale, setStageScale] = useState(1);

  // Scenes are laid out for a fixed 720x405 canvas (chip padding, font
  // sizes, etc. are hard-coded px). Rather than let each element try to
  // shrink independently on narrow screens — which breaks overlapping
  // layouts — render at the fixed size and scale the whole canvas down
  // uniformly to match the actual rendered stage width.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const updateScale = () => setStageScale(el.offsetWidth / 720);
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { voiceOnRef.current = voiceOn; }, [voiceOn]);

  useEffect(() => {
    if (!playing) { last.current = null; return; }
    const loop = (now) => {
      if (last.current == null) last.current = now;
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT((prev) => {
        // freeze the timeline during a scene-transition breathing pause
        if (holdRemaining.current > 0) {
          holdRemaining.current = Math.max(0, holdRemaining.current - dt);
          return prev;
        }

        let next = prev + dt;

        // don't let the clock move past the currently-speaking line
        const activeCaption = CAPTIONS.find((c) => prev >= c.s && prev < c.e);
        if (voiceOnRef.current && activeCaption && !utterEnded.current && next >= activeCaption.e) {
          next = Math.max(prev, activeCaption.e - 0.03);
        }

        // add a short pause right as a scene finishes, before the next begins
        const curScene = SCENES.find((s) => prev >= s.start && prev < s.end);
        if (curScene && next >= curScene.end && prev < curScene.end) {
          const pause = SCENE_END_HOLD[curScene.id] || 0;
          if (pause > 0) {
            next = curScene.end;
            holdRemaining.current = pause;
          }
        }

        if (next >= DURATION) { setPlaying(false); return DURATION; }
        return next;
      });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  const scene = SCENES.find((s) => t >= s.start && t < s.end) || SCENES[SCENES.length - 1];
  const local = t - scene.start;
  const caption = CAPTIONS.find((c) => t >= c.s && t < c.e);
  const ended = t >= DURATION;

  /* ---- voiceover (Web Speech API) ---- */
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      const en = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      setVoices(en);
      setVoiceName((prev) => {
        if (prev) return prev;
        const preferred =
          en.find((v) => /Google UK English Female/i.test(v.name)) ||
          en.find((v) => /Female/i.test(v.name) && v.lang === "en-GB") ||
          en.find((v) => v.lang === "en-GB") ||
          en[0];
        return preferred ? preferred.name : "";
      });
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // speak each caption once, when it becomes active.
  // Lines are QUEUED (no cancel) and the timeline itself waits for
  // utterEnded before crossing the caption's end time, so a line is
  // never cut short by the animation moving on.
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    if (!voiceOn || !playing || !caption) return;
    if (lastSpoken.current === caption.s) return;
    lastSpoken.current = caption.s;
    utterEnded.current = false;
    const u = new SpeechSynthesisUtterance(caption.t.replace(/[\u201C\u201D]/g, ""));
    const v = voices.find((x) => x.name === voiceName);
    if (v) u.voice = v;
    u.rate = 1.0;
    u.pitch = 1;
    u.onend = () => { utterEnded.current = true; };
    u.onerror = () => { utterEnded.current = true; };
    utterKeep.current.push(u);
    window.speechSynthesis.speak(u);
  }, [caption, voiceOn, playing, voiceName, voices]);

  // silence speech on user pause, mute, or unmount — but let the closing
  // line finish when the video reaches its natural end
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    if ((!playing && !ended) || !voiceOn) {
      window.speechSynthesis.cancel();
      lastSpoken.current = null;
      utterEnded.current = true;
      holdRemaining.current = 0;
    }
  }, [playing, voiceOn, ended]);

  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  const seekTo = (sec, resume = true) => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    lastSpoken.current = null;
    utterEnded.current = true;
    holdRemaining.current = 0;
    setT(sec);
    if (resume) setPlaying(true);
  };

  const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

  const sceneEl = useMemo(() => {
    switch (scene.id) {
      case 1: return <Scene1 local={local} />;
      case 2: return <Scene2 local={local} logoVariant={logoVariant} />;
      case 3: return <Scene3 local={local} t={t} />;
      case 4: return <Scene4 local={local} logoVariant={logoVariant} />;
      default: return <Scene5 local={local} logoVariant={logoVariant} />;
    }
  }, [scene.id, local, t, logoVariant]);

  return (
    <div className="fp-wrapper" style={{
      width: "100%", background: NAVY_DEEP, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      borderRadius: 20, fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@400;600;700&display=swap');
        @keyframes fp-jitter { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(1.5px,-1px) rotate(0.6deg); } 50% { transform: translate(-1.5px,1px) rotate(-0.6deg); } 75% { transform: translate(1px,1.5px) rotate(0.4deg); } }
        @keyframes fp-pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.35); opacity: 0; } }
        @keyframes fp-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        input[type=range].fp-scrub { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 4px; background: rgba(148,163,184,0.3); outline: none; cursor: pointer; }
        input[type=range].fp-scrub::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: ${EMERALD}; box-shadow: 0 0 0 4px rgba(16,185,129,0.25); }
        input[type=range].fp-scrub::-moz-range-thumb { width: 14px; height: 14px; border: none; border-radius: 50%; background: ${EMERALD}; }
        .fp-wrapper { padding: 8px 4px; }
        .fp-stage, .fp-caption, .fp-controls { width: min(94vw, 720px); }
        @media (min-width: 640px) {
          .fp-wrapper { padding: 24px 16px; }
          .fp-stage, .fp-caption, .fp-controls { width: min(72vw, 720px); }
        }
      `}</style>

      {/* stage */}
      <div
        ref={stageRef}
        className="fp-stage"
        style={{
          position: "relative", aspectRatio: "16/9",
          background: `radial-gradient(1200px 600px at 50% 0%, #14213D 0%, ${NAVY} 55%, ${NAVY_DEEP} 100%)`,
          borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(148,163,184,0.15)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, width: 720, height: 405,
          transform: `scale(${stageScale})`, transformOrigin: "top left",
        }}>
          <div key={scene.id} style={{ position: "absolute", inset: 0, animation: "none" }}>
            {sceneEl}
          </div>

          {/* end / replay overlay */}
          {ended && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "flex-end",
              justifyContent: "center", paddingBottom: "4%", pointerEvents: "none",
            }}>
              <button
                onClick={() => { seekTo(0); }}
                style={{
                  pointerEvents: "auto", display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 999, border: "1px solid rgba(148,163,184,0.4)",
                  background: "rgba(15,23,42,0.8)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              >
                <RotateCcw size={15} /> Replay
              </button>
            </div>
          )}
        </div>
      </div>

      {/* narration caption strip — below the stage so it never covers visuals */}
      <div className="fp-caption" style={{
        marginTop: 12,
        padding: "12px 18px", borderRadius: 12,
        background: "rgba(148,163,184,0.07)",
        border: "1px solid rgba(148,163,184,0.12)",
        minHeight: 68, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div key={caption ? caption.s : "none"} style={{
          color: "#F8FAFC", fontSize: "clamp(15px, 2.1vw, 19px)", lineHeight: 1.5,
          fontWeight: 600, textAlign: "center", maxWidth: 720,
          opacity: caption ? 1 : 0, transition: "opacity 0.4s ease",
        }}>
          {caption ? caption.t : "\u00A0"}
        </div>
      </div>

      {/* controls */}
      <div className="fp-controls" style={{ marginTop: 14 }}>
        <input
          className="fp-scrub" type="range" min={0} max={DURATION} step={0.1}
          value={t}
          onChange={(e) => { seekTo(parseFloat(e.target.value), false); }}
          aria-label="Timeline"
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => { if (ended) { seekTo(0); } else setPlaying(!playing); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: EMERALD, color: "#fff", cursor: "pointer",
              boxShadow: "0 8px 24px rgba(16,185,129,0.35)",
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: 2 }} />}
          </button>
          <button
            onClick={() => { seekTo(0); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34, borderRadius: "50%",
              border: "1px solid rgba(148,163,184,0.35)", background: "transparent",
              color: SLATE, cursor: "pointer",
            }}
            aria-label="Restart"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setVoiceOn((v) => !v)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34, borderRadius: "50%",
              border: `1px solid ${voiceOn ? EMERALD : "rgba(148,163,184,0.35)"}`,
              background: voiceOn ? "rgba(16,185,129,0.12)" : "transparent",
              color: voiceOn ? EMERALD_LT : SLATE, cursor: "pointer",
            }}
            aria-label={voiceOn ? "Mute voiceover" : "Enable voiceover"}
          >
            {voiceOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <span style={{ color: SLATE, fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
            {fmt(t)} / {fmt(DURATION)}
          </span>
        </div>
      </div>
    </div>
  );
}