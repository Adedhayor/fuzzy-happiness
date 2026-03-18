/**
 * Nukoder Design System — Shared Tokens + Primitives
 * Supports dark and light themes via ThemeContext.
 */
import { createContext, useContext, useState } from "react";

// ── Tokens ────────────────────────────────────────────────────────────────────
export const T_DARK = {
    bg: "#0A0A0C", surf: "#1A1D24", el: "#2D303B",
    text: "#FFFFFF", muted: "#9B9FAF", subtle: "#CDCFD7",
    action: "#2323FF", a400: "#4C4CFF",
    ok: "#28AD1F", err: "#EF4444", warn: "#FB923C",
};
export const T_LIGHT = {
    bg: "#F2F4F7", surf: "#FFFFFF", el: "#E4E7ED",
    text: "#0A0A0C", muted: "#6B7280", subtle: "#374151",
    action: "#2323FF", a400: "#1818CC",
    ok: "#16a34a", err: "#DC2626", warn: "#d97706",
};

// ── Badge map ─────────────────────────────────────────────────────────────────
export const BADGE = {
    "Paid": { bg: "rgba(40,173,31,.15)", fg: "#28AD1F" },
    "In Stock": { bg: "rgba(40,173,31,.15)", fg: "#28AD1F" },
    "Approved": { bg: "rgba(40,173,31,.15)", fg: "#28AD1F" },
    "Sent": { bg: "rgba(35,35,255,.15)", fg: "#4C4CFF" },
    "Active": { bg: "rgba(35,35,255,.15)", fg: "#4C4CFF" },
    "Draft": { bg: "rgba(155,159,175,.15)", fg: "#9B9FAF" },
    "Pending": { bg: "rgba(155,159,175,.15)", fg: "#9B9FAF" },
    "Partial": { bg: "rgba(155,159,175,.15)", fg: "#9B9FAF" },
    "Overdue": { bg: "rgba(239,68,68,.15)", fg: "#EF4444" },
    "Out of Stock": { bg: "rgba(239,68,68,.15)", fg: "#EF4444" },
    "Rejected": { bg: "rgba(239,68,68,.15)", fg: "#EF4444" },
    "Cancelled": { bg: "rgba(239,68,68,.15)", fg: "#EF4444" },
    "Low Stock": { bg: "rgba(251,146,60,.15)", fg: "#FB923C" },
    "Urgent": { bg: "rgba(251,146,60,.15)", fg: "#FB923C" },
};

// ── Icon paths ────────────────────────────────────────────────────────────────
export const PATHS = {
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    receipt: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    people: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
    wallet: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 14a1 1 0 100-2 1 1 0 000 2z",
    camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z",
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    cal: "M3 4h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2zM16 2v4M8 2v4M2 10h20",
    check2: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3",
    trash: "M3 6h18M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    dl: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
    share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13",
    cloud: "M18.36 18.36A9 9 0 017.64 7.64m10.72 0A9 9 0 017.64 18.36M1 1l22 22",
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    plus: "M12 5v14M5 12h14",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    dollar: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
    chevR: "M9 18l6-6-6-6",
    chevD: "M6 9l6 6 6-6",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
    upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
    x: "M18 6L6 18M6 6l12 12",
    check: "M20 6L9 17l-5-5",
    sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 100 14A7 7 0 0012 5z",
    moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
};

// ── Theme context ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext({ T: T_DARK, dark: true, toggle: () => { } });
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children, defaultDark = true }) {
    const [dark, setDark] = useState(defaultDark);
    const T = dark ? T_DARK : T_LIGHT;
    return (
        <ThemeCtx.Provider value={{ T, dark, toggle: () => setDark(d => !d) }}>
            {children}
        </ThemeCtx.Provider>
    );
}

// ── Primitive components ──────────────────────────────────────────────────────
export const Ico = ({ d, s = 20, stroke = 1.8, color }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
        stroke={color || "currentColor"} strokeWidth={stroke}
        strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

export function Badge({ label, dot = true, T }) {
    const c = BADGE[label] || BADGE["Draft"];
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: c.bg, color: c.fg, padding: "2px 8px",
            borderRadius: 80, fontSize: 11, fontFamily: "'Rokkitt',serif",
            fontWeight: 600, whiteSpace: "nowrap",
        }}>
            {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.fg, flexShrink: 0 }} />}
            {label}
        </span>
    );
}

export function Av({ name, size = 38 }) {
    const ini = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const cols = ["#2323FF", "#28AD1F", "#FB923C", "#EF4444"];
    const c = cols[name.charCodeAt(0) % cols.length];
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%",
            background: `${c}22`, border: `1.5px solid ${c}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: size * .34, fontFamily: "'Rokkitt',serif",
            fontWeight: 700, color: c, flexShrink: 0,
        }}>{ini}</div>
    );
}

export function IBox({ path, T }) {
    return (
        <div style={{
            width: 40, height: 40, borderRadius: 10, background: T.el,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: T.muted,
        }}>
            <Ico d={path} />
        </div>
    );
}

// Convenience icon shortcuts
export const ChevR = () => <Ico d={PATHS.chevR} s={16} stroke={2} />;
export const ChevD = () => <Ico d={PATHS.chevD} s={16} stroke={2} />;
export const Check = () => <Ico d={PATHS.check} s={14} stroke={2.5} />;
export const Plus = () => <Ico d={PATHS.plus} s={18} stroke={2.5} />;
export const Minus = () => <Ico d="M5 12h14" s={18} stroke={2.5} />;
export const X = () => <Ico d={PATHS.x} s={16} stroke={2} />;
export const Upload = () => <Ico d={PATHS.upload} s={24} />;
export const ImgIco = () => <Ico d="M21 15l-5-5L5 20M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" s={24} />;

// Kept for backward compatibility with older Chevron usage in App.jsx
export const Chevron = ChevR;
