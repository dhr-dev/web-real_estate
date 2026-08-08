import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("properties", "routes/properties.tsx"),
  route("properties/:id", "routes/property-detail.tsx"),
  route("agents/:id", "routes/agent-detail.tsx"),
  route("saved", "routes/saved.tsx"),
  route("about", "routes/about.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
