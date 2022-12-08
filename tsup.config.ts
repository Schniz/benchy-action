import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  sourcemap: true,
  esbuildOptions(opts, _ctx) {
    opts.legalComments = "external";
  },
});
