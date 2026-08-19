import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/kora-roster/" : "/",
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
}));
