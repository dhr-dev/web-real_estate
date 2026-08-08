import { Calendar, CheckCircle2, Clock, Mail, Phone, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  agentName?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  agentName,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "Morning (09:00 - 12:00)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate convincing API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRefId(`HV-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "Morning (09:00 - 12:00)",
      message: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isSuccess ? "Enquiry Received" : propertyTitle ? `Request Viewing: ${propertyTitle}` : "Book a Viewing / Consultation"}
      subtitle={
        isSuccess
          ? "Our prime advisory team has logged your viewing request."
          : agentName
          ? `Direct inquiry with ${agentName}`
          : "Schedule a private viewing or speak with a property partner."
      }
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in-75 duration-300" />
          </div>

          <h4 className="text-xl font-bold font-serif text-slate-900">
            Thank you, {formData.name || "valuable client"}!
          </h4>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your viewing request for <span className="font-semibold text-slate-900">{propertyTitle || "Haven Estate"}</span> has been registered. An advisor will contact you within 2 business hours.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-500">
              <span>Reference Number:</span>
              <span className="font-mono font-bold text-slate-900">{refId}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Preferred Date:</span>
              <span className="font-semibold text-slate-900">{formData.date || "As soon as possible"}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Time Window:</span>
              <span className="font-semibold text-slate-900">{formData.timeSlot}</span>
            </div>
          </div>

          <Button variant="primary" size="md" className="mt-4" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Evelyn Crawford"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="+44 7700 900077"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="evelyn.crawford@belgravia.co.uk"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Viewing Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Time Preference
              </label>
              <div className="relative flex items-center">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl pl-9 pr-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                  <option value="Evening (16:00 - 19:00)">Evening (16:00 - 19:00)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Message / Specific Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Any specific questions regarding floor plans, parking, or private tour requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 text-slate-900 text-sm rounded-xl p-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" size="md" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" variant="dark" size="md" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Request..." : "Send Viewing Request"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
