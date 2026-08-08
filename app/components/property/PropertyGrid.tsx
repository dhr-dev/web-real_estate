import { Building2, SearchX } from "lucide-react";
import React from "react";
import { Property } from "../../types/property";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { PropertyCard } from "./PropertyCard";

export interface PropertyGridProps {
  properties: Property[];
  viewMode?: "grid" | "list";
  onResetFilters?: () => void;
  className?: string;
  loading?: boolean;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  viewMode = "grid",
  onResetFilters,
  className,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center my-6 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-serif text-slate-900">No properties found</h3>
        <p className="text-slate-500 text-sm max-w-md mt-2 leading-relaxed">
          We couldn't find any properties matching your exact search criteria. Try adjusting your location, price range, or bedrooms filter.
        </p>
        {onResetFilters && (
          <Button variant="outline" size="md" className="mt-6" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className={cn("space-y-6", className)}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} variant="horizontal" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} variant="standard" />
      ))}
    </div>
  );
};
