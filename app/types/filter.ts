import { ListingType, PropertyType } from "./property";

export type SortOption = "newest" | "price-asc" | "price-desc" | "bedrooms-desc" | "area-desc";

export interface PropertyFilterState {
  searchQuery: string;
  city: string;
  listingType: ListingType | "all";
  propertyType: PropertyType | "all";
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "any";
  bathrooms: number | "any";
  features: string[];
  sortBy: SortOption;
}
