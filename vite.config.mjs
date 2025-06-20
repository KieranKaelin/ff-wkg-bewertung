import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  base: "/ff-wkg-bewertung/",
  plugins: [react(), tsconfigPaths(), nodePolyfills()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.mjs",
  },
  build: {
    rollupOptions: { plugins: [inject({ Buffer: ["buffer", "Buffer"] })] },
  },
});
