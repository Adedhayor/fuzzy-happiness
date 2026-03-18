import { useState } from "react";
import { T_DARK as T, BADGE, PATHS, Ico, Badge, Av, ChevD, Check, Plus, Minus, X, Upload, ImgIco } from "./Nukoder_DS";

const ChevR = () => <Ico d="M9 18l6-6-6-6" s={16} stroke={2} />;
const Chevron = ChevR;

function IBox({ path }) {
    return <div style={{ width: 40, height: 40, borderRadius: 10, background: T.el, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: T.muted }}><Ico d={path} /></div>;
}

// ── C1 List Item ──
function C1() {
    const [h, sH] = useState(null);
    const rows = [
        { lead: "icon", path: PATHS.tag, p: "iPhone 13 Pro Max", s: "SKU: IP13-PM-001 · In Stock: 12", amt: "₦ 450,000", badge: "In Stock" },
        { lead: null, p: "INV-001245", s: "John Doe · Due Jan 22", amt: "₦ 483,750", badge: "Sent" },
        { lead: null, p: "INV-001243", s: "Sarah Smith · Due Jan 11", amt: "₦ 285,000", badge: "Overdue" },
        { lead: "av", name: "John Doe", p: "John Doe", s: "0803 123 4567 · Lagos", amt: "₦ 5,250,000" },
        { lead: "icon", path: PATHS.receipt, p: "Inventory Purchase", s: "ABC Suppliers · Jan 15", amt: "₦ 125,000" },
        { lead: "av", name: "Sarah Smith", p: "Sarah Smith", s: "Sales Rep", chev: true },
        { lead: "icon", path: PATHS.settings, p: "Business Settings", s: "Name, address, tax info", chev: true },
    ];
    return <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
        {rows.map((r, i) => <div key={i} onMouseEnter={() => sH(i)} onMouseLeave={() => sH(null)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: h === i ? "#1F2330" : T.surf, borderBottom: i < rows.length - 1 ? `1px solid ${T.el}` : "none", transition: "background .12s", cursor: "pointer" }}>
            {r.lead === "av" && <Av name={r.name} />}
            {r.lead === "icon" && <IBox path={r.path} />}
            {!r.lead && <div style={{ width: 4 }} />}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.p}</div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{r.s}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                {r.amt && <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, color: T.text, fontWeight: 500 }}>{r.amt}</span>}
                {r.badge && <Badge label={r.badge} />}
                {r.chev && <span style={{ color: T.muted, display: "flex" }}><Chevron /></span>}
            </div>
        </div>)}
    </div>;
}

// ── C2 Badges ──
function C2() { return <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{Object.keys(BADGE).map(l => <Badge key={l} label={l} />)}</div>; }

// ── C3 Filter Tab ──
function C3() {
    const [a1, sA1] = useState(0); const [a2, sA2] = useState(0);
    const sets = [["All", "In Stock", "Low Stock", "Out of Stock"], ["All", "Draft", "Sent", "Paid", "Overdue", "Cancelled"]];
    const as = [a1, a2]; const ss = [sA1, sA2];
    return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sets.map((tabs, gi) => <div key={gi} style={{ display: "flex", gap: 4, overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map((t, i) => <button key={t} onClick={() => ss[gi](i)} style={{ height: 32, padding: "0 12px", borderRadius: 80, border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s", background: as[gi] === i ? T.action : "transparent", color: as[gi] === i ? "#fff" : T.muted, fontFamily: "'Rokkitt',serif", fontSize: 13, fontWeight: as[gi] === i ? 600 : 400 }}>{t}</button>)}
        </div>)}
    </div>;
}

// ── C4 Dropdown ──
function C4() {
    const [open, sO] = useState(null); const [vals, sV] = useState({});
    const fields = [
        { label: "Category", ph: "Select category...", opts: ["Electronics", "Fashion", "Food & Beverage", "Beauty", "Construction"] },
        { label: "Payment Method", ph: "Select method...", opts: ["Cash", "Bank Transfer", "Card", "POS Terminal", "Wallet"] },
        { label: "Nigerian State", ph: "Select state...", opts: ["Lagos", "Abuja (FCT)", "Rivers", "Kano", "Oyo"] },
    ];
    return <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {fields.map((f, i) => <div key={i}>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.subtle, marginBottom: 6 }}>{f.label}</div>
            <div onClick={() => sO(open === i ? null : i)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 48, padding: "0 14px", borderRadius: 12, background: T.surf, border: `1px solid ${open === i ? T.action : T.el}`, cursor: "pointer", transition: "border-color .15s" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: vals[i] ? T.text : T.muted }}>{vals[i] || f.ph}</span>
                <span style={{ color: T.muted, transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s", display: "flex" }}><ChevD /></span>
            </div>
            {open === i && <div style={{ marginTop: 4, background: T.el, borderRadius: 12, overflow: "hidden" }}>
                {f.opts.map((o, j) => <div key={j} onClick={() => { sV({ ...vals, [i]: o }); sO(null); }} style={{ padding: "11px 14px", fontFamily: "'Rokkitt',serif", fontSize: 14, color: vals[i] === o ? T.action : T.text, background: vals[i] === o ? "rgba(35,35,255,.12)" : "transparent", borderBottom: j < f.opts.length - 1 ? `1px solid ${T.surf}` : "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {o}{vals[i] === o && <span style={{ color: T.action }}><Check /></span>}
                </div>)}
            </div>}
        </div>)}
    </div>;
}

// ── C5 Bottom Sheet ──
function C5() {
    const [open, sO] = useState(false); const [sel, sSel] = useState(null);
    const opts = ["Cash", "Bank Transfer", "Card (Paystack)", "POS Terminal", "Wallet (PiggyVest)"];
    return <div>
        <button onClick={() => sO(true)} style={{ width: "100%", height: 46, borderRadius: 12, border: "none", background: T.action, color: "#fff", fontFamily: "'Rokkitt',serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {sel ? `✓  ${sel}` : "Tap to open Bottom Sheet →"}
        </button>
        {open && <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div onClick={() => sO(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,12,.75)", backdropFilter: "blur(4px)" }} />
            <div style={{ position: "relative", width: "100%", maxWidth: 480, background: T.surf, borderRadius: "20px 20px 0 0", zIndex: 1, paddingBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}><div style={{ width: 40, height: 4, borderRadius: 2, background: T.el }} /></div>
                <div style={{ padding: "8px 16px 12px", borderBottom: `1px solid ${T.el}` }}><span style={{ fontFamily: "'Rokkitt',serif", fontSize: 18, fontWeight: 700, color: T.text }}>Payment Method</span></div>
                {opts.map((o, i) => <div key={i} onClick={() => { sSel(o); sO(false); }} style={{ padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < opts.length - 1 ? `1px solid ${T.el}` : "none", cursor: "pointer", background: sel === o ? "rgba(35,35,255,.08)" : "transparent" }}>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: sel === o ? T.a400 : T.text }}>{o}</span>
                    {sel === o && <span style={{ color: T.action }}><Check /></span>}
                </div>)}
            </div>
        </div>}
    </div>;
}

// ── C6 Empty State ──
function C6() {
    const v = [
        { path: PATHS.tag, title: "No products yet", sub: "Add your first product to start tracking inventory", cta: "+ Add Product" },
        { path: PATHS.receipt, title: "No invoices yet", sub: "Create professional invoices for your customers", cta: "Create Invoice" },
        { path: PATHS.cloud, title: "You're offline", sub: "Data saved locally. We'll sync when you're back.", cta: "Retry" },
    ];
    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {v.map((item, i) => <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 12px", background: T.surf, borderRadius: 14, border: `1px solid ${T.el}`, textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: T.el, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted }}><Ico d={item.path} s={26} /></div>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, lineHeight: 1.5 }}>{item.sub}</div>
            </div>
            <button style={{ height: 32, padding: "0 14px", borderRadius: 80, border: `1px solid rgba(35,35,255,.4)`, background: "rgba(35,35,255,.1)", color: T.a400, fontFamily: "'Rokkitt',serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{item.cta}</button>
        </div>)}
    </div>;
}

// ── C7 Switch ──
function C7() {
    const [v, sV] = useState([false, true, false, true]);
    const items = [
        { l: "This product has variants", s: "Enable size, colour, or other options" },
        { l: "Hide cost price from employees", s: "Employees won't see your cost price" },
        { l: "Recurring expense", s: null },
        { l: "Walk-in customer", s: "No customer record needed" },
    ];
    return <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
        {items.map((it, i) => <div key={i} onClick={() => sV(prev => { const n = [...prev]; n[i] = !n[i]; return n; })} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 14px", borderBottom: i < items.length - 1 ? `1px solid ${T.el}` : "none", cursor: "pointer", background: T.surf }}>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text }}>{it.l}</div>
                {it.s && <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{it.s}</div>}
            </div>
            <div style={{ width: 48, height: 28, borderRadius: 14, background: v[i] ? T.action : T.el, position: "relative", transition: "background .2s", flexShrink: 0, marginLeft: 16 }}>
                <div style={{ position: "absolute", top: 2, left: v[i] ? "calc(100% - 26px)" : 2, width: 24, height: 24, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,.3)" }} />
            </div>
        </div>)}
    </div>;
}

// ── C8 Section Headers ──
function C8() {
    return <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: T.muted, marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>A — Form Section Header</div>
            {["Basic Information", "Pricing", "Inventory", "Variants"].map((l, i) => <div key={i} style={{ paddingBottom: 6, paddingTop: 10, borderBottom: `1px solid ${T.el}` }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</span>
            </div>)}
        </div>
        <div>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: T.muted, marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>B — List Group Label</div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
                {[{ g: "Today", c: "3" }, { g: "Yesterday", c: "7" }, { g: "This Week", c: "24" }].map((grp, i) => <div key={i}>
                    <div style={{ padding: "8px 14px 5px", background: T.bg, display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{grp.g}</span>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>{grp.c} invoices</span>
                    </div>
                    {i < 2 && <div style={{ padding: "11px 14px", borderBottom: `1px solid ${T.el}`, background: T.surf }}>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.text }}>INV-00124{i} · John Doe — </span>
                        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, color: T.text }}>₦ 483,750</span>
                    </div>}
                </div>)}
            </div>
        </div>
    </div>;
}

// ── C9 Icons ──
function C9() {
    const list = [
        { n: "receipt", d: PATHS.receipt }, { n: "people", d: PATHS.people }, { n: "tag", d: PATHS.tag },
        { n: "camera", d: PATHS.camera }, { n: "filter", d: PATHS.filter }, { n: "calendar", d: PATHS.cal },
        { n: "checkmark", d: PATHS.check2 }, { n: "trash", d: PATHS.trash }, { n: "more", d: PATHS.more },
        { n: "download", d: PATHS.dl }, { n: "share", d: PATHS.share }, { n: "wallet", d: PATHS.wallet },
    ];
    return <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
        {list.map(({ n, d }) => <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 6px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}` }}>
            <span style={{ color: T.muted }}><Ico d={d} /></span>
            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: T.muted, textAlign: "center" }}>{n}</span>
        </div>)}
    </div>;
}

// ── C10: Avatar / Initials ────────────────────────────────────────────────────
function C10() {
    const names = ["John Doe", "Sarah Smith", "Amara Praise", "Kofi Akpor"];
    const sizes = [{ s: 32, label: "32px list" }, { s: 40, label: "40px card" }, { s: 64, label: "64px profile" }];
    const cols = ["#2323FF", "#28AD1F", "#FB923C", "#EF4444"];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Size Variants</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 20, padding: "16px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}` }}>
                    {sizes.map(({ s, label }) => {
                        const c = cols[0];
                        return (
                            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <div style={{ width: s, height: s, borderRadius: "50%", background: `${c}22`, border: `1.5px solid ${c}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s * .34, fontFamily: "'Rokkitt',serif", fontWeight: 700, color: c }}>JD</div>
                                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>{label}</span>
                            </div>
                        );
                    })}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.el, border: `1.5px solid ${T.el}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted }}><Ico d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" s={20} /></div>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>placeholder</span>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>In context — Team List</div>
                <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
                    {names.map((name, i) => {
                        const ini = name.split(" ").map(w => w[0]).join("");
                        const c = cols[i % cols.length];
                        return (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: T.surf, borderBottom: i < names.length - 1 ? `1px solid ${T.el}` : "none" }}>
                                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${c}22`, border: `1.5px solid ${c}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "'Rokkitt',serif", fontWeight: 700, color: c, flexShrink: 0 }}>{ini}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text }}>{name}</div>
                                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{["Owner", "Sales Rep", "Cashier", "Inventory Mgr"][i]}</div>
                                </div>
                                <span style={{ color: T.muted, display: "flex" }}><ChevR /></span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── C11: Stepper / Quantity ───────────────────────────────────────────────────
function C11() {
    const [qty, sQ] = useState(1);
    const [qty2, sQ2] = useState(3);
    const [qty3, sQ3] = useState(10);
    const Stepper = ({ val, set, min = 1, max = 99, label }) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}`, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text }}>{label}</span>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${T.el}`, borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => set(v => Math.max(min, v - 1))} disabled={val <= min} style={{ width: 40, height: 40, border: "none", background: val <= min ? `${T.el}88` : T.el, color: val <= min ? T.muted : T.text, cursor: val <= min ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}><Minus /></button>
                <div style={{ width: 44, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: T.surf, fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 500, color: T.text, borderLeft: `1px solid ${T.el}`, borderRight: `1px solid ${T.el}` }}>{val}</div>
                <button onClick={() => set(v => Math.min(max, v + 1))} disabled={val >= max} style={{ width: 40, height: 40, border: "none", background: val >= max ? `${T.el}88` : T.el, color: val >= max ? T.muted : T.text, cursor: val >= max ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}><Plus /></button>
            </div>
        </div>
    );
    return (
        <div>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Interactive — tap +/−</div>
            <Stepper val={qty} set={sQ} label="iPhone 13 Pro Max" max={20} />
            <Stepper val={qty2} set={sQ2} label="Samsung A54 Case" max={10} />
            <Stepper val={qty3} set={sQ3} label="USB-C Cable (2m)" max={10} />
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(35,35,255,.08)", borderRadius: 10, border: "1px solid rgba(35,35,255,.2)" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>Min=1 (disabled state shown at limit) · Max per item · Oswald font for quantity</span>
            </div>
        </div>
    );
}

// ── C12: Amount / Currency Display ────────────────────────────────────────────
function C12() {
    const variants = [
        { label: "Hero", size: 32, weight: 600, desc: "Dashboard cash position, invoice total" },
        { label: "Standard", size: 22, weight: 500, desc: "List item amounts, card values" },
        { label: "Small", size: 15, weight: 400, desc: "Secondary amounts, supporting figures" },
    ];
    const states = [
        { label: "Positive", color: T.ok, amount: "₦ 2,847,500" },
        { label: "Negative", color: T.err, amount: "− ₦ 125,000" },
        { label: "Neutral", color: T.text, amount: "₦ 483,750" },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Size Variants (Oswald only)</div>
                <div style={{ padding: "20px 16px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}`, display: "flex", flexDirection: "column", gap: 14 }}>
                    {variants.map(({ label, size, weight, desc }) => (
                        <div key={label} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${T.el}` }}>
                            <div>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginBottom: 4 }}>{label} · {desc}</div>
                                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: size, fontWeight: weight, color: T.text, lineHeight: 1 }}>₦ 2,847,500</div>
                            </div>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: T.el }}>{size}px / w{weight}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>States</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {states.map(({ label, color, amount }) => (
                        <div key={label} style={{ padding: "16px 14px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}`, textAlign: "center" }}>
                            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, marginBottom: 8 }}>{label}</div>
                            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 500, color }}>{amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── C13: Settings Row ─────────────────────────────────────────────────────────
function C13() {
    const [tog, sT] = useState([true, false, true]);
    const [hov, sH] = useState(null);
    const rows = [
        { icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z", label: "Profile Information", sub: "Name, photo, contact details", trail: "chevron" },
        { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Two-Factor Auth", sub: "Add extra security to your account", trail: "toggle", ti: 0 },
        { icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3", label: "Email Notifications", sub: "Invoice receipts, payment alerts", trail: "toggle", ti: 1 },
        { icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6", label: "Subscription Plan", sub: "Growth · ₦ 5,000/mo", trail: "value", val: "Manage" },
        { icon: "M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6", label: "Delete Account", sub: "Permanently remove your account", trail: "chevron", danger: true },
    ];
    return (
        <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
            {rows.map((r, i) => (
                <div key={i} onMouseEnter={() => sH(i)} onMouseLeave={() => sH(null)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: hov === i ? "#1F2330" : T.surf, borderBottom: i < rows.length - 1 ? `1px solid ${T.el}` : "none", cursor: "pointer", transition: "background .12s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: r.danger ? "rgba(239,68,68,.1)" : T.el, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: r.danger ? T.err : T.muted }}>
                        <Ico d={r.icon} s={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: r.danger ? T.err : T.text }}>{r.label}</div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{r.sub}</div>
                    </div>
                    {r.trail === "chevron" && <span style={{ color: r.danger ? T.err : T.muted, display: "flex" }}><ChevR /></span>}
                    {r.trail === "value" && <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.a400, background: "rgba(35,35,255,.1)", padding: "3px 10px", borderRadius: 80 }}>{r.val}</span>}
                    {r.trail === "toggle" && (
                        <div onClick={(e) => { e.stopPropagation(); sT(v => { const n = [...v]; n[r.ti] = !n[r.ti]; return n; }); }} style={{ width: 44, height: 26, borderRadius: 13, background: tog[r.ti] ? T.action : T.el, position: "relative", transition: "background .2s", flexShrink: 0, cursor: "pointer" }}>
                            <div style={{ position: "absolute", top: 2, left: tog[r.ti] ? "calc(100% - 24px)" : 2, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ── C14: Alert / Info Banner ──────────────────────────────────────────────────
function C14() {
    const [shown, sS] = useState({ 0: true, 1: true, 2: true, 3: true });
    const alerts = [
        { color: "#4C4CFF", bg: "rgba(35,35,255,.1)", icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01", title: "Bank sync scheduled", body: "Your accounts will sync tonight at 2:00 AM. No action needed." },
        { color: T.ok, bg: "rgba(40,173,31,.1)", icon: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3", title: "Payment received", body: "₦ 483,750 from John Doe has been confirmed." },
        { color: T.warn, bg: "rgba(251,146,60,.1)", icon: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", title: "Low stock alert", body: "iPhone 13 Pro Max has only 2 units left." },
        { color: T.err, bg: "rgba(239,68,68,.1)", icon: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01", title: "Invoice overdue", body: "INV-001238 from Sarah Smith is 14 days overdue." },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {alerts.map((a, i) => shown[i] && (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: a.bg, border: `1px solid ${a.color}33`, borderRadius: 12, alignItems: "flex-start" }}>
                    <span style={{ color: a.color, flexShrink: 0, marginTop: 1 }}><Ico d={a.icon} s={18} /></span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, fontWeight: 600, color: T.text }}>{a.title}</div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted, marginTop: 3, lineHeight: 1.4 }}>{a.body}</div>
                    </div>
                    <button onClick={() => sS(p => ({ ...p, [i]: false }))} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", flexShrink: 0, padding: 2 }}><X /></button>
                </div>
            ))}
            {Object.values(shown).every(v => !v) && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <button onClick={() => sS({ 0: true, 1: true, 2: true, 3: true })} style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.a400, background: "rgba(35,35,255,.1)", border: "1px solid rgba(35,35,255,.3)", padding: "8px 16px", borderRadius: 80, cursor: "pointer" }}>Reset banners</button>
                </div>
            )}
        </div>
    );
}

// ── C15: Image Upload / Media Slot ────────────────────────────────────────────
function C15() {
    const [state, sState] = useState("empty");
    const [prog, sP] = useState(0);
    const startUpload = () => {
        sState("uploading"); sP(0);
        let p = 0;
        const iv = setInterval(() => {
            p += 12; sP(Math.min(p, 100));
            if (p >= 100) { clearInterval(iv); setTimeout(() => sState("filled"), 300); }
        }, 150);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Product Image Upload</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: 14, border: `2px dashed ${T.el}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "transparent" }}>
                        <span style={{ color: T.muted }}><Upload /></span>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, textAlign: "center", padding: "0 8px" }}>Tap to upload</span>
                    </div>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>Empty</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div onClick={state !== "uploading" ? startUpload : null} style={{ width: "100%", aspectRatio: "1", borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden", cursor: state === "uploading" ? "default" : "pointer", position: "relative", background: T.surf, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        {state === "uploading" && <>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted }}>{prog}%</span>
                            <div style={{ width: "70%", height: 4, background: T.el, borderRadius: 2 }}>
                                <div style={{ height: "100%", width: `${prog}%`, background: T.action, borderRadius: 2, transition: "width .15s" }} />
                            </div>
                        </>}
                        {state === "filled" && <>
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a2a4a,#2323FF44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ color: "rgba(255,255,255,0.4)" }}><ImgIco /></span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); sState("empty"); }} style={{ position: "absolute", top: 6, right: 6, width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,.6)", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><X /></button>
                        </>}
                        {state === "empty" && <>
                            <span style={{ color: T.a400 }}><Upload /></span>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>Upload</span>
                        </>}
                    </div>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, cursor: "pointer" }} onClick={state === "filled" ? startUpload : undefined}>
                        {state === "empty" ? "Tap →" : state === "uploading" ? "Uploading…" : "Filled (tap to redo)"}
                    </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: 14, border: `2px dashed ${T.el}44`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "transparent", opacity: 0.4 }}>
                        <span style={{ color: T.muted }}><Plus /></span>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted }}>Add more</span>
                    </div>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>Slot 3</span>
                </div>
            </div>
        </div>
    );
}

// ── C16: Radio Button Group ───────────────────────────────────────────────────
function C16() {
    const [plan, sPlan] = useState("growth");
    const [method, sMethod] = useState("bank");
    const plans = [
        { id: "starter", label: "Starter", sub: "Free forever · 100 products · 50 invoices/mo" },
        { id: "growth", label: "Growth", sub: "₦ 5,000/mo · Unlimited + bank sync + analytics", badge: "Popular" },
        { id: "enterprise", label: "Enterprise", sub: "₦ 15,000/mo · Multi-location · 10 users" },
    ];
    const methods = [
        { id: "cash", label: "Cash" },
        { id: "bank", label: "Bank Transfer" },
        { id: "card", label: "Card" },
        { id: "pos", label: "POS Terminal" },
    ];
    const Radio = ({ id, selected, onClick, label, sub, badge }) => (
        <div onClick={() => onClick(id)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", background: selected === id ? "rgba(35,35,255,.08)" : T.surf, borderBottom: `1px solid ${T.el}`, cursor: "pointer", transition: "background .15s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected === id ? T.action : T.el}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "border-color .15s" }}>
                {selected === id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.action }} />}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text, fontWeight: selected === id ? 600 : 400 }}>{label}</span>
                    {badge && <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, fontWeight: 600, color: T.action, background: "rgba(35,35,255,.15)", padding: "1px 8px", borderRadius: 80 }}>{badge}</span>}
                </div>
                {sub && <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 3 }}>{sub}</div>}
            </div>
        </div>
    );
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Subscription Plan Selection</div>
                <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
                    {plans.map(p => <Radio key={p.id} {...p} selected={plan} onClick={sPlan} />)}
                </div>
            </div>
            <div>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Payment Method</div>
                <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${T.el}` }}>
                    {methods.map(m => <Radio key={m.id} {...m} selected={method} onClick={sMethod} />)}
                </div>
            </div>
        </div>
    );
}

// ── C17: Input Field ──────────────────────────────────────────────────────────
function C17() {
    const [vals, sV] = useState({ name: "", amount: "", date: "", cat: "" });
    const [focused, sF] = useState(null);
    const fields = [
        { k: "name",   label: "Client Name",   ph: "e.g. Iya Bisi Stores", type: "text"   },
        { k: "amount", label: "Amount (₦)",     ph: "0",                    type: "number" },
        { k: "date",   label: "Due Date",        ph: "YYYY-MM-DD",           type: "text"   },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Editable Input Field</div>
            {fields.map(f => (
                <div key={f.k}>
                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginBottom: 5 }}>{f.label}</div>
                    <div style={{
                        background: T.surf, borderRadius: 12, height: 48, padding: "0 14px",
                        display: "flex", alignItems: "center",
                        border: `1px solid ${focused === f.k ? T.action : T.el}`,
                        transition: "border-color .15s",
                    }}>
                        <input
                            type={f.type}
                            value={vals[f.k]}
                            placeholder={f.ph}
                            onFocus={() => sF(f.k)}
                            onBlur={() => sF(null)}
                            onChange={e => sV(v => ({ ...v, [f.k]: e.target.value }))}
                            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.text }}
                        />
                    </div>
                </div>
            ))}
            <div style={{ padding: "10px 14px", background: "rgba(35,35,255,.08)", borderRadius: 10, border: "1px solid rgba(35,35,255,.2)" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>Focus highlights border with action/primary · Used in AddInvoice, AddExpense, AddProduct, auth forms</span>
            </div>
        </div>
    );
}

// ── C18: Auth Screen Pattern ──────────────────────────────────────────────────
function C18() {
    const [screen, sS] = useState("splash");
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                {["splash", "signin", "signup"].map(s => (
                    <button key={s} onClick={() => sS(s)} style={{
                        height: 30, padding: "0 12px", borderRadius: 80, border: "none", cursor: "pointer",
                        background: screen === s ? T.action : T.el,
                        color: screen === s ? "#fff" : T.muted,
                        fontFamily: "'Rokkitt',serif", fontSize: 12, fontWeight: 600,
                    }}>{s}</button>
                ))}
            </div>

            {screen === "splash" && (
                <div style={{ background: T.bg, borderRadius: 16, padding: "28px 20px", border: `1px solid ${T.el}`, textAlign: "center" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#2323FF,#4C4CFF)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                        <Ico d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" s={26} color="#fff" />
                    </div>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 28, color: T.text, letterSpacing: 2 }}>NUKODES</div>
                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted, margin: "8px 0 20px" }}>Smart money for Nigerian businesses</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <button style={{ width: "100%", height: 44, borderRadius: 80, background: T.action, border: "none", fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer" }}>Create Account</button>
                        <button style={{ width: "100%", height: 44, borderRadius: 80, background: "transparent", border: `1px solid ${T.el}`, fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.subtle, cursor: "pointer" }}>Sign In</button>
                    </div>
                </div>
            )}

            {screen === "signin" && (
                <div style={{ background: T.bg, borderRadius: 16, padding: "24px 20px", border: `1px solid ${T.el}` }}>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 24, color: T.text, marginBottom: 4 }}>Welcome back</div>
                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted, marginBottom: 20 }}>Sign in to your Nukodes account</div>
                    {["Email address", "Password"].map(l => (
                        <div key={l} style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginBottom: 4 }}>{l}</div>
                            <div style={{ background: T.surf, border: `1px solid ${T.el}`, borderRadius: 12, height: 46, padding: "0 14px", display: "flex", alignItems: "center" }}>
                                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.muted }}>{l === "Password" ? "••••••••" : "you@company.com"}</span>
                            </div>
                        </div>
                    ))}
                    <button style={{ width: "100%", height: 46, borderRadius: 80, marginTop: 8, background: T.action, border: "none", fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer" }}>Sign In</button>
                </div>
            )}

            {screen === "signup" && (
                <div style={{ background: T.bg, borderRadius: 16, padding: "24px 20px", border: `1px solid ${T.el}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 20 }}>
                        <div style={{ height: 3, borderRadius: 3, background: T.action }} />
                        <div style={{ height: 3, borderRadius: 3, background: T.el }} />
                    </div>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: 24, color: T.text, marginBottom: 4 }}>Create account</div>
                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted, marginBottom: 20 }}>Step 1 of 2 — Personal details</div>
                    {["Full Name", "Email address", "Password"].map(l => (
                        <div key={l} style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginBottom: 4 }}>{l}</div>
                            <div style={{ background: T.surf, border: `1px solid ${T.el}`, borderRadius: 12, height: 46, padding: "0 14px", display: "flex", alignItems: "center" }}>
                                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.muted }}>{l === "Password" ? "Min 6 characters" : `e.g. ${l === "Full Name" ? "Haruna Musa" : "you@co.com"}`}</span>
                            </div>
                        </div>
                    ))}
                    <button style={{ width: "100%", height: 46, borderRadius: 80, marginTop: 8, background: T.action, border: "none", fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer" }}>Continue</button>
                </div>
            )}
        </div>
    );
}

// ── C19: Subscription Plan Cards ─────────────────────────────────────────────
function C19() {
    const [selected, sS] = useState("growth");
    const plans = [
        {
            id: "starter", name: "Starter", price: "Free", period: "forever",
            color: "#28AD1F", features: ["100 products", "50 invoices/mo", "Expenses & customers", "1 user"],
            locked: [],
        },
        {
            id: "growth", name: "Growth", price: "₦ 5,000", period: "/month", badge: "Popular",
            color: "#2323FF", features: ["Unlimited products & invoices", "POS Terminal", "Bank Sync (Mono)", "FlexPay", "3 users"],
            locked: [],
        },
        {
            id: "enterprise", name: "Enterprise", price: "₦ 15,000", period: "/month",
            color: "#FB923C", features: ["Everything in Growth", "AI Insights", "10 users", "Manufacturing/BOM", "Vendor Portal"],
            locked: [],
        },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Plan Selection — tap to select</div>
            {plans.map(p => {
                const active = selected === p.id;
                return (
                    <div
                        key={p.id}
                        onClick={() => sS(p.id)}
                        style={{
                            background: active ? `${p.color}0D` : T.surf,
                            border: `1.5px solid ${active ? p.color : T.el}`,
                            borderRadius: 16, padding: "14px 16px", cursor: "pointer",
                            transition: "all .15s",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Ico d={p.id === "starter" ? "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" : p.id === "growth" ? "M13 2L3 14h9l-1 8 10-12h-9l1-8z" : "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"} s={18} color={p.color} />
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 15, color: T.text }}>{p.name}</span>
                                        {p.badge && <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, fontWeight: 700, color: p.color, background: `${p.color}18`, padding: "1px 8px", borderRadius: 80 }}>{p.badge}</span>}
                                    </div>
                                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 600, color: active ? p.color : T.text, marginTop: 2 }}>
                                        {p.price} <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted }}>{p.period}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${active ? p.color : T.el}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {active && <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {p.features.map(f => (
                                <div key={f} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Ico d="M20 6L9 17l-5-5" s={11} color={p.color} stroke={2.5} />
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── C20: Service Card (locked / unlocked states) ──────────────────────────────
function C20() {
    const [showUpgrade, sU] = useState(false);
    const services = [
        { icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6", label: "Invoicing",     sub: "Create & send invoices",  locked: false, plan: "Starter" },
        { icon: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",                      label: "Expenses",     sub: "Track spending",          locked: false, plan: "Starter" },
        { icon: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0",           label: "Point of Sale", sub: "In-store sales",         locked: true,  plan: "Growth"  },
        { icon: "M22 12h-4l-3 9L9 3l-3 9H2",                                                              label: "AI Insights",  sub: "Smart analytics",        locked: true,  plan: "Enterprise" },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Service Card States</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {services.map(s => (
                    <div
                        key={s.label}
                        onClick={() => s.locked && sU(true)}
                        style={{
                            background: s.locked ? T.bg : T.surf,
                            border: `1px solid ${T.el}`,
                            borderRadius: 16, padding: 14, cursor: "pointer",
                            position: "relative", opacity: s.locked ? 0.7 : 1,
                        }}
                    >
                        {s.locked && (
                            <div style={{ position: "absolute", top: 10, right: 10 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, background: T.el, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Ico d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4" s={12} color={T.muted} />
                                </div>
                            </div>
                        )}
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: s.locked ? T.el : "#2323FF18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                            <Ico d={s.icon} s={18} color={s.locked ? T.muted : "#4C4CFF"} />
                        </div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 13, color: s.locked ? T.muted : T.text }}>{s.label}</div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, marginTop: 2 }}>{s.sub}</div>
                        <div style={{ marginTop: 6 }}>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, fontWeight: 600, color: s.plan === "Starter" ? "#26CC5A" : s.plan === "Growth" ? "#4C4CFF" : "#FB923C", background: s.plan === "Starter" ? "rgba(40,173,31,.12)" : s.plan === "Growth" ? "rgba(35,35,255,.12)" : "rgba(251,146,60,.12)", padding: "2px 7px", borderRadius: 80 }}>
                                {s.plan}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {showUpgrade && (
                <div style={{ background: "rgba(35,35,255,.08)", border: "1px solid rgba(35,35,255,.25)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <Ico d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" s={20} color="#4C4CFF" />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 14, color: T.text }}>Upgrade to Growth</div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted }}>₦5,000/mo · Unlocks POS, Bank Sync, FlexPay & more</div>
                    </div>
                    <button onClick={() => sU(false)} style={{ height: 32, padding: "0 12px", borderRadius: 80, background: "#2323FF", border: "none", fontFamily: "'Rokkitt',serif", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>Upgrade</button>
                </div>
            )}
            <div style={{ padding: "10px 14px", background: "rgba(35,35,255,.08)", borderRadius: 10, border: "1px solid rgba(35,35,255,.2)" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>Locked cards show lock badge + dim state. Tap locked → upgrade prompt appears.</span>
            </div>
        </div>
    );
}

// ── C21: Business Switcher Sheet ──────────────────────────────────────────────
function C21() {
    const [open, sO] = useState(false);
    const [active, sA] = useState("NB-00001");
    const businesses = [
        { id: "NB-00001", name: "Nukoder Business 1", type: "Retail",   plan: "Starter",    color: "#2323FF" },
        { id: "NB-00002", name: "Nukoder Business 2", type: "Services", plan: "Growth",     color: "#28AD1F" },
        { id: "NB-00003", name: "Test Store",          type: "Commerce", plan: "Enterprise", color: "#FB923C" },
    ];
    return (
        <div>
            <button onClick={() => sO(true)} style={{
                width: "100%", height: 46, borderRadius: 12, border: "none",
                background: T.action, color: "#fff", fontFamily: "'Rokkitt',serif",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
                <Ico d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" s={16} color="#fff" />
                {businesses.find(b => b.id === active)?.name} ▾
            </button>

            {open && (
                <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                    <div onClick={() => sO(false)} style={{ position: "absolute", inset: 0, background: "rgba(10,10,12,.75)", backdropFilter: "blur(4px)" }} />
                    <div style={{ position: "relative", width: "100%", maxWidth: 480, background: T.surf, borderRadius: "20px 20px 0 0", zIndex: 1, paddingBottom: 28 }}>
                        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
                            <div style={{ width: 40, height: 4, borderRadius: 2, background: T.el }} />
                        </div>
                        <div style={{ padding: "8px 20px 14px", borderBottom: `1px solid ${T.el}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 16, color: T.text }}>My Businesses</span>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.a400, background: "rgba(35,35,255,.12)", padding: "3px 10px", borderRadius: 80 }}>{businesses.length} workspaces</span>
                        </div>
                        {businesses.map((b, i) => {
                            const isActive = b.id === active;
                            return (
                                <div key={b.id} onClick={() => { sA(b.id); sO(false); }} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 20px", background: isActive ? `${b.color}0D` : "transparent", borderBottom: i < businesses.length - 1 ? `1px solid ${T.el}` : "none", cursor: "pointer" }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${b.color}22`, border: `1px solid ${b.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 14, color: b.color }}>{b.name.split(" ").map(w => w[0]).join("").slice(0,2)}</span>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 14, color: T.text }}>{b.name}</div>
                                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>{b.type} · {b.plan}</div>
                                    </div>
                                    {isActive ? (
                                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, fontWeight: 700, color: b.color, background: `${b.color}1A`, padding: "3px 10px", borderRadius: 80 }}>Active</span>
                                    ) : (
                                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, background: T.el, padding: "3px 10px", borderRadius: 80 }}>Switch</span>
                                    )}
                                </div>
                            );
                        })}
                        <div style={{ padding: "12px 16px 0" }}>
                            <button onClick={() => sO(false)} style={{ width: "100%", height: 46, borderRadius: 80, background: "transparent", border: `1px solid ${T.el}`, fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.subtle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Plus /> Add New Business
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── C22: POS Keypad ───────────────────────────────────────────────────────────
function C22() {
    const [amt, sA] = useState("0");
    const [charged, sC] = useState(false);
    const append = d => sA(a => a === "0" ? d : a + d);
    const del = () => sA(a => a.length > 1 ? a.slice(0, -1) : "0");
    const charge = () => { sC(true); setTimeout(() => { sC(false); sA("0"); }, 1200); };
    const fmt = v => "₦ " + Number(v).toLocaleString("en-NG");
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "linear-gradient(135deg,#060919,#0d1140)", borderRadius: 16, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(35,35,255,.2)" }}>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>AMOUNT</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 32, color: T.text }}>{fmt(amt)}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                {[500,1000,5000,10000].map(q => (
                    <button key={q} onClick={() => sA(a => String((parseFloat(a)||0) + q))} style={{ flex: 1, height: 32, background: T.surf, border: `1px solid ${T.el}`, borderRadius: 80, fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.a400, cursor: "pointer" }}>+{q >= 1000 ? `${q/1000}k` : q}</button>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {["1","2","3","4","5","6","7","8","9","C","0","⌫"].map(k => (
                    <button key={k} onClick={() => k === "C" ? sA("0") : k === "⌫" ? del() : append(k)} style={{ height: 52, borderRadius: 12, border: `1px solid ${T.el}`, background: k === "C" ? "rgba(239,68,68,.12)" : T.surf, fontFamily: k === "⌫" ? "inherit" : "'Oswald',sans-serif", fontSize: 18, fontWeight: 600, color: k === "C" ? T.err : T.text, cursor: "pointer" }}>{k}</button>
                ))}
            </div>
            <button onClick={charge} style={{ width: "100%", height: 48, borderRadius: 80, background: charged ? "#28AD1F" : T.action, border: "none", fontFamily: "'Rokkitt',serif", fontWeight: 700, fontSize: 15, color: "#fff", cursor: "pointer", transition: "background .2s" }}>
                {charged ? "✓ Charged!" : `Charge ${fmt(parseFloat(amt)||0)}`}
            </button>
        </div>
    );
}

// ── C23: Theme Tokens (Dark / Light) ──────────────────────────────────────────
function C23() {
    const [mode, sM] = useState("dark");
    const T_DARK_TOK = {
        bg: "#0A0A0C", surf: "#1A1D24", el: "#2D303B", text: "#FFFFFF",
        muted: "#9B9FAF", action: "#2323FF", ok: "#26CC5A", err: "#EF4444", warn: "#FB923C",
    };
    const T_LIGHT_TOK = {
        bg: "#F4F5F9", surf: "#FFFFFF", el: "#DDE0EA", text: "#0D0F18",
        muted: "#5A5F7A", action: "#2323FF", ok: "#16A34A", err: "#DC2626", warn: "#D97706",
    };
    const tok = mode === "dark" ? T_DARK_TOK : T_LIGHT_TOK;
    const tokens = Object.entries(tok);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Toggle */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {["dark", "light"].map(m => (
                    <button key={m} onClick={() => sM(m)} style={{
                        height: 30, padding: "0 14px", borderRadius: 80, border: "none", cursor: "pointer",
                        background: mode === m ? T.action : T.el,
                        color: mode === m ? "#fff" : T.muted,
                        fontFamily: "'Rokkitt',serif", fontSize: 12, fontWeight: 600,
                        textTransform: "capitalize",
                    }}>{m === "dark" ? "🌙 Dark" : "☀️ Light"}</button>
                ))}
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, marginLeft: 8 }}>
                    All text tokens ≥ 4.5:1 contrast (WCAG AA)
                </span>
            </div>
            {/* Token swatches */}
            <div style={{ background: tok.bg, borderRadius: 14, padding: 16, border: `1px solid ${tok.el}` }}>
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: tok.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                    {mode === "dark" ? "T_DARK" : "T_LIGHT"} Tokens
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {tokens.map(([key, val]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, background: val, border: `1px solid ${tok.el}`, flexShrink: 0 }} />
                            <div>
                                <div style={{ fontFamily: "monospace", fontSize: 10, color: tok.muted }}>T.{key}</div>
                                <div style={{ fontFamily: "monospace", fontSize: 10, color: tok.text }}>{val}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(35,35,255,.08)", borderRadius: 10, border: "1px solid rgba(35,35,255,.2)" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>
                    isDark prop threads through sharedProps → components derive TT = isDark ? T_DARK : T_LIGHT
                </span>
            </div>
        </div>
    );
}

// ── C24: Cash Flow Chart ───────────────────────────────────────────────────────
function C24() {
    const [view, sV] = useState("income");
    const data = [
        { m: "Oct", inc: 380000, exp: 245000 },
        { m: "Nov", inc: 420000, exp: 280000 },
        { m: "Dec", inc: 650000, exp: 320000 },
        { m: "Jan", inc: 290000, exp: 195000 },
        { m: "Feb", inc: 510000, exp: 310000 },
        { m: "Mar", inc: 450000, exp: 165000 },
    ];
    const maxVal = Math.max(...data.map(d => Math.max(d.inc, d.exp)));
    const BAR_H = 80;
    const barColors = { income: "#2323FF", expenses: "#EF4444", profit: "#26CC5A" };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                {["income","expenses","profit"].map(v => (
                    <button key={v} onClick={() => sV(v)} style={{
                        height: 26, padding: "0 10px", borderRadius: 80, border: "none",
                        background: view === v ? barColors[v] : T.el,
                        color: view === v ? "#fff" : T.muted,
                        fontFamily: "'Rokkitt',serif", fontSize: 11, fontWeight: 600,
                        cursor: "pointer", textTransform: "capitalize",
                    }}>{v}</button>
                ))}
            </div>
            <div style={{ background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, padding: "16px 12px 12px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: BAR_H + 20, marginBottom: 8 }}>
                    {data.map(d => {
                        const inc  = Math.max(4, Math.round((d.inc / maxVal) * BAR_H));
                        const exp  = Math.max(4, Math.round((d.exp / maxVal) * BAR_H));
                        const prof = Math.max(4, Math.round(((d.inc - d.exp) / maxVal) * BAR_H));
                        const h    = view === "income" ? inc : view === "expenses" ? exp : prof;
                        return (
                            <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                <div style={{ display: "flex", alignItems: "flex-end", height: BAR_H }}>
                                    <div style={{ width: "100%", height: h, background: barColors[view], borderRadius: "4px 4px 0 0" }} />
                                </div>
                                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: T.muted }}>{d.m}</span>
                            </div>
                        );
                    })}
                </div>
                <div style={{ paddingTop: 10, borderTop: `1px solid ${T.el}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10 }}>
                        {[["Income","#2323FF"],["Expenses","#EF4444"],["Profit","#26CC5A"]].map(([l,c]) => (
                            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: T.muted }}>{l}</span>
                            </div>
                        ))}
                    </div>
                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.a400 }}>6-month view</span>
                </div>
            </div>
            <div style={{ padding: "10px 14px", background: "rgba(35,35,255,.08)", borderRadius: 10, border: "1px solid rgba(35,35,255,.2)" }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400 }}>
                    Inline SVG bar chart · No external deps · Used in Dashboard cash flow widget
                </span>
            </div>
        </div>
    );
}

const COMPS = [
    { id: "01", name: "List Item / Row", used: "Products · Invoices · Customers · Team", demo: <C1 /> },
    { id: "02", name: "Status Badge", used: "Invoices · Stock · Orders · FlexPay", demo: <C2 /> },
    { id: "03", name: "Filter Tab Bar", used: "All list screens", demo: <C3 /> },
    { id: "04", name: "Dropdown / Select", used: "All form screens", demo: <C4 /> },
    { id: "05", name: "Bottom Sheet", used: "FAB · Pickers · Confirmations", demo: <C5 /> },
    { id: "06", name: "Empty State", used: "Every list screen · Offline", demo: <C6 /> },
    { id: "07", name: "Switch / Toggle", used: "Add Product · Expenses · Team", demo: <C7 /> },
    { id: "08", name: "Section Header", used: "All forms · Grouped lists", demo: <C8 /> },
    { id: "09", name: "New Icons", used: "12 Phase 3 additions to Fluent set", demo: <C9 /> },
    { id: "10", name: "Avatar / Initials", used: "Team · Customers · Profile", demo: <C10 /> },
    { id: "11", name: "Stepper / Quantity", used: "Invoice · POS · Add Product", demo: <C11 /> },
    { id: "12", name: "Amount / Currency", used: "Dashboard · Invoices · Wallet", demo: <C12 /> },
    { id: "13", name: "Settings Row", used: "Account · Profile · Permissions", demo: <C13 /> },
    { id: "14", name: "Alert / Banner", used: "Low stock · Payment · Errors", demo: <C14 /> },
    { id: "15", name: "Image Upload", used: "Add Product · Receipt Scanner", demo: <C15 /> },
    { id: "16", name: "Radio Button Group",       used: "Plan selection · Payment method",      demo: <C16 /> },
    { id: "17", name: "Input Field",              used: "AddInvoice · AddExpense · Auth forms",  demo: <C17 /> },
    { id: "18", name: "Auth Screen Pattern",       used: "Splash · Sign In · Sign Up",           demo: <C18 /> },
    { id: "19", name: "Subscription Plan Cards",   used: "Plan selection · Upgrade flow",        demo: <C19 /> },
    { id: "20", name: "Service Card",              used: "Services screen · Locked/unlocked",    demo: <C20 /> },
    { id: "21", name: "Business Switcher Sheet",   used: "Dashboard · Header business pill",     demo: <C21 /> },
    { id: "22", name: "POS Keypad",                used: "POSTerminal screen",                   demo: <C22 /> },
    { id: "23", name: "Theme Tokens",              used: "Dark + Light mode · WCAG AA verified",  demo: <C23 /> },
    { id: "24", name: "Cash Flow Chart",           used: "Dashboard · Reports overview",          demo: <C24 /> },
];

export default function App() {
    const [active, sA] = useState(0);
    const cur = COMPS[active];
    return <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rokkitt:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#2D303B;border-radius:4px;}`}</style>
        <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Rokkitt',serif", overflow: "hidden" }}>

            {/* Sidebar */}
            <div style={{ width: 210, background: T.surf, borderRight: `1px solid ${T.el}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
                <div style={{ padding: "16px 14px 12px", borderBottom: `1px solid ${T.el}` }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: T.action, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>Nukoder DS · Phase 3</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Component Ref</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>24 components · Dark + Light · WCAG AA</div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 6 }}>
                    {COMPS.map((c, i) => <button key={c.id} onClick={() => sA(i)} style={{ width: "100%", padding: "9px 10px", borderRadius: 10, border: "none", background: active === i ? "rgba(35,35,255,.15)" : "transparent", cursor: "pointer", textAlign: "left", marginBottom: 2, transition: "background .15s" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: active === i ? T.action : T.el, fontWeight: 700 }}>{c.id}</span>
                            <span style={{ fontSize: 12, fontWeight: active === i ? 700 : 400, color: active === i ? T.a400 : T.text, lineHeight: 1.3 }}>{c.name}</span>
                        </div>
                        <div style={{ fontSize: 10, color: T.muted, marginTop: 2, paddingLeft: 20 }}>{c.used}</div>
                    </button>)}
                </div>
                <div style={{ padding: "10px 14px", borderTop: `1px solid ${T.el}` }}>
                    <div style={{ fontSize: 10, color: T.muted }}>Dark · Rokkitt + Oswald · DS tokens</div>
                </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
                <div style={{ maxWidth: 560, margin: "0 auto" }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 13, color: T.action, fontWeight: 700 }}>{cur.id}</span>
                            <h1 style={{ fontFamily: "'Rokkitt',serif", fontSize: 22, fontWeight: 700, color: T.text }}>{cur.name}</h1>
                        </div>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.a400, background: "rgba(35,35,255,.1)", border: "1px solid rgba(35,35,255,.25)", padding: "3px 10px", borderRadius: 80 }}>Used on: {cur.used}</span>
                    </div>

                    <div style={{ background: T.surf, borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                        <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${T.el}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, fontWeight: 600, color: T.text }}>Visual Preview</span>
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, background: T.el, padding: "2px 8px", borderRadius: 80 }}>Hover / tap to interact</span>
                        </div>
                        <div style={{ padding: 16 }}>{cur.demo}</div>
                    </div>

                    <div style={{ marginTop: 14, padding: "12px 14px", background: T.surf, borderRadius: 12, border: `1px solid ${T.el}`, borderLeft: `3px solid ${T.action}` }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.action, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>DS Tokens</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {[["surf/default", "#1A1D24"], ["surf/elevated", "#2D303B"], ["action/primary", "#2323FF"], ["text/primary", "#FFFFFF"], ["secondary/200", "#9B9FAF"]].map(([n, h]) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 5, background: T.el, padding: "3px 8px", borderRadius: 6 }}>
                                <div style={{ width: 9, height: 9, borderRadius: 2, background: h, border: "1px solid rgba(255,255,255,.1)", flexShrink: 0 }} />
                                <span style={{ fontFamily: "monospace", fontSize: 10, color: T.subtle }}>{n}</span>
                                <span style={{ fontFamily: "monospace", fontSize: 10, color: T.muted }}>{h}</span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
