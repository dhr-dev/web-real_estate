import { Award, Building2, Compass, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";

export function meta() {
  return [
    { title: "About Haven | Editorial Real Estate Advisory" },
    { name: "description", content: "Learn about Haven't philosophy in curating prime residential real estate across London, UK, and Continental Europe." },
  ];
}

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Hero */}
      <section className="relative bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Haven Editorial"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            Our Architectural Vision
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Crafting the future of <br />
            <span className="italic text-amber-200">editorial real estate.</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Haven was founded on a simple conviction: finding a home should feel like discovering a piece of art.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Architectural Rigor</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every property on Haven undergoes rigorous aesthetic evaluation — prioritizing proportion, light, and architectural integrity over generic square footage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Cross-Border Seamlessness</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We bridge prime markets in London, Manchester, Edinburgh, Amsterdam, and Lisbon with uniform international legal and advisory support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Uncompromising Discretion</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Serving private clients, institutional funds, and international buyers with complete privacy and tailored viewing management.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
