import { Heart, Home, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { PropertyGrid } from "../components/property/PropertyGrid";
import { Button } from "../components/ui/Button";
import { PROPERTIES } from "../data/properties";
import { useSavedProperties } from "../context/SavedPropertiesContext";

export function meta() {
  return [
    { title: "Saved Properties | Haven Real Estate Wishlist" },
    { name: "description", content: "View your saved prime luxury real estate listings and portfolio favorites." },
  ];
}

export default function SavedPropertiesPage() {
  const { savedIds, toggleSave } = useSavedProperties();

  const savedProperties = PROPERTIES.filter((p) => savedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-600" />
            <span>Saved Portfolio Wishlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Saved Properties ({savedProperties.length})
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your saved shortlist of prime architectural residences and luxury rentals.
          </p>
        </div>

        {savedProperties.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Are you sure you want to clear your saved properties wishlist?")) {
                savedIds.forEach((id) => toggleSave(id));
              }
            }}
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Saved List</span>
          </Button>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 sm:p-16 text-center space-y-4 max-w-xl mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Your wishlist is currently empty</h3>

          <p className="text-slate-500 text-sm leading-relaxed">
            Click the heart icon on any property card or detail page to save properties here for quick review.
          </p>

          <div className="pt-2">
            <Link to="/properties">
              <Button variant="primary" size="md">
                <Home className="w-4 h-4 text-amber-400" />
                <span>Explore Available Properties</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <PropertyGrid properties={savedProperties} />
      )}
    </div>
  );
}
