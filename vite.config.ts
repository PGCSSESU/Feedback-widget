import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
    define: {
    "process.env.NODE_ENV": '"production"', 
  },
  build: {
    lib: {
      entry: "src/widget/init.tsx",
      name: "FeedbackWidget",
      formats: ["iife"],
      fileName: () => "feedback-widget.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    
  },
});
