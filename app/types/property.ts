import { Agent } from "./agent";

export type ListingType = "sale" | "rent";
export type PropertyType = "house" | "apartment" | "penthouse" | "townhouse" | "villa";

export interface FloorPlan {
  title: string;
  dimensions: string;
  imageUrl?: string;
  bedroomsCount: number;
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  currency: "GBP" | "EUR" | "USD";
  period?: "pm" | "pw"; // for rent listings
  listingType: ListingType;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  epcRating: "A" | "B" | "C" | "D" | "E";
  
  // Location
  address: string;
  city: string;
  postcode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Content
  description: string;
  highlights: string[];
  features: string[];
  images: string[];
  
  // Agent & Status
  agentId: string;
  agent?: Agent;
  featured: boolean;
  editorialPick?: boolean;
  addedDate: string;
  status: "available" | "under_offer" | "sold" | "let";

  // Additional details
  tenure?: "Freehold" | "Leasehold" | "Share of Freehold";
  councilTaxBand?: string;
  parkingSpaces?: number;
  yearBuilt?: number;
}
