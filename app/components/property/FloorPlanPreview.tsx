import { Download, Maximize2 } from "lucide-react";
import React from "react";

export interface FloorPlanProps {
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  title: string;
}

export const FloorPlanPreview: React.FC<FloorPlanProps> = ({
  areaSqFt,
  bedrooms,
  bathrooms,
  title,
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-lg">Architectural Floor Plan</h4>
          <p className="text-xs text-slate-500">
            Total Internal Area: ~{areaSqFt} sq ft ({Math.round(areaSqFt * 0.0929)} sq m)
          </p>
        </div>
        <button
          onClick={() => alert("Downloading floor plan schematic PDF...")}
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg flex items-center gap-1.5 shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-amber-600" />
          <span>PDF Plan</span>
        </button>
      </div>

      {/* Schematic Diagram Graphic */}
      <div className="relative w-full h-64 bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between overflow-hidden">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] opacity-80" />

        {/* Mock Floor Plan Graphic Shapes */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
          {/* Top Floor Row */}
          <div className="flex gap-2 h-1/2">
            <div className="flex-1 border-2 border-slate-900 bg-slate-100/80 rounded-md p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Master Suite (18' x 14')
              </span>
              <span className="text-[9px] text-slate-500">Ensuite Bath Attached</span>
            </div>
            <div className="w-1/3 border-2 border-slate-900 bg-amber-50/70 rounded-md p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Bath 1
              </span>
              <span className="text-[9px] text-slate-500">Marble Suite</span>
            </div>
          </div>

          {/* Bottom Floor Row */}
          <div className="flex gap-2 h-1/2 pt-2">
            <div className="w-1/2 border-2 border-slate-900 bg-slate-100/80 rounded-md p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Living Reception (24' x 18')
              </span>
              <span className="text-[9px] text-slate-500">Terrace Access</span>
            </div>
            <div className="w-1/2 border-2 border-slate-900 bg-slate-100/80 rounded-md p-2 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                Kitchen & Dining
              </span>
              <span className="text-[9px] text-slate-500">Boffi Appliances</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 italic">
        <span>* Layout schema for illustrative spatial guidance.</span>
        <span className="font-semibold not-italic text-slate-700">Scale: 1:100</span>
      </div>
    </div>
  );
};
