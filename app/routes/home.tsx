import {
  ArrowRight,
  Building,
  Building2,
  CheckCircle2,
  Compass,
  Filter,
  Heart,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { LocationCard } from "../components/location/LocationCard";
import { PropertyCard } from "../components/property/PropertyCard";
import { SearchBar } from "../components/property/SearchBar";
import { Button } from "../components/ui/Button";
import { LOCATIONS } from "../data/locations";
import { PROPERTIES } from "../data/properties";

export function meta() {
  return [
    { title: "Haven | Property Discovery Platform in UK & Europe" },
    {
      name: "description",
      content: "Search properties for sale and rent across London, Manchester, Edinburgh, Amsterdam, and Lisbon.",
    },
  ];
}

export default function HomePage() {
  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 6);
  const recentProperties = PROPERTIES.slice(6, 12);
  const rentCount = PROPERTIES.filter((p) => p.listingType === "rent").length;

  return (
    <div className="space-y-16 pb-16 bg-[#faf9f6]">
      {/* 1. PRODUCT HERO SECTION */}
      <section data-theme="dark" className="relative bg-slate-950 text-white -mt-[72px] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Subtle Image & Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Haven Real Estate Background"
            className="w-full h-full object-cover object-center opacity-60 filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/65 to-slate-950" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Property Discovery Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find your next home in the <span className="text-amber-300">UK & Europe</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Search thousands of verified properties for sale and rent across London, Manchester, Edinburgh, Amsterdam, and Lisbon.
          </p>

          {/* Prominent Search Component */}
          <div className="max-w-4xl mx-auto pt-2 text-left">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Location Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Popular Cities:</span>
            {["London", "Manchester", "Edinburgh", "Amsterdam", "Lisbon"].map((city) => (
              <Link
                key={city}
                to={`/properties?city=${city}`}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors border border-white/10 font-medium"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SHORTCUTS (Tonal secondary section background #f3f2ee) */}
      <section className="bg-[#f3f2ee] py-10 border-y border-[#e5e3dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/properties?propertyType=apartment"
              className="bg-white rounded-2xl border border-[#e5e3dd] p-5 hover:shadow-md hover:border-[#d6d3cb] transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  Apartments
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {PROPERTIES.filter((p) => p.propertyType === "apartment").length} listings
                </p>
              </div>
            </Link>

            <Link
              to="/properties?propertyType=house"
              className="bg-white rounded-2xl border border-[#e5e3dd] p-5 hover:shadow-md hover:border-[#d6d3cb] transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  Family Houses
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {PROPERTIES.filter((p) => p.propertyType === "house").length} listings
                </p>
              </div>
            </Link>

            <Link
              to="/properties?propertyType=townhouse"
              className="bg-white rounded-2xl border border-[#e5e3dd] p-5 hover:shadow-md hover:border-[#d6d3cb] transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  Townhouses
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {PROPERTIES.filter((p) => p.propertyType === "townhouse").length} listings
                </p>
              </div>
            </Link>

            <Link
              to="/properties?listingType=rent"
              className="bg-white rounded-2xl border border-[#e5e3dd] p-5 hover:shadow-md hover:border-[#d6d3cb] transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                <KeyIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                  Property Rentals
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{rentCount} rentals</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Handpicked Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              Featured Properties
            </h2>
          </div>
          <Link to="/properties">
            <Button variant="outline" size="sm" className="border-[#e5e3dd] hover:bg-[#f8f7f4]">
              <span>View All Properties ({PROPERTIES.length})</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR LOCATIONS SECTION */}
      <section data-theme="dark" className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Explore Destinations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 tracking-tight">
                Browse by Location
              </h2>
            </div>
            <Link to="/properties" className="text-xs text-amber-300 hover:text-white font-semibold flex items-center gap-1">
              <span>Search across all cities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECENTLY ADDED LISTINGS (Tonal section #f3f2ee) */}
      <section className="bg-[#f3f2ee] py-14 border-y border-[#e5e3dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Fresh Inventory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
                Recently Added Homes
              </h2>
            </div>
            <Link to="/properties?sortBy=newest">
              <Button variant="outline" size="sm" className="bg-white border-[#e5e3dd] hover:bg-[#f8f7f4]">
                <span>See Newest First</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PLATFORM CAPABILITIES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e5e3dd] p-8 sm:p-10 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold mb-3">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Filtering</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Filter by location, intent (buy or rent), max price, bedrooms, and specific amenities to instantly narrow down your search.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Saved Properties Wishlist</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Save your favourite listings with one click. Your shortlist is automatically stored locally in your browser for quick review.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] text-amber-800 border border-[#e5e3dd] flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Direct Viewing Enquiries</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Request viewings or send enquiries directly to verified listing agents with preferred dates and instant reference IDs.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-theme="dark" className="bg-slate-900 text-white rounded-3xl p-10 sm:p-12 text-center space-y-5 relative overflow-hidden border border-slate-800 shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start browsing properties now
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore available homes for sale and rent across London, Manchester, Edinburgh, Amsterdam, and Lisbon.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/properties">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold">
                  <span>Explore All Listings</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3" />
    </svg>
  );
}
