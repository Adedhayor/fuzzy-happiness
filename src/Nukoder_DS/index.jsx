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
    "Urgent":     { bg: "rgba(251,146,60,.15)",    fg: "#FB923C" },
    "Free":       { bg: "rgba(40,173,31,.12)",     fg: "#26CC5A" },
    "Growth":     { bg: "rgba(35,35,255,.12)",     fg: "#4C4CFF" },
    "Enterprise": { bg: "rgba(251,146,60,.12)",    fg: "#FB923C" },
    "Locked":     { bg: "rgba(155,159,175,.10)",   fg: "#6B7280" },
    "Connected":  { bg: "rgba(40,173,31,.12)",     fg: "#28AD1F" },
    "Pro":        { bg: "rgba(251,146,60,.12)",    fg: "#FB923C" },
    "New":        { bg: "rgba(35,35,255,.15)",     fg: "#4C4CFF" },
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
    zap:       "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    trending:  "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    lock:      "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
    unlock2:   "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 01-9.9-1",
    star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    building2: "M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18 M2 22h20 M10 6h.01 M10 10h.01 M10 14h.01 M10 18h.01 M14 6h.01 M14 10h.01 M14 14h.01 M14 18h.01",
    cpu:       "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    refresh:   "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
    arrowR:    "M5 12h14 M12 5l7 7-7 7",
    package2:  "M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z M12 22V9 M2 6.5l10 6.5 10-6.5",
    creditCard:"M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22",
    activity:  "M22 12h-4l-3 9L9 3l-3 9H2",
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

// ── Date helpers (internal) ───────────────────────────────────────────────────
const MONTHS_LG  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SM  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["sun","mon","tue","wed","thu","fri","sat"];

function _buildCal(year, month) {
    const first = new Date(year, month, 1).getDay();
    const days  = new Date(year, month + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
}
function _fmtDate(d) {
    if (!d) return "";
    return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_SM[d.getMonth()]} ${d.getFullYear()}`;
}
function _fmtShort(d) {
    if (!d) return "";
    return `${d.getDate()} ${MONTHS_SM[d.getMonth()]}`;
}
function _sameDay(a, b) {
    return a && b &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth()    === b.getMonth()    &&
        a.getDate()     === b.getDate();
}
function _prevMo(y, m) { return m === 0  ? [y - 1, 11] : [y, m - 1]; }
function _nextMo(y, m) { return m === 11 ? [y + 1,  0] : [y, m + 1]; }

// Light-mode sheet tokens — matches Figma overlay design (always light regardless of app theme)
const SH = {
    bg:        "#FFFFFF",
    text:      "#0A0A0C",
    muted:     "#4B476B",
    border:    "#D5D6DD",
    action:    "#2323FF",
    rangeFill: "rgba(232,232,255,0.4)",
    selCircle: "rgba(35,35,255,0.15)",
};

// ── CalendarGrid (internal) ───────────────────────────────────────────────────
function _CalGrid({ year, month, selected, rangeFrom, rangeTo, onSelect, onPrev, onNext }) {
    const cells = _buildCal(year, month);
    return (
        <div style={{ padding: "0 12px" }}>
            {/* Month/Year nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "8px 0 16px" }}>
                <button onClick={onPrev} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d="M15 18l-6-6 6-6" s={20} stroke={1.8} color={SH.text} />
                </button>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 20, fontWeight: 600, color: SH.text, letterSpacing: "-0.4px", minWidth: 148, textAlign: "center" }}>
                    {MONTHS_LG[month]} {year}
                </span>
                <button onClick={onNext} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d="M9 18l6-6-6-6" s={20} stroke={1.8} color={SH.text} />
                </button>
            </div>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
                {DAY_LABELS.map((d, i) => (
                    <div key={i} style={{ textAlign: "center", fontFamily: "'Rokkitt',serif", fontSize: 16, color: SH.text, paddingBottom: 4, fontWeight: 400, letterSpacing: "0.16px" }}>
                        {d}
                    </div>
                ))}
            </div>
            {/* Day cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 4 }}>
                {cells.map((day, i) => {
                    if (!day) return <div key={i} style={{ height: 44 }} />;

                    const thisDate = new Date(year, month, day);
                    thisDate.setHours(0, 0, 0, 0);

                    const isSel   = _sameDay(thisDate, selected);
                    const isStart = rangeFrom && _sameDay(thisDate, rangeFrom);
                    const isEnd   = rangeTo   && _sameDay(thisDate, rangeTo);
                    const inMid   = rangeFrom && rangeTo && thisDate > rangeFrom && thisDate < rangeTo;
                    const colIdx  = i % 7;

                    // Range pill fill + radius per cell
                    let pillBg = "transparent", pillRadius = "0";
                    if (isStart && isEnd) {
                        pillBg = SH.rangeFill; pillRadius = "32px";
                    } else if (isStart) {
                        pillBg = SH.rangeFill; pillRadius = "32px 8px 8px 32px";
                    } else if (isEnd) {
                        pillBg = SH.rangeFill; pillRadius = "8px 32px 32px 8px";
                    } else if (inMid) {
                        pillBg = SH.rangeFill;
                        if (colIdx === 0) pillRadius = "8px 0 0 8px";
                        else if (colIdx === 6) pillRadius = "0 8px 8px 0";
                    }

                    const isHighlighted = isSel || isStart || isEnd;
                    return (
                        <div key={i} style={{ height: 44, background: pillBg, borderRadius: pillRadius, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button onClick={() => onSelect(thisDate)} style={{
                                width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
                                background: isHighlighted ? SH.selCircle : "transparent",
                                color: isHighlighted ? SH.action : SH.text,
                                fontFamily: "'Rokkitt',serif", fontSize: 20, fontWeight: 600,
                                letterSpacing: "-0.4px", display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "background .12s",
                            }}>
                                {day}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Sheet overlay wrapper (internal)
function _SheetOverlay({ onClose, children }) {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10,10,12,0.7)", backdropFilter: "blur(4px)" }} />
            <div style={{ position: "relative", width: "100%", maxWidth: 480, background: SH.bg, borderRadius: "38px 38px 0 0", zIndex: 1, paddingBottom: 40, boxShadow: "0px 15px 75px rgba(0,0,0,0.18)" }}>
                {children}
            </div>
        </div>
    );
}

// Sheet grabber handle (internal)
function _Handle() {
    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 0 }}>
            <div style={{ width: 36, height: 5, borderRadius: 100, background: SH.border }} />
        </div>
    );
}

// Sheet toolbar: X close · centered title · checkmark confirm (internal)
function _Toolbar({ title, onClose, onConfirm, canConfirm }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 16px 10px", position: "relative" }}>
            <button onClick={onClose} style={{
                width: 44, height: 44, borderRadius: "50%", border: "none",
                background: "rgba(0,0,0,0.06)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
                <Ico d={PATHS.x} s={18} stroke={2} color="#727272" />
            </button>
            <span style={{
                position: "absolute", left: "50%", transform: "translateX(-50%)",
                fontFamily: "'Rokkitt',serif", fontSize: 20, fontWeight: 600,
                color: SH.text, letterSpacing: "-0.4px", whiteSpace: "nowrap", pointerEvents: "none",
            }}>
                {title}
            </span>
            <button onClick={canConfirm ? onConfirm : undefined} style={{
                width: 44, height: 44, borderRadius: "50%", border: "none",
                background: canConfirm ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.06)",
                boxShadow: canConfirm ? "0px 8px 40px rgba(0,0,0,0.12)" : "none",
                cursor: canConfirm ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                transition: "all .2s", opacity: canConfirm ? 1 : 0.35,
            }}>
                <Ico d={PATHS.check} s={18} stroke={2.5} color={SH.action} />
            </button>
        </div>
    );
}

// Preset pills inside the sheet (internal)
function _SheetPills({ presets, active, onSelect }) {
    return (
        <div style={{ padding: "0 16px 12px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {presets.map((p, i) => (
                <button key={p} onClick={() => onSelect(i)} style={{
                    height: 36, padding: "0 12px", borderRadius: 56,
                    border: `1px solid ${active === i ? SH.action : SH.border}`,
                    background: active === i ? "rgba(35,35,255,0.08)" : "transparent",
                    color: active === i ? SH.action : SH.muted,
                    fontFamily: "'Rokkitt',serif", fontSize: 14,
                    fontWeight: active === i ? 600 : 400,
                    cursor: "pointer", whiteSpace: "nowrap",
                    letterSpacing: "0.28px", transition: "all .15s",
                }}>
                    {p}
                </button>
            ))}
        </div>
    );
}

// ── FilterPills ───────────────────────────────────────────────────────────────
// Horizontal scrollable pill-tab row. Used on list screens for status filtering.
export function FilterPills({ tabs = [], active = 0, onSelect, size = "md", T: _T }) {
    const { T: ctxT } = useTheme();
    const T = _T || ctxT;
    const h  = size === "sm" ? 28 : 32;
    const fs = size === "sm" ? 12 : 13;
    return (
        <div style={{ display: "flex", gap: 4, overflowX: "auto", scrollbarWidth: "none" }}>
            {tabs.map((t, i) => (
                <button key={t} onClick={() => onSelect?.(i)} style={{
                    height: h, padding: `0 ${size === "sm" ? 10 : 12}px`,
                    borderRadius: 80, border: "none", cursor: "pointer",
                    whiteSpace: "nowrap", transition: "all .15s",
                    background: active === i ? T.action : "transparent",
                    color: active === i ? "#fff" : T.muted,
                    fontFamily: "'Rokkitt',serif", fontSize: fs,
                    fontWeight: active === i ? 600 : 400,
                }}>
                    {t}
                </button>
            ))}
        </div>
    );
}

// ── DateInput ─────────────────────────────────────────────────────────────────
// Form field that opens a date picker bottom sheet. Confirms a single date.
// Props: label, placeholder, value (Date|null), onChange (Date => void), T
export function DateInput({ label, placeholder = "Select date", value = null, onChange, T: _T }) {
    const { T: ctxT } = useTheme();
    const T = _T || ctxT;
    const [open, setOpen]   = useState(false);
    const now               = new Date();
    const [viewY, setViewY] = useState(value ? value.getFullYear() : now.getFullYear());
    const [viewM, setViewM] = useState(value ? value.getMonth()    : now.getMonth());
    const [draft, setDraft] = useState(value);

    function handleConfirm() { if (draft) { onChange?.(draft); setOpen(false); } }

    const quickPick = (offsetDays) => {
        const d = new Date(); d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + offsetDays);
        setDraft(d);
    };

    return (
        <div>
            {label && <div style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: T.subtle, marginBottom: 6 }}>{label}</div>}
            {/* Trigger field */}
            <div onClick={() => setOpen(true)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                height: 48, padding: "0 14px", borderRadius: 12,
                background: T.surf, border: `1px solid ${open ? T.action : T.el}`,
                cursor: "pointer", transition: "border-color .15s",
            }}>
                <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 15, color: value ? T.text : T.muted }}>
                    {value ? _fmtDate(value) : placeholder}
                </span>
                <Ico d={PATHS.cal} s={18} color={T.muted} />
            </div>

            {open && (
                <_SheetOverlay onClose={() => setOpen(false)}>
                    <_Handle />
                    <_Toolbar
                        title="Select Date"
                        onClose={() => setOpen(false)}
                        onConfirm={handleConfirm}
                        canConfirm={!!draft}
                    />
                    <_SheetPills
                        presets={["Today", "Tomorrow", "In 7 days"]}
                        active={-1}
                        onSelect={(i) => quickPick([0, 1, 7][i])}
                    />
                    <_CalGrid
                        year={viewY} month={viewM}
                        selected={draft}
                        onSelect={setDraft}
                        onPrev={() => { const [y, m] = _prevMo(viewY, viewM); setViewY(y); setViewM(m); }}
                        onNext={() => { const [y, m] = _nextMo(viewY, viewM); setViewY(y); setViewM(m); }}
                    />
                </_SheetOverlay>
            )}
        </div>
    );
}

// ── DateRangeFilter ───────────────────────────────────────────────────────────
// Filter pill trigger that opens a date-range bottom sheet.
// Presets: Last 7/14/30/60 days. Custom mode: tap From → To on calendar.
// Props: value ({ from: Date|null, to: Date|null }), onChange, label, T
export function DateRangeFilter({ value = { from: null, to: null }, onChange, label = "Date Range", T: _T }) {
    const { T: ctxT } = useTheme();
    const T = _T || ctxT;
    const [open, setOpen]       = useState(false);
    const [activeP, setActiveP] = useState(-1);
    const [picking, setPicking] = useState("from");
    const [draft, setDraft]     = useState({ from: value.from, to: value.to });
    const now = new Date();
    const [viewY, setViewY]     = useState(now.getFullYear());
    const [viewM, setViewM]     = useState(now.getMonth());

    const PRESETS = [
        { label: "Last 7 days",  days: 7  },
        { label: "Last 14 days", days: 14 },
        { label: "Last 30 days", days: 30 },
        { label: "Last 60 days", days: 60 },
        { label: "Custom",       days: null },
    ];
    const isCustom = activeP === 4;
    const hasValue = !!(value.from || value.to);

    function handlePresetSelect(i) {
        setActiveP(i);
        const p = PRESETS[i];
        if (p.days !== null) {
            const to = new Date(); to.setHours(0, 0, 0, 0);
            const from = new Date(to); from.setDate(from.getDate() - p.days);
            setDraft({ from, to });
        } else {
            setDraft({ from: null, to: null });
            setPicking("from");
        }
    }

    function handleDateSelect(date) {
        if (picking === "from") {
            setDraft({ from: date, to: null });
            setPicking("to");
        } else {
            const ordered = draft.from && date < draft.from
                ? { from: date, to: draft.from }
                : { from: draft.from, to: date };
            setDraft(ordered);
            setPicking("from");
        }
    }

    function handleApply() { onChange?.({ from: draft.from, to: draft.to }); setOpen(false); }
    function handleClear()  { const empty = { from: null, to: null }; setDraft(empty); setActiveP(-1); onChange?.(empty); setOpen(false); }

    // Trigger label
    const triggerText = value.from
        ? value.to && !_sameDay(value.from, value.to)
            ? `${_fmtShort(value.from)} – ${_fmtShort(value.to)}`
            : _fmtShort(value.from)
        : label;

    return (
        <div>
            {/* Trigger pill — uses app theme */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => setOpen(true)} style={{
                    height: 36, padding: "0 12px 0 10px", borderRadius: 80,
                    border: `1px solid ${hasValue ? T.action : T.el}`,
                    background: hasValue ? "rgba(35,35,255,0.1)" : "transparent",
                    color: hasValue ? T.a400 : T.muted,
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "'Rokkitt',serif", fontSize: 13,
                    cursor: "pointer", whiteSpace: "nowrap",
                }}>
                    <Ico d={PATHS.cal} s={14} color="currentColor" />
                    {triggerText}
                </button>
                {hasValue && (
                    <button onClick={(e) => { e.stopPropagation(); handleClear(); }} style={{
                        width: 22, height: 22, borderRadius: "50%", border: "none",
                        background: T.el, cursor: "pointer", padding: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Ico d={PATHS.x} s={12} stroke={2} color={T.muted} />
                    </button>
                )}
            </div>

            {open && (
                <_SheetOverlay onClose={() => setOpen(false)}>
                    <_Handle />
                    <_Toolbar
                        title="Filter by Date"
                        onClose={() => setOpen(false)}
                        onConfirm={handleApply}
                        canConfirm={!!(draft.from)}
                    />
                    <_SheetPills
                        presets={PRESETS.map(p => p.label)}
                        active={activeP}
                        onSelect={handlePresetSelect}
                    />

                    {/* Non-custom: date summary */}
                    {activeP >= 0 && !isCustom && draft.from && (
                        <div style={{ margin: "0 16px 12px", padding: "10px 14px", background: "rgba(35,35,255,0.06)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                            <Ico d={PATHS.cal} s={15} color={SH.action} />
                            <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 13, color: SH.action }}>
                                {_fmtDate(draft.from)} → {draft.to ? _fmtDate(draft.to) : "today"}
                            </span>
                        </div>
                    )}

                    {/* Custom: From/To strip + calendar */}
                    {isCustom && (
                        <>
                            <div style={{ display: "flex", gap: 6, padding: "0 16px 12px" }}>
                                <button onClick={() => setPicking("from")} style={{
                                    flex: 1, height: 52, borderRadius: 12,
                                    border: `1.5px solid ${picking === "from" ? SH.action : SH.border}`,
                                    background: picking === "from" ? "rgba(35,35,255,0.06)" : SH.bg,
                                    cursor: "pointer", display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                }}>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: SH.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>From</span>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, fontWeight: 600, color: draft.from ? SH.action : SH.muted }}>
                                        {draft.from ? _fmtDate(draft.from) : "— — —"}
                                    </span>
                                </button>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Ico d="M5 12h14" s={16} color={SH.border} />
                                </div>
                                <button onClick={() => draft.from && setPicking("to")} style={{
                                    flex: 1, height: 52, borderRadius: 12,
                                    border: `1.5px solid ${picking === "to" ? SH.action : SH.border}`,
                                    background: picking === "to" ? "rgba(35,35,255,0.06)" : SH.bg,
                                    cursor: draft.from ? "pointer" : "default",
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    opacity: draft.from ? 1 : 0.45,
                                }}>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 10, color: SH.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>To</span>
                                    <span style={{ fontFamily: "'Rokkitt',serif", fontSize: 14, fontWeight: 600, color: draft.to ? SH.action : SH.muted }}>
                                        {draft.to ? _fmtDate(draft.to) : "— — —"}
                                    </span>
                                </button>
                            </div>
                            <_CalGrid
                                year={viewY} month={viewM}
                                selected={picking === "from" ? draft.from : draft.to}
                                rangeFrom={draft.from} rangeTo={draft.to}
                                onSelect={handleDateSelect}
                                onPrev={() => { const [y, m] = _prevMo(viewY, viewM); setViewY(y); setViewM(m); }}
                                onNext={() => { const [y, m] = _nextMo(viewY, viewM); setViewY(y); setViewM(m); }}
                            />
                        </>
                    )}
                </_SheetOverlay>
            )}
        </div>
    );
}
