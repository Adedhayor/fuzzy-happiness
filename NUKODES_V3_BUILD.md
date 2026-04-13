# NUKODES V3 BUILD — Claude Code Instructions

> **Version:** 3.1  
> **Date:** April 11, 2026  
> **Target:** Single-file JSX for Antigravity (Vite + React @ localhost:5173)  
> **Figma Source:** https://www.figma.com/design/gvlMDYxBDL4dA6ouHfpw0e/Nukodes_App?node-id=2387-9201  
> **Style Target:** Apple iOS 26 Liquid Glass — light + dark mode  
> **Design Inspo:** Fig Finance app (screenshots), Telegram iOS UI  
> **Demo User:** Kofi

---

## 1. OBJECTIVE

Rebuild the entire Nukodes app as a single `Nukodes_App.jsx` file. Apply **Apple iOS 26 Liquid Glass** styling across every surface — both light and dark mode. The app must feel like a native iOS 26 app. All components must comply with **Apple Human Interface Guidelines (HIG)**.

---

## 2. REFERENCE REPOS & LIBRARIES

### Glass UI
| Repo | Use for |
|------|---------|
| `remiangelo/reactGlass` (ios26-glassmorphism-react) | GlassCard, GlassNavigation, GlassButton, GlassAvatar — physics-based Fresnel rendering |
| `creativoma/liquid-glass` | LiquidGlass component with SVG filter displacement + Tailwind |
| `albedim/apple-web-liquid-glass-demo` | GlassContainer with distortion intensity props |
| `@mawtech/glass-ui` | GlassCard, GlassInput, GlassButton variant="aurora" glow |

### Progressive Blur Header
| Repo | Use for |
|------|---------|
| `dominikmartn/ProgressiveBlurHeader` | **KEY PATTERN.** Sticky header with progressive blur — content scrolls underneath with increasing blur, never clipped. Port to CSS/React with stacked blur layers. |
| `AndrewPrifer/progressive-blur` | Drop-in progressive gradient backdrop blur for React |
| `magicui.design/docs/components/progressive-blur` | React progressive blur component |

### Animation — Motion (formerly Framer Motion)
```bash
npm install motion
```
```js
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
```
**Use for:** page transitions, card entrances, scroll-linked tab morph, spring physics, gesture feedback, staggered lists, layout animations, chart bar growth, empty state floating, bottom sheet spring, number counters. 120fps GPU-accelerated.

---

## 3. iOS 26 LIQUID GLASS TREATMENT

### Glass Material CSS
```css
.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 0.5px solid rgba(255,255,255,0.10);
  box-shadow: 0 2px 16px rgba(0,0,0,0.06), inset 0 0.5px 0 rgba(255,255,255,0.15);
}
.glass-heavy {
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(50px) saturate(200%);
}
[data-theme="light"] .glass {
  background: rgba(255,255,255,0.7);
  border-color: rgba(0,0,0,0.06);
}
```

### Progressive Blur Header (from ProgressiveBlurHeader repo)
- Header has NO opaque background
- As user scrolls, content passes underneath with **increasing gaussian blur**
- Stack div layers with incrementing `backdrop-filter: blur()` (0→4→8→16→24px)
- Each layer clips to a portion of header height via `mask-image: linear-gradient()`
- Header content (title, avatar) stays sharp
- Replaces traditional sticky opaque headers

### Component Application

**Tab Bar:** Fully rounded pill (radius: 9999px), glass-heavy, compact on scroll via Motion layout animation. FAB: circular glass to the right.

**Cards:** **32px border-radius** on ALL cards (Telegram-style). Glass background. Full-width on service screens.

**Top Bar:** Progressive blur — transparent until scroll activates blur layers.

**Bottom Sheets:** Heavy glass (blur: 50px), 32px top radius, spring animation, grabber pill.

**Buttons:** Primary = solid blue, Secondary = glass, Icon = glass circle 44×44pt min.

**List Items:** Full-width, 44pt min height, 0.5px dividers, stagger entrance animation.

**Text Inputs:** Glass background, 32px outer radius, floating label, accent focus border.

### Date Components — NEW
- **Single Date:** iOS wheel picker in glass bottom sheet (Day|Month|Year columns)
- **Date Range:** Two-step (start→end). Calendar grid in glass sheet. Accent-highlighted range.
- **Month/Year Selector:** Horizontal glass pill tabs. Tap → grid of months or scrollable years.
- **Calendar Grid:** 7 columns. Today=accent circle. Selected=glass pill. Range=connected highlight.
- **Interaction:** Tap to select, haptic-style scale bounce via Motion.

---

## 4. EMPTY STATES — VIBRANT

Every screen needs a designed empty state: large vibrant illustration (emoji/SVG), bold title, 2-line subtitle, CTA button. Animated entrance (scale+fade spring), floating illustration.

| Screen | Title | CTA |
|--------|-------|-----|
| Dashboard | "Let's get started" | "Record a sale" |
| Cash on Hand | "Track your cash" | "Add transaction" |
| Revenue | "Watch it grow" | "Record a sale" |
| Invoices | "Start sending professional invoices" | "Turn on invoicing" |
| Expenses | "No expenses yet" | "Add expense" |
| Sales | "No sales recorded" | "Record sale" |
| Customers | "Build your customer base" | "Add customer" |
| Products | "Your inventory is empty" | "Add product" |
| Taxes | "Making taxes less taxing" | "Upgrade to Premium" |
| Activity | "Nothing here yet" | — |
| Team | "No team members" | "Invite member" |

---

## 5. APP STRUCTURE

### Tab 1: Dashboard — UPDATED
Top bar: Avatar + "Hi, Kofi" + offline tag + bell (progressive blur header)

Body:
1. **Promo Carousel** — glass cards with gradients, auto-scroll, pagination dots
2. **Cash Flow** — title + "View >", large value with trend, line chart on glass
3. **Taxes Preview** — title + "Upgrade >", empty or summary
4. **Transactions** — title + "View >", recent 3–5 items (icon + name + amount)
5. **Accounts** — title + "View >", connected banks (icon + name + balance + sync)
6. **Analytics Widgets** — customizable glass cards: revenue trend, expense donut, invoice aging, cash runway

**REMOVED:** Quick actions section, live services section.

### Tab 2: Services — UPDATED
**All service cards: FULL WIDTH (no grid)**

Each card: glass, 32px radius, icon + title + subtitle + chevron. Locked items: dimmed + lock icon → upgrade sheet on tap.

Sections: Financial Summary (horizontal scroll) → Inventory → Sales & Customers → Operations → Finance → Analytics & Compliance

### Tab 2 → Inner Screens
Invoices (tabs + stats + list), Expenses (filters + list), Sales Tracker (tabs + chart + list), Create forms (glass inputs)

### Tab 3: Taxes
Empty state with vibrant illustration or premium content

### Tab 4: Profile
Glass profile card + section groups (General, Preferences, Support) + subscreens + logout

### FAB → Bottom Sheet
5 quick actions in glass sheet

### Onboarding
Splash → 4 slides → Sign Up/In → Country → Business Type → Details → Identity → Phone → OTP → Notifications → Role → Plan → Dashboard

---

## 6. ANIMATION PATTERNS (Motion)

```jsx
// Page transitions
<AnimatePresence mode="wait">
  <motion.div key={screen} initial={{x:50,opacity:0}} animate={{x:0,opacity:1}}
    exit={{x:-50,opacity:0}} transition={{type:"spring",stiffness:300,damping:30}} />
</AnimatePresence>

// List stagger
const container = {hidden:{},show:{transition:{staggerChildren:0.05}}}
const item = {hidden:{opacity:0,y:20},show:{opacity:1,y:0}}

// Tab bar morph
const {scrollY} = useScroll()
const h = useTransform(scrollY,[0,100],[80,50])

// Button press
<motion.div whileTap={{scale:0.97}} transition={{type:"spring",stiffness:400}} />

// Bottom sheet spring
initial={{y:"100%"}} animate={{y:0}} transition={{type:"spring",damping:25,stiffness:300}}

// Empty state float
animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:3,ease:"easeInOut"}}

// Chart bars
initial={{height:0}} animate={{height:val}} transition={{delay:i*0.05,type:"spring"}}
```

---

## 7. HIG COMPLIANCE

- Touch targets: ≥44×44pt everywhere
- Typography: 17pt body default, SF system font stack with Syne/Instrument Sans fallback
- Contrast: 4.5:1 body text, 3:1 UI components
- Colors: iOS semantic system colors (accent blue: #0A84FF dark / #007AFF light)
- Tab bar: 4 tabs + FAB, icon + label, glass material
- Navigation: chevron.left back, large titles primary screens
- Dark mode: near-black background, no pure white text (use rgba 0.92)
- Accessibility: icon labels, color not sole indicator, prefers-reduced-motion respected
- Layout: safe areas, 16pt content insets, concentric corner radii
- Feedback: scale bounce on tap, skeleton loading, shake on error

---

## 8. DESIGN TOKENS

### Radii
```
--radius-sm: 8px | --radius-md: 12px | --radius-lg: 16px
--radius-card: 32px         ← ALL cards
--radius-tab-bar: 9999px    ← fully rounded pill
--radius-full: 9999px       ← avatars, pills
```

### Colors (Dark)
```
--bg: #0A0A0A | --bg-secondary: #141414 | --bg-elevated: #1C1C1E
--glass: rgba(255,255,255,0.06) | --glass-heavy: rgba(255,255,255,0.10)
--glass-border: rgba(255,255,255,0.10) | --glass-card: rgba(255,255,255,0.04)
--text: rgba(255,255,255,0.92) | --text-secondary: rgba(255,255,255,0.6)
--accent: #0A84FF | --green: #30D158 | --red: #FF453A | --orange: #FF9F0A
--divider: rgba(255,255,255,0.06)
```

### Colors (Light)
```
--bg: #F2F2F7 | --bg-secondary: #FFFFFF
--glass: rgba(255,255,255,0.7) | --glass-heavy: rgba(255,255,255,0.85)
--glass-border: rgba(0,0,0,0.06) | --text: rgba(0,0,0,0.92)
--accent: #007AFF | --green: #34C759 | --red: #FF3B30
--divider: rgba(0,0,0,0.06)
```

### Typography
```
Display: Syne 36/600 | Title: Syne 24/600 | Heading: Instrument Sans 20/600
Body: Instrument Sans 17/400 | Caption: 14/400 | Label: DM Mono 14/400
```

### Shadows
```
--shadow-glass: 0 2px 16px rgba(0,0,0,0.06), inset 0 0.5px 0 rgba(255,255,255,0.15)
--shadow-card: 0 8px 32px rgba(0,0,0,0.12)
--shadow-fab: 0 4px 20px rgba(0,0,0,0.2)
```

---

## 9. NIGERIAN CONTEXT

₦ formatting (symbol before, comma thousands) | VAT 7.5% | Date: DD MMM YYYY | Phone: +234 | Demo user: Kofi | Banks: GTBank, Access, Zenith, UBA, First Bank

---

## 10. BUILD ORDER

1. CSS + Glass + Progressive blur + Motion setup + Theme
2. Shell: status bar, progressive blur header, glass tab bar pill + morph, FAB
3. Dashboard: carousel, cash flow chart, transactions, accounts, widgets, empty states
4. Services: full-width cards, summary scroll, locked states
5. Inner screens: Invoices/Expenses/Sales + create forms
6. Date components: single picker, range, month/year, calendar
7. Taxes + Profile + subscreens
8. Bottom sheets + FAB actions + upgrade prompts
9. Onboarding flow
10. Animation polish: transitions, staggers, charts, floats, gestures

---

## 11. CHECKLIST

- [ ] Glass effects in dark + light mode
- [ ] Progressive blur header on scroll
- [ ] Tab bar = fully-rounded pill, morphs on scroll
- [ ] ALL cards = 32px radius
- [ ] Service cards = full-width (no grid)
- [ ] All empty states vibrant with illustrations + floating animation
- [ ] Date picker (single + range + month/year)
- [ ] Motion animations: page transitions, staggers, chart bars, springs
- [ ] No quick actions or live services on dashboard
- [ ] Analytics widgets on dashboard
- [ ] Touch targets ≥ 44pt, contrast ≥ 4.5:1
- [ ] ₦ formatting correct
- [ ] HIG typography (17pt body)
- [ ] prefers-reduced-motion respected
- [ ] Onboarding complete
- [ ] Safe areas respected
