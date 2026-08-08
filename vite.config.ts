import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    allowedHosts: ['spent-backgrounds-podcasts-hist.trycloudflare.com']
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
