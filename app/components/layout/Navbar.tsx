import { Building2, Heart, Menu, PhoneCall, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSavedProperties } from "../../context/SavedPropertiesContext";
import { cn } from "../../utils/cn";
import { EnquiryModal } from "../modals/EnquiryModal";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isOverDarkSection, setIsOverDarkSection] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const { savedCount } = useSavedProperties();
  const location = useLocation();

  useEffect(() => {
    const detectSectionTheme = () => {
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      const navbarY = 50;

      let isOverDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarY && rect.bottom >= navbarY) {
          isOverDark = true;
        }
      });

      setIsOverDarkSection(isOverDark);
    };

    detectSectionTheme();
    window.addEventListener("scroll", detectSectionTheme, { passive: true });
    window.addEventListener("resize", detectSectionTheme, { passive: true });
    return () => {
      window.removeEventListener("scroll", detectSectionTheme);
      window.removeEventListener("resize", detectSectionTheme);
    };
  }, [location.pathname, location.search]);

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
      if (path === "/properties" && location.search.includes("listingType=")) {
        return false;
      }
      return true;
    }
    return location.search.includes(query);
  };

  return (
    <>
      {/* Dynamic Section-Aware Floating Centered Capsule Header */}
      <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto max-w-6xl mx-auto rounded-full border transition-all duration-500 ease-in-out px-4 py-2 sm:py-2.5 flex items-center justify-between backdrop-blur-xl",
            isOverDarkSection
              ? "bg-white/80 border-white/40 text-slate-900 shadow-xl shadow-slate-950/15"
              : "bg-slate-950/85 border-slate-800 text-white shadow-2xl shadow-slate-950/30"
          )}
        >
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0 pl-1">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-black tracking-tighter text-lg transition-all duration-500 ease-in-out",
                isOverDarkSection
                  ? "bg-slate-900 text-white group-hover:bg-amber-600 shadow-xs"
                  : "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              )}
            >
              H
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xl font-black tracking-tight leading-none transition-colors duration-500 ease-in-out",
                  isOverDarkSection ? "text-slate-900 group-hover:text-amber-700" : "text-white group-hover:text-amber-300"
                )}
              >
                Haven
              </span>
              <span
                className={cn(
                  "text-[9px] tracking-widest uppercase font-extrabold mt-0.5 transition-colors duration-500 ease-in-out",
                  isOverDarkSection ? "text-slate-500" : "text-slate-400"
                )}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* Centered Recessed "Dip" Desktop Navigation Track */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-500 ease-in-out",
              isOverDarkSection
                ? "bg-slate-100/90 border-slate-200/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)]"
                : "bg-white/10 border-white/15 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.3)]"
            )}
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href, link.isExact);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ease-in-out flex items-center gap-1.5 relative",
                    active
                      ? isOverDarkSection
                        ? "bg-slate-950 text-white shadow-xs font-extrabold"
                        : "bg-white text-slate-950 shadow-xs font-extrabold"
                      : isOverDarkSection
                      ? "text-slate-700 hover:text-slate-950 hover:bg-white/80"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>{link.label}</span>
                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span
                      className={cn(
                        "text-[10px] font-extrabold px-1.5 py-0.2 rounded-full transition-colors duration-300",
                        active ? "bg-amber-400 text-slate-950" : "bg-amber-600 text-white"
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 pr-1">
            {/* Wishlist Button */}
            <div
              className={cn(
                "p-0.5 rounded-full transition-all duration-500 ease-in-out",
                isOverDarkSection
                  ? "bg-slate-100/90 border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                  : "bg-white/10 border border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
              )}
            >
              <Link
                to="/saved"
                className={cn(
                  "relative p-2 rounded-full border transition-all duration-300 ease-in-out flex items-center justify-center",
                  isOverDarkSection
                    ? "bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-2xs"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                )}
                aria-label="View saved properties"
                title="Saved Shortlist"
              >
                <Heart className={cn("w-4 h-4 transition-colors duration-300", isOverDarkSection ? "text-slate-700" : "text-white")} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Enquire Now CTA */}
            <Button
              variant={isOverDarkSection ? "dark" : "secondary"}
              size="sm"
              className="hidden sm:inline-flex font-bold rounded-full px-4 shadow-xs transition-all duration-500 active:scale-95"
              onClick={() => setIsEnquiryModalOpen(true)}
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Enquire</span>
            </Button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full border transition-colors duration-300",
                isOverDarkSection
                  ? "bg-slate-100 border-slate-200 text-slate-900"
                  : "bg-white/10 border-white/20 text-white"
              )}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            className={cn(
              "pointer-events-auto md:hidden mt-2 max-w-6xl mx-auto rounded-3xl border p-4 space-y-3 shadow-2xl transition-all duration-500 ease-in-out animate-in slide-in-from-top-2",
              isOverDarkSection
                ? "bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900"
                : "bg-slate-950/95 backdrop-blur-2xl border-slate-800 text-white"
            )}
          >
            <div className="space-y-1 py-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, link.isExact);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-2xl transition-colors duration-300",
                      active
                        ? isOverDarkSection
                          ? "bg-slate-950 text-white font-black"
                          : "bg-white text-slate-950 font-black"
                        : isOverDarkSection
                        ? "text-slate-800 hover:bg-slate-100"
                        : "text-slate-200 hover:bg-white/10"
                    )}
                  >
                    <span>{link.label}</span>
                    {typeof link.badge === "number" && link.badge > 0 && (
                      <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="pt-2">
              <Button
                variant={isOverDarkSection ? "dark" : "secondary"}
                size="md"
                className="w-full justify-center font-bold rounded-2xl transition-all duration-500"
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
