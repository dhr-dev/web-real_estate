import { Award, Building2, Compass, Globe2, ShieldCheck, Sparkles, Search, SlidersHorizontal, Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";

export function meta() {
  return [
    { title: "About Haven | Modern Property Discovery Platform" },
    { name: "description", content: "Learn how Haven helps buyers and renters find properties across London, Manchester, Edinburgh, Amsterdam, and Lisbon." },
  ];
}

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Product Hero */}
      <section className="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Haven Platform"
            className="w-full h-full object-cover opacity-55 filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/70 to-slate-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            About The Platform
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Simplifying property discovery <br />
            <span className="text-amber-300">across the UK & Europe.</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Haven combines intuitive search controls, clear property data, and verified listing contacts to make finding your next home straightforward and enjoyable.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Smart Search</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Filter properties by intent (sale or rent), city, property type, price cap, and key features to quickly find matches that fit your budget and lifestyle.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Multi-City Coverage</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore property inventory in major urban centers including London, Manchester, Edinburgh, Amsterdam, and Lisbon with consistent data format.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Personal Shortlists</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Save your favourite listings to your personal browser wishlist and request viewings directly from property detail pages.
            </p>
          </div>
        </div>

        {/* Start Searching CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to find your next home?
          </h2>
          <Link to="/properties" className="inline-block pt-2">
            <Button variant="secondary" size="md">
              Start Searching Properties
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
