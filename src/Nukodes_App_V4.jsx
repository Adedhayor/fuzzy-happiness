// =============================================================================
// Nukodes App V4 — iOS 26 Liquid Glass
// Single-file React prototype · 393×852 phone shell
// =============================================================================
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');`;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const DARK = {
  bg:          "#0A0A0A",
  bgSec:       "#141414",
  bgEl:        "#1C1C1E",
  glass:       "rgba(255,255,255,0.06)",
  glassHeavy:  "rgba(255,255,255,0.10)",
  glassBorder: "rgba(255,255,255,0.10)",
  glassCard:   "rgba(255,255,255,0.04)",
  text:        "rgba(255,255,255,0.92)",
  textSec:     "rgba(255,255,255,0.60)",
  textMuted:   "rgba(255,255,255,0.35)",
  accent:      "#0A84FF",
  green:       "#30D158",
  red:         "#FF453A",
  orange:      "#FF9F0A",
  divider:     "rgba(255,255,255,0.06)",
  shadow:      "0 2px 16px rgba(0,0,0,0.06), inset 0 0.5px 0 rgba(255,255,255,0.15)",
  shadowCard:  "0 8px 32px rgba(0,0,0,0.24)",
  shadowFab:   "0 4px 20px rgba(0,0,0,0.35)",
};
const LIGHT = {
  bg:          "#F2F2F7",
  bgSec:       "#FFFFFF",
  bgEl:        "#E5E5EA",
  glass:       "rgba(255,255,255,0.72)",
  glassHeavy:  "rgba(255,255,255,0.88)",
  glassBorder: "rgba(0,0,0,0.06)",
  glassCard:   "rgba(255,255,255,0.55)",
  text:        "rgba(0,0,0,0.92)",
  textSec:     "rgba(0,0,0,0.55)",
  textMuted:   "rgba(0,0,0,0.30)",
  accent:      "#007AFF",
  green:       "#34C759",
  red:         "#FF3B30",
  orange:      "#FF9500",
  divider:     "rgba(0,0,0,0.06)",
  shadow:      "0 2px 12px rgba(0,0,0,0.04), inset 0 0.5px 0 rgba(255,255,255,0.8)",
  shadowCard:  "0 4px 24px rgba(0,0,0,0.08)",
  shadowFab:   "0 4px 20px rgba(0,0,0,0.15)",
};

// Glass style factories
const glassStyle = (T) => ({
  background:          T.glass,
  backdropFilter:      "blur(40px) saturate(180%)",
  WebkitBackdropFilter:"blur(40px) saturate(180%)",
  border:              `0.5px solid ${T.glassBorder}`,
  boxShadow:           T.shadow,
});
const glassHeavyStyle = (T) => ({
  background:          T.glassHeavy,
  backdropFilter:      "blur(50px) saturate(200%)",
  WebkitBackdropFilter:"blur(50px) saturate(200%)",
  border:              `0.5px solid ${T.glassBorder}`,
  boxShadow:           T.shadow,
});

// ─── FORMATTING ───────────────────────────────────────────────────────────────
const naira = (n) => "₦" + Number(n).toLocaleString("en-NG");

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED = {
  sales: [
    { id:"s001", customer:"John Doe",        items:"iPhone 13",         amount:450000,  date:"2026-03-09", status:"paid",    synced:true  },
    { id:"s002", customer:"Sarah Smith",      items:"Samsung A54",       amount:143750,  date:"2026-03-09", status:"sent",    synced:true  },
    { id:"s003", customer:"Amara Praise",     items:"USB-C Hub",         amount:35000,   date:"2026-03-09", status:"pending", synced:false },
    { id:"s004", customer:"Kofi Enterprises", items:"Bulk iPhone 13 ×8", amount:618750,  date:"2026-03-09", status:"overdue", synced:false },
  ],
  expenses: [
    { id:"e001", vendor:"MTN Nigeria",    category:"Utilities",  amount:25000,  date:"2026-03-01", note:"Monthly data bundle",       synced:true  },
    { id:"e002", vendor:"Jumia Business", category:"Supplies",   amount:87500,  date:"2026-03-04", note:"Packaging materials",        synced:true  },
    { id:"e003", vendor:"LAWMA",          category:"Operations", amount:15000,  date:"2026-03-07", note:"Waste management",           synced:false },
    { id:"e004", vendor:"EkoElect",       category:"Utilities",  amount:43200,  date:"2026-03-08", note:"Electricity Q1 installment", synced:false },
  ],
  invoices: [
    { id:"INV-001243", customer:"Sarah Smith",   amount:285000, date:"2026-01-25", dueDate:"2026-02-24", status:"overdue", synced:true  },
    { id:"INV-001244", customer:"TechMarts Ltd", amount:312500, date:"2026-03-01", dueDate:"2026-03-31", status:"sent",    synced:true  },
    { id:"INV-001245", customer:"Amara Praise",  amount:95000,  date:"2026-03-05", dueDate:"2026-04-04", status:"draft",   synced:false },
    { id:"INV-001246", customer:"Kofi Ent.",     amount:618750, date:"2026-03-08", dueDate:"2026-04-07", status:"paid",    synced:false },
  ],
  products: [
    { id:"p001", name:"Rice (50kg)", sku:"RCE-050", price:45000, stock:120, category:"Grains", synced:true  },
    { id:"p002", name:"Palm Oil",    sku:"PLM-001", price:12000, stock:84,  category:"Oil",    synced:true  },
    { id:"p003", name:"Sugar",       sku:"SGR-001", price:8500,  stock:200, category:"Grains", synced:false },
    { id:"p004", name:"Flour",       sku:"FLR-001", price:9500,  stock:150, category:"Grains", synced:false },
  ],
  customers: [
    { id:"c001", name:"Iya Bisi Stores", contact:"+234 801 234 5678", totalSpend:425000, lastInvoice:"2026-03-08" },
    { id:"c002", name:"Emeka Supplies",  contact:"+234 803 456 7890", totalSpend:312500, lastInvoice:"2026-03-05" },
    { id:"c003", name:"Fatima Foods",    contact:"+234 805 678 9012", totalSpend:187500, lastInvoice:"2026-02-28" },
    { id:"c004", name:"Danladi & Sons",  contact:"+234 807 890 1234", totalSpend:95000,  lastInvoice:"2026-02-20" },
  ],
};

const PLAN_FEATURES = {
  starter:    new Set(["invoices","expenses","customers","products","taxes","payments"]),
  growth:     new Set(["invoices","expenses","customers","products","taxes","payments","pos","bankSync","payroll","reports","stockCount","scanner"]),
  enterprise: new Set(["invoices","expenses","customers","products","taxes","payments","pos","bankSync","payroll","reports","stockCount","scanner","aiInsights","manufacturing","logistics","onlineStore"]),
};

function useStore() {
  const KEY = "nukodes_v4";
  const [data, setData] = useState(() => {
    try { const r = localStorage.getItem(KEY); return r ? { ...SEED, ...JSON.parse(r) } : SEED; }
    catch { return SEED; }
  });
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [plan, setPlan] = useState("growth");

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} }, [data]);

  const pending = [...data.sales, ...data.expenses, ...data.invoices].filter(r => !r.synced).length;

  const sync = useCallback(() => {
    if (!online || syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setData(d => ({
        ...d,
        sales:    d.sales.map(r    => ({ ...r, synced: true })),
        expenses: d.expenses.map(r => ({ ...r, synced: true })),
        invoices: d.invoices.map(r => ({ ...r, synced: true })),
        products: d.products.map(r => ({ ...r, synced: true })),
      }));
      setSyncing(false);
    }, 1800);
  }, [online, syncing]);

  const add = useCallback((type, record) => {
    setData(d => ({ ...d, [type]: [...d[type], { ...record, synced: false }] }));
  }, []);

  return { data, online, syncing, pending, sync, add, plan, setPlan };
}

// ─── ICON PATHS ───────────────────────────────────────────────────────────────
const PATHS = {
  home:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  services:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  tax:        "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  account:    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  plus:       "M12 5v14 M5 12h14",
  bell:       "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  chevR:      "M9 18l6-6-6-6",
  chevL:      "M15 18l-6-6 6-6",
  chevD:      "M6 9l6 6 6-6",
  arrowUp:    "M12 19V5 M5 12l7-7 7 7",
  arrowDn:    "M12 5v14 M5 12l7 7 7-7",
  check:      "M20 6L9 17l-5-5",
  x:          "M18 6L6 18 M6 6l12 12",
  receipt:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6",
  wallet:     "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h3v-4h-3z",
  tag:        "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  cart:       "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",
  box:        "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  pie:        "M21.21 15.89A10 10 0 118 2.83 M22 12A10 10 0 0012 2v10z",
  bank:       "M3 22h18 M6 18v-7 M10 18v-7 M14 18v-7 M18 18v-7 M2 11l10-7 10 7",
  sparkle:    "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
  settings:   "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  lock:       "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  sync:       "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  barChart:   "M18 20V10 M12 20V4 M6 20v-6",
  activity:   "M22 12h-4l-3 9L9 3l-3 9H2",
  search:     "M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35",
  briefcase:  "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  creditCard: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22",
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  edit:       "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:      "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  moon:       "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  sun:        "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
  truck:      "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  globe:      "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  scan:       "M1 1h5 M1 1v5 M23 1h-5 M23 1v5 M1 23h5 M1 23v-5 M23 23h-5 M23 23v-5 M8 8h8v8H8z",
  cloudOff:   "M22.61 16.95A5 5 0 0018 10h-1.26A8 8 0 001.29 17.29 M5 5l14 14",
  dollar:     "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  copy:       "M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  link:       "M15 7h3a5 5 0 010 10h-3m-6 0H6A5 5 0 016 7h3 M8 12h8",
  refresh:    "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  sliders:    "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
  logout:     "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  building:   "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  alert:      "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  cpu:        "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  phone:      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.1 1.18 2 2 0 012.11.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.37 7.37a16 16 0 006.26 6.26l1.72-.97a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  camera:     "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
};

function I({ name, size = 20, color = "currentColor", strokeWidth = 1.8 }) {
  const raw = PATHS[name] || "";
  const parts = raw.split(/ (?=M)/);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}>
      {parts.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
let _spId = 0;
function Spark({ data = [], color, h = 32 }) {
  const id = useRef(++_spId + "").current;
  if (!data.length) return null;
  const w = 100, min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`);
  const poly = pts.join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sg${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${poly} ${w},${h}`} fill={`url(#sg${id})`} />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── AVATAR ───────────────────────────────────────────────────────────────────
function Avatar({ name = "", size = 40 }) {
  const hue = (name.charCodeAt(0) || 65) * 37 % 360;
  const initials = name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `hsl(${hue},55%,42%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontFamily: "Syne, sans-serif", fontWeight: 700,
      fontSize: size * 0.36, color: "#fff", userSelect: "none",
    }}>{initials}</div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusPill({ status, T }) {
  const map = {
    paid:    { label: "Paid",    color: T.green  },
    sent:    { label: "Sent",    color: T.accent },
    overdue: { label: "Overdue", color: T.red    },
    pending: { label: "Pending", color: T.orange },
    draft:   { label: "Draft",   color: T.textSec},
  };
  const { label, color } = map[status] || { label: status, color: T.textSec };
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: color + "22", borderRadius: 99, padding: "3px 9px",
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionRow({ title, onMore, T }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <span style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: T.text }}>{title}</span>
      {onMore && (
        <motion.button whileTap={{ scale: 0.95 }} onClick={onMore}
          style={{ background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 3,
            fontFamily: "Instrument Sans, sans-serif", fontSize: 13, color: T.accent }}>
          View <I name="chevR" size={13} color={T.accent} />
        </motion.button>
      )}
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ emoji, title, sub, cta, onCta, T }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "48px 24px", gap: 12, textAlign: "center" }}>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ fontSize: 56 }}>{emoji}</motion.div>
      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: T.text }}>{title}</div>
      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14, color: T.textSec, maxWidth: 220, lineHeight: 1.5 }}>{sub}</div>
      {cta && (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onCta}
          style={{ marginTop: 8, background: T.accent, border: "none", borderRadius: 99,
            padding: "11px 22px", cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>
          {cta}
        </motion.button>
      )}
    </div>
  );
}

// ─── INNER HEADER ─────────────────────────────────────────────────────────────
function InnerHeader({ title, onBack, right, T }) {
  return (
    <div style={{ ...glassHeavyStyle(T), display: "flex", alignItems: "center",
      padding: "14px 16px", gap: 8, flexShrink: 0 }}>
      <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}
        style={{ width: 36, height: 36, borderRadius: 12,
          background: T.glass, border: `0.5px solid ${T.glassBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0 }}>
        <I name="chevL" size={18} color={T.text} />
      </motion.button>
      <span style={{ flex: 1, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: T.text }}>
        {title}
      </span>
      {right}
    </div>
  );
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GCard({ children, T, style = {}, onClick }) {
  return (
    <motion.div whileTap={onClick ? { scale: 0.98 } : undefined} onClick={onClick}
      style={{ ...glassStyle(T), borderRadius: 32, overflow: "hidden", ...style }}>
      {children}
    </motion.div>
  );
}

// ─── PROGRESSIVE BLUR HEADER ──────────────────────────────────────────────────
function ProgressiveHeader({ scrollY, children, T }) {
  const opacity = useTransform(scrollY, [0, 60], [0, 1]);
  // 5 stacked blur layers — each covers a portion of the 64px header
  const layers = [
    { blur: 2,  mask: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%)" },
    { blur: 6,  mask: "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 100%)" },
    { blur: 12, mask: "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)" },
    { blur: 20, mask: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)" },
    { blur: 32, mask: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)"                      },
  ];
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, pointerEvents: "none" }}>
      {/* Blur layers */}
      {layers.map((l, i) => (
        <motion.div key={i} style={{
          position: "absolute", inset: 0, height: 80,
          backdropFilter: `blur(${l.blur}px)`,
          WebkitBackdropFilter: `blur(${l.blur}px)`,
          maskImage: l.mask,
          WebkitMaskImage: l.mask,
          opacity,
        }} />
      ))}
      {/* Tint overlay */}
      <motion.div style={{
        position: "absolute", inset: 0, height: 80,
        background: T.bg,
        opacity: useTransform(scrollY, [0, 80], [0, 0.6]),
      }} />
      {/* Content — always sharp */}
      <div style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}>
        {children}
      </div>
    </div>
  );
}

// ─── GLASS TAB BAR PILL ───────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", icon: "home",     label: "Home"     },
  { id: "services",  icon: "services", label: "Services" },
  { id: "taxes",     icon: "tax",      label: "Taxes"    },
  { id: "profile",   icon: "account",  label: "Profile"  },
];

function TabBar({ tab, setTab, scrollY, onFab, T }) {
  const h = useTransform(scrollY, [0, 80], [64, 52]);
  const padding = useTransform(scrollY, [0, 80], [12, 8]);

  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      gap: 10, padding: "0 0 28px", zIndex: 200, pointerEvents: "none" }}>
      {/* Pill */}
      <motion.div style={{
        ...glassHeavyStyle(T),
        borderRadius: 9999,
        display: "flex", alignItems: "center",
        height: h,
        paddingLeft: padding, paddingRight: padding,
        gap: 2,
        boxShadow: T.shadowFab,
        pointerEvents: "auto",
      }}>
        {TABS.map(t => {
          const active = tab === t.id;
          return (
            <motion.button key={t.id}
              whileTap={{ scale: 0.90 }}
              onClick={() => setTab(t.id)}
              style={{
                position: "relative", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 3,
                minWidth: 56, height: "100%", borderRadius: 9999,
                background: "none", border: "none", cursor: "pointer",
                padding: "0 8px",
              }}>
              {active && (
                <motion.div layoutId="tabPill"
                  style={{ position: "absolute", inset: "8px 0",
                    background: T.accent + "28", borderRadius: 9999 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <I name={t.icon} size={22} color={active ? T.accent : T.textSec} />
              <motion.span animate={{ opacity: active ? 1 : 0.6, fontSize: active ? 10 : 10 }}
                style={{ fontFamily: "Instrument Sans, sans-serif", fontWeight: 600,
                  color: active ? T.accent : T.textSec, position: "relative" }}>
                {t.label}
              </motion.span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* FAB — glass circle to the right */}
      <motion.button
        whileTap={{ scale: 0.90 }}
        whileHover={{ scale: 1.05 }}
        onClick={onFab}
        style={{
          ...glassHeavyStyle(T),
          width: 56, height: 56, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", flexShrink: 0,
          border: `0.5px solid ${T.accent}44`,
          boxShadow: `${T.shadowFab}, 0 0 20px ${T.accent}44`,
          background: T.accent,
          pointerEvents: "auto",
        }}>
        <I name="plus" size={24} color="#fff" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}

// ─── FAB BOTTOM SHEET ─────────────────────────────────────────────────────────
function FabSheet({ onClose, push, T }) {
  const actions = [
    { icon: "receipt",   label: "New Invoice",    color: T.accent,  screen: "addInvoice"  },
    { icon: "cart",      label: "Record Sale",     color: T.green,   screen: "addSale"     },
    { icon: "tag",       label: "Add Expense",     color: T.orange,  screen: "addExpense"  },
    { icon: "users",     label: "Add Customer",    color: "#BF5AF2", screen: "addCustomer" },
    { icon: "box",       label: "Add Product",     color: "#FF2D55", screen: "addProduct"  },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "absolute", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end" }}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ ...glassHeavyStyle(T), width: "100%", borderRadius: "32px 32px 0 0",
          padding: "20px 20px 40px" }}>
        {/* Grabber */}
        <div style={{ width: 36, height: 4, borderRadius: 99, background: T.textMuted,
          margin: "0 auto 20px" }} />
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700,
          color: T.text, marginBottom: 16 }}>Quick Actions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {actions.map((a, i) => (
            <motion.div key={a.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { push(a.screen); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", borderRadius: 20,
                background: T.glassCard, border: `0.5px solid ${T.glassBorder}`,
                cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14,
                background: a.color + "22", border: `0.5px solid ${a.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I name={a.icon} size={20} color={a.color} />
              </div>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 16,
                fontWeight: 500, color: T.text }}>{a.label}</span>
              <I name="chevR" size={16} color={T.textMuted} style={{ marginLeft: "auto" }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── UPGRADE SHEET ────────────────────────────────────────────────────────────
function UpgradeSheet({ onClose, T }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "absolute", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end" }}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ ...glassHeavyStyle(T), width: "100%", borderRadius: "32px 32px 0 0",
          padding: "20px 20px 48px", textAlign: "center" }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: T.textMuted,
          margin: "0 auto 24px" }} />
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800,
          color: T.text, marginBottom: 8 }}>Upgrade to Growth</div>
        <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14, color: T.textSec,
          lineHeight: 1.6, marginBottom: 24 }}>
          Unlock this feature and 20+ more tools to run your business smarter.
        </div>
        <motion.button whileTap={{ scale: 0.96 }}
          style={{ width: "100%", background: T.accent, border: "none", borderRadius: 18,
            padding: "16px", cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 16, fontWeight: 600,
            marginBottom: 12 }}>
          Upgrade — ₦5,000/mo
        </motion.button>
        <motion.button whileTap={{ scale: 0.96 }} onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer",
            color: T.textSec, fontFamily: "Instrument Sans, sans-serif", fontSize: 14 }}>
          Maybe later
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── PROMO CAROUSEL ───────────────────────────────────────────────────────────
const PROMOS = [
  { gradient: "linear-gradient(135deg,#0A84FF,#5856D6)", emoji: "⚡", title: "Bank in seconds", sub: "Connect your GTBank, Access, Zenith — all in one place", cta: "Connect Bank" },
  { gradient: "linear-gradient(135deg,#30D158,#34C759)", emoji: "📊", title: "Free tax filing", sub: "Let Nukodes handle your VAT returns automatically", cta: "Learn more" },
  { gradient: "linear-gradient(135deg,#FF9F0A,#FF6B00)", emoji: "💳", title: "FlexPay is live", sub: "Get paid in installments, no risk to you", cta: "Enable now" },
];

function PromoCarousel({ T }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % PROMOS.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ overflow: "hidden", borderRadius: 32 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ background: PROMOS[active].gradient, borderRadius: 32,
              padding: "20px", minHeight: 110 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 36 }}>{PROMOS[active].emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16,
                  color: "#fff", marginBottom: 4 }}>{PROMOS[active].title}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.8)", lineHeight: 1.5, marginBottom: 10 }}>
                  {PROMOS[active].sub}
                </div>
                <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)",
                  borderRadius: 99, padding: "5px 12px",
                  fontFamily: "Instrument Sans, sans-serif", fontSize: 12, fontWeight: 600,
                  color: "#fff" }}>{PROMOS[active].cta}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10 }}>
        {PROMOS.map((_, i) => (
          <motion.div key={i} animate={{ width: i === active ? 16 : 5, background: i === active ? T.accent : T.textMuted }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setActive(i)}
            style={{ height: 5, borderRadius: 99, cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

// ─── MINI BAR CHART ───────────────────────────────────────────────────────────
function MiniBarChart({ data, color, T }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <motion.div initial={{ height: 0 }} animate={{ height: `${(d.v / max) * 42}px` }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
            style={{ width: "100%", background: color, borderRadius: "4px 4px 0 0", minHeight: 3 }} />
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: T.textMuted }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const CASHFLOW_DATA = [320000,410000,375000,520000,480000,615000,590000];
const CASHFLOW_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const BANK_ACCOUNTS = [
  { name: "GTBank", last4: "4521", balance: 1240000, color: "#FF6600" },
  { name: "Access", last4: "7890", balance: 875000,  color: "#E30613" },
];

function Dashboard({ push, T, data, online, add }) {
  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const recentTxns = [...data.sales].reverse().slice(0, 4);

  return (
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      {/* Progressive blur header */}
      <ProgressiveHeader scrollY={scrollY} T={T}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "52px 20px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Kofi" size={36} />
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15,
                color: T.text }}>Hi, Kofi 👋</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%",
                  background: online ? T.green : T.red }} />
                <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                  color: T.textSec }}>{online ? "Online" : "Offline"}</span>
              </div>
            </div>
          </div>
          <motion.div whileTap={{ scale: 0.9 }} onClick={() => push("notifications")}>
            <div style={{ ...glassStyle(T), width: 40, height: 40, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              position: "relative" }}>
              <I name="bell" size={18} color={T.text} />
              <div style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7,
                borderRadius: "50%", background: T.red,
                border: `1.5px solid ${T.bg}` }} />
            </div>
          </motion.div>
        </div>
      </ProgressiveHeader>

      {/* Scrollable body */}
      <div ref={scrollRef} style={{ position: "absolute", inset: 0,
        overflowY: "auto", paddingTop: 96, paddingBottom: 110, paddingLeft: 20, paddingRight: 20 }}>

        {/* Promo Carousel */}
        <PromoCarousel T={T} />

        {/* Cash Flow */}
        <SectionRow title="Cash Flow" onMore={() => push("cashflow")} T={T} />
        <GCard T={T} style={{ marginBottom: 24, padding: "18px 18px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 24, fontWeight: 500,
              color: T.text }}>₦615,000</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4,
              background: T.green + "22", borderRadius: 99, padding: "4px 10px" }}>
              <I name="arrowUp" size={12} color={T.green} strokeWidth={2.5} />
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11,
                color: T.green, fontWeight: 500 }}>+12.4%</span>
            </div>
          </div>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
            color: T.textSec, marginBottom: 12 }}>This week · 7 days</div>
          <MiniBarChart
            data={CASHFLOW_LABELS.map((l, i) => ({ l, v: CASHFLOW_DATA[i] }))}
            color={T.accent} T={T} />
        </GCard>

        {/* Taxes Preview */}
        <SectionRow title="Taxes" onMore={() => push("taxes")} T={T} />
        <GCard T={T} style={{ marginBottom: 24, padding: "16px 18px", cursor: "pointer" }}
          onClick={() => push("taxes")}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 600,
                color: T.textSec, marginBottom: 4 }}>VAT Due · Q1 2026</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 22, color: T.orange }}>
                ₦187,500
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                color: T.textSec }}>Due date</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: T.text }}>
                31 Mar 2026
              </div>
              <div style={{ marginTop: 6 }}>
                <span style={{ background: T.orange + "22", borderRadius: 99, padding: "3px 9px",
                  fontFamily: "DM Mono, monospace", fontSize: 10, color: T.orange }}>Overdue</span>
              </div>
            </div>
          </div>
        </GCard>

        {/* Recent Transactions */}
        <SectionRow title="Recent Transactions" onMore={() => push("sales")} T={T} />
        <div style={{ marginBottom: 24 }}>
          {recentTxns.length === 0 ? (
            <EmptyState emoji="💸" title="No transactions yet" sub="Sales and expenses will appear here" T={T} />
          ) : (
            <GCard T={T} style={{ overflow: "hidden" }}>
              {recentTxns.map((txn, i) => (
                <motion.div key={txn.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ display: "flex", alignItems: "center", gap: 12,
                    padding: "13px 16px",
                    borderBottom: i < recentTxns.length - 1 ? `0.5px solid ${T.divider}` : "none" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 14,
                    background: T.accent + "18", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0 }}>
                    <I name="cart" size={17} color={T.accent} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                      fontWeight: 500, color: T.text,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {txn.customer}
                    </div>
                    <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                      color: T.textSec }}>{txn.items}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                      color: T.green, fontWeight: 500 }}>+{naira(txn.amount)}</div>
                    <StatusPill status={txn.status} T={T} />
                  </div>
                </motion.div>
              ))}
            </GCard>
          )}
        </div>

        {/* Connected Accounts */}
        <SectionRow title="Accounts" onMore={() => push("accounts")} T={T} />
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {BANK_ACCOUNTS.map((bank, i) => (
            <GCard key={bank.name} T={T} style={{ flex: 1, padding: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 9,
                  background: bank.color, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0 }}>
                  <I name="bank" size={14} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
                    fontWeight: 600, color: T.text }}>{bank.name}</div>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                    color: T.textSec }}>••{bank.last4}</div>
                </div>
              </div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 15, fontWeight: 500,
                color: T.text }}>{naira(bank.balance)}</div>
            </GCard>
          ))}
        </div>

        {/* Analytics Widgets */}
        <SectionRow title="Analytics" T={T} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Revenue", value: "₦1.25M", sub: "+8.2% this week", color: T.green,  chart: [40,55,48,62,71,68,80] },
            { label: "Expenses",value: "₦170K",  sub: "-3.1% this week",  color: T.orange, chart: [55,60,52,48,58,45,43] },
            { label: "Invoiced", value: "₦1.31M", sub: "4 outstanding",   color: T.accent, chart: [30,45,60,55,70,65,75] },
            { label: "Runway",  value: "6 mo",   sub: "At current burn",  color: "#BF5AF2",chart: [80,78,75,72,70,68,65] },
          ].map((w, i) => (
            <GCard key={w.label} T={T} style={{ padding: "14px" }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                color: T.textSec, marginBottom: 6 }}>{w.label}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 18, fontWeight: 500,
                color: T.text, marginBottom: 8 }}>{w.value}</div>
              <Spark data={w.chart} color={w.color} h={28} />
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10,
                color: w.color, marginTop: 6 }}>{w.sub}</div>
            </GCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICE_SECTIONS = [
  { title: "Financial Summary", items: [
    { id: "invoices",  icon: "receipt",   label: "Invoices",        sub: "Send & track invoices",       color: "#0A84FF", plan: "starter" },
    { id: "expenses",  icon: "tag",       label: "Expenses",        sub: "Log & categorise spending",   color: "#FF9F0A", plan: "starter" },
    { id: "sales",     icon: "cart",      label: "Sales Tracker",   sub: "Record and monitor sales",    color: "#30D158", plan: "starter" },
  ]},
  { title: "Inventory", items: [
    { id: "products",  icon: "box",       label: "Products",        sub: "Manage your inventory",       color: "#FF453A", plan: "starter" },
    { id: "stockCount",icon: "scan",      label: "Stock Count",     sub: "Barcode scan & reconcile",    color: "#BF5AF2", plan: "growth"  },
    { id: "pos",       icon: "creditCard",label: "POS Terminal",    sub: "In-person payments",          color: "#FF2D55", plan: "growth"  },
  ]},
  { title: "Sales & Customers", items: [
    { id: "customers", icon: "users",     label: "Customers",       sub: "CRM & purchase history",      color: "#64D2FF", plan: "starter" },
    { id: "logistics", icon: "truck",     label: "Logistics",       sub: "Delivery & fulfilment",       color: "#30D158", plan: "enterprise" },
    { id: "onlineStore",icon: "globe",    label: "Online Store",    sub: "Sell online with Nukodes",    color: "#FF9F0A", plan: "enterprise" },
  ]},
  { title: "Finance", items: [
    { id: "bankSync",  icon: "bank",      label: "Bank Sync",       sub: "Auto-import transactions",    color: "#0A84FF", plan: "growth"  },
    { id: "payments",  icon: "creditCard",label: "Payments",        sub: "Receive money instantly",     color: "#30D158", plan: "starter" },
    { id: "payroll",   icon: "users",     label: "Payroll",         sub: "Pay your team on time",       color: "#64D2FF", plan: "growth"  },
  ]},
  { title: "Analytics & Compliance", items: [
    { id: "taxes",     icon: "tax",       label: "Tax Centre",      sub: "VAT, WHT & CIT filing",       color: "#FF9F0A", plan: "starter" },
    { id: "reports",   icon: "barChart",  label: "Financial Reports",sub: "P&L, balance sheet",         color: "#BF5AF2", plan: "growth"  },
    { id: "aiInsights",icon: "sparkle",   label: "AI Insights",     sub: "Smart business analytics",    color: "#FF2D55", plan: "enterprise" },
  ]},
];

function Services({ push, plan, onUpgrade, T }) {
  const unlocked = PLAN_FEATURES[plan] || PLAN_FEATURES.starter;
  return (
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, overflowY: "auto",
        paddingTop: 60, paddingBottom: 110 }}>
        {/* Header */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28,
            color: T.text }}>Services</div>
        </div>

        {SERVICE_SECTIONS.map((section) => (
          <div key={section.title} style={{ marginBottom: 28 }}>
            <div style={{ padding: "0 20px 10px",
              fontFamily: "DM Mono, monospace", fontSize: 10, fontWeight: 500,
              color: T.textMuted, letterSpacing: 1.2, textTransform: "uppercase" }}>
              {section.title}
            </div>
            <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {section.items.map((item, i) => {
                const locked = !unlocked.has(item.id);
                return (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => locked ? onUpgrade() : push(item.id)}
                    style={{ ...glassStyle(T), borderRadius: 20,
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", cursor: "pointer",
                      opacity: locked ? 0.6 : 1 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                      background: item.color + "22", border: `0.5px solid ${item.color}44`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <I name={item.icon} size={20} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 15,
                        fontWeight: 600, color: T.text }}>{item.label}</div>
                      <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
                        color: T.textSec, marginTop: 2 }}>{item.sub}</div>
                    </div>
                    {locked
                      ? <I name="lock" size={16} color={T.textMuted} />
                      : <I name="chevR" size={16} color={T.textMuted} />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAXES ────────────────────────────────────────────────────────────────────
const TAX_TABS = ["VAT", "WHT", "CIT", "BUS"];
const TAX_DATA = { VAT: 187500, WHT: 45000, CIT: 320000, BUS: 95000 };

function Taxes({ push, T }) {
  const [active, setActive] = useState("VAT");
  return (
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, overflowY: "auto",
        paddingTop: 60, paddingBottom: 110 }}>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28,
            color: T.text }}>Tax Centre</div>
        </div>

        {/* Tax type pills */}
        <div style={{ padding: "0 20px 20px", display: "flex", gap: 8 }}>
          {TAX_TABS.map(tab => (
            <motion.button key={tab} whileTap={{ scale: 0.94 }}
              onClick={() => setActive(tab)}
              style={{ ...glassStyle(T), borderRadius: 99, padding: "8px 16px", border: "none",
                cursor: "pointer", background: active === tab ? T.accent : T.glass,
                fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500,
                color: active === tab ? "#fff" : T.textSec }}>
              {tab}
            </motion.button>
          ))}
        </div>

        <div style={{ padding: "0 20px" }}>
          <GCard T={T} style={{ padding: "20px", marginBottom: 20 }}>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 13,
              color: T.textSec, marginBottom: 8 }}>{active} Liability · Q1 2026</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 32, fontWeight: 500,
              color: T.orange }}>{naira(TAX_DATA[active])}</div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ background: T.orange + "22", borderRadius: 99, padding: "4px 10px",
                fontFamily: "DM Mono, monospace", fontSize: 10, color: T.orange }}>Due 31 Mar 2026</span>
            </div>
          </GCard>

          {[
            { label: "Tax Period",   value: "Jan – Mar 2026" },
            { label: "Tax Rate",     value: active === "VAT" ? "7.5%" : "10%" },
            { label: "Total Sales",  value: naira(2500000) },
            { label: "Total Payable",value: naira(TAX_DATA[active]) },
          ].map((row, i) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "13px 0",
              borderBottom: i < 3 ? `0.5px solid ${T.divider}` : "none" }}>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                color: T.textSec }}>{row.label}</span>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14,
                color: T.text }}>{row.value}</span>
            </div>
          ))}

          <motion.button whileTap={{ scale: 0.97 }}
            style={{ width: "100%", background: T.accent, border: "none", borderRadius: 18,
              padding: "16px", marginTop: 20, cursor: "pointer", color: "#fff",
              fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
            File {active} Return
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ push, isDark, toggleTheme, T }) {
  const sections = [
    { title: "General", rows: [
      { icon: "edit",      color: T.accent,  label: "Edit Profile",      sub: "Update your details"           },
      { icon: "building",  color: "#BF5AF2", label: "Business Settings", sub: "Manage your business profile"  },
      { icon: "creditCard",color: T.green,   label: "Subscription",      sub: "Growth Plan · ₦5,000/mo"       },
    ]},
    { title: "Preferences", rows: [
      { icon: isDark ? "sun" : "moon", color: T.orange, label: isDark ? "Light Mode" : "Dark Mode",
        sub: "Toggle appearance", toggle: true, onToggle: toggleTheme },
      { icon: "bell",      color: T.accent,  label: "Notifications",     sub: "Manage alert preferences"      },
      { icon: "globe",     color: "#30D158", label: "Language & Region", sub: "English · Nigeria"             },
    ]},
    { title: "Support", rows: [
      { icon: "briefcase", color: "#FF9F0A", label: "Help Centre",       sub: "FAQs and guides"               },
      { icon: "activity",  color: "#BF5AF2", label: "Send Feedback",     sub: "We'd love to hear from you"    },
      { icon: "alert",     color: T.red,     label: "Report a problem",  sub: ""                               },
    ]},
  ];

  return (
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, overflowY: "auto",
        paddingTop: 60, paddingBottom: 110 }}>
        {/* Profile card */}
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28,
            color: T.text, marginBottom: 20 }}>Profile</div>

          <GCard T={T} style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <Avatar name="Kofi Mensah" size={60} />
                <div style={{ position: "absolute", bottom: 0, right: 0,
                  width: 20, height: 20, borderRadius: "50%", background: T.accent,
                  border: `2px solid ${T.bg}`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I name="check" size={10} color="#fff" strokeWidth={2.5} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18,
                  color: T.text }}>Kofi Mensah</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 13,
                  color: T.textSec }}>kofi@nukodes.app</div>
                <div style={{ marginTop: 6 }}>
                  <span style={{ background: T.accent + "22", borderRadius: 99, padding: "3px 10px",
                    fontFamily: "DM Mono, monospace", fontSize: 10, color: T.accent }}>Growth Plan</span>
                </div>
              </div>
            </div>
          </GCard>
        </div>

        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 24, padding: "0 20px" }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: T.textMuted,
              letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>
              {section.title}
            </div>
            <GCard T={T} style={{ overflow: "hidden" }}>
              {section.rows.map((row, i) => (
                <motion.div key={row.label} whileTap={{ scale: 0.99 }}
                  onClick={row.onToggle}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px",
                    borderBottom: i < section.rows.length - 1 ? `0.5px solid ${T.divider}` : "none",
                    cursor: "pointer" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: row.color + "18",
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <I name={row.icon} size={17} color={row.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                      fontWeight: 500, color: T.text }}>{row.label}</div>
                    {row.sub && <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                      color: T.textSec, marginTop: 1 }}>{row.sub}</div>}
                  </div>
                  <I name={row.toggle ? (isDark ? "sun" : "moon") : "chevR"} size={15} color={T.textMuted} />
                </motion.div>
              ))}
            </GCard>
          </div>
        ))}

        {/* Logout */}
        <div style={{ padding: "0 20px 20px" }}>
          <motion.button whileTap={{ scale: 0.97 }}
            style={{ width: "100%", background: T.red + "18", border: `0.5px solid ${T.red}44`,
              borderRadius: 18, padding: "15px", cursor: "pointer", color: T.red,
              fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <I name="logout" size={18} color={T.red} /> Log out
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// ─── INVOICE LIST ─────────────────────────────────────────────────────────────
function InvoiceList({ pop, push, data, T }) {
  const total = data.invoices.reduce((s, inv) => s + inv.amount, 0);
  const overdue = data.invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Invoices" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => push("addInvoice")}
            style={{ ...glassStyle(T), width: 36, height: 36, borderRadius: 12, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="plus" size={18} color={T.accent} strokeWidth={2.2} />
          </motion.button>
        } />
      <div style={{ display: "flex", gap: 10, padding: "12px 16px" }}>
        {[{ l: "Total", v: naira(total), c: T.accent }, { l: "Overdue", v: naira(overdue), c: T.red }].map(s => (
          <GCard key={s.l} T={T} style={{ flex: 1, padding: "12px 14px" }}>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
              color: T.textSec, marginBottom: 4 }}>{s.l}</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 15, color: s.c }}>{s.v}</div>
          </GCard>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
        {data.invoices.length === 0
          ? <EmptyState emoji="🧾" title="Start sending professional invoices" sub="Create your first invoice in seconds" cta="New Invoice" T={T} />
          : data.invoices.map((inv, i) => (
            <motion.div key={inv.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12,
                background: T.accent + "18", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0 }}>
                <I name="receipt" size={18} color={T.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text }}>{inv.customer}</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                  color: T.textSec }}>{inv.id}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                  color: T.text, marginBottom: 4 }}>{naira(inv.amount)}</div>
                <StatusPill status={inv.status} T={T} />
              </div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
}

// ─── EXPENSE LIST ─────────────────────────────────────────────────────────────
function ExpenseList({ pop, push, data, T }) {
  const total = data.expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Expenses" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => push("addExpense")}
            style={{ ...glassStyle(T), width: 36, height: 36, borderRadius: 12, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="plus" size={18} color={T.orange} strokeWidth={2.2} />
          </motion.button>
        } />
      <div style={{ padding: "12px 16px" }}>
        <GCard T={T} style={{ padding: "14px 16px" }}>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
            color: T.textSec, marginBottom: 4 }}>Total Expenses · March</div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 22, color: T.orange }}>{naira(total)}</div>
        </GCard>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
        {data.expenses.length === 0
          ? <EmptyState emoji="💰" title="No expenses yet" sub="Track your business spending here" cta="Add Expense" T={T} />
          : data.expenses.map((exp, i) => (
            <motion.div key={exp.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12,
                background: T.orange + "18", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0 }}>
                <I name="tag" size={18} color={T.orange} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text }}>{exp.vendor}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                  color: T.textSec }}>{exp.category} · {exp.date}</div>
              </div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                color: T.red, flexShrink: 0 }}>-{naira(exp.amount)}</div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
}

// ─── SALES LIST ───────────────────────────────────────────────────────────────
function SalesList({ pop, data, T }) {
  const total = data.sales.filter(s => s.status === "paid").reduce((s, r) => s + r.amount, 0);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Sales" onBack={pop} T={T} />
      <div style={{ padding: "12px 16px" }}>
        <GCard T={T} style={{ padding: "14px 16px" }}>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
            color: T.textSec, marginBottom: 4 }}>Paid Revenue · March</div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 22, color: T.green }}>{naira(total)}</div>
        </GCard>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
        {data.sales.length === 0
          ? <EmptyState emoji="📈" title="No sales recorded" sub="Record your first sale to see it here" cta="Record Sale" T={T} />
          : data.sales.map((sale, i) => (
            <motion.div key={sale.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={sale.customer} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {sale.customer}
                </div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                  color: T.textSec }}>{sale.items}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                  color: T.green, marginBottom: 4 }}>{naira(sale.amount)}</div>
                <StatusPill status={sale.status} T={T} />
              </div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
function Customers({ pop, push, data, T }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Customers" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => push("addCustomer")}
            style={{ ...glassStyle(T), width: 36, height: 36, borderRadius: 12, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="plus" size={18} color={T.accent} strokeWidth={2.2} />
          </motion.button>
        } />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 20px" }}>
        {data.customers.length === 0
          ? <EmptyState emoji="🤝" title="Build your customer base" sub="Add customers to track spending and invoices" cta="Add Customer" T={T} />
          : data.customers.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar name={c.name} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text }}>{c.name}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                  color: T.textSec }}>{c.contact}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                  color: T.text }}>{naira(c.totalSpend)}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10,
                  color: T.textSec, marginTop: 2 }}>Total spent</div>
              </div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
function Products({ pop, push, data, T }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Products" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => push("addProduct")}
            style={{ ...glassStyle(T), width: 36, height: 36, borderRadius: 12, border: "none",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="plus" size={18} color={T.accent} strokeWidth={2.2} />
          </motion.button>
        } />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 20px" }}>
        {data.products.length === 0
          ? <EmptyState emoji="📦" title="Your inventory is empty" sub="Add products to track stock and pricing" cta="Add Product" T={T} />
          : data.products.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13,
                background: T.accent + "18", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0 }}>
                <I name="box" size={20} color={T.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text }}>{p.name}</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                  color: T.textSec }}>{p.sku}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                  color: T.text }}>{naira(p.price)}</div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10,
                  color: p.stock < 20 ? T.red : T.textSec, marginTop: 2 }}>
                  {p.stock} in stock
                </div>
              </div>
            </motion.div>
          ))
        }
      </div>
    </div>
  );
}

// ─── GLASS INPUT ─────────────────────────────────────────────────────────────
function GlassInput({ label, value, onChange, type = "text", multiline, options, T }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value !== "" && value !== undefined;
  const base = {
    ...glassStyle(T),
    borderRadius: 20,
    padding: multiline ? "28px 16px 10px" : "0 16px",
    height: multiline ? undefined : 56,
    minHeight: multiline ? 80 : undefined,
    display: "flex", alignItems: multiline ? "flex-start" : "center",
    position: "relative",
    border: `0.5px solid ${focused ? T.accent : T.glassBorder}`,
    transition: "border-color 0.2s",
    marginBottom: 12,
  };
  const lbl = {
    position: "absolute",
    left: 16, top: hasVal || focused ? 10 : "50%",
    transform: hasVal || focused ? "none" : "translateY(-50%)",
    fontFamily: "Instrument Sans, sans-serif",
    fontSize: hasVal || focused ? 10 : 14,
    color: focused ? T.accent : T.textSec,
    transition: "all 0.18s ease",
    pointerEvents: "none", zIndex: 1,
  };
  const inp = {
    width: "100%", background: "none", border: "none", outline: "none",
    fontFamily: "Instrument Sans, sans-serif", fontSize: 15,
    color: T.text, paddingTop: 16, resize: "none",
  };

  if (options) {
    return (
      <div style={{ position: "relative", marginBottom: 12 }}>
        <div style={base}>
          <span style={{ ...lbl, top: 10, fontSize: 10 }}>{label}</span>
          <select value={value} onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...inp, appearance: "none", cursor: "pointer" }}>
            <option value="">Select…</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <I name="chevD" size={14} color={T.textMuted} />
        </div>
      </div>
    );
  }
  if (multiline) {
    return (
      <div style={base}>
        <span style={lbl}>{label}</span>
        <textarea value={value} onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={3} style={{ ...inp, paddingTop: 20 }} />
      </div>
    );
  }
  return (
    <div style={base}>
      <span style={lbl}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={inp} />
    </div>
  );
}

// ─── DATE PICKER SHEET ────────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function WheelCol({ items, selected, onSelect, T }) {
  const ref = useRef(null);
  const ITEM_H = 40;
  useEffect(() => {
    const idx = items.indexOf(selected);
    if (ref.current && idx >= 0) ref.current.scrollTop = idx * ITEM_H;
  }, []);
  const onScroll = () => {
    if (!ref.current) return;
    const idx = Math.round(ref.current.scrollTop / ITEM_H);
    if (items[idx] !== undefined) onSelect(items[idx]);
  };
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
      {/* Fade overlays */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to bottom, ${T.bg}, transparent)` }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to top, ${T.bg}, transparent)` }} />
      {/* Selection bar */}
      <div style={{ position: "absolute", top: "50%", left: 4, right: 4, height: ITEM_H,
        transform: "translateY(-50%)", background: T.accent + "20",
        borderRadius: 12, zIndex: 1, border: `0.5px solid ${T.accent}44` }} />
      <div ref={ref} onScroll={onScroll}
        style={{ height: ITEM_H * 5, overflowY: "scroll", scrollSnapType: "y mandatory",
          paddingTop: ITEM_H * 2, paddingBottom: ITEM_H * 2 }}>
        {items.map(item => (
          <div key={item} onClick={() => onSelect(item)}
            style={{ height: ITEM_H, scrollSnapAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "DM Mono, monospace", fontSize: 16, fontWeight: 500,
              color: item === selected ? T.text : T.textMuted,
              cursor: "pointer", transition: "color 0.15s" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatePickerSheet({ onClose, onSelect, initial, T }) {
  const now = initial ? new Date(initial) : new Date();
  const [day,   setDay]   = useState(String(now.getDate()).padStart(2,"0"));
  const [month, setMonth] = useState(MONTHS[now.getMonth()]);
  const [year,  setYear]  = useState(String(now.getFullYear()));
  const days   = Array.from({length: 31}, (_, i) => String(i+1).padStart(2,"0"));
  const years  = Array.from({length: 10}, (_, i) => String(2022 + i));
  const confirm = () => {
    const mo = String(MONTHS.indexOf(month)+1).padStart(2,"0");
    onSelect(`${year}-${mo}-${day}`);
    onClose();
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "absolute", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "flex-end" }}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ ...glassHeavyStyle(T), width: "100%", borderRadius: "32px 32px 0 0",
          padding: "20px 20px 48px" }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: T.textMuted,
          margin: "0 auto 20px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: 17, fontWeight: 700, color: T.text }}>Select Date</span>
          <motion.button whileTap={{ scale: 0.93 }} onClick={confirm}
            style={{ background: T.accent, border: "none", borderRadius: 99, padding: "8px 18px",
              color: "#fff", fontFamily: "Instrument Sans, sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Done
          </motion.button>
        </div>
        <div style={{ display: "flex", gap: 8, height: 200, overflow: "hidden" }}>
          <WheelCol items={days}   selected={day}   onSelect={setDay}   T={T} />
          <WheelCol items={MONTHS} selected={month} onSelect={setMonth} T={T} />
          <WheelCol items={years}  selected={year}  onSelect={setYear}  T={T} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── DATE RANGE SHEET ─────────────────────────────────────────────────────────
function DateRangeSheet({ onClose, onSelect, T }) {
  const today = new Date(2026, 2, 9); // demo date
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [step, setStep] = useState("start"); // "start" | "end"

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  const isSel = (d) => {
    if (!d) return false;
    const dt = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return dt === startDate || dt === endDate;
  };
  const isRange = (d) => {
    if (!d || !startDate || !endDate) return false;
    const dt = new Date(viewYear, viewMonth, d);
    return dt > new Date(startDate) && dt < new Date(endDate);
  };

  const onDay = (d) => {
    if (!d) return;
    const dt = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    if (step === "start") { setStartDate(dt); setEndDate(null); setStep("end"); }
    else { setEndDate(dt); }
  };

  const confirm = () => {
    if (startDate && endDate) { onSelect({ start: startDate, end: endDate }); onClose(); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "absolute", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "flex-end" }}>
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ ...glassHeavyStyle(T), width: "100%", borderRadius: "32px 32px 0 0",
          padding: "20px 20px 40px" }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: T.textMuted,
          margin: "0 auto 20px" }} />
        {/* Month nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => { const d = new Date(viewYear, viewMonth - 1); setViewYear(d.getFullYear()); setViewMonth(d.getMonth()); }}
            style={{ background: T.glass, border: `0.5px solid ${T.glassBorder}`, borderRadius: 12,
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="chevL" size={16} color={T.text} />
          </motion.button>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => { const d = new Date(viewYear, viewMonth + 1); setViewYear(d.getFullYear()); setViewMonth(d.getMonth()); }}
            style={{ background: T.glass, border: `0.5px solid ${T.glassBorder}`, borderRadius: 12,
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <I name="chevR" size={16} color={T.text} />
          </motion.button>
        </div>
        {/* Step hint */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["start","end"].map(s => (
            <div key={s} style={{ flex: 1, padding: "10px 14px", borderRadius: 14,
              background: step === s ? T.accent + "22" : T.glassCard,
              border: `0.5px solid ${step === s ? T.accent : T.glassBorder}` }}>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: step === s ? T.accent : T.textMuted,
                textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{s === "start" ? "From" : "To"}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: T.text }}>
                {(s === "start" ? startDate : endDate) || "–"}
              </div>
            </div>
          ))}
        </div>
        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontFamily: "DM Mono, monospace",
              fontSize: 10, color: T.textMuted, paddingBottom: 4 }}>{d}</div>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {cells.map((d, i) => (
            <motion.div key={i} whileTap={d ? { scale: 0.85 } : undefined}
              onClick={() => onDay(d)}
              style={{ height: 36, borderRadius: 10, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: d ? "pointer" : "default",
                background: isSel(d) ? T.accent : isRange(d) ? T.accent + "30" : "transparent",
                border: isSel(d) ? "none" : "none" }}>
              {d && <span style={{ fontFamily: "DM Mono, monospace", fontSize: 13,
                color: isSel(d) ? "#fff" : isRange(d) ? T.accent : T.text }}>{d}</span>}
            </motion.div>
          ))}
        </div>
        {startDate && endDate && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={confirm}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ width: "100%", marginTop: 16, background: T.accent, border: "none",
              borderRadius: 16, padding: "14px", cursor: "pointer", color: "#fff",
              fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
            Apply Range
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── ADD INVOICE FORM ─────────────────────────────────────────────────────────
function AddInvoice({ pop, add, T }) {
  const [form, setForm] = useState({ customer: "", items: "", amount: "", date: "2026-03-09", status: "draft" });
  const [datePicker, setDatePicker] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.customer || !form.amount) return;
    const num = parseInt(form.items.replace(/\D/g, ""), 10) || Date.now();
    add("invoices", { id: `INV-${Date.now()}`, ...form, amount: +form.amount });
    pop();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="New Invoice" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <GlassInput label="Customer name" value={form.customer} onChange={v => set("customer", v)} T={T} />
        <GlassInput label="Items / description" value={form.items} onChange={v => set("items", v)} multiline T={T} />
        <GlassInput label="Amount (₦)" value={form.amount} onChange={v => set("amount", v)} type="number" T={T} />
        <GlassInput label="Status" value={form.status} onChange={v => set("status", v)}
          options={["draft","sent","paid","overdue"]} T={T} />
        {/* Date field */}
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setDatePicker(true)}
          style={{ ...glassStyle(T), borderRadius: 20, height: 56, padding: "0 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 12, cursor: "pointer" }}>
          <div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10, color: T.textSec }}>Invoice Date</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: T.text }}>{form.date}</div>
          </div>
          <I name="chevD" size={16} color={T.textMuted} />
        </motion.div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          style={{ width: "100%", background: T.accent, border: "none", borderRadius: 18,
            padding: "16px", marginTop: 8, cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
          Create Invoice
        </motion.button>
      </div>
      <AnimatePresence>
        {datePicker && <DatePickerSheet onClose={() => setDatePicker(false)}
          onSelect={d => set("date", d)} initial={form.date} T={T} />}
      </AnimatePresence>
    </div>
  );
}

// ─── ADD EXPENSE FORM ─────────────────────────────────────────────────────────
function AddExpense({ pop, add, T }) {
  const [form, setForm] = useState({ vendor: "", category: "", amount: "", note: "", date: "2026-03-09" });
  const [datePicker, setDatePicker] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.vendor || !form.amount) return;
    add("expenses", { id: `EXP-${Date.now()}`, ...form, amount: +form.amount });
    pop();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Add Expense" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <GlassInput label="Vendor / supplier" value={form.vendor} onChange={v => set("vendor", v)} T={T} />
        <GlassInput label="Category" value={form.category} onChange={v => set("category", v)}
          options={["Utilities","Supplies","Operations","Marketing","Salaries","Rent","Transport","Other"]} T={T} />
        <GlassInput label="Amount (₦)" value={form.amount} onChange={v => set("amount", v)} type="number" T={T} />
        <GlassInput label="Note (optional)" value={form.note} onChange={v => set("note", v)} multiline T={T} />
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setDatePicker(true)}
          style={{ ...glassStyle(T), borderRadius: 20, height: 56, padding: "0 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 12, cursor: "pointer" }}>
          <div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10, color: T.textSec }}>Date</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: T.text }}>{form.date}</div>
          </div>
          <I name="chevD" size={16} color={T.textMuted} />
        </motion.div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          style={{ width: "100%", background: T.orange, border: "none", borderRadius: 18,
            padding: "16px", marginTop: 8, cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
          Log Expense
        </motion.button>
      </div>
      <AnimatePresence>
        {datePicker && <DatePickerSheet onClose={() => setDatePicker(false)}
          onSelect={d => set("date", d)} initial={form.date} T={T} />}
      </AnimatePresence>
    </div>
  );
}

// ─── ADD SALE FORM ────────────────────────────────────────────────────────────
function AddSale({ pop, add, T }) {
  const [form, setForm] = useState({ customer: "", items: "", amount: "", date: "2026-03-09", status: "paid" });
  const [datePicker, setDatePicker] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.customer || !form.amount) return;
    add("sales", { id: `SAL-${Date.now()}`, ...form, amount: +form.amount });
    pop();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Record Sale" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <GlassInput label="Customer name" value={form.customer} onChange={v => set("customer", v)} T={T} />
        <GlassInput label="Items sold" value={form.items} onChange={v => set("items", v)} multiline T={T} />
        <GlassInput label="Amount (₦)" value={form.amount} onChange={v => set("amount", v)} type="number" T={T} />
        <GlassInput label="Payment status" value={form.status} onChange={v => set("status", v)}
          options={["paid","sent","pending","overdue"]} T={T} />
        <motion.div whileTap={{ scale: 0.98 }} onClick={() => setDatePicker(true)}
          style={{ ...glassStyle(T), borderRadius: 20, height: 56, padding: "0 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 12, cursor: "pointer" }}>
          <div>
            <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 10, color: T.textSec }}>Sale Date</div>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: T.text }}>{form.date}</div>
          </div>
          <I name="chevD" size={16} color={T.textMuted} />
        </motion.div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          style={{ width: "100%", background: T.green, border: "none", borderRadius: 18,
            padding: "16px", marginTop: 8, cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
          Save Sale
        </motion.button>
      </div>
      <AnimatePresence>
        {datePicker && <DatePickerSheet onClose={() => setDatePicker(false)}
          onSelect={d => set("date", d)} initial={form.date} T={T} />}
      </AnimatePresence>
    </div>
  );
}

// ─── ADD CUSTOMER FORM ────────────────────────────────────────────────────────
function AddCustomer({ pop, add, T }) {
  const [form, setForm] = useState({ name: "", contact: "", email: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.name) return;
    add("customers", { id: `C-${Date.now()}`, ...form, totalSpend: 0, lastInvoice: "—" });
    pop();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Add Customer" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%",
            background: T.accent + "22", border: `0.5px solid ${T.accent}44`,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
            <I name="users" size={32} color={T.accent} />
          </div>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 13, color: T.textSec }}>New customer</div>
        </div>
        <GlassInput label="Full name or business" value={form.name} onChange={v => set("name", v)} T={T} />
        <GlassInput label="Phone (+234…)" value={form.contact} onChange={v => set("contact", v)} type="tel" T={T} />
        <GlassInput label="Email (optional)" value={form.email} onChange={v => set("email", v)} type="email" T={T} />
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          style={{ width: "100%", background: T.accent, border: "none", borderRadius: 18,
            padding: "16px", marginTop: 8, cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
          Add Customer
        </motion.button>
      </div>
    </div>
  );
}

// ─── ADD PRODUCT FORM ─────────────────────────────────────────────────────────
function AddProduct({ pop, add, T }) {
  const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "", category: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => {
    if (!form.name || !form.price) return;
    add("products", { id: `P-${Date.now()}`, ...form, price: +form.price, stock: +form.stock || 0, synced: false });
    pop();
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Add Product" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <GlassInput label="Product name" value={form.name} onChange={v => set("name", v)} T={T} />
        <GlassInput label="SKU / barcode" value={form.sku} onChange={v => set("sku", v)} T={T} />
        <GlassInput label="Price (₦)" value={form.price} onChange={v => set("price", v)} type="number" T={T} />
        <GlassInput label="Opening stock" value={form.stock} onChange={v => set("stock", v)} type="number" T={T} />
        <GlassInput label="Category" value={form.category} onChange={v => set("category", v)}
          options={["Grains","Oil","Beverages","Electronics","Clothing","Stationery","Other"]} T={T} />
        <motion.button whileTap={{ scale: 0.97 }} onClick={submit}
          style={{ width: "100%", background: T.accent, border: "none", borderRadius: 18,
            padding: "16px", marginTop: 8, cursor: "pointer", color: "#fff",
            fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600 }}>
          Add to Inventory
        </motion.button>
      </div>
    </div>
  );
}

// ─── POS TERMINAL ─────────────────────────────────────────────────────────────
function POSTerminal({ pop, data, add, T }) {
  const [amount, setAmount] = useState("0");
  const [cart, setCart] = useState([]);
  const [paid, setPaid] = useState(false);
  const press = (k) => {
    if (k === "⌫") { setAmount(a => a.length > 1 ? a.slice(0, -1) : "0"); return; }
    if (k === "." && amount.includes(".")) return;
    setAmount(a => a === "0" && k !== "." ? k : a + k);
  };
  const addToCart = () => {
    if (+amount <= 0) return;
    setCart(c => [...c, { id: Date.now(), label: `Item ${c.length + 1}`, amount: +amount }]);
    setAmount("0");
  };
  const total = cart.reduce((s, i) => s + i.amount, 0);
  const charge = () => {
    if (total <= 0) return;
    add("sales", { id: `POS-${Date.now()}`, customer: "Walk-in Customer",
      items: `${cart.length} item${cart.length > 1 ? "s" : ""}`, amount: total,
      date: "2026-03-09", status: "paid" });
    setPaid(true);
    setTimeout(() => { setPaid(false); setCart([]); setAmount("0"); }, 2500);
  };
  const keys = ["1","2","3","4","5","6","7","8","9",".","0","⌫"];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="POS Terminal" onBack={pop} T={T} />
      {paid ? (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 12 }}>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: 2, duration: 0.4 }}
            style={{ width: 80, height: 80, borderRadius: "50%", background: T.green + "22",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I name="check" size={36} color={T.green} strokeWidth={2.5} />
          </motion.div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color: T.green }}>Payment received!</div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 18, color: T.text }}>{naira(total)}</div>
        </motion.div>
      ) : (
        <>
          {/* Display */}
          <div style={{ padding: "16px 20px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 40, fontWeight: 500,
              color: T.text, letterSpacing: -1 }}>₦{Number(amount).toLocaleString("en-NG")}</div>
          </div>
          {/* Cart */}
          {cart.length > 0 && (
            <div style={{ padding: "0 16px 8px", maxHeight: 120, overflowY: "auto" }}>
              {cart.map((item, i) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between",
                  padding: "5px 12px", borderRadius: 12,
                  background: i % 2 === 0 ? T.glassCard : "transparent",
                  fontFamily: "Instrument Sans, sans-serif", fontSize: 13 }}>
                  <span style={{ color: T.textSec }}>{item.label}</span>
                  <span style={{ color: T.text }}>{naira(item.amount)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 12px", fontFamily: "DM Mono, monospace", fontSize: 14 }}>
                <span style={{ color: T.textSec }}>Total</span>
                <span style={{ color: T.green, fontWeight: 500 }}>{naira(total)}</span>
              </div>
            </div>
          )}
          {/* Numpad */}
          <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, flex: 1 }}>
            {keys.map(k => (
              <motion.button key={k} whileTap={{ scale: 0.88 }} onClick={() => press(k)}
                style={{ ...glassStyle(T), borderRadius: 20, border: "none",
                  fontFamily: k === "⌫" ? "inherit" : "DM Mono, monospace",
                  fontSize: k === "⌫" ? 14 : 22, color: T.text,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                {k === "⌫" ? <I name="x" size={20} color={T.text} /> : k}
              </motion.button>
            ))}
          </div>
          {/* Actions */}
          <div style={{ padding: "12px 16px 28px", display: "flex", gap: 10 }}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={addToCart}
              style={{ flex: 1, ...glassStyle(T), border: `0.5px solid ${T.glassBorder}`,
                borderRadius: 18, padding: "14px", cursor: "pointer", color: T.text,
                fontFamily: "Instrument Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>
              + Add Item
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={charge} disabled={total === 0}
              style={{ flex: 2, background: total > 0 ? T.green : T.textMuted, border: "none",
                borderRadius: 18, padding: "14px", cursor: total > 0 ? "pointer" : "default",
                color: "#fff", fontFamily: "Instrument Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>
              Charge {total > 0 ? naira(total) : ""}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── BANK SYNC ────────────────────────────────────────────────────────────────
const BANKS = [
  { name: "GTBank",     last4: "4521", balance: 1240000, color: "#FF6600", synced: true,  lastSync: "2 mins ago"  },
  { name: "Access Bank",last4: "7890", balance:  875000, color: "#E30613", synced: true,  lastSync: "5 mins ago"  },
  { name: "Zenith Bank",last4: "1234", balance:  340000, color: "#10547A", synced: false, lastSync: "Not synced"  },
];
function BankSync({ pop, T }) {
  const [banks, setBanks] = useState(BANKS);
  const [syncing, setSyncing] = useState(null);
  const doSync = (name) => {
    setSyncing(name);
    setTimeout(() => {
      setBanks(b => b.map(bk => bk.name === name ? { ...bk, synced: true, lastSync: "Just now" } : bk));
      setSyncing(null);
    }, 1800);
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Bank Sync" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <GCard T={T} style={{ padding: "16px 18px", marginBottom: 24 }}>
          <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12, color: T.textSec, marginBottom: 4 }}>Total across accounts</div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 28, color: T.text }}>
            {naira(banks.reduce((s, b) => s + b.balance, 0))}
          </div>
        </GCard>
        {banks.map((bank, i) => (
          <motion.div key={bank.name}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{ ...glassStyle(T), borderRadius: 24, padding: "16px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: bank.color,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I name="bank" size={22} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 15,
                  fontWeight: 600, color: T.text }}>{bank.name}</div>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: T.textSec }}>
                  ••••{bank.last4} · {bank.lastSync}
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => doSync(bank.name)}
                style={{ background: bank.synced ? T.green + "22" : T.accent + "22",
                  border: `0.5px solid ${bank.synced ? T.green : T.accent}44`,
                  borderRadius: 99, padding: "6px 14px", cursor: "pointer",
                  fontFamily: "Instrument Sans, sans-serif", fontSize: 12, fontWeight: 600,
                  color: bank.synced ? T.green : T.accent }}>
                {syncing === bank.name ? "…" : bank.synced ? "Synced" : "Sync"}
              </motion.button>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${T.divider}`,
              display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12, color: T.textSec }}>Balance</span>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: T.text }}>{naira(bank.balance)}</span>
            </div>
          </motion.div>
        ))}
        <motion.button whileTap={{ scale: 0.97 }}
          style={{ width: "100%", ...glassStyle(T), border: `0.5px solid ${T.accent}44`,
            borderRadius: 18, padding: "15px", marginTop: 8, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            color: T.accent, fontFamily: "Instrument Sans, sans-serif", fontSize: 14, fontWeight: 600 }}>
          <I name="plus" size={18} color={T.accent} strokeWidth={2.2} /> Connect New Bank
        </motion.button>
      </div>
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
function Payments({ pop, T }) {
  const [copied, setCopied] = useState(false);
  const link = "pay.nukodes.app/kofi";
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const methods = [
    { icon: "link",       label: "Payment Link",  sub: "Share a link to collect payment",      color: T.accent },
    { icon: "scan",       label: "QR Code",        sub: "Let customers scan to pay",            color: "#BF5AF2" },
    { icon: "creditCard", label: "Card Terminal",  sub: "Accept Visa & Mastercard online",      color: T.green  },
    { icon: "bank",       label: "Bank Transfer",  sub: "Receive directly to your GTBank",      color: T.orange },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Payments" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        {/* QR graphic */}
        <GCard T={T} style={{ padding: "20px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ width: 120, height: 120, margin: "0 auto 12px",
            background: T.text === "rgba(255,255,255,0.92)" ? "#fff" : "#000",
            borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I name="scan" size={80} color={T.text === "rgba(255,255,255,0.92)" ? "#000" : "#fff"} />
          </div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: T.text,
            marginBottom: 8 }}>{link}</div>
          <motion.button whileTap={{ scale: 0.93 }} onClick={copy}
            style={{ background: copied ? T.green : T.accent, border: "none", borderRadius: 99,
              padding: "8px 20px", cursor: "pointer", color: "#fff",
              fontFamily: "Instrument Sans, sans-serif", fontSize: 13, fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I name={copied ? "check" : "copy"} size={14} color="#fff" />
            {copied ? "Copied!" : "Copy link"}
          </motion.button>
        </GCard>

        <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: T.textMuted,
          letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>
          Payment methods
        </div>
        {methods.map((m, i) => (
          <motion.div key={m.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
              marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: 13,
              background: m.color + "22", display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0 }}>
              <I name={m.icon} size={20} color={m.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                fontWeight: 600, color: T.text }}>{m.label}</div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
                color: T.textSec }}>{m.sub}</div>
            </div>
            <I name="chevR" size={15} color={T.textMuted} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── PAYROLL ──────────────────────────────────────────────────────────────────
const TEAM = [
  { id:"t1", name:"Bola Okafor",  role:"Sales Associate", salary:80000,  status:"paid"    },
  { id:"t2", name:"Emeka Dike",   role:"Inventory Mgr",   salary:95000,  status:"pending" },
  { id:"t3", name:"Amaka Eze",    role:"Accountant",      salary:120000, status:"pending" },
  { id:"t4", name:"Sola Adewale", role:"Driver",          salary:55000,  status:"paid"    },
];
function Payroll({ pop, T }) {
  const [team, setTeam] = useState(TEAM);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const pending = team.filter(t => t.status === "pending");
  const runPayroll = () => {
    setRunning(true);
    setTimeout(() => {
      setTeam(t => t.map(m => ({ ...m, status: "paid" })));
      setRunning(false); setDone(true);
    }, 2200);
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Payroll" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {[
            { l: "Monthly Payroll", v: naira(team.reduce((s, t) => s + t.salary, 0)), c: T.text },
            { l: "Pending",         v: naira(pending.reduce((s, t) => s + t.salary, 0)), c: T.orange },
          ].map(s => (
            <GCard key={s.l} T={T} style={{ flex: 1, padding: "14px" }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11, color: T.textSec, marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 15, color: s.c }}>{s.v}</div>
            </GCard>
          ))}
        </div>
        {team.map((member, i) => (
          <motion.div key={member.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
              marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name={member.name} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                fontWeight: 600, color: T.text }}>{member.name}</div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                color: T.textSec }}>{member.role}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: T.text }}>{naira(member.salary)}</div>
              <StatusPill status={member.status} T={T} />
            </div>
          </motion.div>
        ))}
        {!done && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={runPayroll} disabled={running || pending.length === 0}
            style={{ width: "100%", background: pending.length > 0 ? T.accent : T.textMuted,
              border: "none", borderRadius: 18, padding: "16px", marginTop: 8, cursor: "pointer",
              color: "#fff", fontFamily: "Instrument Sans, sans-serif", fontSize: 15, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {running ? <><I name="refresh" size={16} color="#fff" /> Processing…</> : `Run Payroll — ${naira(pending.reduce((s, t) => s + t.salary, 0))}`}
          </motion.button>
        )}
        {done && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "16px",
              background: T.green + "18", borderRadius: 18, marginTop: 8 }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: T.green }}>
              ✓ All salaries paid successfully
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── FINANCIAL REPORTS ────────────────────────────────────────────────────────
const REPORT_MONTHS = ["Oct","Nov","Dec","Jan","Feb","Mar"];
const REVENUE_DATA  = [580000, 920000, 1100000, 780000, 1050000, 1250000];
const EXPENSE_DATA  = [220000, 315000,  410000, 290000,  380000,  430000];
function Reports({ pop, T }) {
  const [tab, setTab] = useState("PnL");
  const profit = REVENUE_DATA.map((r, i) => r - EXPENSE_DATA[i]);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Financial Reports" onBack={pop} T={T} />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["PnL","Balance","Cash"].map(t => (
            <motion.button key={t} whileTap={{ scale: 0.93 }} onClick={() => setTab(t)}
              style={{ ...glassStyle(T), border: "none", borderRadius: 99, padding: "8px 16px",
                cursor: "pointer", background: tab === t ? T.accent : T.glass,
                fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500,
                color: tab === t ? "#fff" : T.textSec }}>
              {t}
            </motion.button>
          ))}
        </div>

        {tab === "PnL" && (
          <>
            <GCard T={T} style={{ padding: "18px", marginBottom: 20 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12, color: T.textSec, marginBottom: 10 }}>
                6-Month Revenue vs Expenses
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
                {REPORT_MONTHS.map((m, i) => {
                  const maxR = Math.max(...REVENUE_DATA);
                  return (
                    <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                        <motion.div initial={{ height: 0 }}
                          animate={{ height: `${(REVENUE_DATA[i] / maxR) * 56}px` }}
                          transition={{ delay: i * 0.07, type: "spring", stiffness: 180, damping: 20 }}
                          style={{ background: T.accent, borderRadius: "3px 3px 0 0", minHeight: 2 }} />
                        <motion.div initial={{ height: 0 }}
                          animate={{ height: `${(EXPENSE_DATA[i] / maxR) * 56}px` }}
                          transition={{ delay: i * 0.07 + 0.04, type: "spring", stiffness: 180, damping: 20 }}
                          style={{ background: T.red + "99", borderRadius: "3px 3px 0 0", minHeight: 2 }} />
                      </div>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: T.textMuted }}>{m}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                {[{ c: T.accent, l: "Revenue" }, { c: T.red, l: "Expenses" }].map(x => (
                  <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c }} />
                    <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11, color: T.textSec }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </GCard>
            {[
              { label: "Total Revenue",  value: naira(REVENUE_DATA.reduce((a,b)=>a+b,0)), color: T.green  },
              { label: "Total Expenses", value: naira(EXPENSE_DATA.reduce((a,b)=>a+b,0)), color: T.red    },
              { label: "Gross Profit",   value: naira(profit.reduce((a,b)=>a+b,0)),       color: T.accent },
              { label: "Profit Margin",  value: "59.3%",                                   color: T.text   },
              { label: "VAT Collected",  value: naira(187500),                             color: T.orange },
            ].map((row, i) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "13px 0",
                borderBottom: i < 4 ? `0.5px solid ${T.divider}` : "none" }}>
                <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14, color: T.textSec }}>{row.label}</span>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: row.color, fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
          </>
        )}

        {tab === "Balance" && (
          <div>
            {[
              { section: "Assets",       items: [{ l: "Cash & Bank", v: 2455000 }, { l: "Accounts Receivable", v: 1311250 }, { l: "Inventory", v: 875000 }] },
              { section: "Liabilities",  items: [{ l: "Accounts Payable", v: 170700 }, { l: "VAT Payable", v: 187500 }] },
              { section: "Equity",       items: [{ l: "Owner Equity", v: 4282050 }] },
            ].map(sec => (
              <div key={sec.section} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: T.textMuted,
                  letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 10 }}>{sec.section}</div>
                <GCard T={T} style={{ overflow: "hidden" }}>
                  {sec.items.map((item, i) => (
                    <div key={item.l} style={{ display: "flex", justifyContent: "space-between",
                      padding: "13px 16px",
                      borderBottom: i < sec.items.length - 1 ? `0.5px solid ${T.divider}` : "none" }}>
                      <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14, color: T.textSec }}>{item.l}</span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: T.text }}>{naira(item.v)}</span>
                    </div>
                  ))}
                </GCard>
              </div>
            ))}
          </div>
        )}

        {tab === "Cash" && (
          <>
            <GCard T={T} style={{ padding: "16px 18px", marginBottom: 20 }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12, color: T.textSec, marginBottom: 4 }}>Net Cash Position</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 28, color: T.green }}>₦2,455,000</div>
              <Spark data={[65,72,68,80,75,88,90]} color={T.green} h={36} />
            </GCard>
            {[
              { l: "Operating Cash Flow",  v: naira(820000), color: T.green  },
              { l: "Investing Activities", v: `-${naira(145000)}`, color: T.red },
              { l: "Financing Activities", v: naira(0), color: T.textSec },
              { l: "Net Change",           v: naira(675000), color: T.accent },
            ].map((row, i) => (
              <div key={row.l} style={{ display: "flex", justifyContent: "space-between",
                padding: "13px 0", borderBottom: i < 3 ? `0.5px solid ${T.divider}` : "none" }}>
                <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14, color: T.textSec }}>{row.l}</span>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 14, color: row.color }}>{row.v}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── AI INSIGHTS ──────────────────────────────────────────────────────────────
const INSIGHTS = [
  { emoji: "🔥", title: "Revenue spike detected", body: "Your Tuesday sales are 34% higher than average. Consider running promotions on low-traffic days.", tag: "Opportunity", tagColor: "#30D158" },
  { emoji: "⚠️", title: "Cash runway alert", body: "At your current burn rate, you have ~6 months of runway. Consider deferring the ₦145k equipment purchase.", tag: "Warning", tagColor: "#FF9F0A" },
  { emoji: "📦", title: "Low stock alert", body: "Rice (50kg) and Palm Oil are on track to run out within 2 weeks based on sales velocity.", tag: "Inventory", tagColor: "#0A84FF" },
  { emoji: "🤝", title: "Customer retention", body: "Iya Bisi Stores hasn't placed an order in 14 days. A follow-up now could recover ~₦85k in sales.", tag: "CRM", tagColor: "#BF5AF2" },
  { emoji: "💡", title: "Tax optimisation", body: "You can defer ₦43k of eligible VAT to next quarter by reclassifying 3 recent expense categories.", tag: "Tax Saving", tagColor: "#FF9F0A" },
];
function AIInsights({ pop, T }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="AI Insights" onBack={pop} T={T}
        right={
          <div style={{ ...glassStyle(T), borderRadius: 99, padding: "5px 10px",
            display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green }} />
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: T.green }}>Live</span>
          </div>
        } />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 13, color: T.textSec,
          marginBottom: 20, lineHeight: 1.5 }}>
          Nukodes AI has analysed your last 90 days. Here are your top insights.
        </div>
        {INSIGHTS.map((ins, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ ...glassStyle(T), borderRadius: 24, padding: "18px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{ins.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, color: T.text }}>
                    {ins.title}
                  </span>
                  <span style={{ background: ins.tagColor + "22", borderRadius: 99, padding: "2px 8px",
                    fontFamily: "DM Mono, monospace", fontSize: 9, color: ins.tagColor, flexShrink: 0 }}>
                    {ins.tag}
                  </span>
                </div>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 13, color: T.textSec,
                  lineHeight: 1.55 }}>{ins.body}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── STOCK COUNT ──────────────────────────────────────────────────────────────
function StockCount({ pop, data, T }) {
  const [items, setItems] = useState(data.products.map(p => ({ ...p, counted: p.stock })));
  const [saved, setSaved] = useState(false);
  const update = (id, delta) => setItems(it => it.map(i => i.id === id ? { ...i, counted: Math.max(0, i.counted + delta) } : i));
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Stock Count" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={save}
            style={{ background: saved ? T.green : T.accent, border: "none", borderRadius: 99,
              padding: "7px 14px", cursor: "pointer", color: "#fff",
              fontFamily: "Instrument Sans, sans-serif", fontSize: 12, fontWeight: 600 }}>
            {saved ? "Saved ✓" : "Save"}
          </motion.button>
        } />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 40px" }}>
        <GCard T={T} style={{ padding: "12px 16px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 10 }}>
          <I name="scan" size={20} color={T.accent} />
          <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
            color: T.textSec }}>Tap + / - to adjust quantities</span>
        </GCard>
        {items.map((item, i) => {
          const diff = item.counted - item.stock;
          return (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
                marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13,
                background: T.accent + "18", display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0 }}>
                <I name="box" size={20} color={T.accent} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: 500, color: T.text }}>{item.name}</div>
                {diff !== 0 && (
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                    color: diff > 0 ? T.green : T.red }}>
                    {diff > 0 ? `+${diff}` : diff} vs system
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => update(item.id, -1)}
                  style={{ width: 32, height: 32, borderRadius: 10, background: T.red + "22",
                    border: "none", cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center", color: T.red, fontSize: 18 }}>
                  −
                </motion.button>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 16,
                  color: T.text, minWidth: 28, textAlign: "center" }}>{item.counted}</span>
                <motion.button whileTap={{ scale: 0.8 }} onClick={() => update(item.id, 1)}
                  style={{ width: 32, height: 32, borderRadius: 10, background: T.green + "22",
                    border: "none", cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center", color: T.green, fontSize: 18 }}>
                  +
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const NOTIFS = [
  { id:"n1", icon:"check",      color:"#30D158", title:"Invoice paid",           body:"Kofi Ent. paid INV-001246 · ₦618,750",      time:"2m ago",   read:false },
  { id:"n2", icon:"alert",      color:"#FF9F0A", title:"Payment overdue",        body:"Sarah Smith · INV-001243 is 15 days overdue", time:"1h ago",   read:false },
  { id:"n3", icon:"sync",       color:"#0A84FF", title:"Sync complete",          body:"4 records uploaded to the cloud",            time:"3h ago",   read:true  },
  { id:"n4", icon:"box",        color:"#FF453A", title:"Low stock warning",      body:"Palm Oil · only 12 units remaining",         time:"Yesterday",read:true  },
  { id:"n5", icon:"sparkle",    color:"#BF5AF2", title:"New AI insight ready",  body:"Revenue spike detected this Tuesday",        time:"Yesterday",read:true  },
  { id:"n6", icon:"bank",       color:"#FF6600", title:"Bank sync failed",       body:"GTBank session expired — tap to reconnect",  time:"2 days ago",read:true },
];
function Notifications({ pop, T }) {
  const [notifs, setNotifs] = useState(NOTIFS);
  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const unread = notifs.filter(n => !n.read).length;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Notifications" onBack={pop} T={T}
        right={unread > 0 && (
          <motion.button whileTap={{ scale: 0.9 }} onClick={markAll}
            style={{ background: "none", border: "none", cursor: "pointer",
              fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
              color: T.accent }}>Mark all read</motion.button>
        )} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 40px" }}>
        {notifs.map((n, i) => (
          <motion.div key={n.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
            style={{ ...glassStyle(T), borderRadius: 20, padding: "14px 16px",
              marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 12,
              cursor: "pointer", opacity: n.read ? 0.65 : 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: n.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I name={n.icon} size={18} color={n.color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                  fontWeight: n.read ? 400 : 600, color: T.text }}>{n.title}</span>
                {!n.read && <div style={{ width: 7, height: 7, borderRadius: "50%",
                  background: T.accent, flexShrink: 0 }} />}
              </div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 12,
                color: T.textSec, lineHeight: 1.45 }}>{n.body}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                color: T.textMuted, marginTop: 5 }}>{n.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── CASH FLOW DETAIL ─────────────────────────────────────────────────────────
const CF_WEEKLY = [
  { week: "W1 Mar", income: 820000, expense: 210000 },
  { week: "W2 Mar", income: 1140000, expense: 340000 },
  { week: "W3 Mar", income: 930000,  expense: 280000 },
  { week: "W4 Mar", income: 1250000, expense: 430000 },
];
function CashFlowDetail({ pop, T }) {
  const [range, setRange] = useState("weekly");
  const [dateRange, setDateRange] = useState(null);
  const [showRange, setShowRange] = useState(false);
  const net = CF_WEEKLY.reduce((s, w) => s + w.income - w.expense, 0);
  const maxInc = Math.max(...CF_WEEKLY.map(w => w.income));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Cash Flow" onBack={pop} T={T}
        right={
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowRange(true)}
            style={{ ...glassStyle(T), border: "none", borderRadius: 12,
              padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <I name="sliders" size={14} color={T.accent} />
            <span style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11, color: T.accent }}>
              {dateRange ? `${dateRange.start} → ${dateRange.end}` : "Filter"}
            </span>
          </motion.button>
        } />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 40px" }}>
        {/* Summary tiles */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[
            { l: "Total In",  v: naira(CF_WEEKLY.reduce((s,w) => s+w.income, 0)),  c: T.green  },
            { l: "Total Out", v: naira(CF_WEEKLY.reduce((s,w) => s+w.expense, 0)), c: T.red    },
            { l: "Net",       v: naira(net),                                         c: T.accent },
          ].map(s => (
            <GCard key={s.l} T={T} style={{ flex: 1, padding: "12px 10px" }}>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 9, color: T.textSec, marginBottom: 3 }}>{s.l}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: s.c }}>{s.v}</div>
            </GCard>
          ))}
        </div>
        {/* Period tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["daily","weekly","monthly"].map(r => (
            <motion.button key={r} whileTap={{ scale: 0.93 }} onClick={() => setRange(r)}
              style={{ flex: 1, ...glassStyle(T), border: "none", borderRadius: 99, padding: "7px 4px",
                cursor: "pointer", background: range === r ? T.accent : T.glass,
                fontFamily: "DM Mono, monospace", fontSize: 10, color: range === r ? "#fff" : T.textSec,
                textTransform: "capitalize" }}>
              {r}
            </motion.button>
          ))}
        </div>
        {/* Chart */}
        <GCard T={T} style={{ padding: "16px", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100 }}>
            {CF_WEEKLY.map((w, i) => (
              <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 82 }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(w.income / maxInc) * 80}px` }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 160, damping: 18 }}
                    style={{ flex: 1, background: T.accent, borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(w.expense / maxInc) * 80}px` }}
                    transition={{ delay: i * 0.1 + 0.05, type: "spring", stiffness: 160, damping: 18 }}
                    style={{ flex: 1, background: T.red + "99", borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                </div>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 8, color: T.textMuted, textAlign: "center" }}>
                  {w.week.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </GCard>
        {/* Weekly breakdown */}
        {CF_WEEKLY.map((w, i) => (
          <div key={w.week} style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "13px 0",
            borderBottom: i < CF_WEEKLY.length - 1 ? `0.5px solid ${T.divider}` : "none" }}>
            <div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 14,
                fontWeight: 500, color: T.text }}>{w.week}</div>
              <div style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: 11,
                color: T.textSec }}>Net: {naira(w.income - w.expense)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: T.green }}>+{naira(w.income)}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: T.red }}>-{naira(w.expense)}</div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {showRange && <DateRangeSheet onClose={() => setShowRange(false)}
          onSelect={r => setDateRange(r)} T={T} />}
      </AnimatePresence>
    </div>
  );
}

// ─── PHONE SHELL ──────────────────────────────────────────────────────────────
function PhoneShell({ children, isDark }) {
  return (
    <div style={{
      width: 393, height: 852, borderRadius: 54, overflow: "hidden",
      background: isDark ? DARK.bg : LIGHT.bg,
      boxShadow: isDark
        ? "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)"
        : "0 40px 120px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(0,0,0,0.12)",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      {children}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function NukodesAppV4() {
  const [isDark, setIsDark] = useState(true);
  const [tab, setTab]       = useState("dashboard");
  const [stack, setStack]   = useState([]);
  const [fabOpen, setFabOpen] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const store = useStore();
  const T = isDark ? DARK : LIGHT;

  // Scale to viewport
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 393, window.innerHeight / 852) * 0.95);
    calc(); window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const scrollRef = useRef(null);
  const { scrollY } = useScroll({ container: scrollRef });

  const push = (screen) => setStack(s => [...s, screen]);
  const pop  = ()       => setStack(s => s.slice(0, -1));

  const isInner = stack.length > 0;
  const current = stack[stack.length - 1];

  const sharedProps = { push, pop, T, data: store.data, online: store.online,
    plan: store.plan, onUpgrade: () => setUpgrade(true), add: store.add };

  const renderInner = () => {
    switch (current) {
      case "invoices":    return <InvoiceList   {...sharedProps} />;
      case "addInvoice":  return <AddInvoice    {...sharedProps} />;
      case "expenses":    return <ExpenseList   {...sharedProps} />;
      case "addExpense":  return <AddExpense    {...sharedProps} />;
      case "sales":       return <SalesList     {...sharedProps} />;
      case "addSale":     return <AddSale       {...sharedProps} />;
      case "customers":   return <Customers     {...sharedProps} />;
      case "addCustomer": return <AddCustomer   {...sharedProps} />;
      case "products":    return <Products      {...sharedProps} />;
      case "addProduct":  return <AddProduct    {...sharedProps} />;
      case "pos":         return <POSTerminal   {...sharedProps} />;
      case "bankSync":    return <BankSync      {...sharedProps} />;
      case "payments":    return <Payments      {...sharedProps} />;
      case "payroll":     return <Payroll       {...sharedProps} />;
      case "reports":     return <Reports       {...sharedProps} />;
      case "aiInsights":  return <AIInsights    {...sharedProps} />;
      case "stockCount":  return <StockCount    {...sharedProps} />;
      case "cashflow":    return <CashFlowDetail {...sharedProps} />;
      case "notifications": return <Notifications {...sharedProps} />;
      default:            return null;
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "dashboard": return <Dashboard  {...sharedProps} />;
      case "services":  return <Services   {...sharedProps} />;
      case "taxes":     return <Taxes      {...sharedProps} />;
      case "profile":   return <Profile    {...sharedProps} isDark={isDark} toggleTheme={() => setIsDark(d => !d)} />;
      default:          return <Dashboard  {...sharedProps} />;
    }
  };

  return (
    <>
      <style>{`
        ${FONTS}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden;
          background: ${isDark ? "#050505" : "#C8CAD4"}; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
      `}</style>

      <div style={{ width: "100vw", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isDark
          ? "radial-gradient(ellipse at 50% 30%, #0D1A2E 0%, #050505 70%)"
          : "radial-gradient(ellipse at 50% 30%, #D8DAE8 0%, #C0C3D0 70%)",
        transition: "background 0.4s ease" }}>

        <div style={{ transform: `scale(${scale})`, transformOrigin: "center", flexShrink: 0 }}>
          <PhoneShell isDark={isDark}>
            {/* Status bar */}
            <div style={{ height: 48, display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 28px",
              fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 500,
              color: T.text, flexShrink: 0, zIndex: 10 }}>
              <span>9:41</span>
              <div style={{ display: "flex", gap: 5 }}>
                <I name="activity" size={14} color={T.text} />
                <I name="sync" size={14} color={T.text} />
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                {isInner ? (
                  <motion.div key={current}
                    initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                    {renderInner()}
                  </motion.div>
                ) : (
                  <motion.div key={tab}
                    initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 340, damping: 32 }}
                    style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                    {renderTab()}
                    <TabBar tab={tab} setTab={t => { setTab(t); setStack([]); }}
                      scrollY={scrollY} onFab={() => setFabOpen(true)} T={T} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FAB sheet */}
              <AnimatePresence>
                {fabOpen && <FabSheet onClose={() => setFabOpen(false)} push={id => { push(id); setFabOpen(false); }} T={T} />}
              </AnimatePresence>

              {/* Upgrade sheet */}
              <AnimatePresence>
                {upgrade && <UpgradeSheet onClose={() => setUpgrade(false)} T={T} />}
              </AnimatePresence>
            </div>
          </PhoneShell>
        </div>
      </div>
    </>
  );
}
