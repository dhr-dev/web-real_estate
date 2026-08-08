# Haven Real Estate Application - Architecture Documentation

## Overview
Haven is a premium real-estate property discovery application built with **React Router v7 (Framework Mode)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack
- **Framework**: React Router v7 in Framework Mode (with SSR enabled via `react-router.config.ts` and `@react-router/node`)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`
- **State Management**: React Context (`SavedPropertiesContext`) + localStorage persistence + search/filter URL parameters & state

## Directory Structure
- `app/`: React Router v7 routes & core entrypoints (`root.tsx`, `routes.ts`, `routes/*`)
- `app/components/`: Reusable presentational & container components
  - `layout/`: `Navbar`, `Footer`, `MobileNav`
  - `ui/`: `Button`, `Modal`, `Badge`, `Skeleton`
  - `property/`: `PropertyCard`, `PropertyGrid`, `PropertyGallery`, `SearchBar`, `FilterPanel`, `SimilarProperties`, `FloorPlanPreview`
  - `agent/`: `AgentCard`
  - `location/`: `LocationCard`
  - `modals/`: `EnquiryModal`
- `app/context/`: Context providers for Saved Properties wishlist
- `app/hooks/`: Custom hooks for filtering, sorting, state persistence
- `app/data/`: Structured mock property dataset (20 properties), agent profiles, location hubs
- `app/types/`: TypeScript definitions (`property.ts`, `agent.ts`, `filter.ts`)
- `app/utils/`: Formatting helpers (currency £/$/€, area formatting, date formatting, class merging)

## Key Routes
- `/` - Homepage (Hero search, featured properties, popular locations, editorial spotlights, trust statistics)
- `/properties` - Interactive search & filter page (Live filtering, sorting, grid/list toggle, active pill tags)
- `/properties/:id` - High-detail property view (Gallery, features, agent widget, enquiry trigger, floor plan, similar properties)
- `/agents/:id` - Agent profile view (Bio, contact info, agent listings)
- `/saved` - Local wishlist page (Saved properties list, empty state)
