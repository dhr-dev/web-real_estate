Build a polished, production-quality **real estate property discovery web application** called **Haven**.

## Purpose

This is a **portfolio showcase project** created by a software development company targeting freelance clients primarily in the **US, UK and Europe**.

The goal is to demonstrate that we can design and develop a modern, responsive **real-estate web application**, rather than merely creating a static marketing website.

This is currently a frontend showcase. Do NOT build a backend, database, authentication system, payment system, admin panel, real booking system, or external API integration.

Use realistic mock/static data throughout the application.

However, structure the frontend and components cleanly so that the application could later be extended into a real production system if a client asks for it.

## Product concept

Haven is a premium property discovery platform where users can:

* Search for properties
* Browse properties for sale or rent
* Filter results
* View property details
* Explore property images
* View agent information
* Request a viewing / make an enquiry
* Save properties visually
* Explore properties by location

The product should feel like a genuine modern property platform that could eventually become a full-stack application.

## Target audience

Design primarily for:

* UK property buyers and renters
* US property buyers and renters
* European property markets

Use Western-style fictional data, names and addresses.

Do NOT use Indian names, addresses, ₹ pricing, Indian phone numbers, or India-specific UI patterns.

Use realistic currencies such as £, $, and € where appropriate. For the initial product, use GBP and focus the primary visual identity around the UK market, while keeping the design internationally suitable.

Example fictional locations:

* London
* Manchester
* Edinburgh
* Bristol
* Birmingham
* Amsterdam
* Lisbon
* Berlin

Do not imply that the properties or company are real.

## Visual direction

The application should feel:

* Premium
* Modern
* Sophisticated
* Trustworthy
* Minimal
* Editorial
* High-end but approachable

Avoid the generic "template website" appearance.

Think of a modern European/UK property startup rather than a traditional estate-agent website.

Use strong typography, generous whitespace, excellent image presentation, subtle borders, refined cards, restrained shadows and tasteful micro-interactions.

Do NOT overuse gradients, glassmorphism, excessive animations, huge rounded cards, or flashy effects.

The interface should look like something a serious funded startup could launch.

## Brand

Name: Haven

Possible tagline:

"Find a place that feels like home."

Create a simple, elegant wordmark/logo treatment using the application's typography or a minimal icon.

Do not use an existing real-estate company's branding.

## Main application structure

Create the following routes/pages:

### 1. Homepage `/`

The homepage should immediately communicate that Haven is a property discovery platform.

Include:

* Elegant navigation
* Haven branding
* Buy / Rent selector
* Large property search interface
* Location input
* Property type
* Price range
* Search button
* Featured properties
* Popular locations
* A curated editorial/property section
* Short explanation of the platform
* Agent / buyer trust section
* Strong CTA
* Footer

The hero should be visually impressive and property-focused.

Do not make it look like a generic SaaS landing page.

### 2. Property search `/properties`

Create a realistic search/results experience.

Include:

* Search bar
* Buy / Rent toggle
* Location
* Property type
* Price range
* Bedrooms
* More filters
* Sorting
* Property result count
* Property cards
* Save/favourite interaction
* Pagination or load-more interaction

On desktop, use a sophisticated two-column layout where appropriate.

Property cards should include:

* High-quality image
* Price
* Property type
* Bedrooms
* Bathrooms
* Approximate area
* Location
* Short metadata
* Favourite button

Make filtering interactive on the frontend using the mock dataset.

### 3. Property details `/properties/[id]`

Create a highly polished property detail page.

Include:

* Large image gallery
* Property title
* Price
* Location
* Bedrooms
* Bathrooms
* Area
* Description
* Key features
* Property highlights
* Floor-plan placeholder/visual area if appropriate
* Agent information
* Contact/enquiry CTA
* Request a viewing CTA
* Similar properties

The property detail page should be one of the strongest showcase screens in the entire project.

### 4. Agent profile `/agents/[id]`

Include:

* Agent photo
* Name
* Role
* Agency
* Location
* About
* Contact information
* Properties listed by the agent
* Contact agent CTA

### 5. Saved properties `/saved`

Create a frontend-only saved properties experience.

Users should be able to click the heart/favourite button and see properties appear here.

No authentication is required.

Persist the state locally if practical.

### 6. Enquiry / viewing interaction

Create a polished frontend modal or dedicated flow for:

* Requesting a viewing
* Contacting an agent
* Sending an enquiry

Fields can include:

* Name
* Email
* Phone
* Preferred date
* Message

Submission does not need to reach a backend.

Show a convincing success state after submission.

## Mock data

Create a well-structured mock property dataset with approximately 15–25 properties.

Each property should contain realistic fields such as:

* id
* title
* price
* currency
* location
* city
* postcode
* property type
* listing type
* bedrooms
* bathrooms
* area
* description
* features
* images
* agent
* featured status

Use realistic but fictional property information.

Do not use obviously fake placeholder content such as "Lorem ipsum", "Property 1", "John Doe", etc.

## Images

Use high-quality property imagery suitable for a premium real-estate application.

Images should feel cohesive in lighting and style.

Avoid obviously AI-generated-looking or low-quality stock imagery.

Use an image service or appropriate remote image URLs if necessary, but structure the code so images can easily be replaced later.

## Responsive design

This is extremely important.

The application must look excellent on:

* Desktop
* Laptop
* Tablet
* Mobile

Do not simply shrink the desktop layout.

Create intentional mobile layouts for:

* Navigation
* Search
* Filters
* Property cards
* Image galleries
* Property details
* Enquiry forms

The mobile experience should feel like a real product.

## Interactions

Implement useful frontend interactions:

* Search
* Property filtering
* Sorting
* Favourite/save
* Image gallery
* Tabs where appropriate
* Modal interactions
* Form validation
* Mobile navigation
* Smooth hover states
* Sensible transitions

Everything should work without requiring a backend.

## Technical requirements

## Technical requirements

Use:

- React
- React Router v7 (Framework Mode)
- TypeScript
- Tailwind CSS
- Server-side rendering (SSR) where it provides value, particularly for public-facing pages and property content
- Component-based architecture

Keep the implementation reasonably clean and componentized, but do not over-engineer the project. Use local/mock data and keep the application frontend-only.
### Libraries

Use well-maintained, established libraries where they provide clear value.

Do not reinvent common UI/UX functionality from scratch.

Libraries may be used for things such as:

- Icons
- UI components
- Forms and validation
- Date handling
- Image galleries/carousels
- Animations
- Utility functions

Prefer lightweight libraries and avoid adding dependencies without a clear purpose.

Create reusable components for things such as:

* Navbar
* SearchBar
* FilterPanel
* PropertyCard
* PropertyGrid
* PropertyGallery
* AgentCard
* LocationCard
* EnquiryModal
* Button
* Form controls
* Footer

Keep business/data logic separated from presentational components wherever practical.

Avoid putting large amounts of mock data directly inside page components.

## UX requirements

Prioritize:

* Excellent visual hierarchy
* Clear CTAs
* Fast-feeling interactions
* Accessible controls
* Keyboard-friendly forms
* Good empty states
* Good loading/skeleton states where useful
* Proper responsive behaviour
* Sensible hover/focus states

Do not sacrifice usability for visual effects.

## Important scope constraint

Do NOT build:

* Backend
* Database
* Authentication
* User registration
* Admin dashboard
* Payment processing
* Real property APIs
* Real booking infrastructure
* Email/SMS integration

These are intentionally excluded from this portfolio version.

The application should instead provide convincing frontend representations of these workflows where useful, while keeping all data local/mock.

## Portfolio quality requirement

This should NOT look like a tutorial project.

It should look like a **real commercial product prototype** that a freelance client could look at and immediately understand:

"We could use this team to build our property platform."

Every screen should be polished enough to use as a portfolio screenshot.

Before finishing, review the entire application visually and fix:

* Generic-looking sections
* Inconsistent spacing
* Poor typography
* Weak mobile layouts
* Repetitive components
* Placeholder-looking content
* Unnecessary animations
* Broken interactions
* Visual inconsistencies

Prioritize polish and perceived quality over adding unnecessary features.

Start by establishing the design system, application structure, mock data model and core reusable components, then implement the pages and interactions.


## Critical implementation principle

This must be a **functional frontend application**, not a static visual mockup or Dribbble-style concept.

Any interactive element presented to the user should actually work on the frontend using local/mock data.

For example:

- Search should actually filter properties.
- Buy/Rent should actually change the results.
- Filters should actually affect the property list.
- Sorting should work.
- Favourite buttons should save/remove properties.
- Saved properties should appear on the Saved page.
- Property cards should navigate to real property detail pages.
- Image galleries should be interactive.
- Enquiry/viewing forms should validate input and show a successful submission state.
- Mobile navigation should work.
- Empty states should work.

Do not create buttons, filters, tabs, forms or navigation elements merely for visual appearance.

Backend functionality is intentionally excluded, but the frontend experience should behave like a real application.

## Development approach

Work autonomously through the entire project in phases without waiting for user approval between phases.

Suggested phases:

1. Project setup, architecture and design system
2. Mock data and reusable components
3. Homepage
4. Property search and filtering
5. Property detail and image gallery
6. Agent profiles and saved properties
7. Enquiry/viewing flows
8. Responsive/mobile implementation
9. Visual polish and UX refinement
10. Final testing and cleanup

Do not stop after completing a phase unless blocked by a genuine technical issue.

Do not spend excessive effort building features outside the defined scope.

Prefer a complete, polished application over unnecessary complexity.

## Final quality review

Before considering the project complete, run and inspect the application as a real user.

Check:

- All routes work
- No broken links
- No console errors
- No obvious layout issues
- Search/filtering works
- Favourites work
- Forms work
- Images load correctly
- Mobile navigation works
- Responsive layouts work
- No placeholder content remains
- Typography and spacing are consistent
- The application feels like one coherent product

Fix issues you identify before finishing.

The final result should be something we can immediately demonstrate to a potential freelance client.