import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Simulates a browser so React components can render in tests
    environment: "jsdom",
    // Lets React Testing Library clean up automatically between tests
    globals: true,
    // Runs before every test file (adds matchers like toBeInTheDocument)
    setupFiles: "./src/tests/setup.js",
  },
});
