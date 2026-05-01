import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: "gzip", ext: ".gz" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate heavy 3D stack into its own chunk
          "three-core": ["three"],
          "r3f": ["@react-three/fiber", "@react-three/drei"],
          // Motion / animation
          "motion": ["motion/react"],
          // Email
          "emailjs": ["@emailjs/browser"],
          // Globe library
          "cobe": ["cobe"],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "motion/react",
      "cobe",
    ],
  },
});
