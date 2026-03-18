import { useState } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  bg:"#0A0A0C", surf:"#1A1D24", el:"#2D303B",
  text:"#FFFFFF", muted:"#9B9FAF", subtle:"#CDCFD7",
  action:"#2323FF", a400:"#4C4CFF",
  ok:"#28AD1F", okLight:"#26CC5A",
  err:"#EF4444", warn:"#FB923C",
  liquid:"#060919",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Svg = ({ children, s = 24, vb = "0 0 24 24" }) => (
  <svg width={s} height={s} viewBox={vb} fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const Icons = {
  home:     <Svg><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>,
  services: <Svg><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></Svg>,
  taxes:    <Svg><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Svg>,
  account:  <Svg><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>,
  bell:     <Svg><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Svg>,
  plus:     <Svg strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  chevR:    <Svg s={16} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></Svg>,
  chevD:    <Svg s={16} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></Svg>,
  arrowUp:  <Svg s={14} strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></Svg>,
  arrowDn:  <Svg s={14} strokeWidth="2.5"><path d="M7 7l10 10M17 7v10H7"/></Svg>,
  sparkle:  <Svg><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>,
  cart:     <Svg><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></Svg>,
  invoice:  <Svg><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Svg>,
  dollar:   <Svg><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Svg>,
  users:    <Svg><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Svg>,
  scan:     <Svg><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>,
  tag:      <Svg><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></Svg>,
  box:      <Svg><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></Svg>,
  wallet:   <Svg><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" stroke="none"/><path d="M16 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2"/></Svg>,
  truck:    <Svg><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Svg>,
  swap:     <Svg><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></Svg>,
  receipt:  <Svg><path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/><path d="M8 8h8M8 12h8M8 16h4"/></Svg>,
  bank:     <Svg><path d="M3 9l9-7 9 7v3H3V9z"/><rect x="3" y="12" width="18" height="3"/><rect x="5" y="15" width="2" height="5"/><rect x="11" y="15" width="2" height="5"/><rect x="17" y="15" width="2" height="5"/><rect x="3" y="20" width="18" height="2"/></Svg>,
  pie:      <Svg><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></Svg>,
  shield:   <Svg><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>,
  settings2:<Svg><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></Svg>,
  lock:     <Svg s={18}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Svg>,
  check:    <Svg s={16} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></Svg>,
  alert:    <Svg><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>,
  x:        <Svg s={16} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>,
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

function Avatar({ name, size = 38 }) {
  const ini = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const pal = ["#2323FF","#28AD1F","#FB923C","#EF4444","#9B9FAF"];
  const c = pal[name.charCodeAt(0) % pal.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`${c}22`,
      border:`1.5px solid ${c}55`, display:"flex", alignItems:"center",
      justifyContent:"center", fontSize:size*0.34, fontFamily:"'Rokkitt',serif",
      fontWeight:700, color:c, flexShrink:0 }}>
      {ini}
    </div>
  );
}

function Badge({ label, type = "neutral" }) {
  const cfg = {
    ok:      { bg:"rgba(40,173,31,.15)",   fg:"#28AD1F" },
    err:     { bg:"rgba(239,68,68,.15)",   fg:"#EF4444" },
    warn:    { bg:"rgba(251,146,60,.15)",  fg:"#FB923C" },
    neutral: { bg:"rgba(155,159,175,.15)", fg:"#9B9FAF" },
    action:  { bg:"rgba(35,35,255,.15)",   fg:"#4C4CFF" },
  }[type] || { bg:"rgba(155,159,175,.15)", fg:"#9B9FAF" };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3,
      background:cfg.bg, color:cfg.fg, padding:"2px 8px", borderRadius:80,
      fontSize:10, fontFamily:"'Rokkitt',serif", fontWeight:600, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:cfg.fg }} />
      {label}
    </span>
  );
}

function SparkLine({ data, color, h = 30 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const w = 72;
  const pts = data.map((v,i) =>
    `${(i/(data.length-1))*w},${h - ((v-min)/range)*(h-4)}`
  ).join(" ");
  const area = `${pts} ${w},${h} 0,${h}`;
  const id = `sg${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow:"visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BarChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:64, width:"100%" }}>
      {data.map((v,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          <div style={{ width:"100%", height:`${(v/max)*56}px`, borderRadius:"5px 5px 0 0",
            background: i === 6 ? T.okLight : T.action,
            opacity: i === 6 ? 1 : i >= 4 ? 0.7 : 0.45,
            transition:"height .3s" }} />
          <span style={{ fontFamily:"'Rokkitt',serif", fontSize:9, color:T.muted }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── LIQUID GLASS HELPERS ─────────────────────────────────────────────────────

const liquidCard = {
  background: "linear-gradient(135deg, #060919 0%, #0d1140 60%, #060919 100%)",
  border: "1px solid rgba(35,35,255,0.22)",
  borderRadius: 28,
  position: "relative",
  overflow: "hidden",
};

const glassPanel = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.07)",
  backdropFilter: "blur(12px)",
  borderRadius: 16,
};

// ─── PHONE SHELL ──────────────────────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div style={{ width:375, height:812, borderRadius:44, overflow:"hidden",
      background:T.bg, flexShrink:0, position:"relative", display:"flex",
      flexDirection:"column",
      boxShadow:"0 48px 96px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.07), inset 0 0 0 1px rgba(255,255,255,.04)" }}>

      {/* Notch */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
        width:120, height:34, background:"#000", borderRadius:"0 0 20px 20px", zIndex:20 }} />

      {/* Status bar */}
      <div style={{ padding:"14px 24px 0", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexShrink:0, zIndex:10 }}>
        <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.text }}>9:41</span>
        <div style={{ display:"flex", gap:5, alignItems:"center", color:T.text }}>
          {/* Signal */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill={T.text}>
            <rect x="0" y="4" width="3" height="8" rx="1" opacity=".4"/>
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity=".7"/>
            <rect x="9" y="0.5" width="3" height="11.5" rx="1"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".3"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2" strokeLinecap="round">
            <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" opacity=".9"/>
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0" y="1" width="21" height="10" rx="2.5" stroke={T.text} strokeWidth="1.5"/>
            <rect x="1.5" y="2.5" width="15" height="7" rx="1.5" fill={T.ok}/>
            <path d="M22.5 4v4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
          </svg>
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
        {children}
      </div>
    </div>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id:"dashboard", icon:Icons.home,     label:"Dashboard" },
    { id:"services",  icon:Icons.services, label:"Services"  },
    { id:"taxes",     icon:Icons.taxes,    label:"Taxes"     },
    { id:"account",   icon:Icons.account,  label:"Account"   },
  ];
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:76, zIndex:50,
      background:"rgba(26,29,36,0.82)", backdropFilter:"blur(24px) saturate(180%)",
      borderTop:"1px solid rgba(255,255,255,0.07)",
      display:"flex", alignItems:"center" }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{ flex:1, height:"100%", border:"none", background:"none",
              cursor:"pointer", display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center", gap:4,
              color: on ? T.action : T.muted, transition:"color .15s",
              position:"relative" }}>
            {/* Active glow pill behind icon */}
            {on && (
              <div style={{ position:"absolute", top:10, width:40, height:28,
                borderRadius:80, background:"rgba(35,35,255,.15)" }} />
            )}
            <span style={{ display:"flex", position:"relative" }}>{t.icon}</span>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10,
              fontWeight: on ? 700 : 400, position:"relative" }}>{t.label}</span>
            {on && (
              <div style={{ position:"absolute", bottom:10, width:4, height:4,
                borderRadius:"50%", background:T.action }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── FAB ──────────────────────────────────────────────────────────────────────
function FAB({ open, setOpen }) {
  const actions = [
    { icon:Icons.cart,    label:"Quick Sale",     color:"#26CC5A" },
    { icon:Icons.invoice, label:"Create Invoice", color:"#4C4CFF" },
    { icon:Icons.dollar,  label:"Add Expense",    color:"#FB923C" },
    { icon:Icons.users,   label:"Add Customer",   color:"#28AD1F" },
    { icon:Icons.scan,    label:"Scan Barcode",   color:"#9B9FAF" },
  ];
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position:"absolute", inset:0, zIndex:30,
            background:"rgba(10,10,12,.65)", backdropFilter:"blur(4px)" }} />
      )}
      {/* Action items */}
      {open && (
        <div style={{ position:"absolute", bottom:92, right:16, zIndex:40,
          display:"flex", flexDirection:"column", gap:10, alignItems:"flex-end" }}>
          {actions.map((a, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
              animation:`fadeUp .2s ease ${i * 0.05}s both` }}>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
                color:T.text, background:"rgba(26,29,36,.95)",
                backdropFilter:"blur(12px)", padding:"6px 14px", borderRadius:80,
                border:"1px solid rgba(255,255,255,.08)" }}>{a.label}</span>
              <div style={{ width:46, height:46, borderRadius:"50%",
                background:"rgba(26,29,36,.95)", backdropFilter:"blur(12px)",
                border:"1px solid rgba(255,255,255,.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:a.color, boxShadow:"0 4px 16px rgba(0,0,0,.4)" }}>
                {a.icon}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* FAB button */}
      <button onClick={() => setOpen(f => !f)}
        style={{ position:"absolute", bottom:84, right:16, zIndex:41,
          width:56, height:56, borderRadius:"50%", cursor:"pointer",
          background: open ? "rgba(26,29,36,.95)" : T.action,
          backdropFilter: open ? "blur(12px)" : "none",
          border: open ? "1px solid rgba(255,255,255,.1)" : "none",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", transition:"all .2s",
          transform: open ? "rotate(45deg)" : "none",
          boxShadow: open
            ? "0 4px 16px rgba(0,0,0,.3)"
            : "0 8px 28px rgba(35,35,255,.45), 0 2px 8px rgba(0,0,0,.3)" }}>
        {Icons.plus}
      </button>
    </>
  );
}

// ─── SCREEN: DASHBOARD ────────────────────────────────────────────────────────
function Dashboard() {
  const [period, setPeriod] = useState("W");
  const [fabOpen, setFabOpen] = useState(false);
  const [alertShown, setAlertShown] = useState(true);

  const weekData   = [38, 52, 44, 61, 58, 72, 84];
  const weekLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const recents = [
    { name:"John Doe",       item:"iPhone 13 Pro Max",    amt:"₦ 450,000",    badge:"ok",     label:"Paid",    time:"2m" },
    { name:"Sarah Smith",    item:"Samsung A54 + Case",   amt:"₦ 125,000",    badge:"action", label:"Sent",    time:"18m" },
    { name:"Amara Praise",   item:"USB-C Hub (5-port)",   amt:"₦ 35,000",     badge:"warn",   label:"Pending", time:"1h" },
    { name:"Kofi Enterprises",item:"Bulk Order ×12",      amt:"₦ 2,340,000",  badge:"err",    label:"Overdue", time:"3h" },
  ];

  const tasks = [
    { icon:Icons.invoice, label:"3 invoices need sending",   sub:"Total: ₦ 675,000",    color:T.a400, cta:"Send now" },
    { icon:Icons.alert,   label:"5 items low on stock",      sub:"Est. reorder: ₦ 320k", color:T.warn, cta:"View" },
    { icon:Icons.wallet,  label:"WHT payment due Mar 15",    sub:"₦ 48,500 due",         color:T.err,  cta:"Pay now" },
  ];

  return (
    <div style={{ height:"100%", position:"relative" }}>
      <div style={{ height:"100%", overflowY:"auto", scrollbarWidth:"none",
        paddingBottom:84 }}>

        {/* ── Top bar ── */}
        <div style={{ padding:"14px 20px 12px", display:"flex",
          alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted }}>
              Sun, 8 Mar 2026
            </div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:20, fontWeight:700,
              color:T.text, marginTop:1 }}>
              Good morning, Kofi 👋
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ position:"relative" }}>
              <div style={{ ...glassPanel, width:40, height:40, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:T.muted, cursor:"pointer" }}>
                {Icons.bell}
              </div>
              <div style={{ position:"absolute", top:9, right:9, width:7, height:7,
                borderRadius:"50%", background:T.err,
                border:`2px solid ${T.bg}` }} />
            </div>
            <div style={{ width:40, height:40, borderRadius:"50%",
              background:"rgba(35,35,255,.2)", border:"1.5px solid rgba(35,35,255,.45)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700,
              color:T.a400, cursor:"pointer" }}>KA</div>
          </div>
        </div>

        {/* ── Alert banner ── */}
        {alertShown && (
          <div style={{ margin:"0 16px 14px",
            background:"rgba(251,146,60,.1)", border:"1px solid rgba(251,146,60,.25)",
            borderRadius:14, padding:"10px 12px",
            display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ color:T.warn, display:"flex", flexShrink:0 }}>{Icons.alert}</span>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text,
              flex:1, lineHeight:1.4 }}>
              iPhone 13 Pro Max — only <strong>2 units</strong> left in stock
            </span>
            <button onClick={() => setAlertShown(false)}
              style={{ background:"none", border:"none", cursor:"pointer",
                color:T.muted, display:"flex", padding:2 }}>{Icons.x}</button>
          </div>
        )}

        {/* ── Liquid glass hero card ── */}
        <div style={{ ...liquidCard, margin:"0 16px 20px", padding:"22px 20px" }}>
          {/* Ambient blobs */}
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160,
            borderRadius:"50%", background:"rgba(35,35,255,.1)", filter:"blur(32px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120,
            borderRadius:"50%", background:"rgba(38,204,90,.07)", filter:"blur(24px)", pointerEvents:"none" }} />

          <div style={{ position:"relative" }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:"rgba(155,159,175,.8)",
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
              Total Cash Position
            </div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:40, fontWeight:600,
              color:T.text, lineHeight:1, marginBottom:6 }}>
              ₦ 4,283,750
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:20 }}>
              <span style={{ color:T.okLight, display:"flex" }}>{Icons.arrowUp}</span>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13,
                color:T.okLight, fontWeight:600 }}>+12.4% vs last week</span>
            </div>

            {/* 3 sub-metric glass pills */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[
                { label:"Revenue",   amt:"₦ 6.4M",  delta:"+8.2%",  up:true  },
                { label:"Expenses",  amt:"₦ 1.8M",  delta:"-3.1%",  up:false },
                { label:"Net Profit",amt:"₦ 4.6M",  delta:"+14.7%", up:true  },
              ].map((s,i) => (
                <div key={i} style={{ ...glassPanel, padding:"10px 10px" }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10,
                    color:"rgba(155,159,175,.7)", marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:15,
                    fontWeight:500, color:T.text, lineHeight:1, marginBottom:4 }}>{s.amt}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                    <span style={{ color:s.up?T.okLight:T.err, display:"flex" }}>
                      {s.up ? Icons.arrowUp : Icons.arrowDn}
                    </span>
                    <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10,
                      color:s.up?T.okLight:T.err, fontWeight:600 }}>{s.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Performance grid ── */}
        <div style={{ padding:"0 16px 20px",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { label:"Today's Sales",   val:"₦ 847K", sub:"23 transactions",   trend:[4,6,5,8,7,9,11], color:T.a400,    pct:"+18%", up:true  },
            { label:"Pending Invoices",val:"7",       sub:"₦ 1.24M total",     trend:[3,5,4,7,6,5,7],  color:T.warn,    pct:"3 overdue", up:false },
            { label:"Low Stock Items", val:"5",       sub:"Need reordering",   trend:[2,3,2,4,3,5,5],  color:T.err,     pct:"↑ 2", up:false },
            { label:"Customers",       val:"142",     sub:"12 new this week",  trend:[80,90,95,110,120,130,142], color:T.ok, pct:"+12", up:true },
          ].map((c,i) => (
            <div key={i} style={{ background:T.surf, borderRadius:16, padding:"14px",
              border:`1px solid ${T.el}` }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12,
                  color:T.muted, lineHeight:1.3 }}>{c.label}</div>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, fontWeight:700,
                  color:c.up ? T.ok : T.err }}>{c.pct}</span>
              </div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:22,
                fontWeight:500, color:T.text, marginBottom:2 }}>{c.val}</div>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-end" }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11,
                  color:T.muted }}>{c.sub}</div>
                <SparkLine data={c.trend} color={c.color} h={28} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Weekly chart ── */}
        <div style={{ margin:"0 16px 20px", background:T.surf, borderRadius:20,
          padding:"16px", border:`1px solid ${T.el}` }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"center", marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:15,
                fontWeight:700, color:T.text }}>Weekly Revenue</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12,
                color:T.muted, marginTop:2 }}>Mar 2 – 8, 2026</div>
            </div>
            <div style={{ display:"flex", gap:3 }}>
              {["W","M","Y"].map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  style={{ height:28, padding:"0 11px", borderRadius:80, border:"none",
                    cursor:"pointer", background: period===p ? "rgba(35,35,255,.2)" : "transparent",
                    color: period===p ? T.a400 : T.muted,
                    fontFamily:"'Rokkitt',serif", fontSize:12,
                    fontWeight: period===p ? 700 : 400 }}>{p}</button>
              ))}
            </div>
          </div>
          <BarChart data={weekData} labels={weekLabels} />
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:14,
            paddingTop:14, borderTop:`1px solid ${T.el}` }}>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted }}>This week</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19,
                fontWeight:500, color:T.text, marginTop:2 }}>₦ 3,540,000</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted }}>vs last week</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19,
                fontWeight:500, color:T.okLight, marginTop:2 }}>+₦ 390,000</div>
            </div>
          </div>
        </div>

        {/* ── AI Insights ── */}
        <div style={{ margin:"0 16px 20px",
          background:"linear-gradient(135deg, rgba(35,35,255,.1) 0%, rgba(35,35,255,.03) 100%)",
          border:"1px solid rgba(35,35,255,.22)", borderRadius:20, padding:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:32, height:32, borderRadius:10,
              background:"rgba(35,35,255,.2)", display:"flex", alignItems:"center",
              justifyContent:"center", color:T.a400 }}>{Icons.sparkle}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14,
                fontWeight:700, color:T.text }}>AI Insight</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11,
                color:T.a400 }}>Updated 5 mins ago</div>
            </div>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, fontWeight:700,
              color:T.a400, background:"rgba(35,35,255,.15)",
              padding:"2px 8px", borderRadius:80 }}>Pro</span>
          </div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.subtle,
            lineHeight:1.65, marginBottom:14 }}>
            Your Fri–Sun revenue is{" "}
            <span style={{ color:T.okLight, fontWeight:700 }}>38% higher</span>{" "}
            than weekdays. Consider running weekend promos to maximise your ₦ 720K Sunday peak.
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ flex:1, height:36, borderRadius:80, border:"none",
              background:T.action, color:"#fff", fontFamily:"'Rokkitt',serif",
              fontSize:13, fontWeight:700, cursor:"pointer" }}>View full report</button>
            <button style={{ height:36, padding:"0 14px", borderRadius:80,
              border:"1px solid rgba(35,35,255,.3)", background:"transparent",
              color:T.a400, fontFamily:"'Rokkitt',serif", fontSize:13,
              cursor:"pointer" }}>Dismiss</button>
          </div>
        </div>

        {/* ── Recent sales ── */}
        <div style={{ margin:"0 16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"center", marginBottom:12 }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:16,
              fontWeight:700, color:T.text }}>Recent Sales</div>
            <button style={{ display:"flex", alignItems:"center", gap:4,
              fontFamily:"'Rokkitt',serif", fontSize:13, color:T.a400,
              background:"none", border:"none", cursor:"pointer" }}>
              See all {Icons.chevR}
            </button>
          </div>
          <div style={{ borderRadius:16, overflow:"hidden",
            border:`1px solid ${T.el}` }}>
            {recents.map((r, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
                padding:"11px 14px", background:T.surf,
                borderBottom: i < recents.length-1 ? `1px solid ${T.el}` : "none" }}>
                <Avatar name={r.name} size={36} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14,
                    color:T.text, overflow:"hidden", textOverflow:"ellipsis",
                    whiteSpace:"nowrap" }}>{r.name}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11,
                    color:T.muted, marginTop:2 }}>{r.item} · {r.time} ago</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column",
                  alignItems:"flex-end", gap:3, flexShrink:0 }}>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:13,
                    color:T.text, fontWeight:500 }}>{r.amt}</span>
                  <Badge label={r.label} type={r.badge} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick tasks ── */}
        <div style={{ margin:"0 16px 28px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:16,
            fontWeight:700, color:T.text, marginBottom:12 }}>Quick Tasks</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {tasks.map((t, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
                padding:"12px 14px", background:T.surf, borderRadius:14,
                border:`1px solid ${T.el}` }}>
                <div style={{ width:36, height:36, borderRadius:10,
                  background:`${t.color}18`, display:"flex", alignItems:"center",
                  justifyContent:"center", color:t.color, flexShrink:0 }}>{t.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14,
                    color:T.text }}>{t.label}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11,
                    color:T.muted, marginTop:2 }}>{t.sub}</div>
                </div>
                <button style={{ fontFamily:"'Rokkitt',serif", fontSize:12,
                  fontWeight:700, color:t.color, background:`${t.color}18`,
                  border:"none", padding:"6px 12px", borderRadius:80,
                  cursor:"pointer", whiteSpace:"nowrap" }}>{t.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FAB open={fabOpen} setOpen={setFabOpen} />
    </div>
  );
}

// ─── SCREEN: SERVICES HUB ─────────────────────────────────────────────────────
function Services() {
  const [fabOpen, setFabOpen] = useState(false);

  const groups = [
    {
      tier: "Free",
      label: "Free — Always included",
      color: T.ok,
      locked: false,
      services: [
        { icon:Icons.tag,     label:"Products",     sub:"Inventory management" },
        { icon:Icons.receipt, label:"Invoices",     sub:"Create & send invoices" },
        { icon:Icons.users,   label:"Customers",    sub:"Customer directory" },
        { icon:Icons.scan,    label:"Barcode",      sub:"Scan to add products" },
        { icon:Icons.dollar,  label:"Expenses",     sub:"Track business costs" },
        { icon:Icons.shield,  label:"Team",         sub:"Manage staff access" },
        { icon:Icons.wallet,  label:"Wallet",       sub:"Business wallet" },
        { icon:Icons.pie,     label:"VAT Report",   sub:"Auto VAT calculation" },
      ],
    },
    {
      tier: "Growth",
      label: "Growth — ₦ 5,000/mo",
      color: T.a400,
      locked: true,
      badge: "Upgrade",
      services: [
        { icon:Icons.box,     label:"Stock Count",  sub:"Full inventory audit" },
        { icon:Icons.cart,    label:"POS Terminal", sub:"Opay · Moniepoint" },
        { icon:Icons.swap,    label:"FlexPay",      sub:"Instalment payments" },
        { icon:Icons.truck,   label:"Shipping",     sub:"Shipbubble integration" },
        { icon:Icons.receipt, label:"Returns",      sub:"RMA management" },
        { icon:Icons.scan,    label:"Receipt Scan", sub:"AI expense scanning" },
        { icon:Icons.bank,    label:"Bank Sync",    sub:"Mono integration" },
        { icon:Icons.pie,     label:"WHT Report",   sub:"WHT tracking" },
        { icon:Icons.pie,     label:"Reports",      sub:"P&L, cash flow" },
      ],
    },
    {
      tier: "Pro",
      label: "Pro — AI & Automation",
      color: T.warn,
      locked: true,
      badge: "Pro",
      services: [
        { icon:Icons.sparkle, label:"AI Insights",  sub:"Revenue predictions" },
      ],
    },
    {
      tier: "Enterprise",
      label: "Enterprise — ₦ 15,000/mo",
      color: "#9B5CF6",
      locked: true,
      badge: "Enterprise",
      services: [
        { icon:Icons.settings2,label:"Manufacturing",sub:"BOM & production" },
        { icon:Icons.users,    label:"Vendor Portal",sub:"Supplier collaboration" },
      ],
    },
  ];

  return (
    <div style={{ height:"100%", position:"relative" }}>
      <div style={{ height:"100%", overflowY:"auto", scrollbarWidth:"none",
        paddingBottom:84 }}>

        {/* ── Top bar ── */}
        <div style={{ padding:"14px 20px 16px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12,
            color:T.muted, marginBottom:2 }}>Nukodes</div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:22,
            fontWeight:700, color:T.text }}>Services</div>
        </div>

        {/* ── Tier groups ── */}
        {groups.map((g, gi) => (
          <div key={gi} style={{ margin:"0 16px 24px" }}>

            {/* Group header */}
            <div style={{ display:"flex", alignItems:"center",
              justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%",
                  background:g.color }} />
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13,
                  fontWeight:700, color:T.text }}>{g.label}</span>
              </div>
              {g.locked && (
                <button style={{ display:"flex", alignItems:"center", gap:5,
                  fontFamily:"'Rokkitt',serif", fontSize:11, fontWeight:700,
                  color:g.color, background:`${g.color}18`,
                  border:`1px solid ${g.color}44`,
                  padding:"4px 10px", borderRadius:80, cursor:"pointer" }}>
                  <span style={{ display:"flex" }}>{Icons.lock}</span>
                  {g.badge}
                </button>
              )}
              {!g.locked && (
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:11,
                  fontWeight:700, color:T.ok,
                  background:"rgba(40,173,31,.12)", padding:"3px 8px",
                  borderRadius:80 }}>Active</span>
              )}
            </div>

            {/* Service grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {g.services.map((s, si) => (
                <div key={si} style={{ position:"relative",
                  background: g.locked ? "rgba(26,29,36,.6)" : T.surf,
                  borderRadius:18, padding:"14px 12px 12px",
                  border:`1px solid ${g.locked ? T.el : T.el}`,
                  cursor: g.locked ? "default" : "pointer",
                  display:"flex", flexDirection:"column", gap:8,
                  opacity: g.locked ? 0.75 : 1,
                  transition:"transform .15s, box-shadow .15s" }}
                  onMouseEnter={e => {
                    if (!g.locked) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}>

                  {/* Icon */}
                  <div style={{ width:38, height:38, borderRadius:12,
                    background: g.locked ? T.el : `${g.color}18`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color: g.locked ? T.muted : g.color }}>
                    {s.icon}
                  </div>

                  {/* Label */}
                  <div>
                    <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13,
                      fontWeight:700, color: g.locked ? T.muted : T.text,
                      lineHeight:1.2 }}>{s.label}</div>
                    <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10,
                      color:T.muted, marginTop:3, lineHeight:1.4 }}>{s.sub}</div>
                  </div>

                  {/* Lock overlay badge */}
                  {g.locked && (
                    <div style={{ position:"absolute", top:10, right:10,
                      color:T.muted, display:"flex", opacity:0.6 }}>
                      {Icons.lock}
                    </div>
                  )}

                  {/* Active checkmark */}
                  {!g.locked && (
                    <div style={{ position:"absolute", top:10, right:10,
                      width:16, height:16, borderRadius:"50%",
                      background:"rgba(40,173,31,.2)", display:"flex",
                      alignItems:"center", justifyContent:"center",
                      color:T.ok }}>
                      {Icons.check}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Upgrade CTA for locked tiers */}
            {g.locked && (
              <button style={{ width:"100%", height:44, marginTop:12,
                borderRadius:14, border:`1px solid ${g.color}44`,
                background:`${g.color}0d`, color:g.color,
                fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700,
                cursor:"pointer", display:"flex", alignItems:"center",
                justifyContent:"center", gap:8 }}>
                <span style={{ display:"flex" }}>{Icons.lock}</span>
                Unlock {g.tier} features
              </button>
            )}
          </div>
        ))}
      </div>

      <FAB open={fabOpen} setOpen={setFabOpen} />
    </div>
  );
}

// ─── PLACEHOLDER SCREENS ─────────────────────────────────────────────────────
function ComingSoon({ label }) {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:12, padding:32 }}>
      <div style={{ width:56, height:56, borderRadius:16, background:T.el,
        display:"flex", alignItems:"center", justifyContent:"center",
        color:T.muted }}>{Icons.sparkle}</div>
      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:20, fontWeight:700,
        color:T.text }}>{label}</div>
      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, color:T.muted,
        textAlign:"center", lineHeight:1.6 }}>
        This screen is coming soon. The design is in progress.
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");

  const screen = {
    dashboard: <Dashboard />,
    services:  <Services />,
    taxes:     <ComingSoon label="Taxes & Reports" />,
    account:   <ComingSoon label="Account & Settings" />,
  }[tab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rokkitt:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#050507",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:24 }}>
        <Phone>
          <div style={{ height:"100%", display:"flex", flexDirection:"column",
            position:"relative" }}>
            <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
              {screen}
            </div>
            <TabBar active={tab} onChange={setTab} />
          </div>
        </Phone>
      </div>
    </>
  );
}
