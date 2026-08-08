import { Bath, Bed, Heart, MapPin, Maximize } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useSavedProperties } from "../../context/SavedPropertiesContext";
import { Property } from "../../types/property";
import { cn } from "../../utils/cn";
import { formatArea, formatCurrency } from "../../utils/formatters";
import { Badge } from "../ui/Badge";

export interface PropertyCardProps {
  property: Property;
  className?: string;
  variant?: "standard" | "compact" | "horizontal";
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  className,
  variant = "standard",
}) => {
  const { isSaved, toggleSave } = useSavedProperties();
  const saved = isSaved(property.id);

  const formattedPrice = formatCurrency(property.price, property.currency, property.period);
  const area = formatArea(property.areaSqFt);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(property.id);
  };

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "group bg-white rounded-2xl border border-[#e5e3dd] shadow-2xs hover:shadow-lg hover:border-[#d6d3cb] transition-all duration-300 flex flex-col sm:flex-row overflow-hidden",
          className
        )}
      >
        {/* Thumbnail Image */}
        <div className="relative sm:w-2/5 h-56 sm:h-auto overflow-hidden shrink-0">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge variant={property.listingType === "sale" ? "sale" : "rent"}>
              For {property.listingType}
            </Badge>
            {property.featured && <Badge variant="gold">Featured</Badge>}
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 hover:bg-white",
              saved ? "text-rose-600" : "text-slate-500 hover:text-rose-600"
            )}
            aria-label="Save property"
          >
            <Heart className={cn("w-4 h-4", saved && "fill-rose-600 text-rose-600")} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  {property.propertyType} • {property.city}
                </span>
                <Link to={`/properties/${property.id}`}>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 hover:text-amber-700 transition-colors mt-0.5">
                    {property.title}
                  </h3>
                </Link>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold text-slate-900">{formattedPrice}</span>
              </div>
            </div>

            <p className="text-slate-500 text-xs flex items-center gap-1 mt-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.address}, {property.postcode}</span>
            </p>

            <p className="text-slate-600 text-xs mt-3 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specs bar */}
          <div className="mt-5 pt-3.5 border-t border-[#e5e3dd] flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Bed className="w-4 h-4 text-slate-400" /> {property.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Bath className="w-4 h-4 text-slate-400" /> {property.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <Maximize className="w-4 h-4 text-slate-400" /> {area.sqFt}
              </span>
            </div>

            {property.agent && (
              <div className="flex items-center gap-2">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#e5e3dd]"
                />
                <span className="hidden lg:inline text-slate-500 text-xs">{property.agent.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-[#e5e3dd] shadow-2xs hover:shadow-lg hover:border-[#d6d3cb] transition-all duration-300 flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Thumbnail Image */}
      <div className="relative h-60 overflow-hidden shrink-0">
        <Link to={`/properties/${property.id}`}>
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant={property.listingType === "sale" ? "sale" : "rent"}>
            For {property.listingType}
          </Badge>
          {property.featured && <Badge variant="gold">Featured</Badge>}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 hover:bg-white",
            saved ? "text-rose-600" : "text-slate-600 hover:text-rose-600"
          )}
          aria-label="Save property"
        >
          <Heart className={cn("w-4 h-4", saved && "fill-rose-600 text-rose-600")} />
        </button>

        {/* Bottom Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-xs">
              {formattedPrice}
            </span>
          </div>
          <Badge variant="dark" className="text-[10px] bg-slate-950/80 backdrop-blur-xs">
            {property.propertyType}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link to={`/properties/${property.id}`}>
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900 hover:text-amber-700 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <p className="text-slate-500 text-xs flex items-center gap-1 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </p>

          <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
            {property.tagline}
          </p>
        </div>

        {/* Specs bar */}
        <div className="pt-3 border-t border-[#e5e3dd] flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-3.5 font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" /> {property.bedrooms} beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" /> {property.bathrooms} baths
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-slate-400" /> {area.sqFt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
