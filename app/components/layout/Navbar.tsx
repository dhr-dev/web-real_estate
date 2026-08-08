import { Building2, Heart, Menu, PhoneCall, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSavedProperties } from "../../context/SavedPropertiesContext";
import { cn } from "../../utils/cn";
import { EnquiryModal } from "../modals/EnquiryModal";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const { savedCount } = useSavedProperties();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    { label: "Home", href: "/", isExact: true },
    { label: "Buy", href: "/properties?listingType=sale" },
    { label: "Rent", href: "/properties?listingType=rent" },
    { label: "Properties", href: "/properties" },
    { label: "Saved", href: "/saved", badge: savedCount },
  ];

  const isLinkActive = (href: string, isExact?: boolean) => {
    if (isExact) {
      return location.pathname === "/" && location.search === "";
    }
    const [path, query] = href.split("?");
    if (location.pathname !== path) return false;
    if (!query) {
      // If browsing /properties without listingType filter
      if (path === "/properties" && location.search.includes("listingType=")) {
        return false;
      }
      return true;
    }
    return location.search.includes(query);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b border-[#e5e3dd]",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-2xs py-3"
            : "bg-[#faf9f6]/95 backdrop-blur-sm py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Prominent Brand Wordmark & Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black tracking-tighter text-xl shadow-xs group-hover:bg-amber-600 transition-colors">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                Haven
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-bold -mt-1">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Core Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#f3f2ee] p-1.5 rounded-2xl border border-[#e5e3dd]">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href, link.isExact);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5",
                    active
                      ? "bg-white text-slate-900 shadow-2xs border border-[#e5e3dd]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  )}
                >
                  <span>{link.label}</span>
                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span className="bg-amber-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Icon Button */}
            <Link
              to="/saved"
              className="relative p-2.5 text-slate-700 hover:text-slate-900 hover:bg-[#f3f2ee] rounded-xl border border-[#e5e3dd] transition-colors flex items-center justify-center bg-white"
              aria-label="View saved properties"
              title="Saved Shortlist"
            >
              <Heart className="w-4 h-4 text-slate-700" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Primary Action CTA */}
            <Button
              variant="dark"
              size="sm"
              className="hidden sm:inline-flex font-bold"
              onClick={() => setIsEnquiryModalOpen(true)}
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Enquire Now</span>
            </Button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-[#f3f2ee] rounded-xl border border-[#e5e3dd]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#e5e3dd] bg-[#faf9f6] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1 py-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, link.isExact);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                      active
                        ? "bg-white text-slate-900 border border-[#e5e3dd] font-bold"
                        : "text-slate-700 hover:bg-[#f3f2ee]"
                    )}
                  >
                    <span>{link.label}</span>
                    {typeof link.badge === "number" && link.badge > 0 && (
                      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="pt-2">
              <Button
                variant="dark"
                size="md"
                className="w-full justify-center font-bold"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEnquiryModalOpen(true);
                }}
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Book a Viewing / Enquiry</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
};
