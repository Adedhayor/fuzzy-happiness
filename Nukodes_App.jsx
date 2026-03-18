import { useState, useReducer, useRef } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  bg:"#0A0A0C", surf:"#1A1D24", el:"#2D303B",
  text:"#FFFFFF", muted:"#9B9FAF", subtle:"#CDCFD7",
  action:"#2323FF", a400:"#4C4CFF",
  ok:"#28AD1F", okLight:"#26CC5A",
  err:"#EF4444", warn:"#FB923C",
  liquid:"#060919",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const DATA = {
  products: [
    { id:"P001", name:"iPhone 13 Pro Max", sku:"IP13-PM-001", category:"Electronics", price:450000, stock:2,  threshold:5,  status:"low"  },
    { id:"P002", name:"Samsung Galaxy A54", sku:"SAM-A54-002", category:"Electronics", price:125000, stock:14, threshold:5,  status:"ok"   },
    { id:"P003", name:"USB-C Hub 5-Port",   sku:"USB-HUB-003", category:"Accessories", price:35000,  stock:0,  threshold:3,  status:"out"  },
    { id:"P004", name:"Sony WH-1000XM5",    sku:"SNY-XM5-004", category:"Audio",       price:280000, stock:7,  threshold:3,  status:"ok"   },
    { id:"P005", name:"HP Laptop Bag 15\"", sku:"HP-BAG-005",  category:"Accessories", price:18000,  stock:1,  threshold:5,  status:"low"  },
    { id:"P006", name:"Anker Power Bank",   sku:"ANK-PB-006",  category:"Accessories", price:22000,  stock:23, threshold:5,  status:"ok"   },
  ],
  invoices: [
    { id:"INV-001245", customer:"John Doe",       items:[{name:"iPhone 13 Pro Max",qty:1,price:450000},{name:"USB-C Hub",qty:1,price:35000}], total:483750, status:"sent",    due:"Jan 22", created:"Jan 15" },
    { id:"INV-001244", customer:"Amara Praise",   items:[{name:"Samsung Galaxy A54",qty:1,price:125000}],                                      total:125000, status:"paid",    due:"Jan 20", created:"Jan 10" },
    { id:"INV-001243", customer:"Sarah Smith",    items:[{name:"Sony WH-1000XM5",qty:1,price:280000},{name:"Laptop Bag",qty:1,price:18000}],   total:285000, status:"overdue", due:"Jan 11", created:"Jan 4"  },
    { id:"INV-001242", customer:"Emeka Okafor",   items:[{name:"Anker Power Bank",qty:3,price:22000}],                                         total:66000,  status:"draft",   due:"Feb 1",  created:"Jan 20" },
    { id:"INV-001241", customer:"Kofi Enterprises",items:[{name:"Samsung Galaxy A54",qty:8,price:125000},{name:"USB-C Hub",qty:8,price:35000}],total:1240000,status:"paid",    due:"Jan 5",  created:"Dec 28" },
    { id:"INV-001240", customer:"Ngozi Adaeze",   items:[{name:"iPhone 13 Pro Max",qty:2,price:450000}],                                       total:900000, status:"sent",    due:"Feb 5",  created:"Jan 22" },
  ],
  customers: [
    { id:"C001", name:"John Doe",        phone:"0803 123 4567", email:"john@doe.com",    city:"Lagos",    balance:483750, totalSpent:1240000, invoices:4 },
    { id:"C002", name:"Sarah Smith",     phone:"0812 456 7890", email:"sarah@sm.com",    city:"Abuja",    balance:285000, totalSpent:580000,  invoices:3 },
    { id:"C003", name:"Amara Praise",    phone:"0701 234 5678", email:"amara@pr.com",    city:"PH",       balance:0,      totalSpent:375000,  invoices:2 },
    { id:"C004", name:"Emeka Okafor",    phone:"0806 789 0123", email:"emeka@ok.com",    city:"Enugu",    balance:66000,  totalSpent:412000,  invoices:5 },
    { id:"C005", name:"Kofi Enterprises",phone:"0903 456 1234", email:"info@kofi.ng",    city:"Lagos",    balance:0,      totalSpent:2480000, invoices:8 },
    { id:"C006", name:"Ngozi Adaeze",    phone:"0811 678 9012", email:"ngozi@ada.com",   city:"Owerri",   balance:900000, totalSpent:900000,  invoices:1 },
  ],
  expenses: [
    { id:"E001", vendor:"ABC Suppliers",   category:"Inventory",  amount:125000, date:"Jan 15", note:"Stock replenishment – Q1" },
    { id:"E002", vendor:"IKEDC",           category:"Utilities",  amount:18500,  date:"Jan 14", note:"January electricity bill" },
    { id:"E003", vendor:"Shoprite Ikeja",  category:"Office",     amount:12000,  date:"Jan 12", note:"Office supplies & stationery" },
    { id:"E004", vendor:"TechMarts Ltd",   category:"Inventory",  amount:340000, date:"Jan 10", note:"Bulk Samsung units x4" },
    { id:"E005", vendor:"FIRS",            category:"Tax",        amount:48500,  date:"Jan 8",  note:"WHT payment Q4 2025" },
    { id:"E006", vendor:"Digital Ocean",   category:"Software",   amount:15000,  date:"Jan 5",  note:"Hosting & DB – monthly" },
  ],
  team: [
    { id:"T001", name:"Adedayo Kofi",    role:"Owner",       email:"adedayo@nukodes.ng",  status:"active",  perms:["all"] },
    { id:"T002", name:"Funmilayo Bello", role:"Sales Rep",   email:"funmi@nukodes.ng",    status:"active",  perms:["invoices","customers","pos"] },
    { id:"T003", name:"Chukwuemeka O.", role:"Accountant",  email:"emeka@nukodes.ng",    status:"pending", perms:["expenses","reports","taxes"] },
  ],
  transactions: [
    { id:"T001", type:"sale",   name:"John Doe",        item:"iPhone 13 Pro Max",    amt:450000,  time:"9:41 AM",  ref:"INV-001245" },
    { id:"T002", type:"sale",   name:"Sarah Smith",     item:"Samsung A54 + Case",   amt:135000,  time:"10:22 AM", ref:"INV-001244" },
    { id:"T003", type:"refund", name:"Emeka Okafor",    item:"USB-C Hub (returned)", amt:-35000,  time:"11:05 AM", ref:"INV-001232" },
    { id:"T004", type:"sale",   name:"Ngozi Adaeze",    item:"Sony WH-1000XM5",      amt:280000,  time:"12:48 PM", ref:"INV-001240" },
    { id:"T005", type:"sale",   name:"Kofi Enterprises",item:"Anker Power Bank x3",  amt:66000,   time:"2:15 PM",  ref:"INV-001242" },
    { id:"T006", type:"sale",   name:"Amara Praise",    item:"HP Laptop Bag",        amt:18000,   time:"3:33 PM",  ref:"INV-001239" },
    { id:"T007", type:"sale",   name:"Walk-in Customer","item":"USB-C Hub",           amt:35000,   time:"4:10 PM",  ref:"POS-0089"   },
    { id:"T008", type:"sale",   name:"Chidi Nwosu",     item:"Anker Power Bank",     amt:22000,   time:"5:02 PM",  ref:"POS-0090"   },
  ],
};

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function navReducer(state, action) {
  switch (action.type) {
    case "PUSH":
      return { ...state, [action.tab]: [...(state[action.tab]||[]), { screen:action.screen, props:action.props||{} }] };
    case "POP":
      return { ...state, [action.tab]: (state[action.tab]||[]).slice(0,-1) };
    case "RESET":
      return { ...state, [action.tab]: [] };
    default: return state;
  }
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Svg = ({ children, s=24, vb="0 0 24 24" }) => (
  <svg width={s} height={s} viewBox={vb} fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const IC = {
  home:    <Svg><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>,
  services:<Svg><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></Svg>,
  taxes:   <Svg><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Svg>,
  account: <Svg><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>,
  bell:    <Svg><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Svg>,
  plus:    <Svg strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  back:    <Svg strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></Svg>,
  chevR:   <Svg s={16} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></Svg>,
  chevD:   <Svg s={16} strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></Svg>,
  arrowUp: <Svg s={14} strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></Svg>,
  arrowDn: <Svg s={14} strokeWidth="2.5"><path d="M7 7l10 10M17 7v10H7"/></Svg>,
  sparkle: <Svg><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>,
  cart:    <Svg><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></Svg>,
  invoice: <Svg><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Svg>,
  dollar:  <Svg><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Svg>,
  users:   <Svg><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Svg>,
  scan:    <Svg><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>,
  tag:     <Svg><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></Svg>,
  box:     <Svg><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></Svg>,
  wallet:  <Svg><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" stroke="none"/><path d="M16 7V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2"/></Svg>,
  truck:   <Svg><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Svg>,
  swap:    <Svg><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></Svg>,
  receipt: <Svg><path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/><path d="M8 8h8M8 12h8M8 16h4"/></Svg>,
  bank:    <Svg><path d="M3 9l9-7 9 7v3H3V9z"/><rect x="3" y="12" width="18" height="3"/><rect x="5" y="15" width="2" height="5"/><rect x="11" y="15" width="2" height="5"/><rect x="17" y="15" width="2" height="5"/><rect x="3" y="20" width="18" height="2"/></Svg>,
  pie:     <Svg><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></Svg>,
  shield:  <Svg><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>,
  settings:<Svg><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></Svg>,
  lock:    <Svg s={18}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Svg>,
  check:   <Svg s={16} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></Svg>,
  alert:   <Svg><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>,
  x:       <Svg s={16} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>,
  search:  <Svg><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>,
  edit:    <Svg><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>,
  share:   <Svg><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></Svg>,
  phone:   <Svg><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a19.79 19.79 0 01-3-8.57A2 2 0 012.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.06-1.35a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></Svg>,
  wa:      <Svg><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></Svg>,
  download:<Svg><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>,
  trash:   <Svg><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></Svg>,
  user:    <Svg><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>,
  mail:    <Svg><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Svg>,
  location:<Svg><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></Svg>,
  more:    <Svg><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/></Svg>,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = n => `₦ ${Math.abs(n).toLocaleString("en-NG")}`;
const statusCfg = {
  paid:     { label:"Paid",      type:"ok"     },
  sent:     { label:"Sent",      type:"action" },
  overdue:  { label:"Overdue",   type:"err"    },
  draft:    { label:"Draft",     type:"neutral"},
  pending:  { label:"Pending",   type:"warn"   },
  ok:       { label:"In Stock",  type:"ok"     },
  low:      { label:"Low Stock", type:"warn"   },
  out:      { label:"Out",       type:"err"    },
  active:   { label:"Active",    type:"ok"     },
  inactive: { label:"Inactive",  type:"neutral"},
  sale:     { label:"Sale",      type:"ok"     },
  refund:   { label:"Refund",    type:"err"    },
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Avatar({ name, size=38 }) {
  const ini = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const pal = ["#2323FF","#28AD1F","#FB923C","#EF4444","#9B9FAF","#26CC5A","#9B5CF6"];
  const c = pal[name.charCodeAt(0) % pal.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`${c}22`,
      border:`1.5px solid ${c}55`, display:"flex", alignItems:"center",
      justifyContent:"center", fontSize:size*0.34, fontFamily:"'Rokkitt',serif",
      fontWeight:700, color:c, flexShrink:0 }}>{ini}</div>
  );
}

function Badge({ type="neutral", label }) {
  const cfg = { ok:{bg:"rgba(40,173,31,.15)",fg:"#28AD1F"}, err:{bg:"rgba(239,68,68,.15)",fg:"#EF4444"},
    warn:{bg:"rgba(251,146,60,.15)",fg:"#FB923C"}, neutral:{bg:"rgba(155,159,175,.15)",fg:"#9B9FAF"},
    action:{bg:"rgba(35,35,255,.15)",fg:"#4C4CFF"} }[type] || {bg:"rgba(155,159,175,.15)",fg:"#9B9FAF"};
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, background:cfg.bg,
      color:cfg.fg, padding:"2px 8px", borderRadius:80, fontSize:10,
      fontFamily:"'Rokkitt',serif", fontWeight:600, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:cfg.fg }} />{label}
    </span>
  );
}

function SparkLine({ data, color, h=30 }) {
  const max=Math.max(...data), min=Math.min(...data), range=max-min||1, w=72;
  const pts = data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/range)*(h-4)}`).join(" ");
  const id = `sg${color.replace(/[^a-z0-9]/gi,"")}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow:"visible"}}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
        <stop offset="100%" stopColor={color} stopOpacity="0"/>
      </linearGradient></defs>
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={`url(#${id})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchBar({ value, onChange, placeholder="Search..." }) {
  return (
    <div style={{ margin:"0 16px 14px", display:"flex", alignItems:"center", gap:10,
      background:T.surf, border:`1px solid ${T.el}`, borderRadius:12,
      padding:"0 14px", height:44 }}>
      <span style={{ color:T.muted, display:"flex", flexShrink:0 }}>{IC.search}</span>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{ flex:1, background:"none", border:"none", outline:"none",
          color:T.text, fontFamily:"'Rokkitt',serif", fontSize:14 }} />
      {value && (
        <button onClick={()=>onChange("")} style={{ background:"none", border:"none",
          cursor:"pointer", color:T.muted, display:"flex" }}>{IC.x}</button>
      )}
    </div>
  );
}

function FilterTabs({ tabs, active, onChange }) {
  const ref = useRef(null);
  return (
    <div ref={ref} style={{ display:"flex", gap:6, padding:"0 16px 14px",
      overflowX:"auto", scrollbarWidth:"none" }}>
      {tabs.map((t,i) => (
        <button key={i} onClick={()=>onChange(i)}
          style={{ height:32, padding:"0 14px", borderRadius:80, border:"none",
            cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
            background: active===i ? T.action : T.surf,
            color: active===i ? "#fff" : T.muted,
            fontFamily:"'Rokkitt',serif", fontSize:12,
            fontWeight: active===i ? 700 : 400,
            border: active===i ? "none" : `1px solid ${T.el}`,
            transition:"all .15s" }}>{t}</button>
      ))}
    </div>
  );
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const glassPanel = { background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)", borderRadius:16 };
const liquidCard = { background:"linear-gradient(135deg, #060919 0%, #0d1140 60%, #060919 100%)", border:"1px solid rgba(35,35,255,0.22)", borderRadius:28, position:"relative", overflow:"hidden" };

function ScreenHeader({ title, onBack, action }) {
  return (
    <div style={{ display:"flex", alignItems:"center", padding:"14px 16px 12px",
      gap:12, flexShrink:0 }}>
      {onBack && (
        <button onClick={onBack} style={{ width:36, height:36, borderRadius:"50%",
          background:T.surf, border:`1px solid ${T.el}`, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:T.text, flexShrink:0 }}>{IC.back}</button>
      )}
      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:18, fontWeight:700,
        color:T.text, flex:1 }}>{title}</div>
      {action && (
        <button onClick={action.fn} style={{ display:"flex", alignItems:"center", gap:6,
          height:36, padding:"0 14px", borderRadius:80, border:"none", cursor:"pointer",
          background:T.action, color:"#fff", fontFamily:"'Rokkitt',serif",
          fontSize:13, fontWeight:700 }}>
          {action.icon && <span style={{display:"flex"}}>{action.icon}</span>}
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── FAB ──────────────────────────────────────────────────────────────────────
function FAB({ open, setOpen }) {
  const actions = [
    { icon:IC.cart,    label:"Quick Sale",     color:"#26CC5A" },
    { icon:IC.invoice, label:"Create Invoice", color:"#4C4CFF" },
    { icon:IC.dollar,  label:"Add Expense",    color:"#FB923C" },
    { icon:IC.users,   label:"Add Customer",   color:"#28AD1F" },
    { icon:IC.scan,    label:"Scan Barcode",   color:"#9B9FAF" },
  ];
  return (
    <>
      {open && <div onClick={()=>setOpen(false)} style={{ position:"absolute", inset:0, zIndex:30,
        background:"rgba(10,10,12,.65)", backdropFilter:"blur(4px)" }}/>}
      {open && (
        <div style={{ position:"absolute", bottom:92, right:16, zIndex:40,
          display:"flex", flexDirection:"column", gap:10, alignItems:"flex-end" }}>
          {actions.map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
              animation:`fadeUp .2s ease ${i*.05}s both` }}>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
                color:T.text, background:"rgba(26,29,36,.95)", backdropFilter:"blur(12px)",
                padding:"6px 14px", borderRadius:80, border:"1px solid rgba(255,255,255,.08)" }}>{a.label}</span>
              <div style={{ width:46, height:46, borderRadius:"50%", background:"rgba(26,29,36,.95)",
                backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:a.color, boxShadow:"0 4px 16px rgba(0,0,0,.4)" }}>{a.icon}</div>
            </div>
          ))}
        </div>
      )}
      <button onClick={()=>setOpen(f=>!f)} style={{ position:"absolute", bottom:84, right:16, zIndex:41,
        width:56, height:56, borderRadius:"50%", border:"none", cursor:"pointer",
        background: open ? "rgba(26,29,36,.95)" : T.action,
        backdropFilter: open ? "blur(12px)" : "none",
        border: open ? "1px solid rgba(255,255,255,.1)" : "none",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", transition:"all .2s", transform: open ? "rotate(45deg)" : "none",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,.3)" : "0 8px 28px rgba(35,35,255,.45), 0 2px 8px rgba(0,0,0,.3)" }}>
        {IC.plus}
      </button>
    </>
  );
}

// ─── PHONE + STATUS BAR ───────────────────────────────────────────────────────
function Phone({ children }) {
  return (
    <div style={{ width:375, height:812, borderRadius:44, overflow:"hidden", background:T.bg,
      flexShrink:0, position:"relative", display:"flex", flexDirection:"column",
      boxShadow:"0 48px 96px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.07), inset 0 0 0 1px rgba(255,255,255,.04)" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
        width:120, height:34, background:"#000", borderRadius:"0 0 20px 20px", zIndex:20 }}/>
      <div style={{ padding:"14px 24px 0", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexShrink:0, zIndex:10 }}>
        <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.text }}>9:41</span>
        <div style={{ display:"flex", gap:5, alignItems:"center", color:T.text }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill={T.text}>
            <rect x="0" y="4" width="3" height="8" rx="1" opacity=".4"/>
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity=".7"/>
            <rect x="9" y="0.5" width="3" height="11.5" rx="1"/>
            <rect x="13.5" y="0" width="3" height="12" rx="1" opacity=".3"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke={T.text} strokeWidth="2" strokeLinecap="round">
            <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" opacity=".9"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0" y="1" width="21" height="10" rx="2.5" stroke={T.text} strokeWidth="1.5"/>
            <rect x="1.5" y="2.5" width="15" height="7" rx="1.5" fill={T.ok}/>
            <path d="M22.5 4v4" stroke={T.text} strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
          </svg>
        </div>
      </div>
      <div style={{ flex:1, overflow:"hidden", position:"relative" }}>{children}</div>
    </div>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id:"dashboard", icon:IC.home,     label:"Dashboard" },
    { id:"services",  icon:IC.services, label:"Services"  },
    { id:"taxes",     icon:IC.taxes,    label:"Taxes"     },
    { id:"account",   icon:IC.account,  label:"Account"   },
  ];
  return (
    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:76, zIndex:50,
      background:"rgba(26,29,36,0.82)", backdropFilter:"blur(24px) saturate(180%)",
      borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center" }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={()=>onChange(t.id)} style={{ flex:1, height:"100%",
            border:"none", background:"none", cursor:"pointer", display:"flex",
            flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4,
            color: on ? T.action : T.muted, transition:"color .15s", position:"relative" }}>
            {on && <div style={{ position:"absolute", top:10, width:40, height:28,
              borderRadius:80, background:"rgba(35,35,255,.15)" }}/>}
            <span style={{ display:"flex", position:"relative" }}>{t.icon}</span>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10,
              fontWeight: on ? 700 : 400, position:"relative" }}>{t.label}</span>
            {on && <div style={{ position:"absolute", bottom:10, width:4, height:4,
              borderRadius:"50%", background:T.action }}/>}
          </button>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SCREEN
// ══════════════════════════════════════════════════════════════════════════════
function Dashboard({ push }) {
  const [period, setPeriod] = useState("W");
  const [fabOpen, setFabOpen] = useState(false);
  const [alertShown, setAlertShown] = useState(true);
  const weekData   = [38,52,44,61,58,72,84];
  const weekLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  return (
    <div style={{ height:"100%", position:"relative" }}>
      <div style={{ height:"100%", overflowY:"auto", scrollbarWidth:"none", paddingBottom:84 }}>

        {/* Top bar */}
        <div style={{ padding:"14px 20px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted }}>Sun, 8 Mar 2026</div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:20, fontWeight:700, color:T.text, marginTop:1 }}>Good morning, Kofi 👋</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ position:"relative" }}>
              <div style={{ ...glassPanel, width:40, height:40, borderRadius:"50%", display:"flex",
                alignItems:"center", justifyContent:"center", color:T.muted, cursor:"pointer" }}>{IC.bell}</div>
              <div style={{ position:"absolute", top:9, right:9, width:7, height:7,
                borderRadius:"50%", background:T.err, border:`2px solid ${T.bg}` }}/>
            </div>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(35,35,255,.2)",
              border:"1.5px solid rgba(35,35,255,.45)", display:"flex", alignItems:"center",
              justifyContent:"center", fontFamily:"'Rokkitt',serif", fontSize:14,
              fontWeight:700, color:T.a400, cursor:"pointer" }}>KA</div>
          </div>
        </div>

        {/* Alert */}
        {alertShown && (
          <div style={{ margin:"0 16px 14px", background:"rgba(251,146,60,.1)",
            border:"1px solid rgba(251,146,60,.25)", borderRadius:14, padding:"10px 12px",
            display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ color:T.warn, display:"flex", flexShrink:0 }}>{IC.alert}</span>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text, flex:1, lineHeight:1.4 }}>
              iPhone 13 Pro Max — only <strong>2 units</strong> left in stock
            </span>
            <button onClick={()=>setAlertShown(false)} style={{ background:"none", border:"none",
              cursor:"pointer", color:T.muted, display:"flex" }}>{IC.x}</button>
          </div>
        )}

        {/* Hero liquid card */}
        <div style={{ ...liquidCard, margin:"0 16px 20px", padding:"22px 20px" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160,
            borderRadius:"50%", background:"rgba(35,35,255,.1)", filter:"blur(32px)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:-30, left:-30, width:120, height:120,
            borderRadius:"50%", background:"rgba(38,204,90,.07)", filter:"blur(24px)", pointerEvents:"none" }}/>
          <div style={{ position:"relative" }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:"rgba(155,159,175,.8)",
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Total Cash Position</div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:40, fontWeight:600,
              color:T.text, lineHeight:1, marginBottom:6 }}>₦ 4,283,750</div>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:20 }}>
              <span style={{ color:T.okLight, display:"flex" }}>{IC.arrowUp}</span>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.okLight, fontWeight:600 }}>+12.4% vs last week</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[{label:"Revenue",amt:"₦ 6.4M",delta:"+8.2%",up:true},{label:"Expenses",amt:"₦ 1.8M",delta:"-3.1%",up:false},{label:"Net Profit",amt:"₦ 4.6M",delta:"+14.7%",up:true}].map((s,i)=>(
                <div key={i} style={{ ...glassPanel, padding:"10px 10px" }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:"rgba(155,159,175,.7)", marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:15, fontWeight:500, color:T.text, lineHeight:1, marginBottom:4 }}>{s.amt}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                    <span style={{ color:s.up?T.okLight:T.err, display:"flex" }}>{s.up?IC.arrowUp:IC.arrowDn}</span>
                    <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:s.up?T.okLight:T.err, fontWeight:600 }}>{s.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance grid — tappable */}
        <div style={{ padding:"0 16px 20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { label:"Today's Sales",    val:"₦ 847K", sub:"23 transactions",  trend:[4,6,5,8,7,9,11], color:T.a400,  pct:"+18%",    up:true,  screen:"transactions" },
            { label:"Pending Invoices", val:"7",       sub:"₦ 1.24M total",    trend:[3,5,4,7,6,5,7],  color:T.warn,  pct:"3 overdue", up:false, screen:"invoices"     },
            { label:"Low Stock Items",  val:"5",       sub:"Need reordering",  trend:[2,3,2,4,3,5,5],  color:T.err,   pct:"↑ 2",     up:false, screen:"products"     },
            { label:"Customers",        val:"142",     sub:"12 new this week", trend:[80,90,95,110,120,130,142], color:T.ok, pct:"+12", up:true, screen:"customers"    },
          ].map((c,i) => (
            <div key={i} onClick={()=>push(c.screen)} style={{ background:T.surf, borderRadius:16,
              padding:"14px", border:`1px solid ${T.el}`, cursor:"pointer", transition:"transform .15s, box-shadow .15s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.3)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted, lineHeight:1.3 }}>{c.label}</div>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, fontWeight:700, color:c.up?T.ok:T.err }}>{c.pct}</span>
              </div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:22, fontWeight:500, color:T.text, marginBottom:2 }}>{c.val}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted }}>{c.sub}</div>
                <SparkLine data={c.trend} color={c.color} h={28}/>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ margin:"0 16px 20px", background:T.surf, borderRadius:20, padding:"16px", border:`1px solid ${T.el}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:15, fontWeight:700, color:T.text }}>Weekly Revenue</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted, marginTop:2 }}>Mar 2 – 8, 2026</div>
            </div>
            <div style={{ display:"flex", gap:3 }}>
              {["W","M","Y"].map(p=>(
                <button key={p} onClick={()=>setPeriod(p)} style={{ height:28, padding:"0 11px",
                  borderRadius:80, border:"none", cursor:"pointer",
                  background: period===p ? "rgba(35,35,255,.2)" : "transparent",
                  color: period===p ? T.a400 : T.muted, fontFamily:"'Rokkitt',serif",
                  fontSize:12, fontWeight: period===p ? 700 : 400 }}>{p}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:64, width:"100%" }}>
            {weekData.map((v,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", height:`${(v/Math.max(...weekData))*56}px`,
                  borderRadius:"5px 5px 0 0", background:i===6?T.okLight:T.action,
                  opacity:i===6?1:i>=4?0.7:0.45, transition:"height .3s" }}/>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:9, color:T.muted }}>{weekLabels[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:14,
            paddingTop:14, borderTop:`1px solid ${T.el}` }}>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted }}>This week</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19, fontWeight:500, color:T.text, marginTop:2 }}>₦ 3,540,000</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted }}>vs last week</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:19, fontWeight:500, color:T.okLight, marginTop:2 }}>+₦ 390,000</div>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div style={{ margin:"0 16px 20px", background:"linear-gradient(135deg, rgba(35,35,255,.1) 0%, rgba(35,35,255,.03) 100%)",
          border:"1px solid rgba(35,35,255,.22)", borderRadius:20, padding:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"rgba(35,35,255,.2)",
              display:"flex", alignItems:"center", justifyContent:"center", color:T.a400 }}>{IC.sparkle}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700, color:T.text }}>AI Insight</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.a400 }}>Updated 5 mins ago</div>
            </div>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, fontWeight:700, color:T.a400,
              background:"rgba(35,35,255,.15)", padding:"2px 8px", borderRadius:80 }}>Pro</span>
          </div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.subtle, lineHeight:1.65, marginBottom:14 }}>
            Your Fri–Sun revenue is <span style={{ color:T.okLight, fontWeight:700 }}>38% higher</span> than weekdays.
            Consider running weekend promos to maximise your ₦ 720K Sunday peak.
          </div>
          <button style={{ width:"100%", height:40, borderRadius:80, border:"none", background:T.action,
            color:"#fff", fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
            View full report
          </button>
        </div>

        {/* Recent sales */}
        <div style={{ margin:"0 16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:16, fontWeight:700, color:T.text }}>Recent Sales</div>
            <button onClick={()=>push("transactions")} style={{ display:"flex", alignItems:"center", gap:4,
              fontFamily:"'Rokkitt',serif", fontSize:13, color:T.a400, background:"none", border:"none", cursor:"pointer" }}>
              See all {IC.chevR}
            </button>
          </div>
          <div style={{ borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
            {DATA.transactions.slice(0,4).map((r,i) => (
              <div key={i} onClick={()=>push("invoices")}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px",
                  background:T.surf, borderBottom:i<3?`1px solid ${T.el}`:"none", cursor:"pointer" }}>
                <Avatar name={r.name} size={36}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, color:T.text,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.name}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>{r.item} · {r.time}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:13, color:T.text, fontWeight:500 }}>{fmt(r.amt)}</span>
                  <Badge label={r.type==="sale"?"Paid":"Refund"} type={r.type==="sale"?"ok":"err"}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick tasks */}
        <div style={{ margin:"0 16px 28px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:16, fontWeight:700, color:T.text, marginBottom:12 }}>Quick Tasks</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { icon:IC.invoice, label:"3 invoices need sending",   sub:"Total: ₦ 675,000",    color:T.a400, cta:"Send now", screen:"invoices" },
              { icon:IC.alert,   label:"5 items low on stock",      sub:"Est. reorder: ₦ 320k", color:T.warn, cta:"View",    screen:"products" },
              { icon:IC.wallet,  label:"WHT payment due Mar 15",    sub:"₦ 48,500 due",         color:T.err,  cta:"Pay now", screen:"taxes"    },
            ].map((t,i) => (
              <div key={i} onClick={()=>push(t.screen)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                  background:T.surf, borderRadius:14, border:`1px solid ${T.el}`, cursor:"pointer" }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${t.color}18`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:t.color, flexShrink:0 }}>{t.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, color:T.text }}>{t.label}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>{t.sub}</div>
                </div>
                <button style={{ fontFamily:"'Rokkitt',serif", fontSize:12, fontWeight:700, color:t.color,
                  background:`${t.color}18`, border:"none", padding:"6px 12px", borderRadius:80,
                  cursor:"pointer", whiteSpace:"nowrap" }}>{t.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAB open={fabOpen} setOpen={setFabOpen}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TRANSACTIONS LIST (from dashboard "Today's Sales" card)
// ══════════════════════════════════════════════════════════════════════════════
function TransactionsList({ pop }) {
  const [filter, setFilter] = useState(0);
  const tabs = ["All","Sales","Refunds"];
  const filtered = filter===0 ? DATA.transactions : filter===1 ? DATA.transactions.filter(t=>t.type==="sale") : DATA.transactions.filter(t=>t.type==="refund");
  const total = filtered.filter(t=>t.type==="sale").reduce((a,t)=>a+t.amt,0);
  const refunds = filtered.filter(t=>t.type==="refund").reduce((a,t)=>a+Math.abs(t.amt),0);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Today's Sales" onBack={pop}/>
      {/* Summary */}
      <div style={{ margin:"0 16px 16px", ...glassPanel, padding:"16px", background:"rgba(35,35,255,.06)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          {[
            { label:"Gross Sales", amt:`₦ ${(total/1000).toFixed(0)}K`, color:T.okLight },
            { label:"Refunds",     amt:`₦ ${(refunds/1000).toFixed(0)}K`, color:T.err },
            { label:"Net",         amt:`₦ ${((total-refunds)/1000).toFixed(0)}K`, color:T.text },
          ].map((s,i)=>(
            <div key={i}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted, marginBottom:4 }}>{s.label}</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:17, fontWeight:500, color:s.color }}>{s.amt}</div>
            </div>
          ))}
        </div>
      </div>
      <FilterTabs tabs={tabs} active={filter} onChange={setFilter}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {filtered.map((t,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
              background:T.surf, borderBottom:i<filtered.length-1?`1px solid ${T.el}`:"none" }}>
              <div style={{ width:36, height:36, borderRadius:10,
                background:t.type==="sale"?"rgba(40,173,31,.12)":"rgba(239,68,68,.12)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:t.type==="sale"?T.ok:T.err, flexShrink:0 }}>
                {t.type==="sale"?IC.receipt:IC.swap}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text,
                  overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.name}</div>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>{t.item} · {t.time}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
                <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500,
                  color:t.type==="sale"?T.text:T.err }}>
                  {t.type==="refund"?"-":""}{fmt(t.amt)}
                </span>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted }}>{t.ref}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCTS LIST
// ══════════════════════════════════════════════════════════════════════════════
function ProductsList({ pop, push }) {
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");
  const tabs = ["All","In Stock","Low Stock","Out of Stock"];
  const filterMap = [null,"ok","low","out"];
  const filtered = DATA.products.filter(p=>{
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchTab = filter===0 || p.status===filterMap[filter];
    return matchSearch && matchTab;
  });

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Products" onBack={pop} action={{ label:"Add", icon:IC.plus, fn:()=>{} }}/>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or SKU..."/>
      <FilterTabs tabs={tabs} active={filter} onChange={setFilter}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {filtered.map((p,i)=>{
            const sc = statusCfg[p.status];
            return (
              <div key={i} onClick={()=>push("product_detail",{product:p})}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                  background:T.surf, borderBottom:i<filtered.length-1?`1px solid ${T.el}`:"none", cursor:"pointer" }}>
                <div style={{ width:40, height:40, borderRadius:12, background:T.el,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:T.muted, flexShrink:0 }}>{IC.tag}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:600,
                    color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>
                    {p.sku} · {p.category}
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500, color:T.text }}>
                    {fmt(p.price)}
                  </span>
                  <Badge label={sc.label} type={sc.type}/>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length===0 && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            padding:"48px 32px", gap:12, textAlign:"center" }}>
            <div style={{ width:56, height:56, borderRadius:16, background:T.el,
              display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>{IC.box}</div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:18, fontWeight:700, color:T.text }}>No products found</div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.muted, lineHeight:1.6 }}>
              Try a different search or filter.
            </div>
          </div>
        )}
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PRODUCT DETAIL
// ══════════════════════════════════════════════════════════════════════════════
function ProductDetail({ pop, product }) {
  const sc = statusCfg[product.status];
  const stockPct = Math.min(100, (product.stock / 20) * 100);
  const stockColor = product.status==="ok"?T.ok:product.status==="low"?T.warn:T.err;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Product Detail" onBack={pop} action={{ label:"Edit", icon:IC.edit, fn:()=>{} }}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none", paddingBottom:24 }}>

        {/* Hero */}
        <div style={{ margin:"0 16px 20px", background:T.surf, borderRadius:20, overflow:"hidden",
          border:`1px solid ${T.el}` }}>
          <div style={{ height:140, background:`linear-gradient(135deg, ${T.el} 0%, rgba(35,35,255,.08) 100%)`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:72, height:72, borderRadius:20, background:"rgba(255,255,255,.06)",
              display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>
              {IC.tag}
            </div>
          </div>
          <div style={{ padding:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:18, fontWeight:700, color:T.text, flex:1, marginRight:12 }}>{product.name}</div>
              <Badge label={sc.label} type={sc.type}/>
            </div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted }}>{product.sku} · {product.category}</div>
          </div>
        </div>

        {/* Price + stock */}
        <div style={{ margin:"0 16px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div style={{ background:T.surf, borderRadius:16, padding:"16px", border:`1px solid ${T.el}` }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginBottom:6 }}>Selling Price</div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:24, fontWeight:600, color:T.text }}>{fmt(product.price)}</div>
          </div>
          <div style={{ background:T.surf, borderRadius:16, padding:"16px", border:`1px solid ${T.el}` }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginBottom:6 }}>Units in Stock</div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:24, fontWeight:600, color:stockColor }}>{product.stock}</div>
          </div>
        </div>

        {/* Stock bar */}
        <div style={{ margin:"0 16px 20px", background:T.surf, borderRadius:16, padding:"16px", border:`1px solid ${T.el}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600, color:T.text }}>Stock Level</div>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted }}>Threshold: {product.threshold} units</div>
          </div>
          <div style={{ height:8, borderRadius:80, background:T.el, overflow:"hidden", marginBottom:8 }}>
            <div style={{ width:`${stockPct}%`, height:"100%", borderRadius:80,
              background:stockColor, transition:"width .4s ease" }}/>
          </div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:stockColor }}>
            {product.status==="ok"?"Healthy stock level":product.status==="low"?"Running low — consider reordering":"Out of stock — reorder now"}
          </div>
        </div>

        {/* Details */}
        <div style={{ margin:"0 16px 20px", background:T.surf, borderRadius:16, border:`1px solid ${T.el}`, overflow:"hidden" }}>
          {[
            { label:"Product ID",  val:product.id },
            { label:"SKU",         val:product.sku },
            { label:"Category",    val:product.category },
            { label:"Unit Price",  val:fmt(product.price) },
          ].map((row,i,arr)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"13px 16px", borderBottom:i<arr.length-1?`1px solid ${T.el}`:"none" }}>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.muted }}>{row.label}</span>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text, fontWeight:600 }}>{row.val}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ margin:"0 16px", display:"flex", gap:10 }}>
          <button style={{ flex:1, height:48, borderRadius:80, border:"none", cursor:"pointer",
            background:T.action, color:"#fff", fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700 }}>
            Adjust Stock
          </button>
          <button style={{ height:48, padding:"0 20px", borderRadius:80, cursor:"pointer",
            background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.2)",
            color:T.err, fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700 }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INVOICES LIST
// ══════════════════════════════════════════════════════════════════════════════
function InvoicesList({ pop, push }) {
  const [filter, setFilter] = useState(0);
  const tabs = ["All","Draft","Sent","Paid","Overdue"];
  const filterMap = [null,"draft","sent","paid","overdue"];
  const filtered = filter===0 ? DATA.invoices : DATA.invoices.filter(i=>i.status===filterMap[filter]);
  const total = filtered.reduce((a,i)=>a+i.total,0);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Invoices" onBack={pop} action={{ label:"New", icon:IC.plus, fn:()=>{} }}/>
      {/* Total */}
      <div style={{ margin:"0 16px 14px", padding:"12px 16px", background:"rgba(35,35,255,.06)",
        borderRadius:14, border:"1px solid rgba(35,35,255,.15)" }}>
        <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginBottom:2 }}>
          {filtered.length} invoice{filtered.length!==1?"s":""} · Total
        </div>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:22, fontWeight:500, color:T.text }}>{fmt(total)}</div>
      </div>
      <FilterTabs tabs={tabs} active={filter} onChange={setFilter}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {filtered.map((inv,i)=>{
            const sc = statusCfg[inv.status];
            return (
              <div key={i} onClick={()=>push("invoice_detail",{invoice:inv})}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 14px",
                  background:T.surf, borderBottom:i<filtered.length-1?`1px solid ${T.el}`:"none", cursor:"pointer" }}>
                <div style={{ width:40, height:40, borderRadius:12, background:T.el,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:T.muted, flexShrink:0 }}>{IC.invoice}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
                    color:T.text }}>{inv.id}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>
                    {inv.customer} · Due {inv.due}
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500, color:T.text }}>{fmt(inv.total)}</span>
                  <Badge label={sc.label} type={sc.type}/>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// INVOICE DETAIL
// ══════════════════════════════════════════════════════════════════════════════
function InvoiceDetail({ pop, push, invoice }) {
  const sc = statusCfg[invoice.status];
  const subtotal = invoice.items.reduce((a,it)=>a+it.qty*it.price,0);
  const vat = Math.round(subtotal*0.075);
  const isOverdue = invoice.status==="overdue";

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title={invoice.id} onBack={pop}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none", paddingBottom:24 }}>

        {/* Status banner */}
        {isOverdue && (
          <div style={{ margin:"0 16px 16px", background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)",
            borderRadius:14, padding:"12px 14px", display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ color:T.err, display:"flex" }}>{IC.alert}</span>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.err }}>Payment Overdue</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.subtle }}>Was due {invoice.due} · Send a reminder now</div>
            </div>
          </div>
        )}

        {/* Header card */}
        <div style={{ margin:"0 16px 16px", background:T.surf, borderRadius:20,
          padding:"18px", border:`1px solid ${T.el}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted, marginBottom:4 }}>Invoice Amount</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:32, fontWeight:600, color:T.text, lineHeight:1 }}>
                {fmt(invoice.total)}
              </div>
            </div>
            <Badge label={sc.label} type={sc.type}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[{label:"Created",val:invoice.created},{label:"Due Date",val:invoice.due}].map((r,i)=>(
              <div key={i}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginBottom:2 }}>{r.label}</div>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text, fontWeight:600 }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div style={{ margin:"0 16px 16px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted,
            textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>BILL TO</div>
          <div onClick={()=>push("customer_detail",{customer:DATA.customers.find(c=>c.name===invoice.customer)||DATA.customers[0]})}
            style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
              background:T.surf, borderRadius:14, border:`1px solid ${T.el}`, cursor:"pointer" }}>
            <Avatar name={invoice.customer} size={40}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700, color:T.text }}>{invoice.customer}</div>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.a400, marginTop:2 }}>View customer →</div>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={{ margin:"0 16px 16px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted,
            textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>LINE ITEMS</div>
          <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${T.el}` }}>
            {invoice.items.map((it,i)=>(
              <div key={i} style={{ padding:"12px 14px", background:T.surf,
                borderBottom:i<invoice.items.length-1?`1px solid ${T.el}`:"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text, fontWeight:600 }}>{it.name}</div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500, color:T.text }}>{fmt(it.qty*it.price)}</div>
                </div>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>
                  {fmt(it.price)} × {it.qty} unit{it.qty>1?"s":""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div style={{ margin:"0 16px 20px", borderRadius:14, overflow:"hidden",
          border:`1px solid ${T.el}`, background:T.surf }}>
          {[
            { label:"Subtotal", val:fmt(subtotal), bold:false },
            { label:"VAT (7.5%)", val:fmt(vat), bold:false },
            { label:"Total", val:fmt(invoice.total), bold:true },
          ].map((r,i,arr)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"12px 14px",
              borderBottom:i<arr.length-1?`1px solid ${T.el}`:"none",
              background:r.bold?"rgba(35,35,255,.06)":"transparent" }}>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:14, color:r.bold?T.text:T.muted, fontWeight:r.bold?700:400 }}>{r.label}</span>
              <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:r.bold?17:14, fontWeight:r.bold?600:400, color:T.text }}>{r.val}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ margin:"0 16px", display:"flex", flexDirection:"column", gap:10 }}>
          {invoice.status==="sent"||invoice.status==="overdue" ? (
            <button style={{ height:48, borderRadius:80, border:"none", cursor:"pointer",
              background:T.action, color:"#fff", fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700 }}>
              Record Payment
            </button>
          ) : null}
          <div style={{ display:"flex", gap:10 }}>
            <button style={{ flex:1, height:44, borderRadius:80, cursor:"pointer",
              background:"rgba(255,255,255,.05)", border:`1px solid ${T.el}`,
              color:T.text, fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {IC.share} Share PDF
            </button>
            <button style={{ flex:1, height:44, borderRadius:80, cursor:"pointer",
              background:"rgba(37,211,102,.06)", border:"1px solid rgba(37,211,102,.2)",
              color:"#25d366", fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {IC.wa} WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOMERS LIST
// ══════════════════════════════════════════════════════════════════════════════
function CustomersList({ pop, push }) {
  const [search, setSearch] = useState("");
  const filtered = DATA.customers.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Customers" onBack={pop} action={{ label:"Add", icon:IC.plus, fn:()=>{} }}/>
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or city..."/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {filtered.map((c,i)=>(
            <div key={i} onClick={()=>push("customer_detail",{customer:c})}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                background:T.surf, borderBottom:i<filtered.length-1?`1px solid ${T.el}`:"none", cursor:"pointer" }}>
              <Avatar name={c.name} size={40}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:600, color:T.text }}>{c.name}</div>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>
                  {c.phone} · {c.city}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                {c.balance>0 ? (
                  <>
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:13, color:T.err, fontWeight:500 }}>{fmt(c.balance)}</span>
                    <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.err }}>Outstanding</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:13, color:T.text, fontWeight:500 }}>{fmt(c.totalSpent)}</span>
                    <span style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted }}>Lifetime</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOMER DETAIL
// ══════════════════════════════════════════════════════════════════════════════
function CustomerDetail({ pop, push, customer }) {
  const custInvoices = DATA.invoices.filter(inv=>inv.customer===customer.name);

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Customer" onBack={pop} action={{ label:"Edit", icon:IC.edit, fn:()=>{} }}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none", paddingBottom:24 }}>

        {/* Profile card */}
        <div style={{ margin:"0 16px 16px", background:T.surf, borderRadius:20,
          padding:"20px", border:`1px solid ${T.el}`, textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
            <Avatar name={customer.name} size={64}/>
          </div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:18, fontWeight:700, color:T.text, marginBottom:4 }}>{customer.name}</div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.muted, marginBottom:16 }}>{customer.city}</div>
          {/* Quick action buttons */}
          <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
            {[
              { icon:IC.invoice, label:"Invoice",  color:T.a400, bg:"rgba(35,35,255,.12)"  },
              { icon:IC.phone,   label:"Call",      color:T.ok,   bg:"rgba(40,173,31,.12)"  },
              { icon:IC.wa,      label:"WhatsApp",  color:"#25d366", bg:"rgba(37,211,102,.1)" },
            ].map((a,i)=>(
              <button key={i} style={{ flex:1, height:52, borderRadius:14, border:"none",
                cursor:"pointer", background:a.bg, color:a.color,
                display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", gap:4 }}>
                <span style={{ display:"flex" }}>{a.icon}</span>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:11, fontWeight:700 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div style={{ margin:"0 16px 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {[
            { icon:IC.phone,    label:customer.phone },
            { icon:IC.mail,     label:customer.email },
            { icon:IC.location, label:customer.city },
          ].map((r,i,arr)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
              background:T.surf, borderBottom:i<arr.length-1?`1px solid ${T.el}`:"none" }}>
              <span style={{ color:T.muted, display:"flex" }}>{r.icon}</span>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, color:T.text }}>{r.label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ margin:"0 16px 16px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {[
            { label:"Total Spent",   val:fmt(customer.totalSpent), color:T.text  },
            { label:"Outstanding",   val:customer.balance>0?fmt(customer.balance):"₦ 0", color:customer.balance>0?T.err:T.ok },
            { label:"Invoices",      val:customer.invoices,         color:T.text  },
          ].map((s,i)=>(
            <div key={i} style={{ background:T.surf, borderRadius:14, padding:"12px", border:`1px solid ${T.el}`, textAlign:"center" }}>
              <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted, marginBottom:6 }}>{s.label}</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:500, color:s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Invoice history */}
        {custInvoices.length>0 && (
          <div style={{ margin:"0 16px" }}>
            <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted,
              textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>INVOICE HISTORY</div>
            <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${T.el}` }}>
              {custInvoices.map((inv,i)=>{
                const sc = statusCfg[inv.status];
                return (
                  <div key={i} onClick={()=>push("invoice_detail",{invoice:inv})}
                    style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                      padding:"12px 14px", background:T.surf,
                      borderBottom:i<custInvoices.length-1?`1px solid ${T.el}`:"none", cursor:"pointer" }}>
                    <div>
                      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600, color:T.text }}>{inv.id}</div>
                      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>Due {inv.due}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500, color:T.text }}>{fmt(inv.total)}</span>
                      <Badge label={sc.label} type={sc.type}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPENSES LIST
// ══════════════════════════════════════════════════════════════════════════════
function ExpensesList({ pop }) {
  const [filter, setFilter] = useState(0);
  const categories = ["All","Inventory","Utilities","Office","Tax","Software"];
  const filtered = filter===0 ? DATA.expenses : DATA.expenses.filter(e=>e.category===categories[filter]);
  const total = DATA.expenses.reduce((a,e)=>a+e.amount,0);
  const catIcons = { Inventory:IC.box, Utilities:IC.bank, Office:IC.settings, Tax:IC.receipt, Software:IC.settings };
  const catColors = { Inventory:T.a400, Utilities:T.warn, Office:T.muted, Tax:T.err, Software:T.ok };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Expenses" onBack={pop} action={{ label:"Add", icon:IC.plus, fn:()=>{} }}/>
      {/* Month summary */}
      <div style={{ margin:"0 16px 14px", ...glassPanel, padding:"14px 16px", background:"rgba(239,68,68,.05)" }}>
        <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginBottom:2 }}>January 2026 · Total</div>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:24, fontWeight:500, color:T.err }}>{fmt(total)}</div>
      </div>
      <FilterTabs tabs={categories} active={filter} onChange={setFilter}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {filtered.map((e,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
              background:T.surf, borderBottom:i<filtered.length-1?`1px solid ${T.el}`:"none" }}>
              <div style={{ width:40, height:40, borderRadius:12,
                background:`${catColors[e.category]||T.muted}15`,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:catColors[e.category]||T.muted, flexShrink:0 }}>
                {catIcons[e.category]||IC.receipt}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:600,
                  color:T.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.vendor}</div>
                <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>{e.category} · {e.date}</div>
              </div>
              <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:500, color:T.text, flexShrink:0 }}>
                -{fmt(e.amount)}
              </span>
            </div>
          ))}
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TEAM LIST
// ══════════════════════════════════════════════════════════════════════════════
function TeamList({ pop }) {
  const roleColors = { Owner:"#9B5CF6", "Sales Rep":T.a400, Accountant:T.ok };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
      <ScreenHeader title="Team" onBack={pop} action={{ label:"Invite", icon:IC.plus, fn:()=>{} }}/>
      <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
        <div style={{ margin:"0 16px 16px", borderRadius:16, overflow:"hidden", border:`1px solid ${T.el}` }}>
          {DATA.team.map((m,i)=>{
            const rc = roleColors[m.role]||T.muted;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px",
                background:T.surf, borderBottom:i<DATA.team.length-1?`1px solid ${T.el}`:"none" }}>
                <Avatar name={m.name} size={44}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700, color:T.text }}>{m.name}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:11, color:T.muted, marginTop:2 }}>{m.email}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
                  <span style={{ fontFamily:"'Rokkitt',serif", fontSize:11, fontWeight:700, color:rc,
                    background:`${rc}18`, padding:"2px 8px", borderRadius:80 }}>{m.role}</span>
                  <Badge label={m.status==="active"?"Active":"Pending"} type={m.status==="active"?"ok":"warn"}/>
                </div>
              </div>
            );
          })}
        </div>
        {/* Invite card */}
        <div style={{ margin:"0 16px", borderRadius:16, border:`2px dashed ${T.el}`,
          padding:"20px", display:"flex", flexDirection:"column", alignItems:"center",
          gap:10, cursor:"pointer", background:"rgba(255,255,255,.01)" }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:T.el,
            display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>{IC.plus}</div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700, color:T.text }}>Invite team member</div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted, textAlign:"center", lineHeight:1.5 }}>
            Add up to 3 members on the Growth plan
          </div>
        </div>
        <div style={{ height:20 }}/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SERVICES HUB
// ══════════════════════════════════════════════════════════════════════════════
function ServicesHub({ push }) {
  const [fabOpen, setFabOpen] = useState(false);
  const freeServices = [
    { icon:IC.tag,     label:"Products",   sub:"Inventory",    screen:"products"  },
    { icon:IC.receipt, label:"Invoices",   sub:"Create & send",screen:"invoices"  },
    { icon:IC.users,   label:"Customers",  sub:"Directory",    screen:"customers" },
    { icon:IC.scan,    label:"Barcode",    sub:"Scan to add",  screen:null        },
    { icon:IC.dollar,  label:"Expenses",   sub:"Track costs",  screen:"expenses"  },
    { icon:IC.user,    label:"Team",       sub:"Manage staff", screen:"team"      },
    { icon:IC.wallet,  label:"Wallet",     sub:"Business",     screen:null        },
    { icon:IC.pie,     label:"VAT Report", sub:"Auto calc",    screen:null        },
  ];
  const lockedGroups = [
    {
      tier:"Growth", label:"Growth — ₦ 5,000/mo", color:T.a400,
      services:[
        {icon:IC.box,   label:"Stock Count",  sub:"Audit"},
        {icon:IC.cart,  label:"POS Terminal", sub:"Opay · Moniepoint"},
        {icon:IC.swap,  label:"FlexPay",      sub:"Instalment"},
        {icon:IC.truck, label:"Shipping",     sub:"Shipbubble"},
        {icon:IC.bank,  label:"Bank Sync",    sub:"Mono"},
        {icon:IC.pie,   label:"WHT Report",   sub:"WHT tracking"},
      ]
    },
    {
      tier:"Pro", label:"Pro — AI Features", color:T.warn,
      services:[{icon:IC.sparkle, label:"AI Insights", sub:"Predictions"}]
    },
  ];

  return (
    <div style={{ height:"100%", position:"relative" }}>
      <div style={{ height:"100%", overflowY:"auto", scrollbarWidth:"none", paddingBottom:84 }}>
        <div style={{ padding:"14px 20px 16px" }}>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:12, color:T.muted, marginBottom:2 }}>Nukodes</div>
          <div style={{ fontFamily:"'Rokkitt',serif", fontSize:22, fontWeight:700, color:T.text }}>Services</div>
        </div>

        {/* Free group */}
        <div style={{ margin:"0 16px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:T.ok }}/>
              <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.text }}>Free — Always included</span>
            </div>
            <span style={{ fontFamily:"'Rokkitt',serif", fontSize:11, fontWeight:700, color:T.ok,
              background:"rgba(40,173,31,.12)", padding:"3px 8px", borderRadius:80 }}>Active</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            {freeServices.map((s,i)=>(
              <div key={i} onClick={()=>s.screen&&push(s.screen)}
                style={{ background:T.surf, borderRadius:18, padding:"14px 12px 12px",
                  border:`1px solid ${T.el}`, cursor:s.screen?"pointer":"default",
                  display:"flex", flexDirection:"column", gap:8, position:"relative",
                  transition:"transform .15s, box-shadow .15s" }}
                onMouseEnter={e=>{if(s.screen){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.3)"}}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                <div style={{ width:38, height:38, borderRadius:12, background:`${T.ok}18`,
                  display:"flex", alignItems:"center", justifyContent:"center", color:T.ok }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.text, lineHeight:1.2 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted, marginTop:3, lineHeight:1.4 }}>{s.sub}</div>
                </div>
                <div style={{ position:"absolute", top:10, right:10, width:16, height:16,
                  borderRadius:"50%", background:"rgba(40,173,31,.2)",
                  display:"flex", alignItems:"center", justifyContent:"center", color:T.ok }}>{IC.check}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked groups */}
        {lockedGroups.map((g,gi)=>(
          <div key={gi} style={{ margin:"0 16px 24px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:g.color }}/>
                <span style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.text }}>{g.label}</span>
              </div>
              <button style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"'Rokkitt',serif",
                fontSize:11, fontWeight:700, color:g.color, background:`${g.color}18`,
                border:`1px solid ${g.color}44`, padding:"4px 10px", borderRadius:80, cursor:"pointer" }}>
                <span style={{ display:"flex" }}>{IC.lock}</span> Upgrade
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {g.services.map((s,si)=>(
                <div key={si} style={{ background:"rgba(26,29,36,.6)", borderRadius:18,
                  padding:"14px 12px 12px", border:`1px solid ${T.el}`,
                  display:"flex", flexDirection:"column", gap:8, position:"relative", opacity:0.75 }}>
                  <div style={{ width:38, height:38, borderRadius:12, background:T.el,
                    display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Rokkitt',serif", fontSize:13, fontWeight:700, color:T.muted, lineHeight:1.2 }}>{s.label}</div>
                    <div style={{ fontFamily:"'Rokkitt',serif", fontSize:10, color:T.muted, marginTop:3, lineHeight:1.4 }}>{s.sub}</div>
                  </div>
                  <div style={{ position:"absolute", top:10, right:10, color:T.muted, opacity:0.6, display:"flex" }}>{IC.lock}</div>
                </div>
              ))}
            </div>
            <button style={{ width:"100%", height:44, marginTop:12, borderRadius:14,
              border:`1px solid ${g.color}44`, background:`${g.color}0d`, color:g.color,
              fontFamily:"'Rokkitt',serif", fontSize:14, fontWeight:700,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <span style={{ display:"flex" }}>{IC.lock}</span> Unlock {g.tier} features
            </button>
          </div>
        ))}
      </div>
      <FAB open={fabOpen} setOpen={setFabOpen}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PLACEHOLDER
// ══════════════════════════════════════════════════════════════════════════════
function ComingSoon({ label }) {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", gap:12, padding:32 }}>
      <div style={{ width:56, height:56, borderRadius:16, background:T.el,
        display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>{IC.sparkle}</div>
      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:20, fontWeight:700, color:T.text }}>{label}</div>
      <div style={{ fontFamily:"'Rokkitt',serif", fontSize:14, color:T.muted, textAlign:"center", lineHeight:1.6 }}>
        This screen is in progress.
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN ROUTER — resolves screen id → component
// ══════════════════════════════════════════════════════════════════════════════
function ScreenRouter({ screenId, props={}, push, pop, tab }) {
  const p = { push, pop, ...props };
  const screens = {
    // Dashboard tab roots
    dashboard:        <Dashboard         {...p}/>,
    transactions:     <TransactionsList  {...p}/>,
    // Services tab roots
    services:         <ServicesHub       {...p}/>,
    products:         <ProductsList      {...p}/>,
    product_detail:   <ProductDetail     {...p}/>,
    invoices:         <InvoicesList      {...p}/>,
    invoice_detail:   <InvoiceDetail     {...p}/>,
    customers:        <CustomersList     {...p}/>,
    customer_detail:  <CustomerDetail    {...p}/>,
    expenses:         <ExpensesList      {...p}/>,
    team:             <TeamList          {...p}/>,
    // Other tabs
    taxes:            <ComingSoon label="Taxes & Reports"/>,
    account:          <ComingSoon label="Account & Settings"/>,
  };
  return screens[screenId] || <ComingSoon label={screenId}/>;
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [navStacks, dispatch] = useReducer(navReducer, {
    dashboard:[], services:[], taxes:[], account:[]
  });

  const push = (screen, props={}) => dispatch({ type:"PUSH", tab, screen, props });
  const pop  = ()                  => dispatch({ type:"POP",  tab });

  const currentStack = navStacks[tab] || [];
  const currentEntry = currentStack.length > 0
    ? currentStack[currentStack.length-1]
    : { screen: tab==="dashboard"?"dashboard":tab==="services"?"services":tab==="taxes"?"taxes":"account", props:{} };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rokkitt:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { display:none; }
        input::placeholder { color:#9B9FAF; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#050507",
        display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <Phone>
          <div style={{ height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
            <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
              <ScreenRouter
                screenId={currentEntry.screen}
                props={currentEntry.props}
                push={push}
                pop={pop}
                tab={tab}
              />
            </div>
            <TabBar active={tab} onChange={t=>{setTab(t);}}/>
          </div>
        </Phone>
      </div>
    </>
  );
}
