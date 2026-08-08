import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";

export function meta() {
  return [{ title: "404 - Page Not Found | Haven Real Estate" }];
}

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-2xl flex items-center justify-center">
        404
      </div>
      <h1 className="font-serif text-3xl font-bold text-slate-900">Page Not Found</h1>
      <p className="text-slate-500 text-sm max-w-md">
        The requested address or real-estate page does not exist or may have been relocated.
      </p>
      <Link to="/" className="pt-2">
        <Button variant="primary" size="md">
          Return to Haven Homepage
        </Button>
      </Link>
    </div>
  );
}
