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
      if (window.scrollY > 20) {
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
    { label: "Buy", href: "/properties?listingType=sale" },
    { label: "Rent", href: "/properties?listingType=rent" },
    { label: "Search All", href: "/properties" },
    { label: "Editorial", href: "/about" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5"
            : "bg-white border-b border-slate-100 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold tracking-tighter text-lg shadow-sm group-hover:bg-amber-600 transition-colors">
              H
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                Haven
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href.split("?")[0] &&
                (!link.href.includes("?") || location.search.includes(link.href.split("?")[1]));
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-slate-900 relative py-1",
                    isActive ? "text-slate-900 font-semibold" : "text-slate-600"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Saved Wishlist Button */}
            <Link
              to="/saved"
              className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
              aria-label="View saved properties"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-in zoom-in-50">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Quick Enquiry CTA */}
            <Button
              variant="dark"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setIsEnquiryModalOpen(true)}
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Enquire Now</span>
            </Button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/saved"
                className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600" />
                  <span>Saved Properties</span>
                </div>
                {savedCount > 0 && (
                  <span className="bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {savedCount}
                  </span>
                )}
              </Link>
            </div>
            <div className="pt-2">
              <Button
                variant="dark"
                size="md"
                className="w-full justify-center"
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
