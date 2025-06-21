// vite.config.js

import { defineConfig } from "vite";
import path from "path";
// =================================================================
//  CHANGE THIS LINE:
//  FROM: import react from '@vitejs/plugin-react-swc'
//  TO:
import react from "@vitejs/plugin-react";
// =================================================================

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // =================================================================
    // AND CHANGE THIS LINE TO MATCH:
    react(),
    // =================================================================
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
