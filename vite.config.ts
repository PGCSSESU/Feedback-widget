import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  const isWidget = process.env.BUILD_WIDGET === "true";

  if (isWidget) {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        tailwindcss(), // ✅ REQUIRED
      ],
      define: {
        "process.env": {},
      },
      build: {
        lib: {
          entry: "src/index.tsx",
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
    };
  }

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
    ],
  };
});
