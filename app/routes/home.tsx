import { ArrowRight, Award, Building, Compass, ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { AgentCard } from "../components/agent/AgentCard";
import { LocationCard } from "../components/location/LocationCard";
import { PropertyCard } from "../components/property/PropertyCard";
import { SearchBar } from "../components/property/SearchBar";
import { Button } from "../components/ui/Button";
import { AGENTS } from "../data/agents";
import { LOCATIONS } from "../data/locations";
import { PROPERTIES } from "../data/properties";

export function meta() {
  return [
    { title: "Haven | Premium Real Estate Discovery in UK & Europe" },
    { name: "description", content: "Explore luxury prime properties, townhouses, penthouses, and country estates across London, Manchester, Edinburgh, Amsterdam, and Lisbon." },
  ];
}

export default function HomePage() {
  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 6);
  const editorialPick = PROPERTIES.find((p) => p.editorialPick);
  const featuredAgents = AGENTS.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        {/* Background Editorial Architectural Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Haven Prime Luxury Architecture"
            className="w-full h-full object-cover object-center opacity-35 scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Prime Real Estate Across UK & Europe</span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Find a place that <br className="hidden sm:inline" />
            <span className="italic text-amber-200 font-normal">feels like home.</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Curated architectural masterworks, period townhouses, and waterside penthouses for discerning buyers and renters.
          </p>

          {/* Integrated Search Bar */}
          <div className="max-w-4xl mx-auto pt-2 text-left">
            <SearchBar variant="hero" />
          </div>

          {/* Quick Location Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Popular Hubs:</span>
            {["London", "Manchester", "Edinburgh", "Amsterdam", "Lisbon"].map((city) => (
              <Link
                key={city}
                to={`/properties?city=${city}`}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors border border-white/10"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST STATISTICS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center pt-4 md:pt-0">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              £1.8B+
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              Properties Listed
            </span>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              99.2%
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              Client Satisfaction
            </span>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              15+
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              European Prime Markets
            </span>
          </div>

          <div className="text-center pt-4 md:pt-0">
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              4.9 / 5
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">
              Advisory Rating
            </span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Handpicked Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
              Featured Residences
            </h2>
          </div>
          <Link to="/properties">
            <Button variant="outline" size="md">
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
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Explore Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Prime Cities & Coastal Hubs
            </h2>
            <p className="text-slate-400 text-sm">
              Discover prime real estate markets across the UK, Netherlands, and Portugal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL SPOTLIGHT SECTION */}
      {editorialPick && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-900/10 via-slate-900 to-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  <Sparkles className="w-3.5 h-3.5" /> Editorial Choice of the Month
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {editorialPick.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {editorialPick.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-bold">Asking Price</span>
                  <span className="text-2xl font-extrabold text-white">
                    £{new Intl.NumberFormat("en-GB").format(editorialPick.price)}
                  </span>
                </div>
                <Link to={`/properties/${editorialPick.id}`}>
                  <Button variant="secondary" size="lg">
                    <span>Explore Architectural Details</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <img
                src={editorialPick.images[0]}
                alt={editorialPick.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 6. TRUSTED AGENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Expert Advisory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Meet Our Prime Partners
          </h2>
          <p className="text-slate-500 text-sm">
            Dedicated specialists with deep local knowledge in high-end UK and European markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 relative overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to find your Haven?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse our complete catalog of prime residential estates or schedule a consultation with an advisor today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/properties">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <span>Browse All Properties</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800">
                  <span>Read Haven Story</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
