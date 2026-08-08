import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { FloatingChatWidget } from "./components/layout/FloatingChatWidget";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { PageTransition } from "./components/ui/PageTransition";
import { SavedPropertiesProvider } from "./context/SavedPropertiesContext";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Haven | Premium Real Estate Discovery in UK & Europe" },
  {
    name: "description",
    content: "Discover luxury houses, townhouses, penthouses, and country estates across London, Manchester, Edinburgh, Amsterdam, and Lisbon.",
  },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-full bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
        <SavedPropertiesProvider>
          <Navbar />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
          <FloatingChatWidget />
        </SavedPropertiesProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : "Error";
    details =
      error.status === 404
        ? "The requested real estate page or property listing could not be located."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-serif text-2xl font-bold mb-4">
        !
      </div>
      <h1 className="text-3xl font-serif font-bold text-slate-900">{message}</h1>
      <p className="text-slate-500 text-sm max-w-md mt-2 leading-relaxed">{details}</p>
      {stack && (
        <pre className="w-full max-w-2xl p-4 mt-6 text-xs text-left bg-slate-900 text-slate-200 overflow-x-auto rounded-xl">
          {stack}
        </pre>
      )}
      <a
        href="/"
        className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
      >
        Return to Haven Homepage
      </a>
    </main>
  );
}
