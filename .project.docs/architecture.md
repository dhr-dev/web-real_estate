# Haven Real Estate Application - Architecture Documentation

## Overview
Haven is a modern, property discovery web application built with **React Router v7 (Framework Mode)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Product Positioning
- **Focus**: Search & property discovery for buyers and renters across the UK and Europe.
- **Visual Aesthetic**: Clean, modern, confident sans-serif typography (`Inter`) with generous whitespace, refined cards, high-quality property imagery, and responsive interaction design.

## Tech Stack
- **Framework**: React Router v7 in Framework Mode (with SSR enabled via `react-router.config.ts` and `@react-router/node`)
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **Typography**: Inter (consistent for body text and headings)
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`
- **State Management**: React Context (`SavedPropertiesContext`) + localStorage persistence + search/filter URL parameters

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
- `app/data/`: Realistic property dataset (20 properties ranging from £285k - £1.8M and rentals), agent profiles, location hubs
- `app/types/`: TypeScript definitions (`property.ts`, `agent.ts`, `filter.ts`)
- `app/utils/`: Formatting helpers (currency £/$/€, area formatting, date formatting, class merging)

## Key Routes
- `/` - Homepage (Product-first search hero, category shortcuts, featured properties, location hubs, recently added homes)
- `/properties` - Interactive search & filter page (Live filtering by city, intent, type, bedrooms, max price, amenities; list/grid view toggle)
- `/properties/:id` - Property detail view (Gallery lightbox, specs, features, agent widget, viewing enquiry modal, floor plan, similar properties)
- `/agents/:id` - Agent profile view (Bio, contact info, agent listings)
- `/saved` - Local wishlist page (Saved properties list, empty state)
- `/about` - Platform mission & search capabilities
