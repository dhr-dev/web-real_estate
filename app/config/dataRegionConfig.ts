export type RegionCode = "UK" | "US";

export interface RegionConfig {
  code: RegionCode;
  name: string;
  currencySymbol: string;
  currencyCode: string;
  countryName: string;
  popularCities: string[];
}

// Global Level Fallback Region Configuration
export const REGION_FALLBACK: RegionCode = "UK";

export const REGION_CONFIGS: Record<RegionCode, RegionConfig> = {
  UK: {
    code: "UK",
    name: "United Kingdom & Europe",
    currencySymbol: "£",
    currencyCode: "GBP",
    countryName: "United Kingdom",
    popularCities: ["London", "Manchester", "Edinburgh", "Amsterdam", "Lisbon"],
  },
  US: {
    code: "US",
    name: "United States",
    currencySymbol: "$",
    currencyCode: "USD",
    countryName: "United States",
    popularCities: ["New York", "Los Angeles", "Miami", "Austin", "San Francisco"],
  },
};

// Safe env loader with explicit global fallback matching rule guidelines
export const getActiveRegionCode = (): RegionCode => {
  const envRegion = import.meta.env.VITE_REGION;
  if (envRegion === "US") {
    return "US";
  }
  if (envRegion === "UK") {
    return "UK";
  }
  return REGION_FALLBACK;
};

export const ACTIVE_REGION_CODE = getActiveRegionCode();
export const ACTIVE_REGION_CONFIG = REGION_CONFIGS[ACTIVE_REGION_CODE];
