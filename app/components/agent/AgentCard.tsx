import { Building, Mail, Phone, ShieldCheck, Star } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Agent } from "../../types/agent";
import { cn } from "../../utils/cn";
import { EnquiryModal } from "../modals/EnquiryModal";
import { Button } from "../ui/Button";

export interface AgentCardProps {
  agent: Agent;
  className?: string;
  variant?: "standard" | "compact" | "sidebar";
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  className,
  variant = "standard",
}) => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  if (variant === "sidebar") {
    return (
      <>
        <div className={cn("bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs", className)}>
          {/* Agent Header */}
          <div className="flex items-center gap-4">
            <Link to={`/agents/${agent.id}`} className="relative shrink-0">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-teal-500 border-2 border-white rounded-full" title="Verified Haven Partner" />
            </Link>
            <div>
              <Link to={`/agents/${agent.id}`}>
                <h4 className="font-extrabold text-slate-900 text-lg hover:text-amber-700 transition-colors tracking-tight">
                  {agent.name}
                </h4>
              </Link>
              <p className="text-xs text-amber-800 font-semibold">{agent.role}</p>
              <p className="text-xs text-slate-500 mt-0.5">{agent.agency}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <div className="flex items-center justify-center gap-1 text-amber-700 font-bold text-sm">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{agent.rating}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">({agent.reviewsCount} Reviews)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl">
              <span className="block font-bold text-slate-900 text-sm">{agent.propertiesCount}</span>
              <span className="text-[10px] text-slate-500 font-medium">Active Listings</span>
            </div>
          </div>

          {/* Quick Contact CTAs */}
          <div className="space-y-2 pt-2">
            <Button
              variant="dark"
              size="md"
              className="w-full justify-center shadow-sm"
              onClick={() => setIsEnquiryModalOpen(true)}
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Contact Agent</span>
            </Button>
            <a
              href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full py-2 px-4 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{agent.phone}</span>
            </a>
          </div>

          {/* Agent Bio snippet */}
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 line-clamp-3">
            {agent.bio}
          </p>
        </div>

        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={() => setIsEnquiryModalOpen(false)}
          agentName={agent.name}
        />
      </>
    );
  }

  return (
    <>
      <div className={cn("bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between", className)}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-xs"
              />
              <div>
                <Link to={`/agents/${agent.id}`}>
                  <h4 className="font-extrabold text-slate-900 text-lg hover:text-amber-700 transition-colors tracking-tight">
                    {agent.name}
                  </h4>
                </Link>
                <p className="text-xs font-semibold text-amber-800">{agent.role}</p>
                <p className="text-xs text-slate-500">{agent.agency}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 bg-amber-50 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {agent.rating}
            </span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {agent.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {agent.specialization.map((spec) => (
              <span key={spec} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            to={`/agents/${agent.id}`}
            className="text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors"
          >
            View Profile & Listings →
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEnquiryModalOpen(true)}
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Enquire</span>
          </Button>
        </div>
      </div>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        agentName={agent.name}
      />
    </>
  );
};
