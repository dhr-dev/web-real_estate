import { Award, Building2, ChevronRight, Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { EnquiryModal } from "../components/modals/EnquiryModal";
import { PropertyGrid } from "../components/property/PropertyGrid";
import { Button } from "../components/ui/Button";
import { AGENTS } from "../data/agents";
import { PROPERTIES } from "../data/properties";

export function meta({ params }: { params: { id: string } }) {
  const agent = AGENTS.find((a) => a.id === params.id);
  if (!agent) {
    return [{ title: "Agent Profile Not Found | Haven Real Estate" }];
  }
  return [
    { title: `${agent.name} - ${agent.role} | Haven Real Estate` },
    { name: "description", content: agent.bio },
  ];
}

export default function AgentDetailPage() {
  const { id } = useParams();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const agent = AGENTS.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-slate-900">Agent Profile Not Found</h2>
        <p className="text-slate-500 text-sm">
          The requested agent profile could not be located.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" className="mt-4">
            Return to Haven Homepage
          </Button>
        </Link>
      </div>
    );
  }

  // Properties listed by this agent
  const agentProperties = PROPERTIES.filter((p) => p.agentId === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-500">Agents</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-semibold">{agent.name}</span>
      </nav>

      {/* Agent Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Avatar Image */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-slate-100 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 bg-teal-600 text-white p-2 rounded-full shadow-md" title="Verified Haven Partner">
              <ShieldCheck className="w-6 h-6" />
            </span>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="lg:col-span-8 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                {agent.agency}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {agent.rating} ({agent.reviewsCount} Client Reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {agent.name}
            </h1>
            <p className="text-slate-500 text-sm font-semibold">{agent.role}</p>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {agent.bio}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {agent.specialization.map((spec) => (
              <span key={spec} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg">
                {spec}
              </span>
            ))}
          </div>

          {/* Contact Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" /> {agent.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" /> {agent.experienceYears} Years Experience
              </span>
            </div>

            <Button variant="dark" size="md" onClick={() => setIsEnquiryOpen(true)}>
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Contact {agent.name.split(" ")[0]}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Active Agent Listings */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Active Listings by {agent.name}
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {agentProperties.length} prime properties currently represented.
          </p>
        </div>

        <PropertyGrid properties={agentProperties} />
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        agentName={agent.name}
      />
    </div>
  );
}
