# Haven Real Estate Application - Architecture & Design System Documentation

## Overview
Haven is a modern, high-performance property discovery web application built with **React Router v7 (Framework Mode)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. It combines sleek luxury aesthetic with functional property search across the UK, Europe, and the US.

---

## Design System & UI/UX Architecture

### 1. Tonal Warm-Neutral Surface Hierarchy
Haven avoids harsh pure white contrast and heavy borders, using a warm-neutral palette:
- **Canvas / Page Background**: Soft warm off-white (`#faf9f6` / `var(--color-canvas)`)
- **Primary Content Surfaces & Cards**: Crisp clean white (`#ffffff` / `var(--color-surface)`) with subtle warm borders (`#e5e3dd`)
- **Secondary Track & Recessed Elements**: Warm-neutral tone (`#f3f2ee` / `#eeebe4`) with recessed inset wells (`shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)]`)
- **Dark Accent Surfaces**: Slate 950 (`bg-slate-950`) with gold amber accents (`#f59e0b` / `text-amber-400`)

### 2. Dechunking Split-Pill Floating Navbar
The floating header dynamically adapts based on page context and scroll position:
- **Homepage Mode (`isHomePage`)**: Remains a unified centered floating capsule pill (`max-w-6xl mx-auto rounded-full backdrop-blur-xl`) with section-aware theme contrast (white mode over dark hero/sections, dark slate over light sections).
- **Inner Pages Scroll Mode (`!isHomePage && isScrolled`)**: Automatically "dechunks" into 3 separate detached floating pills across the viewport boundaries:
  - **Left Pod**: Logo mark + Haven wordmark (`bg-slate-950/95 border-slate-800 text-white`).
  - **Center Pod**: Top-docked (`-top-2 sm:-top-3 rounded-b-2xl rounded-t-md`) transparent glass track (`bg-slate-950/40 backdrop-blur-md border-white/20`) featuring small compact icon buttons with **butter-smooth gliding hover text expansion** (`cubic-bezier(0.16,1,0.3,1)`).
  - **Right Pod**: Wishlist heart + Enquire CTA button (`bg-slate-950/95 border-slate-800 text-white`).

### 3. Custom Popover Select Components (`CustomSelect.tsx`)
Replaces raw HTML `<select>` elements with custom, accessible popover dropdowns:
- Styled with warm-neutral surfaces (`bg-[#f8f7f4] border-[#e5e3dd]`), prefix icons (`MapPin`, `Home`, `Bed`, `Tag`), active checkmarks (`Check`), and animated popovers (`animate-in fade-in-50 zoom-in-95`).
- Used across `SearchBar`, `FilterPanel`, and `Properties` sorting.

### 4. Floating Action & Chat Widget (`FloatingChatWidget.tsx`)
Positioned fixed in the bottom-right corner (`fixed bottom-5 right-5`):
- **WhatsApp Button**: Official emerald green vector WhatsApp brand button (`#25D366`) with animated online indicator, gliding hover label `"WhatsApp Us"`, opening direct WhatsApp click-to-chat.
- **Live Chat Button**: Dark glass pill (`bg-slate-950/95 border-slate-800 text-white`) with gold message icon (`text-amber-400`), gliding hover label `"Live Chat"`, opening the Quick Enquiry Modal.

### 5. Smooth Route Page Transitions (`PageTransition.tsx`)
Integrated in `root.tsx` using Framer Motion (`AnimatePresence` + `motion.div`):
- Executes a 350ms fade & slide-up animation (`opacity: 0 ➔ 1`, `y: 12px ➔ 0px`) with custom spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`) on every route change.

---

## Data & Region Architecture

### 1. Dual-Region Dataset Switch (UK & US)
Supports environment-based switching between United Kingdom & Europe datasets and USA datasets:
- **Environment Toggle (`.env`)**: `VITE_REGION=US` or `VITE_REGION=UK`.
- **Global Config (`app/config/dataRegionConfig.ts`)**: Loads active region with explicit global fallback (`REGION_FALLBACK = "UK"`).
- **Datasets**:
  - `UK_PROPERTIES` (`app/data/properties.ts`): London, Manchester, Edinburgh, Bristol, Amsterdam, Lisbon (£ GBP).
  - `US_PROPERTIES` (`app/data/properties.us.ts`): New York, Los Angeles, Miami, Austin, San Francisco ($ USD).
- **Dynamic Formatters**: `formatCurrency` and `SearchBar` popular city shortcuts adapt automatically to the active region configuration.

---

## Directory Structure
- `app/`: React Router v7 routes & core entrypoints (`root.tsx`, `routes.ts`, `routes/*`)
- `app/config/`: Region data toggle configuration (`dataRegionConfig.ts`)
- `app/components/`: Reusable presentational & container components
  - `layout/`: `Navbar`, `Footer`, `FloatingChatWidget`
  - `ui/`: `Button`, `CustomSelect`, `PageTransition`, `Modal`, `Badge`, `Skeleton`
  - `property/`: `PropertyCard`, `PropertyGrid`, `PropertyGallery`, `SearchBar`, `FilterPanel`, `SimilarProperties`, `FloorPlanPreview`
  - `agent/`: `AgentCard`
  - `location/`: `LocationCard`
  - `modals/`: `EnquiryModal`
- `app/context/`: Context providers for Saved Properties wishlist
- `app/hooks/`: Custom hooks for filtering, sorting, state persistence
- `app/data/`: `properties.ts` (UK dataset), `properties.us.ts` (US dataset), `agents.ts`, `locations.ts`
- `app/types/`: TypeScript definitions (`property.ts`, `agent.ts`, `filter.ts`)
- `app/utils/`: Formatting helpers (`formatters.ts`, `cn.ts`)

---

## Key Routes
- `/` - Homepage (Search hero, region shortcuts, featured properties, location hubs, recently added homes)
- `/properties` - Property Discovery Hub (Filter drawer/sidebar, CustomSelect sorting, list/grid view toggle)
- `/properties/:id` - Property Detail View (Gallery lightbox, specs, features, agent widget, viewing enquiry modal)
- `/agents/:id` - Agent Profile View (Bio, contact info, agent listings)
- `/saved` - Local Wishlist Page (Saved properties shortlist)
- `/about` - Platform Mission & Capabilities

---

## Attribution & Credits
- **Designed & Built by**: `NeoInfinity` (credited in Footer attribution badge).
