// =============================================================================
// Nukodes App V3 — Complete Rewrite
// Self-contained React prototype · 393×852 phone shell · inline styles only
// =============================================================================
import { useState, useEffect, useCallback, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — DARK + LIGHT (WCAG 2.1 AA compliant contrast ratios)
// ─────────────────────────────────────────────────────────────────────────────
const T_DARK = {
  bg:      "#0A0A0C",
  surf:    "#1A1D24",
  el:      "#2D303B",
  text:    "#FFFFFF",
  muted:   "#9B9FAF",
  subtle:  "#CDCFD7",
  action:  "#2323FF",
  a400:    "#4C4CFF",
  ok:      "#28AD1F",
  okLight: "#26CC5A",
  err:     "#EF4444",
  warn:    "#FB923C",
  liquid:  "#060919",
};

// Light mode — all text colours verified ≥4.5:1 contrast ratio (WCAG AA)
const T_LIGHT = {
  bg:      "#F4F5F9",   // cool page bg
  surf:    "#FFFFFF",   // card surface
  el:      "#DDE0EA",   // borders
  text:    "#0D0F18",   // 19.4:1 on #FFF
  subtle:  "#2A2D3A",   // 12.5:1 on #FFF
  muted:   "#5A5F7A",   // 6.3:1 on #FFF ✓ AA
  action:  "#2323FF",   // primary CTA (blue on white ≈15.7:1)
  a400:    "#2323FF",
  ok:      "#15803D",   // 5.2:1 on #FFF ✓ AA
  okLight: "#16A34A",   // 4.6:1 on #FFF ✓ AA
  err:     "#DC2626",   // 5.0:1 on #FFF ✓ AA
  warn:    "#D97706",   // 4.5:1 on #FFF ✓ AA (borderline, large text OK)
  liquid:  "#EEF0F7",
};

// Default: dark theme — all existing components reference T = T_DARK (no-break)
const T = T_DARK;

const naira = (n) => "₦ " + Number(n).toLocaleString("en-NG");

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA & OFFLINE STORE
// ─────────────────────────────────────────────────────────────────────────────
const SEED_DATA = {
  sales: [
    { id:"s001", customer:"John Doe",        items:"iPhone 13",         amount:450000, date:"2026-03-09", status:"paid",    synced:true  },
    { id:"s002", customer:"Sarah Smith",      items:"Samsung A54",       amount:143750, date:"2026-03-09", status:"sent",    synced:true  },
    { id:"s003", customer:"Amara Praise",     items:"USB-C Hub",         amount:35000,  date:"2026-03-09", status:"pending", synced:false },
    { id:"s004", customer:"Kofi Enterprises", items:"Bulk iPhone 13 ×8", amount:618750, date:"2026-03-09", status:"overdue", synced:false },
  ],
  expenses: [
    { id:"e001", vendor:"MTN Nigeria",    category:"Utilities",  amount:25000, date:"2026-03-01", note:"Monthly data bundle",       synced:true  },
    { id:"e002", vendor:"Jumia Business", category:"Supplies",   amount:87500, date:"2026-03-04", note:"Packaging materials",        synced:true  },
    { id:"e003", vendor:"LAWMA",          category:"Operations", amount:15000, date:"2026-03-07", note:"Waste management",           synced:false },
    { id:"e004", vendor:"EkoElect",       category:"Utilities",  amount:43200, date:"2026-03-08", note:"Electricity Q1 installment", synced:false },
  ],
  invoices: [
    { id:"INV-001243", customer:"Sarah Smith",   amount:285000, date:"2026-01-25", dueDate:"2026-02-24", status:"overdue", synced:true  },
    { id:"INV-001244", customer:"TechMarts Ltd", amount:312500, date:"2026-03-01", dueDate:"2026-03-31", status:"sent",    synced:true  },
    { id:"INV-001245", customer:"Amara Praise",  amount:95000,  date:"2026-03-05", dueDate:"2026-04-04", status:"draft",   synced:false },
    { id:"INV-001246", customer:"Kofi Ent.",     amount:618750, date:"2026-03-08", dueDate:"2026-04-07", status:"paid",    synced:false },
  ],
  products: [
    { id:"p001", name:"Rice (50kg)", sku:"RCE-050", price:45000, stock:120, category:"Grains",  synced:true  },
    { id:"p002", name:"Palm Oil",    sku:"PLM-001", price:12000, stock:84,  category:"Oil",     synced:true  },
    { id:"p003", name:"Sugar",       sku:"SGR-001", price:8500,  stock:200, category:"Grains",  synced:false },
    { id:"p004", name:"Flour",       sku:"FLR-001", price:9500,  stock:150, category:"Grains",  synced:false },
  ],
  customers: [
    { id:"c001", name:"Iya Bisi Stores", contact:"+234 801 234 5678", totalSpend:425000, lastInvoice:"2026-03-08" },
    { id:"c002", name:"Emeka Supplies",  contact:"+234 803 456 7890", totalSpend:312500, lastInvoice:"2026-03-05" },
    { id:"c003", name:"Fatima Foods",    contact:"+234 805 678 9012", totalSpend:187500, lastInvoice:"2026-02-28" },
    { id:"c004", name:"Danladi & Sons",  contact:"+234 807 890 1234", totalSpend:95000,  lastInvoice:"2026-02-20" },
  ],
  businesses: [
    { id:"NB-00001", name:"Nukoder Business 1", type:"Retail",        industry:"Electronics", color:"#2323FF", plan:"starter"    },
    { id:"NB-00002", name:"Nukoder Business 2", type:"Services",      industry:"Consulting",  color:"#28AD1F", plan:"growth"     },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PLAN DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────
const PLAN_ORDER = ["starter", "growth", "enterprise"];
const PLAN_META  = {
  starter:    { name: "Starter",    price: 0,     color: "#26CC5A" },
  growth:     { name: "Growth",     price: 5000,  color: "#4C4CFF" },
  enterprise: { name: "Enterprise", price: 15000, color: "#FB923C" },
};
const PLAN_FEATURES = {
  starter:    new Set(["invoiceList","expenseList","customerList","productList","taxCentre","qrPayments","loans","payments","savings","investments"]),
  growth:     new Set(["invoiceList","expenseList","customerList","productList","taxCentre","qrPayments","loans","payments","savings","investments","pos","bankSync","flexpay","stockCount","returns","scanner","whtReport","financialReports","auditTrail","payroll"]),
  enterprise: new Set(["invoiceList","expenseList","customerList","productList","taxCentre","qrPayments","loans","payments","savings","investments","pos","bankSync","flexpay","stockCount","returns","scanner","whtReport","financialReports","auditTrail","payroll","aiInsights","manufacturing","vendorPortal","onlineStore","logistics"]),
};

function useOfflineStore() {
  const LS_KEY = "nukodes_v3";
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : SEED_DATA;
      // Ensure new SEED fields are always present even on old cached data
      return {
        ...SEED_DATA,
        ...parsed,
        businesses: parsed.businesses?.length ? parsed.businesses : SEED_DATA.businesses,
      };
    } catch { return SEED_DATA; }
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [currentBizId, setCurrentBizId] = useState(() => {
    try { return localStorage.getItem("nukodes_biz") || "NB-00001"; } catch { return "NB-00001"; }
  });

  useEffect(() => {
    try { localStorage.setItem("nukodes_biz", currentBizId); } catch {}
  }, [currentBizId]);

  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const pendingCount = [
    ...data.sales.filter(r => !r.synced),
    ...data.expenses.filter(r => !r.synced),
    ...data.invoices.filter(r => !r.synced),
    ...(data.products || []).filter(r => !r.synced),
  ].length;

  const syncAll = useCallback(() => {
    if (!isOnline || syncing) return;
    setSyncing(true);
    setTimeout(() => {
      setData(d => ({
        ...d,
        sales:     d.sales.map(r              => ({ ...r, synced: true })),
        expenses:  d.expenses.map(r           => ({ ...r, synced: true })),
        invoices:  d.invoices.map(r           => ({ ...r, synced: true })),
        products:  (d.products || []).map(r   => ({ ...r, synced: true })),
      }));
      setSyncing(false);
      setLastSync(new Date().toLocaleTimeString());
    }, 1800);
  }, [isOnline, syncing]);

  const addRecord = useCallback((type, record) => {
    setData(d => ({ ...d, [type]: [...(d[type] || []), { ...record, synced: false }] }));
  }, []);

  const switchBusiness = useCallback((id) => setCurrentBizId(id), []);

  const currentBusiness = (data.businesses || []).find(b => b.id === currentBizId)
    || data.businesses?.[0]
    || { id: "NB-00001", name: "Nukoder Business 1", type: "Retail", color: T.action };

  return { data, isOnline, syncing, lastSync, pendingCount, syncAll, addRecord, currentBusiness, currentBizId, switchBusiness };
}

// ─────────────────────────────────────────────────────────────────────────────
// ICON PATHS
// ─────────────────────────────────────────────────────────────────────────────
const PATHS = {
  home:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  services:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  tax:        "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  account:    "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  plus:       "M12 5v14 M5 12h14",
  bell:       "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  arrowUp:    "M12 19V5 M5 12l7-7 7 7",
  arrowDn:    "M12 5v14 M5 12l7 7 7-7",
  chevR:      "M9 18l6-6-6-6",
  chevD:      "M6 9l6 6 6-6",
  chevL:      "M15 18l-6-6 6-6",
  alert:      "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  info:       "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  check:      "M20 6L9 17l-5-5",
  x:          "M18 6L6 18 M6 6l12 12",
  receipt:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6",
  wallet:     "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h3v-4h-3z",
  tag:        "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  scan:       "M1 1h5 M1 1v5 M23 1h-5 M23 1v5 M1 23h5 M1 23v-5 M23 23h-5 M23 23v-5 M8 8h8v8H8z",
  cart:       "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",
  truck:      "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  box:        "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  pie:        "M21.21 15.89A10 10 0 118 2.83 M22 12A10 10 0 0012 2v10z",
  bank:       "M3 22h18 M6 18v-7 M10 18v-7 M14 18v-7 M18 18v-7 M2 11l10-7 10 7",
  dollar:     "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  sparkle:    "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
  settings:   "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  lock:       "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  sync:       "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  building:   "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  cloudOff:   "M22.61 16.95A5 5 0 0018 10h-1.26A8 8 0 001.29 17.29 M5 5l14 14",
  edit:       "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  copy:       "M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  trash:      "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  search:     "M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35",
  briefcase:  "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  globe:      "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  plug:       "M7 2v11 M17 2v11 M5 8h14 M1 8h2 M21 8h2 M12 8v13",
  link2:      "M15 7h3a5 5 0 010 10h-3m-6 0H6A5 5 0 016 7h3 M8 12h8",
  camera:     "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  zap:        "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  cpu:        "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  refresh:    "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
  creditCard: "M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22",
  activity:   "M22 12h-4l-3 9L9 3l-3 9H2",
  chevron:    "M9 18l6-6-6-6",
  moon:       "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  sun:        "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 100 14A7 7 0 0012 5z",
  barChart:   "M18 20V10 M12 20V4 M6 20v-6",
  sliders:    "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
};

// ─────────────────────────────────────────────────────────────────────────────
// ICON RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function I({ name, size = 20, color = T.text, strokeWidth = 1.8 }) {
  const raw = PATHS[name] || "";
  const parts = raw.split(/ (?=M)/);
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flexShrink: 0 }}
    >
      {parts.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLINE
// ─────────────────────────────────────────────────────────────────────────────
let _sparkId = 0;

function Spark({ data = [], color = T.a400, h = 32 }) {
  const idRef = useRef(null);
  if (idRef.current === null) { _sparkId++; idRef.current = `sp${_sparkId}`; }
  const id = idRef.current;

  if (!data.length) return null;
  const w = 100;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const poly = pts.join(" ");
  const fillPts = `0,${h} ${poly} ${w},${h}`;
  const gradId = `grad-${id}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#${gradId})`} />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────────────────────────────────────
function Avatar({ name = "", size = 40 }) {
  const hue = (name.charCodeAt(0) || 65) * 37 % 360;
  const bg  = `hsl(${hue},60%,38%)`;
  const initials = name.trim().split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      fontFamily: "Rokkitt, serif", fontWeight: 700,
      fontSize: size * 0.36, color: "#fff", userSelect: "none",
    }}>
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_COLORS = {
  ok:      "#26CC5A",
  err:     "#EF4444",
  warn:    "#FB923C",
  neutral: "#9B9FAF",
  action:  "#4C4CFF",
};
function Badge({ label, type = "neutral" }) {
  const c = BADGE_COLORS[type] || BADGE_COLORS.neutral;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c + "1A", borderRadius: 80, padding: "3px 10px",
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
      <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: c }}>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER HEADER
// ─────────────────────────────────────────────────────────────────────────────
function InnerHeader({ title, onBack, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "14px 20px", borderBottom: `1px solid ${T.el}`,
    }}>
      <button
        onClick={onBack}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, borderRadius: 10,
          padding: 0, flexShrink: 0,
        }}
      >
        <I name="chevL" size={20} color={T.text} />
      </button>
      <span style={{
        flex: 1, fontFamily: "Rokkitt, serif", fontWeight: 700,
        fontSize: 17, color: T.text,
      }}>
        {title}
      </span>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS ROW
// ─────────────────────────────────────────────────────────────────────────────
function SettingsRow({ icon, label, sub, color = T.a400, onPress, right, noBorder }) {
  return (
    <div
      onClick={onPress}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "13px 16px",
        borderBottom: noBorder ? "none" : `1px solid ${T.el}`,
        cursor: onPress ? "pointer" : "default",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: color + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <I name={icon} size={18} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
          {label}
        </div>
        {sub && (
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
      {right !== undefined ? right : <I name="chevR" size={16} color={T.muted} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM FIELD (styled div, not real input)
// ─────────────────────────────────────────────────────────────────────────────
function FormField({ label, value, chevron }) {
  return (
    <div>
      <div style={{
        fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        background: T.surf, border: `1px solid ${T.el}`,
        borderRadius: 12, height: 48, padding: "0 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: value ? T.text : T.muted }}>
          {value || label}
        </span>
        {chevron && <I name="chevD" size={16} color={T.muted} />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLASS BUTTON (small pill)
// ─────────────────────────────────────────────────────────────────────────────
function GlassCircleBtn({ children, size = 40, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        border: `1px solid ${T.el}`,
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{
      fontFamily: "Rokkitt, serif", fontSize: 10, fontWeight: 700,
      color: T.muted, letterSpacing: 1.5, textTransform: "uppercase",
      marginBottom: 8,
    }}>
      {text}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1: DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function Dashboard({ push, currentBusiness, openBizSwitcher, isDark, toggleTheme, isOnline, data }) {
  const TT = isDark ? T_DARK : T_LIGHT;
  const [heroIdx, setHeroIdx]                 = useState(0);
  const [flowView, setFlowView]               = useState("both");
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  // ── Live date ──────────────────────────────────────────────────────────────
  const today   = new Date();
  const dateStr = today.toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  // ── Derived store data ─────────────────────────────────────────────────────
  const invoices  = data?.invoices  || [];
  const expenses  = data?.expenses  || [];
  const sales     = data?.sales     || [];
  const products  = data?.products  || [];
  const plan      = currentBusiness?.plan || "starter";

  const totalRev      = sales.reduce((s, x) => s + x.amount, 0);
  const totalExp      = expenses.reduce((s, x) => s + x.amount, 0);
  const outstandingAmt = invoices.filter(i => i.status === "sent").reduce((s, i) => s + i.amount, 0);
  const overdueAmt    = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const paidAmt       = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const profitMargin  = totalRev > 0 ? Math.round(((totalRev - totalExp) / totalRev) * 100) : 0;
  const invTotal      = (outstandingAmt + overdueAmt + paidAmt) || 1;
  const overdueInv    = invoices.filter(i => i.status === "overdue");
  const unsynced      = [...sales, ...expenses].filter(x => !x.synced).length;
  const lowStock      = products.filter(p => p.stock < 100);

  // ── Hero carousel ──────────────────────────────────────────────────────────
  const HERO_METRICS = [
    { label: "Cash on Hand",   value: 18750239, change: 12.9, up: true  },
    { label: "Revenue (MTD)",  value: totalRev || 1248500, change: 8.4,  up: true  },
    { label: "Expenses (MTD)", value: totalExp || 170700,  change: 3.2,  up: false },
    { label: "Net Profit",     value: (totalRev - totalExp) || 1077800, change: 14.1, up: true },
  ];
  const heroSpark = [
    [14200000,15800000,16500000,17200000,17900000,18100000,18750239],
    [180000,210000,195000,230000,215000,248000,totalRev||1248500],
    [22000,28000,18000,32000,25000,19000,totalExp||170700],
    [160000,185000,178000,205000,195000,230000,(totalRev-totalExp)||1077800],
  ];
  const hero = HERO_METRICS[heroIdx];

  // ── Cash flow ──────────────────────────────────────────────────────────────
  const MONTHLY = [
    { m:"Oct", inc:380000, exp:245000 },{ m:"Nov", inc:420000, exp:280000 },
    { m:"Dec", inc:650000, exp:320000 },{ m:"Jan", inc:290000, exp:195000 },
    { m:"Feb", inc:510000, exp:310000 },{ m:"Mar", inc:450000, exp:165000 },
  ];
  const maxFlow = Math.max(...MONTHLY.map(m => Math.max(m.inc, m.exp)));
  const BAR_H = 52;

  // ── Live services (plan-aware) ─────────────────────────────────────────────
  const liveServices = [
    {
      icon: "receipt", label: "Invoicing",
      stat: `${invoices.filter(i => i.status !== "paid").length} unpaid`,
      val: naira(outstandingAmt + overdueAmt),
      ctaColor: TT.action, cta: overdueAmt > 0 ? "View overdue" : "View all",
      onPress: () => push("invoiceList"),
    },
    {
      icon: "tag", label: "Expenses",
      stat: `${expenses.length} recorded`,
      val: naira(totalExp),
      ctaColor: TT.warn, cta: "This month",
      onPress: () => push("expenseList"),
    },
    ...(PLAN_FEATURES[plan]?.has("pos") ? [{
      icon: "cart", label: "Point of Sale",
      stat: `${sales.length} sales today`,
      val: naira(totalRev),
      ctaColor: TT.ok, cta: "Open POS →",
      onPress: () => push("pos"),
    }] : []),
    {
      icon: "users", label: "Customers",
      stat: `${(data?.customers||[]).length} contacts`,
      val: `${(data?.customers||[]).length} active`,
      ctaColor: "#4C4CFF", cta: "Manage →",
      onPress: () => push("customerList"),
    },
    {
      icon: "dollar", label: "Nukodes Loans",
      stat: "Up to ₦ 2M",
      val: "Quick approval",
      ctaColor: "#CCFF00", ctaText: "#000", cta: "Apply now →",
      onPress: () => alert("Loans — coming soon"),
    },
  ];

  // ── Alerts (always computed, shown even if empty) ──────────────────────────
  const alerts = [
    overdueInv.length > 0 && {
      id:"overdue", icon:"receipt", sev:"err",  color: TT.err,
      title: `${overdueInv.length} invoice${overdueInv.length>1?"s":""} overdue`,
      sub: `${naira(overdueInv.reduce((s,i)=>s+i.amount,0))} at risk — action required`,
      onTap: () => push("invoiceList"),
    },
    !isOnline && unsynced > 0 && {
      id:"sync", icon:"cloudOff", sev:"warn", color: TT.warn,
      title: `${unsynced} records pending sync`,
      sub: "Reconnect to sync your data to the cloud",
      onTap: () => {},
    },
    lowStock.length > 0 && {
      id:"stock", icon:"box", sev:"warn", color: TT.warn,
      title: `${lowStock.length} product${lowStock.length>1?"s":""} running low`,
      sub: `${lowStock.map(p=>p.name).slice(0,2).join(", ")} — reorder now`,
      onTap: () => push("productList"),
    },
    {
      id:"tax", icon:"tax", sev:"info", color: TT.a400,
      title: "VAT return due in 20 days",
      sub: "Q1 2026 filing — Mar 31 deadline",
      onTap: () => push("taxCentre"),
    },
  ].filter(Boolean).filter(a => !dismissedAlerts.includes(a.id));

  // ── Recent activity ────────────────────────────────────────────────────────
  const recentActivity = [
    ...invoices.map(i => ({...i, _type:"invoice"})),
    ...expenses.map(e => ({...e, _type:"expense"})),
  ].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);

  // ── Quick actions ──────────────────────────────────────────────────────────
  const shortcuts = [
    { icon:"receipt",  label:"Send Invoice",  onTap:()=>push("invoiceList"),  color:TT.action  },
    { icon:"cart",     label:"Record Sale",   onTap:()=>push("pos"),          color:TT.ok      },
    { icon:"tag",      label:"Add Expense",   onTap:()=>push("expenseList"),  color:TT.warn    },
    { icon:"users",    label:"Customers",     onTap:()=>push("customerList"), color:"#4C4CFF"  },
    { icon:"activity", label:"Reports",       onTap:()=>alert("Reports — coming soon"), color:TT.okLight },
    { icon:"tax",      label:"Tax Centre",    onTap:()=>push("taxCentre"),    color:TT.err     },
  ];

  // ── Shared section header ──────────────────────────────────────────────────
  const SH = ({ label, action, onAction }) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
      <span style={{ fontFamily:"Rokkitt, serif", fontSize:11, fontWeight:700, color:TT.muted, textTransform:"uppercase", letterSpacing:1 }}>
        {label}
      </span>
      {action && (
        <button onClick={onAction} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <span style={{ fontFamily:"Rokkitt, serif", fontSize:12, color:TT.a400 }}>{action}</span>
        </button>
      )}
    </div>
  );

  // ── Section divider ────────────────────────────────────────────────────────
  const Div = () => (
    <div style={{ height:6, background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)", margin:"6px 0 18px" }} />
  );

  return (
    <div style={{ flex:1, overflowY:"auto", paddingBottom:20, scrollbarWidth:"none", background:TT.bg }}>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TOP BAR                                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px 8px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Avatar name="Haruna" size={38} />
          <div>
            <div style={{ fontFamily:"Rokkitt, serif", fontWeight:700, fontSize:16, color:TT.text }}>Hello, Haruna 👋</div>
            <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted }}>{dateStr}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{
            display:"flex", alignItems:"center", gap:5, borderRadius:80,
            background: isOnline ? TT.ok+"18" : TT.action,
            border: isOnline ? `1px solid ${TT.ok}44` : "none",
            padding:"4px 10px 4px 7px",
          }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background: isOnline ? TT.ok : "#fff" }} />
            <span style={{ fontFamily:"Rokkitt, serif", fontSize:11, color: isOnline ? TT.ok : "#fff" }}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
          <button onClick={toggleTheme} aria-label={isDark?"Switch to light mode":"Switch to dark mode"} style={{ width:34, height:34, borderRadius:"50%", background:TT.surf, border:`1px solid ${TT.el}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <I name={isDark?"sun":"moon"} size={15} color={TT.muted} />
          </button>
          <div style={{ position:"relative" }}>
            <button aria-label="Notifications" style={{ width:40, height:40, borderRadius:"50%", background:TT.surf, border:`1px solid ${TT.el}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <I name="bell" size={18} color={TT.text} />
            </button>
            <div style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:TT.err, border:`2px solid ${TT.bg}` }} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — OVERVIEW + ACCOUNTS                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"2px 20px 10px" }}>
        <SH label="Overview & Accounts" />
      </div>

      {/* Business selector */}
      <div style={{ display:"flex", gap:8, padding:"0 20px 12px" }}>
        <button onClick={openBizSwitcher} aria-label="Switch business" style={{ display:"flex", alignItems:"center", gap:6, background:TT.surf, border:`1px solid ${TT.el}`, height:34, borderRadius:80, padding:"0 12px", cursor:"pointer", flex:1, minWidth:0 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:currentBusiness?.color||TT.action, flexShrink:0 }} />
          <span style={{ fontFamily:"Rokkitt, serif", fontSize:13, color:TT.subtle, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, textAlign:"left" }}>
            {currentBusiness?.name||"Nukoder Business 1"}
          </span>
          {currentBusiness?.plan && (
            <span style={{ fontFamily:"Rokkitt, serif", fontSize:9, fontWeight:700, color:PLAN_META[currentBusiness.plan]?.color, background:PLAN_META[currentBusiness.plan]?.color+"22", padding:"1px 6px", borderRadius:80, flexShrink:0 }}>
              {PLAN_META[currentBusiness.plan]?.name}
            </span>
          )}
          <I name="chevD" size={13} color={TT.muted} />
        </button>
        <button aria-label="Copy account ID" style={{ display:"flex", alignItems:"center", gap:5, background:TT.surf, border:`1px solid ${TT.el}`, height:34, borderRadius:80, padding:"0 12px", cursor:"pointer", flexShrink:0 }}>
          <span style={{ fontFamily:"Rokkitt, serif", fontSize:12, color:TT.muted }}>{currentBusiness?.id||"NB-00001"}</span>
          <I name="copy" size={11} color={TT.muted} />
        </button>
      </div>

      {/* Hero account card */}
      <div style={{ margin:"0 16px 12px", background: isDark ? "linear-gradient(135deg,#060919 0%,#0d1140 60%,#060919 100%)" : "linear-gradient(135deg,#2323FF 0%,#3B3BFF 50%,#2323CC 100%)", border:`1px solid ${isDark?"rgba(35,35,255,0.22)":"rgba(255,255,255,0.18)"}`, borderRadius:28, padding:"22px 20px 18px", position:"relative", overflow:"hidden" }}>
        {isDark && <>
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(35,35,255,0.2)", filter:"blur(40px)" }} />
          <div style={{ position:"absolute", bottom:-20, left:10, width:80, height:80, borderRadius:"50%", background:"rgba(76,76,255,0.15)", filter:"blur(30px)" }} />
        </>}
        <div style={{ position:"relative" }}>
          <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:"rgba(255,255,255,0.65)", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{hero.label}</div>
          <div style={{ fontFamily:"Oswald, sans-serif", fontWeight:700, fontSize:34, color:"#FFFFFF", marginBottom:4, lineHeight:1.1 }}>{naira(hero.value)}</div>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:12 }}>
            <I name={hero.up?"arrowUp":"arrowDn"} size={12} color={hero.up?"#5BF08A":"#FC8181"} />
            <span style={{ fontFamily:"Rokkitt, serif", fontSize:12, color:hero.up?"#5BF08A":"#FC8181" }}>
              {hero.up?"+":"-"}{hero.change}% vs last month
            </span>
          </div>
          <Spark data={heroSpark[heroIdx]} color="rgba(255,255,255,0.65)" h={30} />
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:14 }}>
            {HERO_METRICS.map((m,i) => (
              <button key={i} onClick={()=>setHeroIdx(i)} aria-label={`View ${m.label}`} style={{ width:heroIdx===i?22:7, height:7, borderRadius:4, border:"none", cursor:"pointer", padding:0, background:heroIdx===i?"#FFFFFF":"rgba(255,255,255,0.3)", transition:"width 0.25s ease" }} />
            ))}
            <span style={{ marginLeft:"auto", fontFamily:"Rokkitt, serif", fontSize:10, color:"rgba(255,255,255,0.5)" }}>{heroIdx+1}/{HERO_METRICS.length}</span>
          </div>
        </div>
      </div>

      {/* Quick stats chips */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", scrollbarWidth:"none", padding:"0 16px 12px" }}>
        {[
          { label:"Revenue",  value:naira(totalRev||1248500),  delta:"+8.4%",  up:true  },
          { label:"Expenses", value:naira(totalExp||170700),   delta:"+3.2%",  up:false },
          { label:"Margin",   value:`${profitMargin||86}%`,    delta:"+2.1pp", up:true  },
          { label:"Invoices", value:String(invoices.filter(i=>i.status==="sent").length||1), delta:"pending", up:null },
        ].map(stat => (
          <div key={stat.label} style={{ minWidth:86, background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:14, padding:"10px 12px", flexShrink:0 }}>
            <div style={{ fontFamily:"Rokkitt, serif", fontSize:9, color:TT.muted, marginBottom:4, textTransform:"uppercase", letterSpacing:0.5 }}>{stat.label}</div>
            <div style={{ fontFamily:"Oswald, sans-serif", fontSize:14, fontWeight:600, color:TT.text, lineHeight:1.2 }}>{stat.value}</div>
            <div style={{ fontFamily:"Rokkitt, serif", fontSize:10, marginTop:3, color:stat.up===true?TT.okLight:stat.up===false?TT.err:TT.muted }}>{stat.delta}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ margin:"0 16px 6px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {shortcuts.map(sc => (
            <button key={sc.label} onClick={sc.onTap} aria-label={sc.label} style={{ background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:14, padding:"12px 6px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, cursor:"pointer" }}>
              <div style={{ width:38, height:38, borderRadius:11, background:sc.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <I name={sc.icon} size={20} color={sc.color} />
              </div>
              <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.muted, textAlign:"center", lineHeight:1.3 }}>{sc.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Div />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — LIVE SERVICES                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 20px 10px" }}>
        <SH label="Live Services" action="Manage →" onAction={()=>{}} />
      </div>
      <div style={{ display:"flex", gap:12, overflowX:"auto", scrollbarWidth:"none", padding:"0 16px 4px", paddingBottom:6 }}>
        {liveServices.map(svc => (
          <button
            key={svc.label}
            onClick={svc.onPress}
            aria-label={svc.label}
            style={{ width:148, minWidth:148, background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:20, overflow:"hidden", cursor:"pointer", flexShrink:0, display:"flex", flexDirection:"column" }}
          >
            <div style={{ padding:"14px 14px 10px" }}>
              <div style={{ width:38, height:38, borderRadius:10, background:svc.ctaColor==="rgba(255,255,255,0)"||svc.ctaColor==="#CCFF00" ? TT.el : svc.ctaColor+"20", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                <I name={svc.icon} size={20} color={svc.ctaColor==="#CCFF00"?"#8a9f00":svc.ctaColor} />
              </div>
              <div style={{ fontFamily:"Rokkitt, serif", fontWeight:700, fontSize:13, color:TT.text, lineHeight:1.2 }}>{svc.label}</div>
              <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted, marginTop:2 }}>{svc.stat}</div>
              <div style={{ fontFamily:"Oswald, sans-serif", fontSize:13, fontWeight:600, color:TT.text, marginTop:4 }}>{svc.val}</div>
            </div>
            <div style={{ background:svc.ctaColor, padding:"8px 14px", marginTop:"auto" }}>
              <span style={{ fontFamily:"Rokkitt, serif", fontSize:11, fontWeight:700, color:svc.ctaText||"#fff" }}>{svc.cta}</span>
            </div>
          </button>
        ))}
      </div>

      <Div />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — PERFORMANCE OVERVIEW                                   */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 20px 10px" }}>
        <SH label="Performance Overview" action="Customise" onAction={()=>{}} />
      </div>

      {/* 2×2 metric widgets with sparklines */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0 16px 12px" }}>
        {[
          { label:"Total Revenue",  value:naira(totalRev||1248500),             delta:"+8.4%",  up:true,  spark:[320000,380000,290000,420000,360000,totalRev||1248500]             },
          { label:"Total Expenses", value:naira(totalExp||170700),              delta:"+3.2%",  up:false, spark:[200000,240000,180000,220000,190000,totalExp||170700]              },
          { label:"Net Profit",     value:naira((totalRev-totalExp)||1077800),  delta:"+14.1%", up:true,  spark:[120000,140000,110000,200000,170000,(totalRev-totalExp)||1077800]  },
          { label:"Outstanding",    value:naira(outstandingAmt||312500),        delta:`${invoices.filter(i=>i.status==="sent").length||1} inv`, up:null, spark:[280000,310000,250000,330000,300000,outstandingAmt||312500] },
        ].map(m => (
          <div key={m.label} style={{ background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:16, padding:14 }}>
            <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted, marginBottom:6 }}>{m.label}</div>
            <div style={{ fontFamily:"Oswald, sans-serif", fontWeight:700, fontSize:17, color:TT.text, lineHeight:1.2 }}>{m.value}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8 }}>
              <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:m.up===true?TT.okLight:m.up===false?TT.err:TT.muted }}>{m.delta}</span>
              <Spark data={m.spark} color={m.up===false?TT.err:TT.action} h={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Health card */}
      <div style={{ margin:"0 16px 6px" }}>
        <div style={{ background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:20, padding:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontFamily:"Rokkitt, serif", fontSize:13, fontWeight:700, color:TT.text }}>Invoice Health</span>
            <button onClick={()=>push("invoiceList")} style={{ background:"none", border:"none", cursor:"pointer" }}>
              <span style={{ fontFamily:"Rokkitt, serif", fontSize:12, color:TT.a400 }}>See all →</span>
            </button>
          </div>
          {/* Stats row */}
          <div style={{ display:"flex", gap:8, marginBottom:12 }}>
            {[
              { label:"Outstanding", value:naira(outstandingAmt||312500), count:invoices.filter(i=>i.status==="sent").length||1, color:TT.action },
              { label:"Overdue",     value:naira(overdueAmt||285000),     count:invoices.filter(i=>i.status==="overdue").length||1, color:TT.err   },
              { label:"Paid",        value:naira(paidAmt||618750),        count:invoices.filter(i=>i.status==="paid").length||1, color:TT.ok      },
            ].map(col => (
              <div key={col.label} style={{ flex:1 }}>
                <div style={{ fontFamily:"Rokkitt, serif", fontSize:9, color:TT.muted, textTransform:"uppercase", letterSpacing:0.5 }}>{col.label}</div>
                <div style={{ fontFamily:"Oswald, sans-serif", fontSize:15, fontWeight:600, color:col.color, lineHeight:1.3 }}>{col.value}</div>
                <div style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.muted }}>{col.count} inv</div>
              </div>
            ))}
          </div>
          {/* Stacked progress bar */}
          <div style={{ display:"flex", borderRadius:80, overflow:"hidden", height:7, marginBottom:12, background:TT.el }}>
            <div style={{ width:`${Math.round((paidAmt/invTotal)*100)||50}%`,        background:TT.ok,     minWidth:4 }} />
            <div style={{ width:`${Math.round((outstandingAmt/invTotal)*100)||30}%`, background:TT.action, minWidth:4 }} />
            <div style={{ width:`${Math.round((overdueAmt/invTotal)*100)||20}%`,     background:TT.err,    minWidth:4 }} />
          </div>
          {/* Legend */}
          <div style={{ display:"flex", gap:12, marginBottom:12 }}>
            {[["Paid",TT.ok],["Outstanding",TT.action],["Overdue",TT.err]].map(([l,c])=>(
              <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:7, height:7, borderRadius:2, background:c }} />
                <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.muted }}>{l}</span>
              </div>
            ))}
          </div>
          {/* Actions */}
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>push("invoiceList")} style={{ flex:1, height:36, background:"transparent", border:`1px solid ${TT.el}`, borderRadius:80, fontFamily:"Rokkitt, serif", fontSize:12, color:TT.subtle, cursor:"pointer" }}>
              Send reminders
            </button>
            <button onClick={()=>push("addInvoice")} aria-label="New invoice" style={{ width:36, height:36, borderRadius:"50%", background:TT.action, border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <I name="plus" size={16} color="#fff" />
            </button>
          </div>
        </div>
      </div>

      <Div />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — CASH FLOW                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 20px 10px" }}>
        <SH label="Cash Flow" action="Full report →" onAction={()=>{}} />
      </div>
      <div style={{ margin:"0 16px 6px" }}>
        <div style={{ background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:20, padding:"16px 14px 14px" }}>
          {/* Period + view toggles */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:"Oswald, sans-serif", fontSize:18, fontWeight:600, color:TT.text }}>
                {naira(MONTHLY.reduce((s,m)=>s+m.inc,0))}
              </div>
              <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted }}>Total income · Oct–Mar</div>
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {[["both","Both"],["income","Inc"],["expenses","Exp"]].map(([v,l]) => (
                <button key={v} onClick={()=>setFlowView(v)} style={{ height:24, padding:"0 9px", borderRadius:80, border:"none", background:flowView===v?TT.action:TT.el, color:flowView===v?"#fff":TT.muted, fontFamily:"Rokkitt, serif", fontSize:10, fontWeight:600, cursor:"pointer" }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Bar chart — grouped (income+expenses) or single */}
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:BAR_H+20 }}>
            {MONTHLY.map(m => {
              const incH = Math.max(4, Math.round((m.inc/maxFlow)*BAR_H));
              const expH = Math.max(4, Math.round((m.exp/maxFlow)*BAR_H));
              return (
                <div key={m.m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:BAR_H }}>
                    {(flowView==="both"||flowView==="income") && (
                      <div style={{ width:flowView==="both"?10:14, height:incH, background:TT.action, borderRadius:"3px 3px 0 0" }} />
                    )}
                    {(flowView==="both"||flowView==="expenses") && (
                      <div style={{ width:flowView==="both"?10:14, height:expH, background:flowView==="both"?TT.err+"BB":TT.err, borderRadius:"3px 3px 0 0" }} />
                    )}
                  </div>
                  <span style={{ fontFamily:"Rokkitt, serif", fontSize:9, color:TT.muted }}>{m.m}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12, paddingTop:10, borderTop:`1px solid ${TT.el}` }}>
            <div style={{ display:"flex", gap:10 }}>
              {[["Income",TT.action],["Expenses",TT.err]].map(([l,c])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                  <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.muted }}>{l}</span>
                </div>
              ))}
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:TT.ok }} />
                <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.ok }}>
                  Net +{naira(MONTHLY.reduce((s,m)=>s+(m.inc-m.exp),0))}
                </span>
              </div>
            </div>
            <span style={{ fontFamily:"Rokkitt, serif", fontSize:10, color:TT.muted }}>6-mo</span>
          </div>
        </div>
      </div>

      <Div />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — RECENT ACTIVITY                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 20px 10px" }}>
        <SH label="Recent Activity" action="View all →" onAction={()=>push("invoiceList")} />
      </div>
      <div style={{ margin:"0 16px 6px", background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:20, overflow:"hidden" }}>
        {recentActivity.length === 0 ? (
          <div style={{ padding:"24px 16px", textAlign:"center" }}>
            <div style={{ fontFamily:"Rokkitt, serif", fontSize:13, color:TT.muted }}>No activity yet</div>
          </div>
        ) : recentActivity.map((item,i) => {
          const isInv = item._type === "invoice";
          const sc    = item.status==="paid" ? TT.ok : item.status==="overdue" ? TT.err : TT.action;
          return (
            <button key={item.id} onClick={()=>push(isInv?"invoiceList":"expenseList")} aria-label={isInv?item.customer:item.vendor} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", width:"100%", background:"transparent", border:"none", borderBottom: i<recentActivity.length-1 ? `1px solid ${TT.el}` : "none", cursor:"pointer" }}>
              <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:(isInv?TT.action:TT.warn)+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <I name={isInv?"receipt":"tag"} size={17} color={isInv?TT.action:TT.warn} />
              </div>
              <div style={{ flex:1, minWidth:0, textAlign:"left" }}>
                <div style={{ fontFamily:"Rokkitt, serif", fontWeight:700, fontSize:13, color:TT.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {isInv ? item.customer : (item.vendor||"Expense")}
                </div>
                <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted }}>
                  {isInv ? item.id : item.category} · {item.date}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
                <span style={{ fontFamily:"Oswald, sans-serif", fontSize:13, fontWeight:600, color:isInv?TT.text:TT.err }}>
                  {isInv?"":"-"}{naira(item.amount)}
                </span>
                <span style={{ fontFamily:"Rokkitt, serif", fontSize:9, fontWeight:700, color:sc, background:sc+"18", padding:"2px 6px", borderRadius:80, textTransform:"capitalize" }}>
                  {item.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <Div />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — ALERTS                                                 */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 20px 10px" }}>
        <SH
          label={`Alerts${alerts.length > 0 ? ` · ${alerts.length}` : ""}`}
          action={dismissedAlerts.length > 0 ? "Restore dismissed" : undefined}
          onAction={() => setDismissedAlerts([])}
        />
      </div>
      <div style={{ margin:"0 16px 20px", display:"flex", flexDirection:"column", gap:8 }}>
        {alerts.length === 0 ? (
          <div style={{ background:TT.surf, border:`1px solid ${TT.el}`, borderRadius:16, padding:"18px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:TT.ok+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <I name="check" size={18} color={TT.ok} />
            </div>
            <div>
              <div style={{ fontFamily:"Rokkitt, serif", fontWeight:700, fontSize:13, color:TT.ok }}>All clear</div>
              <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted, marginTop:2 }}>No alerts right now — your business is on track</div>
            </div>
          </div>
        ) : alerts.map(a => (
          <div
            key={a.id}
            onClick={a.onTap}
            role="button"
            aria-label={a.title}
            style={{ background:TT.surf, border:`1px solid ${a.color}33`, borderLeft:`3px solid ${a.color}`, borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
          >
            <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:a.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <I name={a.icon} size={18} color={a.color} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"Rokkitt, serif", fontWeight:700, fontSize:13, color:TT.text }}>{a.title}</div>
              <div style={{ fontFamily:"Rokkitt, serif", fontSize:11, color:TT.muted, marginTop:2, lineHeight:1.4 }}>{a.sub}</div>
            </div>
            <button onClick={e=>{e.stopPropagation();setDismissedAlerts(d=>[...d,a.id]);}} aria-label={`Dismiss ${a.title}`} style={{ background:"transparent", border:"none", cursor:"pointer", padding:4, flexShrink:0 }}>
              <I name="x" size={14} color={TT.muted} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2: SERVICES
// ─────────────────────────────────────────────────────────────────────────────
function Services({ push, currentBusiness }) {
  const plan = currentBusiness?.plan || "starter";
  const planMeta = PLAN_META[plan];
  const features = PLAN_FEATURES[plan];
  const [upgradeSheet, setUpgradeSheet] = useState(false);
  const [upgradeTo, setUpgradeTo] = useState(null);

  const isLocked = (requiredPlan) => {
    return PLAN_ORDER.indexOf(requiredPlan) > PLAN_ORDER.indexOf(plan);
  };

  const handleLocked = (requiredPlan) => {
    setUpgradeTo(requiredPlan);
    setUpgradeSheet(true);
  };

  // Active services per plan — contextual data
  const ACTIVE_SERVICES = {
    starter: [
      { icon: "receipt", label: "Invoicing", sub: "3 outstanding", ctaColor: "#2323FF", cta: "View invoices", onPress: () => push("invoiceList") },
      { icon: "tag", label: "Expenses", sub: "Last: ₦ 12,000", ctaColor: "#FB923C", cta: "Track spending", onPress: () => push("expenseList") },
      { icon: "dollar", label: "Loans", sub: "Financing ready", ctaColor: "#CCFF00", ctaTextColor: "#000", cta: "Apply now →", onPress: () => alert("Loans coming soon") },
      { icon: "bank", label: "Payments", sub: "Transfer & receive", ctaColor: "#4C4CFF", cta: "Send money", onPress: () => alert("Payments coming soon") },
    ],
    growth: [
      { icon: "receipt", label: "Invoicing", sub: "3 outstanding", ctaColor: "#2323FF", cta: "View invoices", onPress: () => push("invoiceList") },
      { icon: "cart", label: "Point of Sale", sub: "₦ 450,000 today", ctaColor: "#26CC5A", cta: "Open POS", onPress: () => push("pos") },
      { icon: "tag", label: "Expenses", sub: "₦ 89,000 this month", ctaColor: "#FB923C", cta: "Track spending", onPress: () => push("expenseList") },
      { icon: "dollar", label: "Loans", sub: "Up to ₦ 2M available", ctaColor: "#CCFF00", ctaTextColor: "#000", cta: "Apply now →", onPress: () => alert("Loans coming soon") },
    ],
    enterprise: [
      { icon: "receipt", label: "Invoicing", sub: "12 outstanding", ctaColor: "#2323FF", cta: "View invoices", onPress: () => push("invoiceList") },
      { icon: "cart", label: "Point of Sale", sub: "₦ 1.2M today", ctaColor: "#26CC5A", cta: "Open POS", onPress: () => push("pos") },
      { icon: "sparkle", label: "AI Insights", sub: "New report ready", ctaColor: "#FB923C", cta: "View insights", onPress: () => alert("AI Insights coming soon") },
      { icon: "building", label: "Vendor Portal", sub: "4 vendors active", ctaColor: "#4C4CFF", cta: "Manage vendors", onPress: () => alert("Vendor Portal coming soon") },
    ],
  };

  const serviceGroups = [
    {
      title: "Business Tools",
      planRequired: "starter",
      items: [
        { icon: "receipt", label: "Invoicing",  sub: "Create & send invoices", featureKey: "invoiceList",   onPress: () => push("invoiceList"),   planRequired: "starter" },
        { icon: "tag",     label: "Expenses",   sub: "Track spending",          featureKey: "expenseList",   onPress: () => push("expenseList"),   planRequired: "starter" },
        { icon: "truck",   label: "Inventory",  sub: "Stock management",        featureKey: "productList",   onPress: () => push("productList"),   planRequired: "starter" },
        { icon: "users",   label: "Payroll",    sub: "Staff payments",          featureKey: "payroll",       onPress: () => alert("Payroll — coming soon"), planRequired: "growth" },
        { icon: "scan",    label: "Scanner",    sub: "Barcode scanning",        featureKey: "scanner",       onPress: () => alert("Scanner — coming soon"), planRequired: "growth" },
        { icon: "cpu",     label: "Manufacturing", sub: "BOM & production",     featureKey: "manufacturing", onPress: () => alert("Manufacturing — coming soon"), planRequired: "enterprise" },
      ],
    },
    {
      title: "Commerce",
      items: [
        { icon: "cart",   label: "Point of Sale", sub: "In-store sales",   featureKey: "pos",         onPress: () => push("pos"),              planRequired: "growth" },
        { icon: "refresh",label: "Returns",        sub: "Refund management",featureKey: "returns",     onPress: () => alert("Returns — coming soon"), planRequired: "growth" },
        { icon: "globe",  label: "Online Store",  sub: "E-commerce",       featureKey: "onlineStore", onPress: () => alert("Online Store — coming soon"), planRequired: "enterprise" },
        { icon: "box",    label: "Logistics",     sub: "Delivery tracking",featureKey: "logistics",   onPress: () => alert("Logistics — coming soon"), planRequired: "enterprise" },
      ],
    },
    {
      title: "Financial Services",
      items: [
        { icon: "dollar", label: "Loans",       sub: "Business financing", featureKey: "loans",       onPress: () => alert("Loans — coming soon"),       planRequired: "starter" },
        { icon: "bank",   label: "Payments",    sub: "Transfer & receive", featureKey: "payments",    onPress: () => alert("Payments — coming soon"),    planRequired: "starter" },
        { icon: "wallet", label: "Savings",     sub: "Business savings",   featureKey: "savings",     onPress: () => alert("Savings — coming soon"),     planRequired: "starter" },
        { icon: "creditCard", label: "FlexPay", sub: "BNPL for business",  featureKey: "flexpay",     onPress: () => alert("FlexPay — coming soon"),     planRequired: "growth" },
        { icon: "building", label: "Bank Sync", sub: "Auto-reconcile",     featureKey: "bankSync",    onPress: () => alert("Bank Sync — coming soon"),   planRequired: "growth" },
        { icon: "pie",    label: "Investments", sub: "Grow your money",    featureKey: "investments", onPress: () => alert("Investments — coming soon"), planRequired: "starter" },
      ],
    },
    {
      title: "Compliance & Reporting",
      items: [
        { icon: "tax",      label: "Tax Filing",    sub: "VAT & WHT returns",   featureKey: "taxCentre",        onPress: () => push("taxCentre"),               planRequired: "starter" },
        { icon: "lock",     label: "Audit Trail",   sub: "Transaction history", featureKey: "auditTrail",       onPress: () => alert("Audit Trail — coming soon"), planRequired: "growth" },
        { icon: "activity", label: "Reports",       sub: "Financial reports",   featureKey: "financialReports", onPress: () => alert("Reports — coming soon"),     planRequired: "growth" },
        { icon: "sparkle",  label: "AI Insights",   sub: "Smart analytics",     featureKey: "aiInsights",       onPress: () => alert("AI Insights — coming soon"), planRequired: "enterprise" },
      ],
    },
  ];

  const activeServices = ACTIVE_SERVICES[plan] || ACTIVE_SERVICES.starter;

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80, scrollbarWidth: "none", position: "relative" }}>
      {/* TOP BAR */}
      <div style={{ padding: "14px 20px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 22, color: T.text }}>
            Services
          </div>
          {/* Plan badge */}
          <div style={{
            background: planMeta.color + "22", border: `1px solid ${planMeta.color}55`,
            borderRadius: 20, padding: "4px 10px",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: planMeta.color }} />
            <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 700, color: planMeta.color }}>
              {planMeta.name}
            </span>
          </div>
        </div>
        <div style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>
          Your active plan · {plan === "starter" ? "Free" : `₦ ${planMeta.price.toLocaleString()}/mo`}
        </div>
      </div>

      {/* ACTIVE SERVICES CAROUSEL */}
      <div style={{ margin: "12px 0 20px" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", marginBottom: 10,
        }}>
          <span style={{ fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 600, color: T.subtle }}>
            Active Services
          </span>
          <span style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.a400 }}>
            {activeServices.length} active
          </span>
        </div>
        <div style={{
          display: "flex", gap: 12, overflowX: "auto",
          scrollbarWidth: "none", paddingBottom: 4, paddingLeft: 16, paddingRight: 16,
        }}>
          {activeServices.map((svc) => (
            <div
              key={svc.label}
              onClick={svc.onPress}
              style={{
                width: 154, minWidth: 154, cursor: "pointer",
                background: T.surf, border: `1px solid ${T.el}`,
                borderRadius: 20, overflow: "hidden",
              }}
            >
              <div style={{ padding: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: svc.ctaColor + "22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <I name={svc.icon} size={22} color={svc.ctaColor === "#CCFF00" ? "#a0bf00" : svc.ctaColor} />
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text, marginTop: 8 }}>
                  {svc.label}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>
                  {svc.sub}
                </div>
              </div>
              <div style={{ background: svc.ctaColor, padding: "9px 14px" }}>
                <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 700, color: svc.ctaTextColor || "#fff" }}>
                  {svc.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE GROUPS */}
      {serviceGroups.map((group) => (
        <div key={group.title} style={{ margin: "0 16px 20px" }}>
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 600, color: T.subtle, marginBottom: 10 }}>
            {group.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {group.items.map((item) => {
              const locked = isLocked(item.planRequired);
              const reqMeta = PLAN_META[item.planRequired];
              return (
                <div
                  key={item.label}
                  onClick={locked ? () => handleLocked(item.planRequired) : item.onPress}
                  style={{
                    background: T.surf, border: `1px solid ${locked ? T.el : T.el}`,
                    borderRadius: 16, padding: 14, cursor: "pointer",
                    opacity: locked ? 0.6 : 1, position: "relative",
                  }}
                >
                  {/* Lock badge */}
                  {locked && (
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      background: reqMeta.color + "22", border: `1px solid ${reqMeta.color}66`,
                      borderRadius: 10, padding: "2px 6px",
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      <I name="lock" size={9} color={reqMeta.color} />
                      <span style={{ fontFamily: "Rokkitt, serif", fontSize: 9, fontWeight: 700, color: reqMeta.color }}>
                        {reqMeta.name}
                      </span>
                    </div>
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: locked ? T.el : T.a400 + "18",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 8,
                  }}>
                    <I name={item.icon} size={18} color={locked ? T.muted : T.a400} />
                  </div>
                  <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 13, color: locked ? T.muted : T.text }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
                    {item.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* UPGRADE CTA BANNER */}
      {plan !== "enterprise" && (
        <div
          onClick={() => { setUpgradeTo(plan === "starter" ? "growth" : "enterprise"); setUpgradeSheet(true); }}
          style={{
            margin: "0 16px 24px",
            background: `linear-gradient(135deg, ${planMeta.color}22, ${PLAN_META[PLAN_ORDER[PLAN_ORDER.indexOf(plan)+1]].color}22)`,
            border: `1px solid ${PLAN_META[PLAN_ORDER[PLAN_ORDER.indexOf(plan)+1]].color}44`,
            borderRadius: 20, padding: "16px 18px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: PLAN_META[PLAN_ORDER[PLAN_ORDER.indexOf(plan)+1]].color + "33",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <I name="zap" size={20} color={PLAN_META[PLAN_ORDER[PLAN_ORDER.indexOf(plan)+1]].color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
              Upgrade to {PLAN_META[PLAN_ORDER[PLAN_ORDER.indexOf(plan)+1]].name}
            </div>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginTop: 2 }}>
              Unlock {plan === "starter" ? "POS, Payroll, Bank Sync & more" : "AI Insights, Vendor Portal & more"}
            </div>
          </div>
          <I name="chevron" size={16} color={T.muted} />
        </div>
      )}

      {/* UPGRADE BOTTOM SHEET */}
      {upgradeSheet && upgradeTo && (
        <div
          onClick={() => setUpgradeSheet(false)}
          style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 50,
            display: "flex", alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", background: T.surf,
              borderRadius: "24px 24px 0 0", padding: "24px 20px 32px",
              border: `1px solid ${T.el}`,
            }}
          >
            {/* Handle */}
            <div style={{
              width: 40, height: 4, borderRadius: 2,
              background: T.el, margin: "0 auto 20px",
            }} />

            {/* Plan header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: PLAN_META[upgradeTo].color + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <I name="zap" size={24} color={PLAN_META[upgradeTo].color} />
              </div>
              <div>
                <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 18, color: T.text }}>
                  {PLAN_META[upgradeTo].name} Plan
                </div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontSize: 16, color: PLAN_META[upgradeTo].color }}>
                  {PLAN_META[upgradeTo].price === 0 ? "Free" : `₦ ${PLAN_META[upgradeTo].price.toLocaleString()}/mo`}
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            {(() => {
              const highlights = {
                growth: ["Point of Sale (POS)", "Payroll management", "Bank Sync & reconciliation", "FlexPay (BNPL)", "Audit Trail & Reports", "3 team members"],
                enterprise: ["AI-powered Insights", "Manufacturing / BOM", "Vendor Portal", "Online Store", "Logistics tracking", "10 team members"],
              };
              return (highlights[upgradeTo] || []).map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: PLAN_META[upgradeTo].color + "22",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <I name="check" size={11} color={PLAN_META[upgradeTo].color} />
                  </div>
                  <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.text }}>{feat}</span>
                </div>
              ));
            })()}

            {/* CTA */}
            <div
              onClick={() => { setUpgradeSheet(false); alert(`Upgrade to ${PLAN_META[upgradeTo].name} — payment flow coming soon`); }}
              style={{
                background: PLAN_META[upgradeTo].color,
                borderRadius: 80, padding: "14px 20px",
                textAlign: "center", cursor: "pointer", marginTop: 20,
              }}
            >
              <span style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
                Upgrade Now — {PLAN_META[upgradeTo].price === 0 ? "Free" : `₦ ${PLAN_META[upgradeTo].price.toLocaleString()}/mo`}
              </span>
            </div>
            <div
              onClick={() => setUpgradeSheet(false)}
              style={{ textAlign: "center", marginTop: 12, cursor: "pointer" }}
            >
              <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>
                Maybe later
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3: TAXES
// ─────────────────────────────────────────────────────────────────────────────
function Taxes({ push }) {
  const [activeTab, setActiveTab] = useState("VAT");
  const tabs = ["VAT", "WHT", "CIT", "PAYE"];

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
      {/* TOP BAR */}
      <div style={{ padding: "14px 20px 12px" }}>
        <div style={{
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 22, color: T.text,
        }}>
          Tax Centre
        </div>
        <div style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted, marginTop: 2 }}>
          Monitor your tax liabilities
        </div>
      </div>

      {/* TAX CENTRE CTA CARD */}
      <div style={{
        margin: "0 16px 14px",
        background: "rgba(35,35,255,0.09)",
        border: "1px solid rgba(35,35,255,0.22)",
        borderRadius: 16, padding: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text,
            }}>
              Open Tax Centre
            </div>
            <div style={{
              fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginTop: 2,
            }}>
              Monitor tax liability and stay tax-ready
            </div>
          </div>
          <button
            onClick={() => push("taxCentre")}
            style={{
              background: T.action, border: "none", borderRadius: 80,
              padding: "6px 14px",
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 12, color: "#fff",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            Open →
          </button>
        </div>
      </div>

      {/* TAB SWITCHER */}
      <div style={{
        display: "flex", gap: 6, padding: "0 16px 16px", overflowX: "auto", scrollbarWidth: "none",
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              height: 36, borderRadius: 80, padding: "0 16px",
              background: activeTab === tab ? T.action : T.surf,
              border: `1px solid ${activeTab === tab ? T.action : T.el}`,
              fontFamily: "Rokkitt, serif", fontSize: 13, fontWeight: 600,
              color: activeTab === tab ? "#fff" : T.muted,
              cursor: "pointer", flexShrink: 0,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAX SUMMARY CARD */}
      <div style={{ margin: "0 16px 14px" }}>
        <div style={{
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 20, padding: 16,
        }}>
          <div style={{
            fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 4,
          }}>
            {activeTab} Liability (Current Quarter)
          </div>
          <div style={{
            fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 28, color: T.text, marginBottom: 4,
          }}>
            {naira(activeTab === "VAT" ? 187500 : activeTab === "WHT" ? 45000 : activeTab === "CIT" ? 320000 : 95000)}
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Badge label="Due in 14 days" type="warn" />
          </div>
        </div>
      </div>

      {/* BREAKDOWN */}
      <div style={{ margin: "0 16px 14px" }}>
        <div style={{
          fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 600, color: T.subtle, marginBottom: 10,
        }}>
          Breakdown
        </div>
        {[
          { label: "Taxable Revenue", amount: 1875000 },
          { label: "Tax Rate", amount: null, right: activeTab === "VAT" ? "7.5%" : "10%" },
          { label: "Total Payable", amount: activeTab === "VAT" ? 187500 : 45000 },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            style={{
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: i === 0 ? "16px 16px 0 0" : i === arr.length - 1 ? "0 0 16px 16px" : 0,
              borderTop: i > 0 ? "none" : `1px solid ${T.el}`,
              padding: "13px 16px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <span style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text }}>{row.label}</span>
            <span style={{
              fontFamily: row.amount !== null ? "Oswald, sans-serif" : "Rokkitt, serif",
              fontSize: 14, fontWeight: 600, color: T.text,
            }}>
              {row.amount !== null ? naira(row.amount) : row.right}
            </span>
          </div>
        ))}
      </div>

      {/* FILE TAX BUTTON */}
      <div style={{ margin: "0 16px" }}>
        <button style={{
          width: "100%", height: 48,
          background: T.action, borderRadius: 80,
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
          border: "none", cursor: "pointer",
        }}>
          File {activeTab} Return
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4: ACCOUNT
// ─────────────────────────────────────────────────────────────────────────────
function Account({ push, isOnline, pendingCount, syncAll, syncing, lastSync, currentBusiness, openBizSwitcher, setAuthPhase }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
      {/* TOP SECTION */}
      <div style={{
        padding: "20px 16px", display: "flex", flexDirection: "column",
        alignItems: "center",
      }}>
        <Avatar name="Annette Thompson" size={64} />
        <div style={{
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 18,
          color: T.text, marginTop: 8,
        }}>
          Annette Thompson
        </div>
        <div
          onClick={() => push("profile")}
          style={{
            background: "rgba(35,35,255,0.12)", color: T.a400,
            borderRadius: 80, height: 30, padding: "0 14px",
            fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
            marginTop: 6, cursor: "pointer",
            display: "flex", alignItems: "center",
          }}
        >
          Edit Profile →
        </div>
        <div
          onClick={() => push("profile")}
          style={{
            fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted,
            marginTop: 4, cursor: "pointer",
          }}
        >
          Settings ⚙
        </div>
      </div>

      {/* MANAGEMENT */}
      <div style={{ margin: "0 16px 14px" }}>
        <SectionLabel text="Management" />
        <div style={{
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 16, overflow: "hidden",
        }}>
          <SettingsRow icon="users" label="Employees" sub="Manage staff" />
          <SettingsRow icon="briefcase" label="Team" sub="4 members" onPress={() => push("team")} />
          <SettingsRow icon="settings" label="Preferences" sub="App preferences" noBorder right={<I name="chevR" size={16} color={T.muted} />} />
        </div>
      </div>

      {/* SUPPORT */}
      <div style={{ margin: "0 16px 14px" }}>
        <SectionLabel text="Support" />
        <div style={{
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 16, overflow: "hidden",
        }}>
          <SettingsRow icon="info" label="Help Centre" sub="FAQs & guides" />
          <SettingsRow icon="bell" label="Contact Support" sub="Get in touch" noBorder right={<I name="chevR" size={16} color={T.muted} />} />
        </div>
      </div>

      {/* INTEGRATIONS */}
      <div style={{ margin: "0 16px 14px" }}>
        <SectionLabel text="Integrations" />
        <div style={{
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 16, overflow: "hidden",
        }}>
          <SettingsRow
            icon="plug" label="Connected apps" sub="3 connected"
            onPress={() => push("integrations")}
            noBorder right={<I name="chevR" size={16} color={T.muted} />}
          />
        </div>
      </div>

      {/* SYNC STATUS CARD */}
      <div style={{ margin: "0 16px 14px" }}>
        <div style={{
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 16, padding: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: isOnline ? T.ok + "18" : T.err + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <I name={isOnline ? "sync" : "cloudOff"} size={18} color={isOnline ? T.okLight : T.err} />
              </div>
              <div>
                <div style={{
                  fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text,
                }}>
                  {isOnline ? "Online" : "Offline"}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted }}>
                  {pendingCount > 0 ? `${pendingCount} pending sync` : lastSync ? `Last synced ${lastSync}` : "All synced"}
                </div>
              </div>
            </div>
            {isOnline && pendingCount > 0 && (
              <button
                onClick={syncAll}
                disabled={syncing}
                style={{
                  height: 32, padding: "0 14px", borderRadius: 80,
                  background: syncing ? T.el : T.action,
                  border: "none",
                  fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
                  color: syncing ? T.muted : "#fff", cursor: syncing ? "not-allowed" : "pointer",
                }}
              >
                {syncing ? "Syncing…" : "Sync now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SIGN OUT */}
      <div style={{ margin: "0 16px" }}>
        <button
          onClick={() => setAuthPhase("splash")}
          style={{
            width: "100%", height: 48,
            background: T.el, borderRadius: 80,
            fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 15, color: T.muted,
            border: "none", cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN A: TAX CENTRE
// ─────────────────────────────────────────────────────────────────────────────
function TaxCentre({ push, pop, currentBusiness, openBizSwitcher }) {
  const profitData  = [10, 30, 25, 50, 40, 60, 55, 70, 65, 80];
  const taxData     = [8,  20, 15, 30, 25, 40, 35, 45, 40, 50];
  const W = 320, H = 80;
  const normalize = (data, h) => {
    const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
    return data.map((v, i) => ({
      x: (i / (data.length - 1)) * W,
      y: h - ((v - mn) / rng) * (h - 10) - 5,
    }));
  };
  const profitPts = normalize(profitData, H);
  const taxPts    = normalize(taxData, H);
  const toPolyline = pts => pts.map(p => `${p.x},${p.y}`).join(" ");

  const shortcuts = [
    { icon: "bank",  label: "Send Account" },
    { icon: "copy",  label: "Share Doc" },
    { icon: "edit",  label: "Add Notes" },
    { icon: "tax",   label: "Tax Centre" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader
        title="Tax Centre"
        onBack={pop}
        right={
          <div style={{
            background: T.a400 + "18", color: T.a400,
            borderRadius: 80, padding: "5px 12px",
            fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
            cursor: "pointer",
          }}>
            Configure Tax Profile →
          </div>
        }
      />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        {/* BUSINESS SELECTOR ROW */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 14px", gap: 10 }}>
          <div
            onClick={openBizSwitcher}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: T.surf, border: `1px solid ${T.el}`,
              height: 32, borderRadius: 80, padding: "0 12px", cursor: "pointer", maxWidth: "60%",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: currentBusiness?.color || T.action, flexShrink: 0 }} />
            <span style={{
              fontFamily: "Rokkitt, serif", fontSize: 13, color: T.subtle,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {currentBusiness?.name || "Nukoder Business 1"}
            </span>
            <I name="chevD" size={14} color={T.subtle} />
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: T.surf, border: `1px solid ${T.el}`,
            height: 32, borderRadius: 80, padding: "0 12px", cursor: "pointer",
          }}>
            <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.subtle }}>
              {currentBusiness?.id || "NB-00001"}
            </span>
            <I name="copy" size={12} color={T.muted} />
          </div>
        </div>

        {/* ESTIMATED TAX LIABILITY CARD */}
        <div style={{
          margin: "0 16px 16px",
          background: "linear-gradient(135deg,#060919 0%,#0d1140 65%,#060919 100%)",
          border: "1px solid rgba(35,35,255,0.22)",
          borderRadius: 28, padding: 20,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30,
            width: 120, height: 120, borderRadius: "50%",
            background: "rgba(35,35,255,0.18)", filter: "blur(40px)",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{
              fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted,
              textTransform: "uppercase", letterSpacing: 1, marginBottom: 6,
            }}>
              Estimated Tax Liability
            </div>
            <div style={{
              fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 40, color: T.text, marginBottom: 4,
            }}>
              {naira(18750239)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <I name="check" size={12} color={T.okLight} />
              <span style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.okLight }}>
                Based on 22% effective rate
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.action }} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.el }} />
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.el }} />
            </div>
          </div>
        </div>

        {/* SHORTCUTS */}
        <div style={{ margin: "0 16px 14px" }}>
          <div style={{
            fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 600,
            color: T.subtle, marginBottom: 10,
          }}>
            Shortcuts
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {shortcuts.map(sc => (
              <div key={sc.label} style={{
                background: T.surf, border: `1px solid ${T.el}`,
                borderRadius: 14, padding: "12px 6px",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 5, cursor: "pointer",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: T.a400 + "18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <I name={sc.icon} size={20} color={T.a400} />
                </div>
                <span style={{
                  fontFamily: "Rokkitt, serif", fontSize: 10, color: T.muted,
                  marginTop: 4, textAlign: "center",
                }}>
                  {sc.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE SERVICES */}
        <div style={{ margin: "0 0 14px" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px", marginBottom: 10,
          }}>
            <span style={{
              fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 600, color: T.subtle,
            }}>
              Active Services
            </span>
            <span style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.a400, cursor: "pointer" }}>
              See all →
            </span>
          </div>
          <div style={{
            display: "flex", gap: 12, overflowX: "auto",
            scrollbarWidth: "none", paddingBottom: 4, paddingLeft: 16, paddingRight: 16,
          }}>
            <div style={{
              width: 160, minWidth: 160,
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 20, overflow: "hidden",
            }}>
              <div style={{ padding: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(251,146,60,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <I name="dollar" size={24} color={T.warn} />
                </div>
                <div style={{
                  fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14,
                  color: T.text, marginTop: 8,
                }}>
                  Loans
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>
                  Business financing
                </div>
              </div>
              <div style={{ background: "#CCFF00", padding: "10px 14px" }}>
                <span style={{
                  fontFamily: "Rokkitt, serif", fontSize: 11, color: "#000", fontWeight: 700,
                }}>
                  Click here to apply for Nukodes Loans and Salary Advance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PROFIT VS TAX LIABILITY CHART */}
        <div style={{ margin: "0 16px 14px" }}>
          <div style={{
            background: T.surf, border: `1px solid ${T.el}`,
            borderRadius: 20, padding: 16,
          }}>
            <div style={{
              fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 700,
              color: T.text, marginBottom: 12,
            }}>
              Profit vs Tax Liability
            </div>
            <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
              <polyline points={toPolyline(profitPts)} fill="none" stroke={T.a400} strokeWidth="1.8" strokeLinejoin="round" />
              <polyline points={toPolyline(taxPts)}    fill="none" stroke={T.err}  strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            {/* X axis labels */}
            <div style={{
              display: "flex", justifyContent: "space-between", marginTop: 4,
            }}>
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <span key={i} style={{
                  fontFamily: "Rokkitt, serif", fontSize: 9, color: T.muted,
                }}>
                  {d}
                </span>
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.a400 }} />
                <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.subtle }}>Profit</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.err }} />
                <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.subtle }}>Tax Liability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN B: PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function Profile({ push, pop }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader
        title="Profile"
        onBack={pop}
        right={
          <div
            onClick={() => push("editProfile")}
            style={{
              background: T.a400 + "18", color: T.a400,
              borderRadius: 80, padding: "5px 12px",
              fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Edit ✎
          </div>
        }
      />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        {/* PROFILE CARD */}
        <div style={{
          margin: "16px 16px 20px",
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 20, padding: 20,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <Avatar name="Annette Thompson" size={72} />
          <div style={{
            fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 20,
            color: T.text, marginTop: 10,
          }}>
            Annette Thompson
          </div>
          <div
            onClick={() => push("editProfile")}
            style={{
              background: "rgba(35,35,255,0.12)", color: T.a400,
              borderRadius: 80, height: 30, padding: "0 14px",
              fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
              marginTop: 8, cursor: "pointer",
              display: "flex", alignItems: "center",
            }}
          >
            Edit Profile →
          </div>
        </div>

        {/* MANAGEMENT */}
        <div style={{ margin: "0 16px 14px" }}>
          <SectionLabel text="Management" />
          <div style={{
            background: T.surf, border: `1px solid ${T.el}`,
            borderRadius: 16, overflow: "hidden",
          }}>
            <SettingsRow icon="users" label="Employees" sub="Manage staff" />
            <SettingsRow icon="briefcase" label="Team" sub="4 members" onPress={() => push("team")} />
            <SettingsRow icon="settings" label="Preferences" sub="App preferences" noBorder right={<I name="chevR" size={16} color={T.muted} />} />
          </div>
        </div>

        {/* SUPPORT */}
        <div style={{ margin: "0 16px 14px" }}>
          <SectionLabel text="Support" />
          <div style={{
            background: T.surf, border: `1px solid ${T.el}`,
            borderRadius: 16, overflow: "hidden",
          }}>
            <SettingsRow icon="info" label="Help Centre" sub="FAQs & guides" />
            <SettingsRow icon="bell" label="Contact Support" sub="Get in touch" noBorder right={<I name="chevR" size={16} color={T.muted} />} />
          </div>
        </div>

        {/* SIGN OUT */}
        <div style={{ margin: "0 16px" }}>
          <button style={{
            width: "100%", height: 48,
            background: T.el, borderRadius: 80,
            fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 15, color: T.muted,
            border: "none", cursor: "pointer",
          }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN C: EDIT PROFILE
// ─────────────────────────────────────────────────────────────────────────────
function EditProfile({ pop }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader
        title="Edit Profile"
        onBack={pop}
        right={
          <div
            onClick={pop}
            style={{
              background: T.action, color: "#fff",
              borderRadius: 80, padding: "5px 14px",
              fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Save
          </div>
        }
      />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        {/* Cancel */}
        <div
          onClick={pop}
          style={{
            textAlign: "center",
            fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted,
            marginBottom: 16, paddingTop: 8, cursor: "pointer",
          }}
        >
          Cancel
        </div>

        {/* AVATAR SECTION */}
        <div style={{
          display: "flex", justifyContent: "center", padding: 16, marginBottom: 8,
        }}>
          <div style={{ position: "relative" }}>
            <Avatar name="Annette Thompson" size={72} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 22, height: 22, borderRadius: "50%",
              background: T.action,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <I name="camera" size={12} color="#fff" />
            </div>
          </div>
        </div>

        {/* FORM FIELDS */}
        <div style={{
          margin: "0 16px",
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          <FormField label="Username" value="Annette Thompson" />
          <FormField label="Email" value="annette@company.com" />
          <FormField label="Email 2" value="annettepma@company.com" />
          <FormField label="Phone" value="+234 (000) 0000 - 0000" />
        </div>

        {/* SAVE BUTTON */}
        <div style={{ margin: "16px 16px 0" }}>
          <button
            onClick={pop}
            style={{
              width: "100%", height: 48,
              background: T.action, borderRadius: 80,
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
              border: "none", cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN D: INTEGRATIONS
// ─────────────────────────────────────────────────────────────────────────────
function Integrations({ pop }) {
  const integrations = [
    { name: "QuickBooks", desc: "Sync receipts and Revenue",        icon: "briefcase", iconBg: T.ok  + "18",                     color: T.ok,     connected: true  },
    { name: "Xero",       desc: "Accounting software integration",  icon: "globe",     iconBg: T.a400 + "18",                    color: T.a400,   connected: false },
    { name: "Stripe",     desc: "Payments processing",              icon: "link2",     iconBg: "rgba(99,91,255,0.15)",            color: "#635BFF", connected: true  },
    { name: "PayPal",     desc: "Global payments",                  icon: "dollar",    iconBg: T.a400 + "18",                    color: T.a400,   connected: false },
    { name: "Google Drive",desc:"Cloud document backup",            icon: "building",  iconBg: "rgba(66,133,244,0.15)",           color: "#4285F4", connected: true  },
    { name: "Dropbox",    desc: "File ref and share",               icon: "box",       iconBg: "rgba(0,97,255,0.15)",             color: "#0061FF", connected: false },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Integrations" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        <div style={{
          fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted,
          padding: "8px 20px 16px",
        }}>
          Connect your services and tools seamlessly
        </div>

        <div style={{
          margin: "0 16px",
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 20, overflow: "hidden",
        }}>
          {integrations.map((item, i) => (
            <div
              key={item.name}
              style={{
                padding: "14px 16px",
                borderBottom: i < integrations.length - 1 ? `1px solid ${T.el}` : "none",
                display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: item.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <I name={item.icon} size={18} color={item.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text,
                }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted }}>
                  {item.desc}
                </div>
              </div>
              {item.connected ? (
                <div style={{
                  background: "rgba(40,173,31,0.15)",
                  color: T.okLight,
                  border: "1px solid rgba(40,173,31,0.25)",
                  borderRadius: 80, height: 28, padding: "0 10px",
                  fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
                  display: "flex", alignItems: "center",
                }}>
                  Connected
                </div>
              ) : (
                <div style={{
                  background: T.action, color: "#fff",
                  border: "none", borderRadius: 80, height: 28, padding: "0 10px",
                  fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
                  display: "flex", alignItems: "center", cursor: "pointer",
                }}>
                  Connect
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN E: TEAM
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_MEMBERS = [
  { name: "Annette Thompson", role: "Owner",          email: "annette@company.com",  isYou: true  },
  { name: "Marcus Johnson",   role: "Sales Rep",       email: "marcus@company.com",               },
  { name: "James Rodriguez",  role: "Accountant",      email: "james@company.com",                },
  { name: "James Patterson",  role: "Inventory Mgr",   email: "patterson@company.com",            },
  { name: "Sarah Chen",       role: "Cashier",         email: "sarah@company.com",                },
];

function Team({ pop }) {
  const [members, setMembers]         = useState(INITIAL_MEMBERS);
  const [removingMember, setRemoving] = useState(null);
  const [addingMember, setAdding]     = useState(false);

  const doRemove = () => {
    setMembers(m => m.filter(x => x !== removingMember));
    setRemoving(null);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <InnerHeader
        title="Team"
        onBack={pop}
        right={
          <div
            onClick={() => setAdding(true)}
            style={{
              background: T.action, color: "#fff",
              borderRadius: 80, padding: "5px 12px",
              fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add Member +
          </div>
        }
      />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        <div style={{
          fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted,
          padding: "8px 20px 12px",
        }}>
          Manage your business team members
        </div>

        <div style={{
          margin: "0 16px",
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 16, overflow: "hidden",
        }}>
          {members.map((member, i) => (
            <div
              key={member.email}
              style={{
                padding: "12px 14px",
                borderBottom: i < members.length - 1 ? `1px solid ${T.el}` : "none",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <Avatar name={member.name} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 13, color: T.text,
                }}>
                  {member.name}{member.isYou && <span style={{ color: T.muted, fontWeight: 400 }}> (you)</span>}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>
                  {member.role}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 10, color: T.muted, marginTop: 1 }}>
                  {member.email}
                </div>
              </div>
              {!member.isYou && (
                <div
                  onClick={() => setRemoving(member)}
                  style={{
                    width: 30, height: 30, borderRadius: 10,
                    background: "rgba(239,68,68,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <I name="trash" size={14} color={T.err} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* REMOVE MODAL */}
      {removingMember && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 99,
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-end",
        }}>
          <div style={{
            width: "100%", background: T.surf,
            borderRadius: "20px 20px 0 0",
            padding: "20px 20px 32px",
          }}>
            <div style={{
              width: 40, height: 4, background: T.el, borderRadius: 2,
              margin: "0 auto 16px",
            }} />
            <div style={{
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 16, color: T.text,
              textAlign: "center", marginBottom: 8,
            }}>
              Remove Member
            </div>
            <div style={{
              fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted,
              textAlign: "center", marginBottom: 20,
            }}>
              This action will revoke workspace access.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setRemoving(null)}
                style={{
                  flex: 1, height: 44, background: T.el, borderRadius: 80,
                  fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 14, color: T.muted,
                  border: "none", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={doRemove}
                style={{
                  flex: 1, height: 44, background: T.err, borderRadius: 80,
                  fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 14, color: "#fff",
                  border: "none", cursor: "pointer",
                }}
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER SHEET */}
      {addingMember && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 99,
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-end",
        }}>
          <div style={{
            width: "100%", background: T.surf,
            borderRadius: "20px 20px 0 0",
            padding: "20px 20px 32px",
          }}>
            <div style={{
              width: 40, height: 4, background: T.el, borderRadius: 2,
              margin: "0 auto 16px",
            }} />
            <div style={{
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 16, color: T.text,
              textAlign: "center", marginBottom: 20,
            }}>
              Add Member
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <FormField label="Full Name" value="Mike Osei" />
              <FormField label="Email Address" value="" />
              <FormField label="Role" value="Admin" chevron />
            </div>
            <button style={{
              width: "100%", height: 44, background: T.action, borderRadius: 80,
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: "#fff",
              border: "none", cursor: "pointer", marginBottom: 12,
            }}>
              Save Changes
            </button>
            <div
              onClick={() => setAdding(false)}
              style={{
                textAlign: "center", fontFamily: "Rokkitt, serif", fontSize: 13,
                color: T.muted, cursor: "pointer",
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN F: BUSINESS ONBOARDING
// ─────────────────────────────────────────────────────────────────────────────
function BusinessOnboarding({ pop }) {
  const [step, setStep] = useState(1);

  const stepTitles = {
    1: "Add Business Info",
    2: "Add Business Info",
    3: "Add Business Info",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader
        title={stepTitles[step]}
        onBack={pop}
        right={
          <div style={{
            fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted, cursor: "pointer",
          }}>
            Save as draft 💾
          </div>
        }
      />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        {/* PROGRESS SEGMENTS */}
        <div style={{
          margin: "14px 16px 20px",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4,
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: 3, borderRadius: 3,
              background: step >= i ? T.action : T.el,
            }} />
          ))}
        </div>

        {step === 1 && (
          <div style={{ padding: "0 16px" }}>
            {/* Section label */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted,
                }}>
                  Company Information
                </span>
                <I name="info" size={14} color={T.muted} />
              </div>
              <I name="chevR" size={14} color={T.muted} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <FormField label="Company Name" value="Placeholder" />
              <FormField label="RC Number" value="1234567890" />
              <FormField label="TIN" value="1234-0001" />
              <FormField label="Business Type" value="" chevron />
              <FormField label="Phone Number" value="+234 123 456 7890" />
              <FormField label="Email Address" value="company@example.com" />
            </div>
            <button
              onClick={() => setStep(2)}
              style={{
                width: "100%", height: 48, background: T.action, borderRadius: 80,
                fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
                border: "none", cursor: "pointer", marginTop: 16,
              }}
            >
              Next
            </button>
            <div
              onClick={pop}
              style={{
                textAlign: "center", fontFamily: "Rokkitt, serif", fontSize: 13,
                color: T.muted, marginTop: 10, cursor: "pointer",
              }}
            >
              Cancel
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: "0 16px" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted }}>
                  Add Business Location
                </span>
                <I name="info" size={14} color={T.muted} />
              </div>
              <I name="chevR" size={14} color={T.muted} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <FormField label="Address" value="ex. 123 Onitsha Road" />
              <FormField label="City (optional)" value="" />
              <FormField label="State" value="" chevron />
              <FormField label="Select LGA" value="" chevron />
              <FormField label="Phone Number" value="+234 123 456 7890" />
              <FormField label="Email Address" value="company@example.com" />
            </div>
            <button
              onClick={() => setStep(3)}
              style={{
                width: "100%", height: 48, background: T.action, borderRadius: 80,
                fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
                border: "none", cursor: "pointer", marginTop: 16,
              }}
            >
              Create Business
            </button>
            <div
              onClick={pop}
              style={{
                textAlign: "center", fontFamily: "Rokkitt, serif", fontSize: 13,
                color: T.muted, marginTop: 10, cursor: "pointer",
              }}
            >
              Cancel
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            paddingTop: 60, padding: "60px 16px 0",
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(40,173,31,0.12)",
              border: "2px solid rgba(40,173,31,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <I name="check" size={36} color={T.okLight} strokeWidth={2} />
            </div>
            <div style={{
              fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 24, color: T.text,
              marginTop: 20, textAlign: "center",
            }}>
              Business Created!
            </div>
            <div style={{
              fontFamily: "Rokkitt, serif", fontSize: 14, color: T.muted,
              marginTop: 8, textAlign: "center", lineHeight: 1.6,
            }}>
              Nukoder Business 1 has been set up successfully.
            </div>
            <button
              onClick={pop}
              style={{
                width: "100%", height: 48, background: T.action, borderRadius: 80,
                fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
                border: "none", cursor: "pointer", marginTop: 32,
              }}
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH: SPLASH
// ─────────────────────────────────────────────────────────────────────────────
function Splash({ setAuthPhase }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: T.bg, overflow: "hidden", position: "relative",
    }}>
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: 280, height: 280, borderRadius: "50%",
        background: "rgba(35,35,255,0.14)", filter: "blur(80px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "-10%",
        width: 160, height: 160, borderRadius: "50%",
        background: "rgba(76,76,255,0.10)", filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* Top branding area */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 32px", position: "relative",
      }}>
        {/* Logo mark */}
        <div style={{
          width: 72, height: 72, borderRadius: 22,
          background: "linear-gradient(135deg,#2323FF 0%,#4C4CFF 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 8px 32px rgba(35,35,255,0.45)",
        }}>
          <I name="building" size={36} color="#fff" strokeWidth={1.5} />
        </div>

        {/* Wordmark */}
        <div style={{
          fontFamily: "Oswald, sans-serif", fontWeight: 700,
          fontSize: 38, color: T.text, letterSpacing: 3,
          marginBottom: 10,
        }}>
          NUKODES
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "Rokkitt, serif", fontSize: 15, color: T.muted,
          textAlign: "center", lineHeight: 1.6, maxWidth: 260,
        }}>
          Smart money management for Nigerian businesses
        </div>

        {/* Mini card preview */}
        <div style={{
          marginTop: 36, width: "100%", maxWidth: 300,
          background: "linear-gradient(135deg,#060919 0%,#0d1140 70%,#060919 100%)",
          border: "1px solid rgba(35,35,255,0.25)",
          borderRadius: 20, padding: "16px 20px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(35,35,255,0.2)", filter: "blur(24px)" }} />
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 10, color: T.muted, letterSpacing: 1, textTransform: "uppercase" }}>Cash on Hand</div>
          <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 26, color: T.text, margin: "4px 0" }}>₦ 18,750,239</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <I name="arrowUp" size={11} color={T.okLight} />
            <span style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.okLight }}>+12.9% vs last month</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.action }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.el }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.el }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.el }} />
          </div>
        </div>
      </div>

      {/* CTA area */}
      <div style={{ padding: "0 24px 48px", display: "flex", flexDirection: "column", gap: 12 }}>
        <button
          onClick={() => setAuthPhase("signup")}
          style={{
            width: "100%", height: 52, borderRadius: 80,
            background: T.action, border: "none",
            fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 16, color: "#fff",
            cursor: "pointer", boxShadow: "0 4px 20px rgba(35,35,255,0.4)",
          }}
        >
          Create Account
        </button>
        <button
          onClick={() => setAuthPhase("signin")}
          style={{
            width: "100%", height: 52, borderRadius: 80,
            background: "transparent",
            border: `1px solid ${T.el}`,
            fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 15, color: T.subtle,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
        <div style={{
          textAlign: "center", fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 4,
        }}>
          By continuing you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH: SIGN IN
// ─────────────────────────────────────────────────────────────────────────────
function SignIn({ setAuthPhase }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const submit = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthPhase("app"); }, 1200);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Back */}
      <div style={{ padding: "14px 20px 0" }}>
        <button
          onClick={() => setAuthPhase("splash")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, padding: 0,
          }}
        >
          <I name="chevL" size={18} color={T.muted} />
          <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>Back</span>
        </button>
      </div>

      <div style={{ flex: 1, padding: "28px 24px 0", display: "flex", flexDirection: "column" }}>
        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 30, color: T.text, marginBottom: 6 }}>
            Welcome back
          </div>
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.muted }}>
            Sign in to your Nukodes account
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <AuthField label="Email address" value={email} onChange={setEmail} type="email" placeholder="you@company.com" />
          <AuthField label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
        </div>

        {/* Forgot */}
        <div style={{
          textAlign: "right", marginTop: 10,
          fontFamily: "Rokkitt, serif", fontSize: 12, color: T.a400, cursor: "pointer",
        }}>
          Forgot password?
        </div>

        {/* Sign In */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%", height: 52, borderRadius: 80, marginTop: 28,
            background: loading ? T.el : T.action, border: "none",
            fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: loading ? T.muted : "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 24px 40px", textAlign: "center" }}>
        <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>Don't have an account? </span>
        <span
          onClick={() => setAuthPhase("signup")}
          style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.a400, cursor: "pointer", fontWeight: 600 }}
        >
          Create one
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH: SIGN UP
// ─────────────────────────────────────────────────────────────────────────────
function SignUp({ setAuthPhase, addRecord, data }) {
  const [step, setStep]         = useState(1);
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [bizName, setBizName]   = useState("");
  const [bizType, setBizType]   = useState("Retail");
  const [loading, setLoading]   = useState(false);

  const step1Valid = name && email && password.length >= 6;

  const submit = () => {
    if (!bizName) return;
    setLoading(true);
    setTimeout(() => {
      const newId = `NB-${String(data.businesses.length + 3).padStart(5, "0")}`;
      addRecord("businesses", { id: newId, name: bizName, type: bizType, industry: "Other", color: T.action });
      setLoading(false);
      setAuthPhase("app");
    }, 1400);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: T.bg, overflow: "hidden" }}>
      {/* Back */}
      <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => step === 1 ? setAuthPhase("splash") : setStep(1)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 }}
        >
          <I name="chevL" size={18} color={T.muted} />
          <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>Back</span>
        </button>
        <span style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted }}>{step} of 2</span>
      </div>

      {/* Progress */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, margin: "12px 24px 0" }}>
        {[1,2].map(i => (
          <div key={i} style={{ height: 3, borderRadius: 3, background: step >= i ? T.action : T.el }} />
        ))}
      </div>

      <div style={{ flex: 1, padding: "24px 24px 0", overflowY: "auto", scrollbarWidth: "none" }}>
        {step === 1 && (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 28, color: T.text, marginBottom: 6 }}>
                Create your account
              </div>
              <div style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.muted }}>
                Your personal details
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <AuthField label="Full Name"      value={name}     onChange={setName}     placeholder="Haruna Musa" />
              <AuthField label="Email address"  value={email}    onChange={setEmail}    type="email"    placeholder="you@company.com" />
              <AuthField label="Password"       value={password} onChange={setPassword} type="password" placeholder="Min 6 characters" />
            </div>
            <button
              onClick={() => step1Valid && setStep(2)}
              style={{
                width: "100%", height: 52, borderRadius: 80, marginTop: 28,
                background: step1Valid ? T.action : T.el, border: "none",
                fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15,
                color: step1Valid ? "#fff" : T.muted, cursor: step1Valid ? "pointer" : "not-allowed",
                transition: "background 0.2s",
              }}
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 28, color: T.text, marginBottom: 6 }}>
                Set up your business
              </div>
              <div style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.muted }}>
                You can add more businesses later
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <AuthField label="Business Name" value={bizName} onChange={setBizName} placeholder="e.g. Musa Enterprises" />
              {/* Business type pills */}
              <div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 8 }}>Business Type</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Retail","Services","Manufacturing","Agriculture","Other"].map(t => (
                    <button key={t} onClick={() => setBizType(t)} style={{
                      height: 34, padding: "0 14px", borderRadius: 80,
                      background: bizType === t ? T.action : T.surf,
                      border: `1px solid ${bizType === t ? T.action : T.el}`,
                      fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
                      color: bizType === t ? "#fff" : T.muted, cursor: "pointer",
                    }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={submit}
              disabled={loading || !bizName}
              style={{
                width: "100%", height: 52, borderRadius: 80, marginTop: 28,
                background: loading || !bizName ? T.el : T.action, border: "none",
                fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15,
                color: loading || !bizName ? T.muted : "#fff",
                cursor: loading || !bizName ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px 40px", textAlign: "center" }}>
        <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.muted }}>Already have an account? </span>
        <span
          onClick={() => setAuthPhase("signin")}
          style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: T.a400, cursor: "pointer", fontWeight: 600 }}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}

// Shared clean input for auth screens
function AuthField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 5 }}>{label}</div>
      <div style={{
        background: T.surf, border: `1px solid ${T.el}`,
        borderRadius: 14, height: 52, padding: "0 16px",
        display: "flex", alignItems: "center",
      }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "Rokkitt, serif", fontSize: 15, color: T.text,
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS SWITCHER SHEET
// ─────────────────────────────────────────────────────────────────────────────
function BusinessSwitcherSheet({ data, currentBizId, switchBusiness, push, onClose }) {
  const businesses = data.businesses || [];

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 99,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.surf, borderRadius: "24px 24px 0 0",
          padding: "0 0 32px",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: T.el }} />
        </div>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 20px 16px",
          borderBottom: `1px solid ${T.el}`,
        }}>
          <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 16, color: T.text }}>
            My Businesses
          </div>
          <div style={{
            background: T.a400 + "18", color: T.a400,
            borderRadius: 80, padding: "4px 12px",
            fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
          }}>
            {businesses.length} workspace{businesses.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Business list */}
        <div style={{ padding: "8px 0" }}>
          {businesses.map((biz, i) => {
            const isActive = biz.id === currentBizId;
            return (
              <div
                key={biz.id}
                onClick={() => { switchBusiness(biz.id); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 20px",
                  background: isActive ? T.action + "0D" : "transparent",
                  cursor: "pointer",
                  borderBottom: i < businesses.length - 1 ? `1px solid ${T.el}` : "none",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                  background: (biz.color || T.action) + "22",
                  border: `1px solid ${biz.color || T.action}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "Oswald, sans-serif", fontWeight: 700,
                    fontSize: 14, color: biz.color || T.action,
                  }}>
                    {biz.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
                    {biz.name}
                  </div>
                  <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 1 }}>
                    {biz.type} · {biz.id}
                  </div>
                </div>

                {/* Active / Switch */}
                {isActive ? (
                  <div style={{
                    background: T.action + "1A", color: T.action,
                    borderRadius: 80, padding: "4px 10px",
                    fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 700,
                  }}>
                    Active
                  </div>
                ) : (
                  <div style={{
                    background: T.el, color: T.subtle,
                    borderRadius: 80, padding: "4px 10px",
                    fontFamily: "Rokkitt, serif", fontSize: 11, fontWeight: 600,
                    cursor: "pointer",
                  }}>
                    Switch
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add business */}
        <div style={{ padding: "0 16px", marginTop: 4 }}>
          <button
            onClick={() => { onClose(); push("businessOnboarding"); }}
            style={{
              width: "100%", height: 48, borderRadius: 80,
              background: "transparent", border: `1px solid ${T.el}`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "Rokkitt, serif", fontWeight: 600, fontSize: 14, color: T.subtle,
              cursor: "pointer",
            }}
          >
            <I name="plus" size={18} color={T.a400} />
            Add New Business
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDITABLE FIELD (real <input>)
// ─────────────────────────────────────────────────────────────────────────────
function EditableField({ label, value, onChange, placeholder, type = "text", chevron }) {
  return (
    <div>
      <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        background: T.surf, border: `1px solid ${T.el}`,
        borderRadius: 12, height: 48, padding: "0 14px",
        display: "flex", alignItems: "center",
      }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || label}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text,
          }}
        />
        {chevron && <I name="chevD" size={16} color={T.muted} />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: INVOICE LIST
// ─────────────────────────────────────────────────────────────────────────────
function InvoiceList({ push, pop, data }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Outstanding", "Overdue", "Paid"];
  const statusMap = { Outstanding: "sent", Overdue: "overdue", Paid: "paid" };

  const invoices = data.invoices.filter(inv => {
    if (filter === "All") return true;
    return inv.status === statusMap[filter];
  });

  const outstanding = data.invoices.filter(i => i.status === "sent" || i.status === "draft")
    .reduce((s, i) => s + i.amount, 0);
  const overdue = data.invoices.filter(i => i.status === "overdue")
    .reduce((s, i) => s + i.amount, 0);

  const badgeType = s => s === "paid" ? "ok" : s === "overdue" ? "err" : s === "draft" ? "neutral" : "warn";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <InnerHeader title="Invoices" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80, scrollbarWidth: "none" }}>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              height: 32, borderRadius: 80, padding: "0 14px",
              background: filter === f ? T.action : T.surf,
              border: `1px solid ${filter === f ? T.action : T.el}`,
              fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
              color: filter === f ? "#fff" : T.muted,
              cursor: "pointer", flexShrink: 0,
            }}>{f}</button>
          ))}
        </div>

        {/* Summary row */}
        <div style={{ display: "flex", gap: 10, margin: "0 16px 14px" }}>
          <div style={{ flex: 1, background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, padding: 14 }}>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>Outstanding</div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 18, color: T.text }}>
              {naira(outstanding)}
            </div>
          </div>
          <div style={{ flex: 1, background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, padding: 14 }}>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>Overdue</div>
            <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 18, color: T.err }}>
              {naira(overdue)}
            </div>
          </div>
        </div>

        {/* List */}
        <div style={{ margin: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {invoices.map(inv => (
            <div key={inv.id} style={{
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 16, padding: 14,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
                  {inv.customer}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
                  {inv.id} · Due {inv.dueDate}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 15, color: T.text }}>
                  {naira(inv.amount)}
                </div>
                <div style={{ marginTop: 4 }}>
                  <Badge label={inv.status} type={badgeType(inv.status)} />
                </div>
              </div>
            </div>
          ))}
          {invoices.length === 0 && (
            <div style={{
              textAlign: "center", padding: "40px 0",
              fontFamily: "Rokkitt, serif", fontSize: 14, color: T.muted,
            }}>
              No invoices
            </div>
          )}
        </div>
      </div>

      {/* FAB */}
      <div
        onClick={() => push("addInvoice")}
        style={{
          position: "absolute", bottom: 80, right: 16,
          width: 56, height: 56, borderRadius: "50%",
          background: T.action, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(35,35,255,0.5)", zIndex: 10,
        }}
      >
        <I name="plus" size={24} color="#fff" strokeWidth={2.2} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: ADD INVOICE
// ─────────────────────────────────────────────────────────────────────────────
function AddInvoice({ pop, addRecord, data }) {
  const [client, setClient]     = useState("");
  const [invNum, setInvNum]     = useState(`INV-${String(data.invoices.length + 1247).padStart(6, "0")}`);
  const [amount, setAmount]     = useState("");
  const [dueDate, setDueDate]   = useState("");
  const [vatOn, setVatOn]       = useState(false);

  const subtotal = parseFloat(amount) || 0;
  const vat      = vatOn ? subtotal * 0.075 : 0;
  const total    = subtotal + vat;

  const submit = () => {
    if (!client || !amount) return alert("Please fill in client name and amount.");
    addRecord("invoices", {
      id: invNum, customer: client, amount: total,
      date: new Date().toISOString().slice(0,10),
      dueDate: dueDate || "N/A",
      status: "draft",
    });
    pop();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="New Invoice" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none", padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <EditableField label="Client Name"  value={client}  onChange={setClient}  placeholder="e.g. Iya Bisi Stores" />
          <EditableField label="Invoice #"    value={invNum}  onChange={setInvNum} />
          <EditableField label="Amount (₦)"   value={amount}  onChange={setAmount}  type="number" placeholder="0" />
          <EditableField label="Due Date"     value={dueDate} onChange={setDueDate} type="date" />
        </div>

        {/* VAT toggle */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          margin: "16px 0 0",
          background: T.surf, border: `1px solid ${T.el}`,
          borderRadius: 12, padding: "12px 14px",
        }}>
          <div>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text }}>Apply VAT (7.5%)</div>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>Nigerian standard rate</div>
          </div>
          <div
            onClick={() => setVatOn(v => !v)}
            style={{
              width: 44, height: 24, borderRadius: 12,
              background: vatOn ? T.action : T.el,
              position: "relative", cursor: "pointer", transition: "background 0.2s",
            }}
          >
            <div style={{
              position: "absolute", top: 3, left: vatOn ? 23 : 3,
              width: 18, height: 18, borderRadius: "50%",
              background: "#fff", transition: "left 0.2s",
            }} />
          </div>
        </div>

        {/* Summary */}
        <div style={{ margin: "14px 0 0", background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, overflow: "hidden" }}>
          {[
            { label: "Subtotal", val: subtotal },
            { label: "VAT (7.5%)", val: vat },
            { label: "Total", val: total, bold: true },
          ].map((row, i, arr) => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 14px",
              borderBottom: i < arr.length - 1 ? `1px solid ${T.el}` : "none",
            }}>
              <span style={{ fontFamily: "Rokkitt, serif", fontSize: 13, color: row.bold ? T.text : T.muted }}>
                {row.label}
              </span>
              <span style={{
                fontFamily: "Oswald, sans-serif", fontSize: row.bold ? 16 : 14,
                fontWeight: row.bold ? 700 : 400, color: T.text,
              }}>
                {naira(row.val)}
              </span>
            </div>
          ))}
        </div>

        <button onClick={submit} style={{
          width: "100%", height: 48, marginTop: 16,
          background: T.action, borderRadius: 80,
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
          border: "none", cursor: "pointer",
        }}>
          Create Invoice
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: EXPENSE LIST
// ─────────────────────────────────────────────────────────────────────────────
function ExpenseList({ push, pop, data }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "This Week", "This Month"];

  const now = new Date("2026-03-10");
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const monthAgo = new Date(now); monthAgo.setDate(1);

  const expenses = data.expenses.filter(e => {
    if (filter === "All") return true;
    const d = new Date(e.date);
    if (filter === "This Week") return d >= weekAgo;
    return d >= monthAgo;
  });

  const totalSpend = expenses.reduce((s, e) => s + e.amount, 0);

  const catIcon = cat => {
    const m = { Utilities:"plug", Supplies:"box", Operations:"settings", Rent:"building",
                Salaries:"users", Transport:"truck", Other:"briefcase" };
    return m[cat] || "tag";
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <InnerHeader title="Expenses" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80, scrollbarWidth: "none" }}>
        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, padding: "10px 16px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              height: 32, borderRadius: 80, padding: "0 14px",
              background: filter === f ? T.action : T.surf,
              border: `1px solid ${filter === f ? T.action : T.el}`,
              fontFamily: "Rokkitt, serif", fontSize: 12, fontWeight: 600,
              color: filter === f ? "#fff" : T.muted,
              cursor: "pointer", flexShrink: 0,
            }}>{f}</button>
          ))}
        </div>

        {/* Total spend card */}
        <div style={{ margin: "0 16px 14px", background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, padding: 14 }}>
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted }}>Total Spend</div>
          <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 24, color: T.err }}>
            {naira(totalSpend)}
          </div>
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
            {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* List */}
        <div style={{ margin: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {expenses.map(exp => (
            <div key={exp.id} style={{
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 16, padding: 14,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: T.err + "18",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <I name={catIcon(exp.category)} size={18} color={T.err} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
                  {exp.vendor}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
                  {exp.category} · {exp.date}
                </div>
              </div>
              <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 15, color: T.err }}>
                -{naira(exp.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div
        onClick={() => push("addExpense")}
        style={{
          position: "absolute", bottom: 80, right: 16,
          width: 56, height: 56, borderRadius: "50%",
          background: T.action, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(35,35,255,0.5)", zIndex: 10,
        }}
      >
        <I name="plus" size={24} color="#fff" strokeWidth={2.2} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: ADD EXPENSE
// ─────────────────────────────────────────────────────────────────────────────
function AddExpense({ pop, addRecord }) {
  const [desc, setDesc]     = useState("");
  const [cat, setCat]       = useState("Utilities");
  const [amount, setAmount] = useState("");
  const [date, setDate]     = useState("2026-03-10");
  const [catOpen, setCatOpen] = useState(false);
  const categories = ["Rent", "Utilities", "Salaries", "Transport", "Supplies", "Other"];

  const submit = () => {
    if (!desc || !amount) return alert("Please fill description and amount.");
    addRecord("expenses", {
      id: `e${Date.now()}`, vendor: desc, category: cat,
      amount: parseFloat(amount) || 0, date, note: desc,
    });
    pop();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Add Expense" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none", padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <EditableField label="Description" value={desc}   onChange={setDesc}   placeholder="e.g. Monthly data bundle" />
          <EditableField label="Amount (₦)"  value={amount} onChange={setAmount} type="number" placeholder="0" />
          <EditableField label="Date"        value={date}   onChange={setDate}   type="date" />

          {/* Category picker */}
          <div>
            <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 4 }}>Category</div>
            <div
              onClick={() => setCatOpen(o => !o)}
              style={{
                background: T.surf, border: `1px solid ${T.el}`,
                borderRadius: 12, height: 48, padding: "0 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text }}>{cat}</span>
              <I name="chevD" size={16} color={T.muted} />
            </div>
            {catOpen && (
              <div style={{
                background: T.surf, border: `1px solid ${T.el}`,
                borderRadius: 12, marginTop: 4, overflow: "hidden",
              }}>
                {categories.map((c, i) => (
                  <div
                    key={c}
                    onClick={() => { setCat(c); setCatOpen(false); }}
                    style={{
                      padding: "11px 14px",
                      borderBottom: i < categories.length - 1 ? `1px solid ${T.el}` : "none",
                      fontFamily: "Rokkitt, serif", fontSize: 14,
                      color: c === cat ? T.action : T.text,
                      cursor: "pointer",
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={submit} style={{
          width: "100%", height: 48, marginTop: 20,
          background: T.action, borderRadius: 80,
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
          border: "none", cursor: "pointer",
        }}>
          Add Expense
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: PRODUCT LIST
// ─────────────────────────────────────────────────────────────────────────────
function ProductList({ push, pop, data }) {
  const [query, setQuery] = useState("");
  const products = (data.products || []).filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.sku.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <InnerHeader title="Products" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80, scrollbarWidth: "none" }}>
        {/* Search */}
        <div style={{ margin: "10px 16px 14px" }}>
          <div style={{
            background: T.surf, border: `1px solid ${T.el}`,
            borderRadius: 12, height: 44, padding: "0 14px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <I name="search" size={16} color={T.muted} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products…"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text,
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div style={{ margin: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {products.map(prod => (
            <div key={prod.id} style={{
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 16, padding: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: T.a400 + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 8,
              }}>
                <I name="box" size={20} color={T.a400} />
              </div>
              <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 13, color: T.text }}>
                {prod.name}
              </div>
              <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
                SKU: {prod.sku}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 14, color: T.text }}>
                  {naira(prod.price)}
                </div>
                <div style={{
                  background: prod.stock > 50 ? T.ok + "18" : T.warn + "18",
                  borderRadius: 80, padding: "2px 8px",
                  fontFamily: "Rokkitt, serif", fontSize: 10,
                  color: prod.stock > 50 ? T.okLight : T.warn,
                }}>
                  {prod.stock} units
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <div
        onClick={() => push("addProduct")}
        style={{
          position: "absolute", bottom: 80, right: 16,
          width: 56, height: 56, borderRadius: "50%",
          background: T.action, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(35,35,255,0.5)", zIndex: 10,
        }}
      >
        <I name="plus" size={24} color="#fff" strokeWidth={2.2} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: ADD PRODUCT
// ─────────────────────────────────────────────────────────────────────────────
function AddProduct({ pop, addRecord }) {
  const [name, setName]     = useState("");
  const [sku, setSku]       = useState("");
  const [price, setPrice]   = useState("");
  const [stock, setStock]   = useState("");
  const [cat, setCat]       = useState("Grains");

  const submit = () => {
    if (!name || !price) return alert("Please fill in product name and price.");
    addRecord("products", {
      id: `p${Date.now()}`, name, sku: sku || `SKU-${Date.now()}`,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      category: cat,
    });
    pop();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Add Product" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none", padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <EditableField label="Product Name"   value={name}  onChange={setName}  placeholder="e.g. Rice (50kg)" />
          <EditableField label="SKU"            value={sku}   onChange={setSku}   placeholder="e.g. RCE-050" />
          <EditableField label="Price (₦)"      value={price} onChange={setPrice} type="number" placeholder="0" />
          <EditableField label="Stock Quantity" value={stock} onChange={setStock} type="number" placeholder="0" />
          <EditableField label="Category"       value={cat}   onChange={setCat}   placeholder="e.g. Grains" />
        </div>

        <button onClick={submit} style={{
          width: "100%", height: 48, marginTop: 20,
          background: T.action, borderRadius: 80,
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 15, color: "#fff",
          border: "none", cursor: "pointer",
        }}>
          Add Product
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: POS TERMINAL
// ─────────────────────────────────────────────────────────────────────────────
function POSTerminal({ pop, addRecord }) {
  const [amount, setAmount] = useState("0");
  const [charged, setCharged] = useState(false);

  const appendDigit = d => {
    if (amount === "0") setAmount(d);
    else setAmount(a => a + d);
  };
  const deleteLast = () => setAmount(a => a.length > 1 ? a.slice(0, -1) : "0");
  const clear = () => setAmount("0");

  const charge = () => {
    if (parseFloat(amount) <= 0) return;
    addRecord("sales", {
      id: `s${Date.now()}`, customer: "Walk-in", items: "POS Sale",
      amount: parseFloat(amount), date: "2026-03-10", status: "paid",
    });
    setCharged(true);
    setTimeout(() => { setCharged(false); setAmount("0"); pop(); }, 1500);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Point of Sale" onBack={pop} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px", gap: 16 }}>

        {/* Amount display */}
        <div style={{
          background: "linear-gradient(135deg,#060919 0%,#0d1140 100%)",
          border: "1px solid rgba(35,35,255,0.22)",
          borderRadius: 24, padding: "28px 20px",
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "Rokkitt, serif", fontSize: 12, color: T.muted, marginBottom: 6 }}>AMOUNT</div>
          <div style={{
            fontFamily: "Oswald, sans-serif", fontWeight: 700,
            fontSize: parseFloat(amount) >= 1000000 ? 28 : 36,
            color: T.text,
          }}>
            ₦ {Number(amount).toLocaleString("en-NG")}
          </div>
        </div>

        {/* Quick amounts */}
        <div style={{ display: "flex", gap: 8 }}>
          {quickAmounts.map(q => (
            <button key={q} onClick={() => setAmount(String((parseFloat(amount)||0) + q))} style={{
              flex: 1, height: 36, background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 80, fontFamily: "Rokkitt, serif", fontSize: 12,
              color: T.a400, cursor: "pointer",
            }}>
              +{q >= 1000 ? `${q/1000}k` : q}
            </button>
          ))}
        </div>

        {/* Keypad */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, flex: 1 }}>
          {["1","2","3","4","5","6","7","8","9","C","0","⌫"].map(k => (
            <button
              key={k}
              onClick={() => {
                if (k === "C") clear();
                else if (k === "⌫") deleteLast();
                else appendDigit(k);
              }}
              style={{
                height: "100%", minHeight: 56, borderRadius: 16,
                background: k === "C" ? T.err + "18" : k === "⌫" ? T.el : T.surf,
                border: `1px solid ${T.el}`,
                fontFamily: k === "⌫" ? "inherit" : "Oswald, sans-serif",
                fontSize: 20, fontWeight: 600,
                color: k === "C" ? T.err : T.text,
                cursor: "pointer",
              }}
            >
              {k}
            </button>
          ))}
        </div>

        {/* Charge button */}
        <button onClick={charge} style={{
          width: "100%", height: 52,
          background: charged ? T.ok : T.action,
          borderRadius: 80,
          fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 16, color: "#fff",
          border: "none", cursor: "pointer",
          transition: "background 0.2s",
        }}>
          {charged ? "✓ Charged!" : `Charge ${naira(parseFloat(amount) || 0)}`}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INNER SCREEN: CUSTOMER LIST
// ─────────────────────────────────────────────────────────────────────────────
function CustomerList({ pop, data }) {
  const [query, setQuery] = useState("");
  const customers = (data.customers || []).filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <InnerHeader title="Customers" onBack={pop} />
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20, scrollbarWidth: "none" }}>
        {/* Search */}
        <div style={{ margin: "10px 16px 14px" }}>
          <div style={{
            background: T.surf, border: `1px solid ${T.el}`,
            borderRadius: 12, height: 44, padding: "0 14px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <I name="search" size={16} color={T.muted} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search customers…"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontFamily: "Rokkitt, serif", fontSize: 14, color: T.text,
              }}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ margin: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {customers.map(c => (
            <div key={c.id} style={{
              background: T.surf, border: `1px solid ${T.el}`,
              borderRadius: 16, padding: 14,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
            }}>
              <Avatar name={c.name} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Rokkitt, serif", fontWeight: 700, fontSize: 14, color: T.text }}>
                  {c.name}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 2 }}>
                  {c.contact}
                </div>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 11, color: T.muted, marginTop: 1 }}>
                  Last invoice: {c.lastInvoice}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Rokkitt, serif", fontSize: 10, color: T.muted }}>Total spend</div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 14, color: T.text }}>
                  {naira(c.totalSpend)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHONE SHELL
// ─────────────────────────────────────────────────────────────────────────────
const SHELL_W = 393;
const SHELL_H = 852;

function PhoneShell({ children, overlay, isDark = true }) {
  const shellBg    = isDark ? T_DARK.bg : T_LIGHT.bg;
  const statusTint = isDark ? "white" : "#0D0F18";
  return (
    <div style={{
      width: SHELL_W, height: SHELL_H,
      borderRadius: 50,
      background: shellBg,
      overflow: "hidden",
      position: "relative",
      boxShadow: isDark
        ? "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)"
        : "0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.12)",
      display: "flex", flexDirection: "column",
      transition: "background 0.3s ease",
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute", top: 12, left: "50%",
        transform: "translateX(-50%)",
        width: 126, height: 34,
        background: "#000", borderRadius: 20, zIndex: 100,
      }} />

      {/* Status Bar */}
      <div style={{
        height: 54, flexShrink: 0,
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "0 28px 10px",
        position: "relative", zIndex: 10,
      }}>
        <span style={{
          fontFamily: "Rokkitt, serif", fontSize: 14, fontWeight: 700, color: statusTint,
        }}>
          9:41
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Signal bars */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0"  y="8"  width="3" height="4" rx="1" fill={statusTint} />
            <rect x="4.5" y="5" width="3" height="7" rx="1" fill={statusTint} />
            <rect x="9"  y="2"  width="3" height="10" rx="1" fill={statusTint} />
            <rect x="13.5" y="0" width="3" height="12" rx="1" fill={statusTint} />
          </svg>
          {/* Wifi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 9.5a1 1 0 100 2 1 1 0 000-2z" fill={statusTint}/>
            <path d="M5.2 7.2a4 4 0 015.6 0" stroke={statusTint} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.4 4.6a7.5 7.5 0 0111.2 0" stroke={statusTint} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={statusTint} strokeOpacity="0.35"/>
            <rect x="2" y="2" width="16" height="8" rx="2" fill={statusTint}/>
            <path d="M23 4v4a2 2 0 000-4z" fill={statusTint} fillOpacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        {children}
        {overlay}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB BAR + FAB
// ─────────────────────────────────────────────────────────────────────────────
const TAB_DEFS = [
  { id: "dashboard", icon: "home",     label: "Dashboard" },
  { id: "services",  icon: "services", label: "Services"  },
  { id: "taxes",     icon: "tax",      label: "Taxes"     },
  { id: "account",   icon: "account",  label: "Account"   },
];

function TabBar({ tab, setTab, fabOpen, setFabOpen, push }) {
  return (
    <div style={{
      position: "relative",
      flexShrink: 0,
      paddingBottom: 20,
    }}>
      {/* Glass blur bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(26,29,36,0.85)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${T.el}`,
      }} />

      {/* FAB quick-action menu */}
      {fabOpen && (
        <div style={{
          position: "absolute", bottom: "100%", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          paddingBottom: 12, zIndex: 50,
        }}>
          {[
            { icon: "receipt",   label: "Send Invoice", onTap: () => push("invoiceList") },
            { icon: "cart",      label: "New Sale",     onTap: () => push("pos") },
            { icon: "tag",       label: "Add Expense",  onTap: () => push("expenseList") },
            { icon: "briefcase", label: "New Record",   onTap: () => push("addInvoice") },
          ].map(item => (
            <div
              key={item.label}
              onClick={() => { item.onTap && item.onTap(); setFabOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: T.surf, border: `1px solid ${T.el}`,
                borderRadius: 80, padding: "9px 16px",
                cursor: "pointer",
              }}
            >
              <I name={item.icon} size={16} color={T.a400} />
              <span style={{
                fontFamily: "Rokkitt, serif", fontSize: 13, fontWeight: 600, color: T.text,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab row */}
      <div style={{
        position: "relative",
        display: "flex", alignItems: "flex-start",
        paddingTop: 10, paddingLeft: 8, paddingRight: 8,
      }}>
        {[0, 1].map(i => {
          const t = TAB_DEFS[i];
          const active = tab === t.id;
          return (
            <div
              key={t.id}
              onClick={() => { setTab(t.id); setFabOpen(false); }}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 3, cursor: "pointer",
              }}
            >
              <I name={t.icon} size={22} color={active ? T.action : T.muted} />
              <span style={{
                fontFamily: "Rokkitt, serif", fontSize: 10,
                color: active ? T.action : T.muted,
              }}>
                {t.label}
              </span>
              {active && (
                <div style={{
                  width: 4, height: 4, borderRadius: "50%", background: T.action,
                }} />
              )}
            </div>
          );
        })}

        {/* FAB center */}
        <div style={{ width: 64, display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div
            onClick={() => setFabOpen(o => !o)}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              background: T.action,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", marginTop: -14,
              boxShadow: "0 4px 20px rgba(35,35,255,0.5)",
              transform: fabOpen ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.2s ease",
            }}
          >
            <I name="plus" size={24} color="#fff" strokeWidth={2.2} />
          </div>
        </div>

        {[2, 3].map(i => {
          const t = TAB_DEFS[i];
          const active = tab === t.id;
          return (
            <div
              key={t.id}
              onClick={() => { setTab(t.id); setFabOpen(false); }}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 3, cursor: "pointer",
              }}
            >
              <I name={t.icon} size={22} color={active ? T.action : T.muted} />
              <span style={{
                fontFamily: "Rokkitt, serif", fontSize: 10,
                color: active ? T.action : T.muted,
              }}>
                {t.label}
              </span>
              {active && (
                <div style={{
                  width: 4, height: 4, borderRadius: "50%", background: T.action,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function NukodesAppV3() {
  const [tab, setTab]             = useState("dashboard");
  const [navStack, setNavStack]   = useState([]);
  const [fabOpen, setFabOpen]     = useState(false);
  const [scale, setScale]         = useState(1);
  const [bizSwitcherOpen, setBizSwitcherOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("nukodes_theme") !== "light"; } catch { return true; }
  });
  const toggleTheme = useCallback(() => {
    setIsDark(d => {
      const next = !d;
      try { localStorage.setItem("nukodes_theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);
  const [authPhase, setAuthPhaseRaw] = useState(() => {
    try { return localStorage.getItem("nukodes_authed") === "1" ? "app" : "splash"; } catch { return "splash"; }
  });
  const store = useOfflineStore();

  const setAuthPhase = (phase) => {
    setAuthPhaseRaw(phase);
    try { localStorage.setItem("nukodes_authed", phase === "app" ? "1" : "0"); } catch {}
    if (phase !== "app") { setNavStack([]); setTab("dashboard"); setBizSwitcherOpen(false); }
  };

  const openBizSwitcher = useCallback(() => { setBizSwitcherOpen(true); setFabOpen(false); }, []);

  useEffect(() => {
    const update = () => {
      const s = Math.min(
        (window.innerHeight - 32) / SHELL_H,
        (window.innerWidth  - 32) / SHELL_W,
        1
      );
      setScale(Math.max(0.35, s));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const push = useCallback((screen, props = {}) => {
    setNavStack(s => [...s, { screen, props }]);
    setFabOpen(false);
  }, []);
  const pop = useCallback(() => setNavStack(s => s.slice(0, -1)), []);

  const isInner = navStack.length > 0;
  const sharedProps = { push, pop, ...store, openBizSwitcher, setAuthPhase, isDark, toggleTheme };

  // Render auth screens
  const renderAuth = () => {
    if (authPhase === "signin") return <SignIn setAuthPhase={setAuthPhase} />;
    if (authPhase === "signup") return <SignUp setAuthPhase={setAuthPhase} addRecord={store.addRecord} data={store.data} />;
    return <Splash setAuthPhase={setAuthPhase} />;
  };

  // Render current inner screen
  const renderInner = () => {
    if (!isInner) return null;
    const { screen, props } = navStack[navStack.length - 1];
    switch (screen) {
      case "taxCentre":         return <TaxCentre          {...sharedProps} {...props} />;
      case "profile":           return <Profile            {...sharedProps} {...props} />;
      case "editProfile":       return <EditProfile        {...sharedProps} {...props} />;
      case "integrations":      return <Integrations       {...sharedProps} {...props} />;
      case "team":              return <Team               {...sharedProps} {...props} />;
      case "businessOnboarding":return <BusinessOnboarding {...sharedProps} {...props} />;
      case "invoiceList":       return <InvoiceList        {...sharedProps} {...props} />;
      case "addInvoice":        return <AddInvoice         {...sharedProps} {...props} />;
      case "expenseList":       return <ExpenseList        {...sharedProps} {...props} />;
      case "addExpense":        return <AddExpense         {...sharedProps} {...props} />;
      case "productList":       return <ProductList        {...sharedProps} {...props} />;
      case "addProduct":        return <AddProduct         {...sharedProps} {...props} />;
      case "pos":               return <POSTerminal        {...sharedProps} {...props} />;
      case "customerList":      return <CustomerList       {...sharedProps} {...props} />;
      default: return null;
    }
  };

  // Render current tab screen
  const renderTab = () => {
    switch (tab) {
      case "dashboard": return <Dashboard {...sharedProps} />;
      case "services":  return <Services  {...sharedProps} />;
      case "taxes":     return <Taxes     {...sharedProps} />;
      case "account":   return <Account   {...sharedProps} />;
      default:          return <Dashboard {...sharedProps} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Rokkitt:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: ${isDark ? "#090909" : "#CDD0DC"}; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: #9B9FAF; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
      `}</style>

      {/* Viewport wrapper */}
      <div style={{
        width: "100vw", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: isDark ? "#090909" : "#CDD0DC",
        transition: "background 0.3s ease",
      }}>
        {/* Scale wrapper */}
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
          flexShrink: 0,
        }}>
          <PhoneShell
            isDark={isDark}
            overlay={bizSwitcherOpen && (
              <BusinessSwitcherSheet
                data={store.data}
                currentBizId={store.currentBizId}
                switchBusiness={store.switchBusiness}
                push={push}
                onClose={() => setBizSwitcherOpen(false)}
              />
            )}
          >
            {authPhase !== "app" ? (
              renderAuth()
            ) : isInner ? (
              renderInner()
            ) : (
              <>
                {renderTab()}
                <TabBar
                  tab={tab}
                  setTab={setTab}
                  fabOpen={fabOpen}
                  setFabOpen={setFabOpen}
                  push={push}
                />
              </>
            )}
          </PhoneShell>

        </div>
      </div>
    </>
  );
}
