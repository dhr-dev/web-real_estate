import React from "react";
import { Property } from "../../types/property";
import { PropertyCard } from "./PropertyCard";

export interface SimilarPropertiesProps {
  currentPropertyId: string;
  allProperties: Property[];
  city: string;
}

export const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  currentPropertyId,
  allProperties,
  city,
}) => {
  // Find properties in same city or same listing type excluding current
  const similar = allProperties
    .filter((p) => p.id !== currentPropertyId)
    .sort((a, b) => (a.city === city ? -1 : 1))
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200">
      <div>
        <h3 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
          Similar Properties
        </h3>
        <p className="text-slate-500 text-sm mt-1">
          Explore comparable architectural residences in {city} and surrounding hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
