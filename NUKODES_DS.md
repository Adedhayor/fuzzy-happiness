# NUKODES DESIGN SYSTEM — MASTER CONTEXT FILE
> Drop this file into your Antigravity project root. This gives Claude full context on every token, component, screen, flow and handoff convention for the Nukodes app. Reference this at the start of every session.

---

## 1. PROJECT OVERVIEW

**Product:** Nukodes — Nigerian SME business management app  
**Platform:** Mobile-first (iOS + Android) · React Native · Expo  
**UI Library:** Tamagui v1 (`@tamagui/core`)  
**Design stack:** Figma (DS file) + Antigravity (visual reference) + Storybook (Praise's handoff)  
**Typography:** Oswald (financial figures ONLY) + Rokkitt (all other text)  
**Theme:** Dark mode only  
**Base screen:** 375pt wide (iPhone 14 base)  
**Currency format:** `₦ XX,XXX,XXX` — always a space after ₦, comma-separated thousands  

---

## 2. DESIGN TOKENS

### Colors (map directly to Tamagui theme tokens)

```ts
// tokens.ts
export const colors = {
  // Backgrounds
  bgPrimary:      '#0A0A0C',   // Screen background — never use pure #000
  surfDefault:    '#1A1D24',   // Card / component surface
  surfElevated:   '#2D303B',   // Borders, dividers, elevated surfaces

  // Text
  textPrimary:    '#FFFFFF',
  textSecondary:  '#CDCFD7',   // secondary/100
  textMuted:      '#9B9FAF',   // secondary/200

  // Action
  actionPrimary:  '#2323FF',   // Buttons, active states, links
  actionLight:    '#4C4CFF',   // Lighter action, selected text

  // Semantic
  success:        '#28AD1F',
  successLight:   '#26CC5A',   // Trending up, positive delta
  error:          '#EF4444',   // Overdue, destructive, error
  warning:        '#FB923C',   // Low stock, urgent

  // Special
  liquidDark:     '#060919',   // Liquid glass card base
}
```

### Typography

```ts
// Only two fonts. NEVER mix them.
// Oswald → financial figures: amounts, totals, quantities
// Rokkitt → everything else: labels, headings, body, buttons

export const fonts = {
  display: 'Oswald',   // 32px hero, 22px standard, 15px small
  body:    'Rokkitt',  // 24px H3, 20px H4, 18/16/14/12px body
}

// Oswald sizes
// Hero:     38px / weight 600 — dashboard cash position
// Standard: 22px / weight 500 — list amounts, card values
// Small:    15px / weight 400 — secondary amounts

// Rokkitt sizes
// H3: 24px / SemiBold 600
// H4: 20px / SemiBold 600
// Body/m: 16px / Regular 400
// Body/s: 14px / Regular 400
// Body/xs: 12px / Regular 400
// Label uppercase: 12px / SemiBold 700 / letter-spacing 0.08em
```

### Spacing

```ts
export const spacing = {
  screenPad:   16,  // Horizontal screen padding
  sectionGap:  32,  // Between major sections
  componentGap: 16, // Between components in a section
  elementGap:   8,  // Between elements within a component
  rowPadH:     16,  // List row horizontal padding
  rowPadV:     12,  // List row vertical padding
}
```

### Radii

```ts
export const radii = {
  card:       32,   // Outer card (liquid glass hero)
  cardInner:  24,   // Inner liquid card
  component:  16,   // Standard card/surface
  input:      12,   // Text input, dropdown
  button:     80,   // All buttons — fully pill-shaped
  tag:        80,   // Badges, chips, pills
  avatar:     50,   // Avatars (50% = circle)
  icon:       10,   // Icon boxes
  fab:        28,   // FAB (56px / 2)
}
```

### Component Sizes

```ts
export const sizes = {
  fab:          56,   // FAB button diameter
  buttonH:      48,   // Primary/secondary button height
  pillH:        40,   // Pill button height
  inputH:       48,   // Text input / dropdown height
  navBarH:      76,   // Bottom tab bar height
  listRowMinH:  64,   // Minimum list row height
  avatarSm:     32,   // Avatar in list
  avatarMd:     40,   // Avatar in card
  avatarLg:     64,   // Avatar in profile
  iconSm:       16,
  iconMd:       20,
  iconLg:       24,
  toggleW:      51,   // Switch/toggle width
  toggleH:      31,   // Switch/toggle height
}
```

---

## 3. COMPONENT LIBRARY (Tier 1 — Blockers)

All components live in `src/components/`. Each maps to a Figma DS component.

### C01 — ListItem

```tsx
// src/components/ListItem.tsx
// Props: leading ('none'|'icon'|'avatar'), trailing ('chevron'|'amount+badge'|'badge'|'amount+chevron'|'none')
// States: default, pressed (#1F2330 bg), disabled (40% opacity), destructive (red label)
// Divider: 1px #2D303B, hide on last item

<ListItem
  leading="avatar"
  name="John Doe"
  primary="John Doe"
  secondary="0803 123 4567 · Lagos"
  amount="₦ 5,250,000"
  divider
/>
```

**Figma DS node:** `ListItem / Row` — all 6 variants (product, invoice, customer, expense, team, settings)

### C02 — StatusBadge

```tsx
// src/components/StatusBadge.tsx
// 24px height, radius 80px, dot 6x6px
// Types: paid/approved/inStock, sent/active, draft/pending/partial, overdue/rejected/cancelled/outOfStock, lowStock/urgent

<StatusBadge type="paid" />       // green
<StatusBadge type="sent" />       // blue
<StatusBadge type="overdue" />    // red
<StatusBadge type="lowStock" />   // amber
<StatusBadge type="draft" />      // grey
```

### C03 — FilterTabBar

```tsx
// src/components/FilterTabBar.tsx
// Horizontal scroll, radius 80px tabs, #2323FF active, transparent inactive
// 32px tab height, 40px outer frame height

<FilterTabBar
  tabs={['All', 'In Stock', 'Low Stock', 'Out of Stock']}
  active={0}
  onChange={setActive}
/>
```

### C04 — Dropdown

```tsx
// src/components/Dropdown.tsx  
// Same proportions as TextInput — 48px height, radius 12px, 1px border
// Opens BottomSheet with ListItem options
// States: default, focused/open (border #2323FF), filled, disabled, error

<Dropdown
  label="Category"
  placeholder="Select category..."
  options={['Electronics', 'Fashion', 'Food & Beverage']}
  value={value}
  onChange={setValue}
/>
```

### C05 — BottomSheet

```tsx
// src/components/BottomSheet.tsx
// Radius 24px top-only, handle bar 40x4px, backdrop blur
// Heights: compact 240px, standard 375px, full 714px

<BottomSheet
  isOpen={open}
  onClose={() => setOpen(false)}
  height="standard"
  title="Payment Method"
>
  {/* ListItem rows */}
</BottomSheet>
```

### C06 — EmptyState

```tsx
// src/components/EmptyState.tsx
// Icon 64px + H3 title + Body/s subtitle + optional CTA button

<EmptyState
  type="noProducts"   // noProducts|noInvoices|noCustomers|noExpenses|offline|error|noResults
/>
```

### C07 — Switch

```tsx
// src/components/Switch.tsx
// 51x31px, iOS native proportions, thumb slides 20px, 200ms ease-in-out
// Always paired with label row — 48px tap target

<Switch label="This product has variants" value={val} onChange={setVal} />
```

### C08 — SectionHeader

```tsx
// src/components/SectionHeader.tsx
// Variant A (FormSection): Rokkitt SemiBold 14px, uppercase, optional bottom divider
// Variant B (ListGroup): Rokkitt 12px, uppercase, bg matches screen, optional trailing count

<SectionHeader variant="formSection" label="Basic Information" hasDivider />
<SectionHeader variant="listGroup" label="Today" trailingCount="3" />
```

---

## 4. COMPONENT LIBRARY (Tier 2 — Important)

### C09 — Avatar

```tsx
// Sizes: 32px (list), 40px (card), 64px (profile)
// States: initials (auto-colour from name), image, placeholder icon
// Colour mapped from first char of name

<Avatar name="John Doe" size={38} />
```

### C10 — Stepper

```tsx
// minus (−) + quantity (Oswald) + plus (+), disabled at min/max
<Stepper value={qty} min={1} max={20} onChange={setQty} />
```

### C11 — AmountDisplay

```tsx
// Oswald ONLY — Hero 38px, Standard 22px, Small 15px
// States: positive (#28AD1F), negative (#EF4444), neutral (#FFFFFF)
// Format: ₦ XX,XXX,XXX

<AmountDisplay value={4283750} size="hero" state="neutral" />
<AmountDisplay value={-125000} size="standard" state="negative" />
```

### C12 — SettingsRow

```tsx
// Leading icon + label + sub + trailing (chevron | toggle | value | badge)
// Danger variant: icon bg red tint, label red

<SettingsRow icon="shield" label="Two-Factor Auth" sub="Extra security" trailing="toggle" />
<SettingsRow icon="trash" label="Delete Account" sub="Permanent" trailing="chevron" danger />
```

### C13 — AlertBanner

```tsx
// Types: info (#4C4CFF), success (#28AD1F), warning (#FB923C), error (#EF4444)
// Dismissable with X button

<AlertBanner type="warning" title="Low stock" body="iPhone 13 Pro Max — 2 units left" onDismiss={() => {}} />
```

### C14 — ImageUpload

```tsx
// States: empty (dashed border), uploading (progress bar), filled (thumbnail + remove)

<ImageUpload onUpload={handleUpload} onRemove={handleRemove} state="empty" />
```

### C15 — RadioGroup

```tsx
// Radio circle 20x20px, selected shows inner 10x10px dot in #2323FF
// Always used as group, single selection

<RadioGroup
  options={[
    { id: 'starter', label: 'Starter', sub: 'Free forever' },
    { id: 'growth',  label: 'Growth',  sub: '₦ 5,000/mo', badge: 'Popular' },
  ]}
  value={plan}
  onChange={setPlan}
/>
```

---

## 5. TIER 3 COMPONENTS (Round-out)

- **StockIndicator** — Healthy/Low/Critical colour bands
- **SkeletonLoader** — shimmer on #1A1D24, matches ListItem silhouette
- **DatePicker** — bottom sheet, native calendar
- **Divider** — 1px #2D303B, between form sections
- **Tooltip** — for Progress Indicator (Kofi flagged Mar 5)
- **SegmentedControl** — Monthly/Yearly, Today/Week/Month
- **SwipeableRow** — wrapper on ListItem for swipe-to-reveal

---

## 6. ICON LIBRARY

All icons are Fluent UI icons at 24x24px, 2px stroke, colour `#9B9FAF` default.

**Existing (in DS):**
Home, CubeMultiple, DocumentPercent, Person, Add, Chevron, Copy, Settings, CloudOff, Alert, DataTrending

**Phase 3 additions needed:**
Receipt, PeopleTeam, PersonAdd, Tag/PriceTag, Camera, Filter, CalendarLTR, CheckmarkCircle, Delete/Trash, MoreHorizontal, ArrowDownload, Share, Wallet

---

## 7. NAVIGATION STRUCTURE

### Bottom Tab Bar (persistent, 76px)

| Tab | Icon | Route |
|-----|------|-------|
| Dashboard | Home | `/dashboard` |
| Services | CubeMultiple | `/services` |
| Taxes | DocumentPercent | `/taxes` |
| Account | Person | `/account` |

### FAB Quick Actions (expands upward from bottom-right)

1. Quick Sale → POS Terminal
2. Create Invoice → `/invoices/create`
3. Add Expense → `/expenses/add`
4. Add Customer → `/customers/add`
5. Scan Barcode → camera

---

## 8. SCREEN INVENTORY (35 screens)

### Onboarding (OB) — 8 screens
| ID | Screen | Status | Notes |
|----|--------|--------|-------|
| OB-01 | Splash | todo | Logo + tagline, 2s auto-advance |
| OB-02 | Welcome | todo | 3-slide carousel, value props, skip |
| OB-03 | Account Creation | todo | Name, email, phone, password |
| OB-04 | OTP Verification | todo | 6-digit input, auto-advance on 6th digit |
| OB-05 | Business Setup | todo | Name, type, industry, state, address — dropdowns open BottomSheet |
| OB-06 | Plan Selection | todo | RadioGroup with Starter/Growth/Enterprise |
| OB-07 | Payment Setup | todo | Optional, skip button → Quick Tour |
| OB-08 | Quick Tour | todo | 4-step overlay coach marks on live Dashboard |

### Dashboard (DB) — 1 screen
| ID | Screen | Status | Notes |
|----|--------|--------|-------|
| DB-01 | Dashboard Home | **done** | Needs refinement: sub-metrics in liquid card, performance grid, AI insight, quick tasks |

### Services (SV) — 19 screens
| ID | Screen | Status | Notes |
|----|--------|--------|-------|
| SV-01 | Services Hub | shell | 3×4 grid, grouped by tier, locked states for Growth/Pro |
| SV-02 | Products List | todo | FilterTabBar (All/In Stock/Low/Out), search |
| SV-03 | Add Product | todo | 8 form sections, variant toggle, barcode scan, image upload |
| SV-04 | Product Detail | todo | View/edit, stock history, StockIndicator |
| SV-05 | Invoices List | todo | Grouped by date, FilterTabBar (All/Draft/Sent/Paid/Overdue) |
| SV-06 | Create Invoice | todo | Customer picker, line items, totals, due date |
| SV-07 | Invoice Detail | todo | View, share PDF, record payment, WhatsApp/email |
| SV-08 | Customers List | todo | Search, avatar rows, outstanding balance trailing |
| SV-09 | Add Customer | todo | Name, phone, email, address, customer group |
| SV-10 | Customer Detail | todo | Profile, invoice history, quick actions (Invoice, Call, WA) |
| SV-11 | Expenses List | todo | Category filter, monthly total in header |
| SV-12 | Add Expense | todo | Category, amount, date, receipt scanner |
| SV-13 | Team List | todo | Role + status badge, invite action |
| SV-14 | Add Team Member | todo | RadioGroup for role, Switches for permissions |
| SV-15 | POS Terminal | todo | Scan/search products, cart, payment (Opay/Moniepoint) |
| SV-16 | FlexPay List | todo | Installment plans, Pending/Approved/Rejected |
| SV-17 | Purchase Orders | todo | PO list, linked to suppliers |
| SV-18 | Stock Count | todo | Barcode scan or manual, variance report |
| SV-19 | Returns (RMA) | todo | Return form, condition/reason dropdowns |

### Taxes (TX) — 5 screens
| ID | Screen | Status | Notes |
|----|--------|--------|-------|
| TX-01 | Taxes Hub | shell | Wallet balance, VAT card, WHT card, Bank Sync |
| TX-02 | Wallet / Bank Hub | todo | Connected accounts, Mono integration |
| TX-03 | VAT Report | todo | Monthly summary, 7.5% auto-calc, export |
| TX-04 | WHT Report | todo | Deductions, payment tracking, due date alerts |
| TX-05 | Financial Reports | todo | P&L, cash flow, balance sheet, date range, export PDF |

### Account (AC) — 8 screens
| ID | Screen | Status | Notes |
|----|--------|--------|-------|
| AC-01 | Account / Profile | shell | Avatar, name, business details |
| AC-02 | Profile Edit | todo | Edit name, photo, phone, email — ImageUpload for avatar |
| AC-03 | Business Settings | todo | Business name, address, tax ID, VAT toggle, WHT toggle |
| AC-04 | Subscription | todo | Current plan, upgrade, billing history, Paystack |
| AC-05 | Integrations | todo | Mono, Shipbubble, Opay, Moniepoint — connect/disconnect |
| AC-06 | Security | todo | Password, 2FA, login history, biometric toggle |
| AC-07 | Notifications | todo | Push/email/WhatsApp toggles per type |
| AC-08 | Support / Help | todo | FAQ, WhatsApp support, feedback form |

---

## 9. USER FLOWS (5 core)

### F1 — New User Onboarding
Splash → Welcome (3 slides) → Account Creation → OTP → Business Setup → Plan Selection → [paid? → Payment Setup] → Quick Tour → Dashboard

### F2 — Create & Send Invoice
Dashboard → FAB: Create Invoice → Select/Add Customer → Add Line Items → Set Due Date + Terms → Review → Send (WhatsApp / Email / PDF) → Track in Invoice List

### F3 — Quick Sale (POS)
Dashboard → FAB: Quick Sale → Scan barcode / search product → Add to cart + quantity → Payment method → Process (Cash/Card/Opay/Moniepoint) → Receipt → Auto-decrement inventory

### F4 — Add Product with Variants
Services → Products → Add Product → Basic Info → [has variants? → Variant builder] → Price per variant → Images → Stock levels → Save

### F5 — FlexPay Approval
Notification → FlexPay List → Request Detail → Review schedule → [pass credit check? → Approve : Reject + note] → Customer notified (push + WhatsApp) → Appears in Invoices as Installment

---

## 10. SUBSCRIPTION TIERS & FEATURE GATES

| Feature | Starter (Free) | Growth (₦5k/mo) | Enterprise (₦15k/mo) |
|---------|---------------|-----------------|----------------------|
| Products | 100 max | Unlimited | Unlimited |
| Invoices | 50/mo | Unlimited | Unlimited |
| Customers | ✓ | ✓ | ✓ |
| Expenses | ✓ | ✓ | ✓ |
| Team | 1 user | 3 users | 10 users |
| POS Terminal | — | ✓ (Opay/Moniepoint) | ✓ |
| Bank Sync (Mono) | — | ✓ | ✓ |
| FlexPay | — | ✓ | ✓ |
| Stock Count | — | ✓ | ✓ |
| Returns (RMA) | — | ✓ | ✓ |
| Receipt Scanner | — | ✓ | ✓ |
| WHT Report | — | ✓ | ✓ |
| Financial Reports | — | ✓ | ✓ |
| AI Insights | — | — | ✓ (Pro add-on) |
| Manufacturing/BOM | — | — | Enterprise only |
| Vendor Portal | — | — | Enterprise only |

Locked features show a lock icon overlay on the service grid card. Tapping opens an upgrade bottom sheet.

---

## 11. TAMAGUI CONVENTIONS (for Praise)

```tsx
// Theme setup
import { createTamagui, createTokens } from '@tamagui/core'

const tokens = createTokens({
  color: {
    bgPrimary: '#0A0A0C',
    surfDefault: '#1A1D24',
    surfElevated: '#2D303B',
    textPrimary: '#FFFFFF',
    textMuted: '#9B9FAF',
    actionPrimary: '#2323FF',
    // ... all tokens above
  },
  space: { sm: 8, md: 16, lg: 32 },
  radius: { sm: 8, md: 12, lg: 16, full: 80 },
})

// Font usage rule — enforce in code review
// ✅ Financial figures → Oswald
// ✅ Everything else → Rokkitt
// ❌ Never mix on same text element

// Amount display pattern
<Text fontFamily="$oswald" fontSize={22} color="$textPrimary">
  ₦ {formatAmount(value)}
</Text>

// Label pattern
<Text fontFamily="$rokkitt" fontSize={16} color="$textPrimary">
  {label}
</Text>
```

---

## 12. HANDOFF WORKFLOW

### Current (confirmed working)
1. **Claude** generates rendered React JSX artifact
2. **You** paste into Antigravity → instant visual at localhost:5173
3. **You** review visually, request changes
4. **Confirmed screen** → referenced in Figma annotation or Slack message to Praise
5. **Praise** implements in React Native + Tamagui → shows in Storybook Loom

### Optimised (next step)
1. **Claude** generates: (a) JSX artifact for Antigravity visual + (b) Tamagui component code for Praise
2. **You** paste JSX into Antigravity → verify
3. **Tamagui code** → paste into Slack → Praise implements directly (no re-implementation)
4. Skip Figma for most screens — only use Figma for DS component library

### File naming convention (Antigravity project)
```
src/
  screens/
    Dashboard.jsx       ← DB-01
    ProductsList.jsx    ← SV-02
    AddProduct.jsx      ← SV-03
    ...
  components/
    ListItem.jsx        ← C01
    StatusBadge.jsx     ← C02
    ...
  ds/
    tokens.js           ← All DS tokens
    NUKODES_DS.md       ← This file
```

---

## 13. DESIGN RULES (never break these)

1. **Background is always `#0A0A0C`** — never pure `#000000`
2. **Oswald for numbers only** — amounts, quantities, percentages, counts
3. **Rokkitt for all text** — labels, headings, buttons, body, placeholders
4. **Currency format: `₦ XX,XXX,XXX`** — space after ₦, commas, no decimals unless pence
5. **All buttons radius 80px** — fully pill-shaped, no exceptions
6. **Bottom tab bar is always 76px** — content padding-bottom always 80px
7. **Liquid glass card** — bg `linear-gradient(135deg, #060919, #0d1140)`, radius 28px, border `1px rgba(35,35,255,0.2)`
8. **Dark mode only** — no light mode variant currently planned
9. **Safe area** — 76px bottom for tab bar on all scrollable screens
10. **Status badges are always pill-shaped** — 24px height, 80px radius, matching bg/text/dot colour

---

*Last updated: March 2026 · Nukodes Phase 3*
