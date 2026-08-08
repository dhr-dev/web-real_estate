import { Bed, Check, Filter, Home, MapPin, RotateCcw, Tag, X } from "lucide-react";
import React from "react";
import { ACTIVE_REGION_CONFIG } from "../../config/dataRegionConfig";
import { PropertyFilterState, SortOption } from "../../types/filter";
import { ListingType, PropertyType } from "../../types/property";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { CustomSelect } from "../ui/CustomSelect";

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
  const cityOptions = [
    { value: "all", label: `All ${ACTIVE_REGION_CONFIG.name}` },
    ...ACTIVE_REGION_CONFIG.popularCities.map((c) => ({
      value: c,
      label: `${c}, ${ACTIVE_REGION_CONFIG.code}`,
    })),
  ];

  const propertyTypeOptions = [
    { value: "all", label: "All Property Types" },
    { value: "apartment", label: "Apartment / Flat" },
    { value: "house", label: "House" },
    { value: "townhouse", label: "Townhouse" },
    { value: "penthouse", label: "Penthouse" },
    { value: "villa", label: "Villa" },
  ];

  const bedroomOptions = [
    { value: "any", label: "Any Bedrooms" },
    { value: "1", label: "1+ Bedroom" },
    { value: "2", label: "2+ Bedrooms" },
    { value: "3", label: "3+ Bedrooms" },
    { value: "4", label: "4+ Bedrooms" },
  ];

  const maxPriceOptions =
    filters.listingType === "rent"
      ? [
          { value: "all", label: "Any Price" },
          { value: "1500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,500 / mo` },
          { value: "2500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}2,500 / mo` },
          { value: "3500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}3,500 / mo` },
          { value: "5000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}5,000 / mo` },
          { value: "8500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}8,500 / mo` },
        ]
      : [
          { value: "all", label: "Any Price" },
          { value: "350000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}350,000` },
          { value: "500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}500,000` },
          { value: "750000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}750,000` },
          { value: "1000000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,000,000` },
          { value: "1500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,500,000` },
          { value: "2500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}2,500,000` },
        ];

  return (
    <div className={cn("bg-white rounded-2xl border border-[#e5e3dd] p-5 space-y-6 shadow-2xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e5e3dd]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-800" />
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Filter Properties</h3>
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
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f3f2ee] rounded-xl border border-[#e5e3dd]">
          {(["all", "sale", "rent"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onUpdateFilter("listingType", type)}
              className={cn(
                "py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer",
                filters.listingType === type
                  ? "bg-white text-slate-900 shadow-2xs"
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
        <CustomSelect
          label="City / Location"
          icon={MapPin}
          options={cityOptions}
          value={filters.city}
          onChange={(val) => onUpdateFilter("city", val)}
        />
      </div>

      {/* 3. Property Type */}
      <div className="space-y-2">
        <CustomSelect
          label="Property Type"
          icon={Home}
          options={propertyTypeOptions}
          value={filters.propertyType}
          onChange={(val) => onUpdateFilter("propertyType", val as PropertyType | "all")}
        />
      </div>

      {/* 4. Bedrooms */}
      <div className="space-y-2">
        <CustomSelect
          label="Minimum Bedrooms"
          icon={Bed}
          options={bedroomOptions}
          value={String(filters.bedrooms)}
          onChange={(val) => onUpdateFilter("bedrooms", val === "any" ? "any" : Number(val))}
        />
      </div>

      {/* 5. Max Price Filter */}
      <div className="space-y-2">
        <CustomSelect
          label="Maximum Price"
          icon={Tag}
          options={maxPriceOptions}
          value={filters.maxPrice < 10000000 ? String(filters.maxPrice) : "all"}
          onChange={(val) => onUpdateFilter("maxPrice", val === "all" ? 10000000 : Number(val))}
        />
      </div>

      {/* 6. Key Features Checkboxes */}
      <div className="space-y-3 pt-2 border-t border-[#e5e3dd]">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Must-Have Features
        </label>
        <div className="space-y-2">
          {AVAILABLE_FEATURES.map((feature) => {
            const isChecked = filters.features.includes(feature);
            return (
              <label
                key={feature}
                onClick={() => onToggleFeature(feature)}
                className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900 group select-none"
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-md border flex items-center justify-center transition-colors shrink-0",
                    isChecked
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "border-slate-300 bg-[#f8f7f4] group-hover:border-slate-400"
                  )}
                >
                  {isChecked && <Check className="w-3 h-3 text-amber-400 stroke-[3]" />}
                </div>
                <span>{feature}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Submit Button */}
      {isMobileDrawer && onCloseMobileDrawer && (
        <div className="pt-4 border-t border-[#e5e3dd]">
          <Button
            variant="dark"
            size="md"
            className="w-full justify-center font-bold rounded-xl"
            onClick={onCloseMobileDrawer}
          >
            Apply Filters ({activeFilterCount})
          </Button>
        </div>
      )}
    </div>
  );
};
