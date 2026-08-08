export interface LocationHub {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  propertyCount: number;
  averagePrice: string;
  tagline: string;
}

export const LOCATIONS: LocationHub[] = [
  {
    id: "loc-london",
    name: "London",
    country: "United Kingdom",
    region: "Greater London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
    propertyCount: 8,
    averagePrice: "£2,450,000",
    tagline: "Historic elegance & global financial hubs",
  },
  {
    id: "loc-manchester",
    name: "Manchester",
    country: "United Kingdom",
    region: "North West",
    image: "https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&q=80&w=800",
    propertyCount: 4,
    averagePrice: "£680,000",
    tagline: "Vibrant cultural quarters & skyline luxury",
  },
  {
    id: "loc-edinburgh",
    name: "Edinburgh",
    country: "United Kingdom",
    region: "Scotland",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800",
    propertyCount: 3,
    averagePrice: "£1,150,000",
    tagline: "Georgian New Town & volcanic castle views",
  },
  {
    id: "loc-amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    region: "North Holland",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=800",
    propertyCount: 3,
    averagePrice: "€1,850,000",
    tagline: "Unesco Canal Belt grand canal houses",
  },
  {
    id: "loc-lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Lisbon District",
    image: "https://images.unsplash.com/photo-1503756234508-e32369269edd?auto=format&fit=crop&q=80&w=800",
    propertyCount: 2,
    averagePrice: "€1,420,000",
    tagline: "Sun-drenched hillsides & Atlantic horizons",
  },
];
