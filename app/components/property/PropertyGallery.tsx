import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../utils/cn";

export interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main Featured Image */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 group h-[380px] sm:h-[480px] border border-slate-200">
          <img
            src={images[selectedIndex]}
            alt={`${title} - image ${selectedIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Navigation Controls */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Expand Lightbox Button */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Expand className="w-4 h-4 text-amber-400" />
            <span>Full Gallery ({images.length})</span>
          </button>
        </div>

        {/* Thumbnails Row */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative w-24 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-pointer",
                  selectedIndex === idx
                    ? "border-amber-600 ring-2 ring-amber-600/30 scale-105"
                    : "border-transparent opacity-75 hover:opacity-100"
                )}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white border-b border-slate-800 pb-4">
              <div>
                <h4 className="font-serif text-lg font-bold">{title}</h4>
                <p className="text-xs text-slate-400">
                  Image {selectedIndex + 1} of {images.length}
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <img
                src={images[selectedIndex]}
                alt={`${title} enlarged`}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-6 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md transition-colors"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-6 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md transition-colors"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Thumbnails Footer */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2 border-t border-slate-800">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-16 h-12 rounded-md overflow-hidden shrink-0 border transition-all",
                    selectedIndex === idx ? "border-amber-500 scale-110" : "border-slate-800 opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
