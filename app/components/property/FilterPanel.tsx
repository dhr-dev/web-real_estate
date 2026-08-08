import { Check, Filter, RotateCcw, X } from "lucide-react";
import React from "react";
import { PropertyFilterState, SortOption } from "../../types/filter";
import { ListingType, PropertyType } from "../../types/property";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

export interface FilterPanelProps {
  filters: PropertyFilterState;
  onUpdateFilter: <K extends keyof PropertyFilterState>(key: K, value: PropertyFilterState[K]) => void;
  onToggleFeature: (feature: string) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const AVAILABLE_FEATURES = [
  "Underfloor Heating",
  "Balcony / Terrace",
  "Concierge",
  "Garden",
  "Wine Cellar",
  "Pool",
  "Elevator",
  "Waterfront Views",
  "Exposed Brick",
  "Air Conditioning",
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdateFilter,
  onToggleFeature,
  onResetFilters,
  activeFilterCount,
  className,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif font-bold text-slate-900 text-lg">Filter Properties</h3>
          {activeFilterCount > 0 && (
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
          {isMobileDrawer && onCloseMobileDrawer && (
            <button onClick={onCloseMobileDrawer} className="p-1 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Listing Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Listing Intent
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(["all", "sale", "rent"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onUpdateFilter("listingType", type)}
              className={cn(
                "py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer",
                filters.listingType === type
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {type === "all" ? "All" : `For ${type}`}
            </button>
          ))}
        </div>
      </div>

      {/* 2. City Location */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          City / Location
        </label>
        <select
          value={filters.city}
          onChange={(e) => onUpdateFilter("city", e.target.value)}
          className="w-full bg-slate-50 text-slate-900 text-sm font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">All Cities</option>
          <option value="London">London, UK</option>
          <option value="Manchester">Manchester, UK</option>
          <option value="Edinburgh">Edinburgh, UK</option>
          <option value="Bristol">Bristol, UK</option>
          <option value="Amsterdam">Amsterdam, Netherlands</option>
          <option value="Lisbon">Lisbon, Portugal</option>
        </select>
      </div>

      {/* 3. Property Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Property Type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => onUpdateFilter("propertyType", e.target.value as PropertyType | "all")}
          className="w-full bg-slate-50 text-slate-900 text-sm font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">All Property Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment / Flat</option>
          <option value="penthouse">Penthouse</option>
          <option value="townhouse">Townhouse</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      {/* Max Price Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Maximum Price
        </label>
        <select
          value={filters.maxPrice < 10000000 ? String(filters.maxPrice) : "all"}
          onChange={(e) => onUpdateFilter("maxPrice", e.target.value === "all" ? 10000000 : Number(e.target.value))}
          className="w-full bg-slate-50 text-slate-900 text-sm font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">Any Price</option>
          {filters.listingType === "rent" ? (
            <>
              <option value="1500">Up to £1,500 / mo</option>
              <option value="2000">Up to £2,000 / mo</option>
              <option value="2500">Up to £2,500 / mo</option>
              <option value="3500">Up to £3,500 / mo</option>
            </>
          ) : (
            <>
              <option value="350000">Up to £350,000</option>
              <option value="500000">Up to £500,000</option>
              <option value="750000">Up to £750,000</option>
              <option value="1000000">Up to £1,000,000</option>
              <option value="1500000">Up to £1,500,000</option>
            </>
          )}
        </select>
      </div>

      {/* 4. Bedrooms */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Minimum Bedrooms
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["any", 1, 2, 3, 4, 5] as const).map((num) => (
            <button
              key={String(num)}
              type="button"
              onClick={() => onUpdateFilter("bedrooms", num)}
              className={cn(
                "flex-1 min-w-[42px] py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer",
                filters.bedrooms === num
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {num === "any" ? "Any" : `${num}+`}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Sort By */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Sort Results By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onUpdateFilter("sortBy", e.target.value as SortOption)}
          className="w-full bg-slate-50 text-slate-900 text-sm font-medium rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="newest">Newest Listed First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="bedrooms-desc">Bedrooms: Most First</option>
          <option value="area-desc">Floor Area: Largest First</option>
        </select>
      </div>

      {/* 6. Desired Amenities */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Amenities & Features
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {AVAILABLE_FEATURES.map((feature) => {
            const isChecked = filters.features.includes(feature);
            return (
              <label
                key={feature}
                className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-slate-900 py-1"
              >
                <span>{feature}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFeature(feature)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
              </label>
            );
          })}
        </div>
      </div>

      {isMobileDrawer && (
        <Button variant="primary" size="md" className="w-full mt-4" onClick={onCloseMobileDrawer}>
          Show Matching Properties
        </Button>
      )}
    </div>
  );
};
