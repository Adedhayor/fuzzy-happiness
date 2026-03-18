# Nukodes — Claude Agent Memory

## Project Overview
Nukodes is a fintech mobile app for Nigerian businesses. It handles invoicing, expense tracking, cash flow management, and business performance analytics. The design system is called **Nukoder_DS**.

## Figma Files
- **Design System:** https://www.figma.com/design/aRuOdVyyyPCAClArLn4EZG/Nukoder_DS
- **App File:** https://www.figma.com/design/gvlMDYxBDL4dA6ouHfpw0e/Nukodes_App

## Tech Stack
- Mobile-first (430px wide frames — iPhone-sized)
- React / React Native (confirm with team)
- Tailwind CSS for styling
- Fonts loaded: Rokkitt (Google Fonts), Oswald (Google Fonts), SF Pro (system)

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `Semantic/bg/primary` | `#0A0A0C` | Page/screen background |
| `Semantic/surf/default` | `#1A1D24` | Card surface |
| `Semantic/surf/elevated` | `#2D303B` | Borders, elevated elements |
| `Semantic/text/primary` | `#FFFFFF` | Primary text |
| `Semantic/text/inverse` | `#0A0A0C` | Text on light backgrounds |
| `Semantic/action/primary/default` | `#2323FF` | Primary CTA, FAB, active states |
| `Primary/400` | `#4C4CFF` | Links, secondary actions |
| `Primary/500` | `#2323FF` | Primary buttons |
| `Primary/0` | `#E8E8FF` | Light button backgrounds |
| `Secondary/0` | `#E6E7EB` | Light text, nav items |
| `Secondary/100` | `#CDCFD7` | Supporting text |
| `Secondary/200` | `#9B9FAF` | Muted labels, card headers |
| `Secondary/700` | `#060919` | Liquid card dark background |
| `Neutral/0` | `#FFFFFF` | Pure white |
| `Neutral/200` | `#B8B8C7` | Neutral mid |
| `Utility/Success/400` | `#28AD1F` | Success states |
| `success (display)` | `#26CC5A` | Trending up indicators |
| `error/overdue` | `#EF4444` | Overdue amounts, error states |
| `Navbar/Border/Dark` | `#2D303B` | Nav border |

### Typography
| Token | Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `HEADER/H2` | Oswald Regular | 32px | 400 | 36px | -0.64px |
| `HEADER/H3` | Rokkitt SemiBold | 24px | 600 | 24px | -0.48px |
| `HEADER/H4` | Rokkitt SemiBold | 20px | 600 | 20px | -0.4px |
| `BODY/l` | Rokkitt Regular | 18px | 400 | 20px | 0.18px |
| `BODY/m` | Rokkitt Regular | 16px | 400 | 18px | 0.16px |
| `BODY/s` | Rokkitt Regular | 14px | 400 | 16px | 0.28px |
| `BODY/xs` | Rokkitt Regular | 12px | 400 | 14px | 0.24px |

> **Rule:** Use **Oswald** only for financial figures/numbers (₦ amounts). Use **Rokkitt** for all other text.

### Effects
| Token | Description |
|---|---|
| `glass_1 / effect-glass1` | Inner shadow: `rgba(247,247,247,0.16)` ±2px offset, 4px blur + backdrop blur 6px |
| `Liquid card` | Inner shadow: inset light + dark 1px, outer glow `rgba(242,242,242,0.5)` 22px, backdrop blur 20px |
| `Drop Shadow/100` | Subtle 1px drop shadow |
| `Drop Shadow/400` | Medium elevation shadow |
| `shadow_600` | High elevation (FAB button) |

---

## Component Library (Nukoder_DS)

### Confirmed Components
- **Button** — multiple variants (primary, secondary, ghost, icon-only, pill)
- **Text Input** — 7 states: Active, Focused, Typing, Filled, Error, Success, Inactive
- **NavBars** — Status Bar + Top Bar + optional Search bar
- **NavBar._Tabs** — 4-tab bottom nav with active indicator dot
- **FAB** — Floating action button (`#2323FF`, 56px, rounded-full)
- **Progress Indicator** — used in multi-step flows
- **Checkbox .base** — base checkbox component
- **Search bar** — standalone search input
- **Links** — inline link with chevron
- **iOS Arrow** — back navigation icon
- **Tags/Pills** — e.g. "Offline" tag with icon
- **Data Trending** — trending up/down indicator icon
- **card - metric** — reusable metric card with liquid glass inner container
- **card - body** — card variant with invoice data

### Icon Set
All icons are **Fluent Icons**. Key icons used:
- `Home` — dashboard nav
- `Cube Multiple` — products/inventory nav
- `Document Percent` — invoices nav  
- `Person` — profile nav
- `Add` — FAB / additive actions
- `Chevron` — dropdowns, navigation
- `Copy` — copy to clipboard
- `Settings` — customize/options
- `Cloud Off` — offline indicator
- `Alert` — notifications
- `Data Trending` — financial trends

---

## App Screens (Nukodes_App)

### Confirmed Screens
- **Dashboard - dark** (`node: 1100:2576`) — Main home screen
- **Add business** — Multi-step business onboarding form

### Dashboard Screen Breakdown
- **Top NavBar:** Avatar + "Hello, [name]" greeting, Offline tag, Alert bell
- **Business selector:** Pill dropdown ("Nukoder Business 1") + Account ID pill ("NB-01001")
- **Cash on Hand card:** Primary metric, ₦18,750,239, swipeable (4 dots = 4 accounts)
- **Missing Expense Details:** Alert card with CTA
- **Performance Widgets:** Customizable widget section with Total Assets
- **Performance Overview:** Invoice Health card (Outstanding ₦70,000 / Overdue ₦5,000)
- **Bottom NavBar:** 4 tabs + FAB, glass blur background, home indicator

---

## Design Patterns & Rules

### Card Pattern
```
Outer card: bg #1A1D24, border #2D303B, border-radius 32px, glass_1 effect
Inner "liquid" container: bg #060919, border-radius 24px, backdrop-blur 20px, liquid glass effect
```

### Button Sizes
- Full-width CTA: `h-48px`, `rounded-80px`
- Icon-only button: `48x48px`, `rounded-80px`  
- Pill/small button: `h-40px`, `rounded-80px`
- FAB: `56x56px`, `rounded-80px`, bg `#2323FF`

### Spacing
- Screen horizontal padding: `16px`
- Card internal padding: `8px` outer, `12px` inner liquid
- Section gap: `32px`
- Component gap: `16px`
- Element gap: `8px`

### Currency Format
Always display Nigerian Naira as: `₦ XX,XXX,XXX` (with space after ₦ symbol)

### Offline State
Show "Offline" pill tag (blue `#2323FF` bg) in top-right nav area when offline.

---

## Workflow Instructions

1. **Before making any changes** — always call `get_design_context` on the relevant Figma node
2. **After building** — capture the live UI and push back to Figma for review
3. **Naming convention** — PascalCase for components, kebab-case for files
4. **Dark mode first** — all screens are dark mode by default
5. **Post updates** — send progress summaries to nukodes Slack workspace after major iterations

## Figma MCP Commands (use in Claude Code terminal)
```bash
# Read a specific frame
get_design_context fileKey=gvlMDYxBDL4dA6ouHfpw0e nodeId=1100:2576

# Get DS variables  
get_variable_defs fileKey=aRuOdVyyyPCAClArLn4EZG nodeId=200:1376
```

## Key Node IDs
| Screen | Node ID |
|---|---|
| Dashboard - dark | `1100:2576` |
| DS — Text Input (Audit) | `200:1376` |
