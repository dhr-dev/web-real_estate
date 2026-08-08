import { Building2, Home, KeyRound, Search, Heart, Menu, PhoneCall, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useSavedProperties } from "../../context/SavedPropertiesContext";
import { cn } from "../../utils/cn";
import { EnquiryModal } from "../modals/EnquiryModal";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isOverDarkSection, setIsOverDarkSection] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const { savedCount } = useSavedProperties();
  const location = useLocation();

  const isHomePage = location.pathname === "/" && location.search === "";

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
      setIsScrolled(window.scrollY > 40);
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
    { label: "Home", href: "/", isExact: true, icon: Home },
    { label: "Buy", href: "/properties?listingType=sale", icon: KeyRound },
    { label: "Rent", href: "/properties?listingType=rent", icon: Building2 },
    { label: "Properties", href: "/properties", icon: Search },
    { label: "Saved", href: "/saved", badge: savedCount, icon: Heart },
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

  // Dechunking & Icon collapsing happen ONLY on inner pages when scrolled.
  // Homepage NEVER dechunks and NEVER changes nav position on scroll.
  const isDechunked = !isHomePage && isScrolled;
  const isIconMode = !isHomePage && isScrolled;

  return (
    <>
      {/* Dynamic Floating Centered Header Container */}
      <header className="sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto transition-all duration-500 ease-in-out relative flex items-center justify-between mx-auto",
            isDechunked
              ? "w-full max-w-full bg-transparent border-0 p-0 shadow-none"
              : "max-w-6xl rounded-full border px-4 py-2 sm:py-2.5 backdrop-blur-xl",
            !isDechunked && (
              isOverDarkSection
                ? "bg-white/80 border-white/40 text-slate-900 shadow-xl shadow-slate-950/15"
                : "bg-slate-950/85 border-slate-800 text-white shadow-2xl shadow-slate-950/30"
            )
          )}
        >
          {/* Left Pod: Brand Logo & Wordmark */}
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2.5 group shrink-0 transition-all duration-500 ease-in-out z-20",
              isDechunked
                ? "rounded-full bg-slate-950/95 backdrop-blur-xl border border-slate-800 text-white px-4 py-2 shadow-2xl shadow-slate-950/40 hover:border-slate-700"
                : "pl-1"
            )}
          >
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-black tracking-tighter text-lg transition-all duration-500 ease-in-out",
                isDechunked
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : isOverDarkSection
                  ? "bg-slate-900 text-white group-hover:bg-amber-600 shadow-xs"
                  : "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              )}
            >
              H
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xl font-black tracking-tight leading-none transition-colors duration-500",
                  isDechunked
                    ? "text-white group-hover:text-amber-300"
                    : isOverDarkSection
                    ? "text-slate-900 group-hover:text-amber-700"
                    : "text-white group-hover:text-amber-300"
                )}
              >
                Haven
              </span>
              <span
                className={cn(
                  "text-[9px] tracking-widest uppercase font-extrabold mt-0.5 transition-colors duration-500",
                  isDechunked
                    ? "text-slate-400"
                    : isOverDarkSection
                    ? "text-slate-500"
                    : "text-slate-400"
                )}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* Center Pod: Navigation Track (Homepage is ALWAYS centered in main capsule; Inner pages dock on scroll) */}
          <nav
            onMouseLeave={() => setHoveredNavIndex(null)}
            className={cn(
              "hidden md:flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] absolute left-1/2 -translate-x-1/2 z-10",
              isIconMode
                ? "-top-2 sm:-top-3 rounded-b-2xl rounded-t-md bg-slate-950/40 backdrop-blur-md border border-white/20 p-1 shadow-lg"
                : "p-1 rounded-full border",
              !isIconMode && (
                isOverDarkSection
                  ? "bg-slate-100/90 border-slate-200/80 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)]"
                  : "bg-white/10 border-white/15 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.3)]"
              )
            )}
          >
            {navLinks.map((link, index) => {
              const active = isLinkActive(link.href, link.isExact);
              const isHovered = hoveredNavIndex === index;
              const LinkIcon = link.icon;

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  title={link.label}
                  onMouseEnter={() => setHoveredNavIndex(index)}
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isIconMode
                      ? isHovered
                        ? "px-3 py-1.5 bg-white text-slate-950 shadow-md scale-[1.03] rounded-xl"
                        : active
                        ? "px-2.5 py-1.5 bg-white/90 text-slate-950 shadow-xs rounded-xl"
                        : "px-2.5 py-1.5 text-slate-200 hover:text-white hover:bg-white/20 rounded-xl"
                      : "px-4 py-1.5 text-xs font-bold rounded-full",
                    !isIconMode && (
                      active
                        ? !isOverDarkSection
                          ? "bg-white text-slate-950 shadow-xs font-extrabold"
                          : "bg-slate-950 text-white shadow-xs font-extrabold"
                        : !isOverDarkSection
                        ? "text-slate-200 hover:text-white hover:bg-white/10"
                        : "text-slate-700 hover:text-slate-950 hover:bg-white/80"
                    )
                  )}
                >
                  {isIconMode ? (
                    <>
                      <LinkIcon className="w-4 h-4 shrink-0 transition-transform duration-300" />
                      <span
                        className={cn(
                          "whitespace-nowrap overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-xs font-bold inline-block",
                          isHovered
                            ? "max-w-[100px] opacity-100 pl-1.5"
                            : "max-w-0 opacity-0 pl-0"
                        )}
                      >
                        {link.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-bold">{link.label}</span>
                  )}

                  {typeof link.badge === "number" && link.badge > 0 && (
                    <span
                      className={cn(
                        "text-[10px] font-extrabold rounded-full transition-colors duration-300 shrink-0 ml-1",
                        isIconMode
                          ? isHovered || active
                            ? "bg-amber-500 text-slate-950 px-1.5 py-0.2"
                            : "bg-amber-500/80 text-slate-950 px-1.5 py-0.2"
                          : "px-1.5 py-0.2",
                        !isIconMode && (active ? "bg-amber-400 text-slate-950" : "bg-amber-600 text-white")
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Pod: Action Controls */}
          <div
            className={cn(
              "flex items-center gap-2 sm:gap-3 transition-all duration-500 ease-in-out z-20",
              isDechunked
                ? "rounded-full bg-slate-950/95 backdrop-blur-xl border border-slate-800 p-1.5 px-3.5 shadow-2xl shadow-slate-950/40"
                : "pr-1"
            )}
          >
            {/* Wishlist Button */}
            <div
              className={cn(
                "p-0.5 rounded-full transition-all duration-500 ease-in-out",
                isDechunked
                  ? "bg-white/10 border border-white/15"
                  : isOverDarkSection
                  ? "bg-slate-100/90 border border-slate-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                  : "bg-white/10 border border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]"
              )}
            >
              <Link
                to="/saved"
                className={cn(
                  "relative p-2 rounded-full border transition-all duration-300 ease-in-out flex items-center justify-center",
                  isDechunked || !isOverDarkSection
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-2xs"
                )}
                aria-label="View saved properties"
                title="Saved Shortlist"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors duration-300",
                    isDechunked || !isOverDarkSection ? "text-white" : "text-slate-700"
                  )}
                />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Enquire CTA */}
            <Button
              variant={isDechunked || !isOverDarkSection ? "secondary" : "dark"}
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
                isDechunked || !isOverDarkSection
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-slate-100 border-slate-200 text-slate-900"
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
              isDechunked || !isOverDarkSection
                ? "bg-slate-950/95 backdrop-blur-2xl border-slate-800 text-white"
                : "bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900"
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
                        ? isDechunked || !isOverDarkSection
                          ? "bg-white text-slate-950 font-black"
                          : "bg-slate-950 text-white font-black"
                        : isDechunked || !isOverDarkSection
                        ? "text-slate-200 hover:bg-white/10"
                        : "text-slate-800 hover:bg-slate-100"
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
                variant={isDechunked || !isOverDarkSection ? "secondary" : "dark"}
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
