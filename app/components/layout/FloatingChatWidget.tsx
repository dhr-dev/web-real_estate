import { MessageCircle, PhoneCall, X } from "lucide-react";
import React, { useState } from "react";
import { ACTIVE_REGION_CONFIG } from "../../config/dataRegionConfig";
import { EnquiryModal } from "../modals/EnquiryModal";

// Official WhatsApp Vector Brand Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.619-.49-5.187-1.42l-.372-.222-3.856 1.011 1.029-3.759-.243-.387c-1.021-1.625-1.56-3.5-1.559-5.422 0-5.617 4.571-10.188 10.191-10.188 2.72 0 5.277 1.06 7.195 2.981 1.919 1.922 2.977 4.479 2.976 7.199 0 5.618-4.57 10.187-10.184 10.187m0-18.411c-4.534 0-8.223 3.689-8.223 8.224 0 1.796.582 3.483 1.682 4.87l.216.273-.667 2.435 2.492-.653.262.155c1.332.791 2.868 1.21 4.238 1.21 4.533 0 8.222-3.689 8.222-8.224 0-2.193-.854-4.254-2.408-5.808s-3.615-2.407-5.808-2.407" />
  </svg>
);

export const FloatingChatWidget: React.FC = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const whatsappNumber =
    ACTIVE_REGION_CONFIG.code === "US" ? "18005550199" : "442079460912";

  const whatsappMessage = encodeURIComponent(
    `Hello Haven Real Estate, I am looking for property listings in ${ACTIVE_REGION_CONFIG.countryName}.`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      {/* Fixed Floating Bottom Right Container */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* WhatsApp Floating Pill Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ring-2 ring-emerald-400/30 cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current text-white" />
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-xs font-bold pl-0.5">
            WhatsApp Us
          </span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
        </a>

        {/* Live Chat / Quick Enquiry Floating Button */}
        <button
          type="button"
          onClick={() => setIsEnquiryModalOpen(true)}
          aria-label="Open Live Enquiry"
          className="group flex items-center gap-2 bg-slate-950/95 hover:bg-slate-900 border border-slate-800 text-white p-3 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 ring-2 ring-amber-400/30 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-xs font-bold pl-0.5">
            Live Chat
          </span>
        </button>
      </div>

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
};
