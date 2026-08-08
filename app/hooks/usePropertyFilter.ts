import { useMemo, useState } from "react";
import { PropertyFilterState, SortOption } from "../types/filter";
import { Property } from "../types/property";

const INITIAL_FILTER: PropertyFilterState = {
  searchQuery: "",
  city: "all",
  listingType: "all",
  propertyType: "all",
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: "any",
  bathrooms: "any",
  features: [],
  sortBy: "newest",
};

export function usePropertyFilter(initialProperties: Property[], initialParams?: Partial<PropertyFilterState>) {
  const [filters, setFilters] = useState<PropertyFilterState>({
    ...INITIAL_FILTER,
    ...initialParams,
  });

  const updateFilter = <K extends keyof PropertyFilterState>(key: K, value: PropertyFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTER);
  };

  const toggleFeature = (feature: string) => {
    setFilters((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // Listing type check
      if (filters.listingType !== "all" && property.listingType !== filters.listingType) {
        return false;
      }

      // Property type check
      if (filters.propertyType !== "all" && property.propertyType !== filters.propertyType) {
        return false;
      }

      // City check
      if (filters.city !== "all" && property.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Price check
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms check
      if (filters.bedrooms !== "any" && property.bedrooms < filters.bedrooms) {
        return false;
      }

      // Bathrooms check
      if (filters.bathrooms !== "any" && property.bathrooms < filters.bathrooms) {
        return false;
      }

      // Search query check (title, address, city, postcode, description)
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesAddress = property.address.toLowerCase().includes(query);
        const matchesPostcode = property.postcode.toLowerCase().includes(query);
        const matchesTagline = property.tagline.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCity && !matchesAddress && !matchesPostcode && !matchesTagline) {
          return false;
        }
      }

      // Features check
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((f) =>
          property.features.some((pf) => pf.toLowerCase().includes(f.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "bedrooms-desc":
          return b.bedrooms - a.bedrooms;
        case "area-desc":
          return b.areaSqFt - a.areaSqFt;
        case "newest":
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      }
    });
  }, [initialProperties, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.city !== "all") count++;
    if (filters.listingType !== "all") count++;
    if (filters.propertyType !== "all") count++;
    if (filters.minPrice > 0 || filters.maxPrice < 10000000) count++;
    if (filters.bedrooms !== "any") count++;
    if (filters.bathrooms !== "any") count++;
    if (filters.searchQuery.trim() !== "") count++;
    count += filters.features.length;
    return count;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    toggleFeature,
    filteredProperties,
    activeFilterCount,
  };
}
