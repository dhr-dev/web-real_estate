import { Building2, Home, MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ListingType, PropertyType } from "../../types/property";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";

export interface SearchBarProps {
  initialListingType?: ListingType;
  initialCity?: string;
  initialPropertyType?: PropertyType | "all";
  initialSearchQuery?: string;
  className?: string;
  variant?: "hero" | "compact";
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialListingType = "sale",
  initialCity = "all",
  initialPropertyType = "all",
  initialSearchQuery = "",
  className,
  variant = "hero",
}) => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [city, setCity] = useState<string>(initialCity);
  const [propertyType, setPropertyType] = useState<string>(initialPropertyType);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set("listingType", listingType);
    if (city !== "all") params.set("city", city);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 sm:p-4 transition-all",
        className
      )}
    >
      {/* Listing Type Tabs (Buy / Rent) */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
        <button
          type="button"
          onClick={() => setListingType("sale")}
          className={cn(
            "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
            listingType === "sale"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => setListingType("rent")}
          className={cn(
            "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
            listingType === "rent"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          Rent Properties
        </button>
      </div>

      {/* Form Fields Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* City Select */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Location
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-amber-600 absolute left-3 pointer-events-none" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 text-slate-900 text-sm font-semibold rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
            >
              <option value="all">All Locations (UK & EU)</option>
              <option value="London">London, UK</option>
              <option value="Manchester">Manchester, UK</option>
              <option value="Edinburgh">Edinburgh, UK</option>
              <option value="Bristol">Bristol, UK</option>
              <option value="Amsterdam">Amsterdam, Netherlands</option>
              <option value="Lisbon">Lisbon, Portugal</option>
            </select>
          </div>
        </div>

        {/* Property Type Select */}
        <div className="md:col-span-3 relative">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Property Type
          </label>
          <div className="relative flex items-center">
            <Home className="w-4 h-4 text-amber-600 absolute left-3 pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 text-slate-900 text-sm font-semibold rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
            >
              <option value="all">All Property Types</option>
              <option value="house">Houses & Estates</option>
              <option value="apartment">Apartments & Flats</option>
              <option value="penthouse">Penthouses</option>
              <option value="townhouse">Townhouses</option>
              <option value="villa">Villas</option>
            </select>
          </div>
        </div>

        {/* Search Keyword Input */}
        <div className="md:col-span-4 relative">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Keywords / Street / Area
          </label>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Belgravia, Garden, Concierge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/80 text-slate-900 text-sm rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Submit Search Button */}
        <div className="md:col-span-2 pt-2 md:pt-4">
          <Button type="submit" variant="primary" size="md" className="w-full h-[42px] font-semibold shadow-md">
            <Search className="w-4 h-4 text-amber-400" />
            <span>Search</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
