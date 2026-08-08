import { Filter, LayoutGrid, ListFilter, SlidersHorizontal, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { FilterPanel } from "../components/property/FilterPanel";
import { PropertyGrid } from "../components/property/PropertyGrid";
import { SearchBar } from "../components/property/SearchBar";
import { Button } from "../components/ui/Button";
import { PROPERTIES } from "../data/properties";
import { usePropertyFilter } from "../hooks/usePropertyFilter";
import { ListingType, PropertyType } from "../types/property";

export function meta() {
  return [
    { title: "Search Luxury Properties | Haven Real Estate" },
    { name: "description", content: "Filter and search prime luxury properties for sale and rent across London, Manchester, Edinburgh, Amsterdam, and Lisbon." },
  ];
}

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse URL search parameters
  const initialParams = useMemo(() => {
    const listingType = searchParams.get("listingType") as ListingType | null;
    const city = searchParams.get("city") || "all";
    const propertyType = searchParams.get("propertyType") as PropertyType | null;
    const q = searchParams.get("q") || "";

    return {
      listingType: listingType || "all",
      city: city,
      propertyType: propertyType || "all",
      searchQuery: q,
    };
  }, [searchParams]);

  const {
    filters,
    updateFilter,
    resetFilters,
    toggleFeature,
    filteredProperties,
    activeFilterCount,
  } = usePropertyFilter(PROPERTIES, initialParams);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Banner */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Property Discovery
        </h1>
        <p className="text-slate-500 text-sm">
          Browse luxury estates, period townhouses, and penthouses across prime international locations.
        </p>
      </div>

      {/* Top Search Bar */}
      <SearchBar
        initialListingType={filters.listingType === "all" ? "sale" : filters.listingType}
        initialCity={filters.city}
        initialPropertyType={filters.propertyType}
        initialSearchQuery={filters.searchQuery}
        variant="compact"
      />

      {/* Results Header Bar: Filter Toggles & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-slate-200 pb-4">
        {/* Results Counter */}
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">
            {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Available
          </span>
          {activeFilterCount > 0 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {activeFilterCount} Active Filters
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden flex items-center gap-1.5"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
            <span>Filters ({activeFilterCount})</span>
          </Button>

          {/* Grid vs List View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              }`}
              title="List View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Tag Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active:</span>

          {filters.city !== "all" && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">
              City: {filters.city}
              <button onClick={() => updateFilter("city", "all")} className="hover:text-amber-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.listingType !== "all" && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">
              Intent: For {filters.listingType}
              <button onClick={() => updateFilter("listingType", "all")} className="hover:text-amber-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.propertyType !== "all" && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">
              Type: {filters.propertyType}
              <button onClick={() => updateFilter("propertyType", "all")} className="hover:text-amber-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.bedrooms !== "any" && (
            <span className="inline-flex items-center gap-1 text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">
              Beds: {filters.bedrooms}+
              <button onClick={() => updateFilter("bedrooms", "any")} className="hover:text-amber-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.features.map((feat) => (
            <span key={feat} className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-medium">
              {feat}
              <button onClick={() => toggleFeature(feat)} className="hover:text-amber-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout (Desktop 2-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterPanel
            filters={filters}
            onUpdateFilter={updateFilter}
            onToggleFeature={toggleFeature}
            onResetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        </aside>

        {/* Results Property Grid */}
        <main className="lg:col-span-9">
          <PropertyGrid
            properties={filteredProperties}
            viewMode={viewMode}
            onResetFilters={resetFilters}
          />
        </main>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full overflow-y-auto p-4 animate-in slide-in-from-right duration-300">
            <FilterPanel
              filters={filters}
              onUpdateFilter={updateFilter}
              onToggleFeature={toggleFeature}
              onResetFilters={resetFilters}
              activeFilterCount={activeFilterCount}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
