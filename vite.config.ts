import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "classic-script-for-static-export",
      transformIndexHtml(html, ctx) {
        let out = html;
        if (ctx.bundle) {
          out = out.replace(/<script id="static-fallback">[\s\S]*?<\/script>/, "");
        }
        return out
          .replace(/<link rel="modulepreload"[^>]*>/g, "")
          .replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
            '<script defer src="$1"></script>',
          );
      },
    },
  ],
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "assets/app.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
