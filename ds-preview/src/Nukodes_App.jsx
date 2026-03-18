/**
 * Nukodes_App — App Screens
 * 5 screens: Dashboard · Products · Invoices · Customers · Settings
 * Mobile-first layout · Dark / Light theme toggle
 */
import { useState } from "react";
import { ThemeProvider, useTheme, Ico, Badge, Av, PATHS } from "./Nukoder_DS";

// ─────────────────────── DATA ────────────────────────────────────────────────
const products = [
    { id: "P001", name: "iPhone 13 Pro Max", sku: "IP13-PM-001", price: "₦ 450,000", badge: "In Stock", stock: 12 },
    { id: "P002", name: "Samsung A54", sku: "SA54-128-BK", price: "₦ 185,000", badge: "Low Stock", stock: 2 },
    { id: "P003", name: "USB-C Cable 2m", sku: "USBC-2M-WH", price: "₦ 8,500", badge: "In Stock", stock: 48 },
    { id: "P004", name: "AirPods Pro (2nd)", sku: "APP2-WHT-001", price: "₦ 195,000", badge: "Out of Stock", stock: 0 },
    { id: "P005", name: "Xiaomi Redmi 12", sku: "XR12-BLU-006", price: "₦ 145,000", badge: "In Stock", stock: 7 },
];
const invoices = [
    { id: "INV-001245", name: "John Doe", date: "Today", amt: "₦ 483,750", badge: "Sent" },
    { id: "INV-001244", name: "Amara Praise", date: "Today", amt: "₦ 125,000", badge: "Paid" },
    { id: "INV-001243", name: "Sarah Smith", date: "Yesterday", amt: "₦ 285,000", badge: "Overdue" },
    { id: "INV-001242", name: "Kofi Akpor", date: "Yesterday", amt: "₦ 67,500", badge: "Draft" },
    { id: "INV-001241", name: "Emeka Obi", date: "Yesterday", amt: "₦ 920,000", badge: "Paid" },
];
const customers = [
    { name: "John Doe", phone: "0803 123 4567", location: "Lagos", lifetime: "₦ 5,250,000" },
    { name: "Sarah Smith", phone: "0806 987 6543", location: "Abuja", lifetime: "₦ 1,830,000" },
    { name: "Amara Praise", phone: "0701 555 0123", location: "Port Harcourt", lifetime: "₦ 920,000" },
    { name: "Kofi Akpor", phone: "0812 234 5678", location: "Kano", lifetime: "₦ 340,500" },
    { name: "Emeka Obi", phone: "0809 456 7890", location: "Lagos", lifetime: "₦ 2,140,000" },
];
const activity = [
    { type: "invoice", name: "John Doe", desc: "INV-001245 · Sent", amt: "+ ₦ 483,750", pos: true },
    { type: "expense", name: "ABC Suppliers", desc: "Inventory purchase", amt: "− ₦ 125,000", pos: false },
    { type: "invoice", name: "Amara Praise", desc: "INV-001244 · Paid", amt: "+ ₦ 125,000", pos: true },
    { type: "expense", name: "Utility Bill", desc: "PHCN · Jan 2026", amt: "− ₦ 28,500", pos: false },
    { type: "invoice", name: "Kofi Akpor", desc: "INV-001240 · Partial", amt: "+ ₦ 40,000", pos: true },
];

// ─────────────────────── SHARED SMALL COMPONENTS ─────────────────────────────
function ScreenHeader({ title, right, T }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 18px 12px", position: "sticky", top: 0, zIndex: 10,
            background: T.bg, borderBottom: `1px solid ${T.el}`
        }}>
            <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 600, color: T.text, letterSpacing: "0.02em" }}>{title}</h1>
            {right}
        </div>
    );
}
function FilterTabs({ tabs, active, onSelect, T }) {
    return (
        <div style={{ display: "flex", gap: 4, padding: "10px 18px 0", overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map((t, i) => (
                <button key={t} onClick={() => onSelect(i)} style={{
                    height: 32, padding: "0 13px", borderRadius: 80, border: "none",
                    cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s",
                    background: active === i ? T.action : "transparent",
                    color: active === i ? "#fff" : T.muted,
                    fontFamily: "'Rokkitt',serif", fontSize: 13, fontWeight: active === i ? 600 : 400,
                }}>{t}</button>
            ))}
        </div>
    );
}

// ─────────────────────── SCREEN 1: DASHBOARD ─────────────────────────────────
function Dashboard() {
    const { T } = useTheme();
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "20px 18px 8px", background: T.bg }}>
                <div style={{ fontSize: 12, color: T.muted, fontFamily: "'Rokkitt',serif" }}>Sun, 8 Mar 2026</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 600, color: T.text, marginTop: 2 }}>Good morning, Adedayo 👋</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 18px 100px" }}>

                {/* Cash position */}
                <div style={{
                    background: `linear-gradient(135deg, #1a1aff22, ${T.surf})`,
                    border: `1px solid ${T.el}`, borderRadius: 18, padding: "20px 20px 18px", marginBottom: 14
                }}>
                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginBottom: 6 }}>Current Cash Position</div>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 34, fontWeight: 600, color: T.text, letterSpacing: "-0.02em" }}>₦ 2,847,500</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: "#28AD1F", background: "rgba(40,173,31,.12)", padding: "2px 10px", borderRadius: 80 }}>▲ 8.4% vs last week</span>
                    </div>
                </div>

                {/* Stat tiles */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
                    {[
                        { label: "Revenue", amt: "₦ 4.2M", sub: "This month", c: T.ok },
                        { label: "Outstanding", amt: "₦ 854K", sub: "3 invoices", c: "#FB923C" },
                        { label: "Expenses", amt: "₦ 1.1M", sub: "This month", c: T.err },
                    ].map(({ label, amt, sub, c }) => (
                        <div key={label} style={{
                            background: T.surf, border: `1px solid ${T.el}`,
                            borderRadius: 14, padding: "14px 12px"
                        }}>
                            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, marginBottom: 6 }}>{label}</div>
                            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 600, color: c }}>{amt}</div>
                            <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, marginTop: 3 }}>{sub}</div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Recent Activity</div>
                <div style={{ borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                    {activity.map((a, i) => (
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                            background: T.surf, borderBottom: i < activity.length - 1 ? `1px solid ${T.el}` : "none"
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                                background: a.type === "invoice" ? "rgba(35,35,255,.1)" : "rgba(239,68,68,.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: a.type === "invoice" ? "#4C4CFF" : "#EF4444"
                            }}>
                                <Ico d={a.type === "invoice" ? PATHS.receipt : PATHS.wallet} s={19} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 1 }}>{a.desc}</div>
                            </div>
                            <div style={{
                                fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 500,
                                color: a.pos ? T.ok : T.err, flexShrink: 0
                            }}>{a.amt}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────── SCREEN 2: PRODUCTS ──────────────────────────────────
function Products() {
    const { T } = useTheme();
    const tabs = ["All", "In Stock", "Low Stock", "Out of Stock"];
    const [tab, setTab] = useState(0);
    const filtered = tab === 0 ? products : products.filter(p => p.badge === tabs[tab]);
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <ScreenHeader title="Products" T={T}
                right={
                    <div style={{ display: "flex", gap: 8 }}>
                        <button style={{
                            width: 36, height: 36, borderRadius: 10, border: `1px solid ${T.el}`,
                            background: T.surf, color: T.muted, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                        }}>
                            <Ico d={PATHS.search} s={17} />
                        </button>
                        <button style={{
                            height: 36, padding: "0 14px", borderRadius: 10, border: "none",
                            background: T.action, color: "#fff", fontFamily: "'Rokkitt',serif", fontSize: 13,
                            fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
                        }}>
                            <Ico d={PATHS.plus} s={15} stroke={2.5} color="#fff" />+ Add
                        </button>
                    </div>
                }
            />
            <FilterTabs tabs={tabs} active={tab} onSelect={setTab} T={T} />
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px 100px" }}>
                {filtered.length === 0
                    ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "48px 0", color: T.muted }}>
                        <Ico d={PATHS.tag} s={40} />
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.muted }}>No products in this category</div>
                    </div>
                    : <div style={{ borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                        {filtered.map((p, i) => (
                            <div key={p.id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
                                background: T.surf, borderBottom: i < filtered.length - 1 ? `1px solid ${T.el}` : "none",
                                cursor: "pointer"
                            }}>
                                <div style={{
                                    width: 42, height: 42, borderRadius: 11, background: T.el,
                                    display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, flexShrink: 0
                                }}>
                                    <Ico d={PATHS.tag} s={20} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text,
                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                    }}>{p.name}</div>
                                    <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>
                                        {p.sku} · {p.stock} units
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                                    <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 500, color: T.text }}>{p.price}</div>
                                    <Badge label={p.badge} T={T} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

// ─────────────────────── SCREEN 3: INVOICES ──────────────────────────────────
function Invoices() {
    const { T } = useTheme();
    const tabs = ["All", "Draft", "Sent", "Paid", "Overdue"];
    const [tab, setTab] = useState(0);
    const filtered = tab === 0 ? invoices : invoices.filter(inv => inv.badge === tabs[tab]);
    const groups = ["Today", "Yesterday"];
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <ScreenHeader title="Invoices" T={T}
                right={
                    <button style={{
                        height: 36, padding: "0 14px", borderRadius: 10, border: "none",
                        background: T.action, color: "#fff", fontFamily: "'Rokkitt',serif", fontSize: 13,
                        fontWeight: 600, cursor: "pointer"
                    }}>+ New</button>
                }
            />
            <FilterTabs tabs={tabs} active={tab} onSelect={setTab} T={T} />
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 0 100px" }}>
                {filtered.length === 0
                    ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "48px 0", color: T.muted }}>
                        <Ico d={PATHS.receipt} s={40} />
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.muted }}>No invoices here</div>
                    </div>
                    : groups.map(grp => {
                        const groupItems = filtered.filter(inv => inv.date === grp);
                        if (!groupItems.length) return null;
                        return (
                            <div key={grp}>
                                <div style={{ padding: "8px 18px 5px", display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{grp}</span>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>{groupItems.length}</span>
                                </div>
                                <div style={{ margin: "0 18px", borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                                    {groupItems.map((inv, i) => (
                                        <div key={inv.id} style={{
                                            display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
                                            background: T.surf, borderBottom: i < groupItems.length - 1 ? `1px solid ${T.el}` : "none", cursor: "pointer"
                                        }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, color: T.text }}>{inv.id}</div>
                                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{inv.name}</div>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                                                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 500, color: T.text }}>{inv.amt}</div>
                                                <Badge label={inv.badge} T={T} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

// ─────────────────────── SCREEN 4: CUSTOMERS ─────────────────────────────────
function Customers() {
    const { T } = useTheme();
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <ScreenHeader title="Customers" T={T}
                right={
                    <button style={{
                        height: 36, padding: "0 14px", borderRadius: 10, border: "none",
                        background: T.action, color: "#fff", fontFamily: "'Rokkitt',serif", fontSize: 13,
                        fontWeight: 600, cursor: "pointer"
                    }}>+ Add</button>
                }
            />
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px 100px" }}>
                <div style={{ borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                    {customers.map((c, i) => (
                        <div key={c.name} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
                            background: T.surf, borderBottom: i < customers.length - 1 ? `1px solid ${T.el}` : "none",
                            cursor: "pointer"
                        }}>
                            <Av name={c.name} size={42} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: T.text }}>{c.name}</div>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>
                                    {c.phone} · {c.location}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
                                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 500, color: T.text }}>{c.lifetime}</div>
                                <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted }}>lifetime</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────── SCREEN 5: SETTINGS ──────────────────────────────────
function Settings() {
    const { T, dark, toggle } = useTheme();
    const [twoFA, setTwoFA] = useState(true);
    const [notif, setNotif] = useState(true);
    const sections = [
        {
            title: "Account",
            rows: [
                { icon: PATHS.user, label: "Business Information", sub: "Name, address, tax ID", trail: "chevron" },
                { icon: PATHS.people, label: "Team Members", sub: "3 active users", trail: "chevron" },
                { icon: PATHS.dollar, label: "Payment Methods", sub: "3 methods linked", trail: "chevron" },
            ],
        },
        {
            title: "Security",
            rows: [
                { icon: PATHS.shield, label: "Two-Factor Auth", sub: "Extra login security", trail: "toggle", val: twoFA, set: setTwoFA },
                { icon: PATHS.mail, label: "Notifications", sub: "Invoice receipts, alerts", trail: "toggle", val: notif, set: setNotif },
            ],
        },
        {
            title: "App",
            rows: [
                { icon: dark ? PATHS.moon : PATHS.sun, label: "Appearance", sub: dark ? "Dark mode" : "Light mode", trail: "toggle", val: dark, set: toggle },
                { icon: PATHS.dollar, label: "Subscription · Growth", sub: "₦ 5,000/mo · Renews Mar 15", trail: "value", badgeText: "Manage" },
            ],
        },
        {
            title: "Danger",
            rows: [
                { icon: PATHS.trash, label: "Delete Account", sub: "Permanently remove account", trail: "chevron", danger: true },
            ],
        },
    ];
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <ScreenHeader title="Settings" T={T} />
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px 100px" }}>
                {/* Profile card */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "16px",
                    background: T.surf, border: `1px solid ${T.el}`, borderRadius: 16, marginBottom: 18
                }}>
                    <Av name="Adedayo Olaode" size={52} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 17, fontWeight: 700, color: T.text }}>Adedayo Olaode</div>
                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.muted, marginTop: 2 }}>adedayo@nukoder.com</div>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: 4, marginTop: 5,
                            background: "rgba(35,35,255,.12)", color: "#4C4CFF", padding: "2px 10px",
                            borderRadius: 80, fontSize: 11, fontFamily: "'Rokkitt',serif", fontWeight: 600
                        }}>Growth Plan</span>
                    </div>
                </div>

                {sections.map(sec => (
                    <div key={sec.title} style={{ marginBottom: 18 }}>
                        <div style={{
                            fontFamily: "'Rokkitt',serif", fontSize: 11, color: T.muted,
                            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 2
                        }}>{sec.title}</div>
                        <div style={{ borderRadius: 14, border: `1px solid ${T.el}`, overflow: "hidden" }}>
                            {sec.rows.map((r, i) => (
                                <div key={r.label} onClick={r.trail === "toggle" ? () => r.set(v => !v) : undefined}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
                                        background: T.surf, borderBottom: i < sec.rows.length - 1 ? `1px solid ${T.el}` : "none",
                                        cursor: "pointer", transition: "opacity .15s"
                                    }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                                        background: r.danger ? "rgba(239,68,68,.1)" : T.el,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: r.danger ? "#EF4444" : T.muted
                                    }}>
                                        <Ico d={r.icon} s={18} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontFamily: "'Rokkitt',serif", fontSize: 15,
                                            color: r.danger ? "#EF4444" : T.text
                                        }}>{r.label}</div>
                                        <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 12, color: T.muted, marginTop: 2 }}>{r.sub}</div>
                                    </div>
                                    {r.trail === "chevron" && <span style={{ color: r.danger ? "#EF4444" : T.muted, display: "flex" }}><Ico d={PATHS.chevR} s={16} stroke={2} /></span>}
                                    {r.trail === "value" && <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: "#4C4CFF", background: "rgba(35,35,255,.1)", padding: "3px 10px", borderRadius: 80 }}>{r.badgeText}</span>}
                                    {r.trail === "toggle" && (
                                        <div style={{
                                            width: 44, height: 26, borderRadius: 13,
                                            background: r.val ? "#2323FF" : T.el,
                                            position: "relative", transition: "background .2s", flexShrink: 0
                                        }}>
                                            <div style={{
                                                position: "absolute", top: 2,
                                                left: r.val ? "calc(100% - 24px)" : 2,
                                                width: 22, height: 22, borderRadius: "50%", background: "#fff",
                                                transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.3)"
                                            }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────── BOTTOM NAV ──────────────────────────────────────────
const NAV = [
    { key: "dashboard", label: "Dashboard", icon: PATHS.home },
    { key: "products", label: "Products", icon: PATHS.tag },
    { key: "invoices", label: "Invoices", icon: PATHS.receipt },
    { key: "customers", label: "Customers", icon: PATHS.people },
    { key: "settings", label: "Settings", icon: PATHS.settings },
];
function BottomNav({ active, setActive, T }) {
    return (
        <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: T.surf, borderTop: `1px solid ${T.el}`,
            display: "flex", paddingBottom: 8, zIndex: 20,
            backdropFilter: "blur(12px)"
        }}>
            {NAV.map(n => {
                const isActive = active === n.key;
                return (
                    <button key={n.key} onClick={() => setActive(n.key)}
                        style={{
                            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                            gap: 3, paddingTop: 10, paddingBottom: 4, border: "none", background: "transparent",
                            cursor: "pointer", color: isActive ? "#2323FF" : T.muted,
                            transition: "color .15s"
                        }}>
                        <Ico d={n.icon} s={22} stroke={isActive ? 2.2 : 1.8} color={isActive ? "#2323FF" : undefined} />
                        <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, fontWeight: isActive ? 700 : 400 }}>{n.label}</span>
                        {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2323FF", marginTop: 1 }} />}
                    </button>
                );
            })}
        </div>
    );
}

// ─────────────────────── APP SHELL ───────────────────────────────────────────
function AppShell() {
    const { T, dark, toggle } = useTheme();
    const [screen, setScreen] = useState("dashboard");
    const screenMap = { dashboard: <Dashboard />, products: <Products />, invoices: <Invoices />, customers: <Customers />, settings: <Settings /> };
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rokkitt:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:${T.el};border-radius:4px;}
        button:active{opacity:.75;}
      `}</style>
            {/* Background canvas */}
            <div style={{
                minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: "'Rokkitt',serif", padding: "20px 0"
            }}>

                {/* Phone frame */}
                <div style={{
                    position: "relative", width: 393, height: "85vh", maxHeight: 780,
                    background: T.bg, borderRadius: 42, overflow: "hidden",
                    boxShadow: dark
                        ? "0 40px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08)"
                        : "0 40px 80px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.08)",
                    display: "flex", flexDirection: "column"
                }}>

                    {/* Status bar */}
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "12px 24px 6px", background: T.bg, flexShrink: 0
                    }}>
                        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 500, color: T.text }}>11:18</span>
                        <div style={{ display: "flex", gap: 5, alignItems: "center", color: T.text }}>
                            <Ico d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 0115.16-2.45M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" s={14} />
                            <Ico d="M5 12.55a10.94 10.94 0 0114.08 0M1.42 9a15.91 15.91 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" s={14} />
                            <Ico d="M23 7H1l4 9h14zM23 7V4" s={14} />
                        </div>
                    </div>

                    {/* Screen content */}
                    <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                        {screenMap[screen]}
                        <BottomNav active={screen} setActive={setScreen} T={T} />
                    </div>
                </div>

                {/* Outside controls */}
                <div style={{ position: "fixed", top: 20, right: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <button onClick={toggle} title="Toggle theme"
                        style={{
                            width: 40, height: 40, borderRadius: 12, border: `1px solid ${T.el}`,
                            background: T.surf, color: T.text, display: "flex", alignItems: "center",
                            justifyContent: "center", cursor: "pointer", fontSize: 16
                        }}>
                        {dark ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
        </>
    );
}

// ─────────────────────── EXPORT ──────────────────────────────────────────────
export default function NukodesApp() {
    return (
        <ThemeProvider defaultDark={true}>
            <AppShell />
        </ThemeProvider>
    );
}
