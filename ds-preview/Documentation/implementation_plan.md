# Finalizing App Shell and Verification

We have successfully refactored the design system and built the mobile app screens. The final step is to provide a way to switch between the Component Reference and the Mobile App.

## Proposed Changes

### Entry Point
#### [MODIFY] [main.jsx](file:///Users/Adedayo/.gemini/antigravity/scratch/ds-preview/src/main.jsx)
- Update to import both `App` (DS Reference) and `NukodesApp` (Mobile App).
- Implement a simple persistent shell that allows toggling between the two views.

## Verification Plan

### Manual Verification
1.  Open the application in the browser.
2.  Switch between "Component Reference" and "Mobile App" using the toggle in the shell.
3.  In "Component Reference":
    - Verify all 16 components render correctly and are interactive (e.g., steppers, alerts).
4.  In "Mobile App":
    - Navigate through all 5 tabs (Dashboard, Products, Invoices, Customers, Settings).
    - Toggle Light/Dark mode in Settings and verify tokens update correctly.
    - Check interactivity (e.g., Product search, Invoice filtering, Settings toggles).
