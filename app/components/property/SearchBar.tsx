import { Building2, Home, MapPin, Search, SlidersHorizontal, PoundSterling, Bed } from "lucide-react";
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
  initialBedrooms?: number | "any";
  initialMaxPrice?: number;
  className?: string;
  variant?: "hero" | "compact";
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialListingType = "sale",
  initialCity = "all",
  initialPropertyType = "all",
  initialSearchQuery = "",
  initialBedrooms = "any",
  initialMaxPrice = 10000000,
  className,
  variant = "hero",
}) => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [city, setCity] = useState<string>(initialCity);
  const [propertyType, setPropertyType] = useState<string>(initialPropertyType);
  const [bedrooms, setBedrooms] = useState<string>(String(initialBedrooms));
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice < 10000000 ? String(initialMaxPrice) : "all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set("listingType", listingType);
    if (city !== "all") params.set("city", city);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (bedrooms !== "any") params.set("bedrooms", bedrooms);
    if (maxPrice !== "all") params.set("maxPrice", maxPrice);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xl border border-[#e5e3dd] p-4 sm:p-5 transition-all",
        variant === "hero" ? "ring-1 ring-slate-900/5 shadow-2xl" : "",
        className
      )}
    >
      {/* Listing Type Switcher (Buy / Rent) */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#e5e3dd] mb-4">
        <button
          type="button"
          onClick={() => setListingType("sale")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
            listingType === "sale"
              ? "bg-slate-900 text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-[#f8f7f4]"
          )}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => setListingType("rent")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
            listingType === "rent"
              ? "bg-slate-900 text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-[#f8f7f4]"
          )}
        >
          Rent Properties
        </button>
      </div>

      {/* Main Search Controls */}
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Location */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Location
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#f8f7f4] hover:bg-white text-slate-900 text-sm font-semibold rounded-xl pl-10 pr-4 py-2.5 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer"
              >
                <option value="all">All UK & Europe</option>
                <option value="London">London, UK</option>
                <option value="Manchester">Manchester, UK</option>
                <option value="Edinburgh">Edinburgh, UK</option>
                <option value="Bristol">Bristol, UK</option>
                <option value="Amsterdam">Amsterdam, NL</option>
                <option value="Lisbon">Lisbon, PT</option>
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Property Type
            </label>
            <div className="relative flex items-center">
              <Home className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-[#f8f7f4] hover:bg-white text-slate-900 text-sm font-semibold rounded-xl pl-10 pr-4 py-2.5 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartments</option>
                <option value="house">Houses</option>
                <option value="townhouse">Townhouses</option>
                <option value="penthouse">Penthouses</option>
                <option value="villa">Villas</option>
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Bedrooms
            </label>
            <div className="relative flex items-center">
              <Bed className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#f8f7f4] hover:bg-white text-slate-900 text-sm font-semibold rounded-xl pl-10 pr-4 py-2.5 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer"
              >
                <option value="any">Any</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>
          </div>

          {/* Max Price */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Max Price
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-[#f8f7f4] hover:bg-white text-slate-900 text-sm font-semibold rounded-xl px-3 py-2.5 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer"
            >
              <option value="all">Any Price</option>
              {listingType === "sale" ? (
                <>
                  <option value="350000">Up to £350,000</option>
                  <option value="500000">Up to £500,000</option>
                  <option value="750000">Up to £750,000</option>
                  <option value="1000000">Up to £1,000,000</option>
                  <option value="1500000">Up to £1,500,000</option>
                </>
              ) : (
                <>
                  <option value="1500">Up to £1,500 / mo</option>
                  <option value="2000">Up to £2,000 / mo</option>
                  <option value="2500">Up to £2,500 / mo</option>
                  <option value="3500">Up to £3,500 / mo</option>
                </>
              )}
            </select>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 pt-1 lg:pt-5">
            <Button type="submit" variant="primary" size="md" className="w-full h-[42px] font-bold shadow-md">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* Search Keyword Option */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Search by area, postcode, or keyword (e.g. Garden, Balcony, Richmond...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8f7f4] hover:bg-white text-slate-800 text-xs rounded-xl px-3.5 py-2 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors placeholder:text-slate-400"
          />
        </div>
      </form>
    </div>
  );
};
