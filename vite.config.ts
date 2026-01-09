import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// It's safe to use a relative base for GitHub Pages and other static hosts.
// This makes the built assets load correctly whether the app is hosted at
// the repo root or as a user site.
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    // bind to localhost by default for development
    host: "127.0.0.1",
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
