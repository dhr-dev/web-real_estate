import {
  Bath,
  Bed,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  Heart,
  Home,
  MapPin,
  Maximize,
  PhoneCall,
  Share2,
  ShieldCheck,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { AgentCard } from "../components/agent/AgentCard";
import { EnquiryModal } from "../components/modals/EnquiryModal";
import { FloorPlanPreview } from "../components/property/FloorPlanPreview";
import { PropertyGallery } from "../components/property/PropertyGallery";
import { SimilarProperties } from "../components/property/SimilarProperties";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { PROPERTIES } from "../data/properties";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import { formatArea, formatCurrency } from "../utils/formatters";

export function meta({ params }: { params: { id: string } }) {
  const property = PROPERTIES.find((p) => p.id === params.id);
  if (!property) {
    return [{ title: "Property Not Found | Haven Real Estate" }];
  }
  return [
    { title: `${property.title} | Haven Real Estate` },
    { name: "description", content: property.description },
  ];
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedProperties();

  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Property Listing Not Found</h2>
        <p className="text-slate-500 text-sm">
          The property ID "{id}" could not be located in our current portfolio.
        </p>
        <Link to="/properties">
          <Button variant="primary" size="md" className="mt-4">
            Browse All Available Properties
          </Button>
        </Link>
      </div>
    );
  }

  const saved = isSaved(property.id);
  const formattedPrice = formatCurrency(property.price, property.currency, property.period);
  const area = formatArea(property.areaSqFt);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Property link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to="/properties" className="hover:text-slate-900 transition-colors">Properties</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
      </nav>

      {/* Header Info Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={property.listingType === "sale" ? "sale" : "rent"}>
              For {property.listingType}
            </Badge>
            <Badge variant="gold">{property.propertyType}</Badge>
            {property.featured && <Badge variant="dark">Featured Estate</Badge>}
            <span className="text-xs text-slate-500 font-medium">
              EPC Rating: <strong className="text-emerald-700 font-bold">{property.epcRating}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {property.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{property.address}, {property.city}, {property.postcode}, {property.country}</span>
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block lg:text-right">
              Asking Price
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSave(property.id)}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                saved
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-rose-600 text-rose-600" : ""}`} />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share</span>
            </button>

            <Button variant="dark" size="md" onClick={() => setIsEnquiryOpen(true)}>
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Request Viewing</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Quick Specs Bar */}
      <div className="bg-white rounded-2xl border border-[#e5e3dd] p-6 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e3dd]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] border border-[#e5e3dd] text-amber-800 flex items-center justify-center shrink-0">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Bedrooms</span>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">{property.bedrooms} Beds</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] border border-[#e5e3dd] text-amber-800 flex items-center justify-center shrink-0">
            <Bath className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Bathrooms</span>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">{property.bathrooms} Baths</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] border border-[#e5e3dd] text-amber-800 flex items-center justify-center shrink-0">
            <Maximize className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Internal Area</span>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">{area.sqFt}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:pl-6">
          <div className="w-10 h-10 rounded-xl bg-[#f8f7f4] border border-[#e5e3dd] text-amber-800 flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Tenure</span>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">{property.tenure || "Freehold"}</span>
          </div>
        </div>
      </div>

      {/* Details & Sidebar Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Property Description</h3>
            <p className="text-slate-700 leading-relaxed text-base font-normal whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Architectural Highlights */}
          {property.highlights && property.highlights.length > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
              <h3 className="text-xl font-extrabold text-amber-300 tracking-tight">Architectural Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                {property.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Features & Amenities Pill Grid */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Features & Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-white border border-[#e5e3dd] text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Floor Plan Schematic Component */}
          <FloorPlanPreview
            areaSqFt={property.areaSqFt}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            title={property.title}
          />
        </div>

        {/* Sidebar Widget (Agent Card & Quick Viewing Form) */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          {property.agent && <AgentCard agent={property.agent} variant="sidebar" />}

          {/* Booking CTA Banner */}
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-6 space-y-4 shadow-md">
            <h4 className="font-extrabold text-lg tracking-tight">Interested in this property?</h4>
            <p className="text-xs text-amber-100 leading-relaxed">
              Private viewings can be arranged 7 days a week with accredited Haven advisors.
            </p>
            <Button
              variant="dark"
              size="md"
              className="w-full justify-center"
              onClick={() => setIsEnquiryOpen(true)}
            >
              Book Viewing Tour
            </Button>
          </div>
        </aside>
      </div>

      {/* Similar Properties Section */}
      <SimilarProperties
        currentPropertyId={property.id}
        allProperties={PROPERTIES}
        city={property.city}
      />

      {/* Viewing Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        propertyTitle={property.title}
        agentName={property.agent?.name}
      />
    </div>
  );
}
