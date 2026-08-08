import { Bed, Building2, Home, MapPin, Search, SlidersHorizontal, Tag } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ACTIVE_REGION_CONFIG } from "../../config/dataRegionConfig";
import { ListingType, PropertyType } from "../../types/property";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { CustomSelect } from "../ui/CustomSelect";

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

  const cityOptions = [
    { value: "all", label: `All ${ACTIVE_REGION_CONFIG.name}` },
    ...ACTIVE_REGION_CONFIG.popularCities.map((c) => ({
      value: c,
      label: `${c}, ${ACTIVE_REGION_CONFIG.code}`,
    })),
  ];

  const propertyTypeOptions = [
    { value: "all", label: "All Property Types" },
    { value: "apartment", label: "Apartments" },
    { value: "house", label: "Houses" },
    { value: "townhouse", label: "Townhouses" },
    { value: "penthouse", label: "Penthouses" },
    { value: "villa", label: "Villas" },
  ];

  const bedroomOptions = [
    { value: "any", label: "Any Bedrooms" },
    { value: "1", label: "1+ Bedroom" },
    { value: "2", label: "2+ Bedrooms" },
    { value: "3", label: "3+ Bedrooms" },
    { value: "4", label: "4+ Bedrooms" },
  ];

  const maxPriceOptions =
    listingType === "sale"
      ? [
          { value: "all", label: "Any Price" },
          { value: "350000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}350,000` },
          { value: "500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}500,000` },
          { value: "750000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}750,000` },
          { value: "1000000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,000,000` },
          { value: "1500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,500,000` },
          { value: "2500000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}2,500,000` },
        ]
      : [
          { value: "all", label: "Any Price" },
          { value: "1500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}1,500 / mo` },
          { value: "2500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}2,500 / mo` },
          { value: "3500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}3,500 / mo` },
          { value: "5000", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}5,000 / mo` },
          { value: "8500", label: `Up to ${ACTIVE_REGION_CONFIG.currencySymbol}8,500 / mo` },
        ];

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
            <CustomSelect
              label="Location"
              icon={MapPin}
              options={cityOptions}
              value={city}
              onChange={setCity}
            />
          </div>

          {/* Property Type */}
          <div className="lg:col-span-3">
            <CustomSelect
              label="Property Type"
              icon={Home}
              options={propertyTypeOptions}
              value={propertyType}
              onChange={setPropertyType}
            />
          </div>

          {/* Bedrooms */}
          <div className="lg:col-span-2">
            <CustomSelect
              label="Bedrooms"
              icon={Bed}
              options={bedroomOptions}
              value={bedrooms}
              onChange={setBedrooms}
            />
          </div>

          {/* Max Price */}
          <div className="lg:col-span-2">
            <CustomSelect
              label="Max Price"
              icon={Tag}
              options={maxPriceOptions}
              value={maxPrice}
              onChange={setMaxPrice}
            />
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 sm:self-end">
            <Button
              type="submit"
              variant="dark"
              size="md"
              className="w-full justify-center font-bold rounded-xl h-[42px]"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* Text Keyword Search Input */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, address, feature (e.g. 'terrace', 'sea view', 'pool')..."
              className="w-full bg-[#f8f7f4] hover:bg-white text-slate-900 text-xs font-semibold rounded-xl pl-10 pr-4 py-2 border border-[#e5e3dd] focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
