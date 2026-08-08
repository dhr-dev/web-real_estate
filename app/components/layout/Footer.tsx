import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold tracking-tighter text-xl shadow-sm">
                H
              </div>
              <span className="text-3xl font-black tracking-tight text-white">
                Haven
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Find a place that feels like home. Haven is a modern property discovery platform helping buyers and renters find properties across the UK and Europe.
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" /> London • Manchester • Edinburgh • Amsterdam • Lisbon
              </span>
            </div>
          </div>

          {/* Column 2: Quick Search Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Discover
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties?listingType=sale" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?listingType=rent" className="hover:text-white transition-colors">
                  Property Lettings
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=apartment" className="hover:text-white transition-colors">
                  Apartments & Flats
                </Link>
              </li>
              <li>
                <Link to="/properties?propertyType=house" className="hover:text-white transition-colors">
                  Family Houses
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Saved Wishlist</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Locations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties?city=London" className="hover:text-white transition-colors">
                  London Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Manchester" className="hover:text-white transition-colors">
                  Manchester Listings
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Edinburgh" className="hover:text-white transition-colors">
                  Edinburgh Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Amsterdam" className="hover:text-white transition-colors">
                  Amsterdam Homes
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Lisbon" className="hover:text-white transition-colors">
                  Lisbon Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Property Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+44 (0)20 7946 0182</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@haven-realestate.co.uk</span>
              </li>
              <li className="pt-2 text-xs leading-relaxed text-slate-500">
                18 Cadogan Square, Chelsea<br />London SW1X 0JU
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Haven Real Estate Platform. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Portfolio showcase application. Built for commercial demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
};
