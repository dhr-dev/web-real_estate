import { ArrowRight, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { LocationHub } from "../../data/locations";
import { cn } from "../../utils/cn";

export interface LocationCardProps {
  location: LocationHub;
  className?: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, className }) => {
  return (
    <Link
      to={`/properties?city=${encodeURIComponent(location.name)}`}
      className={cn(
        "group relative h-80 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6",
        className
      )}
    >
      {/* Background Image */}
      <img
        src={location.image}
        alt={location.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Dark Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-white space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location.country}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-amber-200 transition-colors">
              {location.name}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">{location.tagline}</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-md">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-slate-300 font-medium">
          <span>{location.propertyCount} Available Estates</span>
          <span className="text-white font-bold">Avg {location.averagePrice}</span>
        </div>
      </div>
    </Link>
  );
};
