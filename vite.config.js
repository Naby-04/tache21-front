import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.docx'],
 optimizeDeps: {
    include: ['pdfjs-dist'],
  },
   build: {
    assetsInlineLimit: 0, // Ensures worker files are not inlined
  },
});
